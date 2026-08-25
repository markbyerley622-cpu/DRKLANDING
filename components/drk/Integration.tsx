"use client";

import { Section, SectionHead } from "@/components/ui/Primitives";
import { PinnedStage } from "@/components/system/Stage";
import { integration } from "@/content/drk";

/**
 * ACT 08 — DAYS VS QUARTERS
 *
 * Two clocks running at different speeds against the same scroll input.
 * TRADITIONAL crawls across the entire stage. DRK completes its six-state
 * boot in the first third and then simply holds ACTIVE — which is the point.
 *
 * Industrial control system, not a video game: the green accent is reserved
 * almost entirely for the final ACTIVE state.
 */

const STATES = integration.states;
const N = STATES.length;
/** DRK boots between 0.10 and 0.52 — deliberately early. */
const boot = (i: number) => 0.1 + (i * 0.42) / N;

export function Integration() {
  return (
    <>
      <Section id="integration" className="pt-28 sm:pt-36 lg:pt-44">
        <SectionHead
          eyebrow={integration.eyebrow}
          headline={
            <>
              We integrate in days,
              <br />
              <span className="text-ink-muted">not years.</span>
            </>
          }
        />
      </Section>

      <PinnedStage length={1.8} compactLength={1.3} phase="Integrated" className="mt-12 sm:mt-16">
        <div className="relative flex h-full w-full items-center justify-center px-5 sm:px-8">
          <div className="w-full max-w-[1080px]">
            {/* ---- The two clocks ------------------------------------- */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {/* TRADITIONAL — crawls the whole way */}
              <div className="glass-quiet rounded-[16px] p-6 sm:p-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                  Traditional
                </span>
                <p className="display mt-3 text-[clamp(2rem,5.5vw,3.4rem)] text-ink-faint">
                  Quarters
                </p>
                <div
                  className="mt-6 h-[3px] w-full overflow-hidden rounded-full"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <span
                    className="block h-full origin-left rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.2)",
                      transform: "scaleX(var(--p))",
                    }}
                  />
                </div>
                <p className="mt-3 font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-ghost">
                  Still provisioning
                </p>
              </div>

              {/* DRK — done early, then holds */}
              <div
                className="metal-rim specular relative overflow-hidden rounded-[16px] p-6 sm:p-8"
                style={{ boxShadow: "var(--highlight-inset), var(--depth-shadow)" }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-8 -bottom-10 h-24 rounded-[50%] blur-2xl"
                  style={{
                    background:
                      "radial-gradient(50% 100% at 50% 0%, rgba(0,255,122,calc(0.3 * clamp(0, calc((var(--p) - 0.5) / 0.1), 1))), transparent 70%)",
                  }}
                />
                <span className="relative font-mono text-[10px] uppercase tracking-[0.2em] text-hero">
                  DRK
                </span>
                <p className="display relative mt-3 text-[clamp(2rem,5.5vw,3.4rem)] text-ink">
                  Days
                </p>
                <div
                  className="relative mt-6 h-[3px] w-full overflow-hidden rounded-full"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <span
                    className="block h-full origin-left rounded-full"
                    style={{
                      background: "var(--color-hero)",
                      boxShadow: "0 0 12px rgba(0,255,122,0.8)",
                      // Completes by 0.52, then holds.
                      transform: "scaleX(clamp(0, calc(var(--p) / 0.52), 1))",
                    }}
                  />
                </div>
                <p
                  className="relative mt-3 font-mono text-[9.5px] uppercase tracking-[0.16em]"
                  style={{
                    color:
                      "color-mix(in srgb, var(--color-hero) calc(clamp(0, calc((var(--p) - 0.5) / 0.08), 1) * 100%), var(--color-ink-ghost))",
                  }}
                >
                  Operating
                </p>
              </div>
            </div>

            {/* ---- Activation sequence -------------------------------- */}
            <div className="glass mt-4 rounded-[18px] p-6 sm:mt-5 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                  Activation sequence
                </span>
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.16em]"
                  style={{
                    color:
                      "color-mix(in srgb, var(--color-hero) calc(clamp(0, calc((var(--p) - 0.5) / 0.06), 1) * 100%), var(--color-ink-faint))",
                  }}
                >
                  {/* Reads the terminal state without a React render */}
                  Active
                </span>
              </div>

              {/* Desktop: horizontal state machine */}
              <div className="mt-8 hidden items-start sm:flex">
                {STATES.map((s, i) => {
                  const isLast = i === N - 1;
                  const on = `clamp(0, calc((var(--p) - ${boot(i).toFixed(3)}) / 0.05), 1)`;
                  return (
                    <div key={s.id} className="flex flex-1 items-start last:flex-none">
                      <div
                        className="flex w-[74px] shrink-0 flex-col items-center gap-3"
                        style={{ ["--on" as string]: on }}
                      >
                        <span
                          aria-hidden
                          className="h-[12px] w-[12px] rounded-full"
                          style={{
                            // Green is reserved for ACTIVE; the rest are steel.
                            background: isLast
                              ? "color-mix(in srgb, var(--color-hero) calc(var(--on) * 100%), #1b1f1e)"
                              : "color-mix(in srgb, #cfd8d5 calc(var(--on) * 100%), #1b1f1e)",
                            boxShadow: isLast
                              ? "0 0 calc(var(--on) * 20px) 2px rgba(0,255,122,0.75)"
                              : "0 0 calc(var(--on) * 8px) rgba(255,255,255,0.35)",
                            transform: "scale(calc(0.8 + var(--on) * 0.2))",
                          }}
                        />
                        <span
                          className="text-center font-mono text-[9px] uppercase leading-[1.4] tracking-[0.13em]"
                          style={{
                            color: isLast
                              ? "color-mix(in srgb, var(--color-hero) calc(var(--on) * 100%), var(--color-ink-ghost))"
                              : "color-mix(in srgb, var(--color-ink) calc(var(--on) * 100%), var(--color-ink-ghost))",
                          }}
                        >
                          {s.label}
                        </span>
                      </div>

                      {!isLast && (
                        <span
                          aria-hidden
                          className="mt-[5px] h-px flex-1"
                          style={{ background: "rgba(255,255,255,0.07)" }}
                        >
                          <span
                            className="block h-px w-full origin-left"
                            style={{
                              transform: `scaleX(clamp(0, calc((var(--p) - ${(boot(i) + 0.01).toFixed(3)}) / ${(0.42 / N).toFixed(3)}), 1))`,
                              background: "rgba(207,216,213,0.55)",
                            }}
                          />
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Mobile: vertical boot log */}
              <ol className="mt-6 sm:hidden">
                {STATES.map((s, i) => {
                  const isLast = i === N - 1;
                  const on = `clamp(0, calc((var(--p) - ${boot(i).toFixed(3)}) / 0.05), 1)`;
                  return (
                    <li
                      key={s.id}
                      className="relative flex items-center gap-4 pb-4 last:pb-0"
                      style={{ ["--on" as string]: on }}
                    >
                      {!isLast && (
                        <span
                          aria-hidden
                          className="absolute left-[5.5px] top-[16px] w-px"
                          style={{
                            height: "calc(100% - 4px)",
                            background: "rgba(255,255,255,0.07)",
                          }}
                        >
                          <span
                            className="block w-full origin-top"
                            style={{
                              height: "100%",
                              transform: `scaleY(clamp(0, calc((var(--p) - ${(boot(i) + 0.01).toFixed(3)}) / ${(0.42 / N).toFixed(3)}), 1))`,
                              background: "rgba(207,216,213,0.5)",
                            }}
                          />
                        </span>
                      )}
                      <span
                        aria-hidden
                        className="relative z-10 h-[12px] w-[12px] shrink-0 rounded-full"
                        style={{
                          background: isLast
                            ? "color-mix(in srgb, var(--color-hero) calc(var(--on) * 100%), #1b1f1e)"
                            : "color-mix(in srgb, #cfd8d5 calc(var(--on) * 100%), #1b1f1e)",
                          boxShadow: isLast
                            ? "0 0 calc(var(--on) * 18px) 2px rgba(0,255,122,0.7)"
                            : "none",
                        }}
                      />
                      <span
                        className="font-mono text-[11.5px] uppercase tracking-[0.14em]"
                        style={{
                          color: isLast
                            ? "color-mix(in srgb, var(--color-hero) calc(var(--on) * 100%), var(--color-ink-ghost))"
                            : "color-mix(in srgb, var(--color-ink) calc(var(--on) * 100%), var(--color-ink-ghost))",
                        }}
                      >
                        {s.label}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </PinnedStage>
    </>
  );
}
