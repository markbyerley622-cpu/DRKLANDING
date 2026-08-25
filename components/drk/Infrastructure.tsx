"use client";

import { Section, SectionHead } from "@/components/ui/Primitives";
import { PinnedStage } from "@/components/system/Stage";
import { Slab } from "@/components/system/Objects";
import { infrastructure } from "@/content/drk";

/**
 * ACT 05 — THE INFRASTRUCTURE
 *
 * The descent. Having just looked at the interface, the reader drops beneath
 * it: the layers assemble bottom-up, inputs are pulled in from the edges, and
 * outputs resolve. The metaphor the whole site runs on, made structural —
 * the UI is what you see, this is what makes it work.
 */

const L = infrastructure.layers; // 04 → 01, top to bottom
const COUNT = L.length;

/** Activation window for a layer, indexed from the BOTTOM of the stack. */
const windowFor = (fromBottom: number) => {
  const start = 0.06 + fromBottom * 0.19;
  return { focus: start, done: start + 0.19 };
};

export function Infrastructure() {
  return (
    <>
      <Section id="infrastructure" className="pt-28 sm:pt-36 lg:pt-40">
        <SectionHead
          eyebrow={infrastructure.eyebrow}
          headline={infrastructure.headline}
          body={infrastructure.body}
        />
      </Section>

      <PinnedStage length={3} compactLength={2.2} phase="Beneath the surface" className="mt-10 sm:mt-14">
        <div className="relative flex h-full w-full items-center justify-center px-4 sm:px-8 lg:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(52% 48% at 50% 52%, rgba(0,255,122,0.05), transparent 72%)",
              opacity: "var(--p)",
              filter: "blur(20px)",
            }}
          />

          <div className="relative grid w-full max-w-[1080px] grid-cols-1 items-center gap-4 lg:grid-cols-[132px_1fr_132px] lg:gap-8">
            <IORail title="Inputs" items={infrastructure.inputs} side="left" from={0.02} span={0.3} />

            <div className="relative">
              <ol className="flex flex-col gap-2 sm:gap-2.5">
                {L.map((layer, i) => {
                  const fromBottom = COUNT - 1 - i;
                  const { focus, done } = windowFor(fromBottom);
                  return (
                    <li
                      key={layer.id}
                      className="band"
                      style={{
                        ["--from" as string]: focus,
                        ["--to" as string]: focus + 0.1,
                        // Focus decays after its turn but never to zero:
                        // earlier layers stay visible beneath the newer ones.
                        ["--focus" as string]: `calc(var(--lp) * clamp(0.45, calc((${done + 0.16} - var(--p)) / 0.14), 1))`,
                      }}
                    >
                      <Slab
                        style={{
                          transform:
                            "translate3d(calc(var(--focus) * 8px), 0, 0) scale(calc(0.985 + var(--focus) * 0.015))",
                          opacity: "calc(0.3 + var(--lp) * 0.7)",
                        }}
                      >
                        <div className="flex items-center gap-4 p-5 sm:gap-6 sm:p-6">
                          <span
                            className="font-mono text-[12px] tracking-[0.16em]"
                            style={{
                              color:
                                "color-mix(in srgb, var(--color-hero) calc(var(--lp) * 100%), var(--color-ink-ghost))",
                            }}
                          >
                            {layer.index}
                          </span>
                          <span
                            aria-hidden
                            className="h-7 w-px shrink-0"
                            style={{
                              background:
                                "color-mix(in srgb, rgba(0,255,122,0.4) calc(var(--lp) * 100%), rgba(255,255,255,0.07))",
                            }}
                          />
                          <h3
                            className="flex-1 font-display text-[17px] font-semibold tracking-[-0.02em] sm:text-[22px]"
                            style={{
                              color:
                                "color-mix(in srgb, var(--color-ink) calc(var(--lp) * 100%), var(--color-ink-faint))",
                            }}
                          >
                            {layer.name}
                          </h3>
                          <span
                            aria-hidden
                            className="h-[6px] w-[6px] shrink-0 rounded-full"
                            style={{
                              background:
                                "color-mix(in srgb, var(--color-hero) calc(var(--lp) * 100%), #232826)",
                              boxShadow: "0 0 calc(var(--lp) * 13px) 1px rgba(0,255,122,0.7)",
                            }}
                          />
                        </div>
                      </Slab>
                    </li>
                  );
                })}
              </ol>

              <p
                className="band mt-7 text-center"
                style={{
                  ["--from" as string]: 0.84,
                  ["--to" as string]: 0.98,
                  opacity: "var(--lp)",
                  transform: "translate3d(0, calc((1 - var(--le)) * 12px), 0)",
                }}
              >
                <span className="display text-[clamp(1.1rem,2.4vw,1.7rem)] text-ink">
                  Our traders operate <span className="text-hero">our software</span>.
                </span>
              </p>
            </div>

            <IORail title="Outputs" items={infrastructure.outputs} side="right" from={0.66} span={0.26} />
          </div>
        </div>
      </PinnedStage>
    </>
  );
}

/* -------------------------------------------------------------------------- */

function IORail({
  title,
  items,
  side,
  from,
  span,
}: {
  title: string;
  items: readonly string[];
  side: "left" | "right";
  from: number;
  span: number;
}) {
  const n = items.length;
  return (
    <div
      className={`glass-quiet w-full rounded-[13px] p-3.5 ${side === "right" ? "lg:order-3" : ""}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-faint">
          {title}
        </span>
        <span
          aria-hidden
          className="h-[4px] w-[4px] rounded-full"
          style={{
            ["--on" as string]: `clamp(0, calc((var(--p) - ${from}) / 0.1), 1)`,
            background: "color-mix(in srgb, var(--color-hero) calc(var(--on) * 100%), #232826)",
            boxShadow: "0 0 calc(var(--on) * 9px) rgba(0,255,122,0.8)",
          }}
        />
      </div>
      {/* Row on compact, column on desktop — the diagram re-forms, not shrinks */}
      <ul className="mt-3 flex flex-row flex-wrap gap-1.5 lg:flex-col lg:gap-2">
        {items.map((item, i) => (
          <li
            key={item}
            className="rounded-[8px] px-2.5 py-[7px]"
            style={{
              ["--on" as string]: `clamp(0, calc((var(--p) - ${from + (i * span) / n}) / ${(span / n).toFixed(3)}), 1)`,
              background:
                "linear-gradient(180deg, rgba(46,52,50,calc(0.2 + 0.4 * var(--on))), rgba(10,15,14,0.6))",
              border: "1px solid rgba(0,255,122,calc(0.2 * var(--on)))",
              transform: `translate3d(calc((1 - var(--on)) * ${side === "left" ? "-6px" : "6px"}), 0, 0)`,
            }}
          >
            <span
              className="whitespace-nowrap font-mono text-[10px] tracking-[0.1em]"
              style={{
                color:
                  "color-mix(in srgb, var(--color-ink) calc(var(--on) * 100%), var(--color-ink-ghost))",
              }}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
