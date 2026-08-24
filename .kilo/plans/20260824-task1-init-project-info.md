# Plan — Task 1: Initialize Project Info (4 core files)

- **Date:** 2026-08-24
- **TODO:** `.agent/todos/20260803/20260803-todo-0.md` → line 1 `initialize project info`
- **Branch:** `feat/init-project-info-and-readme` (already created in Step 2)
- **Scope:** Create the 4 missing core project-info files under `.agent/project-info/`: `product.md`, `context.md`, `architecture.md`, `tech.md`. Plus remove the `.initialized` marker file (mandated by `.agent/project-info/instructions.md` → "Project Info Initialization").
- **Source of truth:** `.agent/project-info/brief.md` (already complete). If any conflict arises, `brief.md` wins; alert the caller.
- **Target implementer:** JUNIOR developer under 50% restriction. All structural/scope decisions are encoded below. Do not invent content not derived from `brief.md` or observed repo state.
- **Front-end task?** No. This is documentation initialization. (Step 4.1a not applicable.)

## High-Level Approach

1. The implementer will create 4 markdown files with **exact** content provided in this plan (copy verbatim into each file).
2. Content is derived strictly from `brief.md` (the project source of truth) and observed repository state (`src/` empty, no `package.json`, Node 22.22.3 via `.nvmrc`, README still the base-project template).
3. After the 4 files are created, delete `.agent/project-info/.initialized` (per `instructions.md` initialization workflow).
4. Commit the changes on the current feature branch with a meaningful message.
5. No git push (restricted to Step 5 of Critical Workflow). No branch creation/switch (restricted to Step 2). No version bump (restricted to Step 3).

## Pre-Flight Checks (implementer must perform)

1. Verify current branch is `feat/init-project-info-and-readme`. Command: `git branch --show-current`. If different, STOP and ask caller.
2. Verify `.agent/project-info/brief.md` exists. If missing, STOP and ask caller.
3. Read `.gitignore` and run `git status` before any commit (Gitignore Compliance Rule). Ensure no ignored files (e.g., `.git-credentials`, `.kilo/agent-manager.json`) get staged.

## File Creation Specs

All files use **real newline characters** (Newline Prevention Rule). All files are Markdown. Do not add emojis. Do not add content beyond what is specified.

### File 1: `.agent/project-info/product.md`

Create with `vscode-mcp-server_create_file_code` (path `.agent/project-info/product.md`, `overwrite: false`, `ignoreIfExists: false`).

Exact content:

