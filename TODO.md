# Agent OS Tasks

Canonical task board for the pastor.activefaith.church project.

> **Note:** Task tracking consolidated from `docs/TODO.md`. For historical task records, see `docs/LEDGER.md`.

---

## Ready

| ID | Task | Source |
|----|------|--------|
| `UNIT-TESTS` | Update/add Vitest tests for 4 redesigned components | HANDOVER.md |
| `IMAGE-OPTIMIZE` | Convert raw JPGs to WebP and apply NgOptimizedImage to About/Media/Contact | HANDOVER.md |

---

## InProgress

| ID | Task | Started | Notes |
|----|------|---------|-------|
| `IDLE-CLEANUP` | Documentation cleanup and consolidation | 2026-03-17 | ORCHESTRATOR leading, COMMENTATOR supporting |
| `PASTOR-BUNDLE-MASTER-PLAN` | Translate master engineering/product plan into phased delivery milestones | 2026-03-17 | CODER agent - file-based handoff via inbox |
| `PASTOR-BUNDLE-PRD` | Deliver PRD-defined product outcomes for Pastor Abraham platform | 2026-03-17 | CODER agent - file-based handoff via inbox |

---

## InTest

| ID | Task | Tested | Notes |
|----|------|--------|-------|
| `UNIT-TESTS` | Update/add Vitest tests for 4 redesigned components | 2026-03-17 | TESTER agent - 8/8 unit tests pass ✅ |

---

## Done

| ID | Task | Completed | Notes |
|----|------|-----------|-------|
| `MADGE-001` | Install madge and create dependency analysis plan | 2026-03-17 | CODER agent - Madge installed, 0 circular dependencies found, analysis doc at docs/MADGE-001-dependency-analysis.md ✅ |
| `DEPLOY` | Deploy Angular app to Azure Static Web Apps | 2026-03-17 | COMMENTATOR agent - All quality gates pass (8 unit + 2 API + 15 E2E), build 0 errors/0 warnings, CI-CD ready for production auto-deploy on main push ✅ |
| `CI-CD-PIPELINE` | Set up GitHub Actions + Azure Static Web Apps deployment | 2026-03-17 | CODER agent - Verified existing workflows: deploy-staging-swa.yml (staging), deploy-production-swa.yml (main + PR previews), close-pr-preview.yml. All 25 tests pass ✅ |
| `T-ANGULAR-SSRF-FIX` | Fix Angular SSRF error by configuring allowed hosts for ng serve | 2026-03-17 | CODER agent - angular.json updated with allowedHosts ✅ |
| `DOCS-INIT` | Initialize documentation structure | 2026-03-08 | TODO.md, LEDGER.md |
| `PASTOR-BUNDLE-ASSET-MANIFEST` | Asset alignment and manifest creation | 2026-03-09 | CODER agent |
| `PASTOR-BUNDLE-COPILOT-BUILD-PROMPT` | Copilot build prompt configuration | 2026-03-09 | CODER agent |
| `PASTOR-BUNDLE-IMPLEMENTATION-SPEC` | Implementation specification | 2026-03-09 | CODER agent |
| `PASTOR-BUNDLE-PLATFORM-MANIFESTS` | Platform manifests configuration | 2026-03-09 | CODER agent |
| `PASTOR-BUNDLE-UX-LEVEL-UP-DIFFS` | UX improvements implementation | 2026-03-09 | CODER agent |
| `DOCS-BOOTSTRAP-TODO-LEDGER` | Bootstrap TODO ledger system | 2026-03-09 | CODER agent |
| `IDLE-ROUTING` | Task routing and analysis | 2026-03-17 | ORCHESTRATOR agent |
| `GIT-INIT` | Initialize git repository and create first commit | 2026-03-17 | TESTER agent - Unit 8/8 ✅, API 2/2 ✅, E2E 15/15 ✅ (flake resolved) |
| `E2E-TESTS` | Write Playwright E2E specs for navigation and invite form | 2026-03-17 | TESTER agent - 15/15 E2E pass ✅ (routes, form validation, visual snapshots) |

---

## Archive

*Historical tasks moved to Done.*

| ID | Task | Owner | Priority | Notes |
|----|------|-------|----------|-------|
| T-idle-cleanup-3561 | idle cleanup | orchestrator | P0 | Completed |
| T-find-something-to-do-5723 | find something to do | orchestrator | P0 | Completed |
- [ ] **UNIT-TESTS**: Update/add Vitest tests for 4 redesigned components | Owner: **tester** | Status: **InProgress** | Priority: **P2** | Note: BLOCKER for SWA deployment - tests must pass before deployment can proceed
- [ ] **DEPLOY**: Deploy Angular app to Azure Static Web Apps | Owner: **orchestrator** | Status: **InProgress** | Priority: **P1** | Note: Infra located at /workspaces/activefaith-infra - ready for deployment
- [ ] **IMAGE-OPTIMIZE**: Convert raw JPGs to WebP and apply NgOptimizedImage to About/Media/Contact | Owner: **coder** | Status: **InProgress** | Priority: **P2** | Note: HANDOVER.md