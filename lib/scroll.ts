"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * DRK SCROLL ENGINE
 * ===========================================================================
 * One scroll listener. One rAF loop. One read phase, then one write phase.
 *
 * WHY NOT GSAP/ScrollTrigger:
 *   Pinning here is done with `position: sticky` inside a tall spacer. That
 *   means the browser owns the pin — no injected pin-spacing elements, no
 *   transform-based faux-pinning that fights native scrolling, no scroll
 *   hijacking, and cleanup is just React unmounting a node. Resize is handled
 *   by the browser for free. This is both smaller and harder to break.
 *
 * WHY CSS VARIABLES:
 *   Continuous motion must never re-render React. Each stage writes its
 *   progress to `--p` on its own DOM node and components interpolate in CSS.
 *   React state is only touched when a DISCRETE step index changes (a handful
 *   of renders per section instead of ~60/second).
 *
 * Layout thrash is avoided by reading every rect first, then writing every
 * style — never interleaved.
 */

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * pin     — element is a tall spacer with a sticky child; p spans the surplus.
 * through — element travels across the viewport; p spans that traversal.
 * exit    — element starts at the top of the document; p is how far it has
 *           scrolled off the top of the viewport (0 at rest, 1 when gone).
 *           `through` would report ~0.5 at scrollY=0 for such an element.
 */
export type StageMode = "pin" | "through" | "exit";

interface Stage {
  el: HTMLElement;
  mode: StageMode;
  /** Viewport fraction where progress begins (through-mode only). */
  start: number;
  /** Viewport fraction where progress completes (through-mode only). */
  end: number;
  /** Number of discrete steps to emit, if any. */
  steps?: number;
  onStep?: (index: number) => void;
  onProgress?: (p: number) => void;
  /** Extra CSS vars derived from p, written to the same node. */
  derive?: (p: number) => Record<string, string>;
  /* --- engine-owned scratch --- */
  _p: number;
  _step: number;
  _rect?: DOMRect;
}

/* -------------------------------------------------------------------------- */
/* Engine                                                                     */
/* -------------------------------------------------------------------------- */

class ScrollEngine {
  private stages = new Set<Stage>();
  private frame = 0;
  private running = false;
  private reduced = false;
  private vh = 0;
  private listening = false;

  /** Global 0..1 progress through the whole document. */
  private docProgress = 0;
  private docSubscribers = new Set<(p: number) => void>();

  private onScroll = () => {
    if (this.frame || !this.running) return;
    this.frame = requestAnimationFrame(this.tick);
  };

  private onResize = () => {
    this.vh = window.innerHeight || 1;
    this.onScroll();
  };

  private start() {
    if (this.listening) return;
    this.listening = true;
    this.running = true;
    this.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.vh = window.innerHeight || 1;
    window.addEventListener("scroll", this.onScroll, { passive: true });
    window.addEventListener("resize", this.onResize, { passive: true });
    this.tick();
  }

  private stop() {
    if (!this.listening) return;
    this.listening = false;
    this.running = false;
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.onResize);
    if (this.frame) cancelAnimationFrame(this.frame);
    this.frame = 0;
  }

  private tick = () => {
    this.frame = 0;
    const vh = this.vh || window.innerHeight || 1;

    /* ---------- READ PHASE — no style writes in here ---------- */
    for (const s of this.stages) s._rect = s.el.getBoundingClientRect();

    const doc = document.documentElement;
    const maxScroll = doc.scrollHeight - vh;
    const nextDoc = maxScroll > 0 ? clamp(window.scrollY / maxScroll) : 0;

    /* ---------- WRITE PHASE ---------- */
    for (const s of this.stages) {
      const rect = s._rect!;
      let p: number;

      if (this.reduced) {
        // Reduced motion: every stage resolves to its finished state.
        p = 1;
      } else if (s.mode === "pin") {
        // The stage is a tall spacer with a sticky child. Progress is how far
        // we have travelled through the spacer's surplus height.
        const travel = rect.height - vh;
        p = travel > 0 ? clamp(-rect.top / travel) : rect.top <= 0 ? 1 : 0;
      } else if (s.mode === "exit") {
        // Rests at 0 while the element's top is level with the viewport top,
        // reaching 1 once it has scrolled entirely past. `through` would
        // report ~0.5 at scrollY=0 for a document-topping element.
        p = rect.height > 0 ? clamp(-rect.top / rect.height) : 0;
      } else {
        const from = vh * s.start;
        const to = vh * s.end - rect.height;
        const span = from - to || 1;
        p = clamp((from - rect.top) / span);
      }

      if (p !== s._p) {
        s._p = p;
        s.el.style.setProperty("--p", p.toFixed(4));
        if (s.derive) {
          const vars = s.derive(p);
          for (const k in vars) s.el.style.setProperty(k, vars[k]);
        }
        s.onProgress?.(p);
      }

      // Discrete step — the only thing allowed to touch React state.
      if (s.steps && s.onStep) {
        const idx = Math.min(s.steps - 1, Math.floor(p * s.steps));
        if (idx !== s._step) {
          s._step = idx;
          s.el.style.setProperty("--step", String(idx));
          s.onStep(idx);
        }
      }
    }

    if (nextDoc !== this.docProgress) {
      this.docProgress = nextDoc;
      for (const fn of this.docSubscribers) fn(nextDoc);
    }
  };

  register(stage: Stage) {
    this.stages.add(stage);
    this.start();
    // Prime immediately so first paint is never a blank frame.
    this.onScroll();
    return () => {
      this.stages.delete(stage);
      if (!this.stages.size && !this.docSubscribers.size) this.stop();
    };
  }

  subscribeDoc(fn: (p: number) => void) {
    this.docSubscribers.add(fn);
    this.start();
    this.onScroll();
    return () => {
      this.docSubscribers.delete(fn);
      if (!this.stages.size && !this.docSubscribers.size) this.stop();
    };
  }

  isReduced() {
    return this.reduced;
  }
}

