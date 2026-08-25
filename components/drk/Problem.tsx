"use client";

import { Reveal, Section, SectionHead } from "@/components/ui/Primitives";
import { PinnedStage } from "@/components/system/Stage";
import { Node } from "@/components/system/Objects";
import { problem } from "@/content/drk";

/**
 * ACT 02 — ENTERING THE BLACK BOX
 *
 * A pinned, scrubbed sequence in two movements:
 *
 *   0.00 → 0.42   TRADITIONAL. Assets travel into a dark mechanism. The signal
 *                 paths are swallowed, the interior stays unreadable, the only
 *                 output is `???`. Deliberately airless — no spinner, no
 *                 gimmick, just a system that refuses to explain itself.
 *   0.42 → 0.52   The obstruction fractures.
 *   0.52 → 0.94   DRK. The same input travels visibly through five named
 *                 stages, each activating as its connector completes.
 *   0.94 → 1.00   Payoff copy, only once the system is fully revealed.
 *
 * Everything below interpolates from the inherited `--p`. No React state.
 */

const CHAIN = problem.transform.drk.chain; // Assets → Programs → Execution → P/L → Observable

export function Problem() {
  return (
    <>
      {/* ---- Framing ------------------------------------------------------- */}
      <Section id="problem" className="pt-28 sm:pt-36 lg:pt-44">
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

        <ul className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-panel)] border border-white/[0.06] sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {problem.costs.map((cost, i) => (
            <Reveal
              key={cost.id}
              as="li"
              delay={i * 100}
              y={26}
              className="group relative bg-carbon/60 p-7 transition-colors duration-700 hover:bg-graphite/70 sm:p-8"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-hero/70 to-transparent transition-transform duration-700 ease-[var(--ease-drk)] group-hover:scale-x-100"
              />
              <span className="font-mono text-[10px] tracking-[0.2em] text-ink-ghost">
                0{i + 1}
              </span>
              <h3 className="mt-5 font-display text-[19px] font-semibold tracking-[-0.02em] text-ink sm:text-[21px]">
                {cost.label}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-ink-faint">{cost.detail}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ---- The pinned transformation -------------------------------------- */}
      <PinnedStage length={2.4} compactLength={1.6} phase="Obstructed" className="mt-24 sm:mt-32">
        <div className="relative flex h-full w-full items-center justify-center px-5 sm:px-8 lg:px-12">
          {/* Ambience: dead while obstructed, alive once observable */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(58% 52% at 50% 52%, rgba(0,255,122,0.042), transparent 72%)",
              opacity: "clamp(0, calc((var(--p) - 0.5) / 0.35), 1)",
            }}
          />

          <div className="relative w-full max-w-[1120px]">
            {/* Stage label */}
            <div className="mb-9 flex items-center justify-between gap-4 sm:mb-12">
              <span className="max-w-[62%] font-mono text-[9px] uppercase leading-[1.5] tracking-[0.18em] text-ink-faint sm:max-w-none sm:text-[9.5px] sm:tracking-[0.22em]">
                {problem.transform.title}
              </span>
              <span className="relative h-3 w-[76px] shrink-0 overflow-hidden sm:w-[120px]">
                {/* TRADITIONAL → DRK label swap */}
                <span
                  className="absolute inset-0 font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink-ghost"
                  style={{ opacity: "clamp(0, calc((0.5 - var(--p)) / 0.1), 1)" }}
                >
                  Traditional
                </span>
                <span
                  className="absolute inset-0 font-mono text-[9.5px] uppercase tracking-[0.22em] text-hero"
                  style={{ opacity: "clamp(0, calc((var(--p) - 0.5) / 0.1), 1)" }}
                >
                  DRK
                </span>
              </span>
            </div>

            {/* The two movements share one fixed-height frame so both are
                vertically centred and neither can collide with the payoff. */}
            <div className="relative h-[44svh] min-h-[280px]">
              <Obstructed />
              <Revealed />
            </div>

            {/* ---- Payoff: enters only after the system is fully revealed --- */}
            <p
              className="band mx-auto mt-8 max-w-[620px] text-center text-[15px] leading-[1.65] text-ink-muted sm:mt-10 sm:text-[17px]"
              style={{ ["--from" as string]: 0.9, ["--to" as string]: 1 }}
            >
              <span className="band-rise block" style={{ ["--rise" as string]: "14px" }}>
                The mechanism stops being someone else&apos;s property. Every stage
                between your assets and your P/L is named, attributed and observable.
              </span>
            </p>
          </div>
        </div>
      </PinnedStage>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Movement 1 — the opaque mechanism                                          */
/* -------------------------------------------------------------------------- */

function Obstructed() {
  return (
    <div
      className="absolute inset-0 flex flex-col justify-center"
      style={{
        // Fades out as the obstruction fractures.
        opacity: "clamp(0, calc((0.52 - var(--p)) / 0.1), 1)",
        transform:
          "scale(calc(1 - clamp(0, calc((var(--p) - 0.42) / 0.1), 1) * 0.06))",
      }}
    >
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-7">
        {/* Input */}
        <div
          style={{
            opacity: "clamp(0, calc(var(--p) / 0.06), 1)",
            transform:
              "translateX(calc(clamp(0, calc(var(--p) / 0.06), 1) * 0px - (1 - clamp(0, calc(var(--p) / 0.06), 1)) * 24px))",
          }}
        >
          <Node tone="on">Assets</Node>
        </div>

        {/* The path in — draws, then gets swallowed */}
        <div className="relative h-px w-full flex-1 sm:h-px" style={{ background: "rgba(255,255,255,0.08)" }}>
          <span
            className="absolute inset-y-0 left-0 block origin-left"
            style={{
              width: "100%",
              transform: "scaleX(clamp(0, calc((var(--p) - 0.04) / 0.12), 1))",
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.4), rgba(255,255,255,0.06))",
            }}
          />
          {/* Signal dying as it enters the box */}
          <span
            className="absolute top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full bg-ink"
            style={{
              left: "clamp(0%, calc((var(--p) - 0.06) / 0.14 * 100%), 100%)",
              opacity: "clamp(0, calc((0.22 - var(--p)) / 0.06), 1)",
              boxShadow: "0 0 10px rgba(255,255,255,0.7)",
            }}
          />
        </div>

        {/* The mechanism */}
        <div
          className="relative flex h-[112px] w-full items-center justify-center overflow-hidden rounded-[16px] sm:h-[152px] sm:w-[300px] lg:w-[380px]"
          style={{
            background:
              "linear-gradient(168deg, #14181700 0%, #0c1110 40%, #070b0a 100%), radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,0.045), transparent 60%)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -30px 60px rgba(0,0,0,0.85), 0 30px 60px -40px rgba(0,0,0,1)",
          }}
        >
          {/* Interior: shapes that never resolve */}
          <span
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(112deg, rgba(255,255,255,0.028) 0px, rgba(255,255,255,0.028) 1px, transparent 1px, transparent 9px)",
              transform: "translateX(calc(var(--p) * -70px))",
              opacity: "calc(0.5 - clamp(0, calc((var(--p) - 0.2) / 0.2), 1) * 0.34)",
            }}
          />
          {/* The lid closing over the interior */}
          <span
            aria-hidden
            className="absolute inset-0 origin-top"
            style={{
              background: "linear-gradient(180deg, #0a0f0e, #070b0a)",
              transform: "scaleY(clamp(0, calc((var(--p) - 0.14) / 0.14), 1))",
            }}
          />
          <span
            className="relative font-mono tracking-[0.34em] text-ink-ghost"
            style={{
              fontSize: "clamp(22px, 4vw, 30px)",
              opacity: "clamp(0, calc((var(--p) - 0.24) / 0.1), 1)",
            }}
          >
            ???
          </span>
        </div>
      </div>

      <p
        className="mt-7 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-ghost sm:mt-9"
        style={{ opacity: "clamp(0, calc((var(--p) - 0.3) / 0.08), 1)" }}
      >
        Capital in. A number out. Nothing in between belongs to you.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Movement 2 — the observable chain                                          */
