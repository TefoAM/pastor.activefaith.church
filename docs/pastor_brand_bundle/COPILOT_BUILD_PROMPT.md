# COPILOT BUILD PROMPT --- Pastor Abraham Scalable Ministry Brand Platform

This prompt instructs GitHub Copilot to build a national-level ministry
brand website using:

-   Angular 21 (standalone components)
-   Tailwind CSS
-   Vitest
-   Playwright + Playwright MCP
-   Chrome DevTools MCP
-   Terraform
-   Azure Static Web Apps
-   GitHub Actions

------------------------------------------------------------------------

## Image Asset Usage (DO NOT RENAME FILES)

All images must be placed in:

src/assets/images/

Use the following filenames exactly:

-   pastor-portrait.jpg
-   speaking-hero.jpg
-   strategy-card.jpg
-   leadership-card.jpg
-   discipleship-card.jpg
-   hero-main.jpg
-   topic-insight.jpg
-   testimonial-1.jpg
-   testimonial-2.jpg
-   gallery-1.jpg
-   ministry-1.jpg

------------------------------------------------------------------------

## Image Placement Rules

### Home Page (/)

Hero background: - strategy-card.jpg

3 Highlight Cards: - Leadership → leadership-card.jpg - Discipleship →
discipleship-card.jpg - Impact → hero-main.jpg

Testimonial background: - testimonial-1.jpg

Gallery tile: - gallery-1.jpg

------------------------------------------------------------------------

### About Page (/about)

Right-side portrait in hero: - pastor-portrait.jpg

Inline teaching image: - topic-insight.jpg

------------------------------------------------------------------------

### Sermons & Media (/media)

Hero background: - ministry-1.jpg

Latest Sermons thumbnails: - topic-insight.jpg - speaking-hero.jpg -
gallery-1.jpg

Podcast & Videos thumbnails: - strategy-card.jpg - leadership-card.jpg -
discipleship-card.jpg

------------------------------------------------------------------------

### Invite Page (/invite)

Hero background: - speaking-hero.jpg

Supporting section image: - testimonial-1.jpg

------------------------------------------------------------------------

## UI Requirements

-   Sticky dark navy top navigation
-   Serif headlines
-   Clean white content sections
-   Dark cinematic hero overlays
-   Responsive grid layout
-   Gold CTA buttons
-   Angular standalone architecture
-   Reactive forms for Invite page
-   OnPush change detection
-   NgOptimizedImage for all images

------------------------------------------------------------------------

## Testing Requirements

Unit Tests: - Header renders links - Hero renders title - Invite form
validates

E2E Tests (Playwright): - Routes load successfully - Invite form
validates and submits

------------------------------------------------------------------------

## Deployment

-   Azure Static Web Apps
-   GitHub Actions
-   Terraform infra provisioning
-   staticwebapp.config.json for SPA routing

------------------------------------------------------------------------

## Acceptance Criteria

-   Layout visually matches mockup structure
-   All specified images used in correct locations
-   Responsive across mobile & desktop
-   Lighthouse-friendly performance
-   CI passes
-   Deploys automatically on merge to main
