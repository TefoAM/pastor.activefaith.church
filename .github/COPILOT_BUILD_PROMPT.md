# IMPLEMENTATION SPEC — Pastor Abraham Brand Platform (Angular 21 + Tailwind + Azure SWA)

## 0) What to build (match the mockup)

Build a **4-page responsive** marketing site with a consistent **dark navy top bar**, **hero banners** with photography + overlay, and clean white content areas.

Pages (routes):

1. `/` **Home** (hero + tagline + 3 highlight cards)
2. `/about` **About Pastor Abraham** (split hero with portrait on right + biography content)
3. `/media` **Sermons & Media** (hero + content sections “Latest Sermons” and “Podcast & Videos” with card grids)
4. `/invite` **Invite Me to Speak** (hero + event request form)

Global layout:

* **Sticky top nav bar** with logo (left), nav links (center), small utility icons (right).
* Hero sections are **full-width**, dark overlay, big serif headline.
* Content sections sit in a **centered max-width container** with clear headings and card grids.
* Mobile: nav collapses to hamburger; all grids become 1-column; form becomes stacked.

---

## 1) Tech stack (required)

* **Angular 21** (standalone components + Angular Router)
* **Tailwind CSS** for styling (no custom CSS except tokens)
* **Vitest** for unit tests via Angular CLI’s experimental unit test runner (Angular docs show Vitest runner support) ([Angular][1])
* **Playwright** for E2E (plus Playwright MCP for Copilot agent workflows) ([GitHub][2])
* **Chrome DevTools MCP** for debugging/perf checks via agent tooling ([GitHub][3])
* **Azure Static Web Apps** hosting + **GitHub Actions** deploy using `Azure/static-web-apps-deploy` ([GitHub][4])
* **Terraform** provisioning Azure Static Web App (use `azurerm_static_web_app` or AVM module) ([GitHub][5])

---

## 2) Visual design system (match the mockup)

### Colors (Tailwind theme tokens)

Create brand tokens in `tailwind.config.*`:

* `brand-navy`: very dark navy for header + hero overlay (primary background)
* `brand-ink`: slightly lighter navy for gradients
* `brand-gold`: muted gold for primary CTA buttons and small accents
* `brand-slate`: neutral text on light background
* `brand-divider`: light gray lines/borders

**Rule:** Hero uses `brand-navy` overlay with subtle gradient + blurred photo behind.

### Typography

* Headings: **serif** (high-contrast, “editorial” like the mockup)
* Body: **clean sans** (readable)
* Nav: uppercase, small, spaced tracking

Tailwind setup:

* Add `fontFamily: { serif: [...], sans: [...] }`
* Use classes:

  * H1: `text-4xl md:text-5xl lg:text-6xl font-serif font-semibold leading-tight`
  * H2: `text-2xl md:text-3xl font-serif font-semibold`
  * Body: `text-base leading-7 text-brand-slate`

### Layout rules

* Page container: `max-w-6xl mx-auto px-6`
* Section spacing: `py-12 md:py-16`
* Card spacing: 3-column desktop, 1-column mobile

  * Grid: `grid grid-cols-1 md:grid-cols-3 gap-6`

### Buttons

* Primary CTA (gold): `bg-brand-gold text-brand-navy font-semibold px-6 py-3 rounded-md hover:opacity-90 transition`
* Secondary CTA (outline): `border border-white/30 text-white px-6 py-3 rounded-md hover:bg-white/10 transition`

---

## 3) App architecture (Angular)

### Project structure

Use standalone components; keep everything under `src/app`:

```
src/app/
  app.routes.ts
  app.component.ts
  core/
    layout/
      shell.component.ts
      header.component.ts
      footer.component.ts
    ui/
      button.component.ts
      card.component.ts
      section-title.component.ts
  pages/
    home/
      home.page.ts
    about/
      about.page.ts
    media/
      media.page.ts
    invite/
      invite.page.ts
  data/
    sermons.ts
    podcasts.ts
    speaking-topics.ts
```

### Routing

* Define routes with lazy-loaded standalone pages.
* Shell layout wraps router outlet, header, footer.

---

## 4) Components to implement (pixel-intent from mockup)

### 4.1 Header (global)

**Sticky dark bar** with logo left, nav center, icons right.

Desktop header layout:

* Left: logo mark + wordmark (white)
* Center: nav links uppercase: `HOME / ABOUT / SERMONS & MEDIA / INVITE`
* Right: 3–5 icons (social/search/share) in white/gray

Mobile:

