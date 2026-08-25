"use client";

import type { CSSProperties, ReactNode } from "react";

/**
 * DRK OBJECT LIBRARY
 * ===========================================================================
 * The physical vocabulary of the system: orbs, nodes, slabs and signals.
 *
 * Every object is built from stacked gradients rather than images, so they
 * stay crisp at any size and cost nothing to download. The material recipe
 * follows the supplied 3D liquid-glass sheet:
 *
 *   1. ambient occlusion floor      (the object sits in the dark)
 *   2. body gradient                (smoked charcoal, lit from upper-left)
 *   3. inner bounce light           (green, from the core)
 *   4. chrome rim                   (bright at top and bottom, dark at waist)
 *   5. specular hotspot             (small, sharp, upper-left)
 *   6. glancing highlight arc       (the giveaway that it is glass, not paint)
 *
 * Activation is driven by `--a` (0 → 1), inherited or set per instance, so
 * these can be scrubbed by the scroll engine without any React involvement.
 */

/* -------------------------------------------------------------------------- */
/* Orb — the engine core                                                      */
/* -------------------------------------------------------------------------- */

export function Orb({
  size = 200,
  className = "",
  style,
  spin = true,
  label,
}: {
  size?: number;
  className?: string;
  style?: CSSProperties;
  spin?: boolean;
  label?: string;
}) {
  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size, ["--a" as string]: "var(--orb-a, 1)", ...style }}
    >
      {/* 0 — ambient bloom, sits behind everything */}
      <span
        aria-hidden
        className="absolute -inset-[26%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,122,calc(0.20 * var(--a))) 0%, transparent 62%)",
          filter: "blur(18px)",
        }}
      />

      {/* 1 — orbit rings */}
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          aria-hidden
          className="absolute rounded-full"
          style={{
            inset: `${i * 7}%`,
            border: `1px solid rgba(255,255,255,${0.1 - i * 0.025})`,
            opacity: `calc(0.35 + 0.65 * var(--a))`,
          }}
        />
      ))}

      {/* 2 — rotating aperture: energy circulating in the shell */}
      <span
        aria-hidden
        className="absolute inset-[3%] rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(0,255,122,0.42) 26deg, transparent 88deg, transparent 172deg, rgba(136,255,216,0.22) 212deg, transparent 296deg)",
          maskImage: "radial-gradient(closest-side, transparent 76%, #000 79%, #000 100%)",
          WebkitMaskImage:
            "radial-gradient(closest-side, transparent 76%, #000 79%, #000 100%)",
          animation: spin ? "drk-spin 26s linear infinite" : undefined,
          opacity: "var(--a)",
        }}
      />

      {/* 3 — the glass body */}
      <span
        aria-hidden
        className="absolute inset-[19%] rounded-full"
        style={{
          background: `
            radial-gradient(circle at 50% 118%, rgba(0,255,122,calc(0.30 * var(--a))) 0%, transparent 52%),
            radial-gradient(circle at 32% 24%, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.05) 22%, transparent 46%),
            radial-gradient(circle at 50% 44%, #1d2220 0%, #121615 46%, #080d0c 100%)`,
          boxShadow: `
            inset 0 1px 1px rgba(255,255,255,0.22),
            inset 0 -14px 26px rgba(0,0,0,0.72),
            inset 0 10px 22px rgba(255,255,255,0.045),
            0 26px 52px -24px rgba(0,0,0,0.95),
            0 0 calc(48px * var(--a)) -8px rgba(0,255,122,calc(0.5 * var(--a)))`,
        }}
      />

      {/* 4 — chrome rim: bright at the poles, dark at the waist */}
      <span
        aria-hidden
        className="absolute inset-[19%] rounded-full"
        style={{
          padding: 1,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.08) 26%, rgba(255,255,255,0.015) 52%, rgba(255,255,255,0.07) 76%, rgba(255,255,255,0.30) 100%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
        }}
      />

      {/* 5 — the green heart */}
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 rounded-full"
        style={{
          width: "16%",
          height: "16%",
          transform: "translate(-50%,-50%)",
          background:
            "radial-gradient(circle, rgba(230,255,241,0.98) 0%, rgba(136,255,216,0.85) 26%, rgba(0,255,122,0.45) 52%, transparent 74%)",
          filter: "blur(0.5px)",
          opacity: "var(--a)",
          animation: "drk-pulse 3.8s ease-in-out infinite",
        }}
      />

      {/* 6 — specular hotspot */}
      <span
        aria-hidden
        className="absolute rounded-full"
        style={{
          left: "31%",
          top: "26%",
          width: "15%",
          height: "10%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.22) 42%, transparent 72%)",
          filter: "blur(2.5px)",
          transform: "rotate(-24deg)",
        }}
      />

      {/* 7 — glancing highlight arc, the glass tell */}
      <span
        aria-hidden
        className="absolute inset-[19%] rounded-full"
        style={{
          background:
            "conic-gradient(from 196deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.30) 16deg, transparent 40deg)",
          maskImage: "radial-gradient(closest-side, transparent 84%, #000 88%)",
          WebkitMaskImage: "radial-gradient(closest-side, transparent 84%, #000 88%)",
          opacity: 0.85,
        }}
      />

      {label && (
        <span
          className="absolute inset-x-0 -bottom-7 text-center font-mono text-[9.5px] uppercase tracking-[0.28em] text-ink-faint"
        >
          {label}
        </span>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Node — a labelled capsule in a signal chain                                */
/* -------------------------------------------------------------------------- */

export function Node({
  children,
  className = "",
  style,
  tone = "auto",
  size = "md",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** `auto` reads --lp; `on`/`off` force a state. */
  tone?: "auto" | "on" | "off";
  size?: "sm" | "md";
}) {
  const a = tone === "auto" ? "var(--lp, 1)" : tone === "on" ? "1" : "0";
  const pad = size === "sm" ? "px-3 py-2" : "px-4 py-2.5 sm:px-5 sm:py-3";

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center rounded-[11px] ${pad} ${className}`}
      style={{
        ["--a" as string]: a,
        background: `
          linear-gradient(180deg, rgba(0,255,122,calc(0.06 * var(--a))), transparent 60%),
          linear-gradient(168deg, #1c211f 0%, #121615 52%, #0a0f0e 100%)`,
        border: "1px solid transparent",
        backgroundClip: "padding-box",
        boxShadow: `
          inset 0 1px 0 rgba(255,255,255,calc(0.10 + 0.06 * var(--a))),
          inset 0 -6px 12px rgba(0,0,0,0.5),
          0 10px 22px -14px rgba(0,0,0,0.9),
          0 0 calc(26px * var(--a)) -10px rgba(0,255,122,calc(0.9 * var(--a)))`,
        ...style,
      }}
    >
      {/* rim */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          padding: 1,
          background: `linear-gradient(180deg,
            rgba(255,255,255,0.30) 0%,
            color-mix(in srgb, rgba(0,255,122,0.55) calc(var(--a) * 100%), rgba(255,255,255,0.05)) 45%,
            rgba(255,255,255,0.16) 100%)`,
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
        }}
      />
      {/* top gloss */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[inherit]"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.09), transparent)",
        }}
      />
      <span
        className="relative whitespace-nowrap font-mono text-[10.5px] tracking-[0.1em] sm:text-[11.5px]"
        style={{
          color: `color-mix(in srgb, var(--color-ink) calc(var(--a) * 100%), var(--color-ink-ghost))`,
        }}
      >
        {children}
      </span>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Slab — an architecture layer with real depth                               */
