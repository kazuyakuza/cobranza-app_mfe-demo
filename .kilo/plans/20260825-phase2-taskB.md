# Plan — Phase 2 Task B: Documentation (Shell-usage, Agent notes, README, cross-links)

**Source TODO:** `.agent/todos/20260825/20260825-todo-0.md` (Tasks 10 & 11)
**Global plan:** `.kilo/plans/20260825-mfe-demo-phase2-global.md`
**Branch:** `feat/phase2-min-height-polish` (already created in Step 2; DO NOT switch branches)
**Target implementer:** JUNIOR developer under 50% restriction.
**Scope:** Documentation only. No source code changes. No git branch operations. No version bump.

---

## 0. Hard boundaries for the implementer

- You may ONLY edit / create these files:
  - `docs/mfe-demo-shell-usage.md` (NEW)
  - `docs/views-and-config.md` (EDIT — append min-height section)
  - `docs/actions-and-events.md` (EDIT — add `mfe:update-min-height` row + section)
  - `docs/shell-integration-guide.md` (EDIT — add min-height + dragState/previewMode rows)
  - `docs/phase0-agent-notes.md` (EDIT — add Phase 2 agent note section)
  - `README.md` (EDIT — Status, Contract table, Documentation list)
  - `.agent/project-info/brief.md` (EDIT — only §3.5 min-height event name; nothing else)
  - `.agent/project-info/context.md` (EDIT — update Current State / Work Focus per system reminder convention)
- You MUST NOT:
  - Edit any file under `src/`.
  - Run `git checkout`, `git merge`, `git push`, or change branches.
  - Create any file other than `docs/mfe-demo-shell-usage.md`.
  - Add tests, change `package.json`, or touch `angular.json` / `federation.config.js`.
- All UI strings referenced in docs MUST stay in Spanish (the MFE is Spanish-only); doc prose is in English (matching existing docs).
- Use real newline characters in every file write. No literal `\n` sequences.
- Markdown style: match existing docs (ATX `#` headings, `>` blockquote source-of-truth line at top, `## Table of Contents` when the file exceeds ~100 lines, `## Related files` at the end with relative links).
- After every file write, re-read it once to verify formatting before committing.

## 1. Pre-flight (read-only verification)

Run these reads BEFORE editing, to confirm the implementation facts the docs must reflect:

1. Read `src/app/demo/demo-min-height.ts` → confirm per-view px values:
   - `table` = 320, `create-form` = 400, `profile` = 280, default = 320.
2. Read `src/app/demo/demo-dispatcher.ts` → confirm `updateMinHeight(minHeightPx, reason)` dispatches `MFE_EVENTS.UPDATE_MIN_HEIGHT` with `reason: 'init' | 'view-change' | 'content-change'`.
3. Read `src/app/demo/demo.component.ts` → confirm:
   - `declareMinHeight('init')` called in `ngOnInit`.
   - View-change effect → `declareMinHeight('view-change')`.
   - Table row-count effect → `declareMinHeight('content-change')`.
   - `lastDeclaredMinHeightPx` signal shown in identity panel.
4. Read `src/app/demo/demo-shell-state.ts` → confirm `dragState` (`'drag-start' | 'drag-end' | 'dropped'`) and `previewMode` (`'collapsed'`) are captured from `shell:module-state`.
5. Read `src/app/demo-preview/demo-preview.component.ts` → confirm preview controls: `simulatedDragState`, `simulatedPreviewMode`, `debugMinHeightOverride`, `redeclareMinHeight`, `previewDeclaredMinHeightPx`.
6. Read `package.json` → confirm `@cobranza-apps/mfe-events` is `^0.6.0`, version is `0.3.0`.

If any fact above differs from what the plan states, STOP and return a question to the caller. Do not document behaviour that is not in the code.

## 2. Task 10 — Create `docs/mfe-demo-shell-usage.md` (NEW file)

Create the file with exactly the structure below. Use English prose, Spanish only for UI string examples. File must include a Table of Contents (it will exceed 100 lines).

