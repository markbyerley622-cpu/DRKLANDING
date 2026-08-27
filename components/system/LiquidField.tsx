"use client";

import { useEffect, useRef, useState } from "react";

/**
 * THE LIQUID FIELD
 * ===========================================================================
 * `/effect.jpg` — the chrome-and-signal-green flow from the design board —
 * turned into a surface that actually moves.
 *
 * A still would read as a background image. So the plate is uploaded as a
 * texture and the fragment shader warps its *sample coordinates* with a
 * scrolling fbm field: the ridges bend, stretch and settle instead of sitting
 * still, and because only the lookup moves the chrome never smears. Three
 * things ride on top of that warp:
 *
 *   FLOW      domain-warped UVs drifting along the ridge angle, so the whole
 *             plate reads as one body of liquid travelling up-right.
 *   SIGNAL    the green channel is sampled at a slightly larger warp than
 *             the silver, so the signal separates from the metal and
 *             shimmers along the crest — then breathes on its own slow cycle.
 *   SPECULAR  one highlight travelling the diagonal on the ridge angle.
 *
 * Pointer position bends the field toward the cursor. Scroll progress (`--p`,
 * published by the stage engine) sinks and dims it as the act leaves.
 *
 * Cost control: DPR capped at 1.75, rAF parked when the canvas leaves the
 * viewport or the tab is hidden, and under `prefers-reduced-motion` exactly
 * one frame is drawn at t=0 and the loop never starts. If WebGL is missing
 * the component falls back to the plate as a plain CSS layer — same framing,
 * same mask, no motion.
 */

interface Props {
  /** Master level. The hero runs ~1; the ambient page layer runs lower. */
  level?: number;
  /** How hard the fluid warps. 0 = a still plate. */
  turbulence?: number;
  /** Base zoom on the plate. */
  zoom?: number;
  /**
   * Which part of the plate the frame is centred on, in texture space
   * (0,0 = bottom-left). Cover-fit crops, so a tall frame has to be told
   * where to look or it lands on the silver and loses the green crest.
   */
  focus?: [number, number];
  /**
   * How the plate meets the ground.
   *   hero     — a hard black type column on the left (the wide board layout)
   *   surface  — anchored bottom-right, clearing the top of the frame; the
   *              compact layout, where there is no room for a side column
   *   wash     — dissolved on all sides, for ambient use behind copy
   */
  edge?: "hero" | "surface" | "wash";
  /** Sink + dim as the owning stage exits (reads `--p`). */
  sink?: boolean;
  /**
   * Element whose traversal of the viewport drives the flow. Given one, the
   * field advances with the reader's scroll instead of on time alone.
   */
  scrollRef?: React.RefObject<HTMLElement | null>;
  /** How far a full traversal carries the liquid. 0 = time only. */
  travel?: number;
  className?: string;
}

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;

varying vec2 v_uv;

uniform sampler2D u_tex;
uniform vec2  u_res;      // canvas size in px
uniform vec2  u_tex_res;  // texture size in px
uniform float u_time;
uniform float u_turb;     // turbulence
uniform float u_zoom;
uniform vec2  u_pointer;  // -1..1
uniform vec2  u_focus;    // sample centre in texture space
uniform float u_scroll;   // 0..1 traversal of the band that owns this field
uniform float u_travel;   // how far a full traversal carries the liquid

/* --- value noise + fbm ---------------------------------------------------- */
vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = dot(hash2(i + vec2(0.0, 0.0)) - 0.5, vec2(1.0));
  float b = dot(hash2(i + vec2(1.0, 0.0)) - 0.5, vec2(1.0));
  float c = dot(hash2(i + vec2(0.0, 1.0)) - 0.5, vec2(1.0));
  float d = dot(hash2(i + vec2(1.0, 1.0)) - 0.5, vec2(1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    v += amp * noise(p);
    p = p * 2.02 + vec2(37.1, 17.3);
    amp *= 0.5;
  }
  return v;
}

