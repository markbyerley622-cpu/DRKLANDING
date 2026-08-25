"use client";

import { Section, SectionHead, Chip } from "@/components/ui/Primitives";
import { PinnedStage } from "@/components/system/Stage";
import { Readout } from "@/components/system/Objects";
import { usePointerVars } from "@/lib/scroll";
import { proof } from "@/content/drk";

/**
 * ACT 04 — THE INTERFACE COMES ALIVE
 *
 * A pinned application shell that changes operating state as you scroll:
 *
 *   01 Programs activate
 *   02 Wallets enumerate
 *   03 Executions timestamp
 *   04 Threat monitoring engages
 *   05 P/L attribution resolves
 *   →  VISIBLE · ATTRIBUTED · MEASURED
 *
 * NOTHING FINANCIAL IS FAKED. No counters, no moving prices, no invented
 * values. State changes, row activation, attribution labels and connection
 * paths carry the entire sequence — which is the actual claim being made.
 */

const STATES = [
  {
    id: "programs",
    n: "01",
    label: "Programs",
    caption: "Named strategies come online.",
    rows: [
      ["Definition", "Explicit"],
      ["Inputs", "Declared"],
      ["Operator", "Assigned"],
      ["Lifecycle", "Tracked"],
    ],
  },
  {
    id: "wallets",
    n: "02",
    label: "Wallets",
    caption: "Every address enumerated and grouped.",
    rows: [
      ["Topology", "Mapped"],
      ["Custody", "Client-held"],
      ["Balances", "Reconciled"],
      ["Attribution", "Per program"],
    ],
  },
  {
    id: "executions",
    n: "03",
    label: "Executions",
    caption: "Orders route and timestamp.",
    rows: [
      ["Routing", "Venue-aware"],
      ["Fills", "Timestamped"],
      ["Slippage", "Recorded"],
      ["Sequence", "Ordered"],
    ],
  },
  {
    id: "threats",
    n: "04",
    label: "Threats",
    caption: "Monitoring and controls engage.",
    rows: [
      ["Monitoring", "Continuous"],
      ["Limits", "Enforced"],
      ["Anomalies", "Flagged"],
      ["Response", "Automatic"],
    ],
  },
  {
    id: "pnl",
    n: "05",
    label: "P/L",
    caption: "Performance resolves to its source.",
    rows: [
      ["Basis", "Program-level"],
      ["Reconciliation", "Continuous"],
      ["Client view", "Unfiltered"],
      ["Capture", "Performance-linked"],
    ],
  },
] as const;

const N = STATES.length;
/** Each state owns an equal band between 0.06 and 0.86. */
const band = (i: number) => 0.06 + (i * 0.8) / N;