### Required sections and exact content

```
# Shell Usage Guide — mfe-demo

> Ready-to-copy configuration and manual test scenarios for Shell developers integrating
> the `mfe-demo` Native Federation remote.
> Source of truth: [`brief.md`](../.agent/project-info/brief.md) §3 and §5,
> [`architecture.md`](../.agent/project-info/architecture.md) §4 and §8.

## Table of Contents
- [Federation identity](#federation-identity)
- [Remote entry & dev port](#remote-entry--dev-port)
- [Footer definition examples](#footer-definition-examples)
- [How `data` / `initialData` map to `DemoConfig`](#how-data--initialdata-map-to-democonfig)
- [Action buttons → events](#action-buttons--events)
- [Min-height contract](#min-height-contract)
- [`shell:module-state` fields consumed](#shellmodule-state-fields-consumed)
- [Suggested manual test scenarios](#suggested-manual-test-scenarios)
- [Related files](#related-files)
```

#### Federation identity (table)

| Concept | Value |
| --------- | -------- |
| Remote name | `mfe-demo` |
| Exposed module | `./Component` |
| Component selector | `cba-demo` |
| `moduleType` (Shell side) | `demo` |
| Dev port | `4201` |
| Remote entry (local dev) | `http://localhost:4201/remoteEntry.json` |

#### Remote entry & dev port

- Standalone preview: `http://localhost:4201` (run `npm run serve` or `npx ng serve`).
- Add the remote to the Shell's federation config with remote name `mfe-demo` pointing at `http://localhost:4201/remoteEntry.json`.
- No extra CORS config is needed for local `localhost` dev.

#### Footer definition examples

Three ready-to-copy blocks (one per view). Use a `WorkspaceModuleDefinition`-shaped TS snippet. Include `label`, `moduleType: 'demo'`, and `config`. Example for `profile` must include a populated `profile` object and `title`.

```ts
// table
{ moduleType: 'demo', label: 'Demo – Tabla', config: { view: 'table', tableRows: 5 } }

// create-form
{ moduleType: 'demo', label: 'Demo – Alta', config: { view: 'create-form', title: 'Alta simulada' } }

// profile
{
  moduleType: 'demo',
  label: 'Demo – Perfil',
  config: {
    view: 'profile',
    title: 'Cliente demo',
    profile: { nombre: 'Juan Pérez', dni: '30111222', email: 'juan@example.com', saldo: 15000, estado: 'activo' }
  }
}
```

State plainly: `config` is opaque to the Shell; `mfe-demo` interprets it as `DemoConfig` internally.

#### How `data` / `initialData` map to `DemoConfig`

- Shell copies `WorkspaceModuleDefinition.config` into the instance `data` Input on creation.
- Persisted workspace state restores `data` on reload.
- `mfe:request-add-module` may carry `initialData` to pre-configure a new instance (demo uses `{ view: 'table' }`).
- Field reference (copy the `DemoConfig` interface from `demo-config.ts`): `view?`, `title?`, `profile?`, `tableRows?`.
- Coercion: invalid `view` → `'table'`; non-string `title` → dropped; non-plain-object `profile` → dropped; non-finite/negative `tableRows` → `5`.
- Link to [`views-and-config.md`](views-and-config.md) for the full field reference.

#### Action buttons → events

Short paragraph: the demo exposes 8 action buttons that dispatch `mfe:*` events. Provide a one-line table pointer linking to [`actions-and-events.md`](actions-and-events.md) — do NOT duplicate the full table here. List the event names only: `mfe:update-header`, `mfe:show-notification`, `mfe:request-fullscreen`, `mfe:request-remove`, `mfe:request-add-module`, `mfe:module-error`, `mfe:update-min-height`.

#### Min-height contract

This is the core Phase 2 addition. Write a dedicated section:

- The demo dispatches `mfe:update-min-height` (`MFE_EVENTS.UPDATE_MIN_HEIGHT` from `@cobranza-apps/mfe-events@^0.6.0`).
- Dispatch moments:
  - `reason: 'init'` — once on `ngOnInit`.
  - `reason: 'view-change'` — when `config.view` changes via `data`.
  - `reason: 'content-change'` — when `tableRows` changes while `view === 'table'`.
- Per-view declared values (copy from `demo-min-height.ts`): `table` 320 px, `create-form` 400 px, `profile` 280 px.
- Payload shape (identity-bearing): `{ schemaVersion, moduleType, instanceId, minHeightPx, reason }`.
- **Shell responsibilities (MUST state explicitly):**
  1. Persist `minHeightPx` with the workspace instance so it survives reload.
  2. Apply it as CSS `min-height` on the module container (the demo never sets its own outer height).
  3. Treat it as a *preference*, not an exact height. Never echo it back as `shell:module-state.height` (that field is the current container height, a different concept).
- The demo does NOT implement the Shell-side listener; it only emits.

#### `shell:module-state` fields consumed

List the fields the demo reads from `shell:module-state` (filtered by `instanceId` + `moduleType === 'demo'`):

| Field | Demo usage |
| ----- | ---------- |
| `size` | Identity panel size label; layout reflow. |
| `width`, `height` | Identity panel "1200 × 400 px" dimensions text. |
| `isCollapsed`, `isFullscreen` | Identity panel badges; layout. |
| `dragState?` (`'drag-start' \| 'drag-end' \| 'dropped'`) | Optional; shown in identity panel + event log when present. |
| `previewMode?` (`'collapsed'`) | Optional; shown in identity panel + event log when present. |

Note: `height` is the current container height reported by the Shell — NOT the demo's declared `minHeightPx`.

#### Suggested manual test scenarios

Numbered list, each item is a short scenario with expected observable result. Cover exactly the TODO list:

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

#### Related files

- `../src/app/demo/demo.component.ts`
- `../src/app/demo/demo-dispatcher.ts`
- `../src/app/demo/demo-min-height.ts`
- `../src/app/demo/demo-shell-state.ts`
- [`views-and-config.md`](views-and-config.md)
- [`actions-and-events.md`](actions-and-events.md)
- [`shell-integration-guide.md`](shell-integration-guide.md)

## 3. Task 10 (cross-link) — Update `README.md`

Edit `README.md` with three precise changes. Do NOT rewrite other sections.

### 3a. Status section

Replace the entire blockquote under `## Status` (lines ~39–48) with a Phase 2 complete version. Exact replacement text:

```
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

### 3b. Shell ↔ MFE Contract (summary) table

In the contract table (lines ~134–138), add min-height to the "MFE → Shell" row and clarify the Shell → MFE row. Replace the row:

```
| MFE → Shell | `@cobranza-apps/mfe-events` | `mfe:module-ready`, `mfe:update-header`, `mfe:show-notification`, `mfe:request-fullscreen`, `mfe:request-remove`, `mfe:module-error`, `mfe:request-add-module`, `mfe:update-min-height` (declares preferred `minHeightPx`; Shell persists + applies as CSS). |
```

And update the Shell → MFE row to mention `dragState` / `previewMode`:

```
| Shell → MFE | `@cobranza-apps/mfe-events` | `shell:module-state` (size, width/height, isCollapsed, isFullscreen, optional `dragState` / `previewMode`), `shell:visibility-changed`, `shell:theme-changed` (filter by `instanceId`). |
```

### 3c. Documentation & Project Info list

Add a new bullet for the Shell usage guide, placed immediately after the `shell-integration-guide.md` bullet (line ~205). Insert:

```
- [`docs/mfe-demo-shell-usage.md`](docs/mfe-demo-shell-usage.md) — ready-to-copy Footer definitions, min-height contract, and manual test scenarios for Shell developers.
```

### 3d. Quick Start / dev port confirmation

The README already documents `http://localhost:4201` and `npm run serve` (lines ~100–108). Verify these are present; no edit required unless missing. If missing, add them — but per pre-flight reads they are present, so do NOT edit.

