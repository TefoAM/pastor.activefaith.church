# Handover — pastor.activefaith.church Frontend Redesign

**Date:** 2026-02-26
**Status:** Build passes, not yet deployed, no git repo initialized

---

## What Was Done

### 1. Image Asset Pipeline

Moved 11 production images from `C:\Users\Tefo.Motaung\Downloads\images\assets` into `angular-app/public/assets/pastor/`. Renamed all files from Facebook/social-media IDs to semantic developer-friendly names:

| File | Size | Usage |
|---|---|---|
| `hero-main.jpg` | 288 KB | Home hero, Invite hero |
| `speaking-hero.jpg` | 244 KB | Speaking hero, Topic-detail hero |
| `leadership-card.jpg` | 123 KB | Home topic card (Leadership) |
| `discipleship-card.jpg` | 84 KB | Home topic card (Discipleship) |
| `strategy-card.jpg` | 80 KB | Home topic card (Church Strategy) |
| `ministry-1.jpg` | 129 KB | Home gallery, Topic-detail sidebar |
| `gallery-1.jpg` | 31 KB | Home gallery |
| `testimonial-1.jpg` | 170 KB | Home gallery, Speaking sidebar testimonial |
| `testimonial-2.jpg` | 170 KB | Speaking sidebar testimonial |
| `topic-insight.jpg` | 136 KB | Speaking sidebar, Topic-detail sidebar |
| `pastor-portrait.jpg` | 341 KB | Invite sidebar portrait |

**Rule:** These are the ONLY images to be used. Do not pull images from other projects or external sources.

### 2. Cleanup

- Deleted 16 stale `FB_IMG_*.jpg` files from root `assets/` folder (cross-project copies from activefaith.church)
- Removed ChatGPT mockup PNGs from root (those are design guides, not production assets)

### 3. Template Redesign (4 pages)

All templates now use real images via `NgOptimizedImage` (`ngSrc` + `fill` directive) instead of gray placeholders.

#### Home (`home.html`) — 7 images
- **Full-bleed hero** with `hero-main.jpg`, gradient overlay (`from-pastor-navy/80`), dual CTAs (Invite + Explore Topics)
- **Speaking Topics section** — 3 image-driven cards with hover scale/shadow effects, linked to specific topic detail routes
- **Ministry Gallery** — 3-column responsive grid showcasing ministry moments
- **CTA Banner** — Full-width pastor-navy section with centered invite call-to-action

#### Speaking (`speaking.html`) — 4 images
- **Hero** with `speaking-hero.jpg` and descriptive subtitle
- **Topic list** redesigned from flat border-bottom items to bordered cards with hover gold accent and arrow animation
- **Sidebar** — testgimonial cards with images + quote text, pastor image below, prominent CTA button
- Added `topic-insight.jpg` as supplementary sidebar image

#### Topic Detail (`topic-detail.html`) — 3 images
- **Hero** with reused `speaking-hero.jpg` and dynamic topic title
- Bullet points for audience types and session formats now use gold dot indicators
- **Sidebar** — two image cards (Core Insights + Pastor in Ministry) with rounded styling
- CTA panel remains inside content area with topic-specific query param

#### Invite (`invite.html`) — 2 images
- **Hero** with `hero-main.jpg` reuse and "Book a Speaking Engagement" subtitle
- **Sidebar** completely redesigned: pastor portrait card with bio blurb + "What to Expect" navy info box with 4 checkmark items
- Success state now has a large green checkmark icon
- Form structure unchanged (honeypot, all fields, consent checkbox intact)

### 4. Component TypeScript Updates

- `invite.ts` — Added `RouterLink` to imports (needed for `routerLink` on privacy policy link and hero navigation)
- All 4 components retain `NgOptimizedImage` in imports — now actively used (zero build warnings)

---

## Build Verification

```
npx ng build → SUCCESS (0 warnings, 0 errors)
7 routes prerendered
Output: angular-app/dist/pastor-app
```

---

## Design System Used

| Token | Value | Usage |
|---|---|---|
| `--pastor-navy` | `#1B2A4A` | Primary dark, heroes, CTAs, headings |
| `--pastor-gold` | `#C5A55A` | Accent, links, hover states, labels |
| `--pastor-charcoal` | `#2D2D2D` | Body text |
| `--pastor-ivory` | `#FAF8F5` | Background sections |
| Headings font | Playfair Display | Serif, 400–700 |
| Body font | Montserrat | Sans-serif, 300–700 |
| `.btn-pastor` | Gold bg, white text | Primary CTA |
| `.btn-pastor-outline` | Gold border, transparent bg | Secondary CTA |

---

## What's NOT Done

1. **No git repo** — `pastor.activefaith.church` has no `.git`. Need `git init` + first commit + push to remote.
2. **No visual verification** — Templates haven't been visually inspected in browser. Should use `npx ng serve` or Playwright screenshots to validate layout.
3. **About, Media, Contact pages** — Still have no images (no `NgOptimizedImage` usage). May need image treatment if desired.
4. **No unit tests updated** — Existing `home.spec.ts` and `invite.spec.ts` may need adjustments for new template structure.
5. **No E2E tests written** — Playwright config exists but no specs for the pastor site yet.
6. **Image optimization** — Images are raw JPGs (31–341 KB). Consider WebP conversion or responsive `srcset` for production performance.
7. **Deployment** — SWA infrastructure exists in `activefaith-infra` but no CI/CD pipeline is set up for this project yet.

---

## Key Constraints

- **Images are sacred** — The 11 images in `angular-app/public/assets/pastor/` must never be deleted. They are the only approved assets.
- **Project independence** — This project shares NO content with `activefaith.church` or `admin-portal`. Infrastructure shares the same resource group but content is fully independent.
- **Table Storage, not Cosmos DB** — Backend uses Azure Table Storage (`stpastorafaith` account, `PastorSubmissions` table), not Cosmos DB.
