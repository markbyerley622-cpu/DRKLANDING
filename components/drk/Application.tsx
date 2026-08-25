"use client";

import { Section, Eyebrow, Reveal, Chip } from "@/components/ui/Primitives";
import { PinnedStage } from "@/components/system/Stage";
import { Readout } from "@/components/system/Objects";
import { application } from "@/content/drk";

/**
 * ACT 11 — DEEPER INSPECTION
 *
 * Not a flythrough. The user descends through six fixed depths of the same
 * runtime — TOKEN → RUNTIME → POOLS → PROGRAMS → OPERATE → P/L — with each
 * layer scaling up and dissolving as the next resolves beneath it. Precise,
 * like stepping down through cross-sections, never flying around the screen.
 *
 * The final depth reveals CLIENT VIEW — UNFILTERED: the payoff of the whole
 * observability narrative.
 */

const DEPTHS = [
  { id: "token", label: "Token", rows: [["Supply", "Known"], ["Holders", "Enumerated"], ["Venues", "Mapped"]] },
  { id: "runtime", label: "Runtime", rows: [["Wallets", "Online"], ["Liquidity", "Online"], ["Execution", "Online"]] },
  { id: "pools", label: "Pools", rows: [["Depth", "Programmatic"], ["Venues", "Connected"], ["Migration", "Continuous"]] },
  { id: "programs", label: "Programs", rows: [["Definition", "Explicit"], ["Operator", "Assigned"], ["Outputs", "Measured"]] },
  { id: "operate", label: "Operate", rows: [["Controls", "Enforced"], ["Limits", "Live"], ["Response", "Automatic"]] },
  { id: "pnl", label: "P/L", rows: [["Basis", "Program-level"], ["Reconciliation", "Continuous"], ["Client view", "Unfiltered"]] },
] as const;

const N = DEPTHS.length;
const band = (i: number) => 0.05 + (i * 0.82) / N;

