"use client";

import { useEffect, useState } from "react";
import { LiquidityField } from "./LiquidityField";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Primitives";
import { usePointerParallax, useIsCompact } from "@/lib/motion";
import { hero, brand } from "@/content/drk";

/**
 * ACT 01 — ACTIVATION
 * Cinematic entrance. Type enters in staggered bands, the liquidity field
 * resolves out of darkness behind it, telemetry settles last.
 */
export function Hero() {
  const [lit, setLit] = useState(false);
  const compact = useIsCompact();
  const { ref, offset } = usePointerParallax<HTMLDivElement>(1);

  /**
   * The field has to sit clear of the type at every width. On wide viewports
   * it is masked back on the left; on tall narrow ones a left-edge mask does
   * nothing useful, so the field is pushed into the lower-right instead.
   */
  const fieldMask = compact
    ? "radial-gradient(105% 58% at 88% 82%, black 0%, rgba(0,0,0,0.55) 45%, transparent 78%)"
    : "linear-gradient(96deg, transparent 4%, rgba(0,0,0,0.25) 28%, black 58%), radial-gradient(120% 110% at 72% 55%, black 30%, transparent 88%)";

  useEffect(() => {
    // One frame of delay so the entrance transition actually runs.
    const t = window.setTimeout(() => setLit(true), 60);
    return () => window.clearTimeout(t);
  }, []);

  const enter = (delay: number, y = 26): React.CSSProperties => ({
    opacity: lit ? 1 : 0,
    transform: lit ? "translate3d(0,0,0)" : `translate3d(0,${y}px,0)`,
    transition: `opacity 1.1s var(--ease-drk) ${delay}ms, transform 1.35s var(--ease-drk) ${delay}ms`,
  });

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden pt-[var(--nav-h)]"
    >
      {/* ---- Atmosphere ---------------------------------------------------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Base vignette: depth emerging from darkness */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 78% 42%, rgba(21,23,22,0.9) 0%, rgba(8,13,12,1) 62%)",
          }}
        />

        {/* Technical grid, fading out toward the edges */}
        <div
          className="grid-field absolute inset-0 opacity-60"
          style={{
            maskImage:
              "radial-gradient(90% 70% at 50% 45%, black 0%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(90% 70% at 50% 45%, black 0%, transparent 78%)",
          }}
        />

        {/* The liquidity field itself — masked back on the left so the
            headline always sits on near-black, and faded at every edge so it
            emerges from the dark rather than being pasted onto it. */}
        <div
          className="absolute inset-0"
          style={{
            ...enter(220, 0),
            transitionDuration: "2.2s",
            maskImage: fieldMask,
            WebkitMaskImage: fieldMask,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        >
          <LiquidityField pointer={offset} intensity={compact ? 0.55 : 0.8} />
        </div>

        {/* Green floor bloom — restrained, only where the routes converge */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2"
          style={{
            background:
              "radial-gradient(60% 100% at 62% 100%, rgba(0,255,122,0.08), transparent 70%)",
          }}
        />

        {/* Smoked-glass plate: an edge of structure over the atmosphere */}
        <div
          className="absolute right-[-8%] top-[8%] hidden h-[78%] w-[46%] rotate-[8deg] rounded-[40px] lg:block"
          style={{
            background:
              "linear-gradient(150deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.005) 40%, transparent 70%)",
            border: "1px solid rgba(255,255,255,0.05)",
            transform: `rotate(8deg) translate3d(${offset.x * -10}px, ${offset.y * -8}px, 0)`,
            transition: "transform 200ms linear",
          }}
        />

        {/* Bottom fade into the next act */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-obsidian" />
      </div>

      {/* ---- Content -------------------------------------------------------- */}
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pb-24 pt-16 sm:px-8 lg:px-12">
        <div style={enter(0, 14)}>
          <Chip tone="live">Runtime operational</Chip>
        </div>

        <p
          className="eyebrow mt-7 max-w-[420px]"
          style={enter(120, 18)}
        >
          {hero.eyebrow}
        </p>

        {/* The display size lives on the h1 so `ch` units resolve correctly. */}
        <h1 className="display mt-8 max-w-[15ch] text-[clamp(2.35rem,6.6vw,5.9rem)] text-ink">
          {hero.headline.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <span
                className="block"
                style={enter(260 + i * 130, 44)}
              >
                {i === hero.emphasisIndex ? (
                  <>
                    <span>into </span>
                    <span
                      className="text-tint"
                      style={{ textShadow: "0 0 46px rgba(0,255,122,0.28)" }}
                    >
                      visible
                    </span>
                  </>
                ) : (
                  line
                )}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-9 max-w-[520px]" style={enter(700, 22)}>
          <p className="text-[16.5px] leading-[1.6] text-ink-muted sm:text-[18px]">
            {hero.body}
          </p>
          <p className="mt-4 font-display text-[17px] font-semibold tracking-[-0.015em] text-ink sm:text-[19px]">
            {hero.statement}
          </p>
        </div>

        <div
          className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-5"
          style={enter(830, 20)}
        >
          <Button href={hero.ctaPrimary.href} size="lg" variant="primary">
            {hero.ctaPrimary.label}
          </Button>
          <Button href={hero.ctaSecondary.href} variant="ghost">
            {hero.ctaSecondary.label}
          </Button>
        </div>

        {/* Telemetry strip — settles last, like a system coming online */}
        <div
          className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/[0.06] pt-7"
          style={enter(980, 16)}
        >
          {hero.telemetry.map((t) => (
            <div key={t.label} className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-ghost">
                {t.label}
              </span>
              <span className="font-mono text-[11.5px] tracking-[0.06em] text-hero">
                {t.value}
              </span>
            </div>
          ))}
          <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.24em] text-ink-ghost lg:block">
            {brand.surfaceLine}
          </span>
        </div>
      </div>

      {/* ---- Scroll indicator ------------------------------------------------ */}
      <div
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
        style={enter(1200, 12)}
      >
        <span className="font-mono text-[9.5px] uppercase tracking-[0.34em] text-ink-ghost">
          Scroll
        </span>
        <span className="relative block h-9 w-px overflow-hidden bg-white/[0.09]">
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-1/2 bg-hero"
            style={{ animation: "drk-scroll-hint 2.6s var(--ease-drk) infinite" }}
          />
        </span>
      </div>
    </section>
  );
}
