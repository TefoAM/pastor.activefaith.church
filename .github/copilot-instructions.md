# Copilot Instructions - pastor.activefaith.church

Canonical workspace instructions for this repo. Keep this file as the primary source for AI-agent defaults.

## Agent Roles

### ORCHESTRATOR (Delegator Only)
**The ORCHESTRATOR does NOT execute tasks — it ONLY delegates.**

Responsibilities:
- Analyze TODO.md and identify Ready tasks
- Route tasks to appropriate executor agents (CODER, TESTER, REVIEWER, COMMENTATOR)
- Create file-based handoffs via `.ai/inbox/<role>.md` files
- Update task status in TODO.md (Ready → InProgress → InTest → Done)
- Coordinate cross-agent workflows

Constraints:
- DOES NOT write code
- DOES NOT write tests
- DOES NOT write documentation
- DOES NOT execute any implementation work
- ONLY coordinates and delegates

### CODER (Executor)
**The CODER executes implementation tasks.**

Responsibilities:
- Implement frontend features (Angular/TypeScript)
- Implement API endpoints (Azure Functions/Node.js)
- Refactor and optimize existing code
- Fix bugs and technical debt

### TESTER (Executor)
**The TESTER executes testing tasks.**

Responsibilities:
- Write and maintain Vitest unit tests
- Write and maintain Playwright E2E tests
- Validate code quality and test coverage
- Report test results and failures

### REVIEWER (Executor)
**The REVIEWER executes code review tasks.**

Responsibilities:
- Review pull requests and code changes
- Verify adherence to coding standards
- Check for security and performance issues
- Approve or request changes

### COMMENTATOR (Executor)
**The COMMENTATOR executes documentation tasks.**

Responsibilities:
- Write and update project documentation
- Add code comments and JSDoc annotations
- Create user-facing guides and READMEs
- Document architecture and decisions

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
