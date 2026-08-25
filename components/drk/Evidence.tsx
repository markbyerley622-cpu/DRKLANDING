"use client";

import { Reveal, Section, SectionHead, Panel, Chip, Withheld } from "@/components/ui/Primitives";
import { useScrollProgress, range, smooth } from "@/lib/motion";
import { evidence } from "@/content/drk";

/**
 * ACT 05 — EVIDENCE
 * Deliberately understated. Reads as a case file, not a feature section.
 *
 * DATA INTEGRITY: the brief referenced client-profit and DRK-capture figures
 * but supplied none. Nothing numeric is fabricated here — quantitative fields
 * render via <Withheld/> and the market band is drawn without axis values and
 * labelled illustrative.
 */
export function Evidence() {
  return (
    <Section id="evidence" className="py-28 sm:py-36 lg:py-44">
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
          <Reveal y={30}>
            <MarketContext />
          </Reveal>
        </div>
      </div>

      {/* ---- Case rows ------------------------------------------------------ */}
      <div className="mt-16 lg:mt-20">
        <Reveal>
          <div className="hidden grid-cols-[1.1fr_0.8fr_1fr_1fr_0.8fr] gap-6 border-b border-white/[0.07] pb-3.5 lg:grid">
            {["Window", "Conditions", "Client profit", "DRK capture", "Status"].map((h) => (
              <span
                key={h}
                className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-ghost"
              >
                {h}
              </span>
            ))}
          </div>
        </Reveal>

        {evidence.launches.map((launch, i) => (
          <Reveal key={launch.id} delay={i * 130} y={22}>
            {/* Desktop row */}
            <div
              className="hidden grid-cols-[1.1fr_0.8fr_1fr_1fr_0.8fr] items-center gap-6 border-b border-white/[0.05]
                py-7 transition-colors duration-700 hover:bg-white/[0.012] lg:grid"
            >
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

            {/* Mobile card — the table becomes a stacked record */}
            <Panel className="mb-3 p-5 lg:hidden">
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
            </Panel>
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
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-ghost">{k}</span>
      {node ?? <span className="font-mono text-[11.5px] text-ink">{v}</span>}
    </div>
  );
}

/**
 * Market context band. Direction only — no axis, no figures, explicitly
 * labelled illustrative. Draws a falling market envelope with the two
 * program windows marked as vertical gates.
 */
function MarketContext() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>({ start: 0.9, end: 0.4 });
  const p = smooth(range(progress, 0, 0.8));

  const W = 400;
  const H = 150;

  // A monotone-ish decline with noise. Fixed constants: never regenerated,
  // never presented as measured data.
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
    <Panel className="p-5 sm:p-7">
      <div ref={ref}>
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-ghost">
            Market context
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
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
                <rect x="0" y="0" width={W * p} height={H} />
              </clipPath>
            </defs>

            {/* Baseline grid — no labels, because there are no values */}
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
                stroke="rgba(255,255,255,0.32)"
                strokeWidth="1.3"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </g>

            {/* Program windows: the two launches, marked as gates */}
            {[0.42, 0.72].map((x, i) => (
              <g
                key={x}
                style={{
                  opacity: p > x ? 1 : 0,
                  transition: "opacity 700ms var(--ease-drk)",
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
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "8px",
                    letterSpacing: "0.14em",
                  }}
                >
                  {`P0${i + 1}`}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/[0.06] pt-4">
          <Legend swatch="rgba(255,255,255,0.32)" label="Market direction" />
          <Legend swatch="var(--color-hero)" label="Program window" />
          <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.18em] text-ink-ghost">
            Illustrative · no axis values
          </span>
        </div>
      </div>
    </Panel>
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