let engine: ScrollEngine | null = null;
function getEngine() {
  if (!engine) engine = new ScrollEngine();
  return engine;
}

/* -------------------------------------------------------------------------- */
/* Math helpers (shared with components)                                      */
/* -------------------------------------------------------------------------- */

export const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

/** Maps `p` from [a,b] onto [0,1], clamped. */
export const range = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

/** Smootherstep — nothing scroll-linked should ease linearly. */
export const smooth = (t: number) => {
  const x = clamp(t);
  return x * x * x * (x * (x * 6 - 15) + 10);
};

export const lerp = (a: number, b: number, t: number) => a + (b - a) * clamp(t);

/* -------------------------------------------------------------------------- */
/* useStage — attach a scroll stage to an element                             */
/* -------------------------------------------------------------------------- */

export function useStage<T extends HTMLElement>(options: {
  mode?: StageMode;
  start?: number;
  end?: number;
  /** Emit a discrete index 0..steps-1 as progress crosses each band. */
  steps?: number;
  onStep?: (index: number) => void;
  onProgress?: (p: number) => void;
  derive?: (p: number) => Record<string, string>;
}) {
  const {
    mode = "through",
    start = 0.9,
    end = 0.2,
    steps,
    onStep,
    onProgress,
    derive,
  } = options;

  const ref = useRef<T | null>(null);
  // Keep callbacks in refs so the stage never re-registers on re-render.
  const cbs = useRef({ onStep, onProgress, derive });
  cbs.current = { onStep, onProgress, derive };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return getEngine().register({
      el,
      mode,
      start,
      end,
      steps,
      onStep: (i) => cbs.current.onStep?.(i),
      onProgress: (p) => cbs.current.onProgress?.(p),
      derive: (p) => cbs.current.derive?.(p) ?? {},
      _p: -1,
      _step: -1,
    });
  }, [mode, start, end, steps]);

  return ref;
}

/**
 * Discrete step index for a stage, without re-rendering on every frame.
 * Returns [ref, index].
 */
export function useStageSteps<T extends HTMLElement>(
  steps: number,
  options?: { mode?: StageMode; start?: number; end?: number },
) {
  const [index, setIndex] = useState(0);
  const ref = useStage<T>({
    mode: options?.mode ?? "pin",
    start: options?.start,
    end: options?.end,
    steps,
    onStep: setIndex,
  });
  return [ref, index] as const;
}

/* -------------------------------------------------------------------------- */
/* Document-level progress (for the persistent system telemetry)              */
/* -------------------------------------------------------------------------- */

export function useDocProgress(onChange: (p: number) => void) {
  const cb = useRef(onChange);
  cb.current = onChange;
  useEffect(() => getEngine().subscribeDoc((p) => cb.current(p)), []);
}

/* -------------------------------------------------------------------------- */
/* Environment                                                                */
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

/** Coarse pointer or small viewport — the trigger for the simplified system. */
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

export function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}

/* -------------------------------------------------------------------------- */
/* Pointer parallax — rAF-driven, writes CSS vars, never sets state           */
/* -------------------------------------------------------------------------- */

export function usePointerVars<T extends HTMLElement>(strength = 1) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches
    ) {
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
      return;
    }

    let frame = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let idle = 0;

    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      el.style.setProperty("--mx", cx.toFixed(4));
      el.style.setProperty("--my", cy.toFixed(4));
      // Park the loop once it has settled; the next pointer move restarts it.
      if (Math.abs(tx - cx) < 0.0008 && Math.abs(ty - cy) < 0.0008) {
        if (++idle > 12) {
          frame = 0;
          return;
        }
      } else idle = 0;
      frame = requestAnimationFrame(tick);
    };

    const wake = () => {
      idle = 0;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2 * strength;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2 * strength;
      wake();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      wake();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });
    wake();

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [strength]);

  return ref;
}

/* -------------------------------------------------------------------------- */
/* Entrance reveal — one shared observer, unchanged in spirit from v1         */
/* -------------------------------------------------------------------------- */

let revealObs: IntersectionObserver | null = null;
function getRevealObserver() {
  if (revealObs) return revealObs;
  revealObs = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        el.dataset.shown = "true";
        revealObs?.unobserve(el);
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
  );
  return revealObs;
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.shown = "true";
      return;
    }
    const obs = getRevealObserver();
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);
  return ref;
}

/** Callback ref that also exposes the node. */
export function useNode<T extends HTMLElement>() {
  const [node, setNode] = useState<T | null>(null);
  const ref = useCallback((n: T | null) => setNode(n), []);
  return [ref, node] as const;
}
