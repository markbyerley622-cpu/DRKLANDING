"use client";

import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "@/lib/scroll";

/* -------------------------------------------------------------------------- */
/* Reveal wrapper                                                             */
/* -------------------------------------------------------------------------- */

export function Reveal({
  children,
  delay = 0,
  y = 22,
  scale,
  as: Tag = "div",
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  scale?: number;
  as?: "div" | "span" | "li" | "p" | "h2" | "h3" | "section";
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useReveal<HTMLDivElement>();
  const Component = Tag as "div";
  return (
    <Component
      ref={ref}
      data-reveal=""
      className={className}
      style={
        {
          "--reveal-d": `${delay}ms`,
          "--reveal-y": `${y}px`,
          ...(scale ? { "--reveal-s": scale } : {}),
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </Component>
  );
}

/* -------------------------------------------------------------------------- */
/* Section shell — consistent rhythm and max width across all acts            */
/* -------------------------------------------------------------------------- */

export function Section({
  id,
  children,
  className = "",
  bleed = false,
  phase,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  bleed?: boolean;
  /** System-telemetry state this act represents while on screen. */
  phase?: string;
}) {
  return (
    <section
      id={id}
      data-phase={phase}
      className={`relative w-full ${bleed ? "" : "px-6 sm:px-8 lg:px-12"} ${className}`}
    >
      <div className={bleed ? "" : "mx-auto w-full max-w-[1280px]"}>{children}</div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Eyebrow                                                                    */
/* -------------------------------------------------------------------------- */

export function Eyebrow({
  children,
  dot = true,
  className = "",
}: {
  children: ReactNode;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 eyebrow ${className}`}>
      {dot && (
        <span
          aria-hidden
          className="h-[5px] w-[5px] shrink-0 rounded-full bg-hero"
          style={{ boxShadow: "0 0 8px 1px rgba(0,255,122,0.65)" }}
        />
      )}
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Section heading — eyebrow + display headline + optional body               */
/* -------------------------------------------------------------------------- */

export function SectionHead({
  eyebrow,
  headline,
  body,
  align = "left",
  size = "lg",
  className = "",
}: {
  eyebrow?: string;
  headline: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  size?: "lg" | "xl";
  className?: string;
}) {
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  const type =
    size === "xl"
      ? "text-[clamp(2.6rem,6vw,5rem)]"
      : "text-[clamp(2.1rem,4.6vw,3.75rem)]";

  return (
    <div className={`flex max-w-[880px] flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <Reveal delay={0}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={90} className="mt-6">
        <h2 className={`display ${type} text-ink`}>{headline}</h2>
      </Reveal>
      {body && (
        <Reveal delay={180} className="mt-6 max-w-[620px]">
          <p className="text-[16px] leading-[1.65] text-ink-muted sm:text-[17px]">{body}</p>
        </Reveal>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Glass panel                                                                */
/* -------------------------------------------------------------------------- */

export function Panel({
  children,
  className = "",
  variant = "glass",
  rim = false,
  sweep = false,
  sweepDelay = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  variant?: "glass" | "quiet";
  rim?: boolean;
  sweep?: boolean;
  sweepDelay?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius-panel)]
        ${variant === "glass" ? "glass" : "glass-quiet"}
        ${rim ? "metal-rim" : ""} ${sweep ? "specular" : ""} ${className}`}
      style={{ ["--sweep-delay" as string]: `${sweepDelay}ms`, ...style }}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Status chip — from the component sheet (LIVE / CONNECTED / IDLE / ...)      */
/* -------------------------------------------------------------------------- */

export function Chip({
  children,
  tone = "live",
  className = "",
}: {
  children: ReactNode;
  tone?: "live" | "active" | "idle" | "off";
  className?: string;
}) {
  const tones = {
    live: {
      text: "text-hero",
      border: "rgba(0,255,122,0.32)",
      glow: "0 0 18px -6px rgba(0,255,122,0.7), inset 0 1px 0 rgba(255,255,255,0.07)",
      dot: "bg-hero",
      pulse: true,
    },
    active: {
      text: "text-signal",
      border: "rgba(57,255,154,0.22)",
      glow: "inset 0 1px 0 rgba(255,255,255,0.07)",
      dot: "bg-signal",
      pulse: false,
    },
    idle: {
      text: "text-ink-faint",
      border: "rgba(255,255,255,0.09)",
      glow: "inset 0 1px 0 rgba(255,255,255,0.05)",
      dot: "bg-ink-ghost",
      pulse: false,
    },
    off: {
      text: "text-ink-ghost",
      border: "rgba(255,255,255,0.06)",
      glow: "none",
      dot: "bg-ink-ghost",
      pulse: false,
    },
  }[tone];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-[5px]
        font-mono text-[10px] uppercase tracking-[0.16em] ${tones.text} ${className}`}
      style={{
        border: `1px solid ${tones.border}`,
        background: "linear-gradient(180deg, rgba(34,37,35,0.55), rgba(8,13,12,0.7))",
        boxShadow: tones.glow,
      }}
    >
      <span
        aria-hidden
        className={`h-[5px] w-[5px] rounded-full ${tones.dot}`}
        style={tones.pulse ? { animation: "drk-pulse 2.4s ease-in-out infinite" } : undefined}
      />
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Label / value pair, mono — the site's atomic data unit                      */
/* -------------------------------------------------------------------------- */

export function DataRow({
  k,
  v,
  accent = false,
}: {
  k: string;
  v: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-[11px]">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.15em] text-ink-faint">
        {k}
      </span>
      <span
        className={`font-mono text-[12px] tracking-[0.02em] ${
          accent ? "text-hero" : "text-ink"
        }`}
      >
        {v}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Numbered marker used across the acts                                        */
/* -------------------------------------------------------------------------- */

export function Marker({ children, active = false }: { children: ReactNode; active?: boolean }) {
  return (
    <span
      className={`font-mono text-[11px] tracking-[0.18em] transition-colors duration-700 ${
        active ? "text-hero" : "text-ink-ghost"
      }`}
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Pending-approval marker — flags data withheld from the public page          */
/* -------------------------------------------------------------------------- */

export function Withheld({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.06em] text-ink-faint"
      title="Figure withheld pending disclosure approval"
    >
      <span aria-hidden className="text-ink-ghost">
        ——
      </span>
      {label}
    </span>
  );
}
