"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { curtain } from "@/content/drk";

/**
 * THE OPENING CURTAIN
 * ---------------------------------------------------------------------------
 * DRK's own title card, over the page as it loads. Same clip the pitch deck
 * opens with, so both properties introduce themselves identically.
 *
 * It is rendered in the SERVER HTML rather than mounted by an effect, so the
 * first painted frame is already the card. A curtain that appears a moment
 * after the page has is not a curtain, it is an interruption.
 *
 * IT IS DELIBERATELY BRIEF — about 1.1s, start to gone. The clip runs 2s, but
 * a title card is not a video the reader came to watch; it is a beat before
 * the page. So the curtain leaves mid-clip, while the mark is on screen and
 * before anyone has begun waiting for it. Landing on the site should feel
 * like the page fading up, not like sitting through an intro.
 *
 * THE BEAT IS OWNED BY CSS (`.drk-curtain` in globals.css), not by a timer
 * here. A JS timer starts at hydration, and on a cold load hydration is the
 * slow part — the same card that left after ~1.1s warm sat for over three
 * seconds cold. The animation is in the server HTML, so it starts at first
 * paint and the beat is identical on any connection. This component only
 * unmounts the card afterwards and handles early dismissal.
 *
 * The exit is opacity alone. Scale and blur on the way out read as an effect;
 * a straight crossfade into the hero reads as the same black simply becoming
 * the page — and the hero's own liquid is already surfacing underneath, so
 * there is something to arrive at rather than a cut.
 *
 * It never traps anybody:
 *   - it leaves by itself on the CSS beat, or when the clip ends
 *   - a click, a tap or any key dismisses it immediately
 *   - the animation's end state is `pointer-events: none`, so a curtain whose
 *     JS never arrives still cannot cover the page
 *   - `prefers-reduced-motion` never sees it
 *
 * The page behind it stays readable to assistive tech — the curtain is
 * `aria-hidden`, so a screen reader is already in the hero while it plays.
 */

/** The CSS beat, mirrored here so unmount can track it. Keep in sync with
 *  `.drk-curtain` in globals.css: 700ms delay + 400ms fade. */
const BEAT_MS = 1100;
/** Early dismissal (click / key / clip end) crossfades faster than the beat. */
const DISMISS_MS = 260;

/**
 * How far into the CSS beat we are. The beat is measured from first paint,
 * because that is when the animation in the server HTML actually started —
 * mount time would be the wrong origin, and by exactly the amount that
 * hydration was slow.
 */
function beatElapsed() {
  const paint = performance
    .getEntriesByType("paint")
    .find((e) => e.name === "first-contentful-paint");
  return paint ? performance.now() - paint.startTime : 0;
}

export function IntroCurtain() {
  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const dismiss = useCallback(() => setLeaving(true), []);

  useEffect(() => setMounted(true), []);

  /* Reduced motion: no card at all. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGone(true);
    }
  }, []);

  /* Any key gets past it — a keyboard user never has to find a control. */
  useEffect(() => {
    if (leaving) return;
    const onKey = () => dismiss();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [leaving, dismiss]);

  /**
   * Hold the page still underneath, so the card is not scrolled behind.
   *
   * Guarded on the beat: this effect runs at hydration, and if hydration lost
   * a race with a slow connection the curtain has already faded by the time
   * we get here. Locking scroll *after* the card is visually gone is a hiccup
   * the reader feels and cannot explain, which is worse than not locking at
   * all — and there is nothing left to protect by then anyway.
   */
  useEffect(() => {
    if (gone || beatElapsed() >= BEAT_MS) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [gone]);

  /* Early dismissal unmounts after its own shorter fade. */
  useEffect(() => {
    if (!leaving) return;
    const t = window.setTimeout(() => setGone(true), DISMISS_MS);
    return () => window.clearTimeout(t);
  }, [leaving]);

  /**
   * Unmount on the SAME clock the CSS beat runs on — measured from first
   * paint, not from here.
   *
   * `animationend` alone is not enough: React attaches that listener during
   * hydration, and on a cold load hydration lands after the animation has
   * already finished, so the event is simply missed and the card sits in the
   * tree. That is not merely untidy — the scroll lock below is released on
   * unmount, so the reader was left unable to scroll for seconds after the
   * curtain had visually gone.
   *
   * Reading first paint and subtracting tells us how much of the beat is
   * left. Hydrate late enough and the answer is zero, which is correct.
   */
  useEffect(() => {
    const remaining = Math.max(0, BEAT_MS - beatElapsed());
    const t = window.setTimeout(() => setGone(true), remaining);
    return () => window.clearTimeout(t);
  }, []);

  /* Autoplay refusal is an expected outcome, not an error — the CSS beat runs
     regardless, and the clip's own ground is this exact black anyway. */
  useEffect(() => {
    if (!mounted) return;
    void videoRef.current?.play().catch(() => {});
  }, [mounted]);

  if (gone) return null;

  return (
    <div
      aria-hidden
      data-drk-curtain=""
      onClick={dismiss}
      /* Animation events BUBBLE: the video's own 340ms fade-in would other-
         wise unmount the curtain a third of a second in. Only this element's
         own exit counts. */
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget && e.animationName === "drk-curtain-out") {
          setGone(true);
        }
      }}
      className="drk-curtain fixed inset-0 z-[200] grid place-items-center bg-obsidian"
      style={
        leaving
          ? {
              // Take the beat off it and run the shorter fade from wherever
              // the animation had got to.
              animation: "none",
              opacity: 0,
              pointerEvents: "none",
              transition: `opacity ${DISMISS_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            }
          : undefined
      }
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption -- silent brand
          title card; the wordmark is duplicated as text in the nav beneath. */}
      <video
        ref={videoRef}
        src={curtain.src}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={dismiss}
        /* `contain`, not `cover`: the card is 16:9 and a phone is not, and
           the clip's own ground is this black, so it letterboxes invisibly. */
        className="drk-curtain-mark h-full w-full object-contain"
      />
    </div>
  );
}
