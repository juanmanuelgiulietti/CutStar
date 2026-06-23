# CUTSTAR — Marketing Landing Page

AI-powered short-form video edit engine. One-page, four-scroll marketing site.
Next.js (App Router), desktop-first, dark / premium / editorial.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Framer Motion** — viewport fade/scale-in + the slow star pulse
- **next/font** — Barlow Condensed (display/wordmark, weight 500) + Inter (body/UI)
- CSS Modules + design tokens (no UI framework, deliberate per-element styling)

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Design tokens (locked palette)

| Token | Value | Use |
|-------|-------|-----|
| `--color-bg` | `#0A0A0F` | Background |
| `--color-accent` | `#7C5CFC` | Violet — CTAs + small details only |
| `--color-text` | `#FFFFFF` | Text |
| `--color-surface` | `#1A1A24` | Card surfaces (visibly distinct from bg) |

All tokens live in `app/globals.css`.

## Delivery status

- [x] **Entrega 1 — Hero + scaffold** (this delivery)
- [ ] Entrega 2 — How It Works
- [ ] Entrega 3 — Choose Your Path
- [ ] Entrega 4 — Forms

## Notes on this delivery

- **Wordmark** (`components/Wordmark.tsx`): Barlow Condensed 500, wide tracking,
  per-letter deterministic baseline offset + micro-rotation for the
  intentionally misaligned look from the brief. Offsets are fixed (not random),
  so every render is identical. Tune `OFFSETS_Y` / `ROTATIONS` to taste.
- **Star** (`components/StarLogo.tsx`): the brand three-point star recreated as a
  faceted inline SVG so the hero renders self-contained — no missing-asset state.
  Slow pulse (scale + opacity, ~6.5s), not rotation, per brief. To use the
  original supplied asset instead, drop it in `public/` and swap the SVG body.
- **Hero** (`components/Hero.tsx`): no nav bar; star semi-transparent behind the
  headline; copy locked in the required size hierarchy (headline → subheadline →
  body → muted credibility line); content left-aligned for the asymmetric layout.
- `prefers-reduced-motion` is respected (animations disabled).