```markdown
# mfe-demo — Product

> Source of truth: [`brief.md`](brief.md). On conflict, `brief.md` wins.

## 1. Problem Definition

The Company Back-office Shell is a workspace-style host that loads multiple Micro-frontends (MFEs) via Native Federation. While the Shell is Work-In-Progress, there is no real business MFE available to:

- Validate the Shell ↔ MFE contract (Inputs, events, multi-instance, sizing, fullscreen, persistence).
- Let developers add modules to the Footer config without waiting for real business MFEs.
- Show future MFE authors a concrete, working reference of the expected contract.

`mfe-demo` fills that gap as a real Native Federation remote that is intentionally non-business.

## 2. Target Consumers

| Consumer | How they use `mfe-demo` |
| -------- | ----------------------- |
| Company Back-office Shell | Loads the remote during development to test workspace rows, 50%/100% sizing, collapse, fullscreen, drag & drop, persistence, and multi-instance. |
| Future MFE authors (developers) | Read it as a living reference of how a Company MFE must implement the Shell ↔ MFE contract. |
| Footer config authors | Add `demo` entries to surface placeholder modules in non-prod environments. |

UI language: **Spanish only** (no i18n). Target form factor: **Desktop only**.

## 3. Product Goals

1. **Test harness** — Exercise the Shell while it is WIP (workspace rows, 50%/100%, collapse, fullscreen, drag & drop, persistence, multi-instance).
2. **Living reference** — Demonstrate correct implementation of the Shell ↔ MFE contract for future MFEs.
3. **Placeholder** — Appear in the Footer config so developers can add modules without waiting for real business MFEs (`mfe-clients`, `mfe-debts`, etc.).

## 4. User Experience

All content lives inside the MFE container, **below** the Shell-owned `ModuleHeader`. The MFE never re-implements ModuleHeader, drag handle, size toggle, collapse, remove, or fullscreen chrome.

### 4.1 Always-present chrome

1. **Identity panel** — `moduleType`, `instanceId` (shortened + full on hover/copy), current `size`, `isCollapsed`, `isFullscreen`, current `view` mode, and optionally reported width/height in px.
2. **Visual instance marker** — Distinct background tint or coloured left border per instance (hash of `instanceId` → colour) so multi-instance is obvious at a glance.
3. **Action buttons** (using `@cobranza-apps/ui` buttons):
   - Actualizar título / estado del header (`mfe:update-header`)
   - Mostrar notificación success / warning / error (`mfe:show-notification`)
   - Pedir pantalla completa (`mfe:request-fullscreen`)
   - Pedir quitar módulo (`mfe:request-remove`)
   - (Opcional) Pedir agregar otra instancia `demo` (`mfe:request-add-module`)
   - (Opcional) Simular error (`mfe:module-error`)
4. **Data payload viewer** — Pretty-print of the raw `data` Input (when present) for debugging config.
5. **Event log (local)** — Last N events received / sent for this instance, to help debug Shell integration.

### 4.2 View-specific body (driven by `config.view`, default `table`)

| `view` | Content |
| -------- | --------- |
| `table` | Placeholder table / list that reflows with size. Uses `config.tableRows` (or a sensible default) for the number of mock rows. Short text explaining current size mode. Optional static chart placeholder to verify overflow behaviour. |
| `create-form` | Simulated fixed create form (not real, no API). Typical fields: nombre, documento, email, etc. Buttons only show notifications or update header (no real submit). Must remain usable at 50% (short) and 100% (long). |
| `profile` | Read-only profile / detail view (ficha). Key-value list from `config.profile` (or sensible mock defaults if absent). Looks like a client profile card / listado de información. |

View types are based on entities defined in `@cobranza-apps/entities`. Spanish labels only.

## 5. Non-Goals (Out of Scope)

- Business domain logic (clients, debts, bank statements, etc.).
- Real BFF / API calls (Phase 0 = frontend-only; mocks only if needed).
- Auth / login (owned by `mfe-auth` + Shell).
- Workspace layout, drag-and-drop, persistence (owned by Shell).
- Becoming a shared library that other MFEs import.
- Mobile layout.
- i18n.
- Production branding for company end-users (this is a developer tool / placeholder).
- Changes to `@cobranza-apps/mfe-events` for `DemoConfig` (keep `data` / `initialData` as opaque `Record<string, unknown>`).

## 6. Success Criteria

- Shell can load multiple `mfe-demo` instances simultaneously with isolated state per instance.
- Every `mfe:*` event includes `moduleType` + `instanceId`; every listened `shell:*` event is filtered by `instanceId`.
- All three view modes (`table`, `create-form`, `profile`) render correctly and reflow at `50%` and `100%`.
- Footer config entries with different `config` values produce the expected view on mount.
- Standalone preview (`ng serve`) works without the full Shell and allows injecting different `DemoConfig` values.
```

### File 2: `.agent/project-info/context.md`

Create with `vscode-mcp-server_create_file_code` (path `.agent/project-info/context.md`, `overwrite: false`, `ignoreIfExists: false`).

Exact content:

```markdown
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
```

### File 3: `.agent/project-info/architecture.md`

Create with `vscode-mcp-server_create_file_code` (path `.agent/project-info/architecture.md`, `overwrite: false`, `ignoreIfExists: false`).

Exact content:

```markdown
# mfe-demo — Architecture

> Source of truth: [`brief.md`](brief.md). On conflict, `brief.md` wins.

## 1. System Context

```text
+-------------------+        Native Federation (dynamic import)        +-------------------+
|  Back-office Shell| --------------------------------------------------> |   mfe-demo (remote)|
|  (host / workspace)|<------------------- mfe:* events ------------------|   Angular 22 remote|
|  @cobranza-apps/ui |------------------- shell:* events ----------------->|   standalone comp. |
+-------------------+                                                          +-------------------+
        |                                                                 relies on
        |  consumes                                                       @cobranza-apps/ui
        v                                                                 @cobranza-apps/mfe-events
  @cobranza-apps/mfe-events                                               @cobranza-apps/entities (optional)
  @cobranza-apps/ui
  @cobranza-apps/entities