/* -------------------------------------------------------------------------- */

export function Slab({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[15px] ${className}`}
      style={{
        ["--a" as string]: "var(--lp, 0)",
        background: `
          linear-gradient(100deg, rgba(0,255,122,calc(0.075 * var(--a))) 0%, rgba(0,255,122,calc(0.012 * var(--a))) 38%, transparent 72%),
          linear-gradient(164deg, rgba(36,40,38,0.86) 0%, rgba(19,23,22,0.9) 48%, rgba(9,14,13,0.96) 100%)`,
        boxShadow: `
          inset 0 1px 0 rgba(255,255,255,calc(0.09 + 0.07 * var(--a))),
          inset 0 -18px 34px rgba(0,0,0,0.5),
          0 22px 46px -30px rgba(0,0,0,0.95),
          0 0 calc(40px * var(--a)) -20px rgba(0,255,122,calc(0.8 * var(--a)))`,
        ...style,
      }}
    >
      {/* rim */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          padding: 1,
          background: `linear-gradient(180deg,
            rgba(255,255,255,0.26) 0%,
            color-mix(in srgb, rgba(0,255,122,0.42) calc(var(--a) * 100%), rgba(255,255,255,0.035)) 50%,
            rgba(255,255,255,0.13) 100%)`,
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
        }}
      />
      {/* activation wipe travelling left → right */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-full origin-left"
        style={{
          transform: "scaleX(var(--a))",
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.05), transparent 55%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Signal — a path that draws itself, with a travelling pulse                  */
/* -------------------------------------------------------------------------- */

export function Signal({
  d,
  length = 600,
  from = 0,
  to = 1,
  width = 1,
  pulse = true,
  className = "",
}: {
  d: string;
  /** Approximate path length — drives the dash reveal. */
  length?: number;
  from?: number;
  to?: number;
  width?: number;
  pulse?: boolean;
  className?: string;
}) {
  const bandVars = {
    ["--from" as string]: from,
    ["--to" as string]: to,
    ["--len" as string]: length,
  };

  return (
    <g className={className} style={bandVars}>
      {/* dormant rail */}
      <path
        d={d}
        fill="none"
        stroke="rgba(255,255,255,0.075)"
        strokeWidth={width}
        vectorEffect="non-scaling-stroke"
      />
      {/* bloom */}
      <path
        className="band band-draw"
        d={d}
        fill="none"
        stroke="rgba(0,255,122,0.28)"
        strokeWidth={width * 5}
        strokeLinecap="round"
        style={{ filter: "blur(3px)" }}
      />
      {/* core */}
      <path
        className="band band-draw"
        d={d}
        fill="none"
        stroke="var(--color-hero)"
        strokeWidth={width}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      {/* travelling packet — only once the path exists */}
      {pulse && (
        <path
          d={d}
          fill="none"
          stroke="var(--color-tint)"
          strokeWidth={width * 1.6}
          strokeLinecap="round"
          strokeDasharray={`${Math.max(8, length * 0.05)} ${length}`}
          vectorEffect="non-scaling-stroke"
          style={{
            opacity: `clamp(0, calc((var(--p) - ${from}) / 0.08), 1)`,
            animation: `drk-packet ${(length / 190).toFixed(2)}s linear infinite`,
            filter: "drop-shadow(0 0 4px rgba(0,255,122,0.9))",
          }}
        />
      )}
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/* Readout — mono label/value used across every system surface                */
/* -------------------------------------------------------------------------- */

export function Readout({
  k,
  v,
  accent = false,
  style,
  className = "",
}: {
  k: string;
  v: ReactNode;
  accent?: boolean;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-5 border-b border-white/[0.05] py-3 last:border-0 ${className}`}
      style={style}
    >
      <span className="font-mono text-[9.5px] uppercase tracking-[0.17em] text-ink-faint">
        {k}
      </span>
      <span
        className={`font-mono text-[11.5px] tracking-[0.03em] ${accent ? "text-hero" : "text-ink"}`}
      >
        {v}
      </span>
    </div>
  );
}
