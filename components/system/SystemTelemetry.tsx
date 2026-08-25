"use client";

import { useEffect, useRef, useState } from "react";
import { useDocProgress } from "@/lib/scroll";

/**
 * Persistent system state. Reads as telemetry from a running machine, not as
 * a progress bar — the hairline is 1px and the label only changes at phase
 * boundaries, so nothing is competing with the content for attention.
 *
 * The label is driven by which act is at the viewport's centre line (via
 * IntersectionObserver, not scroll math) so it stays truthful when sections
 * change height. The hairline is driven by document progress written straight
 * to a CSS variable — no React render per frame.
 */

export function SystemTelemetry() {
  const barRef = useRef<HTMLSpanElement | null>(null);
  const [phase, setPhase] = useState("Activating");

  // Document progress → CSS var only. Never touches state.
  useDocProgress((p) => {
    barRef.current?.style.setProperty("--doc", p.toFixed(4));
  });

  useEffect(() => {
    // Any element declaring `data-phase` owns the readout while it holds the
    // viewport's centre band. Acts declare this themselves, so the telemetry
    // can never drift out of sync with the page structure.
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-phase]"),
    );
    if (!targets.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        let best: { label: string; ratio: number } | null = null;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const label = (e.target as HTMLElement).dataset.phase;
          if (!label) continue;
          if (!best || e.intersectionRatio > best.ratio)
            best = { label, ratio: e.intersectionRatio };
        }
        if (best) setPhase(best.label);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.05, 0.3, 0.6] },
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  const label = phase;

  return (
    <>
      {/* Hairline — the only always-on chrome besides the nav. */}
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px">
        <span
          ref={barRef}
          className="block h-full origin-left"
          style={{
            ["--doc" as string]: 0,
            transform: "scaleX(var(--doc))",
            background:
              "linear-gradient(90deg, rgba(0,255,122,0.15), var(--color-hero))",
          }}
        />
      </div>

      {/* State readout, bottom-left. Hidden on compact viewports where the
          screen is too precious to spend on chrome. */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed bottom-5 left-6 z-40 hidden items-center gap-2.5 lg:flex"
      >
        <span
          aria-hidden
          className="h-[5px] w-[5px] rounded-full bg-hero"
          style={{
            boxShadow: "0 0 9px 1px rgba(0,255,122,0.7)",
            animation: "drk-pulse 3s ease-in-out infinite",
          }}
        />
        <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink-ghost">
          System
        </span>
        <span aria-hidden className="h-2.5 w-px bg-white/10" />
        <span
          key={label}
          className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink-faint"
          style={{ animation: "drk-rise 600ms var(--ease-drk) both" }}
        >
          {label}
        </span>
      </div>
    </>
  );
}
