"use client";

import { Reveal, Section, SectionHead } from "@/components/ui/Primitives";
import { capabilities } from "@/content/drk";

/**
 * CAPABILITIES — four rows, not four cards.
 *
 * Cards would each need a claim to fill them. Rows need only a label and a
 * line, so the section states what the system handles and stops. The hairline
 * between rows lights green as it enters; that is the only decoration.
 */
export function Capabilities() {
  return (
    <Section id="capabilities" className="py-28 sm:py-36 lg:py-44">
      <SectionHead eyebrow={capabilities.eyebrow} headline={capabilities.headline} />

      <ul className="mt-14 sm:mt-20">
        {capabilities.items.map((item, i) => (
          <Reveal as="li" key={item.key} delay={i * 90} y={18}>
            <div
              className="group relative grid grid-cols-1 gap-2 py-7 sm:grid-cols-[1fr_1.4fr] sm:gap-10 sm:py-9"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              {/* The rule lights from the left as the row settles. */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-hero/45
                  transition-transform duration-[1400ms] ease-[var(--ease-drk)]
                  group-hover:scale-x-100"
              />

              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[11px] text-ink-ghost">
                  0{i + 1}
                </span>
                <h3 className="font-display text-[22px] font-bold tracking-[-0.02em] text-ink sm:text-[26px]">
                  {item.title}
                </h3>
              </div>

              <p className="text-[15px] leading-[1.6] text-ink-muted sm:text-[16.5px]">
                {item.line}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
