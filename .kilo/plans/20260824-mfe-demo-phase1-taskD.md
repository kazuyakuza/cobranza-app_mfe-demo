# Implementation Plan — Task D (Phase 1, Task 10): Documentation Update

> TODO: `.agent/todos/20260803/20260803-todo-2.md` → Section `### 10. Documentation update`.
> Branch: `feat/mfe-demo-phase1` (already created in Critical Workflow Step 2).
> Target implementer: JUNIOR developer under 50% restriction.
> This is a **documentation-only** task. No source code (`src/**`) changes are allowed.

## 1. Task Objective

Create new documentation files under `docs/` and update `README.md` so that:

1. A new `docs/` file explains the three views (`table`, `create-form`, `profile`) and how to select them via the Shell Footer `config`, the `data` Input, and `mfe:request-add-module` `initialData`.
2. Another new `docs/` file documents the action buttons and which `mfe:*` events they fire.
3. A third new `docs/` file notes that the **event log** and **data payload viewer** are debugging surfaces for Shell integration, and explains how the Shell can use `mfe-demo` as a test harness for various functionalities.
4. `README.md` links the new docs from its `Documentation & Project Info` section.

## 2. Preconditions (implementer must verify before writing)

1. Confirm the branch is `feat/mfe-demo-phase1` (`git status`). If not, STOP and ask the caller.
2. Confirm `docs/` already contains: `how-to-set-up-git.md`, `how-to-write-todo-files.md`, `phase0-agent-notes.md`.
3. Re-read `README.md` (current state) and `.agent/project-structure.md` to keep the new filenames consistent with existing naming (kebab-case, no spaces).
4. Do NOT modify any file under `src/`, `federation.config.js`, `angular.json`, or `.agent/project-info/*` in this task.

## 3. High-Level Approach

Create **three** new Markdown files in `docs/`, then append three link entries to the `Documentation & Project Info` section of `README.md`. Each docs file is self-contained, cross-links the related project-info files and the other new docs, and is written in English (documentation language) with Spanish strings preserved verbatim where they refer to UI labels.

File naming decision (picked, not optional):
- `docs/views-and-config.md` — views + selection mechanisms.
- `docs/actions-and-events.md` — action buttons + dispatched events.
- `docs/shell-integration-guide.md` — event log & data viewer debugging purpose + how the Shell can use `mfe-demo` to test functionalities.

Rationale: the TODO requires "another new /docs file" for actions, and two additional notes (debugging purpose + shell-as-test-harness). Grouping the latter two into a dedicated integration guide keeps each file single-purpose and avoids overloading the views/actions docs.

## 4. Detailed Steps

### Step 4.1 — Git status check (read-only)

Run `git status` (single command, not chained). Verify branch is `feat/mfe-demo-phase1` and working tree has no unexpected staged files. Do NOT stage or commit anything in this step.

### Step 4.2 — Create `docs/views-and-config.md`

Create the file with the exact content structure below. Use real newline characters (newline-prevention rule). No code blocks commented out.

Content structure (write each section in this order):