## 4. Task 10 (cross-link) — Update `docs/views-and-config.md`

Append a new section BEFORE `## Related files` (i.e. after the `## Example Footer entries` section, around line 70).

### New section to insert

```
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

Also add a TOC entry: `- [Min-height per view](#min-height-per-view)` after `- [Example Footer entries](#example-footer-entries)`.

## 5. Task 10 (cross-link) — Update `docs/actions-and-events.md`

Two edits.

### 5a. Action buttons → events table

Add a new row at the end of the table (after the "Simular error" row, line ~29). Note: `mfe:update-min-height` is NOT triggered by a button — it is triggered on init / view-change / content-change. So do NOT add it to the button table. Instead, add it to a new section (5b).

### 5b. New section before `## Related files`

```
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

Add TOC entry: `- [Min-height declaration (mfe:update-min-height)](#min-height-declaration-mfeupdate-min-height)` after `- [Lifecycle events](#lifecycle-events)`.

## 6. Task 10 (cross-link) — Update `docs/shell-integration-guide.md`

Two edits.

### 6a. "What the Shell can test with mfe-demo" table

Add two rows after the "Visibility" row (line ~42):

```
| Min-height | The demo emits `mfe:update-min-height` on init / view-change / content-change; the Shell should persist `minHeightPx` and apply it as CSS `min-height`. See [`mfe-demo-shell-usage.md`](mfe-demo-shell-usage.md). |
| Drag & preview | Send `shell:module-state` with `dragState` (`'drag-start' \| 'drag-end' \| 'dropped'`) or `previewMode` (`'collapsed'`); the identity panel + event log reflect them. |
```

### 6b. "Incoming events the MFE listens for" table

Update the `shell:module-state` row (line ~48) to mention the new optional fields. Replace with:

```
| `shell:module-state` | `instanceId` + `moduleType === 'demo'` | Updates `DemoShellState` (size, width/height px, isCollapsed, isFullscreen, optional `dragState`, optional `previewMode`); identity panel reflows. |
```

Add a TOC entry is not needed (the section already exists in TOC). No TOC change.

## 7. Task 11 — Update `docs/phase0-agent-notes.md` (agent-oriented note)

The file is named "Phase 0" but the TODO asks for an agent-oriented note covering Phase 2 facts. Append a new section at the end (after `## Agent Conventions`). Do NOT rename the file (out of scope; it is referenced by README).

### New section to append

```
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
```

## 8. Task 11 — Confirm / update `.agent/project-info/brief.md`

The TODO references `docs/mfe-demo-project-brief.md`, but that file does NOT exist. The actual project brief lives at `.agent/project-info/brief.md` (referenced as source of truth by README and all docs). Do NOT create a `docs/mfe-demo-project-brief.md` mirror — it would duplicate the source of truth and violate the single-source convention.

### Action

Confirm `.agent/project-info/brief.md` §3.5 (Min-height declaration) matches Phase 2 behaviour. The current text says:

> If the Shell contract supports it (Input and/or event), the demo should declare a sensible `minHeightPx` ...

Phase 2 made this concrete with a named event. This IS a material change. Update §3.5 only — replace the paragraph with:

```
### 3.5 Min-height declaration

The demo declares a preferred `minHeightPx` per view via the `mfe:update-min-height` event (`MFE_EVENTS.UPDATE_MIN_HEIGHT` from `@cobranza-apps/mfe-events@^0.6.0`). It is dispatched on mount (`reason: 'init'`), on view change (`reason: 'view-change'`), and on material content change (`reason: 'content-change'`). The Shell should persist `minHeightPx` with the workspace instance and apply it as CSS `min-height` on the module container. It is a layout preference, not an exact height command; never echo it back as `shell:module-state.height`.
```

Do NOT change any other section of `brief.md`. Do NOT touch the `<!-- DO NOT DELETE NEXT SECTION -->` marker or the `## Important Note for AI Agents` section.

## 9. Task 11 — Update `.agent/project-info/context.md`

Per the system-reminder convention (update at end of every task), update `context.md` to reflect Phase 2 Task B completion. Replace the "Current State" and "Current Work Focus" sections with:

```
## Current State

- **Date:** 2026-08-25
- **Branch:** `feat/phase2-min-height-polish`
- **Repository stage:** Phase 2 implementation complete (Tasks A done); documentation in progress (Task B).
  - Min-height contract wired via `@cobranza-apps/mfe-events@^0.6.0` (`mfe:update-min-height`).
  - `shell:module-state` captures `dragState` / `previewMode`.
  - Multi-instance isolation, collapse/size/fullscreen polish, UX copy polish verified.
  - `docs/mfe-demo-shell-usage.md` created; README, views-and-config, actions-and-events, shell-integration-guide, phase0-agent-notes, brief updated.

## Current Work Focus

Executing `.agent/todos/20260825/20260825-todo-0.md` via the Critical Workflow — Task B (4.1b Planning): documentation plan for Tasks 10–11.

## Recent Changes

- Created `.kilo/plans/20260825-phase2-taskB.md` (this documentation plan).
```

Leave "Open Questions / Decisions Pending" and "Known Issues / Blockers" as-is (still None), unless the implementer discovers a real blocker.

## 10. Commit strategy

The implementer commits in this exact order with these messages (run `git status` + read `.gitignore` before each commit per gitignore-compliance rule):

1. After creating `docs/mfe-demo-shell-usage.md`:
   `docs: add Shell usage guide with Footer examples and min-height contract`
2. After editing `README.md` + `docs/views-and-config.md` + `docs/actions-and-events.md` + `docs/shell-integration-guide.md`:
   `docs: cross-link min-height and dragState/previewMode across existing docs`
3. After editing `docs/phase0-agent-notes.md`:
   `docs: add Phase 2 agent notes (folder layout, phase boundaries, add-a-view guide)`
4. After editing `.agent/project-info/brief.md` + `.agent/project-info/context.md`:
   `docs: update brief §3.5 with concrete min-height event name and refresh context`

Do NOT push. Do NOT merge. Step 5 of the Critical Workflow handles that.

## 11. Verification (implementer self-check before signalling done)

- [ ] `docs/mfe-demo-shell-usage.md` exists, has a TOC, and contains all 8 required sections.
- [ ] Footer examples are copy-pasteable TS and cover all three views.
- [ ] Min-height values in docs match `demo-min-height.ts` exactly (320 / 400 / 280).
- [ ] `README.md` Status says "Phase 2 complete" and the contract table includes `mfe:update-min-height` and `dragState`/`previewMode`.
- [ ] `README.md` Documentation list links `docs/mfe-demo-shell-usage.md`.
- [ ] `docs/views-and-config.md` has a "Min-height per view" section + TOC entry.
- [ ] `docs/actions-and-events.md` has a "Min-height declaration" section + TOC entry and does NOT list `mfe:update-min-height` as a button.
- [ ] `docs/shell-integration-guide.md` has the two new test rows and the updated `shell:module-state` row.
- [ ] `docs/phase0-agent-notes.md` has the Phase 2 section with folder layout, DemoConfig internality, phase boundaries, min-height event, and add-a-view steps.
- [ ] `.agent/project-info/brief.md` §3.5 names `mfe:update-min-height`; no other section changed; DO-NOT-DELETE marker intact.
- [ ] `.agent/project-info/context.md` updated to Phase 2 / 2026-08-25.
- [ ] No file under `src/` was modified. Run `git status` and confirm `src/` is clean.
- [ ] All commits are on `feat/phase2-min-height-polish`; no branch switch occurred.
- [ ] No literal `\n` sequences in any written file.

## 12. Output to caller

Return:
- Plan file path: `.kilo/plans/20260825-phase2-taskB.md`
- A short summary listing the 8 files touched (1 new + 7 edited) and the commit sequence.

If any pre-flight fact in §1 does not match the code, STOP and return a question instead of editing.
