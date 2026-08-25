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
 * And it never traps anybody:
 *   - it leaves by itself when the clip ends
 *   - a click, a tap or any key dismisses it immediately
 *   - a hard 3.2s ceiling dismisses it even if the file never plays at all
 *     (blocked autoplay policy, decode failure, cold network)
 *   - `prefers-reduced-motion` never sees it
 *
 * The page behind it stays scrollable and stays readable to assistive tech —
 * the curtain is `aria-hidden`, so a screen reader is already in the hero
 * while the card plays.
 */
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
      setLeaving(true);
      setGone(true);
    }
  }, []);

  /* The ceiling. Whatever happens to the file, the page is never held hostage. */
  useEffect(() => {
    const t = window.setTimeout(dismiss, 3200);
    return () => window.clearTimeout(t);
  }, [dismiss]);

  /* Any key gets past it — a keyboard user never has to find the control. */
  useEffect(() => {
    if (leaving) return;
    const onKey = () => dismiss();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [leaving, dismiss]);

  /* Hold the page still underneath, so the card is not scrolled behind. */
  useEffect(() => {
    if (gone) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [gone]);

  /* Unmount only after the fade, so the last frame is not a jump cut. */
  useEffect(() => {
    if (!leaving) return;
    const t = window.setTimeout(() => setGone(true), 520);
    return () => window.clearTimeout(t);
  }, [leaving]);

  /* Autoplay refusal is an expected outcome, not an error — the ceiling covers
     it, and the clip's own ground is this exact black anyway. */
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
      className="fixed inset-0 z-[200] grid place-items-center bg-obsidian transition-opacity duration-[520ms] ease-[var(--ease-drk)]"
      style={{
        opacity: leaving ? 0 : 1,
        pointerEvents: leaving ? "none" : "auto",
      }}
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
        /* `contain`, not `cover`: the card is 16:9 and a phone is not, and the
           clip's own ground is this black, so it letterboxes invisibly. */
        className="h-full w-full object-contain"
      />

      {/* ---- Boot readout -------------------------------------------------
          Brand language, not telemetry. Driven by CSS rather than a React
          timer: on a cold connection the video is the slow part, and a
          progress bar that stalls is worse than none. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[19%] flex flex-col items-center gap-3.5 px-6 sm:bottom-[22%]">
        <span
          aria-hidden
          className="block h-px w-[min(13rem,42vw)] overflow-hidden"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          <span
            className="drk-boot-fill block h-full w-full origin-left bg-hero"
            style={{
              boxShadow: "0 0 10px 0 rgba(0,255,122,0.7)",
              animationPlayState: leaving ? "paused" : "running",
            }}
          />
        </span>

        {/* One line at a time, in place — a stack of four would read as a log. */}
        <span className="relative block h-3 w-full text-center">
          {curtain.boot.map((line, i) => (
            <span
              key={line}
              className="drk-boot-line absolute inset-x-0 font-mono text-[9px] uppercase tracking-[0.28em] text-ink-faint"
              style={{ animationDelay: `${i * 0.52}s` }}
            >
              {line}
            </span>
          ))}
        </span>
      </div>

      <button
        type="button"
        /* Focusable elements must not live inside an aria-hidden subtree, and
           a keyboard user has the whole keyboard instead. */
        tabIndex={-1}
        onClick={dismiss}
        className="absolute bottom-[clamp(1.25rem,4vh,2.5rem)] right-[clamp(1.25rem,4vw,2.5rem)]
          inline-flex min-h-[34px] items-center rounded-full border px-4 font-mono text-[9.5px]
          uppercase tracking-[0.2em] text-ink-faint transition-colors duration-300
          hover:border-hero/40 hover:text-ink"
        style={{ borderColor: "rgba(255,255,255,0.13)" }}
      >
        {curtain.skip}
      </button>
    </div>
  );
}
