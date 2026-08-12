---
type: session-log
project: Glitz & Glam Beauty Salon
date: 2026-08-12
status: complete
tags:
  - web
  - beauty-salon
  - portfolio
  - footer
  - services
  - graphics
---

# Glitz & Glam — Session Notes

## Project
Luxury one-page website for **Glitz & Glam Beauty Salon**, WAPDA Town, Lahore.
Stack: plain HTML / CSS / JS (no framework). Files:
- `index.html`
- `css/styles.css`
- `js/main.js`
- `assets/img/*`

## Session 1 — Portfolio/Gallery redesign
Replaced the old masonry gallery with an advanced portfolio:

- **Editorial showcase carousel** — 3 auto-rotating bridal looks (`og-bridal.jpg`, `hero-bride.jpg`, `hero-bride-alt.jpg`) with arrows, dots, hover-pause, keyboard nav.
- **Category filter bar** — All / Bridal / Makeup / Hair / Skin & Spa.
- **9-card portfolio grid** — tags, serif titles, hover zoom, staggered reveal.
- **Lightbox** — click any card/slide → full-size viewer with prev/next, ESC/arrow keys, caption, focus return.
- Downloaded 3 new images: `portfolio-party.jpg`, `portfolio-balayage.jpg`, `portfolio-glow.jpg`.

## Session 2 — Footer redesign
Rebuilt the footer as a luxury closing section (burgundy/near-black + champagne gold):
1. Top brand area — wordmark + ornament
2. Explore links
3. Services links
4. Visit Us — address, phone, WhatsApp button
5. Follow Our Work — Instagram / Facebook / WhatsApp icons
6. Large CTA band — "Your Beauty Moment Starts Here."
7. Bottom bar — copyright + Privacy/Terms

All `data-wa`, `data-instagram`, `data-facebook`, `data-phone-label`, `data-magnetic` hooks preserved so `CONFIG` in `js/main.js` still drives every link.

## Session 3 — Services ("What We Offer") advanced upgrade
- Category filter bar (All / Bridal / Makeup / Hair / Skin & Spa).
- **Featured flagship card** (Bridal Makeup) — full width, gold "Signature Service" chip, feature list.
- 5 standard cards — category label, numbered badge, feature checklist, "Book This Service →" links.
- Refactored JS filter into reusable `initFilter()` powering both portfolio and services.

## Session 4 — Decorative graphics
Added a cohesive set of luxury SVG graphics (all inline — no external sprite):

- **Section-title ornament dividers** — gold diamond flourish under 8 titles (About, Services, Bridal, Experience, Gallery, Reviews, Location, Appointment). Left-aligned on light sections, centered light variant in the appointment CTA. Reusable `.orn-divider` element.
- **Hero corner filigree** — champagne corner flourishes (top-left + bottom-right) plus 3 twinkling 4-point sparkles. Hidden on mobile, disabled under reduced motion.
- **Gold corner brackets** — appear on hover for about/bridal media frames (`.media-frame::before`) and static on the footer CTA (`.footer-cta::after`).
- **Appointment corner filigree** — light champagne corners at top-left / bottom-right.
- New CSS block: `DECORATIVE GRAPHICS` (before MOBILE MENU), responsive + reduced-motion handling added.
- Commit `d107e69`, deployed to **glitz-glam-salon.vercel.app** (HTTP 200 verified).

## Deploy
- GitHub repo created & pushed.
- Deployed on Vercel.

## Contact placeholders (to update in js/main.js → CONFIG)
- WhatsApp: `923000000000`
- Phone: `+923000000000`
- Instagram / Facebook: empty placeholders
