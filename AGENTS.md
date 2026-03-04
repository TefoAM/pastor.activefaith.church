# Project Guidelines — pastor.activefaith.church

## Code Style
- Strict TypeScript; avoid `any`.
- No `.editorconfig` — formatting governed by Prettier config in `angular-app/package.json`: single quotes, `printWidth: 100`.
- Indentation: 2 spaces. UTF-8, trim trailing whitespace, final newline.
- Standalone components (do NOT set `standalone: true` — Angular 21 default); tests co-located as `*.spec.ts`.
- Kebab-case feature folders under `angular-app/src/app/`.

## Architecture
- Monorepo: Angular 21 frontend in `angular-app/`, Azure Functions v4 backend in `api/`.
- Frontend uses **zone.js** (not zoneless) and SSR/hybrid rendering via SWA hosting.
- All routes **lazy-loaded** via `loadComponent()` — see `angular-app/src/app/app.routes.ts` (8 routes).
- `ChangeDetectionStrategy.OnPush` on **all** components.
- API: single handler at `api/src/functions/api-handler.ts` (Zod validation) + `api/src/functions/ping.ts`.
- Data: **Azure Table Storage** (`stpastorafaith` account, `PastorSubmissions` table, partitionKey = formType). NOT Cosmos DB.
- Services: `api.service.ts`, `error-handler.service.ts`, `monitoring.service.ts`.
- Infrastructure: `activefaith-infra/infra/app/pastor-*.tf`, same resource group (`rg-activefaith`).

## Build and Test
- `npm run install:all` — installs both `angular-app/` and `api/` dependencies.
- `npm run preflight` — `typecheck + test + test:api + build` (run before pushing).
- `npm run test` — Vitest (frontend). `npm run test:api` — Node `--test` runner (API).
- `npm run e2e` — Playwright (Chromium). `npm run e2e:headed` — with visible browser.
- `npm run typecheck` — `tsc --noEmit -p tsconfig.app.json`.
- API: `cd api && npm run build && node --test dist/functions/api-handler.test.js`.

## Project Conventions
- Three form types: `speakerInvite`, `contact`, `mediaKit`.
- Honeypot anti-spam on all forms — no reCAPTCHA (simpler than activefaith.church).
- POPIA-compliant consent: distinguish transactional vs marketing consent.
- 11 approved images in `angular-app/public/assets/pastor/` — do NOT add external images.
- Keep changes scoped by package (`angular-app` vs `api`).

## Angular Patterns (enforced in all components)
- `inject()` function — no constructor injection.
- `input()` / `output()` functions — not `@Input()` / `@Output()` decorators.
- Signals for state (`signal()`, `computed()`).
- Native control flow: `@if`, `@for`, `@switch`.
- `NgOptimizedImage` for all static images (`ngSrc` + `fill`).
- Lazy-load all route components.

## Integration Points
- Frontend-to-API: through `ApiService` at `/api/*`.
- DNS: `pastor.activefaith.church` CNAME to SWA via Cloudflare zone (`activefaith.church`).
- Table Storage account: `stpastorafaith` (separate from church site storage).
- No CI/CD pipeline yet — manual deploy via SWA CLI.
