# Simplification Plan — Task D (Phase 1, Task 10): Documentation Update

> TODO: `.agent/todos/20260803/20260803-todo-2.md` → Section `### 10. Documentation update`.  
> Branch: `feat/mfe-demo-phase1`.  
> Scope: documentation-only; no `src/**` changes.

## 1. Simplification Goals

1. Remove duplication between `README.md` § "View Modes (`DemoConfig`)" and `docs/views-and-config.md` (the interface, coercion rules, view details, title behaviour, and example Footer entries already live in the docs file).
2. Reduce repeated event/payload details across `docs/shell-integration-guide.md` § "What the Shell can test with mfe-demo" and `docs/actions-and-events.md` by cross-linking to the actions doc.
3. Shorten the dense one-paragraph `README.md` § "Status" into a scannable blockquote bullet list.

## 2. Files to Modify

- `README.md`
- `docs/views-and-config.md`
- `docs/shell-integration-guide.md`

## 3. Detailed Steps

### Step 1 — `README.md`: Condense "View Modes (`DemoConfig`)"

Replace lines 133–166 with the concise version below. This removes the duplicated `DemoConfig` interface, coercion paragraph, view details, title behaviour, and example Footer entries — all of which already live in `docs/views-and-config.md`.

Original lines 133–166:

`````markdown
## View Modes (`DemoConfig`)

The Shell transports opaque configuration through the `data` Input. `mfe-demo` interprets it internally as `DemoConfig` (this type lives only inside this repo; the Shell only sees `Record<string, unknown>`):

```ts
type DemoViewMode = 'table' | 'create-form' | 'profile';

interface DemoConfig {
  view?: DemoViewMode;        // default: 'table'
  title?: string;             // pushed via mfe:update-header on init
  profile?: Record<string, unknown>; // mock data when view === 'profile'
  tableRows?: number;         // mock rows when view === 'table'
}
```

The component coerces `data` into a validated `DemoConfig` via `coerceDemoConfig` (see `src/app/demo/demo-config.ts`): unknown or invalid `view` values fall back to `'table'`, non-string `title` is dropped, non-plain-object `profile` is dropped, and non-finite / negative `tableRows` falls back to the default (`5`). The Shell only ever sees `Record<string, unknown>` — `DemoConfig` is an internal convention of this repo and is **not** part of `@cobranza-apps/mfe-events`.

**View details:**

- **`'table'`** — `DemoTableComponent` renders a mock data table with `config.tableRows` rows. Includes a responsive wrapper (`table-responsive`) for narrow widths.
- **`'create-form'`** — `DemoCreateFormComponent` renders a simulated 2-column form (nombre, documento, email, teléfono, observaciones). No real submit or API call; the primary button dispatches `mfe:show-notification` (success) and `mfe:update-header` (status: `success`).
- **`'profile'`** — `DemoProfileComponent` renders a read-only `<dl>` key-value card from `config.profile`. Falls back to Spanish mock defaults (nombre, DNI, email, saldo, estado) when `profile` is absent. The `estado` field is shown as a colour-coded badge.

**Title behaviour:** When `config.title` is present, it is used for `mfe:update-header`. When absent, the title defaults to `"Demo – <ViewLabel>"` (e.g. `"Demo – Tabla"`, `"Demo – Alta"`, `"Demo – Perfil"`) and auto-updates when the view changes.

Example Footer entries (Shell side):

```ts
{ moduleType: 'demo', label: 'Demo – Tabla',  config: { view: 'table' } },
{ moduleType: 'demo', label: 'Demo – Alta',   config: { view: 'create-form', title: 'Alta simulada' } },
{ moduleType: 'demo', label: 'Demo – Perfil', config: { view: 'profile', title: 'Cliente demo', profile: { nombre: 'Juan Pérez', dni: '30111222', saldo: 15000 } } }
```

Details: [`.agent/project-info/brief.md`](.agent/project-info/brief.md) §3.6 and [`.agent/project-info/architecture.md`](.agent/project-info/architecture.md) §5.
`````