```

`mfe-demo` is a **remote** loaded by the Shell. It is NOT a host, NOT a library, NOT a monorepo. It renders only inside its own container body (below the Shell-owned `ModuleHeader`).

## 2. Architectural Boundaries (Core Rules)

- Never manipulate the DOM outside its own container.
- Never know about rows, drag-and-drop, or the workspace layout engine.
- Communicate with the Shell ONLY via `@cobranza-apps/mfe-events` + Angular Inputs provided by the Shell host.
- Module chrome (title bar actions, drag handle) is owned by the Shell / `@cobranza-apps/ui`. This MFE renders only body content.
- Per-instance state isolation: no shared singleton state across instances.

## 3. Component Architecture (Planned)

```text
src/app/
  demo/
    demo.component.ts        # main exposed standalone component (accepts Inputs §3.2)
    demo.component.html
    demo.component.scss
    demo-config.ts           # DemoViewMode + DemoConfig types (brief §3.6)
    views/                   # optional sub-components: table / create-form / profile
  core/                      # optional event-helper wrappers (filter by instanceId)
  app.config.ts
src/bootstrap.ts             # federation bootstrap if required
src/index.html
src/styles.scss              # imports @cobranza-apps/ui theme
```

Single clear entry component is preferred; sub-views may be plain components or template branches. Keep the surface small.

## 4. Shell ↔ MFE Contract

### 4.1 Inputs (Shell → Component)

| Input | Type | Purpose |
| ------- | ------ | --------- |
| `moduleType` | `string` | Always `'demo'` for this remote |
| `instanceId` | `string` (UUID) | Unique per workspace instance |
| `size` | `'50%' \| '100%'` | Current width fraction (`short`/`long` aliases allowed) |
| `isCollapsed` | `boolean` | Collapsed state |
| `isFullscreen` | `boolean` | Fullscreen state |
| `data` | `Record<string, unknown> \| undefined` | Opaque initial / runtime data (see §5 below) |
| (optional) pixel size / minHeight inputs | as defined by Shell | If Shell prefers Inputs over events for dimensions |

The component must react to Input changes (tables/charts/content adapt when size or fullscreen changes).

### 4.2 Events — MFE → Shell (must implement via `@cobranza-apps/mfe-events`)

| Event | When to fire | Demo behaviour |
| ------- | -------------- | ---------------- |
| `mfe:module-ready` | After first successful mount | Shell can hide skeleton |
| `mfe:update-header` | On init and when user changes title/status in demo UI | Update title + status badge |
| `mfe:show-notification` | Button "Mostrar notificación" | Toast success / warning / error |
| `mfe:request-fullscreen` | Button "Pedir pantalla completa" | Shell switches this instance to fullscreen |
| `mfe:request-remove` | Button "Pedir quitar" (optional) | Shell removes this instance |
| `mfe:module-error` | Only if intentional error demo is triggered | Optional error path |
| `mfe:request-add-module` (optional) | Button asking Shell to add another `demo` instance | May include `initialData` to pre-configure the new instance's view |

### 4.3 Events — Shell → MFE (must listen)

| Event | Demo behaviour |
| ------- | ---------------- |
| `shell:module-state` | Update internal display of size / collapse / fullscreen / dimensions; reflow content |
| `shell:visibility-changed` | Pause / resume heavy work if needed (demo can just log or show a badge) |
| `shell:theme-changed` | Optional; theme is global via CSS tokens — react only if demo needs to |

**Always filter by `instanceId`.** Always review and follow `@cobranza-apps/mfe-events` lib documentation.

## 5. Configurable View Mode (`DemoConfig`)

The Shell transports opaque configuration through `data` — **no changes to `@cobranza-apps/mfe-events` are required**.

```ts
type DemoViewMode = 'table' | 'create-form' | 'profile';

