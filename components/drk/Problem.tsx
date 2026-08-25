"use client";

import { Section, SectionHead } from "@/components/ui/Primitives";
import { PinnedStage } from "@/components/system/Stage";
import { Node } from "@/components/system/Objects";
import { problem } from "@/content/drk";

/**
 * ACT 02 — THE PROBLEM
 *
 * One animation, not four explanatory cards.
 *
 *   0.00 → 0.42   ASSETS travel into something unreadable. The middle of the
 *                 pipeline is obscured and the only output is `?`.
 *   0.42 → 0.54   The obstruction breaks apart.
 *   0.54 → 0.90   The same input travels through four named, visible stages.
 *   0.90 → 1.00   The payoff line arrives, once the system is revealed.
 */
export function Problem() {
  return (
    <>
      <Section id="problem" className="pt-28 sm:pt-36 lg:pt-40">
        <SectionHead
          eyebrow={problem.eyebrow}
          headline={
            <>
              Legacy market operations
              <br />
              are built on <span className="text-ink-faint">opacity.</span>
            </>
          }
          body={problem.body}
        />
      </Section>

      <PinnedStage length={2.4} compactLength={1.8} phase="Obstructed" className="mt-10 sm:mt-14">
        <div className="relative flex h-full w-full items-center justify-center px-5 sm:px-8">
          <div className="relative w-full max-w-[1000px]">
            <div className="relative h-[42svh] min-h-[260px]">
              <Obscured />
              <Revealed />
            </div>

            <p
              className="band mx-auto mt-8 max-w-[560px] text-center text-[15px] leading-[1.6] text-ink-muted sm:text-[17px]"
              style={{ ["--from" as string]: 0.9, ["--to" as string]: 1 }}
            >
              <span className="band-rise block" style={{ ["--rise" as string]: "12px" }}>
                {problem.payoff}
              </span>
            </p>
          </div>
        </div>
      </PinnedStage>
    </>
  );
}

/* -------------------------------------------------------------------------- */

