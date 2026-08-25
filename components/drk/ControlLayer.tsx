"use client";

import { useState } from "react";
import { Section, SectionHead, Reveal, Panel, Chip, DataRow } from "@/components/ui/Primitives";
import { Sparkline } from "./Sparkline";
import { control } from "@/content/drk";

/**
 * ACT 10 — THE CONTROL LAYER
 * A genuinely interactive surface: seven modules the visitor can drive.
 * Content is operational state, never a financial claim.
 */
export function ControlLayer() {
  const [tab, setTab] = useState(0);
  const active = control.tabs[tab];

  return (
    <Section id="control" className="py-28 sm:py-36 lg:py-44">
      <SectionHead
        eyebrow={control.eyebrow}
        headline="The DRK control layer."
        body={control.body}
      />

      <Reveal y={34} className="mt-14 lg:mt-18">
        <Panel rim className="overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr]">
            {/* ---- Module list ------------------------------------------- */}
            <div className="border-b border-white/[0.06] lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-2.5 px-5 py-4 sm:px-6">
                <span
                  aria-hidden
                  className="h-[5px] w-[5px] rounded-full bg-hero"
                  style={{ boxShadow: "0 0 8px rgba(0,255,122,0.7)" }}
                />
                <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-faint">
                  Modules
                </span>
              </div>

              {/* Horizontal scroller on mobile, vertical list on desktop */}
              <div
                role="tablist"
                aria-label="Control layer modules"
                className="scroll-x flex gap-1 px-4 pb-4 sm:px-5 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-3"
              >
                {control.tabs.map((t, i) => {
                  const on = i === tab;
                  return (
                    <button
                      key={t.id}
                      role="tab"
                      aria-selected={on}
                      aria-controls={`panel-${t.id}`}
                      id={`tab-${t.id}`}
                      type="button"
                      onClick={() => setTab(i)}
                      className="group relative shrink-0 rounded-[9px] px-3.5 py-2.5 text-left font-mono text-[11px]
                        uppercase tracking-[0.14em] transition-all duration-500 ease-[var(--ease-drk)]
                        lg:w-full lg:rounded-none lg:px-6 lg:py-3"
                      style={{
                        color: on ? "var(--color-ink)" : "var(--color-ink-faint)",
                        background: on
                          ? "linear-gradient(90deg, rgba(0,255,122,0.07), transparent)"
                          : "transparent",
                        border: `1px solid ${on ? "rgba(0,255,122,0.22)" : "transparent"}`,
                      }}
                    >
                      {/* Active spine, desktop only */}
                      <span
                        aria-hidden
                        className="absolute inset-y-1 left-0 hidden w-px origin-center bg-hero transition-transform
                          duration-500 ease-[var(--ease-drk)] lg:block"
                        style={{
                          transform: `scaleY(${on ? 1 : 0})`,
                          boxShadow: "0 0 10px rgba(0,255,122,0.8)",
                        }}
                      />
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ---- Panel ------------------------------------------------- */}
            <div
              role="tabpanel"
              id={`panel-${active.id}`}
              aria-labelledby={`tab-${active.id}`}
              className="p-6 sm:p-8 lg:p-10"
              key={active.id}
              style={{ animation: "drk-rise 620ms var(--ease-drk) both" }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-[24px] font-semibold tracking-[-0.025em] text-ink sm:text-[30px]">
                    {active.label}
                  </h3>
                  <p className="mt-2 max-w-[46ch] text-[14px] leading-[1.6] text-ink-muted">
                    {active.caption}
                  </p>
                </div>
                <Chip tone="live">Live</Chip>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.85fr] lg:gap-10">
                {/* State rows */}
                <div className="divide-y divide-white/[0.05]">
                  {active.rows.map((r, i) => (
                    <div key={r.k} style={{ animation: `drk-rise 560ms var(--ease-drk) ${i * 70}ms both` }}>
                      <DataRow k={r.k} v={r.v} accent={i === 0} />
                    </div>
                  ))}
                </div>

                {/* Telemetry */}
                <div className="rounded-[12px] border border-white/[0.06] bg-obsidian/50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-ghost">
                      {active.label} telemetry
                    </span>
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-ghost">
                      Shape only
                    </span>
                  </div>
                  <Sparkline seed={31 + tab * 7} height={104} drift={0.28} />
                  <p className="mt-3 font-mono text-[9px] leading-[1.6] tracking-[0.05em] text-ink-faint">
                    Illustrative telemetry. No axis values are shown and none are implied.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </Reveal>
    </Section>
  );
}