export function Application() {
  return (
    <>
      <Section id="application" className="pt-28 sm:pt-36 lg:pt-44">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <Eyebrow>{application.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={100} className="mt-6">
            <h2 className="display max-w-[16ch] text-[clamp(2.1rem,5vw,4.2rem)] text-ink">
              The system behind the operation.
            </h2>
          </Reveal>
          <Reveal delay={190} className="mt-6 max-w-[560px]">
            <p className="text-[15.5px] leading-[1.65] text-ink-muted sm:text-[16.5px]">
              {application.body}
            </p>
          </Reveal>
        </div>
      </Section>

      <PinnedStage length={3.2} compactLength={2.4} phase="Unfiltered" className="mt-14 sm:mt-16">
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden px-4 sm:px-8">
          {/* depth bloom */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(48% 44% at 50% 50%, rgba(0,255,122,0.045), transparent 70%)",
              opacity: "calc(0.3 + var(--p) * 0.7)",
              filter: "blur(22px)",
            }}
          />

          <div className="relative w-full max-w-[880px]">
            {/* ---- Depth rail ------------------------------------------- */}
            <div className="mb-6 flex items-center justify-center gap-1.5 sm:gap-2.5">
              {DEPTHS.map((d, i) => (
                <span
                  key={d.id}
                  className="font-mono text-[9px] uppercase tracking-[0.16em] sm:text-[10px]"
                  style={{
                    ["--on" as string]: `calc(clamp(0, calc((var(--p) - ${band(i).toFixed(3)}) / 0.02), 1) * clamp(0, calc((${(band(i + 1) + 0.02).toFixed(3)} - var(--p)) / 0.02), 1))`,
                    color:
                      "color-mix(in srgb, var(--color-hero) calc(var(--on) * 100%), var(--color-ink-ghost))",
                  }}
                >
                  {d.label}
                  {i < N - 1 && <span className="mx-1 text-ink-ghost sm:mx-1.5">/</span>}
                </span>
              ))}
            </div>

            {/* ---- Stacked cross-sections ------------------------------- */}
            <div className="relative h-[46svh] min-h-[300px]">
              {DEPTHS.map((d, i) => (
                <div
                  key={d.id}
                  className="band absolute inset-0"
                  style={{
                    ["--from" as string]: band(i),
                    ["--to" as string]: band(i + 1),
                    ["--in" as string]: `clamp(0, calc((var(--p) - ${band(i).toFixed(3)}) / 0.045), 1)`,
                    ["--out" as string]: `clamp(0, calc((${band(i + 1).toFixed(3)} - var(--p)) / 0.045), 1)`,
                    opacity: "min(var(--in), var(--out))",
                    // Rises from beneath, then scales past the viewer.
                    transform:
                      "scale(calc(0.94 + var(--in) * 0.06 + (1 - var(--out)) * 0.1)) translate3d(0, calc((1 - var(--in)) * 26px), 0)",
                    filter: "blur(calc((1 - min(var(--in), var(--out))) * 5px))",
                  }}
                >
                  <div
                    className="glass metal-rim h-full overflow-hidden rounded-[var(--radius-panel)]"
                    style={{ boxShadow: "var(--highlight-inset), var(--depth-shadow)" }}
                  >
                    <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className="font-display text-[13px] font-bold tracking-[-0.03em] text-ink">
                          DRK
                        </span>
                        <span aria-hidden className="h-3 w-px bg-white/10" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-hero">
                          {d.label}
                        </span>
                      </div>
                      <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-faint">
                        {`Depth 0${i + 1}`}
                      </span>
                    </div>

                    <div className="grid h-[calc(100%-49px)] grid-cols-1 sm:grid-cols-[1fr_0.9fr]">
                      <div className="border-b border-white/[0.06] p-5 sm:border-b-0 sm:border-r sm:p-7">
                        {d.rows.map(([k, v], r) => (
                          <Readout
                            key={k}
                            k={k}
                            v={v}
                            accent={r === d.rows.length - 1 && i === N - 1}
                          />
                        ))}
                        <p className="mt-5 font-mono text-[9px] uppercase leading-[1.7] tracking-[0.14em] text-ink-faint">
                          Cross-section {`0${i + 1}`} of {`0${N}`} · structure only
                        </p>
                      </div>

                      {/* The layer's cross-section: this depth lit, the ones
                          above and below it visible but receding. */}
                      <div className="flex items-center justify-center p-5 sm:p-7">
                        <div className="flex w-full max-w-[220px] flex-col gap-[7px]">
                          {DEPTHS.map((_, s) => {
                            const dist = Math.abs(s - i);
                            const isThis = s === i;
                            return (
                              <span
                                key={s}
                                className="block rounded-[5px]"
                                style={{
                                  height: isThis ? 22 : 11,
                                  background: isThis
                                    ? "linear-gradient(100deg, rgba(0,255,122,0.34), rgba(0,255,122,0.09))"
                                    : "rgba(255,255,255,0.045)",
                                  border: `1px solid ${isThis ? "rgba(0,255,122,0.5)" : "rgba(255,255,255,0.07)"}`,
                                  boxShadow: isThis
                                    ? "0 0 22px -6px rgba(0,255,122,0.9), inset 0 1px 0 rgba(255,255,255,0.16)"
                                    : "inset 0 1px 0 rgba(255,255,255,0.05)",
                                  opacity: isThis ? 1 : Math.max(0.2, 0.62 - dist * 0.14),
                                  transform: `scaleX(${isThis ? 1 : Math.max(0.62, 1 - dist * 0.1)})`,
                                }}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ---- The payoff ------------------------------------------- */}
            <div
              className="band mt-7 flex flex-col items-center gap-3"
              style={{
                ["--from" as string]: 0.9,
                ["--to" as string]: 0.99,
                opacity: "var(--lp)",
                transform: "translate3d(0, calc((1 - var(--le)) * 12px), 0)",
              }}
            >
              <Chip tone="live">Client view</Chip>
              <p
                className="display text-center text-[clamp(1.4rem,3.4vw,2.4rem)] text-ink"
                style={{ textShadow: "0 0 40px rgba(0,255,122,0.22)" }}
              >
                Unfiltered.
              </p>
            </div>
          </div>
        </div>
      </PinnedStage>
    </>
  );
}
