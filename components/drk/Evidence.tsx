"use client";

import { Reveal, Section, SectionHead, Chip, Withheld } from "@/components/ui/Primitives";
import { Scrub } from "@/components/system/Stage";
import { evidence } from "@/content/drk";

/**
 * ACT 05 — EVIDENCE (DELIBERATE PACING CHANGE)
 *
 * The product sequence just ran hot; this section runs cold. No pin, no
 * scrubbed choreography, no counters. A market line draws slowly, two program
 * windows resolve, statuses settle. That restraint is the argument: the system
 * has stopped performing and is presenting.
 *
 * DATA INTEGRITY: client-profit and DRK-capture figures were never supplied.
 * Nothing numeric is fabricated — quantitative fields render via <Withheld/>
 * and the market band carries no axis values.
 */
export function Evidence() {
  return (
    <Section id="evidence" phase="Evidence" className="py-28 sm:py-36 lg:py-44">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHead
            eyebrow={evidence.eyebrow}
            headline={
              <>
                Two launches.
                <br />
                <span className="text-ink-muted">Weak market.</span>
              </>
            }
            body={evidence.body}
          />
        </div>

        <div className="lg:pt-16">
          <MarketContext />
        </div>
      </div>

      {/* ---- Case rows ------------------------------------------------------ */}
      <div className="mt-16 lg:mt-20">
        <Reveal>
          <div className="hidden grid-cols-[1.1fr_0.8fr_1fr_1fr_0.8fr] gap-6 border-b border-white/[0.07] pb-3.5 lg:grid">
            {["Window", "Conditions", "Client profit", "DRK capture", "Status"].map((h) => (
              <span
                key={h}
                className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-faint"
              >
                {h}
              </span>
            ))}
          </div>
        </Reveal>

        {evidence.launches.map((launch, i) => (
          <Reveal key={launch.id} delay={i * 160} y={18}>
            <div className="hidden grid-cols-[1.1fr_0.8fr_1fr_1fr_0.8fr] items-center gap-6 border-b border-white/[0.05] py-7 transition-colors duration-700 hover:bg-white/[0.012] lg:grid">
              <span className="font-display text-[19px] font-semibold tracking-[-0.02em] text-ink">
                {launch.window}
              </span>
              <span className="font-mono text-[11.5px] tracking-[0.06em] text-ink-muted">
                {launch.market}
              </span>
              <Withheld label={launch.clientProfit.qualitative} />
              <Withheld label={launch.drkCapture.qualitative} />
              <Chip tone="active">{launch.status}</Chip>
            </div>

            {/* Mobile: the table becomes a stacked record */}
            <div className="glass mb-3 rounded-[var(--radius-panel)] p-5 lg:hidden">
              <div className="flex items-start justify-between gap-4">
                <span className="font-display text-[19px] font-semibold tracking-[-0.02em] text-ink">
                  {launch.window}
                </span>
                <Chip tone="active">{launch.status}</Chip>
              </div>
              <div className="mt-5 space-y-3 border-t border-white/[0.06] pt-4">
                <Row k="Conditions" v={launch.market} />
                <Row k="Client profit" node={<Withheld label={launch.clientProfit.qualitative} />} />
                <Row k="DRK capture" node={<Withheld label={launch.drkCapture.qualitative} />} />
              </div>
            </div>
          </Reveal>
        ))}

        <Reveal delay={200} className="mt-8">
          <p className="max-w-[620px] font-mono text-[10px] leading-[1.75] tracking-[0.04em] text-ink-faint">
            {evidence.disclaimer}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function Row({ k, v, node }: { k: string; v?: string; node?: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-faint">{k}</span>
      {node ?? <span className="font-mono text-[11.5px] text-ink">{v}</span>}
    </div>
  );
}

/**
 * Market context. Direction only — no axis, no figures, explicitly labelled
 * illustrative. The line draws slowly; the two program windows resolve after
 * it passes them.
 */
function MarketContext() {
  const W = 400;
  const H = 150;

  // Fixed constants. Never regenerated, never presented as measured data.
  const pts = [
    0.18, 0.24, 0.16, 0.3, 0.26, 0.38, 0.34, 0.46, 0.42, 0.55, 0.5, 0.6, 0.57,
    0.68, 0.63, 0.74, 0.71, 0.8, 0.76, 0.84,
  ];
  const path = pts
    .map((v, i) => {
      const x = (i / (pts.length - 1)) * W;
      const y = 12 + v * (H - 30);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <Scrub className="glass rounded-[var(--radius-panel)] p-5 sm:p-7" start={0.92} end={0.42}>
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
          Market context
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
          Risk-off
        </span>
      </div>

      <div className="relative mt-5">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-[150px] w-full" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="mkt-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.07)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <clipPath id="mkt-clip">
              {/* Scaled rather than sized: SVG geometry attributes cannot take
                  calc(), but a transform on the rect is universally supported. */}
              <rect
                x="0"
                y="0"
                width={W}
                height={H}
                style={{
                  transform: "scaleX(var(--p))",
                  transformBox: "fill-box",
                  transformOrigin: "left",
                }}
              />
            </clipPath>
          </defs>

          {[0.25, 0.5, 0.75].map((g) => (
            <line
              key={g}
              x1="0"
              x2={W}
              y1={12 + g * (H - 30)}
              y2={12 + g * (H - 30)}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          ))}

          <g clipPath="url(#mkt-clip)">
            <path d={`${path} L${W} ${H} L0 ${H} Z`} fill="url(#mkt-fade)" />
            <path
              d={path}
              fill="none"
              stroke="rgba(255,255,255,0.34)"
              strokeWidth="1.3"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </g>

          {[0.42, 0.72].map((x, i) => (
            <g
              key={x}
              style={{
                // Resolves only once the line has travelled past it.
                opacity: `clamp(0, calc((var(--p) - ${x + 0.02}) / 0.08), 1)`,
              }}
            >
              <line
                x1={x * W}
                x2={x * W}
                y1="6"
                y2={H - 6}
                stroke="rgba(0,255,122,0.4)"
                strokeWidth="1"
                strokeDasharray="3 4"
              />
              <circle
                cx={x * W}
                cy={12 + pts[Math.round(x * (pts.length - 1))] * (H - 30)}
                r="3.4"
                fill="var(--color-hero)"
                style={{ filter: "drop-shadow(0 0 6px rgba(0,255,122,0.9))" }}
              />
              <text
                x={x * W + 7}
                y="17"
                fill="var(--color-hero)"
                style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.14em" }}
              >
                {`P0${i + 1}`}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/[0.06] pt-4">
        <Legend swatch="rgba(255,255,255,0.34)" label="Market direction" />
        <Legend swatch="var(--color-hero)" label="Program window" />
        <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
          Illustrative · no axis values
        </span>
      </div>
    </Scrub>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden className="h-px w-4" style={{ background: swatch }} />
      <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-faint">
        {label}
      </span>
    </span>
  );
}