/* Cover-fit the plate into the canvas — never stretch the chrome.
   The vector s is the FRACTION of the texture the frame gets to see on each
   axis, so the visible slice is scaled BY it. A tall frame sees a narrow
   column of a
   landscape plate; a wide frame sees a short band of it. Zoom then divides:
   more zoom, less texture in frame. */
vec2 fitScale() {
  float canvasAspect = u_res.x / u_res.y;
  float texAspect = u_tex_res.x / u_tex_res.y;
  return canvasAspect > texAspect
    ? vec2(1.0, texAspect / canvasAspect)
    : vec2(canvasAspect / texAspect, 1.0);
}

vec2 coverUV(vec2 uv) {
  return (uv - u_focus) * fitScale() / u_zoom + u_focus;
}

void main() {
  vec2 uv = v_uv;

  /* The ridge angle from the board — the liquid travels up and to the right. */
  const vec2 FLOW = vec2(0.86, -0.51);

  float t = u_time;

  /* Scroll advances the liquid along the SAME axis time does, so the two are
     one motion rather than two competing ones: let go of the wheel and the
     flow keeps its heading, just slower. Reading is the current position,
     not a separate animation triggered at a threshold. */
  float travel = u_scroll * u_travel;

  /* --- FLOW: domain warp -------------------------------------------------- */
  vec2 q = uv * vec2(u_res.x / u_res.y, 1.0);

  // Two counter-travelling fbm fields. Their interference is the motion:
  // crests brighten where they agree and part again where they don't.
  // Scroll pushes both, so the ridges genuinely re-form as you descend
  // instead of the whole plate sliding past like a parallax layer.
  float n1 = fbm(q * 2.6 + FLOW * (t * 0.09 + travel * 1.15));
  float n2 = fbm(q * 1.7 - FLOW * (t * 0.055 + travel * 0.72) + vec2(4.7, 2.1));

  vec2 warp = vec2(n1, n2) * 2.0 - 1.0;

  // Pointer bends the field toward the cursor, strongest near it.
  vec2 toPointer = (uv * 2.0 - 1.0) - u_pointer;
  float grip = exp(-dot(toPointer, toPointer) * 1.6);
  warp += normalize(toPointer + 1e-5) * grip * 0.35;

  // The warp is weakest at the frame edges so the plate stays seated.
  float edgeHold = smoothstep(0.0, 0.28, uv.x) * smoothstep(0.0, 0.22, 1.0 - uv.x)
                 * smoothstep(0.0, 0.2, uv.y) * smoothstep(0.0, 0.2, 1.0 - uv.y);

  /* Warp and channel offsets are measured on SCREEN, then converted into
     texture space — otherwise a tall frame, which sees only a narrow column
     of a landscape plate, magnifies both by the crop factor: the warp turns
     into a shear and the channel offsets separate far enough to fringe the
     chrome magenta. The mag factor is how much texture one screen unit covers. */
  vec2 fit = fitScale();
  float mag = min(fit.x, fit.y) / u_zoom;

  float amp = u_turb * 0.032 * edgeHold * mag;

  // A slow bodily drift on top of the warp, so the whole plate breathes.
  vec2 drift = FLOW * (sin(t * 0.07) * 0.012 + 0.006 * sin(t * 0.031 + 1.7)
                       + travel * 0.16) * mag;

  /* The warp is applied in TEXTURE space, not screen space. Cover-fit
     compresses the two axes by different amounts — on a tall frame the
     horizontal squeeze is several times the vertical one — so a screen-space
     warp arrives at the plate stretched, and the per-channel offsets below
     separate far enough to fringe into visible red and blue. In texture
     space the warp is isotropic on every aspect ratio. */
  vec2 base = coverUV(uv) + warp * amp + drift;

  /* --- SIGNAL: separate the green from the silver ------------------------- */
  // Sampling green at a slightly larger warp slides the signal over the
  // metal. Held deliberately close to 1.0: this is a shimmer, not a split.
  vec3 col;
  vec4 plate = texture2D(u_tex, base);
  col.r = plate.r;
  col.b = plate.b;

  // Green is sampled twice and combined BY HOW GREEN THE PIXEL ALREADY IS,
  // so only the signal slides and the chrome stays neutral however hard the
  // field warps.
  //
  // The combine is max(), not a crossfade. Crossfading lets green fall BELOW
  // the plate wherever the offset sample lands on a dark spot — and on a
  // green ridge, dropping the green channel while red and blue hold leaves
  // magenta. Taking the brighter of the two can only ever add signal, so the
  // shimmer reads as the crest blooming along itself and magenta is not a
  // reachable colour. This matters most under scroll, where travel pushes the
  // offset furthest.
  float gOffset = texture2D(u_tex, base + warp * amp * 0.14 + drift * 0.2 * mag).g;
  float greenness = clamp((plate.g - max(plate.r, plate.b)) * 7.0, 0.0, 1.0);
  col.g = mix(plate.g, max(plate.g, gOffset), greenness);

  /* --- The green breathing through the metal ------------------------------ */
  // Isolate the signal: green in excess of the silver it sits on.
  float signal = max(col.g - max(col.r, col.b), 0.0);
  float pulse = 0.82 + 0.34 * sin(t * 0.55 + fbm(q * 1.2 + t * 0.05) * 5.0);
  col += vec3(0.03, 0.42, 0.16) * signal * pulse;

  /* --- SPECULAR: one highlight on the ridge angle ------------------------- */
  float axis = dot(uv - 0.5, normalize(FLOW));
  // The highlight is driven mostly by scroll: it crosses the frame once over
  // the band, so descending reads as light travelling down the liquid.
  float sweep = fract(t * 0.035 + travel * 0.62) * 2.4 - 1.2;
  float band = exp(-pow((axis - sweep) * 5.5, 2.0));
  // Only the chrome takes the highlight; flat black stays black.
  float metal = smoothstep(0.06, 0.42, max(col.r, max(col.g, col.b)));
  col += vec3(0.30, 0.36, 0.33) * band * metal * 0.5;

  /* --- Seat the plate ----------------------------------------------------- */
  // Lift the darks back to the ground colour so the plate has no visible box.
  col = max(col - 0.006, 0.0);

  gl_FragColor = vec4(col, 1.0);
}`;

/* -------------------------------------------------------------------------- */

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function LiquidField({
  level = 1,
  turbulence = 1,
  zoom = 1.06,
  /* The board frames the green crest just right of centre. */
  focus = [0.54, 0.5],
  edge = "hero",
  sink = true,
  scrollRef,
  travel = 0,
  className = "",
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ok, setOk] = useState(true);
  const [fx, fy] = focus;

  /**
   * The GL context is not built until the field is first near the viewport.
   *
   * Compiling and linking a shader is synchronous main-thread work, and every
   * field doing it during hydration delays hydration itself — which delays
   * everything hydration owns, the opening card's unmount included.
   *
   * In practice this defers the closing field only: the middle band begins
   * immediately below the fold, so it is already inside the margin at rest.
   * That is the right trade — the band is the next thing the reader scrolls
   * into, and a wash that has to compile as it enters would hitch.
   */
  const [active, setActive] = useState(false);

  /**
   * Turbulence, zoom and focus are UNIFORMS — they must never be effect
   * dependencies. `useIsCompact` resolves to its real value only after mount,
   * so a compact hero changes all three one frame in; rebuilding the context
   * for that would call `loseContext()` on the canvas, and a canvas that has
   * had its context deliberately lost can never acquire another one. The
   * field would fall back to the static plate on exactly the viewports that
   * flip. So: the context is built once, and the uniforms are pushed to it.
   */
  const glRef = useRef<{
    gl: WebGLRenderingContext;
    u: Record<string, WebGLUniformLocation | null>;
    redraw: () => void;
  } | null>(null);
  const propsRef = useRef({ turbulence, zoom, fx, fy, travel });
  propsRef.current = { turbulence, zoom, fx, fy, travel };
  /* Held in a ref, never in state: this changes every frame the reader
     scrolls, and a re-render per frame would defeat the whole engine. */
  const scrollElRef = useRef(scrollRef);
  scrollElRef.current = scrollRef;

  /* Cheap watcher: no GL, no allocation — just "has this been near yet". */
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setActive(true);
        io.disconnect();
      },
      // Build a little before arrival so the first frame is never a blank.
      { rootMargin: "300px" },
    );
    io.observe(host);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    const gl =
      (canvas.getContext("webgl", {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: "low-power",
      }) as WebGLRenderingContext | null) ??
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) {
      setOk(false);
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) {
      setOk(false);
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setOk(false);
      return;
    }
    gl.useProgram(prog);

    /* Full-screen triangle pair */
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = {
      tex: gl.getUniformLocation(prog, "u_tex"),
      res: gl.getUniformLocation(prog, "u_res"),
      texRes: gl.getUniformLocation(prog, "u_tex_res"),
      time: gl.getUniformLocation(prog, "u_time"),
      turb: gl.getUniformLocation(prog, "u_turb"),
      zoom: gl.getUniformLocation(prog, "u_zoom"),
      pointer: gl.getUniformLocation(prog, "u_pointer"),
      focus: gl.getUniformLocation(prog, "u_focus"),
      scroll: gl.getUniformLocation(prog, "u_scroll"),
      travel: gl.getUniformLocation(prog, "u_travel"),
    };

    /* Placeholder texture so the first frames are ground colour, not white. */
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([8, 13, 12, 255]),
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.uniform1i(u.tex, 0);
    gl.uniform2f(u.texRes, 1, 1);
    gl.uniform2f(u.pointer, 0, 0);
    {
      const p0 = propsRef.current;
      gl.uniform1f(u.zoom, p0.zoom);
      gl.uniform1f(u.turb, p0.turbulence);
      gl.uniform2f(u.focus, p0.fx, p0.fy);
      gl.uniform1f(u.travel, p0.travel);
      gl.uniform1f(u.scroll, 0);
    }

    let texReady = false;
    const img = new Image();
    img.decoding = "async";
    img.src = "/effect.jpg";
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      gl.uniform2f(u.texRes, img.naturalWidth, img.naturalHeight);
      texReady = true;
      host.dataset.ready = "true";
      draw(0);
    };

    /* --- sizing ----------------------------------------------------------- */
    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const rect = host.getBoundingClientRect();
      const nw = Math.max(1, Math.round(rect.width * dpr));
      const nh = Math.max(1, Math.round(rect.height * dpr));
      if (nw === w && nh === h) return;
      w = nw;
      h = nh;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(u.res, w, h);
    };
    resize();

    const ro = new ResizeObserver(() => {
      resize();
      if (texReady) draw(last);
    });
    ro.observe(host);

    /* --- pointer ---------------------------------------------------------- */
    let px = 0;
    let py = 0;
    let tx = 0;
    let ty = 0;
    const onPointer = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ty = 1 - ((e.clientY - rect.top) / rect.height) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    /* --- loop ------------------------------------------------------------- */
    let raf = 0;
    let last = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* --- scroll coupling ---------------------------------------------------
       Read inside this loop rather than off a scroll listener: the rect is
       already being read once a frame here, a listener would fire far more
       often than the compositor can use, and this loop is parked whenever the
       field is off screen — which is exactly when the value does not matter. */
    let sp = 0;
    let spTarget = 0;

    const readScroll = () => {
      const el = scrollElRef.current?.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      // The band is taller than the viewport; its sticky child pins for the
      // surplus. Progress is how much of that surplus has been consumed.
      const span = r.height - window.innerHeight;
      spTarget = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
    };

    function draw(time: number) {
      last = time;
      px += (tx - px) * 0.05;
      py += (ty - py) * 0.05;
      // Smoothed, so a flung scroll arrives as a surge rather than a jump and
      // the liquid keeps moving for a beat after the wheel stops.
      sp += (spTarget - sp) * 0.07;
      gl!.uniform1f(u.time, time);
      gl!.uniform1f(u.scroll, sp);
      gl!.uniform2f(u.pointer, px, py);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }

    let start = 0;
    const frame = (now: number) => {
      if (!start) start = now;
      readScroll();
      draw((now - start) / 1000);
      raf = requestAnimationFrame(frame);
    };

    let visible = false;
    const run = () => {
      if (reduced) {
        // One frame, at the reader's current position. Reduced motion means
        // no animation, not a field frozen at a position they scrolled past.
        readScroll();
        sp = spTarget;
        draw(last);
        return;
      }
      if (raf || !visible || document.hidden) return;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) run();
        else stop();
      },
      { rootMargin: "120px" },
    );
    io.observe(host);

    glRef.current = { gl, u, redraw: () => draw(last) };

    const onVisibility = () => {
      if (document.hidden) stop();
      else run();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      glRef.current = null;
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  /* Push uniform changes to the live context instead of rebuilding it. */
  useEffect(() => {
    const ctx = glRef.current;
    if (!ctx) return;
    const { gl, u } = ctx;
    gl.uniform1f(u.turb, turbulence);
    gl.uniform1f(u.zoom, zoom);
    gl.uniform2f(u.focus, fx, fy);
    gl.uniform1f(u.travel, travel);
    // A parked loop (off-screen, or reduced motion) needs one frame to show it.
    ctx.redraw();
  }, [turbulence, zoom, fx, fy, travel]);

  /* The type column must sit on true black — the plate is faded well before
     it reaches the headline, not simply layered under it. */
  const mask =
    edge === "hero"
      ? `linear-gradient(101deg,
           transparent 0%,
           rgba(0,0,0,0.05) 18%,
           rgba(0,0,0,0.32) 31%,
           rgba(0,0,0,0.8) 44%,
           #000 58%),
         radial-gradient(140% 125% at 76% 50%, #000 44%, rgba(0,0,0,0.45) 76%, transparent 100%)`
      : edge === "surface"
        ? `linear-gradient(184deg,
             transparent 0%,
             rgba(0,0,0,0.08) 26%,
             rgba(0,0,0,0.5) 44%,
             #000 62%),
           radial-gradient(120% 80% at 78% 82%, #000 30%, rgba(0,0,0,0.5) 70%, transparent 100%)`
        : `radial-gradient(115% 95% at 74% 46%, #000 0%, rgba(0,0,0,0.4) 52%, transparent 84%)`;

  return (
    <div
      ref={hostRef}
      aria-hidden
      className={`drk-field pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{
        maskImage: mask,
        WebkitMaskImage: mask,
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
        opacity: sink ? `calc(${level} * (1 - var(--p,0) * 0.85))` : `${level}`,
        transform: sink ? "translate3d(0, calc(var(--p,0) * 14vh), 0)" : undefined,
        willChange: "transform, opacity",
      }}
    >
      {ok ? (
        <canvas ref={canvasRef} className="h-full w-full" />
      ) : (
        /* No WebGL: the plate itself, same framing, no motion. */
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage: "url(/effect.jpg)",
            backgroundPosition: "54% 50%",
          }}
        />
      )}

      {/* Seat the plate into the ground at the frame edges. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 105% at 52% 50%, transparent 48%, rgba(8,13,12,0.5) 86%, var(--color-obsidian) 100%)",
        }}
      />
    </div>
  );
}
