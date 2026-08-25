"use client";

import { useEffect, useRef } from "react";

/**
 * LIQUIDITY FIELD
 * ---------------------------------------------------------------------------
 * The hero's atmospheric visual: layered translucent routes sweeping through
 * dark space, with execution pulses travelling along them. Canvas 2D — no
 * WebGL, no dependency, ~1.5kb of state.
 *
 * Performance contract:
 *   - device pixel ratio capped at 2
 *   - rAF paused entirely when the canvas leaves the viewport
 *   - route + pulse counts reduced on compact viewports
 *   - `prefers-reduced-motion` renders a single static frame and stops
 */

interface Route {
  /** Control points in normalised 0..1 space. */
  p0: [number, number];
  p1: [number, number];
  p2: [number, number];
  p3: [number, number];
  width: number;
  /** 0 = silver structural line, 1 = full hero green */
  green: number;
  alpha: number;
  /** Vertical drift amplitude + phase, keeps the field breathing. */
  amp: number;
  phase: number;
}

interface Pulse {
  route: number;
  t: number;
  speed: number;
  len: number;
  size: number;
}

/**
 * A bundle of routes sweeping out of the lower-left dark and converging toward
 * a shallow waist on the right before separating again. Curvature, weight and
 * green content are all varied so the field reads as depth rather than as a
 * set of parallel arcs.
 */
const ROUTES: Route[] = [
  // The hero filament — the one bright, confident path through the field.
  { p0: [-0.2, 1.06], p1: [0.32, 1.0], p2: [0.58, 0.44], p3: [1.2, 0.3], width: 1.5, green: 1, alpha: 0.9, amp: 0.01, phase: 0 },
  // Close companions, tighter radius, dimmer.
  { p0: [-0.2, 0.92], p1: [0.4, 0.9], p2: [0.66, 0.5], p3: [1.2, 0.42], width: 1.0, green: 0.8, alpha: 0.42, amp: 0.014, phase: 1.15 },
  { p0: [-0.2, 1.22], p1: [0.26, 1.1], p2: [0.54, 0.34], p3: [1.2, 0.16], width: 0.9, green: 0.55, alpha: 0.32, amp: 0.018, phase: 2.35 },
  // Structural silver lines — geometry, not energy.
  { p0: [-0.2, 0.7], p1: [0.5, 0.78], p2: [0.74, 0.56], p3: [1.2, 0.52], width: 0.7, green: 0.06, alpha: 0.2, amp: 0.008, phase: 3.4 },
  { p0: [-0.2, 1.4], p1: [0.2, 1.16], p2: [0.5, 0.22], p3: [1.2, 0.0], width: 0.7, green: 0.12, alpha: 0.16, amp: 0.02, phase: 4.2 },
  // A deep, almost-flat route far beneath the others.
  { p0: [-0.2, 0.52], p1: [0.56, 0.66], p2: [0.82, 0.62], p3: [1.2, 0.64], width: 0.6, green: 0.3, alpha: 0.13, amp: 0.006, phase: 5.1 },
];

function bezier(
  t: number,
  a: number,
  b: number,
  c: number,
  d: number,
): number {
  const mt = 1 - t;
  return mt * mt * mt * a + 3 * mt * mt * t * b + 3 * mt * t * t * c + t * t * t * d;
}

