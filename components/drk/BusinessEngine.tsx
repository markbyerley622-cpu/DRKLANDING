"use client";

import { useState } from "react";
import { Section, SectionHead, Reveal, Panel } from "@/components/ui/Primitives";
import { useScrollProgress, range, smooth } from "@/lib/motion";
import { business, compounding } from "@/content/drk";

/**
 * ACTS 12 + 13 — BUSINESS ENGINE & COMPOUNDING
 * Deliberately merged into one narrative: monetisation layers stack, then the
 * loop that feeds them turns.
 *
 * DATA INTEGRITY: the brief referenced specific revenue streams, economics,
 * three-year projections and mandate sizes "exactly as approved" — but no
 * figures were supplied. Nothing numeric is invented. The structure is built
 * and the value slots are explicitly marked as awaiting approval.
 */
export function BusinessEngine() {
  return (
    <Section id="business" className="py-28 sm:py-36 lg:py-44">
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

      {/* ---- Monetisation layers ------------------------------------------- */}
      <div className="mt-14 grid grid-cols-1 gap-4 lg:mt-16 lg:grid-cols-3 lg:gap-5">
        {business.layers.map((layer, i) => (
          <Reveal key={layer.id} delay={i * 120} y={28} className="h-full">
            <Panel
              rim={i === 0}
              sweep={i === 0}
              className="group flex h-full flex-col p-7 transition-transform duration-700
                ease-[var(--ease-drk)] hover:-translate-y-1 sm:p-8"
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: i === 0 ? "var(--color-hero)" : "var(--color-ink-ghost)" }}
                >
                  {layer.horizon}
                </span>
                <span className="font-mono text-[10px] tracking-[0.14em] text-ink-ghost">
                  0{i + 1}
                </span>
              </div>

              <h3 className="mt-6 font-display text-[21px] font-semibold tracking-[-0.025em] text-ink sm:text-[24px]">
                {layer.title}
              </h3>
              <p className="mt-3.5 flex-1 text-[14px] leading-[1.65] text-ink-muted">
                {layer.detail}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-white/[0.06] pt-5">
                <span className="font-mono text-[11px] tracking-[0.06em] text-ink">
                  {layer.basis}
                </span>
                <span
                  className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-ghost"
                  title="Figures withheld pending founder approval"
                >
                  Figures pending
                </span>
              </div>
            </Panel>
          </Reveal>
        ))}
      </div>

      {/* ---- The compounding loop ------------------------------------------- */}
      <CompoundingLoop />
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function CompoundingLoop() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>({ start: 0.9, end: 0.2 });
  const p = smooth(range(progress, 0.05, 0.85));
  const [year, setYear] = useState(0);
  const steps = compounding.loop;

  return (
    <div ref={ref} className="mt-24 lg:mt-32">
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

      <div className="mt-14 lg:mt-16">
        <Panel rim className="overflow-hidden p-6 sm:p-9 lg:p-12">
          {/* --- The cycle --- */}
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-4 sm:gap-x-3">
            {steps.map((step, i) => {
              const gate = i / steps.length;
              const on = p > gate;
              return (
                <li key={step} className="flex items-center gap-2 sm:gap-3">
                  <span
                    className="rounded-[10px] px-3 py-2.5 transition-all duration-700 ease-[var(--ease-drk)] sm:px-4 sm:py-3"
                    style={{
                      background: on
                        ? "linear-gradient(180deg, rgba(34,37,35,0.8), rgba(8,13,12,0.9))"
                        : "rgba(13,17,16,0.5)",
                      border: `1px solid ${on ? "rgba(0,255,122,0.24)" : "rgba(255,255,255,0.055)"}`,
                      boxShadow: on
                        ? "inset 0 1px 0 rgba(255,255,255,0.08), 0 0 26px -12px rgba(0,255,122,0.9)"
                        : "none",
                      transform: `scale(${on ? 1 : 0.97})`,
                    }}
                  >
                    <span
                      className="whitespace-nowrap font-mono text-[10.5px] tracking-[0.08em] transition-colors duration-700 sm:text-[11.5px]"
                      style={{ color: on ? "var(--color-ink)" : "var(--color-ink-ghost)" }}
                    >
                      {step}
                    </span>
                  </span>

                  {i < steps.length - 1 ? (
                    <svg width="13" height="9" viewBox="0 0 13 9" fill="none" aria-hidden>
                      <path
                        d="M0.5 4.5h10M8 1.5l3 3-3 3"
                        stroke={on ? "rgba(0,255,122,0.75)" : "rgba(255,255,255,0.13)"}
                        strokeWidth="1.1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-all duration-700"
                      />
                    </svg>
                  ) : (
                    /* The loop closes back on itself */
                    <span
                      className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.16em] transition-colors duration-700"
                      style={{ color: p > 0.95 ? "var(--color-hero)" : "var(--color-ink-ghost)" }}
                    >
                      <svg width="15" height="11" viewBox="0 0 15 11" fill="none" aria-hidden>
                        <path
                          d="M14 1v4a3 3 0 0 1-3 3H1.5M4 5.5 1 8.5l3 3"
                          stroke="currentColor"
                          strokeWidth="1.1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Repeats
                    </span>
                  )}
                </li>
              );
            })}
          </ol>

          <div className="rule-h my-9 sm:my-11" />

          {/* --- Year selector --- */}
          <div className="flex flex-wrap items-center gap-2.5">
            {compounding.years.map((y, i) => {
              const on = i === year;
              return (
                <button
                  key={y.id}
                  type="button"
                  onClick={() => setYear(i)}
                  aria-pressed={on}
                  className="rounded-full px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.16em]
                    transition-all duration-500 ease-[var(--ease-drk)]"
                  style={{
                    color: on ? "var(--color-ink)" : "var(--color-ink-faint)",
                    background: on
                      ? "linear-gradient(180deg, rgba(34,37,35,0.9), rgba(13,17,16,0.95))"
                      : "transparent",
                    border: `1px solid ${on ? "rgba(0,255,122,0.3)" : "rgba(255,255,255,0.07)"}`,
                    boxShadow: on ? "0 0 20px -9px rgba(0,255,122,0.9)" : "none",
                  }}
                >
                  {y.label}
                </button>
              );
            })}
            <span className="ml-auto font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-ghost">
              Projections pending approval
            </span>
          </div>

          {/* --- Year detail --- */}
          <div key={year} className="mt-7" style={{ animation: "drk-rise 620ms var(--ease-drk) both" }}>
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <h3 className="display text-[clamp(1.6rem,4vw,2.6rem)] text-ink">
                {compounding.years[year].posture}
              </h3>
              <span className="font-mono text-[11px] tracking-[0.08em] text-hero">
                {compounding.years[year].scale}
              </span>
            </div>

            {/* Dimensions — structure present, values withheld */}
            <div className="mt-7 overflow-x-auto" style={{ scrollbarWidth: "thin" }}>
              <table className="w-full min-w-[560px] border-collapse">
                <thead>
                  <tr>
                    {compounding.dimensions.map((d) => (
                      <th
                        key={d}
                        scope="col"
                        className="border-b border-white/[0.07] pb-3 pr-6 text-left font-mono
                          text-[9.5px] font-normal uppercase tracking-[0.18em] text-ink-ghost last:pr-0"
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
                        className="border-b border-white/[0.04] py-5 pr-6 align-top last:pr-0"
                        style={{ animation: `drk-rise 560ms var(--ease-drk) ${i * 70}ms both` }}
                      >
                        <span className="flex items-center gap-2 font-mono text-[12px] text-ink-faint">
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

            <p className="mt-7 max-w-[640px] font-mono text-[10px] leading-[1.75] tracking-[0.04em] text-ink-faint">
              Program counts, average earnings, revenue and mandate sizes were referenced
              in the source material but not supplied. The structure is in place; values
              are withheld until approved. No projection is asserted on this page.
            </p>
          </div>
        </Panel>
      </div>
    </div>
  );
}
