"use client";

import { Section, SectionHead } from "@/components/ui/Primitives";
import { PinnedStage } from "@/components/system/Stage";
import { market } from "@/content/drk";

/**
 * ACT 07 — EXPANDING SURFACE AREA
 *
 * One node becomes a network. Each step adds venues, paths and crossings, so
 * the *visual complexity itself* carries the thesis — no statistics are shown,
 * because none were supplied.
 *
 * The node field is deterministic (fixed coordinates, no randomness), so the
 * composition is identical on every load and across SSR/hydration.
 */

const STEPS = market.sequence;
const N = STEPS.length;
const band = (i: number) => 0.06 + (i * 0.78) / N;

/** Fixed lattice: which step introduces each node, and where it sits. */
const NODES: { x: number; y: number; step: number; r: number }[] = [
  { x: 50, y: 50, step: 0, r: 5 },
  { x: 30, y: 34, step: 1, r: 3.4 },
  { x: 71, y: 63, step: 1, r: 3.4 },
  { x: 18, y: 66, step: 2, r: 2.8 },
  { x: 82, y: 32, step: 2, r: 2.8 },
  { x: 61, y: 22, step: 2, r: 2.4 },
  { x: 39, y: 78, step: 3, r: 2.4 },
  { x: 10, y: 46, step: 3, r: 2.2 },
  { x: 90, y: 52, step: 3, r: 2.2 },
  { x: 25, y: 16, step: 4, r: 2 },
  { x: 76, y: 84, step: 4, r: 2 },
  { x: 55, y: 88, step: 4, r: 1.9 },
  { x: 45, y: 10, step: 4, r: 1.9 },
  { x: 8, y: 84, step: 5, r: 1.7 },
  { x: 93, y: 14, step: 5, r: 1.7 },
  { x: 66, y: 44, step: 5, r: 1.7 },
  { x: 34, y: 56, step: 5, r: 1.7 },
];

/** Edges, each inheriting the later of its two endpoints' steps. */
const EDGES: [number, number][] = [
  [0, 1], [0, 2],
  [1, 3], [2, 4], [1, 5],
  [3, 6], [1, 7], [2, 8], [0, 6],
  [7, 9], [8, 10], [6, 11], [5, 12], [4, 8],
  [3, 13], [4, 14], [0, 15], [0, 16], [15, 2], [16, 1], [11, 10], [9, 12],
];

export function Market() {
  return (
    <>
      <Section id="market" className="pt-28 sm:pt-36 lg:pt-44">
        <SectionHead
          eyebrow={market.eyebrow}
          headline={
            <>
              The surface area
              <br />
              keeps <span className="text-ink-muted">expanding.</span>
            </>
          }
          body={market.body}
        />
      </Section>

      <PinnedStage length={2.4} compactLength={1.8} phase="Expanding" className="mt-12 sm:mt-16">
        <div className="relative flex h-full w-full items-center justify-center px-5 sm:px-8">
          <div className="relative flex w-full max-w-[1080px] flex-col items-center gap-8 lg:flex-row lg:gap-14">
            {/* ---- The expanding network ------------------------------- */}
            <div className="relative w-full max-w-[480px] shrink-0 lg:max-w-none lg:flex-1">
              <svg
                viewBox="0 0 100 100"
                className="aspect-square w-full overflow-visible"
                aria-hidden
              >
                {/* edges */}
                {EDGES.map(([a, b], i) => {
                  const step = Math.max(NODES[a].step, NODES[b].step);
                  const on = `clamp(0, calc((var(--p) - ${(band(step) + 0.02).toFixed(3)}) / 0.1), 1)`;
                  return (
                    <line
                      key={i}
                      x1={NODES[a].x}
                      y1={NODES[a].y}
                      x2={NODES[b].x}
                      y2={NODES[b].y}
                      stroke="var(--color-hero)"
                      strokeWidth="0.22"
                      style={{
                        ["--on" as string]: on,
                        opacity: "calc(var(--on) * 0.4)",
                      }}
                    />
                  );
                })}

                {/* nodes */}
                {NODES.map((nd, i) => {
                  const on = `clamp(0, calc((var(--p) - ${band(nd.step).toFixed(3)}) / 0.09), 1)`;
                  return (
                    <g key={i} style={{ ["--on" as string]: on }}>
                      <circle
                        cx={nd.x}
                        cy={nd.y}
                        r={nd.r * 2.4}
                        fill="rgba(0,255,122,0.07)"
                        style={{ opacity: "var(--on)" }}
                      />
                      <circle
                        cx={nd.x}
                        cy={nd.y}
                        r={nd.r}
                        fill={i === 0 ? "var(--color-tint)" : "var(--color-hero)"}
                        style={{
                          opacity: "var(--on)",
                          transform: `scale(calc(0.4 + var(--on) * 0.6))`,
                          transformOrigin: `${nd.x}px ${nd.y}px`,
                          filter: "drop-shadow(0 0 2px rgba(0,255,122,0.9))",
                        }}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Complexity readout */}
              <div className="mt-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
                <span>Operating surface</span>
                <span className="text-hero">
                  {/* Reads as instrumentation, not a fabricated statistic */}
                  Expanding
                </span>
              </div>
            </div>

            {/* ---- The sequence ---------------------------------------- */}
            <ol className="w-full lg:max-w-[400px]">
              {STEPS.map((step, i) => (
                <li
                  key={step.id}
                  className="band flex items-baseline gap-4 py-2.5 sm:gap-5 sm:py-3"
                  style={{
                    ["--from" as string]: band(i),
                    ["--to" as string]: band(i) + 0.08,
                  }}
                >
                  <span
                    className="font-mono text-[10px] tracking-[0.18em] lit-text"
                    style={{ opacity: "calc(0.4 + var(--lp) * 0.6)" }}
                  >
                    {step.step}
                  </span>
                  <span
                    className="display lit-ink"
                    style={{
                      // Later steps are physically larger: the argument scales.
                      fontSize: `clamp(${(1.05 + i * 0.05).toFixed(2)}rem, ${(2.2 + i * 0.2).toFixed(1)}vw, ${(1.45 + i * 0.13).toFixed(2)}rem)`,
                      transform: "translate3d(calc((1 - var(--le)) * -8px), 0, 0)",
                    }}
                  >
                    {step.title}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </PinnedStage>

      <Section className="pb-28 sm:pb-36 lg:pb-44">
        <p className="mx-auto max-w-[900px] border-t border-white/[0.06] pt-6 font-mono text-[10px] leading-[1.75] tracking-[0.04em] text-ink-faint">
          Directional thesis. Supporting market statistics and sources are withheld
          pending verification — no figures are asserted on this page.
        </p>
      </Section>
    </>
  );
}
