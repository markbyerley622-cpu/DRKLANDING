"use client";

import { Section, SectionHead, Chip } from "@/components/ui/Primitives";
import { PinnedStage } from "@/components/system/Stage";
import { Readout } from "@/components/system/Objects";
import { control } from "@/content/drk";

/**
 * ACT 10 — SCROLL AS APPLICATION NAVIGATION
 *
 * The application shell is pinned and never rebuilt. Scroll position selects
 * the active module; only the operating context inside the shell changes.
 * That reuse is the point — it reads as one coherent product rather than
 * seven unrelated screens.
 */

const TABS = control.tabs;
const N = TABS.length;
const band = (i: number) => 0.04 + (i * 0.9) / N;

export function ControlLayer() {
  return (
    <>
      <Section id="control" className="pt-28 sm:pt-36 lg:pt-44">
        <SectionHead
          eyebrow={control.eyebrow}
          headline="The DRK control layer."
          body={control.body}
        />
      </Section>

      <PinnedStage length={3.6} compactLength={2.6} phase="Operating" className="mt-12 sm:mt-16">
        <div className="relative flex h-full w-full items-center justify-center px-4 sm:px-8">
          <div className="w-full max-w-[1160px]">
            <div
              className="glass metal-rim relative overflow-hidden rounded-[var(--radius-panel)]"
              style={{ boxShadow: "var(--highlight-inset), var(--depth-shadow)" }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[212px_1fr]">
                {/* ---- Module rail: follows scroll ------------------- */}
                <div className="border-b border-white/[0.06] lg:border-b-0 lg:border-r">
                  <div className="flex items-center gap-2.5 px-5 py-4">
                    <span
                      aria-hidden
                      className="h-[5px] w-[5px] rounded-full bg-hero"
                      style={{ boxShadow: "0 0 8px rgba(0,255,122,0.7)" }}
                    />
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-faint">
                      Modules
                    </span>
                  </div>

                  {/* Horizontal ribbon on compact, vertical list on desktop.
                      The ribbon auto-scrolls so the active chip stays in view. */}
                  <div className="scroll-x px-4 pb-4 lg:overflow-visible lg:px-0 lg:pb-3">
                    <div className="flex gap-1 lg:flex-col lg:gap-0">
                      {TABS.map((t, i) => (
                        <span
                          key={t.id}
                          className="relative shrink-0 rounded-[9px] px-3.5 py-2.5 text-left font-mono text-[11px] uppercase tracking-[0.14em] lg:w-full lg:rounded-none lg:px-6 lg:py-[11px]"
                          style={{
                            // Lit only while this module owns the scroll band.
                            ["--on" as string]: `calc(clamp(0, calc((var(--p) - ${band(i).toFixed(3)}) / 0.025), 1) * clamp(0, calc((${(band(i + 1) + 0.025).toFixed(3)} - var(--p)) / 0.025), 1))`,
                            color:
                              "color-mix(in srgb, var(--color-ink) calc(var(--on) * 100%), var(--color-ink-faint))",
                            background:
                              "linear-gradient(90deg, rgba(0,255,122,calc(0.075 * var(--on))), transparent)",
                            border: "1px solid rgba(0,255,122,calc(0.22 * var(--on)))",
                          }}
                        >
                          <span
                            aria-hidden
                            className="absolute inset-y-1 left-0 hidden w-px origin-center bg-hero lg:block"
                            style={{
                              transform: "scaleY(var(--on))",
                              boxShadow: "0 0 10px rgba(0,255,122,0.8)",
                            }}
                          />
                          {t.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ---- The panel: same shell, changing context -------- */}
                <div className="relative min-h-[440px] sm:min-h-[420px]">
                  {TABS.map((t, i) => (
                    <div
                      key={t.id}
                      className="band band-hold absolute inset-0 flex flex-col p-6 sm:p-8 lg:p-10"
                      style={{
                        ["--from" as string]: band(i),
                        ["--to" as string]: band(i + 1),
                        ["--fade" as string]: 0.03,
                        ["--rise" as string]: "12px",
                        ["--bp" as string]: "var(--lp)",
                      }}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h3 className="font-display text-[23px] font-semibold tracking-[-0.025em] text-ink sm:text-[29px]">
                            {t.label}
                          </h3>
                          <p className="mt-2 max-w-[46ch] text-[13.5px] leading-[1.6] text-ink-muted">
                            {t.caption}
                          </p>
                        </div>
                        <Chip tone="live">Live</Chip>
                      </div>

                      <div
                        className="mt-7 grid grid-cols-1 gap-x-10 lg:grid-cols-2"
                        style={{ ["--n" as string]: 4 }}
                      >
                        {t.rows.map((r, ri) => (
                          <div
                            key={r.k}
                            className="band-step"
                            style={{
                              ["--i" as string]: ri,
                              ["--p" as string]:
                                "clamp(0, calc((var(--bp) - 0.1) / 0.6), 1)",
                              opacity: "calc(0.28 + var(--le) * 0.72)",
                              transform:
                                "translate3d(calc((1 - var(--le)) * 9px), 0, 0)",
                            }}
                          >
                            <Readout k={r.k} v={r.v} accent={ri === 0} />
                          </div>
                        ))}
                      </div>

                      {/* Operating context strip — pinned to the panel's
                          bottom edge so it can never ride over the shell
                          footer on short viewports. */}
                      <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/[0.06] pt-5">
                        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
                          Context
                        </span>
                        <span className="font-mono text-[10.5px] tracking-[0.06em] text-hero">
                          {t.label}
                        </span>
                        <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                          {`0${i + 1} / 0${N}`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shell footer — constant across every module */}
              <div className="flex items-center justify-between gap-4 border-t border-white/[0.06] px-5 py-3 sm:px-7">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
                  One shell · seven contexts
                </span>
                <span
                  aria-hidden
                  className="h-px flex-1"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                />
                <span
                  className="h-[4px] w-[4px] rounded-full bg-hero"
                  style={{ boxShadow: "0 0 8px rgba(0,255,122,0.8)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </PinnedStage>
    </>
  );
}
