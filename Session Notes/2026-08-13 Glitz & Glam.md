---
type: session-log
project: Glitz & Glam Beauty Salon
date: 2026-08-13
status: complete
tags:
  - web
  - beauty-salon
  - polish
  - accessibility
  - seo
  - booking
  - design-deliverables
---

# Glitz & Glam — Session Notes (Polish Pass)

## Objective
Do all proposed polish except **launch readiness** (real contact values + hosting were explicitly skipped — those stay placeholders in `js/config.js`).

## What shipped

### Site (index.html / css/styles.css / js/main.js / js/config.js)
1. **Preloader wordmark** — "Glitz & Glam / Beauty Salon" letter-spaced fade-in below the logo + breathing champagne bloom (`.preloader-word`, `preBloom`/`preWord` keyframes).
2. **Section-title word reveal** — masked word-by-word sweep (`main.js` `initWordReveal`, TreeWalker splitter skips `<em>` accents; no-op under reduced motion; `section-title` transform neutralized so the reveal-up fade + word sweep combine).
3. **Lightbox transition polish** — figure entrance scale/settle + img crossfade.
4. **Services glow + parallax depth** — champagne radial glow breathes on `.svc-row:hover` (existing `[data-parallax]` gives depth).
5. **Booking modal (WhatsApp handoff)** — `#booking` dialog with service/date/time/notes form, config-driven selects (`CFG.prices`, `CFG.timeSlots`), date-min = today, pre-selected service from any `[data-open-booking]` (svc arrows/names/CTAs), submit builds `wa.me` deep link, focus trap, ESC/overlay close, focus restore. Mobile row-tap routes into the modal.
6. **Menu & Prices section** — `#menu` rendered from `CFG.prices` (4 category groups, 10 rows), note pointing to free consultation.
7. **Local SEO** — FAQ section (`#faq`, 5 `<details>`) + matching `FAQPage` JSON-LD in head.
8. **Accessibility** — focus traps (booking + lightbox), skip-link now targets `#home` (hero `tabindex="-1"`), modal form labels.
9. All prior CTAs converted to `data-open-booking` (nav CTA, hero, 6 service arrows + names, footnote, bridal, gallery, reviews, appointment).

### Design deliverables (new folders, committed)
- `print/price-list.html` — A4 print/PDF-ready price list, rendered from `../js/config.js` (single source of truth), with @page + print CSS.
- `print/visiting-card.html` — 85×55 mm front/back card (page 1 / page 2 for duplex), screen preview + print CSS.
- `social/social-pack.html` — IG post (1080×1080), IG story (1080×1920), FB cover (820×312), all with inline logo + brand tokens; PNG exports saved alongside (`*@2x.png` at 2× for print).

## Verification
- Headless Chrome suite (`C:\Users\Admin\AppData\Local\Temp\opencode\test-salon-polish.js`): 33 checks, **ALL PASS** — preloader clears, no overflow @1280/@320, 21 word-wraps / 0 em-wraps, 10 price rows + 4 cats revealed after scroll, 5 FAQ items, JSON-LD, images load, zero console/page/network errors, booking opens/prefills/wa.me URL/close, focus traps wrap both directions (CDP-focus + real keyboard), reduced-motion path (no word-split, rows visible, counters settled).
- Print pages: clean load, rows=10, no overflow, no errors.

## Known notes
- Headless focus quirks (programmatic `.focus()` during event handlers sometimes doesn't stick) — use Puppeteer `page.focus()`/`page.keyboard` (CDP) for trap tests; traps verified with real keyboard.
- Prices/slots are **sample placeholders** — confirm with salon before launch.
- `preview.html` remains untracked scratch (logo preview) — deliberately not committed.

## Commits
- `156e673` — press physics + carousel Ken Burns (prev session work, verified here)
- `64b63d5` — Polish pass II (this session): booking modal, price list, FAQ+schema, word reveal, focus traps, print + social deliverables

## Deploy
Not deployed this session (launch readiness intentionally skipped — config placeholders remain).