```
# Views & Configuration

> How `mfe-demo` selects and renders its three body views via the opaque `data` Input.
> Source of truth: [`brief.md`](../.agent/project-info/brief.md) §3.6 and §4.2,
> [`architecture.md`](../.agent/project-info/architecture.md) §5.

## Table of Contents
- [View modes](#view-modes)
- [How a view is selected](#how-a-view-is-selected)
- [Configuration sources](#configuration-sources)
- [Field reference (DemoConfig)](#field-reference-democonfig)
- [Coercion rules](#coercion-rules)
- [Title behaviour](#title-behaviour)
- [Example Footer entries](#example-footer-entries)
- [Related files](#related-files)

## View modes

A table with columns: `view` value | Spanish label | Component | Selector | Body content.
Rows (exact):
- `table` | Tabla | `DemoTableComponent` | `app-demo-table` | Mock data table with `config.tableRows` rows (default 5). Responsive wrapper; reflows at 50 % / 100 %.
- `create-form` | Alta | `DemoCreateFormComponent` | `app-demo-create-form` | Simulated 2-column form (nombre, documento, email, teléfono, observaciones). No real submit / no API. Primary button dispatches `mfe:show-notification` (success) + `mfe:update-header` (status `success`); secondary button resets the form and dispatches an info notification.
- `profile` | Perfil | `DemoProfileComponent` | `app-demo-profile` | Read-only `<dl>` key-value card from `config.profile`. Falls back to Spanish mock defaults (nombre, dni, email, saldo, estado) when `profile` is absent. `estado` rendered as a colour-coded `cba-badge`.

## How a view is selected

Explain in 3–5 lines that `DemoComponent` reads the `data` Input, coerces it via `coerceDemoConfig` (see `src/app/demo/demo-config.ts`), and switches the body with an Angular `@switch` on `config.view`. Default is `table` when `view` is missing or invalid. The identity panel always shows the current `view` Spanish label.

## Configuration sources

A table with columns: Source | Field | How it reaches the MFE.
Rows (exact, from brief §3.6):
- Shell Footer definition | `WorkspaceModuleDefinition.config` | Copied into `data` when the instance is created.
- Shell workspace state | `WorkspaceModule.data?: Record<string, unknown>` | Persisted / restored with the instance; passed as `data` Input.
- Shell → MFE Input | `data` | Angular signal Input on `DemoComponent`.
- `mfe:request-add-module` | `initialData?: Record<string, unknown>` | Optional; the demo uses it to pre-configure a new instance's `view`.

State explicitly: **The Shell does NOT interpret the content of `data`.** `DemoConfig` is an internal convention of `mfe-demo` and is NOT part of `@cobranza-apps/mfe-events`.

## Field reference (DemoConfig)

A fenced `ts` code block reproducing the exact interface from `src/app/demo/demo-config.ts`:

```ts
type DemoViewMode = 'table' | 'create-form' | 'profile';

interface DemoConfig {
  view?: DemoViewMode;                       // default: 'table'
  title?: string;                            // pushed via mfe:update-header on init
  profile?: Record<string, unknown>;         // mock data when view === 'profile'
  tableRows?: number;                        // mock rows when view === 'table'
}
```

## Coercion rules

Bullet list (exact behaviour from `coerceDemoConfig`):
- Unknown / invalid `view` → falls back to `'table'`.
- Non-string `title` → dropped (`undefined`).
- Non-plain-object `profile` (null, array, primitive) → dropped.
- Non-finite or negative `tableRows` → falls back to `5`.

## Title behaviour

3–4 lines: when `config.title` is present it is pushed via `mfe:update-header` on init; otherwise the title defaults to `"Demo – <SpanishLabel>"` (e.g. `"Demo – Tabla"`, `"Demo – Alta"`, `"Demo – Perfil"`) and auto-updates when the view changes via `data`. An `effect()` watches `resolvedTitle` and re-dispatches `mfe:update-header` on change.

## Example Footer entries

A fenced `ts` code block with the three example entries from `README.md` / `brief.md` §3.6 (Tabla, Alta, Perfil) — copy them verbatim from `README.md` lines 161–164.

## Related files

Bullet list of relative links:
- `../src/app/demo/demo-config.ts` — `DemoViewMode`, `DemoConfig`, `coerceDemoConfig`.
- `../src/app/demo/demo.component.ts` — view switching and title effect.
- `../src/app/demo/views/demo-table/demo-table.component.ts`
- `../src/app/demo/views/demo-create-form/demo-create-form.component.ts`
- `../src/app/demo/views/demo-profile/demo-profile.component.ts`
- [`actions-and-events.md`](actions-and-events.md) — action buttons and dispatched events.
- [`shell-integration-guide.md`](shell-integration-guide.md) — debugging surfaces and Shell test-harness usage.
```

### Step 4.3 — Create `docs/actions-and-events.md`

Content structure (exact sections in this order):