export function LiquidityField({
  className = "",
  intensity = 1,
  pointer,
}: {
  className?: string;
  intensity?: number;
  pointer?: { x: number; y: number };
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  // Keep pointer in a ref so pointer movement never re-runs the rAF effect.
  pointerRef.current = pointer ?? { x: 0, y: 0 };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 900px), (pointer: coarse)").matches;

    const routes = compact ? ROUTES.slice(0, 4) : ROUTES;
    const pulseCount = compact ? 7 : 16;

    const pulses: Pulse[] = Array.from({ length: pulseCount }, (_, i) => ({
      route: i % routes.length,
      t: (i * 0.137) % 1,
      speed: 0.00021 + ((i * 37) % 11) * 0.000035,
      len: 0.1 + ((i * 17) % 7) * 0.022,
      size: 1.1 + ((i * 13) % 5) * 0.35,
    }));

    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const greenAt = (g: number, a: number) => {
      // Blend silver → hero green. Never fully saturated: this is atmosphere.
      const r = Math.round(190 * (1 - g) + 0 * g);
      const gg = Math.round(205 * (1 - g) + 255 * g);
      const b = Math.round(200 * (1 - g) + 122 * g);
      return `rgba(${r},${gg},${b},${a})`;
    };

    const drawRoute = (route: Route, time: number, px: number, py: number) => {
      const drift = Math.sin(time * 0.0004 + route.phase) * route.amp;
      // Pointer parallax: deeper (greener) routes move slightly more.
      const shiftX = px * 0.014 * (0.4 + route.green);
      const shiftY = py * 0.01 * (0.4 + route.green) + drift;

      const X = (n: number) => (n + shiftX) * w;
      const Y = (n: number) => (n + shiftY) * h;

      ctx.beginPath();
      ctx.moveTo(X(route.p0[0]), Y(route.p0[1]));
      ctx.bezierCurveTo(
        X(route.p1[0]), Y(route.p1[1]),
        X(route.p2[0]), Y(route.p2[1]),
        X(route.p3[0]), Y(route.p3[1]),
      );

      // Bloom pass — wide, soft, low alpha.
      if (route.green > 0.2) {
        ctx.strokeStyle = greenAt(route.green, route.alpha * 0.1 * intensity);
        ctx.lineWidth = route.width * 14;
        ctx.stroke();
        ctx.strokeStyle = greenAt(route.green, route.alpha * 0.16 * intensity);
        ctx.lineWidth = route.width * 5;
        ctx.stroke();
      }

      // Core pass — the crisp filament.
      ctx.strokeStyle = greenAt(route.green, route.alpha * 0.85 * intensity);
      ctx.lineWidth = route.width;
      ctx.stroke();
    };

    const drawPulse = (pulse: Pulse, time: number, px: number, py: number) => {
      const route = routes[pulse.route];
      const drift = Math.sin(time * 0.0004 + route.phase) * route.amp;
      const shiftX = px * 0.014 * (0.4 + route.green);
      const shiftY = py * 0.01 * (0.4 + route.green) + drift;

      const at = (t: number) => {
        const x = bezier(t, route.p0[0], route.p1[0], route.p2[0], route.p3[0]) + shiftX;
        const y = bezier(t, route.p0[1], route.p1[1], route.p2[1], route.p3[1]) + shiftY;
        return [x * w, y * h] as const;
      };

      const head = pulse.t;
      const tail = Math.max(0, head - pulse.len);
      if (head <= 0.02) return;

      // Trailing comet: sampled polyline with a gradient stroke.
      const [hx, hy] = at(head);
      const [tx, ty] = at(tail);
      const grad = ctx.createLinearGradient(tx, ty, hx, hy);
      grad.addColorStop(0, "rgba(0,255,122,0)");
      grad.addColorStop(0.6, `rgba(57,255,154,${0.28 * intensity})`);
      grad.addColorStop(1, `rgba(230,255,241,${0.95 * intensity})`);

      ctx.beginPath();
      const steps = 12;
      for (let i = 0; i <= steps; i++) {
        const [x, y] = at(tail + ((head - tail) * i) / steps);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = grad;
      ctx.lineWidth = pulse.size;
      ctx.lineCap = "round";
      ctx.stroke();

      // Head node
      ctx.beginPath();
      ctx.arc(hx, hy, pulse.size * 1.15, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(230,255,241,${0.9 * intensity})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(hx, hy, pulse.size * 5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,255,122,${0.09 * intensity})`;
      ctx.fill();
    };

    let frame = 0;
    let running = true;
    let last = 0;

    const render = (time: number) => {
      const dt = last ? Math.min(time - last, 48) : 16;
      last = time;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      const px = pointerRef.current.x;
      const py = pointerRef.current.y;

      for (const route of routes) drawRoute(route, time, px, py);

      if (!reduced) {
        for (const pulse of pulses) {
          pulse.t += pulse.speed * dt;
          if (pulse.t > 1 + pulse.len) pulse.t = -pulse.len * 0.5;
          drawPulse(pulse, time, px, py);
        }
      }

      ctx.globalCompositeOperation = "source-over";

      if (running && !reduced) frame = requestAnimationFrame(render);
    };

    resize();

    if (reduced) {
      // Static composition: routes drawn once, pulses frozen mid-flight.
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const route of routes) drawRoute(route, 0, 0, 0);
      for (const pulse of pulses) drawPulse(pulse, 0, 0, 0);
      ctx.globalCompositeOperation = "source-over";
    } else {
      frame = requestAnimationFrame(render);
    }

    const gate = new IntersectionObserver(
      ([entry]) => {
        if (reduced) return;
        if (entry.isIntersecting && !running) {
          running = true;
          last = 0;
          frame = requestAnimationFrame(render);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(frame);
        }
      },
      { threshold: 0 },
    );
    gate.observe(canvas);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) {
        ctx.clearRect(0, 0, w, h);
        ctx.globalCompositeOperation = "lighter";
        for (const route of routes) drawRoute(route, 0, 0, 0);
        ctx.globalCompositeOperation = "source-over";
      }
    });
    ro.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      gate.disconnect();
      ro.disconnect();
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none block h-full w-full ${className}`}
    />
  );
}
