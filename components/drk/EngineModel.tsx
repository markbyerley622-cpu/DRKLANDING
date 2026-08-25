"use client";

import { useState } from "react";
import { Reveal, Section, SectionHead, Panel } from "@/components/ui/Primitives";
import { engine } from "@/content/drk";

/**
 * ACT 03 — ONE ENGINE
 * Not two cards. A single core with two operating modes branching off it;
 * hovering/focusing a mode routes the core's energy toward that branch.
 */
export function EngineModel() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <Section id="engine" className="py-28 sm:py-36 lg:py-44">
      <SectionHead
        eyebrow={engine.eyebrow}
        headline={
          <>
            One proprietary engine.
            <br />
            <span className="text-ink-muted">Two scalable businesses.</span>
          </>
        }
        body={engine.body}
      />

      <div className="mt-16 lg:mt-24">
        {/* ---- The core ---------------------------------------------------- */}
        <Reveal>
          <div className="relative mx-auto flex max-w-[420px] flex-col items-center justify-center">
            <Core active={hovered !== null} />
            <span className="mt-5 font-mono text-[9.5px] uppercase tracking-[0.28em] text-ink-faint">
              Engine
            </span>
          </div>
        </Reveal>

        {/* ---- Branch lines: desktop only, they connect core → modes -------- */}
        <div aria-hidden className="relative mx-auto hidden h-24 max-w-[900px] lg:block">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 900 96" fill="none" preserveAspectRatio="none">
            <path
              d="M450 0 V30 Q450 48 424 48 H240 Q214 48 214 66 V96"
              stroke={hovered === 0 ? "rgba(0,255,122,0.75)" : "rgba(255,255,255,0.1)"}
              strokeWidth="1"
              className="transition-all duration-700"
              style={{ filter: hovered === 0 ? "drop-shadow(0 0 6px rgba(0,255,122,0.7))" : "none" }}
            />
            <path
              d="M450 0 V30 Q450 48 476 48 H660 Q686 48 686 66 V96"
              stroke={hovered === 1 ? "rgba(0,255,122,0.75)" : "rgba(255,255,255,0.1)"}
              strokeWidth="1"
              className="transition-all duration-700"
              style={{ filter: hovered === 1 ? "drop-shadow(0 0 6px rgba(0,255,122,0.7))" : "none" }}
            />
            {/* Constant faint travelling signal down the trunk */}
            <path
              d="M450 0 V30"
              stroke="rgba(0,255,122,0.5)"
              strokeWidth="1.5"
              strokeDasharray="6 22"
              style={{ animation: "drk-dash 9s linear infinite" }}
            />
          </svg>
        </div>

        {/* ---- The two modes ------------------------------------------------ */}
        <div className="mt-10 grid grid-cols-1 gap-5 lg:mt-0 lg:grid-cols-2 lg:gap-6">
          {engine.modes.map((mode, i) => (
            <Reveal key={mode.id} delay={i * 130} y={30}>
              <Panel
                rim
                sweep
                sweepDelay={i * 1800}
                className="group h-full p-7 transition-transform duration-700 ease-[var(--ease-drk)] hover:-translate-y-1 sm:p-9 lg:p-10"
              >
                {/* Hover routes the core's energy to this branch. Purely a
                    visual enhancement — every word is already readable, so
                    this is not a tab stop. */}
                <div
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="flex h-full flex-col"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-hero">
                      {mode.key}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-ghost">
                      {mode.horizon}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-[24px] font-semibold leading-[1.12] tracking-[-0.025em] text-ink sm:text-[29px]">
                    {mode.title}
                  </h3>

                  <p className="mt-4 max-w-[42ch] flex-1 text-[14.5px] leading-[1.65] text-ink-muted">
                    {mode.detail}
                  </p>

                  <div className="mt-9 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                    <span
                      aria-hidden
                      className="h-[5px] w-[5px] rounded-full bg-hero transition-shadow duration-700"
                      style={{ boxShadow: "0 0 9px 1px rgba(0,255,122,0.6)" }}
                    />
                    <span className="font-mono text-[11px] tracking-[0.08em] text-ink">
                      {mode.revenue}
                    </span>
                  </div>
                </div>
              </Panel>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function Core({ active }: { active: boolean }) {
  return (
    <div className="relative flex h-[168px] w-[168px] items-center justify-center sm:h-[196px] sm:w-[196px]">
      {/* Outer rings */}
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          aria-hidden
          className="absolute rounded-full border transition-all duration-1000 ease-[var(--ease-drk)]"
          style={{
            inset: `${i * 16}px`,
            borderColor: `rgba(255,255,255,${0.09 - i * 0.02})`,
            transform: active ? `scale(${1 + i * 0.015})` : "scale(1)",
          }}
        />
      ))}

      {/* Rotating aperture */}
      <span
        aria-hidden
        className="absolute inset-[8px] rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(0,255,122,0.35) 30deg, transparent 90deg, transparent 180deg, rgba(0,255,122,0.18) 220deg, transparent 300deg)",
          animation: "drk-spin 22s linear infinite",
          maskImage: "radial-gradient(closest-side, transparent 78%, black 80%)",
          WebkitMaskImage: "radial-gradient(closest-side, transparent 78%, black 80%)",
        }}
      />

      {/* Glass core */}
      <span
        aria-hidden
        className="absolute inset-[44px] rounded-full transition-all duration-1000 ease-[var(--ease-drk)]"
        style={{
          background:
            "radial-gradient(circle at 34% 26%, rgba(255,255,255,0.16), rgba(21,23,22,0.9) 46%, rgba(8,13,12,1) 100%)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: active
            ? "0 0 60px -10px rgba(0,255,122,0.55), inset 0 2px 6px rgba(255,255,255,0.14)"
            : "0 0 40px -14px rgba(0,255,122,0.35), inset 0 2px 6px rgba(255,255,255,0.1)",
        }}
      />

      {/* Green heart */}
      <span
        aria-hidden
        className="absolute h-[26px] w-[26px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(136,255,216,0.95), rgba(0,255,122,0.5) 45%, transparent 72%)",
          filter: "blur(1px)",
          animation: "drk-pulse 3.6s ease-in-out infinite",
        }}
      />
    </div>
  );
}
