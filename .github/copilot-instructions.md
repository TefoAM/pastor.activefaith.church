# Copilot Instructions — pastor.activefaith.church

## Build, Test, and Lint

### From repo root
```bash
npm run install:all    # install both angular-app and api dependencies
npm run build          # build frontend
npm run test           # run frontend unit tests (Vitest)
npm run test:api       # run API tests (Node test runner)
npm run typecheck      # tsc --noEmit against angular-app
npm run preflight      # typecheck + test + test:api + build (run before pushing)
```

### Frontend (`angular-app/`)
```bash
npm run test                        # run all unit tests
npx vitest run src/app/contact      # run tests in a specific folder
npx vitest run src/app/app.spec.ts  # run a single test file
npm run e2e                         # Playwright e2e tests (Chromium)
npm run e2e:headed                  # e2e with visible browser
npm run typecheck                   # tsc --noEmit -p tsconfig.app.json
```

### API (`api/`)
```bash
npm run build && node --test dist/functions/api-handler.test.js  # run API tests
npm run start                                                    # func start (local Azure Functions)
```

No linter is configured yet.

## Architecture

Monorepo with two packages — no shared workspace tooling:

- **`angular-app/`** — Angular 21 frontend with SSR, hosted on Azure Static Web Apps (Free tier). Tailwind CSS 4 for styling.
- **`api/`** — Azure Functions v4 (Node 20, TypeScript) as SWA managed functions. Stateless — no sessions or in-memory state.
- **Infrastructure** — Terraform in a separate repo (`activefaith-infra/infra/app/pastor-*.tf`). Same resource group (`rg-activefaith`) as activefaith.church but separate SWA and storage account (`stpastorafaith`).

### Data flow
Frontend → `ApiService` → `/api/submit` (POST) → Zod validation + honeypot check → Azure Table Storage (`PastorSubmissions` table, partitionKey = formType).

Three form types: `speakerInvite`, `contact`, `mediaKit`.

### Key files
- `api/src/functions/api-handler.ts` — Single API handler with Zod schemas for all three form types, honeypot detection, and Table Storage persistence.
- `angular-app/src/app/app.routes.ts` — All routes with lazy-loaded components.
- `angular-app/src/app/services/api.service.ts` — Frontend HTTP client for `/api/*`.
- `angular-app/src/staticwebapp.config.json` — SWA routing config (SPA fallback, API exclusions).

## Conventions

### Angular
- Standalone components only (Angular 21 default — do NOT set `standalone: true`).
- `ChangeDetectionStrategy.OnPush` on all components.
- Signals for state, `computed()` for derived state.
- `input()` / `output()` functions — not `@Input()` / `@Output()` decorators.
- `inject()` function — not constructor injection.
- Native control flow: `@if`, `@for`, `@switch` — not `*ngIf`, `*ngFor`.
- Lazy-load all route components.
- Kebab-case feature folders under `angular-app/src/app/`.
- Tests co-located as `*.spec.ts` next to the component.

### API
- Zod for request validation.
- Honeypot anti-spam on all form endpoints (no reCAPTCHA).
- POPIA-compliant consent: distinguish transactional vs marketing consent.
- Anonymous auth for `/api/submit`, function-level auth for `/api/submissions`.

### Code style
- Strict TypeScript; avoid `any`.
- Single quotes, `printWidth: 100` (Prettier config in `angular-app/package.json`).
- UTF-8, 2-space indentation, trim trailing whitespace, final newline.

### Scoping
- Keep changes scoped to one package (`angular-app` or `api`) when possible.
