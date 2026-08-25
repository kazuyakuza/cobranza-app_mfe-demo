# Phase 0 — Agent Notes

> Quick reference for AI agents working on `mfe-demo`. Source of truth: [`brief.md`](../.agent/project-info/brief.md) and the Phase 0 TODO at [`20260803-todo-1.md`](../.agent/todos/20260803/20260803-todo-1.md).

## Federation Identity

| Concept | Value |
| --------- | -------- |
| Remote name | `mfe-demo` |
| Exposed module | `./Component` → `src/app/demo/demo.component.ts` |
| Component selector | `cba-demo` |
| `moduleType` (Shell side) | `demo` |
| Dev port | `4201` |
| Remote entry (local dev) | `http://localhost:4201/remoteEntry.json` |

## Folder Layout (Phase 0)

```text
src/app/
  demo/              # exposed component + DemoConfig + views/
    views/demo-table/  # mock table sub-component
  demo-preview/      # standalone preview host (ng serve)
```

See [`project-structure.md`](../.agent/project-structure.md) for the maintained list.

## Phase 0 Boundaries

Implemented:

- Angular 22 standalone app configured as a Native Federation remote.
- `DemoComponent` with signal Inputs: `moduleType`, `instanceId`, `size`, `isCollapsed`, `isFullscreen`, `data`.
- `DemoConfig` coercion via `coerceDemoConfig` — default view `'table'`, default `tableRows` `5`.
- `'table'` view with mock rows that reflow with `size`.
- Identity panel + per-instance visual marker (hash of `instanceId` → hue).
- `mfe:module-ready` and `mfe:update-header` dispatched on init.
- `shell:module-state`, `shell:visibility-changed`, `shell:theme-changed` listeners (filtered by `instanceId` except theme, which is global).
- Standalone preview host with `size` / `view` / `title` controls and console logging of outgoing `mfe:*` events.

Deferred (out of scope for Phase 0):

- `'create-form'` and `'profile'` view bodies (placeholder only).
- Full action-button set: `show-notification`, `request-fullscreen`, `request-remove`, `request-add-module`, error simulation.
- Local event log UI and full data payload pretty-printer.
- Full min-height event/input wiring.
- Real integration testing against a running Shell.
- Production deploy configuration.
- Unit / e2e test suite.

## Agent Conventions

- Spanish-only UI strings (no i18n).
- Desktop-only; no mobile breakpoints beyond Bootstrap defaults.
- Standalone components only (no NgModules).
- Prefer `@cobranza-apps/ui` components and tokens over custom styling.
- Never manipulate DOM outside the MFE's own container.
- Never depend on Shell layout concepts (rows, drag handles, persistence).
- `DemoConfig` is internal to this repo; do not add it to `@cobranza-apps/mfe-events`.
- Follow `AGENTS.md` and `.agent/WORKFLOWS.md` at the start of every task.