interface DemoConfig {
  /** Which body content to render. Default: 'table'. */
  view?: DemoViewMode;
  /** Optional title to push via mfe:update-header on init. */
  title?: string;
  /** Optional mock profile data when view === 'profile'. */
  profile?: Record<string, unknown>;
  /** Optional number of mock rows when view === 'table'. */
  tableRows?: number;
}
```

Component usage:

```ts
@Input() data: Record<string, unknown> | undefined;

get config(): DemoConfig {
  return (this.data ?? {}) as DemoConfig;
}

get view(): DemoViewMode {
  return this.config.view ?? 'table';
}
```

Data sources: Shell Footer `WorkspaceModuleDefinition.config` → copied to `data`; workspace `WorkspaceModule.data` persisted/restored; Shell → MFE `data` Input; `mfe:request-add-module` `initialData`. The Shell does NOT interpret `data` content.

## 6. Federation & Hosting

- **Remote name:** `mfe-demo` (suggested; confirm with Shell).
- **Exposed module:** `./Component` (suggested; confirm with Shell).
- **Exposed component:** standalone, accepts Inputs from §4.1.
- **Public path / CORS:** configure federation public path so the remote works when Shell and remote run on different origins/ports in local dev. Document expected ports in README.
- **Dev modes:**
  1. **Standalone preview** — `ng serve` with a minimal local host page that simulates Shell Inputs and listens to `mfe:*` events; allows selecting / injecting different `DemoConfig` values.
  2. **Loaded by Shell** — primary mode; Shell loads the remote via Native Federation into the workspace / fullscreen outlet; Footer entries / `initialData` drive the views.

## 7. Design Patterns

- **Standalone components only** (Angular 22, no NgModules).
- **Input-driven reactivity** — content reacts to `Input` changes (`size`, `isFullscreen`, `data`).
- **Event-bus filtering** — all `shell:*` listeners filter by `instanceId` (+ usually `moduleType`).
- **Per-instance state** — no shared singletons; state lives on the component instance.
- **Opaque config contract** — `DemoConfig` is internal to this repo; the Shell only sees `Record<string, unknown>`.
- **CSS tokens / Bootstrap 5** — consume `@cobranza-apps/ui` theme + tokens; do not invent parallel styling.

## 8. Critical Paths

1. **Mount → ready:** component mounts → reads Inputs → emits `mfe:module-ready` → Shell hides skeleton.
2. **Size change → reflow:** Shell changes `size` Input (or sends `shell:module-state`) → component reflows table/form/profile for `50%` vs `100%`.
3. **Fullscreen request:** user clicks "Pedir pantalla completa" → `mfe:request-fullscreen` → Shell switches instance → `shell:module-state` / `isFullscreen` Input reflects new state.
4. **Add module:** user clicks "Pedir agregar" → `mfe:request-add-module` with optional `initialData` → Shell creates new instance → new instance receives `data` Input.
5. **Error path (optional):** user triggers "Simular error" → `mfe:module-error` → Shell handles error UI.

## 9. Min-Height Declaration

If the Shell contract supports it (Input and/or event), declare a sensible `minHeightPx` (enough for header chrome + a small form + a short table). Update it if content changes significantly; different views may need different min-heights.
```

### File 4: `.agent/project-info/tech.md`

Create with `vscode-mcp-server_create_file_code` (path `.agent/project-info/tech.md`, `overwrite: false`, `ignoreIfExists: false`).

Exact content:

