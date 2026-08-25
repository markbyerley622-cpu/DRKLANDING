"use client";

import { Section, SectionHead } from "@/components/ui/Primitives";
import { PinnedStage } from "@/components/system/Stage";
import { lifecycle } from "@/content/drk";

/**
 * ACT 09 — THE SYSTEM STAYS WITH THE LAUNCH
 *
 * The DRK signal is fixed at the centre of the frame. The market moves past
 * it: the lifecycle rail translates horizontally under the scroll while the
 * signal never leaves. The message is structural, not written —
 * "the market changes shape, the operating system stays connected."
 *
 * On compact viewports the rail becomes vertical and the signal stays pinned
 * to the left spine. Same continuity, different axis.
 */

const STAGES = lifecycle.stages;
const N = STAGES.length;
/**
 * Progress at which stage `i` sits on the signal line. This MUST be the same
 * mapping the rail transform uses, or the highlight desyncs from the position.
 * Linear across the full travel: stage 0 centred at p=0, stage N-1 at p=1.
 */
const at = (i: number) => i / (N - 1);

export function Lifecycle() {
  return (
    <>
      <Section id="lifecycle" className="pt-28 sm:pt-36 lg:pt-44">
        <SectionHead
          eyebrow={lifecycle.eyebrow}
          headline={
            <>
              Present from the
              <br />
              <span className="text-ink-muted">first block onward.</span>
            </>
          }
          body={lifecycle.body}
        />
      </Section>

      <PinnedStage length={2.6} compactLength={2} phase="Operating" className="mt-12 sm:mt-16">
        <div className="relative h-full w-full overflow-hidden">
          {/* ---- The persistent DRK signal --------------------------- */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-1/2 z-20 hidden w-px -translate-x-1/2 md:block"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(0,255,122,0.35) 22%, rgba(0,255,122,0.35) 78%, transparent)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:block"
          >
            <span
              className="block h-[13px] w-[13px] rounded-full bg-hero"
              style={{
                boxShadow: "0 0 26px 5px rgba(0,255,122,0.55), 0 0 0 6px rgba(0,255,122,0.09)",
                animation: "drk-pulse 3.2s ease-in-out infinite",
              }}
            />
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[calc(50%+26px)] z-20 hidden -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.24em] text-hero md:block"
          >
            DRK
          </span>

          {/* ---- Desktop: the market slides past the signal ----------- */}
          <div className="relative hidden h-full items-center md:flex">
            <div
              className="flex items-center gap-[14vw] whitespace-nowrap will-change-transform"
              style={{
                // Rail travels so each stage passes the fixed centre line.
                transform: "translate3d(calc(50vw - 9vw - var(--p) * (4 * 14vw + 4 * 18vw)), 0, 0)",
              }}
            >
              {STAGES.map((stage, i) => (
                <div
                  key={stage.id}
                  className="w-[18vw] shrink-0"
                  style={{
                    ["--on" as string]: `clamp(0, calc(1 - max(var(--p) - ${at(i).toFixed(3)}, ${at(i).toFixed(3)} - var(--p)) / 0.16), 1)`,
                  }}
                >
                  <span
                    className="font-mono text-[11px] tracking-[0.18em]"
                    style={{
                      color:
                        "color-mix(in srgb, var(--color-hero) calc(var(--on) * 100%), var(--color-ink-ghost))",
                    }}
                  >
                    {stage.index}
                  </span>
                  <h3
                    className="display mt-3 whitespace-normal text-[clamp(1.2rem,2.4vw,2rem)]"
                    style={{
                      color:
                        "color-mix(in srgb, var(--color-ink) calc(var(--on) * 100%), var(--color-ink-ghost))",
                      transform: "translate3d(0, calc((1 - var(--on)) * 10px), 0)",
                    }}
                  >
                    {stage.name}
                  </h3>
                  <p
                    className="mt-3 whitespace-normal text-[13px] leading-[1.6] text-ink-muted"
                    style={{ opacity: "calc(0.2 + var(--on) * 0.8)" }}
                  >
                    {stage.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ---- Mobile: vertical rail, signal pinned to the spine ----
              Stage height is fixed so the rail transform and the highlight
              window stay in lockstep, and the content is indented clear of
              the spine so the signal never sits on top of the type. */}
          <div className="relative h-full overflow-hidden px-6 md:hidden">
            <span
              aria-hidden
              className="absolute inset-y-[12%] left-[26px] w-px"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(255,255,255,0.11) 14%, rgba(255,255,255,0.11) 86%, transparent)",
              }}
            />
            <span
              aria-hidden
              className="absolute left-[26px] top-1/2 z-30 h-[12px] w-[12px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hero"
              style={{
                boxShadow: "0 0 22px 5px rgba(0,255,122,0.5), 0 0 0 6px rgba(0,255,122,0.08)",
                animation: "drk-pulse 3.2s ease-in-out infinite",
              }}
            />
            <span
              aria-hidden
              className="absolute left-[26px] top-[calc(50%+18px)] z-30 -translate-x-1/2 font-mono text-[8px] uppercase tracking-[0.2em] text-hero"
            >
              DRK
            </span>

            <div
              className="will-change-transform"
              style={{
                // Stage i is centred on the signal exactly when --p === i/(N-1).
                transform:
                  "translate3d(0, calc(50svh - 13svh - var(--p) * 4 * 26svh), 0)",
              }}
            >
              {STAGES.map((stage, i) => (
                <div
                  key={stage.id}
                  className="flex h-[26svh] flex-col justify-center pl-11"
                  style={{
                    ["--on" as string]: `clamp(0, calc(1 - max(var(--p) - ${at(i).toFixed(3)}, ${at(i).toFixed(3)} - var(--p)) / 0.22), 1)`,
                  }}
                >
                  <span
                    className="font-mono text-[10.5px] tracking-[0.18em]"
                    style={{
                      color:
                        "color-mix(in srgb, var(--color-hero) calc(var(--on) * 100%), var(--color-ink-ghost))",
                    }}
                  >
                    {stage.index}
                  </span>
                  <h3
                    className="display mt-2 text-[27px]"
                    style={{
                      color:
                        "color-mix(in srgb, var(--color-ink) calc(var(--on) * 100%), var(--color-ink-ghost))",
                    }}
                  >
                    {stage.name}
                  </h3>
                  <p
                    className="mt-2 max-w-[30ch] text-[13.5px] leading-[1.55] text-ink-muted"
                    style={{ opacity: "calc(0.16 + var(--on) * 0.84)" }}
                  >
                    {stage.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Edge fades so the rail dissolves rather than being clipped */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-[18%] md:w-[22%]"
            style={{ background: "linear-gradient(90deg, var(--color-obsidian), transparent)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-[18%] md:w-[22%]"
            style={{ background: "linear-gradient(270deg, var(--color-obsidian), transparent)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[12%] md:hidden"
            style={{ background: "linear-gradient(180deg, var(--color-obsidian), transparent)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[12%] md:hidden"
            style={{ background: "linear-gradient(0deg, var(--color-obsidian), transparent)" }}
          />

          {/* Caption sits on its own scrim so the travelling rail can never
              collide with it. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 pb-7 pt-12">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent, var(--color-obsidian) 62%)",
              }}
            />
            <p className="relative px-6 text-center font-mono text-[9px] uppercase leading-[1.6] tracking-[0.2em] text-ink-faint sm:text-[9.5px]">
              The market changes shape. The operating system stays connected.
            </p>
          </div>
        </div>
      </PinnedStage>
    </>
  );
}