* Left: logo
* Right: hamburger icon
* Hamburger opens slide-down menu with same links, large tap targets.

Tailwind details:

* Wrapper: `sticky top-0 z-50 bg-brand-navy/95 backdrop-blur border-b border-white/10`
* Inner: `max-w-6xl mx-auto px-6 h-14 flex items-center justify-between`
* Nav: `hidden md:flex gap-8 text-xs tracking-widest uppercase text-white/80`
* Active link: `text-white border-b border-brand-gold pb-1`

### 4.2 Hero (reusable pattern)

Hero pattern used in all pages:

* Full-width section with background image + dark overlay
* Left-aligned headline + subhead
* Optional right-side portrait image (About page)
* Always include 1 primary CTA on Home and Invite pages

Hero base:

* Container height: `min-h-[420px] md:min-h-[480px]`
* Background: `bg-cover bg-center`
* Overlay: `absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy/40`

Home hero specifics (top-left mock):

* Headline (2 lines): “Activating Faith. Building Sustainable Churches.”
* CTA button below headline
* Background: preaching image with bokeh lights

Invite hero (bottom-right mock):

* H1: “Invite Me to Speak”
* Subhead: “Book Pastor Abraham for Your Next Event”

Media hero (bottom-left mock):

* H1: “Sermons & Media”
* Subhead: “Inspiring Messages & Resources”

About hero (top-right mock):

* Left column: title + subhead + short paragraph
* Right column: portrait image in a clean rectangle

---

## 5) Page-by-page requirements

### 5.1 Home (`/`)

Sections (in order):

1. **Hero**

* Background image
* Headline (serif)
* Primary CTA button (“Invite to Speak” or “Watch Sermon”)

2. **Tagline strip**

* White background
* Centered text: “Leadership. Discipleship. Impact”
* Use large tracking + bold, like mockup

  * `text-center text-xl md:text-2xl font-semibold text-brand-navy py-10`

3. **Highlight cards row (3 cards)**

* Three image cards with captions
* Each card: thumbnail + title
* Cards should look like media thumbnails (rounded, shadow, hover scale)

Data for cards can be placeholders.

### 5.2 About (`/about`)

Sections:

1. **Split Hero**

* Left: title “About Pastor Abraham”
* Subhead: “Empowering Leaders for a Sustainable Faith”
* Short paragraph (2–4 lines)
* Right: portrait image, cropped, rounded-sm

2. **Biography**

* H2 “Biography”
* Multi-paragraph text in a single column, max width ~ 70ch
* Insert one inline image block mid-way (as per mock, bottom edge of a photo peeks in)

Mobile:

* Portrait image stacks above biography content.

### 5.3 Sermons & Media (`/media`)

Sections:

1. **Media Hero** (dark overlay + background photo)
2. **Latest Sermons**

* H2 “Latest Sermons”
* 3 cards across on desktop, stacked on mobile
* Each card includes: thumbnail, title, date, “Watch” button

3. **Podcast & Videos**

* H2 “Podcast & Videos”
* Grid of 3–4 smaller cards

Add optional filter UI later; for now keep it simple.

### 5.4 Invite (`/invite`)

Sections:

1. **Invite Hero**
2. **Event Details form**

* White panel on white background with subtle border/shadow
* Desktop form is 2-column grid for small fields, then full-width message
* Fields:

  * Event Name (text)
  * Host Name / Church (text)
  * Date (date)
  * Duration (text or select)
  * Message (textarea)
* Submit button aligned right on desktop; full width on mobile.

Implementation:

* Use Angular **Reactive Forms**
* Validate required fields and show inline errors
* On submit: for MVP, log payload + show success toast
* Future: post to Azure Function (optional) — but keep static first.

---

## 6) Tailwind setup (Angular CLI)

Use Angular’s Tailwind integration (`ng add tailwindcss`) and keep Tailwind in `src/styles.css` as import. ([Angular][6])

Also:

* Add `@tailwindcss/postcss` plugin if manual setup is needed (per Angular docs). ([Angular][6])

---

## 7) Unit testing with Vitest

Use Angular CLI’s experimental unit test system with Vitest:

* Install `vitest` + `jsdom`
* Update `angular.json` test target to `@angular/build:unit-test` with `"runner": "vitest"` as shown in Angular docs. ([Angular][1])

Write tests for:

* Header renders nav links
* Hero component renders title + CTA
* Invite form validation

---

## 8) E2E testing with Playwright

Add Playwright for:

* Smoke test each route loads (200 OK)
* Visual sanity checks (screenshots) for Home/Media/Invite
* Form validation test (Invite)