export function ProductProof() {
  const pointerRef = usePointerVars<HTMLDivElement>(0.5);

  return (
    <>
      <Section id="proof" className="pt-28 sm:pt-36 lg:pt-44">
        <SectionHead
          eyebrow={proof.eyebrow}
          headline={
            <>
              Clients see what
              <br />
              black-box operators <span className="text-ink-faint">hide.</span>
            </>
          }
          body={proof.body}
        />
      </Section>

      <PinnedStage length={2.8} compactLength={2} phase="Observable" className="mt-14 sm:mt-16">
        <div
          ref={pointerRef}
          className="relative flex h-full w-full items-center justify-center px-4 sm:px-8"
        >
          <div
            className="relative w-full max-w-[1160px]"
            style={{
              transform:
                "perspective(1700px) rotateX(calc(var(--my,0) * -0.9deg)) rotateY(calc(var(--mx,0) * 1.3deg))",
            }}
          >
            {/* bloom */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -bottom-14 -top-10"
              style={{
                background:
                  "radial-gradient(58% 55% at 50% 55%, rgba(0,255,122,0.045), transparent 72%)",
                opacity: "clamp(0.25, var(--p), 1)",
                filter: "blur(18px)",
              }}
            />

            <div
              className="glass metal-rim relative overflow-hidden rounded-[var(--radius-panel)]"
              style={{ boxShadow: "var(--highlight-inset), var(--depth-shadow)" }}
            >
              {/* ---- Chrome -------------------------------------------- */}
              <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] px-4 py-3.5 sm:px-6">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="font-display text-[14px] font-bold tracking-[-0.03em] text-ink">
                    DRK
                  </span>
                  <span aria-hidden className="h-3 w-px shrink-0 bg-white/10" />
                  <span className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                    Operating surface
                  </span>
                </div>
                <Chip tone="live">Live</Chip>
              </div>

              {/* ---- Module rail: the scroll drives the active module --- */}
              <div className="scroll-x flex gap-1.5 border-b border-white/[0.06] px-4 py-3 sm:px-6">
                {STATES.map((s, i) => (
                  <span
                    key={s.id}
                    className="band shrink-0 rounded-full px-3.5 py-[7px] font-mono text-[10.5px] uppercase tracking-[0.14em]"
                    style={{
                      ["--from" as string]: band(i),
                      ["--to" as string]: band(i) + 0.03,
                      // Bright while its own band is the current one.
                      ["--on" as string]: `calc(var(--lp) * clamp(0, calc((${band(i + 1) + 0.03} - var(--p)) / 0.03), 1))`,
                      color: "color-mix(in srgb, var(--color-ink) calc(var(--on) * 100%), var(--color-ink-ghost))",
                      background:
                        "linear-gradient(180deg, rgba(34,37,35,calc(0.9 * var(--on))), rgba(13,17,16,calc(0.95 * var(--on))))",
                      border: "1px solid rgba(0,255,122,calc(0.3 * var(--on)))",
                      boxShadow:
                        "0 0 calc(18px * var(--on)) -8px rgba(0,255,122,0.9), inset 0 1px 0 rgba(255,255,255,calc(0.08 * var(--on)))",
                    }}
                  >
                    {s.label}
                  </span>
                ))}
              </div>

              {/* ---- Body ---------------------------------------------- */}
              <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
                {/* Left: the active module, cross-faded */}
                <div className="relative min-h-[320px] border-b border-white/[0.06] p-5 sm:min-h-[340px] sm:p-7 lg:border-b-0 lg:border-r lg:p-9">
                  {STATES.map((s, i) => (
                    <div
                      key={s.id}
                      className="band band-hold absolute inset-0 p-5 sm:p-7 lg:p-9"
                      style={{
                        ["--from" as string]: band(i),
                        ["--to" as string]: band(i + 1),
                        ["--fade" as string]: 0.035,
                        ["--rise" as string]: "14px",
                        // Re-export this band's progress under a distinct name.
                        // Children redefine --lp, so reusing it here would
                        // create a circular custom-property reference.
                        ["--bp" as string]: "var(--lp)",
                      }}
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <div className="flex items-baseline gap-3">
                          <span className="font-mono text-[11px] tracking-[0.18em] text-hero">
                            {s.n}
                          </span>
                          <h3 className="font-display text-[22px] font-semibold tracking-[-0.025em] text-ink sm:text-[27px]">
                            {s.label}
                          </h3>
                        </div>
                        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-hero">
                          Active
                        </span>
                      </div>

                      <p className="mt-2.5 text-[13.5px] leading-[1.6] text-ink-muted">
                        {s.caption}
                      </p>

                      {/* Rows activate one after another inside the band */}
                      <div className="mt-6" style={{ ["--n" as string]: 4 }}>
                        {s.rows.map(([k, v], r) => (
                          <div
                            key={k}
                            className="band-step"
                            style={{
                              ["--i" as string]: r,
                              // Local progress within this state's band.
                              ["--p" as string]: `clamp(0, calc((var(--bp) - 0.12) / 0.62), 1)`,
                              opacity: "calc(0.25 + var(--le) * 0.75)",
                              transform: "translate3d(calc((1 - var(--le)) * 10px), 0, 0)",
                            }}
                          >
                            <Readout k={k} v={v} accent={r === 0} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right: telemetry — attribution paths, not numbers */}
                <div className="p-5 sm:p-7 lg:p-9">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                      Attribution
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                      No values
                    </span>
                  </div>

                  <AttributionGraph />

                  <p className="mt-5 border-t border-white/[0.06] pt-4 font-mono text-[9.5px] leading-[1.65] tracking-[0.04em] text-ink-faint">
                    Interface preview. Every output is traced to the program that
                    produced it. No figures are shown and none are implied.
                  </p>
                </div>
              </div>

              {/* ---- Resolution banner --------------------------------- */}
              <div
                className="band flex items-center justify-center gap-5 border-t border-white/[0.06] px-5 py-4 sm:gap-10"
                style={{
                  ["--from" as string]: 0.88,
                  ["--to" as string]: 0.99,
                  background:
                    "linear-gradient(180deg, rgba(0,255,122,calc(0.05 * var(--lp))), transparent)",
                }}
              >
                {["Visible", "Attributed", "Measured"].map((w, i) => (
                  <span
                    key={w}
                    className="font-mono text-[10.5px] uppercase tracking-[0.2em] sm:text-[12px]"
                    style={{
                      ["--w" as string]: `clamp(0, calc((var(--lp) - ${i * 0.22}) / 0.3), 1)`,
                      color:
                        "color-mix(in srgb, var(--color-hero) calc(var(--w) * 100%), var(--color-ink-ghost))",
                      opacity: "calc(0.3 + var(--w) * 0.7)",
                      textShadow: "0 0 calc(var(--w) * 22px) rgba(0,255,122,0.5)",
                    }}
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PinnedStage>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Attribution graph — outputs wiring back to their source program            */
/* -------------------------------------------------------------------------- */

function AttributionGraph() {
  const rows = [0, 1, 2, 3];
  return (
    <div className="mt-5 rounded-[12px] border border-white/[0.06] bg-obsidian/55 p-4">
      <svg viewBox="0 0 260 150" className="h-[150px] w-full" aria-hidden>
        {/* source column */}
        {rows.map((r, i) => {
          const y = 22 + i * 34;
          const on = `clamp(0, calc((var(--p) - ${0.1 + i * 0.14}) / 0.12), 1)`;
          return (
            <g key={r} style={{ ["--on" as string]: on }}>
              {/* rail */}
              <path
                d={`M26 ${y} H150 Q186 ${y} 186 ${y > 75 ? y - 18 : y + 18} V75`}
                fill="none"
                stroke="rgba(255,255,255,0.07)"
                strokeWidth="1"
              />
              {/* attributed link */}
              <path
                d={`M26 ${y} H150 Q186 ${y} 186 ${y > 75 ? y - 18 : y + 18} V75`}
                fill="none"
                stroke="var(--color-hero)"
                strokeWidth="1"
                strokeDasharray="220"
                strokeDashoffset="calc(220 * (1 - var(--on)))"
                opacity="calc(var(--on) * 0.85)"
              />
              {/* source node */}
              <circle
                cx="20"
                cy={y}
                r="4"
                fill="color-mix(in srgb, var(--color-hero) calc(var(--on) * 100%), #1c2120)"
                style={{ filter: "drop-shadow(0 0 5px rgba(0,255,122,0.7))" }}
              />
              <text
                x="20"
                y={y - 9}
                fill="var(--color-ink-faint)"
                style={{ fontFamily: "var(--font-mono)", fontSize: "7px", letterSpacing: "0.12em" }}
              >
                {`P0${i + 1}`}
              </text>
            </g>
          );
        })}

        {/* the single attributed output */}
        <g style={{ ["--on" as string]: "clamp(0, calc((var(--p) - 0.66) / 0.16), 1)" }}>
          <circle
            cx="186"
            cy="75"
            r="9"
            fill="none"
            stroke="rgba(0,255,122,calc(0.5 * var(--on)))"
            strokeWidth="1"
          />
          <circle
            cx="186"
            cy="75"
            r="4.5"
            fill="color-mix(in srgb, var(--color-tint) calc(var(--on) * 100%), #1c2120)"
            style={{ filter: "drop-shadow(0 0 8px rgba(0,255,122,0.9))" }}
          />
          <text
            x="204"
            y="78"
            fill="var(--color-ink)"
            opacity="var(--on)"
            style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.1em" }}
          >
            OUTPUT
          </text>
        </g>
      </svg>
      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
        Output → source program
      </p>
    </div>
  );
}
