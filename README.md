# DRK — Landing

Programmatic trading & liquidity infrastructure for market operations.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS 4** with a DRK token layer in `app/globals.css`
- **No animation dependencies** — not even GSAP. See "Motion architecture".

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

## Motion architecture

The page is a scroll-synchronised sequence, not a stack of sections. One
engine (`lib/scroll.ts`) owns **a single scroll listener and a single rAF
loop**, does one read pass over every stage, then one write pass.

**Progress is published as a CSS variable, not React state.** Each stage
writes `--p` (0 → 1) onto its own DOM node; `--p` inherits, so descendants
interpolate in pure CSS. React re-renders only when a *discrete* step index
changes. Measured cost: **median 16.6 ms / p95 17.7 ms** per scroll frame —
inside the 60fps budget.

**Pinning is `position: sticky`, not a library.** A `PinnedStage` is a tall
spacer wrapping a sticky viewport-height frame, so the browser owns the pin.
No injected pin-spacing, no transform-based faux-pinning fighting native
scroll, no scroll-jacking possible, and cleanup is just React unmounting.
Resize is handled by the browser for free.

Helper classes in `globals.css` (`.band`, `.band-rise`, `.band-hold`,
`.band-step`, `.band-draw`) map a slice of `--p` onto a child's local
progress, so a stage's choreography is declared where the markup lives.

Pin length is set per-stage and **shortened on compact viewports** via
`--len-d` / `--len-m`, giving mobile a deliberately tighter sequence with no
JS branch.

`SystemTelemetry` reads any element declaring `data-phase`, so the persistent
`SYSTEM / …` readout can never drift out of sync with the page structure.

## Structure

```
app/
  layout.tsx        fonts, metadata, skip link
  page.tsx          the 14-act narrative composition
  globals.css       DRK design tokens + material utilities
content/
  drk.ts            SINGLE SOURCE OF TRUTH for all copy and data
lib/
  motion.ts         reveal / scroll-progress / parallax / sequence hooks
components/
  ui/               Button, Panel, Chip, Section primitives
  drk/              one component per narrative act
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

## Content rules

`content/drk.ts` is the only place copy or data lives. Two rules hold:

1. **Nothing is invented.** Where the source material referenced figures that
   were never supplied, the entry carries `pending: true` and the UI renders a
   qualitative treatment instead of a fabricated number.
2. **Search `pending: true`** to find everything awaiting founder approval
   before it can be published.

## Accessibility

- Verified zero horizontal overflow at 320 → 1920 px.
- `prefers-reduced-motion` resolves every element to its final state; the
  Canvas field renders one static frame and stops its rAF loop.
- Full keyboard traversal with a visible focus ring and a skip link.
- Decorative surfaces are `aria-hidden` and stay out of the tab order.

## Performance

- Canvas rAF is paused whenever the field leaves the viewport.
- Route and pulse counts are reduced on compact viewports.
- One shared `IntersectionObserver` drives every reveal; `will-change` is
  dropped once each transition settles.
- Motion is transform/opacity only — no layout-affecting animation.
