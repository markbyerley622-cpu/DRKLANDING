"use client";

import { Reveal, Section, SectionHead, Panel, Eyebrow } from "@/components/ui/Primitives";
import { useScrollProgress, range, smooth, stagger } from "@/lib/motion";
import { problem } from "@/content/drk";

/**
 * ACT 02 — THE PROBLEM
 * The centrepiece is a scroll-driven transformation: a sealed black box
 * dissolves and the chain behind it resolves into named, observable stages.
 */
export function Problem() {
  return (
    <Section id="problem" className="py-28 sm:py-36 lg:py-44">
      <SectionHead
        eyebrow={problem.eyebrow}
        headline={
          <>
            Legacy market operations
            <br />
            are built on{" "}
            <span className="text-ink-faint">opacity.</span>
          </>
        }
        body={problem.body}
      />

      {/* ---- The four costs ------------------------------------------------- */}
      <ul className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-panel)] border border-white/[0.06] sm:grid-cols-2 lg:grid-cols-4 lg:mt-20">
        {problem.costs.map((cost, i) => (
          <Reveal
            key={cost.id}
            as="li"
            delay={i * 100}
            y={26}
            className="group relative bg-carbon/60 p-7 transition-colors duration-700 hover:bg-graphite/70 sm:p-8"
          >
            {/* hairline dividers drawn by the gap-px + border, plus a top accent */}
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-hero/70 to-transparent
                transition-transform duration-700 ease-[var(--ease-drk)] group-hover:scale-x-100"
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

      {/* ---- The transformation --------------------------------------------- */}
      <Transformation />
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function Transformation() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>({ start: 0.85, end: 0.35 });

  // The black box dissolves first, then the DRK chain resolves stage by stage.
  const dissolve = smooth(range(progress, 0.05, 0.42));
  const resolve = range(progress, 0.3, 0.95);

  return (
    <div ref={ref} className="mt-20 sm:mt-28">
      <Reveal>
        <Eyebrow dot={false}>{problem.transform.title}</Eyebrow>
      </Reveal>

      <Panel rim sweep className="mt-6 p-6 sm:p-10 lg:p-14">
        {/* ------- Traditional ------- */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
          <span className="w-[92px] shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-ghost">
            {problem.transform.legacy.label}
          </span>

          <div className="flex flex-1 items-center gap-3 sm:gap-5">
            <Node label="Assets" state="on" />
            <Connector fill={1} muted />
            <div className="relative flex-1">
              {/* The sealed box — loses its seal as you scroll */}
              <div
                className="relative flex h-[64px] items-center justify-center overflow-hidden rounded-[12px]
                  sm:h-[76px]"
                style={{
                  background: `linear-gradient(180deg, rgba(13,17,16,${0.95 - dissolve * 0.35}), rgba(8,13,12,1))`,
                  border: `1px solid rgba(255,255,255,${0.07 + dissolve * 0.03})`,
                }}
              >
                {/* Noise/static suggesting something is happening in there */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.35]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(115deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 7px)",
                    transform: `translateX(${dissolve * -26}px)`,
                    transition: "transform 120ms linear",
                  }}
                />
                <span className="relative font-mono text-[22px] tracking-[0.3em] text-ink-ghost sm:text-[26px]">
                  ???
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rule-h my-9 sm:my-12" />

        {/* ------- DRK ------- */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <span className="w-[92px] shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-hero">
            {problem.transform.drk.label}
          </span>

          {/* Desktop / tablet: horizontal chain */}
          <div className="hidden flex-1 items-center lg:flex">
            {problem.transform.drk.chain.map((step, i) => {
              const local = range(resolve, i * 0.16, i * 0.16 + 0.34);
              return (
                <div key={step} className="flex flex-1 items-center last:flex-none">
                  <Node label={step} state={local > 0.5 ? "on" : "off"} opacity={local} />
                  {i < problem.transform.drk.chain.length - 1 && (
                    <Connector fill={range(resolve, i * 0.16 + 0.1, i * 0.16 + 0.3)} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile: vertical chain — the diagram becomes a progressive flow */}
          <ol className="flex flex-1 flex-col lg:hidden">
            {problem.transform.drk.chain.map((step, i) => {
              const local = range(resolve, i * 0.16, i * 0.16 + 0.34);
              const on = local > 0.5;
              return (
                <li key={step} className="relative flex items-center gap-4 pb-4 last:pb-0">
                  {i < problem.transform.drk.chain.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute left-[5px] top-[14px] w-px"
                      style={{
                        height: "calc(100% - 4px)",
                        background: "rgba(255,255,255,0.08)",
                      }}
                    >
                      <span
                        className="block w-full bg-hero"
                        style={{
                          height: `${range(resolve, i * 0.16 + 0.1, i * 0.16 + 0.3) * 100}%`,
                          boxShadow: "0 0 8px rgba(0,255,122,0.55)",
                        }}
                      />
                    </span>
                  )}
                  <span
                    aria-hidden
                    className="relative z-10 h-[11px] w-[11px] shrink-0 rounded-full transition-all duration-500"
                    style={{
                      background: on ? "var(--color-hero)" : "#232826",
                      boxShadow: on ? "0 0 12px 1px rgba(0,255,122,0.6)" : "none",
                    }}
                  />
                  <span
                    className="font-mono text-[12.5px] tracking-[0.06em] transition-colors duration-500"
                    style={{ color: on ? "var(--color-ink)" : "var(--color-ink-ghost)" }}
                  >
                    {step}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <p
          className="mt-9 max-w-[560px] text-[14.5px] leading-[1.6] text-ink-muted transition-opacity duration-700 sm:mt-12"
          style={{ opacity: 0.4 + resolve * 0.6, ...stagger(0) }}
        >
          The mechanism stops being someone else&apos;s property. Every stage between
          your assets and your P/L is named, attributed and observable.
        </p>
      </Panel>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function Node({
  label,
  state,
  opacity = 1,
}: {
  label: string;
  state: "on" | "off";
  opacity?: number;
}) {
  const on = state === "on";
  return (
    <div
      className="shrink-0 rounded-[10px] px-3 py-2.5 transition-all duration-500 sm:px-4 sm:py-3"
      style={{
        background: on
          ? "linear-gradient(180deg, rgba(34,37,35,0.75), rgba(8,13,12,0.9))"
          : "rgba(13,17,16,0.6)",
        border: `1px solid ${on ? "rgba(0,255,122,0.26)" : "rgba(255,255,255,0.06)"}`,
        boxShadow: on ? "inset 0 1px 0 rgba(255,255,255,0.08), 0 0 22px -10px rgba(0,255,122,0.8)" : "none",
        opacity: 0.35 + opacity * 0.65,
      }}
    >
      <span
        className="whitespace-nowrap font-mono text-[10.5px] tracking-[0.1em] transition-colors duration-500 sm:text-[11.5px]"
        style={{ color: on ? "var(--color-ink)" : "var(--color-ink-ghost)" }}
      >
        {label}
      </span>
    </div>
  );
}

function Connector({ fill, muted = false }: { fill: number; muted?: boolean }) {
  return (
    <span
      aria-hidden
      className="relative mx-2 h-px min-w-[16px] flex-1 sm:mx-3"
      style={{ background: "rgba(255,255,255,0.08)" }}
    >
      <span
        className="absolute inset-y-0 left-0 block"
        style={{
          width: `${fill * 100}%`,
          background: muted ? "rgba(255,255,255,0.18)" : "var(--color-hero)",
          boxShadow: muted ? "none" : "0 0 9px rgba(0,255,122,0.6)",
          transition: "width 120ms linear",
        }}
      />
    </span>
  );
}
