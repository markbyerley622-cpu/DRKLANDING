"use client";

import { useState } from "react";
import { Reveal, Section, SectionHead, Panel } from "@/components/ui/Primitives";
import { useScrollProgress, range, useIsCompact } from "@/lib/motion";
import { architecture } from "@/content/drk";

/**
 * ACT 06 — THE STACK
 * A layered architecture that activates from the bottom up as you scroll.
 * Inputs feed the core from the left; outputs emerge on the right.
 *
 * Desktop  → layered slab stack with orbiting I/O rails.
 * Mobile   → the same four layers as a vertical progressive flow, with the
 *            I/O collapsed into two labelled bands. Not a shrunk diagram.
 */
export function Architecture() {
  const compact = useIsCompact();
  const { ref, progress } = useScrollProgress<HTMLDivElement>({ start: 0.85, end: 0.3 });
  const [hovered, setHovered] = useState<number | null>(null);

  const layers = architecture.layers; // 04 → 01, top to bottom
  // Activate from the bottom layer (01) upward.
  const activeCount = Math.round(range(progress, 0.08, 0.78) * layers.length);
  const isOn = (i: number) => {
    const fromBottom = layers.length - 1 - i;
    return fromBottom < activeCount;
  };
  const focus = hovered;

  return (
    <Section id="architecture" className="py-28 sm:py-36 lg:py-44">
      <SectionHead
        eyebrow={architecture.eyebrow}
        headline="We own the stack."
        body="Inputs arrive fragmented. They leave as execution and attributed reporting. Every layer in between is ours."
      />

      <div ref={ref} className="mt-16 lg:mt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10">
          {/* ---- Inputs rail ------------------------------------------------ */}
          <IORail
            title="Inputs"
            items={architecture.inputs}
            side="left"
            progress={range(progress, 0.02, 0.4)}
            compact={compact}
          />

          {/* ---- The stack --------------------------------------------------- */}
          <div className="relative">
            {/* Core bloom, brightest once the whole stack is live */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(55% 60% at 50% 55%, rgba(0,255,122,0.1), transparent 72%)",
                opacity: activeCount / layers.length,
                filter: "blur(24px)",
                transition: "opacity 900ms var(--ease-drk)",
              }}
            />

            <ul className="flex flex-col gap-2.5 sm:gap-3">
              {layers.map((layer, i) => {
                const on = isOn(i);
                const dim = focus !== null && focus !== i;
                return (
                  <li key={layer.id}>
                    {/* Layers activate on scroll; hover only isolates one.
                        Nothing here is actionable, so it stays out of the
                        tab order rather than becoming a dead focus stop. */}
                    <div
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      className="group relative block w-full overflow-hidden rounded-[14px]
                        transition-all duration-700 ease-[var(--ease-drk)]"
                      style={{
                        background: on
                          ? "linear-gradient(160deg, rgba(34,37,35,0.72), rgba(13,17,16,0.86))"
                          : "linear-gradient(160deg, rgba(21,23,22,0.4), rgba(8,13,12,0.6))",
                        border: `1px solid ${on ? "rgba(0,255,122,0.2)" : "rgba(255,255,255,0.055)"}`,
                        boxShadow: on
                          ? "inset 0 1px 0 rgba(255,255,255,0.1), 0 18px 40px -26px rgba(0,0,0,0.9)"
                          : "inset 0 1px 0 rgba(255,255,255,0.04)",
                        opacity: dim ? 0.45 : 1,
                        transform: focus === i ? "translateX(6px)" : "translateX(0)",
                      }}
                    >
                      {/* Activation wipe travelling left→right when the layer lights */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 left-0 w-full origin-left transition-transform duration-[1200ms] ease-[var(--ease-drk)]"
                        style={{
                          transform: `scaleX(${on ? 1 : 0})`,
                          background:
                            "linear-gradient(90deg, rgba(0,255,122,0.1), rgba(0,255,122,0.02) 40%, transparent 75%)",
                        }}
                      />

                      <div className="relative flex items-center gap-4 p-5 sm:gap-6 sm:p-6 lg:p-7">
                        <span
                          className="font-mono text-[12px] tracking-[0.16em] transition-colors duration-700"
                          style={{ color: on ? "var(--color-hero)" : "var(--color-ink-ghost)" }}
                        >
                          {layer.index}
                        </span>

                        <span
                          aria-hidden
                          className="h-8 w-px shrink-0 transition-colors duration-700"
                          style={{
                            background: on ? "rgba(0,255,122,0.3)" : "rgba(255,255,255,0.07)",
                          }}
                        />

                        <div className="min-w-0 flex-1">
                          <h3
                            className="font-display text-[17px] font-semibold tracking-[-0.02em] transition-colors duration-700 sm:text-[21px]"
                            style={{ color: on ? "var(--color-ink)" : "var(--color-ink-faint)" }}
                          >
                            {layer.name}
                          </h3>
                          <p
                            className="mt-1.5 text-[13px] leading-[1.55] transition-all duration-700 sm:text-[13.5px]"
                            style={{
                              color: on ? "var(--color-ink-muted)" : "var(--color-ink-ghost)",
                            }}
                          >
                            {layer.detail}
                          </p>
                        </div>

                        <span
                          aria-hidden
                          className="h-[6px] w-[6px] shrink-0 rounded-full transition-all duration-700"
                          style={{
                            background: on ? "var(--color-hero)" : "#232826",
                            boxShadow: on ? "0 0 12px 1px rgba(0,255,122,0.7)" : "none",
                          }}
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <Reveal delay={120} className="mt-7">
              <p className="display text-center text-[clamp(1.15rem,2.4vw,1.7rem)] text-ink">
                Our traders operate <span className="text-hero">our software</span>.
              </p>
            </Reveal>
          </div>

          {/* ---- Outputs rail ------------------------------------------------ */}
          <IORail
            title="Outputs"
            items={architecture.outputs}
            side="right"
            progress={range(progress, 0.5, 0.95)}
            compact={compact}
          />
        </div>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function IORail({
  title,
  items,
  side,
  progress,
  compact,
}: {
  title: string;
  items: readonly string[];
  side: "left" | "right";
  progress: number;
  compact: boolean;
}) {
  return (
    <Panel
      variant="quiet"
      className={`w-full p-4 sm:p-5 lg:w-[168px] ${side === "right" ? "lg:order-3" : ""}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-ghost">
          {title}
        </span>
        <span
          aria-hidden
          className="h-[4px] w-[4px] rounded-full transition-all duration-700"
          style={{
            background: progress > 0.5 ? "var(--color-hero)" : "#232826",
            boxShadow: progress > 0.5 ? "0 0 8px rgba(0,255,122,0.7)" : "none",
          }}
        />
      </div>

      <ul
        className={`mt-4 flex gap-2 ${compact ? "flex-row flex-wrap" : "flex-col"} lg:flex-col`}
      >
        {items.map((item, i) => {
          const on = progress > (i + 0.4) / items.length;
          return (
            <li
              key={item}
              className="rounded-[8px] px-2.5 py-2 transition-all duration-700 ease-[var(--ease-drk)]"
              style={{
                background: on ? "rgba(34,37,35,0.6)" : "rgba(13,17,16,0.4)",
                border: `1px solid ${on ? "rgba(0,255,122,0.18)" : "rgba(255,255,255,0.05)"}`,
                transform: on ? "translateX(0)" : `translateX(${side === "left" ? -6 : 6}px)`,
              }}
            >
              <span
                className="whitespace-nowrap font-mono text-[10.5px] tracking-[0.1em] transition-colors duration-700"
                style={{ color: on ? "var(--color-ink)" : "var(--color-ink-ghost)" }}
              >
                {item}
              </span>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}
