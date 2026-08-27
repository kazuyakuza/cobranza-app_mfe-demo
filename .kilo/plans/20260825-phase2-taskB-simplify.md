# Task B 4.3 — Documentation Simplification Plan

## Goal

Reduce duplication and verbosity across the documentation touched by Task B 4.2 while preserving every source-of-truth section. The plan is scoped to **small, mechanical edits**; each change is a single file with exact text replacements.

## Cross-cutting strategy

- `docs/mfe-demo-shell-usage.md` is the **integration quick-reference** for Shell developers. It should keep concrete examples (Footer snippets, min-height contract, manual tests) but avoid restating full reference tables that live elsewhere.
- `docs/views-and-config.md` is the **DemoConfig reference**. It owns the field reference, coercion rules, and view descriptions.
- `docs/actions-and-events.md` is the **event reference**. It owns the action-button → event table and payload rules.
- `docs/shell-integration-guide.md` is the **Shell test-harness guide**. It owns debugging surfaces and the Shell-feature → demo-usage mapping.
- `README.md` is the **entry point**. It should summarise and link, not duplicate tables.
- `docs/phase0-agent-notes.md` is the **agent quick-reference**. It should link to canonical tables instead of repeating them.
- `.agent/project-info/brief.md` is the **source of truth**; only tighten wording, do not remove tables.
- `.agent/project-info/context.md` is the **factual log**; keep as-is (already concise).

## 1. README.md — streamline federation identity

### 1.1 Replace the Federation Identity table with a short summary + link

**Why:** The exact same table exists in `docs/mfe-demo-shell-usage.md` §Federation identity.

**Current block (lines 71–81):**

```markdown
## Federation Identity

| Concept | Value |
| --------- | -------- |
| Repo / app name | `mfe-demo` |
| Federation remote name | `mfe-demo` |
| Exposed module | `./Component` → `src/app/demo/demo.component.ts` (selector `cba-demo`) |
| `moduleType` string in Shell | `demo` |
| Config shape | Internal `DemoConfig` / `DemoViewMode` (lives only inside this repo) |
| npm scope | Optional; not required for Phase 0 if loaded from URL |
```

**Replace with:**

```markdown
## Federation Identity

- Remote name: `mfe-demo`
- Exposed module: `./Component` → `src/app/demo/demo.component.ts` (selector `cba-demo`)
- `moduleType` in Shell: `demo`
- Full reference (ports, remote entry, Footer snippets): [`docs/mfe-demo-shell-usage.md`](docs/mfe-demo-shell-usage.md).
```

## 2. README.md — merge Dev Ports & CORS into Quick Start

### 2.1 Remove the Dev Ports & CORS section heading and merge its content into Quick Start

**Why:** The Quick Start already covers `npm run serve` and the Shell-side URL; the separate section repeats the same ports and CORS note.

**Current block (lines 87–91):**

```markdown
## Dev Ports & CORS

- **Standalone preview:** `http://localhost:4201` (configured in `angular.json` → `architect.serve-original.options.port`).
- **Shell (local dev):** run the Shell on its own port (see the Shell repo) and point its federation config at this remote's manifest: `http://localhost:4201/remoteEntry.json`.
- **Public path / CORS:** the Angular dev server serves the Native Federation manifest (`remoteEntry.json`) at the dev server root; cross-origin loading is handled via import maps and `es-module-shims`. No extra CORS configuration is needed for local `localhost` dev. Confirm the exact `remoteEntry` URL and remote name against the Shell's federation config.
```

**Current Quick Start block (lines 93–113):**

```markdown
## Quick Start

Prerequisites:

- Node.js `22.22.3` (see `.nvmrc`). Run `nvm use` or `fnm use`.
- npm (no global installs).

```bash
# Install dependencies
npm install

# Run the standalone preview (http://localhost:4201)
npm run serve
# or
npx ng serve
```

