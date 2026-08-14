---
type: session-log
project: Beauty Salon Demo Template
date: 2026-08-14
status: deployed
tags:
  - web
  - beauty-salon
  - demo-template
  - preloader
  - hero
  - animation
  - ui-polish
---

# Session — Makeup-Brush Preloader + Hero Styling

## Objective
Complete the two pending items from the previous session:
1. **Advanced makeup-brush preloader** — a brush that sweeps across the screen
   painting a shimmering gold stroke, leaving powder sparkles behind, then the
   wordmark reveals.
2. **More stylish hero section** — premium editorial upgrades while keeping the
   existing luxury burgundy/black/cream/champagne-gold direction.

## What shipped

### 1. Makeup-brush preloader (`index.html` → `css/styles.css` → `js/motion.js`)
Replaced the old logo-image + line preloader with a choreographed brush animation:
- **SVG makeup brush** (gradient handle, ferrule, bristles) that sweeps left→right
  across the stage (`@keyframes preSweep`, ~1.5s, `--ease`).
- **Gold stroke** the brush paints behind it (`preloader-stroke`, `scaleX 0→1`)
  with a travelling champagne shimmer (`preShimmer`).
- **Powder sparkles** that linger where the brush passed (`preloader-powder`, 4
  particles with staggered delays).
- Wordmark ("Luxe & Bloom / Beauty Salon") reveals after the sweep (`preWord`,
  delayed to 1.05s).
- Preloader fade-out bumped to `0.9s` starting `1.75s`; `motion.js` fail-safe
  timer raised `1700ms → 2700ms` so the animation isn't cut short.
- All elements disabled under `prefers-reduced-motion`.

### 2. Hero styling upgrades
- **Cinematic grain overlay** — subtle animated film-grain (`hero-grain`, inline
  SVG `feTurbulence` data-URI, steps-animated translate; disabled under reduced
  motion).
- **Rotating "Est." stamp** — luxury circular badge bottom-right (desktop only,
  hidden ≤900px): circular text "LUXURY BEAUTY • BRIDAL ATELIER" rotating
  (`stampSpin` 22s linear) around a glassy serif "Est." core with champagne ring.
- **Refined index label** — "No. 01 — Editorial" now has a fading champagne rule
  line before it (`hero-index::before`).

## Verification
- Headless Chrome (Edge-style `--dump-dom`): no horizontal overflow at 1440px and
  375px; stamp hidden on mobile; grain/stamp/brush present; hero title intact.
- CSS braces balanced (906/906); SVG tags balanced; all paths self-close.

## Deploy
- Committed + pushed to `taimoor148/glitz-glam-salon`.
- Deployed to Vercel production: **https://glitz-glam-salon.vercel.app**
- Obsidian vault: `F:\women salon\.obsidian` (registered), note in `Session Notes/`.
