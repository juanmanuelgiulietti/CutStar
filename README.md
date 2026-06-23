# CUTSTAR — Marketing Landing Page

AI-powered short-form video edit engine for music labels, artist managers,
agencies, and independent artists. Send songs and footage, get back a full batch
of beat-synced, viral-optimized edits across multiple styles.

This repo is the marketing landing page: one page, four scroll sections,
dark / premium / editorial, desktop-first.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Framer Motion** — viewport fade/scale-in, the slow star pulse, and the
  click swap between path cards and forms
- **next/font** — Barlow Condensed (display / wordmark, weight 500) + Inter
  (body / UI)
- **CSS Modules** + design tokens — no UI framework; every button, input, and
  card is deliberately styled

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

Last verified production build: `next build` compiles successfully with no type
errors; 4/4 static pages generated; ~129 kB First Load JS on `/`.

## Design tokens (locked palette)

Defined in `app/globals.css`.

| Token | Value | Use |
|-------|-------|-----|
| `--color-bg` | `#0A0A0F` | Background |
| `--color-accent` | `#7C5CFC` | Violet — CTAs + small details only |
| `--color-text` | `#FFFFFF` | Text |
| `--color-surface` | `#1A1A24` | Card surfaces (visibly distinct from bg) |

Type scale, spacing, and easing tokens live in the same `:root` block.

## Project structure

```
app/
  globals.css        Design tokens + base styles
  layout.tsx         Fonts (Barlow Condensed + Inter), metadata
  page.tsx           Composes the four sections
components/
  Hero.tsx           Scroll 1 — hero
  StarLogo.tsx       Faceted three-point star (SVG) with slow pulse
  Wordmark.tsx       CUTSTAR wordmark with distorted baseline
  HowItWorks.tsx     Scroll 2 — staggered step cards
  ChooseYourPath.tsx Scroll 3 — two path cards (presentational)
  PathSwitcher.tsx   Scroll 3 + 4 — holds selected path, swaps cards/form
  forms/
    FormShell.tsx    Shared chrome: back control, heading, review note
    AgencyForm.tsx   Agency path form
    ArtistForm.tsx   Artist path form
    DropZone.tsx     Reusable drag-and-drop upload zone
    forms.module.css Shared form + dropzone styles
```

## Sections (per brief)

1. **Hero** — no nav bar; semi-transparent star behind the headline with a slow
   pulse (not rotation); locked copy in the required size hierarchy (headline →
   subheadline → body → muted credibility line); asymmetric layout.
2. **How It Works** — three video-placeholder cards (Upload / We handle the rest
   / Post), staggered asymmetrically (not a flat grid); scroll-triggered
   fade/scale-in.
3. **Choose Your Path** — two side-by-side cards (artist/creator and
   label/agency/management) with locked copy and accent CTAs.
4. **Forms** — clicking a card replaces both cards with that path's form only
   (click swap, not scroll), with an X/back to return.
   - **Artist**: Name, Email, Artist/Project Name, Upload song (1), Upload
     footage (max 2), submit "Send It". Uploads are polished drag-and-drop
     zones.
   - **Agency**: Name, Email, Company Name, dropdown
     (Label/Agency/Management/Other), submit "Request Access". No uploads.
   - Below both: "We review every application. Selected applicants receive a
     private access code."

## Implementation notes

- **Wordmark** (`Wordmark.tsx`): Barlow Condensed 500, wide tracking, with a
  deterministic per-letter baseline offset + micro-rotation for the
  intentionally misaligned look. Offsets are fixed, so every render is
  identical. Tune `OFFSETS_Y` / `ROTATIONS`.
- **Star** (`StarLogo.tsx`): the brand three-point star recreated as a faceted
  inline SVG so the hero renders self-contained (no missing-asset state). Slow
  pulse via scale + opacity (~6.5s). To use the original supplied asset, drop it
  in `public/` and swap the SVG body.
- **DropZone** (`forms/DropZone.tsx`): reusable, controlled component with drag
  states, click-to-browse, keyboard activation (Enter/Space), file-type + count
  validation, and removable file chips.
- **Accessibility**: `prefers-reduced-motion` disables animations; forms use
  labels, `role="alert"` on errors, and focus-visible rings throughout.

## Out of scope (next iterations)

- Form `onSubmit` handlers set a success state but do not POST to a backend yet.
- Desktop only, per brief (no mobile breakpoints).
- Star is an SVG recreation, not the original PNG asset.

## Delivery status

- [x] Entrega 1 — Hero + scaffold
- [x] Entrega 2 — How It Works
- [x] Entrega 3 — Choose Your Path
- [x] Entrega 4a — Form swap + agency form
- [x] Entrega 4b — Artist form drag-and-drop uploads

See `TESTING.md` for the manual QA checklist.