The standalone preview host (`DemoPreviewComponent`) at route `/` injects mock Inputs into `DemoComponent` and exposes controls for `size`, `view`, `title`, `tableRows`, and `profile` JSON, plus toggles for `isCollapsed` / `isFullscreen` and buttons that simulate `shell:module-state` and `shell:visibility-changed` events. Open the browser console to verify every dispatched `mfe:*` event (action buttons, view switcher, create-form handlers) and to see the captured outgoing events logged by the preview host.

To run inside the Shell, start the Shell separately and add a Footer entry with `moduleType: 'demo'`, pointing its federation config at `http://localhost:4201/remoteEntry.json` (remote name `mfe-demo`, exposed module `./Component`). See the Shell repository for its run instructions.
```

**Replace the Quick Start block with:**

```markdown
## Quick Start

Prerequisites:

- Node.js `22.22.3` (see `.nvmrc`). Run `nvm use` or `fnm use`.
- npm (no global installs).

```bash
npm install
npm run serve   # http://localhost:4201
```

The standalone preview (`DemoPreviewComponent`, route `/`) injects mock Inputs and simulates `shell:*` events. Use the browser console to see every `mfe:*` event captured by the preview host.

To run inside the Shell, start the Shell separately and add a Footer entry with `moduleType: 'demo'` pointing at `http://localhost:4201/remoteEntry.json` (remote `mfe-demo`, exposed module `./Component`). No extra CORS config is needed for local `localhost` dev.
```

### 2.2 Update the Table of Contents

**Current:**

```markdown
- [Dev Ports & CORS](#dev-ports--cors)
- [Quick Start](#quick-start)
```

**Replace with:**

```markdown
- [Quick Start](#quick-start)
```

## 3. README.md — tighten View Modes summary

### 3.1 Remove the supported-views sentence that duplicates `views-and-config.md`

**Current block (lines 142–148):**

```markdown
## View Modes (`DemoConfig`)

The Shell transports opaque configuration through the `data` Input. `mfe-demo` interprets it internally as `DemoConfig`; the Shell only sees `Record<string, unknown>`.

Supported views: `'table'` (mock data table), `'create-form'` (simulated form), `'profile'` (read-only profile card).

Full field reference, coercion rules, title behaviour, and example Shell Footer entries: [`docs/views-and-config.md`](docs/views-and-config.md).
```

**Replace with:**

```markdown
## View Modes (`DemoConfig`)

The Shell transports opaque `data` as `Record<string, unknown>`; `mfe-demo` interprets it internally as `DemoConfig`.

For supported views, field reference, coercion rules, and example Footer entries, see [`docs/views-and-config.md`](docs/views-and-config.md).
```

## 4. README.md — simplify Status section

### 4.1 Convert the multi-line status list to a tighter paragraph

**Current block (lines 37–48):**

```markdown
## Status

> **Phase 2 complete.**
>
> - Buildable Angular 22 Native Federation remote; `ng build` and `ng serve` work.
> - Standalone preview host runs at `http://localhost:4201` (`npm run serve`).
> - Three body views (`table`, `create-form`, `profile`) switchable via `DemoConfig.view`.
> - Identity panel, per-instance visual marker, action bar (8 buttons), per-instance event log (last 25), and collapsible data payload viewer.
> - Min-height contract wired via `@cobranza-apps/mfe-events@^0.6.0`: the demo dispatches `mfe:update-min-height` on init / view-change / content-change with per-view `minHeightPx` (table 320, create-form 400, profile 280).
> - `shell:module-state` listener captures `dragState` and `previewMode` when the Shell sends them.
> - Multi-instance state isolation verified (event log, form state, declared min-height, colour marker).
> - Standalone preview exercises min-height re-dispatch and debug override.
```

**Replace with:**

```markdown
## Status

> **Phase 2 complete.** Buildable Angular 22 Native Federation remote with three views, identity panel, 8 action buttons, per-instance event log, data payload viewer, min-height contract (`mfe:update-min-height`), `shell:module-state` `dragState`/`previewMode` capture, and verified multi-instance isolation.
```

## 5. docs/mfe-demo-shell-usage.md — deduplicate DemoConfig explanation

### 5.1 Replace the field-reference copy with a shorter summary + cross-reference

**Current block (lines 62–69):**

```markdown
## How `data` / `initialData` map to `DemoConfig`

- Shell copies `WorkspaceModuleDefinition.config` into the instance `data` Input on creation.
- Persisted workspace state restores `data` on reload.
- `mfe:request-add-module` may carry `initialData` to pre-configure a new instance (demo uses `{ view: 'table' }`).
- Field reference (copy of the `DemoConfig` interface from `demo-config.ts`): `view?`, `title?`, `profile?`, `tableRows?`.
- Coercion: invalid `view` → `'table'`; non-string `title` → dropped; non-plain-object `profile` → dropped; non-finite/negative `tableRows` → `5`.
- Link to [`views-and-config.md`](views-and-config.md) for the full field reference.
```

**Replace with:**

```markdown
## How `data` / `initialData` map to `DemoConfig`

- Shell Footer `config` → `data` Input on creation.
- Persisted workspace state restores `data` on reload.
- `mfe:request-add-module` may carry `initialData` (demo uses `{ view: 'table' }`).

`DemoConfig` fields (`view?`, `title?`, `profile?`, `tableRows?`) and coercion rules live in [`views-and-config.md`](views-and-config.md).
```

## 6. docs/mfe-demo-shell-usage.md — deduplicate min-height contract

### 6.1 Remove duplicated per-view values and payload shape details already in `views-and-config.md` / `actions-and-events.md`

**Current block (lines 75–89):**

```markdown
## Min-height contract

- The demo dispatches `mfe:update-min-height` (`MFE_EVENTS.UPDATE_MIN_HEIGHT` from `@cobranza-apps/mfe-events@^0.6.0`).
- Dispatch moments:
  - `reason: 'init'` — once on `ngOnInit`.
  - `reason: 'view-change'` — when `config.view` changes via `data`.
  - `reason: 'content-change'` — when `tableRows` changes while `view === 'table'`.
- Per-view declared values (from `demo-min-height.ts`): `table` 320 px, `create-form` 400 px, `profile` 280 px.
- Payload shape (identity-bearing): `{ schemaVersion, moduleType, instanceId, minHeightPx, reason }`.
- **Shell responsibilities:**
  1. Persist `minHeightPx` with the workspace instance so it survives reload.
  2. Apply it as CSS `min-height` on the module container (the demo never sets its own outer height).
  3. Treat it as a *preference*, not an exact height. Never echo it back as `shell:module-state.height` (that field is the current container height, a different concept).
- The demo does NOT implement the Shell-side listener; it only emits.
```

**Replace with:**

```markdown
## Min-height contract

The demo dispatches `mfe:update-min-height` (`MFE_EVENTS.UPDATE_MIN_HEIGHT` from `@cobranza-apps/mfe-events@^0.6.0`) with reasons `'init'`, `'view-change'`, and `'content-change'`. Per-view values and payload shape are documented in [`views-and-config.md`](views-and-config.md) and [`actions-and-events.md`](actions-and-events.md).

**Shell responsibilities:**

1. Persist `minHeightPx` with the workspace instance.
2. Apply it as CSS `min-height` on the module container.
3. Treat it as a *preference*, not an exact height. Never echo it back as `shell:module-state.height`.
```

## 7. docs/mfe-demo-shell-usage.md — shorten action buttons section

### 7.1 Keep the cross-reference and drop the event-name list that repeats the table in `actions-and-events.md`

**Current block (lines 71–73):**

```markdown
## Action buttons → events

The demo exposes 8 action buttons that dispatch `mfe:*` events. See [`actions-and-events.md`](actions-and-events.md) for the button → event table — the full table is not duplicated here. Event names used across the demo: `mfe:update-header`, `mfe:show-notification`, `mfe:request-fullscreen`, `mfe:request-remove`, `mfe:request-add-module`, `mfe:module-error`, `mfe:update-min-height`.
```

**Replace with:**

```markdown
## Action buttons → events

The demo exposes 8 action buttons that dispatch `mfe:*` events. See [`actions-and-events.md`](actions-and-events.md) for the full button → event table.
```

## 8. docs/mfe-demo-shell-usage.md — consolidate manual test scenarios

### 8.1 Merge related scenarios and remove redundant phrases

**Current block (lines 104–116):**

```markdown
## Suggested manual test scenarios

1. **Multiple instances** — add several `demo` Footer entries via the Shell Footer `+`; confirm each gets a distinct `instanceId`, a distinct colour marker, and isolated event logs.
2. **Resize 50 % / 100 %** — toggle `size` (or send `shell:module-state`); views reflow without horizontal overflow; identity panel updates.
3. **Collapse & fullscreen** — toggle `isCollapsed` / `isFullscreen` (or `shell:module-state`); identity panel badges update; no layout breakage.
4. **View change via Footer** — add instances with different `config.view`; confirm `mfe:update-min-height` re-dispatches with `reason: 'view-change'` and a different `minHeightPx` (320 / 400 / 280).
5. **Drag-and-drop** — if the Shell supports DnD, trigger a drag; confirm `dragState` appears in the demo identity panel / event log.
6. **Persistence restore** — save workspace with demo instances in different views, reload; confirm `data` restores the view and `mfe:update-min-height` fires with `reason: 'init'`.
7. **Notification flow** — click the three notification buttons; confirm Shell toasts render.
8. **Remove flow** — click "Quitar módulo"; confirm Shell removes the instance.
9. **Request-add-module flow** — click "Agregar instancia"; confirm Shell creates a new `demo` instance with `initialData: { view: 'table' }`.
10. **Update-min-height flow** — open the standalone preview (`npm run serve`), use "Reenviar min-height" with a debug override; confirm `mfe:update-min-height` fires with the override value and the identity panel updates.
11. **Error flow** — click "Simular error"; confirm Shell error-handling UI.
```

**Replace with:**

```markdown
## Suggested manual test scenarios

1. **Multiple instances** — add several `demo` Footer entries; confirm distinct `instanceId`, colour marker, and isolated event logs.
2. **Resize 50 % / 100 %** — toggle `size`; views reflow and identity panel updates.
3. **Collapse & fullscreen** — toggle `isCollapsed` / `isFullscreen`; identity panel badges update.
4. **View change** — switch `config.view`; confirm `mfe:update-min-height` fires with `reason: 'view-change'` and the matching `minHeightPx`.
5. **Drag & drop / preview** — trigger drag or send `shell:module-state` with `dragState` / `previewMode`; confirm identity panel / event log reflects them.
6. **Persistence restore** — save, reload, confirm `data` restores the view and `mfe:update-min-height` fires with `reason: 'init'`.
7. **Notification, remove, add-module, error flows** — click the notification buttons, "Quitar módulo", "Agregar instancia", and "Simular error"; confirm Shell reacts.
8. **Min-height override** — in standalone preview, use "Reenviar min-height" with a debug override; confirm `mfe:update-min-height` fires and identity panel updates.
```

## 9. docs/views-and-config.md — deduplicate min-height dispatch moments

### 9.1 Replace the dispatch-moments list with a cross-reference to `actions-and-events.md`

**Current block (lines 74–91):**

```markdown
## Min-height per view

The demo declares a preferred `minHeightPx` per view via `mfe:update-min-height` (`MFE_EVENTS.UPDATE_MIN_HEIGHT` from `@cobranza-apps/mfe-events@^0.6.0`). The Shell should persist and apply it as CSS `min-height` on the module container.

| `view` | Declared `minHeightPx` |
| ------- | ---------------------- |
| `table` | 320 |
| `create-form` | 400 |
| `profile` | 280 |
| (default / unknown) | 320 |

Dispatch moments:

- `reason: 'init'` — once on mount.
- `reason: 'view-change'` — when `config.view` changes via `data`.
- `reason: 'content-change'` — when `tableRows` changes while `view === 'table'`.

See [`mfe-demo-shell-usage.md`](mfe-demo-shell-usage.md) §Min-height contract for Shell-side responsibilities.
```

**Replace with:**

```markdown
## Min-height per view

The demo declares a preferred `minHeightPx` per view via `mfe:update-min-height`. The Shell should persist it and apply it as CSS `min-height` on the module container.

| `view` | Declared `minHeightPx` |
| ------- | ---------------------- |
| `table` | 320 |
| `create-form` | 400 |
| `profile` | 280 |
| (default / unknown) | 320 |

Dispatch moments and payload shape: [`actions-and-events.md`](actions-and-events.md) §Min-height declaration. Shell-side responsibilities: [`mfe-demo-shell-usage.md`](mfe-demo-shell-usage.md) §Min-height contract.
```

## 10. docs/actions-and-events.md — deduplicate min-height payload details

### 10.1 Remove redundant per-view values already listed in `views-and-config.md`

**Current block (lines 52–66):**

```markdown
## Min-height declaration (`mfe:update-min-height`)

Not triggered by an action button. Dispatched automatically by `DemoComponent`:

| Moment | `reason` | Notes |
| ------- | -------- | ----- |
| `ngOnInit` | `'init'` | First declaration after mount. |
| `config.view` change | `'view-change'` | When `data` switches the view. |
| `tableRows` change (table view) | `'content-change'` | When the mock row count changes. |

Payload (identity-bearing): `{ schemaVersion, moduleType, instanceId, minHeightPx, reason }`.

Per-view `minHeightPx`: `table` 320, `create-form` 400, `profile` 280. Computed by `computeMinHeightPx(view)` in `demo-min-height.ts`.

See [`mfe-demo-shell-usage.md`](mfe-demo-shell-usage.md) §Min-height contract.
```

**Replace with:**

```markdown
## Min-height declaration (`mfe:update-min-height`)

Not triggered by an action button. Dispatched automatically by `DemoComponent`:

| Moment | `reason` |
| ------- | -------- |
| `ngOnInit` | `'init'` |
| `config.view` change | `'view-change'` |
| `tableRows` change (table view) | `'content-change'` |

Payload (identity-bearing): `{ schemaVersion, moduleType, instanceId, minHeightPx, reason }`. Per-view `minHeightPx` values are listed in [`views-and-config.md`](views-and-config.md) §Min-height per view.

See [`mfe-demo-shell-usage.md`](mfe-demo-shell-usage.md) §Min-height contract for Shell-side responsibilities.
```

## 11. docs/shell-integration-guide.md — tighten debugging surfaces

### 11.1 Shorten the event-log and data-payload paragraphs without losing meaning

**Current block (lines 15–25):**

```markdown
### Event log

`DemoEventLog` keeps the last 25 events for the current instance only (no shared singleton). It records both outgoing `mfe:*` and incoming `shell:*` events that passed the `instanceId` + `moduleType` filter. Rendered as a list inside a `cba-card` with direction (`→ OUT` / `← IN`), timestamp, event type, and a truncated JSON payload summary. A "Limpiar log" button clears the log. **Purpose: debugging Shell integration** — verify that the Shell receives dispatched events and that the MFE reacts to the right `shell:*` events for the right instance.

### Data payload viewer

A collapsible `cba-accordion` labelled "Payload (data)" shows a pretty-printed JSON of the raw `data` Input, updated live when `data` changes. **Purpose: debugging what configuration the Shell actually forwarded** to this instance (Footer `config`, persisted `data`, or `initialData`).

**The event log and data payload viewer are debugging surfaces for Shell integration; they are not production UI.**
```

**Replace with:**

```markdown
### Event log

`DemoEventLog` keeps the last 25 incoming `shell:*` and outgoing `mfe:*` events for the current instance only. It shows direction, timestamp, event type, and a truncated payload summary. Use it to verify that the Shell receives dispatched events and that the MFE reacts to the right `shell:*` events for the right instance.

### Data payload viewer

A collapsible `cba-accordion` shows the raw `data` Input as pretty-printed JSON. Use it to inspect the configuration the Shell forwarded (Footer `config`, persisted `data`, or `initialData`).

**Both surfaces are debugging aids, not production UI.**
```

## 12. docs/phase0-agent-notes.md — remove duplicated federation identity

### 12.1 Replace the Phase 0 identity table with a link to `mfe-demo-shell-usage.md`

**Current block (lines 5–15):**

```markdown
## Federation Identity

| Concept | Value |
| --------- | -------- |
| Remote name | `mfe-demo` |
| Exposed module | `./Component` → `src/app/demo/demo.component.ts` |
| Component selector | `cba-demo` |
| `moduleType` (Shell side) | `demo` |
| Dev port | `4201` |
| Remote entry (local dev) | `http://localhost:4201/remoteEntry.json` |
```

**Replace with:**

```markdown
## Federation Identity

See [`docs/mfe-demo-shell-usage.md`](../docs/mfe-demo-shell-usage.md) §Federation identity for the canonical table.
```

## 13. .agent/project-info/brief.md — tighten min-height wording

### 13.1 Shorten the min-height declaration paragraph

**Current block (line 116–118):**

```markdown
The demo declares a preferred `minHeightPx` per view via the `mfe:update-min-height` event (`MFE_EVENTS.UPDATE_MIN_HEIGHT` from `@cobranza-apps/mfe-events@^0.6.0`). It is dispatched on mount (`reason: 'init'`), on view change (`reason: 'view-change'`), and on material content change (`reason: 'content-change'`). The Shell should persist `minHeightPx` with the workspace instance and apply it as CSS `min-height` on the module container. It is a layout preference, not an exact height command; never echo it back as `shell:module-state.height`.
```

**Replace with:**

```markdown
The demo declares a preferred `minHeightPx` per view via `mfe:update-min-height` (`MFE_EVENTS.UPDATE_MIN_HEIGHT`). It fires on mount (`'init'`), view change (`'view-change'`), and content change (`'content-change'`). The Shell should persist `minHeightPx` and apply it as CSS `min-height` on the module container. It is a layout preference, not an exact height; never echo it back as `shell:module-state.height`.
```

## 14. .agent/project-info/context.md — keep unchanged

The file is already concise and factual; no simplification needed.

## Files NOT in scope

- Source code files (out of scope for this documentation simplification step).
- `.agent/project-info/architecture.md`, `tech.md`, `product.md`, `instructions.md` (not modified in Task B 4.2).

## Verification checklist for implementer

After applying the plan:

1. No markdown file exceeds 200 lines (README was 210; target is under 200 after edits).
2. Every removed table is still reachable via a cross-reference link.
3. `README.md` still links to `docs/mfe-demo-shell-usage.md`, `docs/views-and-config.md`, `docs/actions-and-events.md`, and `docs/shell-integration-guide.md`.
4. `docs/mfe-demo-shell-usage.md` still contains the canonical Federation identity table, Footer examples, min-height Shell responsibilities, and manual test scenarios.
5. `docs/views-and-config.md` still owns the `DemoConfig` field reference, coercion rules, and per-view min-height values.
6. `docs/actions-and-events.md` still owns the action-button → event table and payload contract.
7. `.agent/project-info/brief.md` remains the source of truth; only the min-height paragraph is tightened.
