# Copilot Instructions - pastor.activefaith.church

Canonical workspace instructions for this repo. Keep this file as the primary source for AI-agent defaults.

## Code Style
- Strict TypeScript across frontend and API. Do not introduce `any`.
- Angular formatting follows `angular-app/package.json` Prettier config: single quotes, `printWidth: 100`.
- Use 2-space indentation, UTF-8, trimmed trailing whitespace, and final newline.
- Frontend feature folders are kebab-case under `angular-app/src/app/`.

## Architecture
- Monorepo with two packages only:
	- `angular-app/`: Angular 21 SSR frontend (zone.js runtime, Tailwind v4).
	- `api/`: Azure Functions v4 (Node/TypeScript) served behind SWA at `/api/*`.
- Main request flow:
	- Frontend `ApiService` submits to `/api/submit`.
	- `api/src/functions/api-handler.ts` validates with Zod and persists to Azure Table Storage.
- Data store:
	- Table: `PastorSubmissions`
	- Partition key: `formType`
	- Supported form types: `speakerInvite`, `contact`, `mediaKit`
- Infrastructure lives in sibling repo `activefaith-infra` (`infra/app/pastor-*.tf`).

## Build and Test

From repo root:

```bash
npm run install:all   # installs angular-app and api dependencies
npm run build         # builds frontend
npm run test          # frontend Vitest suite
npm run test:api      # API tests via node:test
npm run typecheck     # frontend tsc --noEmit
npm run preflight     # typecheck + test + test:api + build
```

Frontend (`angular-app/`):

```bash
npm run test
npm run typecheck
npm run e2e
npm run e2e:headed
```

API (`api/`):

```bash
npm run build
npm run test
npm run start
```

Notes:
- No real lint gate is configured (`lint` is a placeholder).
- Quality gates are typecheck + tests + preflight.

## Conventions

### Angular conventions
- Standalone components only (do not set `standalone: true`).
- `ChangeDetectionStrategy.OnPush` on all components.
- Use `inject()` for DI.
- Use `input()` / `output()` functions, not `@Input()` / `@Output()` decorators.
- Use signals (`signal`, `computed`) for local/derived state.
- Use native control flow (`@if`, `@for`, `@switch`).
- Lazy-load route components via `loadComponent()`.
- Co-locate tests as `*.spec.ts`.

### API conventions
- Keep `api/src/functions/api-handler.ts` as the submission contract source of truth.
- Use Zod validation for all request payloads.
- Preserve honeypot anti-spam checks on submissions.
- Preserve POPIA consent semantics (transactional vs marketing consent).

### Integration boundaries
- Prefer extending `angular-app/src/app/services/api.service.ts` over ad hoc HTTP calls.
- Keep changes scoped to one package unless cross-package coordination is required.

## Pitfalls
- This repo uses zone.js (not zoneless); do not apply zoneless-only patterns.
- Local Functions development requires Azure Functions Core Tools (`func start`).
- There is no CI/CD pipeline yet; deployments are manual via SWA workflow.
- Use only approved pastor assets under `angular-app/public/assets/pastor/`.

## Key Files
- `angular-app/src/app/app.routes.ts` (route topology and lazy loading)
- `angular-app/src/app/services/api.service.ts` (frontend API integration)
- `api/src/functions/api-handler.ts` (validation, anti-spam, persistence)
- `api/src/functions/ping.ts` (health endpoint pattern)
- `angular-app/src/staticwebapp.config.json` (routing/auth behavior)