```
# Action Buttons & Events

> The full action-button set exposed by `mfe-demo` and the `mfe:*` event each one fires.
> Source of truth: [`architecture.md`](../.agent/project-info/architecture.md) §4.2 and §8.

## Table of Contents
- [Action bar](#action-bar)
- [Action buttons → events](#action-buttons--events)
- [Event payload contract](#event-payload-contract)
- [Create-form handlers](#create-form-handlers)
- [Lifecycle events](#lifecycle-events)
- [Related files](#related-files)

## Action bar

2–3 lines: `DemoComponent` renders an action bar (`<section class="cba-demo__actions">`) of `cba-button` elements built from the `actionButtons` array. Buttons wrap/stack at 50 % width. Every dispatch is recorded in the per-instance event log and logged to the browser console.

## Action buttons → events

A table with columns: Button label (ES) | `mfe:*` event | Variant | Payload notes.
Rows (exact, matching `demo.component.ts` `actionButtons` and `demo-dispatcher.ts`):
- Actualizar título | `mfe:update-header` | primary | Cycles through 3 fixed title/status pairs (`HEADER_DEMOS`): `('Demo – Título A', loaded)`, `('Demo – Título B', success)`, `('Demo – Título C', warning)`.
- Notificación éxito | `mfe:show-notification` | success | `type: 'success'`, message `'Notificación de éxito'`.
- Notificación advertencia | `mfe:show-notification` | secondary | `type: 'warning'`, message `'Notificación de advertencia'`.
- Notificación error | `mfe:show-notification` | danger | `type: 'error'`, message `'Notificación de error'`.
- Pantalla completa | `mfe:request-fullscreen` | secondary | No extra payload beyond identity.
- Quitar módulo | `mfe:request-remove` | danger | No extra payload beyond identity.
- Agregar instancia | `mfe:request-add-module` | secondary | `moduleType: 'demo'`, `title: 'Nueva instancia demo'`, `initialData: { view: 'table' }`.
- Simular error | `mfe:module-error` | danger | `message: 'Error simulado desde mfe-demo'`, `code: 'DEMO_ERROR'`.

## Event payload contract

Bullet list:
- Every outgoing event includes `schemaVersion` (from `SCHEMA_VERSION`), `moduleType`, and `instanceId`.
- `mfe:show-notification` and `mfe:request-add-module` build their payloads directly (see `demo-dispatcher.ts`); the identity-bearing events use the internal `withIdentity` helper.
- All dispatches go through `DemoDispatcher.send`, which records the entry in `DemoEventLog` (direction `'out'`) and calls `console.log('[mfe-demo] dispatch', name, payload)` before `dispatchMfeEvent`.

## Create-form handlers

4–5 lines: the `'create-form'` view emits `primaryAction` / `secondaryAction` outputs consumed by `DemoComponent`:
- `onCreateFormPrimary` → `mfe:show-notification` (success, `'Formulario de prueba enviado (sin API real)'`) + `mfe:update-header` (status `success`).
- `onCreateFormSecondary` → resets the form signals + `mfe:show-notification` (info, `'Formulario reiniciado'`).

## Lifecycle events

Bullet list:
- `mfe:module-ready` — dispatched once on `ngOnInit` (`DemoDispatcher.ready()`).
- `mfe:update-header` — dispatched on init (title effect) and whenever `resolvedTitle` changes (view switch via `data`).

## Related files

Bullet list of relative links:
- `../src/app/demo/demo.component.ts` — `actionButtons` array and create-form handlers.
- `../src/app/demo/demo-dispatcher.ts` — `DemoDispatcher` (all `mfe:*` dispatch logic, `HEADER_DEMOS`).
- `../src/app/demo/demo-event-log.ts` — outgoing/incoming event recording.
- [`views-and-config.md`](views-and-config.md) — view selection.
- [`shell-integration-guide.md`](shell-integration-guide.md) — debugging surfaces and Shell test-harness usage.
```

### Step 4.4 — Create `docs/shell-integration-guide.md`

Content structure (exact sections in this order):

