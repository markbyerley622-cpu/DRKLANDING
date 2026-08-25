"use client";

import { useEffect, useState } from "react";
import { LiquidityField } from "./LiquidityField";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Primitives";
import { usePointerVars, useIsCompact, useStage } from "@/lib/scroll";
import { hero, brand } from "@/content/drk";

const RUNTIME = ["Wallets", "Liquidity", "Execution", "Reporting"] as const;

/**
 * ACT 01 — SYSTEM ACTIVATION
 *
 * Load:   almost nothing is on. The mark resolves, the eyebrow arrives, the
 *         headline staggers in, then the four runtime capabilities light in
 *         sequence and the connectors between them draw — they behave as a
 *         connected chain, not four fading labels.
 * Scroll: the whole composition sinks and dims as the field descends beneath
 *         the page, handing off into the black box of Act 02.
 */
export function Hero() {
  const [t, setT] = useState(0);
  const compact = useIsCompact();
  const pointerRef = usePointerVars<HTMLDivElement>(1);
  // Exit choreography: --p is 0 at rest and 1 once the hero has scrolled away.
  const exitRef = useStage<HTMLDivElement>({ mode: "exit" });

  /* Boot sequence: a small counter the entrance keys off. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setT(99);
      return;
    }
    const marks = [60, 260, 420, 620, 900, 1150, 1400, 1700];
    const ids = marks.map((ms, i) => window.setTimeout(() => setT(i + 1), ms));
    return () => ids.forEach(clearTimeout);
  }, []);

  const enter = (step: number, y = 26, dur = 1.1): React.CSSProperties => ({
    opacity: t >= step ? 1 : 0,
    transform: t >= step ? "translate3d(0,0,0)" : `translate3d(0,${y}px,0)`,
    transition: `opacity ${dur}s var(--ease-drk), transform ${dur * 1.2}s var(--ease-drk)`,
  });

  const fieldMask = compact
    ? "radial-gradient(105% 58% at 88% 82%, black 0%, rgba(0,0,0,0.55) 45%, transparent 78%)"
    : "linear-gradient(96deg, transparent 4%, rgba(0,0,0,0.25) 28%, black 58%), radial-gradient(120% 110% at 72% 55%, black 30%, transparent 88%)";

  return (
    <section
      id="top"
      data-phase="Activating"
      ref={exitRef}
      className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden pt-[var(--nav-h)]"
      style={{ ["--p" as string]: 0 }}
    >
      {/* ---- Atmosphere ---------------------------------------------------- */}
      <div ref={pointerRef} aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 78% 42%, rgba(21,23,22,0.9) 0%, rgba(8,13,12,1) 62%)",
          }}
        />

        <div
          className="grid-field absolute inset-0"
          style={{
            opacity: `calc(0.6 * (1 - var(--p)))`,
            maskImage: "radial-gradient(90% 70% at 50% 45%, black 0%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(90% 70% at 50% 45%, black 0%, transparent 78%)",
          }}
        />

        {/* The field descends beneath the page as the hero exits. */}
        <div
          className="absolute inset-0"
          style={{
            ...enter(1, 0, 2.2),
            maskImage: fieldMask,
            WebkitMaskImage: fieldMask,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        >
          <div
            className="h-full w-full"
            style={{
              transform:
                "translate3d(calc(var(--mx,0) * 10px), calc(var(--p) * 14vh + var(--my,0) * 8px), 0) scale(calc(1 + var(--p) * 0.08))",
              opacity: `calc(1 - var(--p) * 0.75)`,
            }}
          >
            <LiquidityField intensity={compact ? 0.55 : 0.8} />
          </div>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 h-1/2"
          style={{
            background:
              "radial-gradient(60% 100% at 62% 100%, rgba(0,255,122,0.08), transparent 70%)",
            opacity: `calc(1 - var(--p))`,
          }}
        />

        {/* Smoked glass plate — structure over atmosphere */}
        <div
          className="absolute right-[-8%] top-[8%] hidden h-[78%] w-[46%] rounded-[40px] lg:block"
          style={{
            background:
              "linear-gradient(150deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.005) 40%, transparent 70%)",
            border: "1px solid rgba(255,255,255,0.05)",
            transform:
              "rotate(8deg) translate3d(calc(var(--mx,0) * -10px), calc(var(--my,0) * -8px + var(--p) * 8vh), 0)",
            opacity: `calc(1 - var(--p) * 0.9)`,
          }}
        />

        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-obsidian" />
      </div>

      {/* ---- Content -------------------------------------------------------- */}
      <div
        className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pb-20 pt-14 sm:px-8 lg:px-12"
        style={{
          // Content recedes into the system as the act closes.
          transform: "translate3d(0, calc(var(--p) * -7vh), 0)",
          opacity: `calc(1 - clamp(0, calc((var(--p) - 0.35) / 0.5), 1))`,
        }}
      >
        <div style={enter(1, 14)}>
          <Chip tone="live">Runtime operational</Chip>
        </div>

        <p className="eyebrow mt-7 max-w-[420px]" style={enter(2, 18)}>
          {hero.eyebrow}
        </p>

        <h1 className="display mt-8 max-w-[15ch] text-[clamp(2.35rem,6.6vw,5.9rem)] text-ink">
          {hero.headline.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <span className="block" style={enter(3 + i, 46, 1.15)}>
                {i === hero.emphasisIndex ? (
                  <>
                    <span>into </span>
                    <span
                      className="text-tint"
                      style={{
                        textShadow: `0 0 46px rgba(0,255,122,${t >= 4 ? 0.3 : 0})`,
                        transition: "text-shadow 1.6s var(--ease-drk) 0.3s",
                      }}
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

        <div className="mt-9 max-w-[520px]" style={enter(6, 22)}>
          <p className="text-[16.5px] leading-[1.6] text-ink-muted sm:text-[18px]">
            {hero.body}
          </p>
          <p className="mt-4 font-display text-[17px] font-semibold tracking-[-0.015em] text-ink sm:text-[19px]">
            {hero.statement}
          </p>
        </div>

        {/* ---- Runtime chain: connected nodes, not four fades -------------- */}
        <div className="mt-10" style={enter(7, 16)}>
          <RuntimeChain lit={t} />
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5" style={enter(7, 20)}>
          <Button href={hero.ctaPrimary.href} size="lg" variant="primary">
            {hero.ctaPrimary.label}
          </Button>
          <Button href={hero.ctaSecondary.href} variant="ghost">
            {hero.ctaSecondary.label}
          </Button>
        </div>

        {/* The surface line sits right-aligned only — the left edge belongs to
            the fixed system readout, which would otherwise collide with it. */}
        <div
          className="mt-12 hidden justify-end border-t border-white/[0.06] pt-6 lg:flex"
          style={enter(8, 16)}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-faint">
            {brand.surfaceLine}
          </span>
        </div>
      </div>

      {/* ---- Scroll indicator ------------------------------------------------ */}
      <div
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
        style={{ ...enter(8, 12), opacity: t >= 8 ? "calc(1 - var(--p) * 3)" : 0 }}
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

/* -------------------------------------------------------------------------- */
/* The four runtime capabilities, wired in series                             */
/* -------------------------------------------------------------------------- */

function RuntimeChain({ lit }: { lit: number }) {
  return (
    <div className="flex flex-wrap items-center gap-y-3">
      {RUNTIME.map((label, i) => {
        // Each node lights a beat after the previous one.
        const on = lit >= 7 || lit >= 99;
        const delay = 120 + i * 190;
        return (
          <div key={label} className="flex items-center">
            <span
              className="relative inline-flex items-center gap-2 rounded-[9px] px-2.5 py-[7px] sm:px-3"
              style={{
                background: on
                  ? "linear-gradient(180deg, rgba(34,37,35,0.8), rgba(10,15,14,0.92))"
                  : "rgba(13,17,16,0.5)",
                border: `1px solid ${on ? "rgba(0,255,122,0.26)" : "rgba(255,255,255,0.06)"}`,
                boxShadow: on
                  ? "inset 0 1px 0 rgba(255,255,255,0.09), 0 0 22px -11px rgba(0,255,122,0.95)"
                  : "none",
                transition: `all 900ms var(--ease-drk) ${delay}ms`,
              }}
            >
              <span
                aria-hidden
                className="h-[4px] w-[4px] rounded-full"
                style={{
                  background: on ? "var(--color-hero)" : "#232826",
                  boxShadow: on ? "0 0 8px rgba(0,255,122,0.8)" : "none",
                  transition: `all 900ms var(--ease-drk) ${delay}ms`,
                }}
              />
              <span
                className="whitespace-nowrap font-mono text-[10px] tracking-[0.1em] sm:text-[11px]"
                style={{
                  color: on ? "var(--color-ink)" : "var(--color-ink-ghost)",
                  transition: `color 900ms var(--ease-drk) ${delay}ms`,
                }}
              >
                {label}
              </span>
            </span>

            {i < RUNTIME.length - 1 && (
              /* Connector: fills left→right, so the chain reads as wired */
              <span
                aria-hidden
                className="relative mx-1.5 block h-px w-5 sm:mx-2 sm:w-7"
                style={{ background: "rgba(255,255,255,0.09)" }}
              >
                <span
                  className="absolute inset-y-0 left-0 block origin-left"
                  style={{
                    width: "100%",
                    transform: `scaleX(${on ? 1 : 0})`,
                    background: "var(--color-hero)",
                    boxShadow: "0 0 7px rgba(0,255,122,0.7)",
                    transition: `transform 620ms var(--ease-drk) ${delay + 150}ms`,
                  }}
                />
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
