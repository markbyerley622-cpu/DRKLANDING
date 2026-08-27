"use client";

import { Reveal, Section, SectionHead } from "@/components/ui/Primitives";
import { approach } from "@/content/drk";

/**
 * APPROACH — three steps, connected.
 *
 * The connector between the steps is the point: assets do not disappear
 * between one stage and the next. The liquid running behind this act belongs
 * to the middle band (see `app/page.tsx`), not to the act — the same body of
 * fluid from the hero, further down and quieter.
 */
export function Approach() {
  return (
    <Section id="approach" className="relative py-28 sm:py-36 lg:py-44">
      <SectionHead eyebrow={approach.eyebrow} headline={approach.headline} />

      <ol className="relative mt-14 grid gap-px sm:mt-20 sm:grid-cols-3">
        {/* The line the steps sit on. */}
        <span
          aria-hidden
          className="absolute left-0 top-0 hidden h-px w-full sm:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,255,122,0.4), rgba(255,255,255,0.09) 55%, transparent)",
          }}
        />

        {approach.steps.map((step, i) => (
          <Reveal as="li" key={step.n} delay={i * 130} y={20}>
            <div
              className="relative h-full py-8 sm:px-7 sm:py-10"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.07)",
                borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.06)" : undefined,
              }}
            >
              {/* The node on the line above this step. */}
              <span
                aria-hidden
                className="absolute left-0 top-0 hidden h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-hero sm:left-7 sm:block"
                style={{ boxShadow: "0 0 12px 1px rgba(0,255,122,0.7)" }}
              />

              <span className="font-mono text-[11px] tracking-[0.2em] text-ink-ghost">
                {step.n}
              </span>
              <h3 className="mt-4 font-display text-[22px] font-bold tracking-[-0.02em] text-ink sm:text-[25px]">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[34ch] text-[15px] leading-[1.6] text-ink-muted sm:text-[16px]">
                {step.line}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
