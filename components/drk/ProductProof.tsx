"use client";

import { useState } from "react";
import { Reveal, Section, SectionHead, Panel, Chip } from "@/components/ui/Primitives";
import { Sparkline, TickingLabel } from "./Sparkline";
import { useSequence, usePointerParallax } from "@/lib/motion";
import { proof } from "@/content/drk";

/**
 * ACT 04 — PRODUCT PROOF
 * A native, high-fidelity interface composition. Modules activate in sequence
 * so the surface reads as a running system rather than a screenshot.
 *
 * NOTE: no financial values are asserted anywhere in this surface. States and
 * qualities only — see content/drk.ts for the rationale.
 */
export function ProductProof() {
  const { ref: seqRef, index } = useSequence<HTMLDivElement>(proof.modules.length, 1500);
  const { ref: parRef, offset } = usePointerParallax<HTMLDivElement>(0.6);
  const [pinned, setPinned] = useState<number | null>(null);
  const active = pinned ?? index;

  return (
    <Section id="proof" className="py-28 sm:py-36 lg:py-44">
      <SectionHead
        eyebrow={proof.eyebrow}
        headline={
          <>
            Clients see what
            <br />
            black-box operators <span className="text-ink-faint">hide.</span>
          </>
        }
        body={proof.body}
      />

      <div ref={parRef} className="mt-16 lg:mt-20">
        <Reveal y={40}>
          <div
            className="relative"
            style={{
              transform: `perspective(1600px) rotateX(${offset.y * -1.1}deg) rotateY(${offset.x * 1.6}deg)`,
              transition: "transform 260ms linear",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Ambient bloom behind the interface. Kept inside the content
                box — bleeding it wider pushed the document past 100vw. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -bottom-16 -top-10"
              style={{
                background:
                  "radial-gradient(60% 55% at 50% 60%, rgba(0,255,122,0.09), transparent 72%)",
                filter: "blur(20px)",
              }}
            />

            <Panel rim sweep className="relative">
              {/* ---- Window chrome ------------------------------------------ */}
              <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] px-4 py-3.5 sm:px-6">
                <div className="flex items-center gap-3">
                  <span className="font-display text-[14px] font-bold tracking-[-0.03em] text-ink">
                    DRK
                  </span>
                  <span aria-hidden className="h-3 w-px bg-white/10" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                    Operating surface
                  </span>
                </div>
                <Chip tone="live">Live</Chip>
              </div>

              {/* ---- Module rail -------------------------------------------- */}
              <div
                ref={seqRef}
                className="scroll-x flex gap-1.5 border-b border-white/[0.06] px-4 py-3 sm:px-6"
              >
                {proof.modules.map((m, i) => {
                  const on = i === active;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPinned(i)}
                      aria-pressed={on}
                      className="shrink-0 rounded-full px-3.5 py-[7px] font-mono text-[10.5px] uppercase
                        tracking-[0.14em] transition-all duration-500 ease-[var(--ease-drk)]"
                      style={{
                        color: on ? "var(--color-ink)" : "var(--color-ink-faint)",
                        background: on
                          ? "linear-gradient(180deg, rgba(34,37,35,0.9), rgba(13,17,16,0.95))"
                          : "transparent",
                        border: `1px solid ${on ? "rgba(0,255,122,0.3)" : "transparent"}`,
                        boxShadow: on
                          ? "inset 0 1px 0 rgba(255,255,255,0.08), 0 0 18px -8px rgba(0,255,122,0.9)"
                          : "none",
                      }}
                    >
                      {m.label}
                    </button>
                  );
                })}
              </div>

              {/* ---- Body ---------------------------------------------------- */}
              <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]">
                {/* Left: the active module */}
                <div className="border-b border-white/[0.06] p-5 sm:p-7 lg:border-b-0 lg:border-r lg:p-9">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-[22px] font-semibold tracking-[-0.025em] text-ink sm:text-[26px]">
                      {proof.modules[active].label}
                    </h3>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-hero">
                      {proof.modules[active].meta}
                    </span>
                  </div>

                  {/* Attribution rows — structural, not numeric */}
                  <div className="mt-7 space-y-px">
                    {["Source", "Program", "Operator", "Reconciliation"].map((k, i) => (
                      <div
                        key={k}
                        className="flex items-center justify-between gap-4 rounded-[8px] px-3 py-3 transition-colors duration-500"
                        style={{
                          background:
                            i === 0 ? "rgba(34,37,35,0.4)" : "transparent",
                        }}
                      >
                        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-ghost">
                          {k}
                        </span>
                        <span className="flex items-center gap-2 font-mono text-[11.5px] text-ink">
                          <span
                            aria-hidden
                            className="h-[4px] w-[4px] rounded-full bg-hero"
                            style={{ boxShadow: "0 0 7px rgba(0,255,122,0.7)" }}
                          />
                          <TickingLabel
                            values={
                              ["Attributed", "Verified", "Recorded", "Signed"] as const
                            }
                            intervalMs={2400 + i * 380}
                          />
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="mt-8 border-t border-white/[0.06] pt-5 text-[13.5px] leading-[1.6] text-ink-faint">
                    Every output is traced back to the program that produced it. No
                    aggregate summary standing in for the mechanism.
                  </p>
                </div>

                {/* Right: telemetry column */}
                <div className="p-5 sm:p-7 lg:p-9">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-ghost">
                      Program telemetry
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-ghost">
                      Shape only
                    </span>
                  </div>

                  <div className="mt-5 rounded-[12px] border border-white/[0.06] bg-obsidian/60 p-4">
                    <Sparkline seed={11 + active * 3} height={92} drift={0.3} />
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-ghost">
                        Attributed output
                      </span>
                      <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-ghost">
                        Values withheld
                      </span>
                    </div>
                  </div>

                  {/* Module status grid */}
                  <div className="mt-5 grid grid-cols-2 gap-2.5">
                    {proof.modules.slice(0, 4).map((m, i) => (
                      <div
                        key={m.id}
                        className="rounded-[10px] border border-white/[0.055] p-3.5 transition-all duration-700"
                        style={{
                          background:
                            i === active % 4
                              ? "linear-gradient(180deg, rgba(34,37,35,0.7), rgba(8,13,12,0.85))"
                              : "rgba(13,17,16,0.5)",
                          borderColor:
                            i === active % 4 ? "rgba(0,255,122,0.22)" : "rgba(255,255,255,0.055)",
                        }}
                      >
                        <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-ghost">
                          {m.label}
                        </span>
                        <p className="mt-2 font-mono text-[12px] text-ink">{m.meta}</p>
                      </div>
                    ))}
                  </div>

                  <p className="mt-5 font-mono text-[9.5px] leading-[1.6] tracking-[0.04em] text-ink-faint">
                    Interface preview. Curves illustrate telemetry shape and carry no
                    axis values.
                  </p>
                </div>
              </div>
            </Panel>
          </div>
        </Reveal>

        <Reveal delay={220} className="mt-10">
          <p className="display mx-auto max-w-[720px] text-center text-[clamp(1.3rem,2.8vw,2rem)] text-ink">
            Every output is{" "}
            <span className="text-hero">visible</span>,{" "}
            <span className="text-hero">attributed</span> and{" "}
            <span className="text-hero">measured</span>.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
