"use client";

import { useEffect, useRef } from "react";
import { useDocProgress } from "@/lib/scroll";

/**
 * THE UNDERCURRENT — the page's persistent visual metaphor.
 * ===========================================================================
 * "LIQUIDITY BENEATH THE SURFACE", made literal and global.
 *
 * One fixed layer sits behind every act for the entire document. It holds the
 * same system the whole way down — the same routes, the same signals — and
 * how much of it you can see is driven by how far you have descended:
 *
 *   0.00 → 0.12   almost nothing. Something is moving down there, not enough
 *                 to read. This is the surface.
 *   0.12 → 0.62   the system reveals itself as the acts explain it. Routes
 *                 resolve, signals become traceable, depth opens up.
 *   0.62 → 0.86   fully revealed — you are inside the runtime.
 *   0.86 → 1.00   it retreats back under. The page ends where it began.
 *
 * Because it never unmounts, the routes you glimpse in the hero are the same
 * ones running under the architecture act and the same ones that sink at the
 * end. That continuity is the whole point: the acts stop reading as separate
 * pieces and start reading as one system seen from different depths.
 *
 * Cost control: one canvas for the whole document (not one per act), DPR
 * capped at 2, rAF parked whenever the tab is hidden, route and signal counts
 * halved on compact viewports, and a single static frame under reduced motion.
 */

interface Route {
  /** Cubic control points in normalised space. */
  pts: [number, number, number, number, number, number, number, number];
  width: number;
  /** 0 = silver structure, 1 = full signal green. */
  green: number;
  alpha: number;
  /** Depth: 0 = just under the surface, 1 = deep. Deeper reveals later. */
  depth: number;
  drift: number;
  phase: number;
}

/**
 * A bundle that reads as one piece of infrastructure seen edge-on. Deeper
 * routes are flatter and dimmer; the shallow ones carry the signal.
 */
const ROUTES: Route[] = [
  { pts: [-0.2, 0.78, 0.26, 0.74, 0.6, 0.42, 1.2, 0.3], width: 1.4, green: 1, alpha: 0.9, depth: 0.05, drift: 0.012, phase: 0 },
  { pts: [-0.2, 0.9, 0.34, 0.86, 0.66, 0.5, 1.2, 0.4], width: 1, green: 0.8, alpha: 0.5, depth: 0.2, drift: 0.016, phase: 1.1 },
  { pts: [-0.2, 0.66, 0.3, 0.66, 0.56, 0.34, 1.2, 0.18], width: 0.9, green: 0.5, alpha: 0.4, depth: 0.34, drift: 0.01, phase: 2.3 },
  { pts: [-0.2, 1.02, 0.4, 0.96, 0.74, 0.62, 1.2, 0.52], width: 0.8, green: 0.28, alpha: 0.3, depth: 0.5, drift: 0.02, phase: 3.2 },
  { pts: [-0.2, 0.54, 0.44, 0.6, 0.78, 0.5, 1.2, 0.46], width: 0.7, green: 0.1, alpha: 0.24, depth: 0.66, drift: 0.008, phase: 4.1 },
  { pts: [-0.2, 1.14, 0.5, 1.04, 0.82, 0.74, 1.2, 0.66], width: 0.7, green: 0.4, alpha: 0.2, depth: 0.8, drift: 0.022, phase: 5.0 },
  { pts: [-0.2, 0.42, 0.5, 0.52, 0.84, 0.44, 1.2, 0.38], width: 0.6, green: 0.05, alpha: 0.16, depth: 0.92, drift: 0.006, phase: 5.8 },
];

interface Packet {
  route: number;
  t: number;
  speed: number;
  len: number;
  size: number;
}

const bez = (t: number, a: number, b: number, c: number, d: number) => {
  const m = 1 - t;
  return m * m * m * a + 3 * m * m * t * b + 3 * m * t * t * c + t * t * t * d;
};

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** How revealed the whole system is, from document progress. */
function revealAt(p: number) {
  // Hero: present but clearly submerged — something is running down there.
  if (p < 0.1) return 0.2 + clamp01(p / 0.1) * 0.14;
  // The descent: the system resolves as the acts explain it.
  if (p < 0.6) return 0.34 + clamp01((p - 0.1) / 0.5) * 0.66;
  // Inside the runtime.
  if (p < 0.88) return 1;
  // The retreat. Never fully to zero — the system keeps running underneath.
  return 1 - clamp01((p - 0.88) / 0.12) * 0.86;
}

