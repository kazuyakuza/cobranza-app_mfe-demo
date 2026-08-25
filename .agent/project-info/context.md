# mfe-demo — Context

> Factual log. Update at the end of every task (`instructions.md` → Regular Task Execution & Context Upkeep).

## Current State

- **Date:** 2026-08-24
- **Branch:** `feat/mfe-demo-phase0`
- **Repository stage:** Phase 0 implementation complete; README and agent notes updated.
  - Angular 22.1.2 standalone app scaffolded.
  - Native Federation configured (`federation.config.js`, `angular.json`).
  - `DemoComponent` fully implemented with signal Inputs, `DemoConfig` coercion, identity panel, visual instance marker, default `'table'` view, and core `mfe:*` event dispatch (`module-ready`, `update-header`).
  - `DemoPreviewComponent` fully implemented as the standalone preview host with `size`, `view`, and `title` controls and `mfe:*` event console logging.
  - `@cobranza-apps/mfe-events` installed and `reflect-metadata` configured in `angular.json`.

## Current Work Focus

Executing `.agent/todos/20260803/20260803-todo-1.md` via the Critical Workflow — Task E: README & Agent Notes.

1. Task 11 — Update `README.md` to reflect completed Phase 0 work and create `docs/phase0-agent-notes.md`.

## Recent Changes

- Created front-end technical spec for Task D at `.kilo/plans/20260824-mfe-demo-phase0-taskD-frontend-spec.md`.
- Updated `README.md` (Status, Dev Ports, Quick Start, Federation Configuration, Federation Identity, Project Structure, View Modes) to reflect completed Phase 0.
- Created `docs/phase0-agent-notes.md` with federation identity, folder layout, and Phase 0 boundaries for AI agents.

## Immediate Next Steps

1. Mark TODO Task 11 as `[DONE]` (Critical Workflow Step 4.6).
2. Complete Critical Workflow Step 5: rename the TODO file with `-DONE` suffix, verify all changes are committed on `feat/mfe-demo-phase0`, and merge to `main`.

## Open Questions / Decisions Pending

- **Optional inputs:** Whether the Shell passes pixel size / `minHeight` via Inputs or events (brief §3.2 optional row) — affects `architecture.md` Inputs table.

## Known Issues / Blockers

None.