```
# Shell Integration Guide

> How the Company Back-office Shell can use `mfe-demo` to test its workspace features, and how the
> event log / data viewer help debug the Shell ↔ MFE integration.
> Source of truth: [`brief.md`](../.agent/project-info/brief.md) §1 and §3, [`architecture.md`](../.agent/project-info/architecture.md) §4 and §8.

## Table of Contents
- [Debugging surfaces](#debugging-surfaces)
- [What the Shell can test with mfe-demo](#what-the-shell-can-test-with-mfe-demo)
- [Incoming events the MFE listens for](#incoming-events-the-mfe-listens-for)
- [Standalone preview vs loaded by Shell](#standalone-preview-vs-loaded-by-shell)
- [Related files](#related-files)

## Debugging surfaces

Two subsections:

### Event log
3–4 lines: `DemoEventLog` keeps the last 25 events for the current instance only (no shared singleton). It records both outgoing `mfe:*` and incoming `shell:*` events that passed the `instanceId` + `moduleType` filter. Rendered as a list inside a `cba-card` with direction (`→ OUT` / `← IN`), timestamp, event type, and a truncated JSON payload summary. A "Limpiar log" button clears the log. **Purpose: debugging Shell integration** — verify that the Shell receives dispatched events and that the MFE reacts to the right `shell:*` events for the right instance.

### Data payload viewer
3–4 lines: a collapsible `cba-accordion` labelled "Payload (data)" shows a pretty-printed JSON of the raw `data` Input, updated live when `data` changes. **Purpose: debugging what configuration the Shell actually forwarded** to this instance (Footer `config`, persisted `data`, or `initialData`).

Explicit note (bold): **The event log and data payload viewer are debugging surfaces for Shell integration; they are not production UI.**

## What the Shell can test with mfe-demo

A table with columns: Shell functionality | How mfe-demo helps.
Rows (exact):
- Multi-instance | Add several `demo` Footer entries; each instance gets a unique `instanceId` and a distinct visual marker (hue derived from `instanceId`). Event logs stay isolated per instance.
- 50 % / 100 % sizing | Toggle the `size` Input or send `shell:module-state`; the table/form/profile reflow and the identity panel updates its size label.
- Collapse / fullscreen | Toggle `isCollapsed` / `isFullscreen` Inputs or send `shell:module-state`; identity panel badges update.
- Header title & status | Use the "Actualizar título" button or send a `data` Input with a `title`; `mfe:update-header` updates the Shell header.
- Notifications | Three buttons dispatch `mfe:show-notification` (success / warning / error) so the Shell toast pipeline can be verified.
- Fullscreen request | "Pantalla completa" dispatches `mfe:request-fullscreen` so the Shell can test its fullscreen transition + the resulting `shell:module-state` echo.
- Module removal | "Quitar módulo" dispatches `mfe:request-remove` so the Shell can test instance removal.
- Add-module flow | "Agregar instancia" dispatches `mfe:request-add-module` with `initialData`; the Shell can test creating a new pre-configured instance.
- Error path | "Simular error" dispatches `mfe:module-error` so the Shell can test its error-handling UI.
- Configuration transport | Footer `config` → `data` round-trip can be inspected live in the data payload viewer.
- Visibility | Send `shell:visibility-changed`; the identity panel shows a Visible/Oculto badge with the reason.

## Incoming events the MFE listens for

A table with columns: Event | Filter | Demo behaviour.
Rows (exact, from `demo.component.ts`):
- `shell:module-state` | `instanceId` + `moduleType === 'demo'` | Updates `DemoShellState` (size, width/height px, isCollapsed, isFullscreen); identity panel reflows.
- `shell:visibility-changed` | `instanceId` + `moduleType === 'demo'` | Updates visibility badge + reason in the identity panel.
- `shell:theme-changed` | global (no instance filter) | Recorded in the event log only.

## Standalone preview vs loaded by Shell

4–6 lines: `ng serve` runs `DemoPreviewComponent` at `http://localhost:4201`, which injects mock Inputs and exposes controls for `view`, `title`, `tableRows`, `profile` JSON, `size`, `isCollapsed`, `isFullscreen`, plus buttons that dispatch synthetic `shell:module-state` and `shell:visibility-changed` events scoped to the mock `instanceId`. This exercises the listener path without a real Shell. When loaded by the Shell, the Shell hosts `DemoComponent` directly via federation (`./Component`, remote name `mfe-demo`); the preview host is NOT used in that mode.

## Related files

Bullet list of relative links:
- `../src/app/demo/demo.component.ts` — shell listeners + identity panel wiring.
- `../src/app/demo/demo-event-log.ts` — `DemoEventLog` (debugging event log).
- `../src/app/demo/demo-shell-state.ts` — `DemoShellState` (incoming state resolution).
- `../src/app/demo-preview/demo-preview.component.ts` — standalone preview host (shell event simulation).
- [`views-and-config.md`](views-and-config.md) — view selection.
- [`actions-and-events.md`](actions-and-events.md) — action buttons and dispatched events.
```

### Step 4.5 — Update `README.md` `Documentation & Project Info` section

In `README.md`, locate the `## Documentation & Project Info` section (currently lines 208–221). Append three new bullet items **after** the `docs/phase0-agent-notes.md` line (line 220) and **before** the `## For AI Agents` section. Use the `vscode-mcp-server_replace_lines_code` tool (preferred per tool-selection-priority rule) with the exact original line content as `originalCode` validation.

