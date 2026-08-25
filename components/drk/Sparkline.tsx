"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Deterministic, seeded series generator.
 *
 * IMPORTANT: this produces SHAPE only. It carries no axis values and is never
 * labelled as DRK performance — it exists to make interface surfaces feel
 * alive without asserting a single unverified figure. See content/drk.ts.
 */
function seededSeries(seed: number, count: number, drift: number): number[] {
  let s = seed;
  const rand = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  const out: number[] = [];
  let v = 0.5;
  for (let i = 0; i < count; i++) {
    v += (rand() - 0.5) * 0.16 + drift / count;
    v = Math.min(0.96, Math.max(0.04, v));
    out.push(v);
  }
  return out;
}

export function Sparkline({
  seed = 7,
  points = 34,
  drift = 0.35,
  className = "",
  stroke = "var(--color-hero)",
  fill = true,
  animate = true,
  height = 48,
}: {
  seed?: number;
  points?: number;
  drift?: number;
  className?: string;
  stroke?: string;
  fill?: boolean;
  animate?: boolean;
  height?: number;
}) {
  const [phase, setPhase] = useState(0);
  const ref = useRef<SVGSVGElement | null>(null);

  /* Advance the series slowly, only while visible. */
  useEffect(() => {
    if (!animate) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let id = 0;
    const obs = new IntersectionObserver(([e]) => {
      window.clearInterval(id);
      if (e.isIntersecting) {
        id = window.setInterval(() => setPhase((p) => p + 1), 2200);
      }
    });
    obs.observe(el);
    return () => {
      obs.disconnect();
      window.clearInterval(id);
    };
  }, [animate]);

  const series = useMemo(
    () => seededSeries(seed + phase * 977, points, drift),
    [seed, points, drift, phase],
  );

  const W = 120;
  const H = 40;
  const d = series
    .map((v, i) => {
      const x = (i / (series.length - 1)) * W;
      const y = H - v * H;
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");

  const area = `${d} L${W} ${H} L0 ${H} Z`;
  const gid = `sl-${seed}`;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className={className}
      style={{ height, width: "100%" }}
      aria-hidden
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0,255,122,0.22)" />
          <stop offset="100%" stopColor="rgba(0,255,122,0)" />
        </linearGradient>
      </defs>
      {fill && <path d={area} fill={`url(#${gid})`} style={{ transition: "d 1.6s var(--ease-drk)" }} />}
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        style={{ transition: "d 1.6s var(--ease-drk)" }}
      />
    </svg>
  );
}

/**
 * A value that ticks between neighbouring states. Used for interface chrome
 * (counts, statuses) — never for financial claims.
 */
export function TickingLabel({
  values,
  intervalMs = 2600,
  className = "",
}: {
  values: readonly string[];
  intervalMs?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let id = 0;
    const obs = new IntersectionObserver(([e]) => {
      window.clearInterval(id);
      if (e.isIntersecting) {
        id = window.setInterval(() => setI((n) => (n + 1) % values.length), intervalMs);
      }
    });
    obs.observe(el);
    return () => {
      obs.disconnect();
      window.clearInterval(id);
    };
  }, [values.length, intervalMs]);

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      <span key={i} style={{ animation: "drk-rise 600ms var(--ease-drk) both", display: "inline-block" }}>
        {values[i]}
      </span>
    </span>
  );
}