New lines 133–166:

`````markdown
## View Modes (`DemoConfig`)

The Shell transports opaque configuration through the `data` Input. `mfe-demo` interprets it internally as `DemoConfig`; the Shell only sees `Record<string, unknown>`.

Supported views: `'table'` (mock data table), `'create-form'` (simulated form), `'profile'` (read-only profile card).

Full field reference, coercion rules, title behaviour, and example Shell Footer entries: [`docs/views-and-config.md`](docs/views-and-config.md).
`````

### Step 2 — `README.md`: Convert "Status" paragraph to bullets

Replace lines 37–39 with the blockquote bullet list below. This keeps the same information but makes it scannable.

Original lines 37–39:

`````markdown
## Status

> **Phase 1 in progress.** The repository is a buildable Angular 22 Native Federation remote. `ng build` and `ng serve` work; the standalone preview host runs at `http://localhost:4201`. All three body views are implemented and switchable via `DemoConfig.view`: `'table'` (mock data table), `'create-form'` (simulated form with no real API), and `'profile'` (read-only profile card with mock defaults). The identity panel, per-instance visual marker, view-driven title behaviour, and core `mfe:*` events (`module-ready`, `update-header`, `show-notification`) are implemented. The full action-button set (8 buttons dispatching `mfe:update-header`, `mfe:show-notification`, `mfe:request-fullscreen`, `mfe:request-remove`, `mfe:request-add-module`, `mfe:module-error`), the per-instance local event log (last 25 in/out events), the collapsible data payload viewer, and the `shell:module-state` / `shell:visibility-changed` / `shell:theme-changed` listeners (filtered by `instanceId`) are implemented. The standalone preview host exposes controls for view switching, sample data, size/collapse/fullscreen toggles, and simulated shell events, and captures every outgoing `mfe:*` event in the console.
`````

New lines 37–39:

`````markdown
## Status

> **Phase 1 in progress.**
>
> - Buildable Angular 22 Native Federation remote; `ng build` and `ng serve` work.
> - Standalone preview host runs at `http://localhost:4201`.
> - All three body views implemented and switchable via `DemoConfig.view`: `table`, `create-form`, `profile`.
> - Identity panel, per-instance visual marker, view-driven title behaviour, and core `mfe:*` events implemented.
> - Full action-button set (8 buttons) dispatching `mfe:update-header`, `mfe:show-notification`, `mfe:request-fullscreen`, `mfe:request-remove`, `mfe:request-add-module`, `mfe:module-error`.
> - Per-instance event log (last 25 events) and collapsible data payload viewer.
> - Listens to `shell:module-state`, `shell:visibility-changed`, and `shell:theme-changed` (filtered by `instanceId`).
> - Standalone preview exposes view/data/size controls and simulated shell events.
`````

### Step 3 — `docs/views-and-config.md`: Shorten create-form table row

Replace line 22 to avoid repeating the button-event details that are canonical in `docs/actions-and-events.md`.

Original line 22:

`````markdown
| `create-form` | Alta | `DemoCreateFormComponent` | `app-demo-create-form` | Simulated 2-column form (nombre, documento, email, teléfono, observaciones). No real submit / no API. Primary button dispatches `mfe:show-notification` (success) + `mfe:update-header` (status `success`); secondary button resets the form and dispatches an info notification. |
`````

New line 22:

`````markdown
| `create-form` | Alta | `DemoCreateFormComponent` | `app-demo-create-form` | Simulated 2-column form (nombre, documento, email, teléfono, observaciones). No real submit / no API. Form actions dispatch events documented in [`actions-and-events.md`](actions-and-events.md). |
`````

### Step 4 — `docs/shell-integration-guide.md`: Deduplicate "What the Shell can test" table

Replace lines 26–40 with the version below. The detailed button payloads are already in `docs/actions-and-events.md`, so the table now focuses on the Shell feature being exercised and links to the actions doc where appropriate.

Original lines 26–40:

`````markdown
## What the Shell can test with mfe-demo