```markdown
# mfe-demo — Tech

> Source of truth: [`brief.md`](brief.md). On conflict, `brief.md` wins.

## 1. Technology Stack

| Item | Choice | Notes |
| ------ | -------- | ------- |
| Framework | Angular 22 (standalone components only) | Must match Shell and `@cobranza-apps/ui` major version. Shell and ui lib currently using `22.1.2` |
| Micro-frontend | `@angular-architects/native-federation` | Remote configuration; exposes at least one bootstrap / entry component |
| Builder | esbuild (Angular application builder) | |
| UI / Theme | `@cobranza-apps/ui` | Import theme SCSS; use `cba-*` components where useful |
| Events | `@cobranza-apps/mfe-events` | Required |
| Domain models | `@cobranza-apps/entities` | Optional; only if needed for type demos |
| CSS | Bootstrap 5 (peer of UI lib) + UI tokens | Do not invent parallel styling |
| Icons | Font Awesome Free (via UI lib) | |
| Language | TypeScript 5.x | |
| Testing | Vitest / Jest + Angular testing utilities as needed | |

**No monorepo.** This repository contains only the `mfe-demo` application (remote).

## 2. Runtime Requirements

- **Node.js:** `22.22.3` (pinned in `.nvmrc`). Use `nvm use` / `fnm use` to match.
- **Package manager:** npm (default for Angular CLI). Do not install dependencies globally (Never Global Installs Rule).

## 3. Development Setup

> Status: **Pending scaffolding.** `src/` currently empty (only `.gitkeep`); no `package.json` / `angular.json` yet.

Planned setup steps (to be executed in a future TODO, NOT in this task):

1. Scaffold Angular 22 standalone application with the Angular application builder (esbuild).
2. Add `@angular-architects/native-federation` and configure as a remote.
3. Install peers: `@cobranza-apps/ui`, `@cobranza-apps/mfe-events`, `@cobranza-apps/entities` (optional), Bootstrap 5, Font Awesome Free.
4. Create `federation.config.js` exposing `./Component`.
5. Create `src/bootstrap.ts` (federation bootstrap if required).
6. Create standalone preview host page to simulate Shell Inputs / events.
7. Configure public path / CORS for cross-origin dev with the Shell.

## 4. Federation Configuration

- **Remote name:** `mfe-demo` (suggested).
- **Exposed module:** `./Component` (suggested; confirm with Shell).
- **Public path:** configured so the remote works when Shell and remote run on different origins/ports.

## 5. Dev Ports

> To be documented once the dev server is configured. Expected: one port for `mfe-demo` standalone preview, and the Shell origin for CORS / public path. Update this section and `README.md` when decided.

## 6. Federation Identity / Naming

| Concept | Value |
| --------- | -------- |
| Repo / app name | `mfe-demo` |
| Federation remote name | `mfe-demo` |
| `moduleType` string in Shell | `demo` |
| npm scope (if published) | optional; not required for Phase 0 if loaded from URL |
| Config shape | Internal `DemoConfig` / `DemoViewMode` (lives only inside this repo) |

## 7. Technical Constraints

- Angular **22** standalone components only (no NgModules). Match Shell / `@cobranza-apps/ui` major version `22.1.2`.
- Never manipulate DOM outside the MFE's own container.
- Never know about workspace layout, rows, drag-and-drop, or persistence.
- Communicate with the Shell ONLY via `@cobranza-apps/mfe-events` + Angular Inputs.
- UI language: Spanish only (no i18n). Desktop only (no mobile).
- Do not re-implement ModuleHeader, drag handle, size toggle, collapse, remove, or fullscreen chrome (owned by Shell / UI lib).
- Do not change `@cobranza-apps/mfe-events` for `DemoConfig`; keep `data` / `initialData` as opaque `Record<string, unknown>`.
- No real BFF / API calls in Phase 0 (mocks only if needed).
- No business domain logic, no auth/login (owned by `mfe-auth` + Shell).

## 8. Related Packages

| Package | Usage |
| -------- | ----- |
| `@cobranza-apps/ui` | Theme SCSS, `cba-*` components, ModuleHeader / ModuleContainer, core components. |
| `@cobranza-apps/mfe-events` | Typed Shell ↔ MFE event contracts (required). |
| `@cobranza-apps/entities` | Domain models (optional; only if needed for type examples / view base types). |

Always review and follow each lib's documentation when integrating.

## 9. Testing Approach

- Unit tests for event helpers (instanceId filtering, event payload shape with `moduleType` + `instanceId`).
- Component tests for each view mode (`table`, `create-form`, `profile`) and for reflow at `50%` / `100%`.
- Harness: standalone preview host used to manually verify Shell Inputs / events without the full Shell.

## 10. Code Quality Rules (from `.kilo/rules/`)

- Source files in `src/`: max 200 lines (ideally < 125 excluding blanks/comments/imports).
- Method bodies: max 50 lines.
- Max nesting depth: 2 levels; extract to a method on 3rd level.
- Max 2 params per method; encapsulate more in a typed object (new file when possible).
- Boolean conditions: single section; extract multi-section conditions into a named method.
- Prefer private members by default; expose only when necessary.
- No commented-out code; use VCS history to restore.
- Self-documenting code; minimal comments only for complex business logic.
- No magic numbers; use named constants.
- Newline characters (not literal `\n`) in all file writes.

## 11. Tooling Patterns

- **Angular CLI** for scaffolding / serving / building.
- **esbuild** as the application builder.
- **Native Federation** (`@angular-architects/native-federation`) for remote configuration.
- **Bootstrap 5 + UI tokens** for styling; no parallel design system.

## 12. AI Agent Workflow

- Follow `AGENTS.md` and `.agent/WORKFLOWS.md` at the start of every task.
- Critical Workflow: `.kilo/commands/critical-workflow.md`.
- Project Info upkeep: read `context.md` at the start of every task; update `context.md` before completion.
- Plan files: `.kilo/plans/<YYYYMMDD>-<plan-name>.md`.
- TODO files: `.agent/todos/<YYYYMMDD>/<YYYYMMDD>-todo-<number>.md`.
```

