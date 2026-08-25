"use client";

import { Scrub } from "./Stage";

/**
 * THE SEAM — the join between two acts.
 * ---------------------------------------------------------------------------
 * The single biggest thing stopping the page reading as one system was that
 * every act ended and the next one started. A seam replaces that hard cut: a
 * thin path leaves the act above, carries a packet across the gap, and
 * arrives at the act below.
 *
 * The same four primitives every act uses — the PATH, the SIGNAL, the NODE and
 * the SURFACE — so this is not new furniture, it is the connective tissue of
 * the vocabulary already in play.
 *
 * `--p` is the scrub progress across the seam itself, so the packet's travel
 * is tied to the reader's own descent rather than to a timer.
 */
export function Seam({
  /** Where the path leaves and arrives, 0 = left edge, 1 = right. */
  from = 0.5,
  to = 0.5,
  height = 128,
  /** A short label riding the seam, e.g. the state being carried forward. */
  label,
  compact = false,
}: {
  from?: number;
  to?: number;
  height?: number;
  label?: string;
  compact?: boolean;
}) {
  const W = 1000;
  const H = 100;
  const x1 = from * W;
  const x2 = to * W;
  // A single smooth S — right angles would read as a diagram, not a current.
  const d = `M${x1} 0 C ${x1} ${H * 0.42}, ${x2} ${H * 0.58}, ${x2} ${H}`;

  return (
    <Scrub
      className="pointer-events-none relative w-full"
      start={0.96}
      end={0.34}
      style={{ height: compact ? height * 0.62 : height }}
    >
      <svg
        aria-hidden
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {/* dormant rail */}
        <path d={d} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" vectorEffect="non-scaling-stroke" />

        {/* the path drawing itself as you descend */}
        <path
          d={d}
          fill="none"
          stroke="var(--color-hero)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          strokeDasharray="200"
          style={{
            strokeDashoffset: "calc(200 * (1 - var(--p)))",
            opacity: 0.55,
            filter: "drop-shadow(0 0 3px rgba(0,255,122,0.5))",
          }}
        />

        {/* the packet, riding the path down into the next act */}
        <circle
          r="2.6"
          fill="var(--color-tint)"
          style={{
            offsetPath: `path("${d}")`,
            offsetDistance: "calc(var(--p) * 100%)",
            // Fades in and out at the ends so it emerges and submerges.
            opacity: "calc(var(--p) * (1 - var(--p)) * 4)",
            filter: "drop-shadow(0 0 5px rgba(0,255,122,0.9))",
          }}
        />
      </svg>

      {label && (
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-obsidian px-3 font-mono text-[8.5px] uppercase tracking-[0.24em] text-ink-faint"
          style={{ opacity: "clamp(0, calc((var(--p) - 0.25) / 0.3), 1)" }}
        >
          {label}
        </span>
      )}
    </Scrub>
  );
}
