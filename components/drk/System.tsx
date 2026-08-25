"use client";

import { useState } from "react";
import { Section, SectionHead } from "@/components/ui/Primitives";
import { PinnedStage } from "@/components/system/Stage";
import { GlassSurface, StateChip } from "@/components/system/GlassSurface";
import { system } from "@/content/drk";

/**
 * ACT 04 — THE SYSTEM
 *
 * This replaces the recorded application reel. The product is implied through
 * one large glass operating surface whose modules activate as you scroll, not
 * demonstrated by handing over a walkthrough of the real thing.
 *
 * NOTHING HERE IS DATA. Every value is a STATE — Live, Routing, Attributed,
 * Reconciled — and the activity graph carries no axis, no scale and no
 * numbers. There is no client data on this page, real or invented. Anyone
 * who wants to see the application contacts DRK.
 */

const M = system.modules;
const N = M.length;
/** Each module owns an equal band between 0.06 and 0.92. */
const band = (i: number) => 0.06 + (i * 0.86) / N;

export function System() {
  const [active, setActive] = useState(0);

  return (
    <>
      <Section id="system" className="pt-28 sm:pt-36 lg:pt-40">
        <SectionHead eyebrow={system.eyebrow} headline={system.headline} body={system.body} />
      </Section>

      <PinnedStage
        length={3.2}
        compactLength={2.6}
        phase="Observable"
        className="mt-12 sm:mt-16"
        steps={N}
        onStep={setActive}
      >
        <div className="relative flex h-full w-full items-center justify-center px-4 sm:px-8">
          <GlassSurface
            lift={1}
            glow={0.55}
            radius={24}
            className="w-full max-w-[1000px]"
          >
            {/* ---- Chrome ------------------------------------------------ */}
            <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] px-5 py-4 sm:px-7">
              <div className="flex min-w-0 items-center gap-3">
                <span className="font-display text-[14px] font-bold tracking-[-0.03em] text-ink">
                  DRK
                </span>
                <span aria-hidden className="h-3 w-px shrink-0 bg-white/10" />
                <span className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                  {M[active].label}
                </span>
              </div>
              <StateChip>{M[active].state}</StateChip>
            </div>

            {/* ---- Module rail ------------------------------------------- */}
            <div className="scroll-x flex gap-1.5 border-b border-white/[0.06] px-5 py-3 sm:px-7">
              {M.map((m, i) => (
                <span
                  key={m.id}
                  className="shrink-0 rounded-full px-3.5 py-[7px] font-mono text-[10px] uppercase tracking-[0.15em]"
                  style={{
                    ["--on" as string]: `calc(clamp(0, calc((var(--p) - ${band(i).toFixed(3)}) / 0.02), 1) * clamp(0, calc((${(band(i + 1) + 0.02).toFixed(3)} - var(--p)) / 0.02), 1))`,
                    color:
                      "color-mix(in srgb, var(--color-ink) calc(var(--on) * 100%), var(--color-ink-ghost))",
                    background:
                      "linear-gradient(180deg, rgba(46,52,50,calc(0.7 * var(--on))), rgba(13,18,17,calc(0.85 * var(--on))))",
                    border: "1px solid rgba(0,255,122,calc(0.26 * var(--on)))",
                    boxShadow: "0 0 calc(16px * var(--on)) -7px rgba(0,255,122,0.9)",
                  }}
                >
                  {m.label}
                </span>
              ))}
            </div>

            {/* ---- Body -------------------------------------------------- */}
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_0.85fr]">
              {/* the three lines of the active module */}
              <div className="relative min-h-[212px] border-b border-white/[0.06] sm:min-h-[248px] sm:border-b-0 sm:border-r">
                {M.map((m, i) => (
                  <div
                    key={m.id}
                    className="band band-hold absolute inset-0 flex flex-col justify-center p-6 sm:p-9"
                    style={{
                      ["--from" as string]: band(i),
                      ["--to" as string]: band(i + 1),
                      ["--fade" as string]: 0.03,
                      ["--rise" as string]: "12px",
                      ["--bp" as string]: "var(--lp)",
                    }}
                  >
                    <h3 className="display text-[clamp(1.6rem,4.4vw,2.6rem)] text-ink">
                      {m.label}
                    </h3>
                    <ul className="mt-5" style={{ ["--n" as string]: 3 }}>
                      {m.lines.map((line, li) => (
                        <li
                          key={line}
                          className="band-step py-[5px] text-[14.5px] leading-[1.5] text-ink-muted sm:text-[16px]"
                          style={{
                            ["--i" as string]: li,
                            ["--p" as string]: "clamp(0, calc((var(--bp) - 0.1) / 0.6), 1)",
                            opacity: "calc(0.2 + var(--le) * 0.8)",
                            transform: "translate3d(calc((1 - var(--le)) * 10px), 0, 0)",
                          }}
                        >
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* activity — shape only, no axis, no scale, no numbers */}
              <div className="flex flex-col justify-center p-6 sm:p-9">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-faint">
                    Activity
                  </span>
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-faint">
                    No values
                  </span>
                </div>
                <ActivityTrace />
              </div>
            </div>

            {/* ---- Footer ------------------------------------------------ */}
            <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-1.5 border-t border-white/[0.06] px-5 py-3.5 sm:px-7">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                {system.note}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                {`0${active + 1} / 0${N}`}
              </span>
            </div>
          </GlassSurface>
        </div>
      </PinnedStage>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Activity trace — routing lines resolving to one attributed output.         */
/* Fixed geometry, no randomness, no axis, no values.                         */
/* -------------------------------------------------------------------------- */

function ActivityTrace() {
  const rows = [0, 1, 2, 3];
  return (
    <div className="mt-5 rounded-[14px] border border-white/[0.07] bg-obsidian/50 p-4">
      <svg viewBox="0 0 240 130" className="h-[130px] w-full" aria-hidden>
        {rows.map((r, i) => {
          const y = 20 + i * 30;
          const on = `clamp(0, calc((var(--p) - ${0.12 + i * 0.15}) / 0.12), 1)`;
          const d = `M22 ${y} H140 Q172 ${y} 172 ${y > 65 ? y - 20 : y + 20} V65`;
          return (
            <g key={r} style={{ ["--on" as string]: on }}>
              <path d={d} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
              <path
                d={d}
                fill="none"
                stroke="var(--color-hero)"
                strokeWidth="1"
                strokeDasharray="220"
                strokeDashoffset="calc(220 * (1 - var(--on)))"
                opacity="calc(var(--on) * 0.75)"
              />
              <circle
                cx="16"
                cy={y}
                r="3.4"
                fill="color-mix(in srgb, var(--color-hero) calc(var(--on) * 100%), #1e2422)"
                style={{ filter: "drop-shadow(0 0 4px rgba(0,255,122,0.6))" }}
              />
            </g>
          );
        })}

        {/* the attributed output */}
        <g style={{ ["--on" as string]: "clamp(0, calc((var(--p) - 0.62) / 0.16), 1)" }}>
          <circle
            cx="172"
            cy="65"
            r="8.5"
            fill="none"
            stroke="rgba(0,255,122,calc(0.45 * var(--on)))"
            strokeWidth="1"
          />
          <circle
            cx="172"
            cy="65"
            r="4"
            fill="color-mix(in srgb, var(--color-tint) calc(var(--on) * 100%), #1e2422)"
            style={{ filter: "drop-shadow(0 0 7px rgba(0,255,122,0.85))" }}
          />
          <text
            x="190"
            y="68"
            fill="var(--color-ink-faint)"
            opacity="var(--on)"
            style={{ fontFamily: "var(--font-mono)", fontSize: "7.5px", letterSpacing: "0.12em" }}
          >
            OUTPUT
          </text>
        </g>
      </svg>
      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.15em] text-ink-faint">
        Output → source program
      </p>
    </div>
  );
}
