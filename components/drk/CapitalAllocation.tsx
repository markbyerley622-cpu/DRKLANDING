"use client";

import { Section, SectionHead, Reveal, Panel } from "@/components/ui/Primitives";
import { useScrollProgress, range, smooth } from "@/lib/motion";
import { raise } from "@/content/drk";

/**
 * ACT 14 — THE RAISE
 * No pie chart. A single capacity bar that fills as you scroll, weighted
 * 80/20, with each tranche resolving into its own panel beneath.
 *
 * All four figures here ($1.5M / 80 / 20 / $1.2M / $300K) were supplied in
 * the brief and are used verbatim.
 */
export function CapitalAllocation() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>({ start: 0.88, end: 0.35 });
  const p = smooth(range(progress, 0.05, 0.7));

  return (
    <Section id="raise" className="py-28 sm:py-36 lg:py-44">
      <SectionHead
        eyebrow={raise.eyebrow}
        headline={
          <>
            $1.5M seed round.
            <br />
            <span className="text-ink-muted">80% productive. 20% platform.</span>
          </>
        }
      />

      <div ref={ref} className="mt-14 lg:mt-18">
        {/* ---- Deployment bar ---------------------------------------------- */}
        <Reveal y={26}>
          <div
            className="relative flex h-[86px] w-full overflow-hidden rounded-[16px] sm:h-[104px]"
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
              background: "linear-gradient(180deg, rgba(21,23,22,0.6), rgba(8,13,12,0.85))",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            {/* Productive tranche */}
            <div
              className="relative flex items-center overflow-hidden"
              style={{
                width: "80%",
                transform: `scaleX(${p})`,
                transformOrigin: "left",
                transition: "transform 220ms linear",
                background:
                  "linear-gradient(100deg, rgba(0,255,122,0.20) 0%, rgba(0,255,122,0.09) 55%, rgba(0,255,122,0.04) 100%)",
                borderRight: "1px solid rgba(0,255,122,0.35)",
              }}
            >
              <span
                aria-hidden
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(105deg, rgba(0,255,122,0.09) 0px, rgba(0,255,122,0.09) 1px, transparent 1px, transparent 9px)",
                }}
              />
              <span
                aria-hidden
                className="absolute inset-y-0 right-0 w-px bg-hero"
                style={{ boxShadow: "0 0 16px 2px rgba(0,255,122,0.9)" }}
              />
            </div>

            {/* Platform tranche — silver, not green: capacity vs. overhead */}
            <div
              className="relative overflow-hidden"
              style={{
                width: "20%",
                transform: `scaleX(${range(p, 0.55, 1)})`,
                transformOrigin: "left",
                transition: "transform 220ms linear",
                background:
                  "linear-gradient(100deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.05) 100%)",
              }}
            >
              <span
                aria-hidden
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(105deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1px, transparent 9px)",
                }}
              />
            </div>

            {/* Labels sit above, so the bar never reflows */}
            <div className="pointer-events-none absolute inset-0 flex items-center">
              <span className="flex-[0_0_80%] px-5 sm:px-8">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.2em] transition-opacity duration-700"
                  style={{ color: "var(--color-hero)", opacity: p }}
                >
                  Productive · 80%
                </span>
              </span>
              <span className="flex-[0_0_20%] px-3 sm:px-5">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted transition-opacity duration-700"
                  style={{ opacity: range(p, 0.6, 1) }}
                >
                  Platform · 20%
                </span>
              </span>
            </div>
          </div>
        </Reveal>

        {/* ---- Tranches ------------------------------------------------------ */}
        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr] lg:gap-5">
          {raise.allocation.map((a, i) => {
            const hero = a.tone === "hero";
            return (
              <Reveal key={a.id} delay={i * 130} y={26}>
                <Panel
                  rim={hero}
                  sweep={hero}
                  className="relative flex h-full flex-col p-7 sm:p-9 lg:p-10"
                >
                  {hero && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-12 -bottom-12 h-28 rounded-[50%] blur-2xl"
                      style={{
                        background:
                          "radial-gradient(50% 100% at 50% 0%, rgba(0,255,122,0.22), transparent 70%)",
                      }}
                    />
                  )}

                  <div className="relative flex items-baseline justify-between gap-4">
                    <span
                      className="display text-[clamp(2.2rem,6vw,3.6rem)]"
                      style={{ color: hero ? "var(--color-ink)" : "var(--color-ink-faint)" }}
                    >
                      {a.amount}
                    </span>
                    <span
                      className="font-mono text-[11px] tracking-[0.14em]"
                      style={{ color: hero ? "var(--color-hero)" : "var(--color-ink-ghost)" }}
                    >
                      {a.share}%
                    </span>
                  </div>

                  <h3 className="relative mt-5 font-display text-[18px] font-semibold tracking-[-0.02em] text-ink sm:text-[21px]">
                    {a.title}
                  </h3>
                  <p className="relative mt-3 flex-1 text-[14px] leading-[1.65] text-ink-muted">
                    {a.detail}
                  </p>
                </Panel>
              </Reveal>
            );
          })}
        </div>

        {/* ---- Statement + disclaimer ---------------------------------------- */}
        <Reveal delay={200} className="mt-12 lg:mt-16">
          <p className="display max-w-[820px] text-[clamp(1.3rem,3vw,2.1rem)] text-ink">
            Capital is deployed into{" "}
            <span className="text-hero">productive market capacity</span> while the
            platform scales.
          </p>
        </Reveal>

        <Reveal delay={260} className="mt-8 max-w-[760px]">
          <p className="border-t border-white/[0.06] pt-6 font-mono text-[10px] leading-[1.85] tracking-[0.04em] text-ink-faint">
            {raise.disclaimer}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
