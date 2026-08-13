---
type: session-log
project: Beauty Salon Demo Template
date: 2026-08-13
status: deployed
tags:
  - web
  - beauty-salon
  - demo-template
  - config-driven
  - rebrand
  - ui-polish
---

# Beauty Salon — Demo Template Conversion

## Objective
Turn the Glitz & Glam site into a **generic demo template** so it can be sent to
any beauty salon. Removed all "Glitz & Glam / WAPDA Town / Lahore" branding and
made brand + location config-driven so a real salon can be dropped in by editing
one file (`js/config.js`).

**Demo identity:** "Luxe & Bloom Beauty Salon" with **location intentionally left
empty** — the demo is mailed to many salons, not one specific salon. Empty
location gracefully hides the hero location line, media badge, map panel/link and
address block, and swaps "Find Us in <Area>" / "Loved & Trusted in <Area>" for
"Get in Touch" / "Loved & Trusted Everywhere".

## What shipped

### Config-driven rebrand (`js/config.js` → `js/main.js`)
- Added `brand` block (wordmark lines, `amp` toggle, full name, sub) and
  `location` block (area, areaPhase, city, country, postal, street, areaServed).
- New `applyBrand()` in `main.js` runs **before** word-reveal/reveal observers so
  section titles still get the masked word-sweep. It updates:
  - `<title>`, meta description/keywords/author, OG + Twitter tags, JSON-LD
  - preloader wordmark, nav brand, hero eyebrow/sub/location, trust strip
  - statement kicker + note, about intro/CTA/badge/alt, bridal stamp + caption,
    Experience title, gallery intro, Reviews title, appointment sub, contact
    title, address, map label/sub, footer wordmark/tagline/address/grandword/
    colophon.
- WhatsApp / phone / social / hours / prices were already config-driven
  (`data-wa`, `data-phone`, `data-instagram`, `data-facebook`, `data-map-link`,
  `data-hours-list`, `data-pricelist`) — kept intact.
- Demo placeholders: brand "Luxe & Bloom" (wordmark lines Luxe + Bloom, `amp`),
  sub "Beauty Salon", location **all empty strings**, `mapsUrl` empty, WhatsApp
  `920000000000`, phone `+920000000000`.
- `applyBrand()` is **idempotent and reversible**: re-invoking it with a location
  set (e.g. via the new runtime hook `GLAZ.applyBrand()` after editing
  `window.GLAZ`) re-shows every hidden location element. All show/hide paths
  explicitly reset `style.display` so a no-location→location pass works.

### Deliverables (now read brand + location from config)
- `print/price-list.html` — brand, tagline and location pulled from `GLAZ.brand`
  / `GLAZ.location`.
- `print/visiting-card.html` — same for both card faces + stage title.
- `social/social-pack.html` — brand, area/city and review meta pulled from config.
- All three got an SVG favicon link (removes stray `/favicon.ico` 404).

### Graphics
- `assets/logo-mark.svg` + `assets/favicon.svg`: replaced the "G&G" serif monogram
  with a neutral four-point sparkle mark inside the existing diamond frame.

## Verification
- New suite (`test-salon-demo.js`): **35 checks, ALL PASS** — no stale
  Glitz/WAPDA/Lahore/"Your Salon" in rendered output, every brand/location
  injection point verified, JSON-LD correct, WhatsApp/meta links from config,
  print/social pages load with no errors. Also verifies the **location-optional
  toggling**: with empty location the location UI is hidden, then after setting
  `GLAZ.location.*` + `mapsUrl` and calling `GLAZ.applyBrand()` everything
  reappears.
- Existing polish suite (`test-salon-polish.js`): **ALL PASS** — word-reveal
  still wraps titles (19), booking modal/focus traps/lightbox/reduced-motion all
  green.

## How to rebrand for a salon
Edit `js/config.js` only:
1. `brand.*` — wordmark lines + business name.
2. `location.*` — address + area. Leave **empty to keep the location-free demo
   look**; fill in to show address/map/badge automatically.
3. `whatsapp`, `phone`, `phoneDisplay`, `instagram`, `facebook`, `mapsUrl`
   (leave `mapsUrl` empty to hide the map link).
4. `openingHours`, `hoursNote`, `rating`, `reviewCount`.
5. `prices`, `timeSlots`, `bookingGreeting`.
For live preview without a reload: mutate `window.GLAZ` then call
`window.GLAZ.applyBrand()`.

## Known notes
- Prices/slots are sample placeholders — confirm with each salon.
- `preview.html` remains untracked scratch (logo preview) — deliberately not committed.
- `.obsidian/*` workspace changes are from opening session notes — not part of the rebrand.

## Deploy
Not deployed — this is a demo/template build. Deploy per-salon when a client is onboarded.

---

## Session 2 — Section corner polish (rounded card look)

User asked (Roman Urdu) to round the section corners for a more stylish look.

**What changed** (`css/styles.css` only, `.section` base rule):
- Sections are now inset **rounded cards** instead of full-width flat bands:
  - `margin-inline: clamp(0px, 3vw, 44px)` — sections pull in from the viewport
    edges (full-width on small screens, inset on desktop).
  - `margin-block: clamp(0px, 1.6vw, 22px)` — breathing room between cards.
  - `border-radius: clamp(20px, 3vw, 40px)` — rounded corners on every section.
  - `border: 1px solid rgba(110, 31, 44, 0.14)` — hairline wine border.
  - `box-shadow: 0 34px 68px -42px rgba(40, 15, 22, 0.4)` — soft floating shadow.
- Slightly reduced vertical padding (`clamp(56px, 7vw, 104px)`) so the margins
  keep overall rhythm.

**Verification:**
- Full-page screenshot at 1440×1000: hero + footer stay full-width, all `main`
  sections are inset rounded cards with the alternating cream/ink backgrounds
  intact.
- Programmatic layout check: no horizontal overflow at 1440 or 320 (`scrollW ==
  clientW`), hero spans 0→1440, footer spans 0→1440, sections inset ~43px each
  side, 22px gaps between cards, no clipping.
- Polish suite (`test-salon-polish.js`) unaffected (CSS-only change, no DOM).

**Status:** committed & pushed, deployed to Vercel.