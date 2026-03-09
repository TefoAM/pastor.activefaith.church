# Pastor Abraham Tshabuse — Scalable National Ministry Brand Platform
## Master Engineering & Product Plan

---

## 1. Strategic Objective
Build a **national-level ministry brand platform** that:
- Positions Pastor Abraham as a governance-minded, leadership-focused, faith-activation voice.
- Supports conference invitations and inter-church collaboration.
- Showcases sermons, philosophy, discipleship frameworks, and impact.
- Deploys via Azure Static Web Apps with enterprise-grade DevOps.

This is not just a church website. This is a scalable influence platform.

---

## 2. Technology Stack (Mandatory)

### Frontend
- Angular 21 (standalone components)
- Angular Router (lazy loaded routes)
- ChangeDetectionStrategy.OnPush
- NgOptimizedImage for all images
- Tailwind CSS

### Testing
- Vitest (Angular CLI experimental unit test runner)
- Playwright (E2E)
- Playwright MCP
- Chrome DevTools MCP

### Infrastructure
- Terraform
- Azure Static Web Apps
- GitHub Actions (CI/CD)
- staticwebapp.config.json for SPA routing

---

## 3. Repository Architecture

```text
/
├─ infra/
├─ .github/
│  └─ workflows/
├─ src/
│  ├─ app/
│  │  ├─ core/
│  │  ├─ shared/
│  │  ├─ pages/
│  │  └─ app.routes.ts
│  ├─ assets/
│  │  ├─ images/
│  │  └─ content/
│  ├─ styles.css
│  └─ index.html
├─ e2e/
├─ staticwebapp.config.json
├─ tailwind.config.js
└─ package.json
```

---

## 4. Image Asset Strategy (DO NOT RENAME FILES)
Place all images in: `src/assets/images/`

Required filenames:
- pastor-portrait.jpg
- speaking-hero.jpg
- strategy-card.jpg
- leadership-card.jpg
- discipleship-card.jpg
- hero-main.jpg
- topic-insight.jpg
- testimonial-1.jpg
- testimonial-2.jpg
- gallery-1.jpg
- ministry-1.jpg

---

## 5. Image Placement Map (Exact Usage)

### Home (/)
- Hero background: strategy-card.jpg
- Highlight Cards: Leadership → leadership-card.jpg; Discipleship → discipleship-card.jpg; Impact → hero-main.jpg
- Testimonial background: testimonial-1.jpg
- Gallery tile: gallery-1.jpg

### About (/about)
- Right-side hero portrait: pastor-portrait.jpg
- Inline teaching image: topic-insight.jpg

### Sermons & Media (/media)
- Hero background: ministry-1.jpg
- Latest Sermons thumbnails: topic-insight.jpg; speaking-hero.jpg; gallery-1.jpg
- Podcast & Videos thumbnails: strategy-card.jpg; leadership-card.jpg; discipleship-card.jpg

### Invite (/invite)
- Hero background: speaking-hero.jpg
- Supporting section image: testimonial-1.jpg

---

## 6. UI & Design System
- Dark/navy sticky top navigation
- Serif headlines + sans body
- Gold primary CTA
- Clean white sections with disciplined spacing
- Responsive grid layouts

---

## 7. Page Architecture

### Home
1) Dark hero
2) Tagline strip
3) 3-card highlight row
4) Featured media
5) Testimonials
6) Footer CTA

### About
1) Split hero layout
2) Biography
3) Ministry philosophy
4) Leadership & governance

### Media
1) Dark hero
2) Latest sermons grid
3) Podcast & videos grid

### Invite
1) Dark hero
2) Event details form (Reactive Forms)

---

## 8. Testing Plan
### Unit tests (Vitest)
- Header renders navigation
- Hero renders title + CTA
- Invite form validation

### E2E (Playwright)
- Route loading tests
- Invite submission test
- Screenshot sanity tests

---

## 9. MCP Configuration
Create `mcp.json`:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    },
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    }
  }
}
```

---

## 10. Azure Deployment
- GitHub secret: `AZURE_STATIC_WEB_APPS_API_TOKEN`
- Workflows: `ci.yml`, `deploy.yml`, `terraform.yml`
- SPA routing: rewrite to `index.html`

---

## 11. Terraform Provisioning
Provision:
- Resource Group
- Azure Static Web App
Output deployment token for GitHub secret.

---

## 12. Acceptance Criteria
- Matches dark/navy hero mock structure
- All images used exactly as mapped
- Fully responsive
- Lighthouse optimized
- CI passing
- Auto-deploy on merge to main

---

End of Master Plan.
