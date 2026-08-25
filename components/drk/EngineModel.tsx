"use client";

import { Section, SectionHead } from "@/components/ui/Primitives";
import { PinnedStage } from "@/components/system/Stage";
import { Orb, Node } from "@/components/system/Objects";
import { engine } from "@/content/drk";

/**
 * ACT 03 — ONE ENGINE, TWO OPERATING MODES
 *
 *   0.00 → 0.28   A single engine. Nothing has split yet.
 *   0.28 → 0.55   Two operating paths separate outward from the same core.
 *                 The core never duplicates — only the operator changes.
 *   0.55 → 0.78   The paths reconnect beneath into ONE RUNTIME.
 *   0.78 → 1.00   The two revenue outcomes emerge.
 *
 * Spatial choreography, not card hovers.
 */
export function EngineModel() {
  return (
    <>
      <Section id="engine" className="pt-28 sm:pt-36 lg:pt-44">
        <SectionHead
          eyebrow={engine.eyebrow}
          headline={
            <>
              One proprietary engine.
              <br />
              <span className="text-ink-muted">Two scalable businesses.</span>
            </>
          }
          body={engine.body}
        />
      </Section>

      <PinnedStage length={2} compactLength={1.4} phase="Engine running" className="mt-16 sm:mt-20">
        <div className="relative flex h-full w-full items-center justify-center px-5 sm:px-8">
          <div className="relative w-full max-w-[1000px]">
            {/* ---- The core — one object, always ------------------------- */}
            <div
              className="relative z-20 mx-auto flex justify-center"
              style={{
                // Rises slightly as the modes split away beneath it.
                transform:
                  "translate3d(0, calc(clamp(0, calc((var(--p) - 0.26) / 0.3), 1) * -6vh), 0)",
              }}
            >
              <Orb
                size={168}
                className="sm:!h-[196px] sm:!w-[196px]"
                style={{
                  ["--orb-a" as string]: "clamp(0.35, calc(var(--p) / 0.25), 1)",
                }}
              />
            </div>
            <p className="relative z-20 mt-6 text-center font-mono text-[9.5px] uppercase tracking-[0.28em] text-ink-faint">
              Engine
            </p>

            {/* ---- Split bracket: one engine → two operators -------------
                Right angles only. `preserveAspectRatio="none"` stretches the
                box, and straight segments survive that distortion perfectly
                where curves would not. */}
            <svg
              aria-hidden
              className="relative z-10 mt-5 hidden h-[72px] w-full sm:block"
              viewBox="0 0 1000 72"
              preserveAspectRatio="none"
            >
              <Bracket d="M500 0 V34 H180 V72" from={0.26} to={0.48} />
              <Bracket d="M500 0 V34 H820 V72" from={0.3} to={0.52} />
            </svg>

            {/* ---- The two operating modes ------------------------------- */}
            <div className="relative z-20 mt-6 grid grid-cols-1 gap-6 sm:mt-4 sm:grid-cols-2 sm:gap-8 lg:gap-24">
              {engine.modes.map((mode, i) => {
                const from = 0.3 + i * 0.05;
                return (
                  <div
                    key={mode.id}
                    className="band"
                    style={{
                      ["--from" as string]: from,
                      ["--to" as string]: from + 0.16,
                      opacity: "var(--lp)",
                      // Each mode slides outward from the core's centre line.
                      transform: `translate3d(calc((1 - var(--le)) * ${i === 0 ? "8%" : "-8%"}), calc((1 - var(--le)) * -18px), 0)`,
                    }}
                  >
                    <div className="text-center sm:text-left">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-hero">
                        {mode.key}
                      </span>
                      <h3 className="mt-3 font-display text-[19px] font-semibold leading-[1.15] tracking-[-0.025em] text-ink sm:text-[24px]">
                        {mode.title}
                      </h3>
                      <p className="mx-auto mt-2.5 max-w-[34ch] text-[13.5px] leading-[1.6] text-ink-muted sm:mx-0">
                        {mode.detail}
                      </p>

                      {/* Revenue outcome — emerges last */}
                      <div
                        className="band mt-5 inline-flex items-center gap-2.5"
                        style={{
                          ["--from" as string]: 0.8 + i * 0.04,
                          ["--to" as string]: 0.92 + i * 0.04,
                          opacity: "var(--lp)",
                          transform: "translate3d(0, calc((1 - var(--le)) * 10px), 0)",
                        }}
                      >
                        <span
                          aria-hidden
                          className="h-[5px] w-[5px] rounded-full bg-hero"
                          style={{ boxShadow: "0 0 9px rgba(0,255,122,0.7)" }}
                        />
                        <span className="font-mono text-[11px] tracking-[0.06em] text-ink">
                          {mode.revenue}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ---- Reconnect bracket: both operators → one runtime -------- */}
            <svg
              aria-hidden
              className="relative z-10 mt-2 hidden h-[64px] w-full sm:block"
              viewBox="0 0 1000 64"
              preserveAspectRatio="none"
            >
              <Bracket d="M180 0 V32 H500 V64" from={0.6} to={0.78} />
              <Bracket d="M820 0 V32 H500 V64" from={0.64} to={0.82} />
            </svg>

            {/* ---- ONE RUNTIME — the reconnection ------------------------ */}
            <div
              className="band relative z-20 mt-5 flex justify-center sm:mt-1"
              style={{
                ["--from" as string]: 0.74,
                ["--to" as string]: 0.88,
                opacity: "var(--lp)",
                transform: "translate3d(0, calc((1 - var(--le)) * 14px), 0)",
              }}
            >
              <Node tone="on">One runtime</Node>
            </div>
          </div>
        </div>
      </PinnedStage>

      {/* The concept, stated once the choreography has made it */}
      <Section className="pb-28 pt-16 sm:pb-36 lg:pb-44">
        <p className="display mx-auto max-w-[760px] text-center text-[clamp(1.25rem,2.9vw,2rem)] text-ink">
          The engine remains one engine.{" "}
          <span className="text-ink-faint">Only the operator changes.</span>
        </p>
      </Section>
    </>
  );
}

/* -------------------------------------------------------------------------- */

function Bracket({ d, from, to }: { d: string; from: number; to: number }) {
  return (
    <g style={{ ["--from" as string]: from, ["--to" as string]: to, ["--len" as string]: 420 }}>
      <path
        d={d}
        fill="none"
        stroke="rgba(255,255,255,0.075)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <path
        className="band band-draw"
        d={d}
        fill="none"
        stroke="var(--color-hero)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        style={{ filter: "drop-shadow(0 0 3px rgba(0,255,122,0.85))" }}
      />
    </g>
  );
}