export function Undercurrent() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reveal = useRef(0);

  useDocProgress((p) => {
    reveal.current = revealAt(p);
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 900px), (pointer: coarse)").matches;

    const routes = compact ? ROUTES.filter((_, i) => i % 2 === 0) : ROUTES;
    const packets: Packet[] = Array.from({ length: compact ? 5 : 12 }, (_, i) => ({
      route: i % routes.length,
      t: (i * 0.149) % 1,
      speed: 0.00016 + ((i * 31) % 9) * 0.00003,
      len: 0.1 + ((i * 17) % 6) * 0.02,
      size: 1 + ((i * 13) % 4) * 0.3,
    }));

    let w = 0;
    let h = 0;

    const resize = () => {
      // Deliberately soft layer behind a scrim: ~1x is indistinguishable
      // here and costs a quarter of the fill of a 2x buffer.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const tone = (g: number, a: number) =>
      `rgba(${Math.round(180 * (1 - g))},${Math.round(198 * (1 - g) + 255 * g)},${Math.round(
        192 * (1 - g) + 122 * g,
      )},${a})`;

    const draw = (time: number) => {
      const R = reveal.current;
      ctx.clearRect(0, 0, w, h);
      if (R <= 0.002) return;

      ctx.globalCompositeOperation = "lighter";

      for (const r of routes) {
        // Deeper routes surface later — the system opens from the top down.
        const local = clamp01((R - r.depth * 0.55) / 0.45);
        if (local <= 0.001) continue;

        const dy = Math.sin(time * 0.00035 + r.phase) * r.drift;
        const X = (n: number) => n * w;
        const Y = (n: number) => (n + dy) * h;

        ctx.beginPath();
        ctx.moveTo(X(r.pts[0]), Y(r.pts[1]));
        ctx.bezierCurveTo(
          X(r.pts[2]), Y(r.pts[3]),
          X(r.pts[4]), Y(r.pts[5]),
          X(r.pts[6]), Y(r.pts[7]),
        );

        if (r.green > 0.2) {
          ctx.strokeStyle = tone(r.green, r.alpha * 0.07 * local);
          ctx.lineWidth = r.width * 6;
          ctx.stroke();
        }
        ctx.strokeStyle = tone(r.green, r.alpha * 0.36 * local);
        ctx.lineWidth = r.width * 0.85;
        ctx.stroke();
      }

      if (!reduced) {
        for (const pk of packets) {
          const r = routes[pk.route];
          const local = clamp01((R - r.depth * 0.55) / 0.45);
          if (local <= 0.02) continue;

          const dy = Math.sin(time * 0.00035 + r.phase) * r.drift;
          const at = (t: number) =>
            [
              bez(t, r.pts[0], r.pts[2], r.pts[4], r.pts[6]) * w,
              (bez(t, r.pts[1], r.pts[3], r.pts[5], r.pts[7]) + dy) * h,
            ] as const;

          const head = pk.t;
          if (head <= 0.02) continue;
          const tail = Math.max(0, head - pk.len);
          const [hx, hy] = at(head);
          const [tx, ty] = at(tail);

          const grad = ctx.createLinearGradient(tx, ty, hx, hy);
          grad.addColorStop(0, "rgba(0,255,122,0)");
          grad.addColorStop(1, `rgba(230,255,241,${0.34 * local})`);

          ctx.beginPath();
          for (let i = 0; i <= 6; i++) {
            const [x, y] = at(tail + ((head - tail) * i) / 6);
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.strokeStyle = grad;
          ctx.lineWidth = pk.size * 0.8;
          ctx.lineCap = "round";
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(hx, hy, pk.size * 0.75, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(230,255,241,${0.36 * local})`;
          ctx.fill();
        }
      }

      ctx.globalCompositeOperation = "source-over";
    };

    let frame = 0;
    let last = 0;
    let running = true;
    let tick = 0;

    const loop = (time: number) => {
      const dt = last ? Math.min(time - last, 48) : 16;
      last = time;
      if (!reduced) {
        for (const pk of packets) {
          pk.t += pk.speed * dt;
          if (pk.t > 1 + pk.len) pk.t = -pk.len * 0.5;
        }
      }
      // Draw on alternate frames: the background drifts slowly enough that
      // 30fps is imperceptible, and it hands the other frame to the
      // scroll-linked acts, which genuinely need 60.
      if ((tick++ & 1) === 0) draw(time);
      if (running && !reduced) frame = requestAnimationFrame(loop);
    };

    resize();
    if (reduced) {
      reveal.current = 1;
      draw(0);
    } else {
      frame = requestAnimationFrame(loop);
    }

    // A hidden tab must not burn a rAF loop.
    const onVis = () => {
      if (reduced) return;
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
      } else if (!running) {
        running = true;
        last = 0;
        frame = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ background: "var(--color-obsidian)" }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      {/* THE SURFACE — the dark plane the system runs beneath. It is what
          makes the routes read as submerged rather than drawn on top. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,13,12,0.82) 0%, rgba(8,13,12,0.42) 38%, rgba(8,13,12,0.66) 100%)",
        }}
      />
    </div>
  );
}
