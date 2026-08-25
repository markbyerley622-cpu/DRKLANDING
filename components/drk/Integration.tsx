"use client";

import { Reveal, Section, SectionHead, Panel } from "@/components/ui/Primitives";
import { useSequence } from "@/lib/motion";
import { integration } from "@/content/drk";

/**
 * ACT 08 — INTEGRATION SPEED
 * An activation sequence: venues detect, routes form, the engine links,
 * telemetry comes online, the system goes active — then it loops.
 */
export function Integration() {
  const { ref, index } = useSequence<HTMLDivElement>(integration.states.length, 1250);

  return (
    <Section id="integration" className="py-28 sm:py-36 lg:py-44">
      <SectionHead
        eyebrow={integration.eyebrow}
        headline={
          <>
            We integrate in days,
            <br />
            <span className="text-ink-muted">not years.</span>
          </>
        }
      />

      {/* ---- The contrast --------------------------------------------------- */}
      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-16">
        {integration.contrast.map((c, i) => {
          const hero = c.tone === "hero";
          return (
            <Reveal key={c.id} delay={i * 140} y={26}>
              <Panel
                rim={hero}
                sweep={hero}
                className="relative flex items-end justify-between gap-6 p-7 sm:p-9 lg:p-11"
                style={
                  hero
                    ? undefined
                    : { background: "linear-gradient(158deg, rgba(21,23,22,0.4), rgba(8,13,12,0.6))" }
                }
              >
                {hero && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-10 -bottom-10 h-24 rounded-[50%] blur-2xl"
                    style={{
                      background:
                        "radial-gradient(50% 100% at 50% 0%, rgba(0,255,122,0.28), transparent 70%)",
                    }}
                  />
                )}
                <div className="relative">
                  <span
                    className="font-mono text-[10.5px] uppercase tracking-[0.2em]"
                    style={{ color: hero ? "var(--color-hero)" : "var(--color-ink-ghost)" }}
                  >
                    {c.label}
                  </span>
                  <p
                    className="display mt-4 text-[clamp(2.4rem,7vw,4.5rem)]"
                    style={{ color: hero ? "var(--color-ink)" : "var(--color-ink-faint)" }}
                  >
                    {c.unit}
                  </p>
                </div>

                {/* Duration bar: long and grey vs short and lit */}
                <div className="relative hidden w-[38%] sm:block">
                  <span
                    aria-hidden
                    className="block h-[3px] w-full rounded-full"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <span
                      className="block h-full rounded-full"
                      style={{
                        width: hero ? "14%" : "100%",
                        background: hero ? "var(--color-hero)" : "rgba(255,255,255,0.18)",
                        boxShadow: hero ? "0 0 12px rgba(0,255,122,0.8)" : "none",
                      }}
                    />
                  </span>
                </div>
              </Panel>
            </Reveal>
          );
        })}
      </div>

      {/* ---- Activation sequence -------------------------------------------- */}
      <Reveal delay={120} className="mt-6 sm:mt-8">
        <Panel className="overflow-hidden p-6 sm:p-9 lg:p-11">
          <div ref={ref}>
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-ghost">
                Activation sequence
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-hero">
                {integration.states[index].label}
              </span>
            </div>

            {/* Desktop: horizontal state machine */}
            <div className="mt-9 hidden items-center sm:flex">
              {integration.states.map((s, i) => {
                const on = i <= index;
                const current = i === index;
                return (
                  <div key={s.id} className="flex flex-1 items-center last:flex-none">
                    <div className="flex flex-col items-center gap-3">
                      <span
                        aria-hidden
                        className="relative flex h-[13px] w-[13px] items-center justify-center rounded-full
                          transition-all duration-500 ease-[var(--ease-drk)]"
                        style={{
                          background: on ? "var(--color-hero)" : "#1b1f1e",
                          boxShadow: current
                            ? "0 0 0 5px rgba(0,255,122,0.13), 0 0 18px 2px rgba(0,255,122,0.65)"
                            : on
                              ? "0 0 10px rgba(0,255,122,0.45)"
                              : "none",
                          transform: current ? "scale(1.12)" : "scale(1)",
                        }}
                      />
                      <span
                        className="whitespace-nowrap font-mono text-[9.5px] uppercase tracking-[0.14em]
                          transition-colors duration-500"
                        style={{
                          color: current
                            ? "var(--color-ink)"
                            : on
                              ? "var(--color-ink-muted)"
                              : "var(--color-ink-ghost)",
                        }}
                      >
                        {s.label}
                      </span>
                    </div>

                    {i < integration.states.length - 1 && (
                      <span
                        aria-hidden
                        className="relative mx-2 -mt-6 h-px flex-1"
                        style={{ background: "rgba(255,255,255,0.07)" }}
                      >
                        <span
                          className="absolute inset-y-0 left-0 block transition-[width] duration-[900ms] ease-[var(--ease-drk)]"
                          style={{
                            width: i < index ? "100%" : "0%",
                            background: "var(--color-hero)",
                            boxShadow: "0 0 8px rgba(0,255,122,0.6)",
                          }}
                        />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile: vertical activation list — full narrative, no squeeze */}
            <ol className="mt-8 sm:hidden">
              {integration.states.map((s, i) => {
                const on = i <= index;
                const current = i === index;
                return (
                  <li key={s.id} className="relative flex items-center gap-4 pb-5 last:pb-0">
                    {i < integration.states.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute left-[6px] top-[16px] h-[calc(100%-4px)] w-px"
                        style={{ background: "rgba(255,255,255,0.07)" }}
                      >
                        <span
                          className="block w-full transition-[height] duration-700"
                          style={{
                            height: i < index ? "100%" : "0%",
                            background: "var(--color-hero)",
                          }}
                        />
                      </span>
                    )}
                    <span
                      aria-hidden
                      className="relative z-10 h-[13px] w-[13px] shrink-0 rounded-full transition-all duration-500"
                      style={{
                        background: on ? "var(--color-hero)" : "#1b1f1e",
                        boxShadow: current ? "0 0 0 5px rgba(0,255,122,0.13)" : "none",
                      }}
                    />
                    <span
                      className="font-mono text-[12px] uppercase tracking-[0.14em] transition-colors duration-500"
                      style={{
                        color: current
                          ? "var(--color-ink)"
                          : on
                            ? "var(--color-ink-muted)"
                            : "var(--color-ink-ghost)",
                      }}
                    >
                      {s.label}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </Panel>
      </Reveal>
    </Section>
  );
}
