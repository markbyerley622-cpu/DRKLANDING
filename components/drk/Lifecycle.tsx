"use client";

import { Section, SectionHead, Reveal } from "@/components/ui/Primitives";
import { useScrollProgress, range, smooth } from "@/lib/motion";
import { lifecycle } from "@/content/drk";

/**
 * ACT 09 — LAUNCH LIFECYCLE
 * A horizontal operating timeline that fills as the section is traversed —
 * a progressing state, not five cards. On mobile it becomes a vertical
 * lifecycle rail with the same progression semantics.
 */
export function Lifecycle() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>({ start: 0.85, end: 0.25 });
  const p = smooth(range(progress, 0.02, 0.92));
  const stages = lifecycle.stages;

  return (
    <Section id="lifecycle" className="py-28 sm:py-36 lg:py-44">
      <SectionHead
        eyebrow={lifecycle.eyebrow}
        headline={
          <>
            Present from the
            <br />
            <span className="text-ink-muted">first block onward.</span>
          </>
        }
        body={lifecycle.body}
      />

      <div ref={ref} className="mt-16 lg:mt-24">
        {/* ---- Desktop / tablet: horizontal timeline ----------------------- */}
        <div className="hidden md:block">
          {/* Track */}
          <div className="relative h-px w-full" style={{ background: "rgba(255,255,255,0.07)" }}>
            <span
              className="absolute inset-y-0 left-0 block"
              style={{
                width: `${p * 100}%`,
                background: "linear-gradient(90deg, rgba(0,255,122,0.35), var(--color-hero))",
                boxShadow: "0 0 12px rgba(0,255,122,0.6)",
                transition: "width 160ms linear",
              }}
            />
            {/* Travelling head */}
            <span
              aria-hidden
              className="absolute top-1/2 h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-tint"
              style={{
                left: `${p * 100}%`,
                boxShadow: "0 0 16px 3px rgba(0,255,122,0.9)",
                opacity: p > 0.01 && p < 0.995 ? 1 : 0,
                transition: "left 160ms linear, opacity 400ms",
              }}
            />
          </div>

          <ol className="mt-0 grid grid-cols-5">
            {stages.map((stage, i) => {
              const gate = i / stages.length;
              const local = range(p, gate, gate + 1 / stages.length);
              const on = p >= gate + 0.02;
              return (
                <li key={stage.id} className="relative pr-5 last:pr-0">
                  {/* Tick */}
                  <span
                    aria-hidden
                    className="absolute -top-[4px] left-0 h-[9px] w-[9px] rounded-full transition-all duration-500"
                    style={{
                      background: on ? "var(--color-hero)" : "#1b1f1e",
                      border: `1px solid ${on ? "rgba(0,255,122,0.5)" : "rgba(255,255,255,0.1)"}`,
                      boxShadow: on ? "0 0 14px 1px rgba(0,255,122,0.6)" : "none",
                    }}
                  />

                  <div
                    className="pt-8 transition-all duration-700 ease-[var(--ease-drk)]"
                    style={{
                      opacity: 0.28 + local * 0.72,
                      transform: `translateY(${(1 - local) * 10}px)`,
                    }}
                  >
                    <span
                      className="font-mono text-[11px] tracking-[0.18em] transition-colors duration-700"
                      style={{ color: on ? "var(--color-hero)" : "var(--color-ink-ghost)" }}
                    >
                      {stage.index}
                    </span>
                    <h3
                      className="display mt-3 text-[clamp(1.15rem,2vw,1.7rem)]"
                      style={{ color: on ? "var(--color-ink)" : "var(--color-ink-faint)" }}
                    >
                      {stage.name}
                    </h3>
                    <p className="mt-3 max-w-[24ch] text-[13px] leading-[1.6] text-ink-faint">
                      {stage.detail}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* ---- Mobile: vertical lifecycle rail ------------------------------ */}
        <ol className="md:hidden">
          {stages.map((stage, i) => {
            const gate = i / stages.length;
            const local = range(p, gate, gate + 1 / stages.length);
            const on = p >= gate + 0.02;
            return (
              <li key={stage.id} className="relative flex gap-5 pb-9 last:pb-0">
                {i < stages.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-[5px] top-4 h-[calc(100%-8px)] w-px"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                  >
                    <span
                      className="block w-full"
                      style={{
                        height: `${local * 100}%`,
                        background: "var(--color-hero)",
                        boxShadow: "0 0 8px rgba(0,255,122,0.5)",
                        transition: "height 180ms linear",
                      }}
                    />
                  </span>
                )}

                <span
                  aria-hidden
                  className="relative z-10 mt-[6px] h-[11px] w-[11px] shrink-0 rounded-full transition-all duration-500"
                  style={{
                    background: on ? "var(--color-hero)" : "#1b1f1e",
                    border: `1px solid ${on ? "rgba(0,255,122,0.5)" : "rgba(255,255,255,0.1)"}`,
                    boxShadow: on ? "0 0 14px 1px rgba(0,255,122,0.55)" : "none",
                  }}
                />

                <div
                  className="min-w-0 flex-1 transition-all duration-700"
                  style={{ opacity: 0.35 + local * 0.65 }}
                >
                  <span
                    className="font-mono text-[10.5px] tracking-[0.18em]"
                    style={{ color: on ? "var(--color-hero)" : "var(--color-ink-ghost)" }}
                  >
                    {stage.index}
                  </span>
                  <h3
                    className="display mt-2 text-[26px]"
                    style={{ color: on ? "var(--color-ink)" : "var(--color-ink-faint)" }}
                  >
                    {stage.name}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-[1.6] text-ink-faint">
                    {stage.detail}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
