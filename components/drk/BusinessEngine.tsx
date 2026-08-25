"use client";

import { Section, SectionHead } from "@/components/ui/Primitives";
import { PinnedStage } from "@/components/system/Stage";
import { Orb, Node } from "@/components/system/Objects";
import { business, compounding } from "@/content/drk";

/**
 * ACTS 12 + 13 — THE ENGINE MONETISES, THEN COMPOUNDS
 *
 * The same engine object from Act 03 returns, so the business model is
 * visibly the same machine rather than a new marketing section. Three
 * monetisation outcomes branch out and route back into it.
 *
 * Compounding is then built as a true loop: seven stations around a ring,
 * lighting in sequence, and once the ring closes a packet runs continuously
 * around it. Year 1/2/3 appears only after the loop is established.
 *
 * DATA INTEGRITY: no revenue figures, program counts or projections were
 * supplied. The structure is animated honestly and every value slot reads
 * "Pending" — ready to receive approved numbers without a redesign.
 */

export function BusinessEngine() {
  return (
    <>
      {/* ================= ACT 12 — MONETISATION ======================== */}
      <Section id="business" className="pt-28 sm:pt-36 lg:pt-44">
        <SectionHead
          eyebrow={business.eyebrow}
          headline={
            <>
              One engine.
              <br />
              <span className="text-ink-muted">Multiple monetisation layers.</span>
            </>
          }
          body={business.body}
        />
      </Section>

      <PinnedStage length={2.2} compactLength={1.6} phase="Monetising" className="mt-12 sm:mt-16">
        <div className="relative flex h-full w-full items-center justify-center px-5 sm:px-8">
          <div className="relative w-full max-w-[1040px]">
            {/* The same engine, still running */}
            <div className="relative z-20 flex justify-center">
              <Orb
                size={132}
                className="sm:!h-[156px] sm:!w-[156px]"
                style={{ ["--orb-a" as string]: "clamp(0.4, calc(var(--p) / 0.2), 1)" }}
              />
            </div>

            {/* Outbound + return paths */}
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-[26%] z-10 hidden h-[40%] w-full lg:block"
              viewBox="0 0 1000 300"
              preserveAspectRatio="none"
            >
              {[
                { d: "M500 0 V52 Q500 84 460 84 H208 Q168 84 168 116 V168", from: 0.22 },
                { d: "M500 0 V168", from: 0.3 },
                { d: "M500 0 V52 Q500 84 540 84 H792 Q832 84 832 116 V168", from: 0.38 },
              ].map((p, i) => (
                <g key={i} style={{ ["--from" as string]: p.from, ["--to" as string]: p.from + 0.18, ["--len" as string]: 420 }}>
                  <path d={p.d} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                  <path
                    className="band band-draw"
                    d={p.d}
                    fill="none"
                    stroke="var(--color-hero)"
                    strokeWidth="1"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    style={{ opacity: 0.8 }}
                  />
                </g>
              ))}
            </svg>

            {/* Three monetisation outcomes */}
            <div className="relative z-20 mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-5">
              {business.layers.map((layer, i) => {
                const from = 0.34 + i * 0.08;
                return (
                  <div
                    key={layer.id}
                    className="band glass-quiet rounded-[15px] p-5 sm:p-6"
                    style={{
                      ["--from" as string]: from,
                      ["--to" as string]: from + 0.14,
                      opacity: "calc(0.25 + var(--lp) * 0.75)",
                      transform: "translate3d(0, calc((1 - var(--le)) * 16px), 0)",
                      borderColor: "rgba(0,255,122,calc(0.2 * var(--lp)))",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.07), 0 0 calc(var(--lp) * 34px) -20px rgba(0,255,122,0.9)",
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className="font-mono text-[10px] uppercase tracking-[0.2em] lit-text"
                      >
                        {layer.horizon}
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.14em] text-ink-faint">
                        {`0${i + 1}`}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-[18px] font-semibold tracking-[-0.025em] text-ink sm:text-[21px]">
                      {layer.title}
                    </h3>
                    <p className="mt-2.5 text-[13px] leading-[1.6] text-ink-muted">
                      {layer.detail}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-white/[0.06] pt-4">
                      <span className="font-mono text-[10.5px] tracking-[0.06em] text-ink">
                        {layer.basis}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
                        Figures pending
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <p
              className="band mt-9 text-center text-[clamp(1.05rem,2.2vw,1.5rem)]"
              style={{
                ["--from" as string]: 0.74,
                ["--to" as string]: 0.9,
                opacity: "var(--lp)",
                transform: "translate3d(0, calc((1 - var(--le)) * 10px), 0)",
              }}
            >
              <span className="display text-ink">
                Every layer routes back into{" "}
                <span className="text-hero">the same engine</span>.
              </span>
            </p>
          </div>
        </div>
      </PinnedStage>

      {/* ================= ACT 13 — COMPOUNDING ========================= */}
      <Section className="pt-28 sm:pt-36 lg:pt-40">
        <SectionHead
          eyebrow={compounding.eyebrow}
          headline={
            <>
              The loop that
              <br />
              <span className="text-ink-muted">widens itself.</span>
            </>
          }
          body={compounding.body}
        />
      </Section>

      <CompoundingLoop />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* The loop                                                                   */
/* -------------------------------------------------------------------------- */

const LOOP = compounding.loop;
const LN = LOOP.length;
/** Stations light between 0.06 and 0.66; the ring closes at 0.7. */
const station = (i: number) => 0.06 + (i * 0.6) / LN;

export function CompoundingLoop() {
  const R = 38; // ring radius in viewBox units
  const pos = (i: number) => {
    const a = (i / LN) * Math.PI * 2 - Math.PI / 2;
    return { x: 50 + R * Math.cos(a), y: 50 + R * Math.sin(a) };
  };

  return (
    <PinnedStage length={2.6} compactLength={2} phase="Compounding" className="mt-12 sm:mt-16">
      <div className="relative flex h-full w-full items-center justify-center px-5 sm:px-8">
        <div className="relative flex w-full max-w-[1080px] flex-col items-center gap-8 lg:flex-row lg:gap-14">
          {/* ---- The ring ------------------------------------------- */}
          <div className="relative w-full max-w-[400px] shrink-0 lg:max-w-[440px]">
            <svg viewBox="0 0 100 100" className="w-full overflow-visible" aria-hidden>
              {/* dormant ring */}
              <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.4" />

              {/* the ring drawing itself */}
              <circle
                cx="50"
                cy="50"
                r={R}
                fill="none"
                stroke="var(--color-hero)"
                strokeWidth="0.5"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                strokeDasharray={2 * Math.PI * R}
                strokeDashoffset={`calc(${2 * Math.PI * R} * (1 - clamp(0, calc(var(--p) / 0.66), 1)))`}
                style={{ filter: "drop-shadow(0 0 2px rgba(0,255,122,0.4))", opacity: 0.8 }}
              />

              {/* packet circulating once the loop closes */}
              <circle
                cx="50"
                cy="50"
                r={R}
                fill="none"
                stroke="var(--color-tint)"
                strokeWidth="0.9"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                strokeDasharray={`4 ${2 * Math.PI * R}`}
                style={{
                  opacity: "clamp(0, calc((var(--p) - 0.66) / 0.08), 1)",
                  animation: "drk-orbit 4.5s linear infinite",
                  filter: "drop-shadow(0 0 3px rgba(0,255,122,1))",
                }}
              />

              {/* stations */}
              {LOOP.map((label, i) => {
                const { x, y } = pos(i);
                const on = `clamp(0, calc((var(--p) - ${station(i).toFixed(3)}) / 0.06), 1)`;
                return (
                  <g key={label} style={{ ["--on" as string]: on }}>
                    <circle cx={x} cy={y} r="4" fill="rgba(0,255,122,0.05)" style={{ opacity: "var(--on)" }} />
                    <circle
                      cx={x}
                      cy={y}
                      r="2"
                      fill="color-mix(in srgb, var(--color-hero) calc(var(--on) * 100%), #1c2120)"
                      style={{ filter: "drop-shadow(0 0 3px rgba(0,255,122,0.9))" }}
                    />
                  </g>
                );
              })}

              {/* THREE TURNS, EACH WIDER THAN THE LAST.
                  The loop does not just close — it comes back around bigger.
                  Turn 1 completes, then turn 2 opens outside it, then turn 3
                  outside that. This is the argument the section is making,
                  drawn rather than captioned: capacity widens each turn. */}
              {[
                { r: R - 9, from: 0.7, label: "Year 1" },
                { r: R - 3, from: 0.79, label: "Year 2" },
                { r: R + 3.5, from: 0.88, label: "Year 3" },
              ].map((turn, i) => {
                const c = 2 * Math.PI * turn.r;
                return (
                  <circle
                    key={turn.label}
                    cx="50"
                    cy="50"
                    r={turn.r}
                    fill="none"
                    stroke="var(--color-hero)"
                    strokeWidth={0.34 + i * 0.12}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    strokeDasharray={c}
                    style={{
                      strokeDashoffset: `calc(${c} * (1 - clamp(0, calc((var(--p) - ${turn.from}) / 0.1), 1)))`,
                      opacity: 0.2 + i * 0.16,
                      filter: "drop-shadow(0 0 2px rgba(0,255,122,0.4))",
                    }}
                  />
                );
              })}

              {/* the core, accumulating capacity as the turns complete */}
              <circle
                cx="50"
                cy="50"
                r="9"
                fill="none"
                stroke="rgba(0,255,122,0.16)"
                strokeWidth="0.4"
                style={{
                  transform: "scale(calc(0.6 + var(--p) * 0.7))",
                  transformOrigin: "50px 50px",
                  opacity: "clamp(0, calc(var(--p) / 0.3), 1)",
                }}
              />
              <circle
                cx="50"
                cy="50"
                r="4"
                fill="rgba(0,255,122,0.3)"
                style={{
                  transform: "scale(calc(0.5 + var(--p) * 0.9))",
                  transformOrigin: "50px 50px",
                  filter: "blur(1.5px)",
                }}
              />
            </svg>

            <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-ink-faint">
              Capacity widens each turn
            </p>
          </div>

          {/* ---- Stations list + years ------------------------------- */}
          <div className="w-full lg:flex-1">
            <ol className="grid grid-cols-2 gap-x-5 gap-y-1.5 sm:grid-cols-2">
              {LOOP.map((label, i) => (
                <li
                  key={label}
                  className="flex items-center gap-2.5 py-1"
                  style={{
                    ["--on" as string]: `clamp(0, calc((var(--p) - ${station(i).toFixed(3)}) / 0.06), 1)`,
                  }}
                >
                  <span
                    aria-hidden
                    className="h-[5px] w-[5px] shrink-0 rounded-full"
                    style={{
                      background:
                        "color-mix(in srgb, var(--color-hero) calc(var(--on) * 100%), #232826)",
                      boxShadow: "0 0 calc(var(--on) * 10px) rgba(0,255,122,0.7)",
                    }}
                  />
                  <span
                    className="font-mono text-[10.5px] tracking-[0.06em] sm:text-[11.5px]"
                    style={{
                      color:
                        "color-mix(in srgb, var(--color-ink) calc(var(--on) * 100%), var(--color-ink-ghost))",
                    }}
                  >
                    {label}
                  </span>
                </li>
              ))}
            </ol>

            {/* Years appear only after the loop is established */}
            <div
              className="band mt-8 border-t border-white/[0.06] pt-6"
              style={{
                ["--from" as string]: 0.72,
                ["--to" as string]: 0.86,
                opacity: "var(--lp)",
                transform: "translate3d(0, calc((1 - var(--le)) * 14px), 0)",
              }}
            >
              <div className="flex flex-wrap items-center gap-2.5">
                {compounding.years.map((y, i) => (
                  <span
                    key={y.id}
                    className="rounded-full px-3.5 py-[7px] font-mono text-[10px] uppercase tracking-[0.16em]"
                    style={{
                      ["--on" as string]: `clamp(0, calc((var(--p) - ${(0.76 + i * 0.06).toFixed(2)}) / 0.05), 1)`,
                      color:
                        "color-mix(in srgb, var(--color-ink) calc(var(--on) * 100%), var(--color-ink-faint))",
                      border: "1px solid rgba(0,255,122,calc(0.28 * var(--on)))",
                      background:
                        "linear-gradient(180deg, rgba(34,37,35,calc(0.8 * var(--on))), rgba(13,17,16,calc(0.9 * var(--on))))",
                    }}
                  >
                    {y.label}
                  </span>
                ))}
                <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                  Projections pending approval
                </span>
              </div>

              {/* Structure ready for approved numbers; no values invented */}
              <div className="scroll-x mt-5">
                <table className="w-full min-w-[520px] border-collapse">
                  <thead>
                    <tr>
                      {compounding.dimensions.map((d) => (
                        <th
                          key={d}
                          scope="col"
                          className="border-b border-white/[0.07] pb-2.5 pr-5 text-left font-mono text-[9px] font-normal uppercase tracking-[0.16em] text-ink-faint last:pr-0"
                        >
                          {d}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {compounding.dimensions.map((d, i) => (
                        <td
                          key={d}
                          className="border-b border-white/[0.04] py-4 pr-5 align-top last:pr-0"
                          style={{
                            ["--on" as string]: `clamp(0, calc((var(--p) - ${(0.8 + i * 0.025).toFixed(3)}) / 0.05), 1)`,
                            opacity: "calc(0.3 + var(--on) * 0.7)",
                          }}
                        >
                          <span className="flex items-center gap-2 font-mono text-[11.5px] text-ink-faint">
                            <span aria-hidden className="text-ink-ghost">
                              ——
                            </span>
                            Pending
                          </span>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-5 max-w-[620px] font-mono text-[9.5px] leading-[1.75] tracking-[0.04em] text-ink-faint">
                Program counts, average earnings, revenue and mandate sizes were
                referenced in the source material but not supplied. The structure is
                in place; values are withheld until approved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PinnedStage>
  );
}
