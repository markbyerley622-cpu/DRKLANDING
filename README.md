# DRK — Landing

Programmatic trading & liquidity infrastructure for market operations.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS 4** with a DRK token layer in `app/globals.css`
- **No animation dependencies.** All motion is hand-rolled: CSS transitions,
  a shared `IntersectionObserver`, rAF-throttled scroll progress, and one
  Canvas 2D field. This keeps the bundle small and the motion tunable.

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

## Structure

```
app/
  layout.tsx        fonts, metadata, skip link
  page.tsx          the 15-act narrative composition
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