### Also configure Playwright MCP for agent workflows

Install MCP server so Copilot can drive browsers in dev: ([GitHub][2])

Example VS Code MCP add (per Playwright MCP docs):

```bash
code --add-mcp '{"name":"playwright","command":"npx","args":["@executeautomation/playwright-mcp-server"]}'
```

---

## 9) Chrome DevTools MCP (performance + debugging)

Configure Chrome DevTools MCP so Copilot can:

* inspect console errors
* monitor network requests
* capture performance traces

Docs describe `chrome-devtools-mcp` as an MCP server exposing Chrome DevTools capabilities to coding agents. ([GitHub][3])

Use it during dev to:

* check LCP/CLS
* verify lazy-loading images
* confirm no console errors

---

## 10) Azure Static Web Apps deployment (GitHub)

### GitHub Action

Use the official action `Azure/static-web-apps-deploy` to build and deploy. ([GitHub][4])

### Secret

Create repository secret:

* `AZURE_STATIC_WEB_APPS_API_TOKEN` (deployment token) per GitHub docs. ([GitHub Docs][7])

### Workflow behavior

* PRs create preview environments
* Merges to `main` deploy production

---

## 11) Terraform (Azure provisioning)

Create `infra/` folder with Terraform:

* Resource group
* Static Web App (SWA)

Use `azurerm_static_web_app` directly or AVM module for SWA; AVM module explicitly targets Static Web Apps. ([GitHub][5])

**Important:** After provisioning, GitHub repo association + token workflow wiring is typically configured via Azure portal / repo secrets.

---

## 12) Implementation details Copilot must follow

### Angular conventions

* All components are **standalone**
* Use `ChangeDetectionStrategy.OnPush`
* Use `NgOptimizedImage` for all images
* Use route-level code splitting

### Accessibility

* Header hamburger has `aria-expanded`
* All buttons have visible focus rings
* Form fields have labels (not placeholders only)

### Performance

* Hero images: `fetchpriority="high"` only on home hero
* All media cards: lazy load thumbnails
* Avoid heavy JS libs; Tailwind only

---

## 13) Acceptance criteria (match mockup feel)

✅ Header dark/navy with centered nav links on desktop, hamburger on mobile
✅ Each page has a hero band with dark overlay + large serif title
✅ Home has tagline strip and 3-card row below
✅ Media page shows “Latest Sermons” grid and “Podcast & Videos” grid
✅ Invite page form matches 2-column desktop layout and stacked mobile layout
✅ Tailwind used for all styling (no component CSS beyond minimal)
✅ Unit tests run with Vitest via `ng test` config ([Angular][1])
✅ Playwright E2E tests cover route loading + invite form validation
✅ Deploys to Azure Static Web Apps via GitHub Actions + token secret ([GitHub Docs][7])

---

If you want, I can also generate:

* A **complete folder scaffold** (routes/components/data),
* A **Tailwind token file** with exact hex colors,
* A **GitHub Actions YAML** tailored to Angular build output,
* And Playwright tests that produce **baseline screenshots** for visual regression.

[1]: https://v20.angular.dev/guide/testing/unit-tests?utm_source=chatgpt.com "Experimental unit testing integration • Angular"
[2]: https://github.com/executeautomation/mcp-playwright?utm_source=chatgpt.com "GitHub - executeautomation/mcp-playwright: Playwright Model Context Protocol Server - Tool to automate Browsers and APIs in Claude Desktop, Cline, Cursor IDE and More 🔌"
[3]: https://github.com/mcp/chromedevtools/chrome-devtools-mcp?utm_source=chatgpt.com "MCP Registry | Chrome DevTools · GitHub"
[4]: https://github.com/Azure/static-web-apps-deploy?utm_source=chatgpt.com "GitHub - Azure/static-web-apps-deploy: Enable GitHub developers to deploy to Azure Static Web Apps using GitHub Actions"
[5]: https://github.com/Azure/terraform-azurerm-avm-res-web-staticsite?utm_source=chatgpt.com "GitHub - Azure/terraform-azurerm-avm-res-web-staticsite: Terraform Azure Verified Resource Module for Static Web App"
[6]: https://angular.dev/guide/tailwind?utm_source=chatgpt.com "Tailwind • Angular"
[7]: https://docs.github.com/en/enterprise-server%403.15/actions/how-tos/deploy/deploy-to-third-party-platforms/azure-static-web-app?utm_source=chatgpt.com "Deploying to Azure Static Web App - GitHub Enterprise Server 3.15 Docs"
