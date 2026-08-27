"use client";

import { useEffect, useState } from "react";
import { LiquidField } from "@/components/system/LiquidField";
import { Button } from "@/components/ui/Button";
import { useIsCompact, useStage } from "@/lib/scroll";
import { hero } from "@/content/drk";

/**
 * THE HERO — the board, built.
 *
 * Two words, two lines, one door. Everything else on this screen is the
 * liquid: the field runs full-bleed and is masked off the type column, so
 * the headline sits on true black while the chrome flows behind it.
 *
 * Entrance: the field surfaces out of the ground first and the type arrives
 * over it — the system is already running when you get here.
 * Exit: the field sinks and the type recedes, handing off down the page.
 */
/* Module-level so the identity is stable across renders — the field rebuilds
   its GL context when its framing changes. */
const WIDE_FOCUS: [number, number] = [0.54, 0.5];
const COMPACT_FOCUS: [number, number] = [0.6, 0.64];

export function Hero() {
  const [t, setT] = useState(0);
  const compact = useIsCompact();
  const exitRef = useStage<HTMLDivElement>({ mode: "exit" });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setT(9);
      return;
    }
    const marks = [40, 420, 700, 900, 1120];
    const ids = marks.map((ms, i) => window.setTimeout(() => setT(i + 1), ms));
    return () => ids.forEach(clearTimeout);
  }, []);

  const enter = (step: number, y = 22, dur = 1.1): React.CSSProperties => ({
    opacity: t >= step ? 1 : 0,
    transform: t >= step ? "translate3d(0,0,0)" : `translate3d(0,${y}px,0)`,
    transition: `opacity ${dur}s var(--ease-drk), transform ${dur * 1.15}s var(--ease-drk)`,
  });

  return (
    <section
      id="top"
      ref={exitRef}
      className="relative flex min-h-[100svh] w-full items-start overflow-hidden
        pt-[calc(var(--nav-h)+8vh)] sm:items-center sm:pt-[var(--nav-h)]"
      style={{ ["--p" as string]: 0 }}
    >
      {/* ---- The liquid ---------------------------------------------------- */}
      <div
        className="absolute inset-0"
        style={{
          opacity: t >= 1 ? 1 : 0,
          transition: "opacity 2.4s var(--ease-drk)",
        }}
      >
        <LiquidField
          level={1}
          turbulence={1}
          zoom={compact ? 1.22 : 1.04}
          edge={compact ? "surface" : "hero"}
          /* A tall frame crops hard: aim it at the crest, not the silver. */
          focus={compact ? COMPACT_FOCUS : WIDE_FOCUS}
        />
      </div>

      {/* Ground the type. Wide, that is a column on the left; compact, there
          is no room for a column, so the type takes the top of the frame and
          the liquid takes the bottom. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: compact
            ? "linear-gradient(174deg, var(--color-obsidian) 0%, rgba(8,13,12,0.92) 34%, rgba(8,13,12,0.5) 54%, transparent 72%)"
            : "linear-gradient(92deg, var(--color-obsidian) 0%, rgba(8,13,12,0.86) 26%, rgba(8,13,12,0.3) 46%, transparent 62%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44"
        style={{
          background: "linear-gradient(180deg, transparent, var(--color-obsidian))",
        }}
      />

      {/* ---- Content -------------------------------------------------------- */}
      <div
        className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pb-24 sm:px-8 lg:px-12"
        style={{
          transform: "translate3d(0, calc(var(--p) * -6vh), 0)",
          opacity: "calc(1 - clamp(0, calc((var(--p) - 0.3) / 0.5), 1))",
        }}
      >
        <h1
          className="display max-w-[12ch] text-[clamp(2.9rem,8.2vw,6.2rem)] text-ink"
          style={{ letterSpacing: "-0.045em" }}
        >
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="block" style={enter(2, 52, 1.25)}>
              {hero.headline}
              <span aria-hidden className="text-ink">
                .
              </span>
            </span>
          </span>
        </h1>

        <p
          className="mt-7 max-w-[46ch] text-[15.5px] leading-[1.65] text-ink-muted sm:text-[17px]"
          style={enter(3, 20)}
        >
          {/* The board breaks this in two. That break is a composition for the
              wide layout — compact reflows it rather than wrapping a forced
              line and leaving an orphan. */}
          {hero.body.map((line, i) => (
            <span key={line} className="sm:block">
              {i > 0 && <span className="sm:hidden"> </span>}
              {line}
            </span>
          ))}
        </p>

        <div className="mt-11" style={enter(4, 18)}>
          <Button href={hero.cta.href} size="lg" variant="primary" spread>
            {hero.cta.label}
          </Button>
        </div>
      </div>

      {/* ---- Scroll cue ------------------------------------------------------ */}
      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
        style={{ ...enter(5, 10), opacity: t >= 5 ? "calc(1 - var(--p) * 3)" : 0 }}
      >
        <span className="relative block h-10 w-px overflow-hidden bg-white/[0.09]">
          <span
            className="absolute inset-x-0 top-0 h-1/2 bg-hero"
            style={{ animation: "drk-scroll-hint 2.6s var(--ease-drk) infinite" }}
          />
        </span>
      </div>
    </section>
  );
}