New bullets to append (place them immediately after the `phase0-agent-notes.md` bullet, preserving the existing `- ` prefix and relative-path link style):

```
- [`docs/views-and-config.md`](docs/views-and-config.md) — the three views and how to select them via Footer `config` / `data` / `initialData`.
- [`docs/actions-and-events.md`](docs/actions-and-events.md) — action buttons and which `mfe:*` events they fire.
- [`docs/shell-integration-guide.md`](docs/shell-integration-guide.md) — event log & data viewer debugging surfaces and how the Shell can use `mfe-demo` as a test harness.
```

Do NOT modify any other section of `README.md`. Do NOT touch the TOC (the `Documentation & Project Info` TOC entry already covers this section).

### Step 4.6 — Verify no `src/` files were touched

Run `git status` (single command). The changed/created files MUST be exactly:
- `docs/views-and-config.md` (new)
- `docs/actions-and-events.md` (new)
- `docs/shell-integration-guide.md` (new)
- `README.md` (modified)

If any `src/**`, `federation.config.js`, `angular.json`, `.agent/**`, or `.kilo/**` file appears as modified, STOP, revert that file, and ask the caller.

### Step 4.7 — Commit

Single commit on `feat/mfe-demo-phase1`. Stage only the four files listed in Step 4.6. Commit message (exact):

```
docs(mfe-demo): add Phase 1 views, actions/events, and shell integration guides
```

Do NOT push (git push is restricted to Critical Workflow Step 5).

## 5. Content Rules for the Implementer

- All three docs files are written in **English**; preserve Spanish UI strings verbatim (e.g. `"Actualizar título"`, `"Notificación éxito"`, `"Limpiar log"`, `"Payload (data)"`).
- Use real newline characters in every file write (newline-prevention rule).
- No commented-out code blocks.
- Each docs file MUST start with a `#` H1 title, a `>` blockquote linking the source-of-truth project-info file(s), and a `## Table of Contents` with anchor links (markdown-generation-rule / docs > 100 lines require TOC — each file will exceed 100 lines).
- Relative links to project-info files use the `../.agent/project-info/<file>.md` form; links between the new docs use the bare filename (`actions-and-events.md`, etc.).
- Do NOT create any file outside `docs/` (other than the `README.md` edit).
- Do NOT update `.agent/project-structure.md` — the `docs/` folder is already listed there as a single entry.

## 6. Build / Test

No build or test step is required for this documentation-only task. Do NOT run `ng build` or `npm run serve`.

## 7. Code Review Checklist (for the implementer's self-check before committing)

- [ ] Three new files exist at the exact paths in §4.
- [ ] Each file has H1, source-of-truth blockquote, and TOC.
- [ ] `views-and-config.md` covers all three views, all four configuration sources, the `DemoConfig` interface, coercion rules, title behaviour, and example Footer entries.
- [ ] `actions-and-events.md` lists all 8 action buttons with the exact event, variant, and payload notes from `demo.component.ts` / `demo-dispatcher.ts`.
- [ ] `shell-integration-guide.md` explicitly states the event log and data viewer are debugging surfaces for Shell integration, and lists what the Shell can test with `mfe-demo`.
- [ ] `README.md` has the three new bullets in the `Documentation & Project Info` section and nothing else changed.
- [ ] No `src/` or config files modified.
- [ ] Single commit with the exact message in §4.7.

## 8. Out of Scope (do NOT do)

- Do NOT update `.agent/project-info/context.md` (handled by Critical Workflow Step 4.6 / Planner, not this sub-step).
- Do NOT mark the TODO task as `[DONE]` (handled by Critical Workflow Step 4.6).
- Do NOT run `ng build`, `ng serve`, or any test command.
- Do NOT push to any remote.
- Do NOT create a fourth docs file or reorganize existing docs.
- Do NOT edit `phase0-agent-notes.md` or any existing docs file.

## 9. Completion Signal

The implementer MUST return a summary stating:
- The three created file paths.
- The `README.md` section edited.
- The commit hash.
- That no `src/` files were modified and no push was performed.
