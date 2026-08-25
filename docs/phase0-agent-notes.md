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

## Phase 2 — Agent Notes (min-height & shell-state polish)

> Supplement to the Phase 0 notes above. Covers the Phase 2 additions only.

### Folder layout (Phase 2 additions)

- `src/app/demo/demo-min-height.ts` — `computeMinHeightPx(view)` pure helper + `DemoMinHeightReason` type.
- `src/app/demo/demo-action-buttons.ts` — action-button config (extracted from `demo.component.ts`).
- `src/app/demo/demo-shell-listeners.ts` — `shell:*` window listener manager (extracted from `demo.component.ts`).

(See [`project-structure.md`](../.agent/project-structure.md) for the maintained folder list.)

### `DemoConfig` is internal to this repo

`DemoConfig` / `DemoViewMode` live in `src/app/demo/demo-config.ts` only. They are NOT part of `@cobranza-apps/mfe-events` and must never be added there. The Shell transports them as opaque `Record<string, unknown>` via `data` / `initialData`.

### Phase boundaries

- **Phase 0** — federation scaffold, `table` view, identity panel, core `mfe:*` events, standalone preview. (See notes above.)
- **Phase 1** — `create-form` + `profile` views, full action-button set (8), per-instance event log, data payload viewer, `shell:visibility-changed` / `shell:theme-changed` listeners, standalone preview controls.
- **Phase 2** — min-height contract via `mfe:update-min-height`, `shell:module-state` `dragState` / `previewMode` capture, multi-instance hardening, collapse/size/fullscreen polish, UX/copy polish, standalone preview min-height controls, complete documentation.

### Min-height event

- Uses `MFE_EVENTS.UPDATE_MIN_HEIGHT` from `@cobranza-apps/mfe-events@^0.6.0`.
- Dispatched via `DemoDispatcher.updateMinHeight(minHeightPx, reason)`.
- Reasons: `'init'`, `'view-change'`, `'content-change'`.
- Do NOT invent a parallel custom event. Do NOT treat `shell:module-state.height` as the MFE-declared minimum.

### How to add a fourth view later

1. Add the new literal to `DemoViewMode` in `src/app/demo/demo-config.ts`.
2. Add a case to `computeMinHeightPx` in `demo-min-height.ts` with a sensible px value.
3. Add a Spanish label in `VIEW_LABELS`.
4. Create the view component under `src/app/demo/views/<new-view>/`.
5. Add an `@switch` branch in `demo.component.html`.
6. Add a `coerceDemoConfig` validation if the view needs extra config fields.
7. Update `docs/views-and-config.md` and `docs/mfe-demo-shell-usage.md` with the new Footer example and min-height row.
8. Add the new view to the standalone preview `view` selector in `demo-preview.component.html`.
