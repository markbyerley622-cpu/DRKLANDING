"use client";

import { useEffect, useRef, useState } from "react";
import { Section, Eyebrow, Reveal, Chip } from "@/components/ui/Primitives";
import { PinnedStage } from "@/components/system/Stage";
import { application } from "@/content/drk";

/**
 * ACT 11 — THE LIVE APPLICATION
 *
 * Real footage, not a mockup. Six recordings of DRK's own production
 * application, the same reel the pitch deck runs. Scroll selects the surface;
 * only the active clip plays.
 *
 * PLAYBACK POLICY
 *   - `preload="none"` + a poster frame: nothing is fetched until a clip is
 *     next up, so the act costs one image until the visitor arrives.
 *   - Exactly one <video> is playing at any moment. Leaving a clip pauses it
 *     and rewinds, so returning to it replays from the top.
 *   - Muted + playsInline + autoplay-on-demand, so mobile browsers allow it.
 *   - A play() rejection is an expected outcome (autoplay policy), not an
 *     error — the poster frame is the fallback and it is a real screenshot.
 *   - Under reduced motion nothing plays; posters stand in.
 */

const CLIPS = application.clips;
const N = CLIPS.length;
/** Each clip owns an equal band between 0.04 and 0.94. */
const band = (i: number) => 0.04 + (i * 0.9) / N;

export function Application() {
  const [active, setActive] = useState(0);

  return (
    <>
      <Section id="application" className="pt-28 sm:pt-36 lg:pt-44">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <Eyebrow>{application.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={100} className="mt-6">
            <h2 className="display max-w-[16ch] text-[clamp(2.1rem,5vw,4.2rem)] text-ink">
              {application.headline}
            </h2>
          </Reveal>
          <Reveal delay={190} className="mt-6 max-w-[560px]">
            <p className="text-[15.5px] leading-[1.65] text-ink-muted sm:text-[16.5px]">
              {application.body}
            </p>
          </Reveal>
        </div>
      </Section>

      <PinnedStage
        length={4}
        compactLength={3}
        phase="Unfiltered"
        className="mt-12 sm:mt-16"
        steps={N}
        onStep={setActive}
      >
        <div className="relative flex h-full w-full items-center justify-center px-4 sm:px-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(52% 48% at 50% 50%, rgba(0,255,122,0.045), transparent 70%)",
              opacity: "calc(0.3 + var(--p) * 0.7)",
              filter: "blur(22px)",
            }}
          />

          <div className="relative w-full max-w-[1120px]">
            {/* ---- Surface rail --------------------------------------- */}
            <div className="scroll-x mb-4 flex items-center justify-start gap-1.5 sm:justify-center sm:gap-2">
              {CLIPS.map((c, i) => (
                <span
                  key={c.key}
                  className="shrink-0 rounded-full px-3 py-[6px] font-mono text-[9.5px] uppercase tracking-[0.15em] sm:text-[10px]"
                  style={{
                    ["--on" as string]: `calc(clamp(0, calc((var(--p) - ${band(i).toFixed(3)}) / 0.02), 1) * clamp(0, calc((${(band(i + 1) + 0.02).toFixed(3)} - var(--p)) / 0.02), 1))`,
                    color:
                      "color-mix(in srgb, var(--color-ink) calc(var(--on) * 100%), var(--color-ink-ghost))",
                    background:
                      "linear-gradient(180deg, rgba(34,37,35,calc(0.85 * var(--on))), rgba(13,17,16,calc(0.9 * var(--on))))",
                    border: "1px solid rgba(0,255,122,calc(0.28 * var(--on)))",
                    boxShadow: "0 0 calc(16px * var(--on)) -7px rgba(0,255,122,0.9)",
                  }}
                >
                  {c.rail}
                </span>
              ))}
            </div>

            {/* ---- The recorded product ------------------------------- */}
            <div
              className="glass metal-rim relative overflow-hidden rounded-[var(--radius-panel)]"
              style={{ boxShadow: "var(--highlight-inset), var(--depth-shadow)" }}
            >
              {/* chrome */}
              <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] px-4 py-3 sm:px-6">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="font-display text-[13px] font-bold tracking-[-0.03em] text-ink">
                    DRK
                  </span>
                  <span aria-hidden className="h-3 w-px shrink-0 bg-white/10" />
                  <span className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-hero">
                    {CLIPS[active].name}
                  </span>
                </div>
                <Chip tone="live">Live</Chip>
              </div>

              {/* The reel. Height-driven rather than aspect-driven: the whole
                  composition — rail, chrome, reel, caption, payoff — has to
                  fit one pinned frame, and an aspect ratio on a 1120px panel
                  overflows it. */}
              <div className="relative h-[clamp(190px,44svh,520px)] w-full bg-obsidian">
                {CLIPS.map((c, i) => (
                  <Clip key={c.key} clipKey={c.key} name={c.name} active={i === active} />
                ))}
              </div>

              {/* caption — restates what the page on screen says about itself */}
              <div className="border-t border-white/[0.06] px-5 py-4 sm:px-7 sm:py-5">
                <p
                  key={CLIPS[active].key}
                  className="max-w-[70ch] text-[13px] leading-[1.6] text-ink-muted sm:text-[14px]"
                  style={{ animation: "drk-rise 560ms var(--ease-drk) both" }}
                >
                  {CLIPS[active].copy}
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-x-5 gap-y-1.5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                    {application.note}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                    {`0${active + 1} / 0${N}`}
                  </span>
                </div>
              </div>
            </div>

            {/* ---- The payoff ----------------------------------------- */}
            <div
              className="band mt-6 flex flex-col items-center gap-2.5"
              style={{
                ["--from" as string]: 0.9,
                ["--to" as string]: 0.99,
                opacity: "var(--lp)",
                transform: "translate3d(0, calc((1 - var(--le)) * 12px), 0)",
              }}
            >
              <p
                className="display text-center text-[clamp(1.25rem,3vw,2.1rem)] text-ink"
                style={{ textShadow: "0 0 40px rgba(0,255,122,0.2)" }}
              >
                Client view — <span className="text-hero">unfiltered</span>.
              </p>
            </div>
          </div>
        </div>
      </PinnedStage>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* One recorded surface                                                       */
/* -------------------------------------------------------------------------- */

function Clip({
  clipKey,
  name,
  active,
}: {
  clipKey: string;
  name: string;
  active: boolean;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  /* Only ever attach a src once the clip has been active — an unvisited act
     costs one poster image, not six videos. */
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (active) setArmed(true);
  }, [active]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (active) {
      // Autoplay refusal is expected on some policies; the poster stands in.
      void v.play().catch(() => {});
    } else {
      v.pause();
      // Rewind so returning to this surface replays it from the top.
      try {
        v.currentTime = 0;
      } catch {
        /* seeking before metadata is harmless to skip */
      }
    }
  }, [active]);

  return (
    <div
      className="absolute inset-0 transition-opacity duration-[600ms] ease-[var(--ease-drk)]"
      style={{ opacity: active ? 1 : 0 }}
      aria-hidden={!active}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption -- silent screen
          recording; the caption beneath states its content in prose. */}
      <video
        ref={ref}
        src={armed ? `/demo/${clipKey}.mp4` : undefined}
        poster={`/demo/${clipKey}.jpg`}
        muted
        loop
        playsInline
        preload="none"
        aria-label={`${name} — recorded in the live DRK application`}
        className="h-full w-full object-cover object-top"
      />
    </div>
  );
}
