"use client";

import type { CSSProperties, ReactNode } from "react";
import { useStage, useReducedMotion, type StageMode } from "@/lib/scroll";

/**
 * PinnedStage
 * ---------------------------------------------------------------------------
 * A tall spacer containing a `position: sticky` viewport-height frame. The
 * browser owns the pin, so there is no scroll hijacking, no injected spacing
 * element and nothing to clean up beyond unmounting.
 *
 * The engine writes `--p` (0 → 1) onto the spacer as the user travels through
 * the surplus height. `--p` inherits down to every child, so descendants can
 * interpolate in pure CSS without a single React render.
 *
 * Under `prefers-reduced-motion` the spacer collapses to natural height, the
 * sticky behaviour is dropped, and `--p` is pinned at 1 — the finished state.
 */
export function PinnedStage({
  children,
  /** Surplus scroll length, in viewport heights, on top of the pinned frame. */
  length = 2,
  /** Shorter travel on compact viewports — the simplified motion system. */
  compactLength,
  className = "",
  frameClassName = "",
  id,
  phase,
  style,
}: {
  children: ReactNode;
  length?: number;
  compactLength?: number;
  className?: string;
  frameClassName?: string;
  id?: string;
  /** System-telemetry state this stage represents while on screen. */
  phase?: string;
  style?: CSSProperties;
}) {
  const reduced = useReducedMotion();
  const ref = useStage<HTMLDivElement>({ mode: "pin" });

  if (reduced) {
    return (
      <section
        id={id}
        data-phase={phase}
        className={className}
        style={{ ...style, ["--p" as string]: 1 }}
      >
        <div className={frameClassName}>{children}</div>
      </section>
    );
  }

  return (
    <section
      id={id}
      data-phase={phase}
      ref={ref}
      className={`relative ${className}`}
      style={{
        // Surplus height is what the pin scrubs through. `--stage-len` picks
        // between these two in globals.css, so mobile gets a shorter, tighter
        // sequence without a JS branch or a re-render.
        height: `calc(100svh + var(--stage-len) * 100svh)`,
        ["--len-d" as string]: length,
        ["--len-m" as string]: compactLength ?? Math.max(1, length * 0.6),
        ["--p" as string]: 0,
        ...style,
      }}
      data-stage="pin"
    >
      <div
        className={`sticky top-0 h-[100svh] w-full overflow-hidden ${frameClassName}`}
      >
        {children}
      </div>
    </section>
  );
}

/**
 * Scrub
 * ---------------------------------------------------------------------------
 * A non-pinned scroll-linked region. Same `--p` contract, but progress is
 * driven by the element travelling across the viewport rather than by a pin.
 * Use where the story wants continuous motion but not a held frame.
 */
export function Scrub({
  children,
  className = "",
  id,
  phase,
  start = 0.92,
  end = 0.15,
  mode = "through",
  style,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  /** System-telemetry state this region represents while on screen. */
  phase?: string;
  start?: number;
  end?: number;
  mode?: StageMode;
  style?: CSSProperties;
  as?: "div" | "section";
}) {
  const ref = useStage<HTMLDivElement>({ mode, start, end });
  const Component = Tag as "div";
  return (
    <Component
      id={id}
      data-phase={phase}
      ref={ref}
      className={className}
      style={{ ["--p" as string]: 0, ...style }}
      data-stage="scrub"
    >
      {children}
    </Component>
  );
}

/**
 * Track — the readable progress rail shown alongside a pinned sequence.
 * Purely presentational; driven entirely by the inherited `--p`.
 */
export function StageTrack({
  labels,
  className = "",
}: {
  labels: readonly string[];
  className?: string;
}) {
  const n = labels.length;
  return (
    <ol className={`flex items-center gap-2.5 ${className}`} aria-hidden>
      {labels.map((label, i) => (
        <li key={label} className="flex items-center gap-2.5">
          <span
            className="font-mono text-[9px] uppercase tracking-[0.18em] transition-colors duration-500"
            style={{
              // Lit once progress passes this band.
              color: `color-mix(in srgb, var(--color-hero) calc(var(--lit-${i}, 0) * 100%), var(--color-ink-ghost))`,
              ["--lit-" + i]: `clamp(0, calc(var(--p) * ${n} - ${i}), 1)`,
            }}
          >
            {label}
          </span>
          {i < n - 1 && (
            <span
              className="h-px w-5"
              style={{
                background: `color-mix(in srgb, var(--color-hero) calc(clamp(0, calc(var(--p) * ${n} - ${i} - 0.5), 1) * 70%), rgba(255,255,255,0.09))`,
              }}
            />
          )}
        </li>
      ))}
    </ol>
  );
}
