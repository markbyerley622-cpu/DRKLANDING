"use client";

import { Section, SectionHead } from "@/components/ui/Primitives";
import { PinnedStage } from "@/components/system/Stage";
import { Orb, Node } from "@/components/system/Objects";
import { engine } from "@/content/drk";

/**
 * ACT 03 — THE ENGINE
 *
 * One core, two operators. The engine never duplicates — it stays physically
 * in the centre while two routes leave it and reconnect beneath. Nothing
 * about revenue or business model appears here; that is deck material.
 */
export function EngineModel() {
  return (
    <>
      <Section id="engine" className="pt-28 sm:pt-36 lg:pt-40">
        <SectionHead
          eyebrow={engine.eyebrow}
          headline={
            <>
              {engine.headline[0]}
              <br />
              <span className="text-ink-muted">{engine.headline[1]}</span>
            </>
          }
        />
      </Section>

      <PinnedStage length={2.2} compactLength={1.6} phase="Engine running" className="mt-10 sm:mt-14">
        <div className="relative flex h-full w-full items-center justify-center px-5 sm:px-8">
          <div className="relative w-full max-w-[900px]">
            {/* The core — one object, always */}
            <div className="relative z-20 flex justify-center">
              <Orb
                size={140}
                className="sm:!h-[168px] sm:!w-[168px]"
                style={{ ["--orb-a" as string]: "clamp(0.35, calc(var(--p) / 0.24), 1)" }}
              />
            </div>

            {/* Split: right angles only, so the stretched viewBox cannot warp them */}
            <svg
              aria-hidden
              className="relative z-10 mt-5 hidden h-[64px] w-full sm:block"
              viewBox="0 0 1000 64"
              preserveAspectRatio="none"
            >
              <Bracket d="M500 0 V30 H190 V64" from={0.26} to={0.48} />
              <Bracket d="M500 0 V30 H810 V64" from={0.3} to={0.52} />
            </svg>

            {/* The two operators */}
            <div className="relative z-20 mt-6 grid grid-cols-1 gap-7 sm:mt-4 sm:grid-cols-2 sm:gap-8 lg:gap-20">
              {engine.modes.map((mode, i) => {
                const from = 0.3 + i * 0.05;
                return (
                  <div
                    key={mode.id}
                    className="band text-center sm:text-left"
                    style={{
                      ["--from" as string]: from,
                      ["--to" as string]: from + 0.16,
                      opacity: "var(--lp)",
                      transform: `translate3d(calc((1 - var(--le)) * ${i === 0 ? "8%" : "-8%"}), 0, 0)`,
                    }}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-hero">
                      {mode.key}
                    </span>
                    <h3 className="mt-3 font-display text-[20px] font-semibold leading-[1.15] tracking-[-0.025em] text-ink sm:text-[26px]">
                      {mode.title}
                    </h3>
                    <p className="mx-auto mt-2.5 max-w-[32ch] text-[14px] leading-[1.6] text-ink-muted sm:mx-0">
                      {mode.detail}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Reconnect */}
            <svg
              aria-hidden
              className="relative z-10 mt-3 hidden h-[56px] w-full sm:block"
              viewBox="0 0 1000 56"
              preserveAspectRatio="none"
            >
              <Bracket d="M190 0 V28 H500 V56" from={0.58} to={0.76} />
              <Bracket d="M810 0 V28 H500 V56" from={0.62} to={0.8} />
            </svg>

            <div
              className="band relative z-20 mt-6 flex flex-col items-center gap-3 sm:mt-1"
              style={{
                ["--from" as string]: 0.74,
                ["--to" as string]: 0.9,
                opacity: "var(--lp)",
                transform: "translate3d(0, calc((1 - var(--le)) * 12px), 0)",
              }}
            >
              <Node tone="on">Same system</Node>
              <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                {engine.payoff.join("  ·  ")}
              </p>
            </div>
          </div>
        </div>
      </PinnedStage>
    </>
  );
}

function Bracket({ d, from, to }: { d: string; from: number; to: number }) {
  return (
    <g style={{ ["--from" as string]: from, ["--to" as string]: to, ["--len" as string]: 420 }}>
      <path d={d} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <path
        className="band band-draw"
        d={d}
        fill="none"
        stroke="var(--color-hero)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        style={{ filter: "drop-shadow(0 0 3px rgba(0,255,122,0.8))" }}
      />
    </g>
  );
}