function Obscured() {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-6"
      style={{
        opacity: "clamp(0, calc((0.54 - var(--p)) / 0.1), 1)",
        transform: "scale(calc(1 - clamp(0, calc((var(--p) - 0.44) / 0.1), 1) * 0.05))",
      }}
    >
      <div className="flex w-full items-center gap-4 sm:gap-6">
        <div style={{ opacity: "clamp(0, calc(var(--p) / 0.07), 1)" }}>
          <Node tone="on">{problem.legacy[0]}</Node>
        </div>

        {/* the path in — draws, then is swallowed */}
        <span
          aria-hidden
          className="relative h-px flex-1"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <span
            className="absolute inset-y-0 left-0 block h-px w-full origin-left"
            style={{
              transform: "scaleX(clamp(0, calc((var(--p) - 0.04) / 0.13), 1))",
              background: "linear-gradient(90deg, rgba(255,255,255,0.35), rgba(255,255,255,0.05))",
            }}
          />
          <span
            className="absolute top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full bg-ink"
            style={{
              left: "clamp(0%, calc((var(--p) - 0.06) / 0.15 * 100%), 100%)",
              opacity: "clamp(0, calc((0.24 - var(--p)) / 0.06), 1)",
              boxShadow: "0 0 9px rgba(255,255,255,0.7)",
            }}
          />
        </span>

        {/* the obscured middle */}
        <div
          className="relative flex h-[104px] w-[42%] items-center justify-center overflow-hidden rounded-[16px] sm:h-[140px]"
          style={{
            background: "linear-gradient(168deg, #0d1211 0%, #070b0a 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -28px 56px rgba(0,0,0,0.85), 0 30px 60px -40px rgba(0,0,0,1)",
          }}
        >
          <span
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(112deg, rgba(255,255,255,0.026) 0px, rgba(255,255,255,0.026) 1px, transparent 1px, transparent 9px)",
              transform: "translateX(calc(var(--p) * -64px))",
              opacity: "calc(0.5 - clamp(0, calc((var(--p) - 0.2) / 0.2), 1) * 0.34)",
            }}
          />
          {/* the lid closing over it */}
          <span
            aria-hidden
            className="absolute inset-0 origin-top"
            style={{
              background: "linear-gradient(180deg, #0a0f0e, #070b0a)",
              transform: "scaleY(clamp(0, calc((var(--p) - 0.15) / 0.14), 1))",
            }}
          />
          <span
            className="relative font-mono tracking-[0.3em] text-ink-ghost"
            style={{
              fontSize: "clamp(24px, 5vw, 34px)",
              opacity: "clamp(0, calc((var(--p) - 0.26) / 0.1), 1)",
            }}
          >
            {problem.legacy[1]}
          </span>
        </div>

        <span
          aria-hidden
          className="hidden h-px w-[8%] sm:block"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />
        <div className="hidden sm:block" style={{ opacity: "clamp(0, calc((var(--p) - 0.3) / 0.1), 1)" }}>
          <Node tone="off">{problem.legacy[2]}</Node>
        </div>
      </div>

      <p
        className="text-center font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-faint"
        style={{ opacity: "clamp(0, calc((var(--p) - 0.32) / 0.08), 1)" }}
      >
        The mechanism belongs to somebody else
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function Revealed() {
  const chain = problem.drk;
  const n = chain.length;
  const at = (i: number) => 0.56 + (i * 0.3) / n;

  return (
    <div
      className="absolute inset-0 flex flex-col justify-center"
      style={{ opacity: "clamp(0, calc((var(--p) - 0.52) / 0.08), 1)" }}
    >
      {/* Desktop: horizontal chain */}
      <div className="hidden items-center md:flex">
        {chain.map((step, i) => (
          <div key={step} className="flex flex-1 items-center last:flex-none">
            <div className="band" style={{ ["--from" as string]: at(i), ["--to" as string]: at(i) + 0.05 }}>
              <Node>{step}</Node>
            </div>
            {i < n - 1 && (
              <span
                aria-hidden
                className="band relative mx-3 h-px flex-1"
                style={{
                  ["--from" as string]: at(i) + 0.03,
                  ["--to" as string]: at(i + 1),
                  background: "rgba(255,255,255,0.08)",
                }}
              >
                <span
                  className="absolute inset-y-0 left-0 block h-px w-full origin-left"
                  style={{
                    transform: "scaleX(var(--le))",
                    background: "var(--color-hero)",
                    boxShadow: "0 0 8px rgba(0,255,122,0.6)",
                  }}
                />
                <span
                  className="absolute top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full bg-tint"
                  style={{
                    left: "calc(var(--le) * 100%)",
                    opacity: "calc(var(--lp) * (1 - var(--lp)) * 4)",
                    boxShadow: "0 0 9px 2px rgba(0,255,122,0.9)",
                  }}
                />
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Compact: the same chain, vertical */}
      <ol className="mx-auto flex w-full max-w-[320px] flex-col md:hidden">
        {chain.map((step, i) => (
          <li key={step} className="relative flex items-center gap-4 pb-5 last:pb-0">
            {i < n - 1 && (
              <span
                aria-hidden
                className="band absolute left-[6px] top-[18px] w-px"
                style={{
                  height: "calc(100% - 6px)",
                  background: "rgba(255,255,255,0.08)",
                  ["--from" as string]: at(i) + 0.03,
                  ["--to" as string]: at(i + 1),
                }}
              >
                <span
                  className="block h-full w-full origin-top"
                  style={{
                    transform: "scaleY(var(--le))",
                    background: "var(--color-hero)",
                    boxShadow: "0 0 7px rgba(0,255,122,0.55)",
                  }}
                />
              </span>
            )}
            <span
              aria-hidden
              className="band relative z-10 h-[13px] w-[13px] shrink-0 rounded-full"
              style={{
                ["--from" as string]: at(i),
                ["--to" as string]: at(i) + 0.05,
                background:
                  "color-mix(in srgb, var(--color-hero) calc(var(--lp) * 100%), #1c2120)",
                boxShadow: "0 0 calc(var(--lp) * 13px) 1px rgba(0,255,122,0.6)",
              }}
            />
            <span
              className="band font-mono text-[13.5px] tracking-[0.05em] lit-ink"
              style={{ ["--from" as string]: at(i), ["--to" as string]: at(i) + 0.05 }}
            >
              {step}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
