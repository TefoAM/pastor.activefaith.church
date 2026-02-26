# Project Guidelines — pastor.activefaith.church

## Code Style
- Strict TypeScript; avoid `any`.
- Follow `.editorconfig`: UTF-8, 2 spaces, trim trailing whitespace, final newline.
- Single quotes, `printWidth: 100` (from `angular-app/package.json` prettier config).
- Angular standalone components with signal-first patterns; tests co-located as `*.spec.ts`.
- Use kebab-case feature folders under `angular-app/src/app/`.

## Architecture
- Monorepo split: Angular frontend in `angular-app/`, Azure Functions backend in `api/`.
- Frontend is SSR/hybrid via Angular SSR with SWA hosting.
- API uses Azure Functions v4 with **Azure Table Storage** (not Cosmos DB) for form submissions.
- Form data persisted to `PastorSubmissions` table with partitionKey = formType.
- Infrastructure lives in `activefaith-infra/infra/app/pastor-*.tf`, sharing the same resource group.

## Build and Test
- From repo root: `npm run install:all`, `npm run start`, `npm run build`, `npm run test`, `npm run test:api`, `npm run typecheck`, `npm run preflight`.
- Frontend (`angular-app`): `npm run build`, `npm run test` (Vitest), `npm run e2e` (Playwright), `npm run typecheck`.
- API (`api`): `npm run build`, `npm run test`.

## Project Conventions
- Three form types: `speakerInvite`, `contact`, `mediaKit`.
- Honeypot anti-spam on all forms.
- POPIA-compliant consent flows: transactional vs marketing.
- No reCAPTCHA (simpler than activefaith.church); rely on honeypot + SWA rate limiting.
- Keep changes scoped by package (`angular-app` vs `api`).

## Angular Best Practices
- Always use standalone components (do NOT set `standalone: true` — Angular 21 default).
- Use signals for state, `computed()` for derived state.
- Use `input()` and `output()` functions instead of decorators.
- Set `changeDetection: ChangeDetectionStrategy.OnPush`.
- Use native control flow (`@if`, `@for`, `@switch`).
- Use `inject()` function instead of constructor injection.
- Lazy-load route components.

## Integration Points
- Frontend-to-API: through `ApiService` at `/api/*`.
- Shared infrastructure: same Azure resource group (`rg-activefaith`), same Cloudflare zone (`activefaith.church`).
- DNS: `pastor.activefaith.church` subdomain CNAME to SWA.
- Table Storage account: `stpastorafaith` (separate from church site storage).
