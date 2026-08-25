"use client";

import { Section, SectionHead } from "@/components/ui/Primitives";
import { PinnedStage } from "@/components/system/Stage";
import { Slab } from "@/components/system/Objects";
import { architecture } from "@/content/drk";

/**
 * ACT 06 — PINNED STACK EXPLORER
 *
 * The user climbs the stack. Layers activate bottom-up; each one expands to
 * explain itself, reveals its connections, then recedes — visible but quiet —
 * as the next takes focus.
 *
 *   0.04 → 0.24   01 Liquidity Engine
 *   0.24 → 0.44   02 Routing Layer
 *   0.44 → 0.64   03 Risk & Controls
 *   0.64 → 0.82   04 Data & Insights
 *   0.82 → 1.00   All layers hold together. Inputs flow in, outputs emerge,
 *                 and the closing statement lands.
 */

// content order is 04 → 01 (top to bottom); activation runs bottom-up.
const LAYERS = architecture.layers;
const COUNT = LAYERS.length;

/** Activation window for a layer, indexed from the BOTTOM of the stack. */
function windowFor(fromBottom: number) {
  const start = 0.04 + fromBottom * 0.2;
  return { focus: start, done: start + 0.2 };
}

export function Architecture() {
  return (
    <>
      <Section id="architecture" className="pt-28 sm:pt-36 lg:pt-44">
        <SectionHead
          eyebrow={architecture.eyebrow}
          headline="We own the stack."
          body="Inputs arrive fragmented. They leave as execution and attributed reporting. Every layer in between is ours."
        />
      </Section>

      <PinnedStage length={3.2} compactLength={2.2} phase="Stack online" className="mt-14 sm:mt-16">
        <div className="relative flex h-full w-full items-center justify-center px-4 sm:px-8 lg:px-12">
          {/* Core bloom — brightens as the stack completes */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(52% 48% at 50% 52%, rgba(0,255,122,0.11), transparent 72%)",
              opacity: "var(--p)",
              filter: "blur(20px)",
            }}
          />

          <div className="relative grid w-full max-w-[1180px] grid-cols-1 items-center gap-5 lg:grid-cols-[150px_1fr_150px] lg:gap-8">
            {/* ---- INPUTS -------------------------------------------------- */}
            <IORail
              title="Inputs"
              items={architecture.inputs}
              side="left"
              from={0.02}
              span={0.3}
            />

            {/* ---- THE STACK ---------------------------------------------- */}
            <div className="relative">
              <ol className="flex flex-col gap-2 sm:gap-2.5">
                {LAYERS.map((layer, i) => {
                  const fromBottom = COUNT - 1 - i;
                  const { focus, done } = windowFor(fromBottom);
                  return (
                    <li
                      key={layer.id}
                      className="band"
                      style={{
                        ["--from" as string]: focus,
                        ["--to" as string]: focus + 0.1,
                        // Focus decays after this layer's turn, but never to
                        // zero — earlier layers stay visible underneath.
                        ["--focus" as string]: `calc(var(--lp) * clamp(0.42, calc((${done + 0.16} - var(--p)) / 0.14), 1))`,
                      }}
                    >
                      <Slab
                        style={{
                          // Slab reads --lp for its material activation.
                          transform:
                            "translate3d(calc(var(--focus) * 8px), 0, 0) scale(calc(0.985 + var(--focus) * 0.015))",
                          opacity: "calc(0.32 + var(--lp) * 0.68)",
                        }}
                      >
                        <div className="flex items-center gap-4 p-4 sm:gap-6 sm:p-5 lg:p-6">
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
                            className="h-8 w-px shrink-0"
                            style={{
                              background:
                                "color-mix(in srgb, rgba(0,255,122,0.4) calc(var(--lp) * 100%), rgba(255,255,255,0.07))",
                            }}
                          />
                          <div className="min-w-0 flex-1">
                            <h3
                              className="font-display text-[16px] font-semibold tracking-[-0.02em] sm:text-[20px]"
                              style={{
                                color:
                                  "color-mix(in srgb, var(--color-ink) calc(var(--lp) * 100%), var(--color-ink-faint))",
                              }}
                            >
                              {layer.name}
                            </h3>
                            {/* Detail expands only while the layer has focus */}
                            <p
                              className="overflow-hidden text-[12.5px] leading-[1.5] text-ink-muted sm:text-[13.5px]"
                              style={{
                                maxHeight: "calc(var(--focus) * 44px)",
                                opacity: "var(--focus)",
                                marginTop: "calc(var(--focus) * 6px)",
                              }}
                            >
                              {layer.detail}
                            </p>
                          </div>
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

              {/* Climax statement */}
              <p
                className="band mt-7 text-center text-[clamp(1.05rem,2.3vw,1.6rem)] sm:mt-9"
                style={{
                  ["--from" as string]: 0.86,
                  ["--to" as string]: 0.99,
                  opacity: "var(--lp)",
                  transform: "translate3d(0, calc((1 - var(--le)) * 12px), 0)",
                }}
              >
                <span className="display text-ink">
                  Our traders operate <span className="text-hero">our software</span>.
                </span>
              </p>
            </div>

            {/* ---- OUTPUTS ------------------------------------------------- */}
            <IORail
              title="Outputs"
              items={architecture.outputs}
              side="right"
              from={0.66}
              span={0.28}
            />
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
      className={`glass-quiet w-full rounded-[14px] p-3.5 sm:p-4 ${
        side === "right" ? "lg:order-3" : ""
      }`}
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
                "linear-gradient(180deg, rgba(34,37,35,calc(0.25 + 0.45 * var(--on))), rgba(10,15,14,0.6))",
              border: "1px solid rgba(0,255,122,calc(0.2 * var(--on)))",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,calc(0.05 + 0.05 * var(--on)))",
              transform: `translate3d(calc((1 - var(--on)) * ${side === "left" ? "-6px" : "6px"}), 0, 0)`,
            }}
          >
            <span
              className="whitespace-nowrap font-mono text-[10px] tracking-[0.1em] sm:text-[10.5px]"
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