| Shell functionality | How mfe-demo helps |
| ------------------- | ------------------ |
| Multi-instance | Add several `demo` Footer entries; each instance gets a unique `instanceId` and a distinct visual marker (hue derived from `instanceId`). Event logs stay isolated per instance. |
| 50 % / 100 % sizing | Toggle the `size` Input or send `shell:module-state`; the table/form/profile reflow and the identity panel updates its size label. |
| Collapse / fullscreen | Toggle `isCollapsed` / `isFullscreen` Inputs or send `shell:module-state`; identity panel badges update. |
| Header title & status | Use the "Actualizar título" button or send a `data` Input with a `title`; `mfe:update-header` updates the Shell header. |
| Notifications | Three buttons dispatch `mfe:show-notification` (success / warning / error) so the Shell toast pipeline can be verified. |
| Fullscreen request | "Pantalla completa" dispatches `mfe:request-fullscreen` so the Shell can test its fullscreen transition + the resulting `shell:module-state` echo. |
| Module removal | "Quitar módulo" dispatches `mfe:request-remove` so the Shell can test instance removal. |
| Add-module flow | "Agregar instancia" dispatches `mfe:request-add-module` with `initialData`; the Shell can test creating a new pre-configured instance. |
| Error path | "Simular error" dispatches `mfe:module-error` so the Shell can test its error-handling UI. |
| Configuration transport | Footer `config` → `data` round-trip can be inspected live in the data payload viewer. |
| Visibility | Send `shell:visibility-changed`; the identity panel shows a Visible/Oculto badge with the reason. |
`````

New lines 26–40:

`````markdown
## What the Shell can test with mfe-demo

> Button-triggered `mfe:*` events are documented in [`actions-and-events.md`](actions-and-events.md). The table below focuses on the Shell feature being exercised.

| Shell functionality | How mfe-demo helps |
| ------------------- | ------------------ |
| Multi-instance | Add several `demo` Footer entries; each instance gets a unique `instanceId` and a distinct visual marker. Event logs stay isolated per instance. |
| 50 % / 100 % sizing | Toggle the `size` Input or send `shell:module-state`; the views reflow and the identity panel updates its size label. |
| Collapse / fullscreen | Toggle `isCollapsed` / `isFullscreen` Inputs or send `shell:module-state`; identity panel badges update. |
| Header title & status | Update via the "Actualizar título" button or a `data` Input with `title`; see [`actions-and-events.md`](actions-and-events.md) for the payload. |
| Notifications | Verify the Shell toast pipeline with the three notification buttons. |
| Fullscreen request | Test the Shell fullscreen transition and the resulting `shell:module-state` echo. |
| Module removal | Test instance removal. |
| Add-module flow | Test creating a new pre-configured instance via `mfe:request-add-module`. |
| Error path | Test Shell error-handling UI via `mfe:module-error`. |
| Configuration transport | Inspect the Footer `config` → `data` round-trip live in the data payload viewer. |
| Visibility | Send `shell:visibility-changed`; the identity panel shows a Visible/Oculto badge with the reason. |
`````

## 4. Verification

1. Read each modified file and confirm:
   - All links resolve (relative paths and anchors).
   - No literal `\n` sequences appear in file content.
   - No commented-out Markdown or code blocks.
   - The `## Table of Contents` entries in `docs/views-and-config.md` and `docs/shell-integration-guide.md` still match their headings.
2. Run `git status`. The only changed files should be:
   - `README.md`
   - `docs/views-and-config.md`
   - `docs/shell-integration-guide.md`
3. Do **not** modify any `src/**`, `federation.config.js`, `angular.json`, `.agent/**`, or `.kilo/**` file.

## 5. Out of Scope

- No source-code changes.
- No new documentation files.
- No push to remotes.
- Do not update `.agent/project-info/context.md`.

## 6. Completion Signal

Return a summary stating:
- Which files were simplified.
- The approximate line-count reduction.
- That no `src/` files were modified and no push was performed.