/* -------------------------------------------------------------------------- */

function Revealed() {
  const n = CHAIN.length;
  // Each stage owns a slice between 0.54 and 0.90.
  const slice = (i: number) => 0.54 + (i * 0.36) / n;

  return (
    <div
      className="absolute inset-0 flex flex-col justify-center"
      style={{ opacity: "clamp(0, calc((var(--p) - 0.5) / 0.08), 1)" }}
    >
      {/* Desktop: horizontal chain */}
      <div className="hidden items-center lg:flex">
        {CHAIN.map((step, i) => {
          const from = slice(i);
          return (
            <div key={step} className="flex flex-1 items-center last:flex-none">
              <div
                className="band"
                style={{ ["--from" as string]: from, ["--to" as string]: from + 0.05 }}
              >
                <Node>{step}</Node>
              </div>
              {i < n - 1 && (
                <span
                  aria-hidden
                  className="band relative mx-2.5 h-px flex-1"
                  style={{
                    ["--from" as string]: from + 0.03,
                    ["--to" as string]: slice(i + 1),
                    background: "rgba(255,255,255,0.08)",
                  }}
                >
                  <span
                    className="absolute inset-y-0 left-0 block h-px w-full origin-left"
                    style={{
                      transform: "scaleX(var(--le))",
                      background: "var(--color-hero)",
                      boxShadow: "0 0 9px rgba(0,255,122,0.65)",
                    }}
                  />
                  {/* packet riding the connector */}
                  <span
                    className="absolute top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full bg-tint"
                    style={{
                      left: "calc(var(--le) * 100%)",
                      opacity: "calc(var(--lp) * (1 - var(--lp)) * 4)",
                      boxShadow: "0 0 10px 2px rgba(0,255,122,0.9)",
                    }}
                  />
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile / tablet: the same chain, vertical — full narrative, no squeeze */}
      <ol className="mx-auto flex max-w-[420px] flex-col lg:hidden">
        {CHAIN.map((step, i) => {
          const from = slice(i);
          return (
            <li key={step} className="relative flex items-center gap-4 pb-5 last:pb-0">
              {i < n - 1 && (
                <span
                  aria-hidden
                  className="band absolute left-[6px] top-[18px] w-px"
                  style={{
                    height: "calc(100% - 6px)",
                    background: "rgba(255,255,255,0.08)",
                    ["--from" as string]: from + 0.03,
                    ["--to" as string]: slice(i + 1),
                  }}
                >
                  <span
                    className="block w-full origin-top"
                    style={{
                      height: "100%",
                      transform: "scaleY(var(--le))",
                      background: "var(--color-hero)",
                      boxShadow: "0 0 8px rgba(0,255,122,0.6)",
                    }}
                  />
                </span>
              )}
              <span
                aria-hidden
                className="band relative z-10 h-[13px] w-[13px] shrink-0 rounded-full"
                style={{
                  ["--from" as string]: from,
                  ["--to" as string]: from + 0.05,
                  background:
                    "color-mix(in srgb, var(--color-hero) calc(var(--lp) * 100%), #1c2120)",
                  boxShadow: "0 0 calc(var(--lp) * 14px) 1px rgba(0,255,122,0.6)",
                  transform: "scale(calc(0.85 + var(--le) * 0.15))",
                }}
              />
              <span
                className="band font-mono text-[13px] tracking-[0.06em] lit-ink"
                style={{ ["--from" as string]: from, ["--to" as string]: from + 0.05 }}
              >
                {step}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
