"use client";

import { Reveal, Section, SectionHead } from "@/components/ui/Primitives";
import { useScrollProgress, range, smooth } from "@/lib/motion";
import { market } from "@/content/drk";

/**
 * ACT 07 — EXPANDING MARKET
 *
 * DATA INTEGRITY: the brief referenced supporting market statistics and
 * sources, but none were supplied. No figures are rendered. The thesis is
 * expressed as a widening progression — the visual carries the argument
 * instead of fabricated numbers.
 */
export function Market() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>({ start: 0.9, end: 0.25 });
  const p = smooth(range(progress, 0, 0.9));
  const steps = market.sequence;

  return (
    <Section id="market" className="py-28 sm:py-36 lg:py-44">
      <SectionHead
        eyebrow={market.eyebrow}
        headline={
          <>
            The surface area
            <br />
            keeps <span className="text-ink-muted">expanding.</span>
          </>
        }
        body={market.body}
      />

      <div ref={ref} className="relative mt-16 lg:mt-24">
        {/* The expansion field — concentric arcs widening with scroll */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
          style={{ width: "min(1100px, 96vw)", aspectRatio: "1" }}
        >
          {steps.map((_, i) => {
            const local = range(p, i / steps.length, (i + 1.6) / steps.length);
            return (
              <span
                key={i}
                className="absolute inset-0 rounded-full border"
                style={{
                  borderColor: `rgba(0,255,122,${0.035 + local * 0.06})`,
                  transform: `scale(${0.18 + (i / steps.length) * 0.82 * (0.7 + local * 0.3)})`,
                  opacity: local,
                  transition: "opacity 700ms var(--ease-drk)",
                }}
              />
            );
          })}
        </div>

        <ol className="relative mx-auto max-w-[900px]">
          {steps.map((step, i) => {
            const local = range(p, i / (steps.length + 0.5), (i + 1) / (steps.length + 0.5));
            const on = local > 0.35;
            return (
              <li key={step.id} className="relative flex items-start gap-5 pb-9 last:pb-0 sm:gap-8">
                {/* Spine */}
                {i < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-[15px] top-8 h-[calc(100%-14px)] w-px sm:left-[19px]"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                  >
                    <span
                      className="block w-full"
                      style={{
                        height: `${local * 100}%`,
                        background:
                          "linear-gradient(180deg, var(--color-hero), rgba(0,255,122,0.25))",
                        boxShadow: "0 0 8px rgba(0,255,122,0.5)",
                        transition: "height 200ms linear",
                      }}
                    />
                  </span>
                )}

                {/* Node */}
                <span
                  aria-hidden
                  className="relative z-10 mt-1 flex h-[31px] w-[31px] shrink-0 items-center justify-center rounded-full
                    transition-all duration-700 ease-[var(--ease-drk)] sm:h-[39px] sm:w-[39px]"
                  style={{
                    background: on
                      ? "linear-gradient(180deg, rgba(34,37,35,0.9), rgba(8,13,12,1))"
                      : "rgba(13,17,16,0.7)",
                    border: `1px solid ${on ? "rgba(0,255,122,0.35)" : "rgba(255,255,255,0.07)"}`,
                    boxShadow: on ? "0 0 22px -8px rgba(0,255,122,0.9)" : "none",
                    transform: `scale(${on ? 1 : 0.86})`,
                  }}
                >
                  <span
                    className="font-mono text-[9.5px] tracking-[0.08em] transition-colors duration-700 sm:text-[10.5px]"
                    style={{ color: on ? "var(--color-hero)" : "var(--color-ink-ghost)" }}
                  >
                    {step.step}
                  </span>
                </span>

                {/* Label — scales up as the sequence widens */}
                <h3
                  className="display pt-0.5 transition-all duration-700 ease-[var(--ease-drk)]"
                  style={{
                    fontSize: `clamp(${1.25 + i * 0.06}rem, ${2.4 + i * 0.28}vw, ${1.7 + i * 0.19}rem)`,
                    color: on ? "var(--color-ink)" : "var(--color-ink-ghost)",
                    transform: on ? "translateX(0)" : "translateX(-8px)",
                  }}
                >
                  {step.title}
                </h3>
              </li>
            );
          })}
        </ol>

        <Reveal delay={180} className="mx-auto mt-12 max-w-[900px]">
          <p className="border-t border-white/[0.06] pt-6 font-mono text-[10px] leading-[1.75] tracking-[0.04em] text-ink-faint">
            Directional thesis. Supporting market statistics and sources are withheld
            pending verification — no figures are asserted on this page.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
