# DRK — Landing

Institutional-grade liquidity management. One page, four screens, one door.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS 4** with a DRK token layer in `app/globals.css`
- **No animation dependencies.** The one piece of heavy motion is a ~120-line
  raw-WebGL fragment shader; everything else is CSS.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

## Deploy (Vercel)

Zero configuration. Import the repo and deploy — the app is fully static
(`○ prerendered as static content`) with no server runtime, environment
variables, or external services. Fonts are self-hosted at build time via
`next/font`, so there are no runtime third-party requests.

## The page

```
01 HERO          the surface, and the liquid running under it
02 CAPABILITIES  what the system handles
03 APPROACH      how it runs
04 CONTACT       the door
```

The site is a **front door, not a deck**. Its job is to say what DRK is, show
there is real infrastructure behind it, and make the reader get in touch.
Deliberately **not** on this site — shared privately on request instead:

- the application walkthrough / demo reel
- launch results and any P/L
- economics, revenue and projections
- the raise
- market statistics

`public/intro.mp4` is the only video: a title card containing the wordmark and
nothing else, played by `components/system/IntroCurtain.tsx`. The clip runs 2s
but the card leaves after about **1.1s**, mid-clip — a title card is a beat
before the page, not a video the reader came to watch. The exit is opacity
alone; scale and blur read as an effect, where a straight crossfade reads as
the same black simply becoming the page.

**The beat is owned by CSS (`.drk-curtain`), not by a JS timer.** The card is
in the server HTML, so the animation starts at first paint. A timer starts at
hydration instead, and on a cold load hydration is the slow part — the same
card that left after ~1.1s warm sat for over three seconds cold. Two
consequences fall out of that and are handled explicitly:

- The animation's end state includes `pointer-events: none`, so a curtain
  whose JS never arrives still cannot cover the page.
- Unmount and the scroll lock are both measured from **first paint**, not from
  mount. `animationend` alone is not enough: React attaches that listener at
  hydration, so on a cold load the event has already fired and is missed — and
  since the scroll lock releases on unmount, the reader was left unable to
  scroll for seconds after the card had visually gone. If the beat has already
  elapsed by the time JS runs, the lock is never applied at all.
- Animation events **bubble** — the video's own fade-in would otherwise
  unmount the curtain a third of a second in, so the handler checks
  `animationName`.

It also leaves on clip end, on any click/tap/keypress; `prefers-reduced-motion`
never sees it (`display: none`, because the global reduced-motion rule zeroes
animation *duration* but not *delay*).

## The liquid

`public/effect.jpg` is the design board's chrome-and-signal-green plate.
`components/system/LiquidField.tsx` uploads it as a WebGL texture and warps
its **sample coordinates** with a scrolling fbm field, so the ridges bend and
settle instead of sitting still. Because only the lookup moves, the chrome
never smears. Riding on that warp:

| Layer | What it does |
| --- | --- |
| FLOW | domain-warped UVs drifting along the ridge angle |
| SIGNAL | green sampled at a larger warp than silver, so it slides over the metal |
| SPECULAR | one highlight travelling the diagonal on the ridge angle |

The pointer bends the field toward the cursor; `--p` sinks and dims it as its
act leaves.

**The middle band's field is scroll-driven.** `FlowBand` hands `LiquidField`
the band element, and the field reads that element's traversal *inside its own
rAF loop* — one rect read a frame, in a loop that is already running and is
parked whenever the field is off screen, which is exactly when the value does
not matter. Scroll advances the fbm flow along the same axis time does, so the
two are one motion rather than two competing ones: let go of the wheel and the
flow keeps its heading, just slower. The value is smoothed, so a flung scroll
arrives as a surge, and it lives in a ref — a re-render per frame would defeat
the whole engine.

**Three framing rules the shader has to respect**, each of which was a bug
before it was a rule:

1. **Cover-fit scales the visible slice, it does not divide it.** A tall frame
   sees a narrow column of a landscape plate. Getting this backwards reads as
   correct on a wide desktop (where the fit factor is ~1) and falls apart on
   a phone.
2. **Warp and channel offsets are measured on screen, then converted into
   texture space** via the crop magnification. A fixed texture-space offset
   is magnified by the crop on tall frames, which shears the flow and fringes
   the chrome magenta.
3. **The green offset is gated by how green the pixel already is**, and the
   two samples are combined with `max()`, not a crossfade. A flat offset drags
   green off the white speculars and tints them; a crossfade lets green fall
   *below* the plate wherever the offset lands on a dark spot, and dropping
   green while red and blue hold leaves magenta on the ridges. `max()` can
   only add signal, so magenta is not a reachable colour. This matters most
   under scroll, where travel pushes the offset furthest.

**`turbulence`, `zoom` and `focus` are uniforms and must never be effect
dependencies.** `useIsCompact` resolves to its real value one frame after
mount, so on a phone all three change immediately; rebuilding the context for
that calls `loseContext()`, and *a canvas that has had its context
deliberately lost can never acquire another one*. The field would silently
fall back to the static plate on exactly the viewports that flip. The context
is built once; uniforms are pushed to it.

