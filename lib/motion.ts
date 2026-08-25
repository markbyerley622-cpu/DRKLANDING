"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* -------------------------------------------------------------------------- */
/* Reduced motion                                                              */
/* -------------------------------------------------------------------------- */

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return reduced;
}

/* -------------------------------------------------------------------------- */
/* Coarse pointer / small viewport — used to shed motion on mobile             */
/* -------------------------------------------------------------------------- */

export function useIsCompact(): boolean {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px), (pointer: coarse)");
    const apply = () => setCompact(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return compact;
}

/* -------------------------------------------------------------------------- */
/* Reveal — one shared IntersectionObserver for the whole document             */
/* -------------------------------------------------------------------------- */

let sharedObserver: IntersectionObserver | null = null;
const settleTimers = new WeakMap<Element, number>();

function getObserver(): IntersectionObserver {
  if (sharedObserver) return sharedObserver;

  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.dataset.shown = "true";
        sharedObserver?.unobserve(el);

        // Drop `will-change` once the transition has finished so the
        // compositor isn't holding dozens of promoted layers.
        const delay = Number.parseFloat(el.style.getPropertyValue("--reveal-d")) || 0;
        const t = window.setTimeout(() => {
          el.dataset.settled = "true";
        }, delay + 1400);
        settleTimers.set(el, t);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
  );

  return sharedObserver;
}

/**
 * Registers an element with the shared reveal observer.
 * Pair with the `data-reveal` attribute + `--reveal-d` delay in CSS.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.shown = "true";
      el.dataset.settled = "true";
      return;
    }

    const obs = getObserver();
    obs.observe(el);

    return () => {
      obs.unobserve(el);
      const t = settleTimers.get(el);
      if (t) window.clearTimeout(t);
    };
  }, []);

  return ref;
}

/* -------------------------------------------------------------------------- */
/* Scroll progress through an element (0 → 1), rAF-throttled                   */
/* -------------------------------------------------------------------------- */

export function useScrollProgress<T extends HTMLElement>(options?: {
  /** Fraction of viewport height at which progress starts. Default 0.9 */
  start?: number;
  /** Fraction of viewport height at which progress completes. Default 0.15 */
  end?: number;
}) {
  const { start = 0.9, end = 0.15 } = options ?? {};
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let active = true;

    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const from = vh * start;
      const to = vh * end - rect.height;
      const span = from - to || 1;
      const raw = (from - rect.top) / span;
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    const onScroll = () => {
      if (frame || !active) return;
      frame = requestAnimationFrame(measure);
    };

    // Only track while the element is anywhere near the viewport.
    const gate = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) measure();
      },
      { rootMargin: "40% 0px 40% 0px" },
    );
    gate.observe(el);

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      gate.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [start, end]);

  return { ref, progress };
}

/* -------------------------------------------------------------------------- */
/* Pointer parallax — normalised -1..1 around an element's centre              */
/* -------------------------------------------------------------------------- */

export function usePointerParallax<T extends HTMLElement>(strength = 1) {
  const ref = useRef<T | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;
    let current = { x: 0, y: 0 };

    const tick = () => {
      // Critically-damped-ish easing toward the pointer: never snaps.
      current = {
        x: current.x + (target.current.x - current.x) * 0.06,
        y: current.y + (target.current.y - current.y) * 0.06,
      };
      setOffset({ x: current.x, y: current.y });
      frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      target.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2 * strength,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2 * strength,
      };
    };

    const onLeave = () => {
      target.current = { x: 0, y: 0 };
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [strength]);

  return { ref, offset };
}

/* -------------------------------------------------------------------------- */
/* Step sequencer — advances an index once the element is in view              */
/* -------------------------------------------------------------------------- */

export function useSequence<T extends HTMLElement>(steps: number, intervalMs = 1600) {
  const ref = useRef<T | null>(null);
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting),
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIndex(steps - 1);
      return;
    }
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % steps);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [running, steps, intervalMs]);

  return { ref, index, running };
}

/* -------------------------------------------------------------------------- */
/* Small helper: build the inline style for a staggered reveal                 */
/* -------------------------------------------------------------------------- */

export function stagger(
  index: number,
  step = 90,
  base = 0,
): React.CSSProperties {
  return { ["--reveal-d" as string]: `${base + index * step}ms` };
}

/* -------------------------------------------------------------------------- */
/* Interpolation helpers                                                       */
/* -------------------------------------------------------------------------- */

export const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

/** Maps `p` from [a,b] onto [0,1], clamped. */
export const range = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

/** Smootherstep — used for scroll-linked values so nothing eases linearly. */
export const smooth = (t: number) => {
  const x = clamp(t);
  return x * x * x * (x * (x * 6 - 15) + 10);
};

export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/** Stable callback ref that also exposes the node in state. */
export function useNode<T extends HTMLElement>() {
  const [node, setNode] = useState<T | null>(null);
  const ref = useCallback((n: T | null) => setNode(n), []);
  return [ref, node] as const;
}
