# Documentation Ledger

Single source of truth for every material Markdown change (creation or edit).

### How to use
- For each PR/commit that adds or materially edits a `.md` file, append a row below (newest at top).
- Summaries <=120 chars; be specific about intent. Use ISO dates (YYYY-MM-DD).
- Types: `new`, `major`, `minor`, `handover`.
- Type guide: `new` (brand new doc), `major` (structural/behavioral change), `minor` (small content tweak), `handover` (continuity/ownership docs).
- Commit/PR: short SHA or PR link. If unknown at author time, use `TBD` and update after merge.
- Confidence is optional except for proposal rows (see PROPOSALS.md).

| Date       | Paths                                           | Type    | Summary                                            | Author                 | Commit/PR |
| ---------- | ----------------------------------------------- | ------- | -------------------------------------------------- | ---------------------- | --------- |
| 2026-03-08 | docs/TODO.md,docs/LEDGER.md | new | Initialize pastor docs task tracker and documentation ledger modeled after church repo format | TefoAM <tefoam@outlook.com> | TBD |

### Notes
- Minor typo-only edits (<=3 lines, no meaning change) can be skipped or bundled in one daily row.
- Keep this ledger stable-LLMs read this first for doc context.