**The shader sources are template literals — no backticks inside them.** A
stray one terminates the string and produces a parse error pointing at the
wrong thing.

Cost control: DPR capped at 1.75, rAF parked when the canvas leaves the
viewport or the tab is hidden, one static frame under `prefers-reduced-motion`,
and a CSS-image fallback if WebGL is missing. Three fields exist (hero, middle
band, close) but at most one is ever drawing.

**A field does not build its GL context until it is first near the viewport.**
Compiling and linking a shader is synchronous main-thread work, and every field
doing it during hydration delays hydration itself — which delays everything
hydration owns, the opening card's unmount included. In practice this defers
the closing field; the middle band begins immediately below the fold and so is
already inside the margin at rest, which is the right trade, as a wash that had
to compile as it scrolled in would hitch.

The middle band's field is a **single sticky viewport-height canvas spanning
both middle acts** (`components/system/FlowBand.tsx`), so the flow does not
restart at the section join and the canvas never has to be as tall as the band
it covers.

## Motion architecture

One engine (`lib/scroll.ts`) owns **a single scroll listener and a single rAF
loop**, does one read pass over every stage, then one write pass.

**Progress is published as a CSS variable, not React state.** Each stage
writes `--p` (0 → 1) onto its own DOM node; `--p` inherits, so descendants
interpolate in pure CSS. React re-renders only when a *discrete* step index
changes.

Helper classes in `globals.css` (`.band`, `.band-rise`, `.band-hold`,
`.band-step`, `.band-draw`) map a slice of `--p` onto a child's local
progress, so a stage's choreography is declared where the markup lives.

## Structure

```
app/
  layout.tsx        fonts, metadata, skip link
  page.tsx          the four-act composition + the middle-band field
  globals.css       DRK design tokens + material utilities
  icon.svg          favicon
content/
  drk.ts            SINGLE SOURCE OF TRUTH for all copy
lib/
  scroll.ts         stage progress / reveal / pointer / compact hooks
components/
  ui/               Button, Panel, Chip, Section primitives
  system/           LiquidField, FlowBand, IntroCurtain
  drk/              one component per act
public/
  effect.jpg        the design board's plate — the shader's texture
  intro.mp4         the title card
```

## Design system

Palette, type stack and material treatments are taken directly from the
supplied brand sheet — nothing was invented.

| Token | Value | Use |
| --- | --- | --- |
| `obsidian` | `#080D0C` | page ground |
| `carbon` / `graphite` / `slate` / `smoke` | `#0F1110` → `#222523` | glass surfaces |
| `hero` | `#00FF7A` | primary accent, active states, CTAs |
| `signal` | `#39FF9A` | secondary active states |
| `deep` / `mint` / `tint` | `#0FCC6A` / `#88FFD8` / `#E6FFF1` | depth + highlights |

Type: **Archivo** (display) · **Inter** (UI) · **IBM Plex Mono** (data).

Text contrast on the ground colour:

| Token | Ratio | Permitted use |
| --- | --- | --- |
| `ink` | 18.4:1 | headings, primary copy |
| `ink-muted` | 7.5:1 | body copy |
| `ink-faint` | 5.1:1 | labels, captions, **all disclaimers** |
| `ink-ghost` | 3.4:1 | decorative marks and pre-activation states only |

Body copy is `ink-muted`, and mid-grey chrome underneath it would cost that
ratio — so every act that runs copy over the field also veils the field
everywhere the text runs. The flow is held to the side of the frame the type
does not occupy.

## Content rules

`content/drk.ts` is the only place copy lives. Four rules hold:

1. **Say it in a line or cut it.** The page sells a conversation, not the
   product. Anything that reads like a paragraph belongs in that conversation.
2. **Nothing sensitive.** No client data, no P/L, no revenue, no projections,
   no market statistics, no performance claims.
3. **No "market making".** The phrase appears nowhere on the public site.
4. **Contact details are never guessed.** The two Telegram handles in
   `contact` are the real ones, taken verbatim from DRK's pitch deck build.
   There is deliberately no email address: a plausible-looking address that
   bounces is worse than none. A wrong handle sends an investor to a stranger.

## Accessibility

- Verified zero horizontal overflow at 320 → 1920 px.
- `prefers-reduced-motion` resolves every element to its final state; the
  field renders one static frame and never starts its rAF loop.
- Full keyboard traversal with a visible focus ring and a skip link.
- Decorative surfaces are `aria-hidden` and stay out of the tab order.
- The compact hero and close are not the wide ones shrunk: there is no room
  for a side column, so the type takes the top of the frame on black and the
  liquid takes the bottom, and the board's forced line break in the hero body
  copy reflows.
- Verified at 320 / 390 / 768 / 1440 / 1920: zero horizontal overflow at the
  top and the bottom of the page, all three fields live, no console errors.
