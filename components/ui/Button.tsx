"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/**
 * DRK button — reproduces the 3D liquid-glass treatment from the supplied
 * component sheet:
 *
 *   ┌ metallic outer rim (bright at top + bottom, dark at the waist)
 *   │ ┌ dark glass body with a soft internal top highlight
 *   │ │ ┌ inset illuminated ring (green on primary, silver on secondary)
 *
 * Hover deepens the illumination and lifts the piece 1px. Nothing reflows.
 */

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

interface Props {
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  arrow?: boolean;
  /**
   * The wide pill from the design board: the label sits on the left edge and
   * the arrow is pushed to the right, with a floor width so a short label
   * still reads as a door rather than a chip.
   */
  spread?: boolean;
  className?: string;
  ariaLabel?: string;
}

const sizing: Record<Size, string> = {
  md: "h-[46px] px-5 text-[13.5px] rounded-[13px]",
  lg: "h-[58px] px-7 text-[15px] rounded-[16px]",
};

export function Button({
  href,
  onClick,
  variant = "primary",
  size = "md",
  children,
  arrow = true,
  spread = false,
  className = "",
  ariaLabel,
}: Props) {
  const isPrimary = variant === "primary";
  const isGhost = variant === "ghost";

  if (isGhost) {
    const ghost = (
      <span
        className={`group inline-flex items-center gap-2.5 font-sans text-[13.5px] tracking-[0.01em]
          text-ink-muted transition-colors duration-500 hover:text-tint ${className}`}
      >
        <span className="relative">
          {children}
          <span
            aria-hidden
            className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-hero/60
              transition-transform duration-700 ease-[var(--ease-drk)] group-hover:scale-x-100"
          />
        </span>
        {arrow && <Arrow />}
      </span>
    );
    return href ? (
      <Link href={href} aria-label={ariaLabel}>
        {ghost}
      </Link>
    ) : (
      <button type="button" onClick={onClick} aria-label={ariaLabel}>
        {ghost}
      </button>
    );
  }

  const body = (
    <span
      className={`group/btn relative inline-flex select-none items-center gap-3
        ${spread ? "min-w-[248px] justify-between" : "justify-center"}
        overflow-hidden font-sans font-medium tracking-[0.005em] text-ink
        transition-[transform,box-shadow] duration-500 ease-[var(--ease-drk)]
        hover:-translate-y-px active:translate-y-0 active:duration-100
        ${sizing[size]} ${className}`}
      style={{
        // Layer 1 — the metallic rim, painted into the border box.
        background: isPrimary
          ? `linear-gradient(180deg, #1b201e 0%, #101413 46%, #080d0c 100%) padding-box,
             linear-gradient(180deg,
               rgba(255,255,255,0.52) 0%,
               rgba(255,255,255,0.13) 20%,
               rgba(255,255,255,0.03) 52%,
               rgba(255,255,255,0.09) 80%,
               rgba(255,255,255,0.30) 100%) border-box`
          : `linear-gradient(180deg, #161a19 0%, #0d1211 52%, #080d0c 100%) padding-box,
             linear-gradient(180deg,
               rgba(255,255,255,0.34) 0%,
               rgba(255,255,255,0.08) 24%,
               rgba(255,255,255,0.02) 56%,
               rgba(255,255,255,0.06) 82%,
               rgba(255,255,255,0.18) 100%) border-box`,
        border: "1px solid transparent",
        boxShadow: isPrimary
          ? "0 12px 26px -12px rgba(0,0,0,0.95), 0 0 0 0 rgba(0,255,122,0)"
          : "0 10px 22px -14px rgba(0,0,0,0.9)",
      }}
    >
      {/* Layer 2 — inset illuminated ring */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[3px] rounded-[inherit] transition-all duration-500 ease-[var(--ease-drk)]"
        style={{
          borderRadius: size === "lg" ? "13px" : "10px",
          border: isPrimary
            ? "1px solid rgba(0,255,122,0.42)"
            : "1px solid rgba(255,255,255,0.07)",
          boxShadow: isPrimary
            ? "inset 0 0 18px -2px rgba(0,255,122,0.20), inset 0 1px 0 rgba(255,255,255,0.10)"
            : "inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      />

      {/* Layer 2b — the green wash entering from the left, as on the board.
          It sits under the label, not behind the whole face, so the pill
          still reads as dark glass rather than a green button. */}
      {isPrimary && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-90
            transition-opacity duration-500 group-hover/btn:opacity-100"
          style={{
            background:
              "linear-gradient(96deg, rgba(0,255,122,0.20) 0%, rgba(0,255,122,0.075) 34%, transparent 68%)",
          }}
        />
      )}

      {/* Layer 3 — green floor bloom, primary only */}
      {isPrimary && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-6 -bottom-6 h-9 rounded-[50%]
            opacity-70 blur-[14px] transition-opacity duration-500 group-hover/btn:opacity-100"
          style={{ background: "radial-gradient(50% 100% at 50% 0%, rgba(0,255,122,0.55), transparent 70%)" }}
        />
      )}

      {/* Layer 4 — specular highlight crossing the face on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 translate-x-[-120%] rounded-[inherit]
          transition-transform duration-[1100ms] ease-[var(--ease-drk)] group-hover/btn:translate-x-[120%]"
        style={{
          background:
            "linear-gradient(100deg, transparent 38%, rgba(255,255,255,0.13) 50%, transparent 62%)",
        }}
      />

      {/* Layer 5 — top gloss */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[inherit] opacity-60"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, transparent 100%)",
        }}
      />

      <span className="relative z-10 whitespace-nowrap">{children}</span>
      {arrow && (
        <span className="relative z-10">
          <Arrow />
        </span>
      )}

      {/* Hover halo — sits outside the body, so no layout shift */}
      {isPrimary && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0
            transition-opacity duration-500 group-hover/btn:opacity-100"
          style={{ boxShadow: "0 0 32px -6px rgba(0,255,122,0.42)" }}
        />
      )}
    </span>
  );

  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} className="inline-flex">
        {body}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className="inline-flex">
      {body}
    </button>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="10"
      viewBox="0 0 14 10"
      fill="none"
      aria-hidden
      className="transition-transform duration-500 ease-[var(--ease-drk)]
        group-hover/btn:translate-x-1 group-hover:translate-x-1"
    >
      <path
        d="M1 5h11M8.5 1.2 12.3 5 8.5 8.8"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