## Post-Creation Step: Remove `.initialized` marker

Per `.agent/project-info/instructions.md` → "Project Info Initialization": after the 4 core files are created, remove the marker file `.agent/project-info/.initialized`.

- **Decision (encoded):** use `git rm -f .agent/project-info/.initialized` (single bash command). This both removes the file from disk and stages the deletion. If `git rm` reports the file is not tracked, fall back to `Remove-Item -LiteralPath ".agent/project-info/.initialized"` as a single bash command (PowerShell is last resort per Tool Selection Priority Rule).

Verify removal: `git status --short` should show `D  .agent/project-info/.initialized` (staged deletion) and the 4 new files as untracked (`??`).

## Commit

Single commit on the current feature branch. Stage exactly these paths:

- `.agent/project-info/product.md`
- `.agent/project-info/context.md`
- `.agent/project-info/architecture.md`
- `.agent/project-info/tech.md`
- `.agent/project-info/.initialized` (deletion)

Commands (each a single bash command, run sequentially via `; if ($?)`):

1. `git add .agent/project-info/product.md .agent/project-info/context.md .agent/project-info/architecture.md .agent/project-info/tech.md`
2. `git rm -f .agent/project-info/.initialized` (if not already removed by `git rm` in a prior step, skip)
3. `git status --short` — verify only the 4 new files + the `.initialized` deletion are staged. If any `.gitignore`-matching file (e.g., `.git-credentials`, `.kilo/agent-manager.json`) appears staged, unstage it: `git restore --staged <path>`.
4. `git commit -m "docs(project-info): add product, context, architecture, tech files; remove .initialized marker"`

Do NOT push. Do NOT create/switch branches. Do NOT bump version.

## Verification (implementer self-check before signalling completion)

1. Confirm the 4 files exist under `.agent/project-info/` with the exact content above.
2. Confirm `.agent/project-info/.initialized` no longer exists.
3. Run `git status --short` — working tree clean (or only unrelated pre-existing changes); the commit is present on `feat/init-project-info-and-readme`.
4. Run `git log --oneline -1` — latest commit is the docs commit above.
5. Confirm no emojis were added to any file.
6. Confirm all files use real newlines (no literal `\n` sequences).

## Out of Scope (do NOT do in this task)

- Updating `README.md` (that is TODO line 2 — Task 2).
- Scaffolding Angular / Native Federation / `package.json`.
- Updating `AGENTS.md` (it already links `brief.md`; no change required for this task).
- Updating `.agent/project-structure.md` (no `src/` folders created in this task).
- Any git push, branch switch, or version bump.

## Deliverable Summary (implementer must return to caller)

- Plan file path: `.kilo/plans/20260824-task1-init-project-info.md`
- Files to create: 4 (product / context / architecture / tech).
- File to delete: `.agent/project-info/.initialized`.
- One commit on `feat/init-project-info-and-readme`.
- No push, no branch change, no version bump.
