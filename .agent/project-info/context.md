# mfe-demo — Context

> Factual log. Update at the end of every task (`instructions.md` → Regular Task Execution & Context Upkeep).

## Current State

- **Date:** 2026-08-24
- **Branch:** `feat/init-project-info-and-readme`
- **Repository stage:** Early / greenfield.
  - `src/` contains only `.gitkeep` (no Angular scaffolding yet).
  - No `package.json`, no `angular.json`, no `federation.config.js` yet.
  - `README.md` is still the base-project template (update pending — TODO line 2).
  - `.nvmrc` pins Node `22.22.3`.
- **Project info:** `brief.md` and `instructions.md` complete; `product.md`, `context.md`, `architecture.md`, `tech.md` just created; `.initialized` marker removed.

## Current Work Focus

Executing `.agent/todos/20260803/20260803-todo-0.md` via the Critical Workflow:

1. `initialize project info` — IN PROGRESS (this task: creating the 4 core project-info files).
2. `update readme file` — PENDING (next task in the TODO file).

## Recent Changes

- Authored `.agent/project-info/brief.md` (full project brief for `mfe-demo`).
- Created feature branch `feat/init-project-info-and-readme`.
- Created `product.md`, `context.md`, `architecture.md`, `tech.md`.
- Removed `.agent/project-info/.initialized` (Project Info Initialization complete).

## Immediate Next Steps

1. **Task 2 (TODO line 2):** Update `README.md` to reflect `mfe-demo` (replace base-project template content): project purpose, stack, federation identity, dev modes, expected ports, and how to run.
2. **After TODO completion:** Scaffold Angular 22 standalone app + Native Federation remote (`@angular-architects/native-federation`), `federation.config.js`, expose `./Component`, configure public path / CORS, and create the standalone preview host.
3. Implement the exposed `DemoComponent` with Inputs from brief §3.2, events from brief §3.3/§3.4, `DemoConfig` from brief §3.6, and UI content from brief §4.

## Open Questions / Decisions Pending

- **Federation remote name:** brief suggests `mfe-demo`; confirm exact string with Shell's Native Federation config.
- **Exposed module path:** brief suggests `./Component`; confirm the exact exposed name agreed with the Shell.
- **Dev ports:** Expected local ports for `mfe-demo` (standalone preview) and Shell origin for CORS / public path — to be documented in `tech.md` and `README.md` once decided.
- **Optional inputs:** Whether the Shell passes pixel size / `minHeight` via Inputs or events (brief §3.2 optional row) — affects `architecture.md` Inputs table.

## Known Issues / Blockers

None.