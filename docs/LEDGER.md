# Documentation Ledger

Single source of truth for every material Markdown change (creation or edit).

## How to Use

- For each PR/commit that adds or materially edits a `.md` file, append a row below (newest at top).
- Summaries <=120 chars; be specific about intent. Use ISO dates (YYYY-MM-DD).
- Types: `new`, `major`, `minor`, `handover`.
- **Type guide:** `new` (brand new doc), `major` (structural/behavioral change), `minor` (small content tweak), `handover` (continuity/ownership docs).
- **Commit/PR:** short SHA or PR link. If unknown at author time, use `TBD` and update after merge.
- Confidence is optional except for proposal rows (see PROPOSALS.md).

| Date       | Paths                            | Type   | Summary                                                        | Author                     | Commit/PR |
|------------|----------------------------------|--------|----------------------------------------------------------------|----------------------------|-----------|
| 2026-03-17 | USER_MESSAGES.md                 | major  | UNIT-TESTS evaluation: 8/8 Vitest + 2/2 API + 15/15 E2E pass  | COMMENTATOR                | TBD       |
| 2026-03-17 | USER_MESSAGES.md, docs/LEDGER.md | major  | E2E-TESTS evaluation: 15/15 Playwright tests pass, docs updated | COMMENTATOR                | 96f666e   |
| 2026-03-17 | docs/activity-log.md             | major  | Systemic cleanup: date ordering, format consistency            | COMMENTATOR                | TBD       |
| 2026-03-17 | docs/agent-os.log                | major  | Consolidated verbose logs into structured tables               | COMMENTATOR                | TBD       |
| 2026-03-17 | docs/commentator-agent.log       | major  | Removed orphaned session markers, standardized format          | COMMENTATOR                | TBD       |
| 2026-03-17 | docs/orchestrator-agent.log      | major  | Summarized repeated API findings, removed verbosity            | COMMENTATOR                | TBD       |
| 2026-03-17 | TODO.md                          | minor  | Fixed archive section format consistency                       | COMMENTATOR                | TBD       |
| 2026-03-09 | docs/TODO.md, mcp.json           | major  | CODER tasks: asset alignment, tech stack validation, configs   | Gemini CLI                 | TBD       |
| 2026-03-08 | docs/TODO.md, docs/LEDGER.md     | new    | Initialize pastor docs task tracker and documentation ledger   | TefoAM <tefoam@outlook.com>| TBD       |

## Notes

- Minor typo-only edits (<=3 lines, no meaning change) can be skipped or bundled in one daily row.
- Keep this ledger stable—LLMs read this first for doc context.
