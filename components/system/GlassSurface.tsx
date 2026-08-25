"use client";

import type { CSSProperties, ReactNode } from "react";

/**
 * GLASS SURFACE
 * ---------------------------------------------------------------------------
 * The material from the large hero card in the reference sheet — the single
 * strongest surface in the DRK visual language, and the one this whole site
 * is built on.
 *
 * It is deliberately NOT `backdrop-filter: blur()` with a white overlay. That
 * reads as generic glassmorphism. This is built the way a physical panel of
 * smoked glass sitting in a dark room actually behaves:
 *
 *   1. a body that is darkest at the bottom and lifts toward the top edge
 *   2. an ambient bounce from whatever light is beneath it
 *   3. a chrome rim, bright at the top edge, dark at the waist, lit again low
 *   4. a broad specular sheen falling across the upper-left
 *   5. a fine top-edge highlight — the giveaway that it is glass, not paint
 *   6. a deep contact shadow so it sits ON the page rather than in it
 *
 * NO `backdrop-filter`. The world behind this panel is an animated canvas, and
 * blurring animated content re-filters a large surface every single frame — it
 * cost ~45ms/frame when it was here. The layered gradients carry the material
 * on their own, and the panel stays a genuine 60fps.
 *
 * `lift` raises the whole recipe together for the one surface that should
 * dominate a view; everything else stays quiet so the hierarchy holds.
 */
export function GlassSurface({
  children,
  className = "",
  style,
  /** 0 = quiet supporting panel, 1 = the hero surface of the view. */
  lift = 0.5,
  /** Faint green presence from the system running underneath. */
  glow = 0.4,
  radius = 22,
  as: Tag = "div",
}: {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  lift?: number;
  glow?: number;
  radius?: number;
  as?: "div" | "section" | "article";
}) {
  const Component = Tag as "div";

  return (
    <Component
      className={`relative isolate overflow-hidden ${className}`}
      style={{
        borderRadius: radius,
        background: `
          radial-gradient(120% 80% at 50% 120%, rgba(0,255,122,${0.05 * glow}) 0%, transparent 62%),
          linear-gradient(168deg,
            rgba(46,52,50,${0.72 + lift * 0.16}) 0%,
            rgba(26,31,30,${0.78 + lift * 0.14}) 34%,
            rgba(13,18,17,${0.88 + lift * 0.09}) 72%,
            rgba(8,13,12,${0.94 + lift * 0.05}) 100%)`,
        boxShadow: `
          inset 0 1px 0 rgba(255,255,255,${0.14 + lift * 0.14}),
          inset 0 -24px 48px rgba(0,0,0,${0.4 + lift * 0.18}),
          inset 0 40px 60px -50px rgba(255,255,255,${0.16 + lift * 0.12}),
          0 40px 90px -40px rgba(0,0,0,0.95),
          0 0 ${60 * glow}px -30px rgba(0,255,122,${0.55 * glow})`,
        ...style,
      }}
    >
      {/* Chrome rim — bright at the top edge, dark at the waist, lit again low. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          borderRadius: "inherit",
          padding: 1,
          background: `linear-gradient(180deg,
            rgba(255,255,255,${0.4 + lift * 0.22}) 0%,
            rgba(255,255,255,0.1) 16%,
            rgba(255,255,255,0.02) 48%,
            rgba(255,255,255,0.06) 78%,
            rgba(255,255,255,${0.16 + lift * 0.1}) 100%)`,
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
        }}
      />

      {/* Specular sheen falling across the upper-left face. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          borderRadius: "inherit",
          background: `linear-gradient(146deg,
            rgba(255,255,255,${0.07 + lift * 0.05}) 0%,
            rgba(255,255,255,0.018) 22%,
            transparent 46%)`,
        }}
      />

      {/* The fine top-edge highlight. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-[12%] top-0 z-20 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(255,255,255,${0.42 + lift * 0.3}), transparent)`,
        }}
      />

      <div className="relative z-10">{children}</div>
    </Component>
  );
}

/**
 * A single state word — the atomic unit of this site's product language.
 * Never a number, always a state: Live, Routing, Attributed, Reconciled.
 */
export function StateChip({
  children,
  active = true,
  className = "",
  style,
}: {
  children: ReactNode;
  active?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-[5px] font-mono text-[9.5px] uppercase tracking-[0.18em] ${className}`}
      style={{
        color: active ? "var(--color-hero)" : "var(--color-ink-faint)",
        border: `1px solid ${active ? "rgba(0,255,122,0.3)" : "rgba(255,255,255,0.08)"}`,
        background: "linear-gradient(180deg, rgba(34,37,35,0.5), rgba(8,13,12,0.7))",
        boxShadow: active
          ? "0 0 18px -7px rgba(0,255,122,0.8), inset 0 1px 0 rgba(255,255,255,0.07)"
          : "inset 0 1px 0 rgba(255,255,255,0.05)",
        ...style,
      }}
    >
      <span
        aria-hidden
        className="h-[4px] w-[4px] rounded-full"
        style={{
          background: active ? "var(--color-hero)" : "#2a302e",
          boxShadow: active ? "0 0 7px rgba(0,255,122,0.8)" : "none",
          animation: active ? "drk-pulse 2.6s ease-in-out infinite" : undefined,
        }}
      />
      {children}
    </span>
  );
}
