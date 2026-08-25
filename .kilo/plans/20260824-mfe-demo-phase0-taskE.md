# Plan — Task E (TODO Task 11): README & Agent Notes

- **TODO:** `.agent/todos/20260803/20260803-todo-1.md` → Task 11 (README & agent notes)
- **Branch:** `feat/mfe-demo-phase0` (already created in Step 2; do NOT create/switch branches)
- **Scope:** Documentation only. Update `README.md` to reflect the completed Phase 0 work, and create one optional `docs/phase0-agent-notes.md` file. No source code changes.
- **Target implementer:** JUNIOR developer under 50% restriction. All wording, structure, and scope decisions are encoded below.

## 1. Context Summary (verified facts)

| Item | Verified value |
| ---- | --------------- |
| Federation remote name | `mfe-demo` (confirmed in `federation.config.js` line 7) |
| Exposed module | `./Component` → `./src/app/demo/demo.component.ts` (confirmed in `federation.config.js` line 9) |
| Exposed component selector | `cba-demo` (confirmed in `demo.component.ts` line 30) |
| `moduleType` (Shell side) | `demo` |
| Dev port | `4201` (confirmed in `angular.json` → `architect.serve-original.options.port`) |
| Native Federation manifest (local dev) | `http://localhost:4201/remoteEntry.json` (standard Native Federation convention; served at dev server root) |
| `package.json` scripts | `ng`, `serve` (= `ng serve`), `build` (= `ng build`). **No `start` script.** |
| Theme | `src/styles.scss` → `@use '@cobranza-apps/ui/theme';` |
| Entry flow | `src/main.ts` → `initFederation()` → dynamic `import('./bootstrap')` → `src/bootstrap.ts` |
| Standalone preview | Route `''` → `DemoPreviewComponent`; controls for `size`, `view`, `title`; console-logs `mfe:module-ready` + `mfe:update-header` |
| `DemoConfig` | Defined in `src/app/demo/demo-config.ts` with `coerceDemoConfig` validator and `DEFAULT_DEMO_CONFIG` (`view: 'table'`, `tableRows: 5`) |
| Phase 0 view bodies | Only `'table'` implemented; `'create-form'` and `'profile'` render the placeholder "Vista aún no implementada en Phase 0" |
| Events dispatched | `mfe:module-ready`, `mfe:update-header` (on init) |
| Events listened | `shell:module-state`, `shell:visibility-changed`, `shell:theme-changed` (filtered by `instanceId` except theme) |

## 2. High-Level Approach

1. Update `README.md` in place — replace the stale "early/greenfield" sections (`Status`, `Dev Ports & CORS`, `Quick Start`, `Federation Configuration`, `Federation Identity`, `Project Structure`, `View Modes`) with content reflecting the now-completed Phase 0. Add one bullet to `Documentation & Project Info` linking the new agent-notes doc.
2. Create `docs/phase0-agent-notes.md` — a short reference for AI agents covering federation identity, folder layout, Phase 0 boundaries (implemented vs deferred), and agent conventions.
3. Update `.agent/project-info/context.md` `Current Work Focus` / `Recent Changes` to record Task E.
4. Commit everything in one commit.

No new source files. No `package.json` / `angular.json` / federation config changes. No git branch operations.

## 3. Pre-Conditions

- Working tree is on `feat/mfe-demo-phase0` (verify with `git branch --show-current`; do NOT switch branches — branch creation is restricted to Step 2 of the Critical Workflow, already done).
- `README.md` and `docs/` exist (verified).
- Before committing, run `git status` and ensure no `.gitignore`-matching files (e.g. `node_modules/`, `dist/`, `.kilo/agent-manager.json`) are staged.

## 4. Step 1 — Update `README.md`

Edit tool: prefer `vscode-mcp-server_replace_lines_code` (structured, exact line ranges). Fallback: `edit` with the section heading + body as the `oldString` anchor. Replace each section **from its `## ` heading up to (but not including) the next `## ` heading**. Do NOT alter the Table of Contents block (lines 7–22) — section titles are unchanged, so all anchors remain valid.

### 4.1 Replace the `## Status` section

**Current content to replace** (lines 37–41):

```markdown
## Status

> **Early / greenfield.** `src/` currently contains only `.gitkeep`; there is no `package.json`, `angular.json`, or `federation.config.js` yet. `.nvmrc` pins Node `22.22.3`.
>
> The Quick Start and Federation Configuration sections describe the **planned** setup and will become available after the Angular + Native Federation scaffolding task.
```

**New content:**

```markdown
## Status

> **Phase 0 complete.** The repository is a buildable Angular 22 Native Federation remote. `ng build` and `ng serve` work; the standalone preview host runs at `http://localhost:4201`. The default `'table'` view, identity panel, per-instance visual marker, and core `mfe:*` events (`module-ready`, `update-header`) are implemented. `'create-form'` and `'profile'` view bodies are placeholders ("Vista aún no implementada en Phase 0"); the full action-button set, local event log UI, and real Shell integration testing are deferred to a later phase.
```

### 4.2 Replace the `## Federation Identity` table rows

**Current content to replace** (the two table rows with "(suggested; confirm with Shell)"):

```markdown
| Federation remote name | `mfe-demo` (suggested; confirm with Shell) |
| Exposed module | `./Component` (suggested; confirm with Shell) |
```

**New content:**

```markdown
| Federation remote name | `mfe-demo` |
| Exposed module | `./Component` → `src/app/demo/demo.component.ts` (selector `cba-demo`) |
```

Leave the other rows (`Repo / app name`, `moduleType`, `Config shape`, `npm scope`) unchanged.

### 4.3 Replace the `## Dev Ports & CORS` section

**Current content to replace** (lines 80–82):

```markdown
## Dev Ports & CORS

> **TBD.** This section will document the standalone preview port and the Shell origin allowed for CORS / federation public path once the dev server is configured. No port numbers are invented here.
```

**New content:**

```markdown
## Dev Ports & CORS

- **Standalone preview:** `http://localhost:4201` (configured in `angular.json` → `architect.serve-original.options.port`).
- **Shell (local dev):** run the Shell on its own port (see the Shell repo) and point its federation config at this remote's manifest: `http://localhost:4201/remoteEntry.json`.
- **Public path / CORS:** the Angular dev server serves the Native Federation manifest (`remoteEntry.json`) at the dev server root; cross-origin loading is handled via import maps and `es-module-shims`. No extra CORS configuration is needed for local `localhost` dev. Confirm the exact `remoteEntry` URL and remote name against the Shell's federation config.
```

### 4.4 Replace the `## Quick Start` section

**Current content to replace** (lines 84–101):

```markdown
## Quick Start

Prerequisites:

- Node.js `22.22.3` (see `.nvmrc`). Run `nvm use` or `fnm use`.
- npm (no global installs).

```bash
# Install dependencies (after package.json exists)
npm install

# Run standalone preview (after Angular + Native Federation scaffolding)
npm start
# or
ng serve
```

To run inside the Shell, start the Shell separately and add a Footer entry with `moduleType: 'demo'`. See the Shell repository for its run instructions.
```

**New content:**

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

The standalone preview host (`DemoPreviewComponent`) at route `/` injects mock Inputs into `DemoComponent` and exposes controls for `size`, `view`, and `title`. Open the browser console to verify the dispatched `mfe:module-ready` and `mfe:update-header` events.

To run inside the Shell, start the Shell separately and add a Footer entry with `moduleType: 'demo'`, pointing its federation config at `http://localhost:4201/remoteEntry.json` (remote name `mfe-demo`, exposed module `./Component`). See the Shell repository for its run instructions.
```

> Note for implementer: the `package.json` defines a `serve` script (not `start`), so `npm start` would fail. Use `npm run serve` (or `npx ng serve`).

### 4.5 Replace the `## Federation Configuration` section

**Current content to replace** (lines 103–112):

```markdown
## Federation Configuration

> **Pending scaffolding.** Planned `federation.config.js` shape:

- Remote name: `mfe-demo`
- Exposed module: `./Component` → standalone `DemoComponent`
- Public path configured for cross-origin dev with the Shell
- Shared dependencies aligned with Shell / `@cobranza-apps/ui`

See [`.agent/project-info/architecture.md`](.agent/project-info/architecture.md) §6 for the federation & hosting reference.
```

**New content:**

```markdown
## Federation Configuration

`federation.config.js` configures this app as a Native Federation remote:

- **Remote name:** `mfe-demo`
- **Exposed module:** `./Component` → `./src/app/demo/demo.component.ts` (standalone `DemoComponent`, selector `cba-demo`)
- **Shared dependencies:** `shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto', includeSecondaries: false })` — aligned with the Shell and `@cobranza-apps/ui`.
- **Skipped RxJS entry points:** `rxjs/ajax`, `rxjs/fetch`, `rxjs/testing`, `rxjs/webSocket`.
- **Public path:** handled by the Angular dev server; the remote serves `remoteEntry.json` at `http://localhost:4201/remoteEntry.json` during local dev.

Entry flow: `src/main.ts` calls `initFederation()` then dynamically imports `src/bootstrap.ts` to bootstrap the Angular application.

See [`.agent/project-info/architecture.md`](.agent/project-info/architecture.md) §6 for the federation & hosting reference.
```

> Note for implementer: the `includeSecondaries: false` spelling above matches the actual `federation.config.js`. Reproduce it verbatim.

### 4.6 Replace the `## View Modes (`DemoConfig`)` section — add coercion note

This section currently spans lines 126–149. Do **not** replace the whole section. Insert one paragraph **immediately after** the closing ` ``` ` of the `DemoConfig` TS block (after line 139) and **before** the `Example Footer entries (Shell side):` line (line 141).

**Anchor (the line just before the insertion point):**

```markdown
```
```

(the closing fence of the `interface DemoConfig { ... }` block)

**Insert this paragraph between the closing fence and the `Example Footer entries` line:**

```markdown
The component coerces `data` into a validated `DemoConfig` via `coerceDemoConfig` (see `src/app/demo/demo-config.ts`): unknown or invalid `view` values fall back to `'table'`, non-string `title` is dropped, non-plain-object `profile` is dropped, and non-finite / negative `tableRows` falls back to the default (`5`). The Shell only ever sees `Record<string, unknown>` — `DemoConfig` is an internal convention of this repo and is **not** part of `@cobranza-apps/mfe-events`.
```

Leave the rest of the section (the `Example Footer entries` block and the `Details:` link line) unchanged.

### 4.7 Replace the `## Project Structure` section

**Current content to replace** (lines 151–175):

```markdown
## Project Structure

Planned `src/` layout (after scaffolding):

```text
src/
├── app/
│   ├── demo/        # main exposed component + views
│   ├── core/        # optional event-helper wrappers
│   └── app.config.ts
├── bootstrap.ts     # federation bootstrap if required
├── index.html
└── styles.scss      # imports @cobranza-apps/ui theme

federation.config.js # Native Federation config (pending)
public/
package.json         # (pending)
angular.json         # (pending)
tsconfig*.json       # (pending)
.nvmrc               # Node 22.22.3
README.md
docs/                # optional short USAGE for agents
```

See [`.agent/project-info/architecture.md`](.agent/project-info/architecture.md) §3 for the full architecture and component layout.
```

**New content:**

```markdown
## Project Structure

Current `src/` layout:

```text
src/
├── app/
│   ├── demo/
│   │   ├── demo.component.ts        # main exposed standalone component (cba-demo)
│   │   ├── demo.component.html
│   │   ├── demo.component.scss
│   │   ├── demo-config.ts           # DemoViewMode + DemoConfig + coerceDemoConfig
│   │   └── views/
│   │       └── demo-table/          # mock table sub-component (view === 'table')
│   ├── demo-preview/                # standalone preview host (ng serve)
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts                # route '' → DemoPreviewComponent
├── bootstrap.ts                     # Angular bootstrap (loaded after initFederation)
├── index.html
├── main.ts                          # initFederation() → import('./bootstrap')
└── styles.scss                      # imports @cobranza-apps/ui theme

federation.config.js                 # Native Federation remote config
angular.json                         # Angular CLI config (dev port 4201)
package.json
tsconfig*.json
.nvmrc                               # Node 22.22.3
README.md
docs/                                # agent / usage notes
```

See [`.agent/project-structure.md`](.agent/project-structure.md) for the maintained folder list and [`.agent/project-info/architecture.md`](.agent/project-info/architecture.md) §3 for the architecture reference.
```

### 4.8 Add a bullet to the `## Documentation & Project Info` section

This section starts at line 177. Add one new bullet immediately after the existing `docs/how-to-set-up-git.md` bullet (line 188), before the `## For AI Agents` heading.

**Anchor (existing last docs bullet):**

```markdown
- [`docs/how-to-set-up-git.md`](docs/how-to-set-up-git.md) — guide for Git setup.
```

**Replace it with:**

```markdown
- [`docs/how-to-set-up-git.md`](docs/how-to-set-up-git.md) — guide for Git setup.
- [`docs/phase0-agent-notes.md`](docs/phase0-agent-notes.md) — Phase 0 boundaries and folder layout notes for AI agents.
```

## 5. Step 2 — Create `docs/phase0-agent-notes.md`

Create a **new file** at `docs/phase0-agent-notes.md` with exactly the following content (real newline characters, no literal `\n`):

```markdown
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
```

## 6. Step 3 — Update `.agent/project-info/context.md`

This is project-info upkeep (per `instructions.md` → Regular Task Execution & Context Upkeep). Update three fields:

### 6.1 `Current Work Focus` section

Replace the existing block (lines 18–22) with:

```markdown
Executing `.agent/todos/20260803/20260803-todo-1.md` via the Critical Workflow — Task E: README & Agent Notes.

1. Task 11 — Update `README.md` to reflect completed Phase 0 work and create `docs/phase0-agent-notes.md`.
```

### 6.2 `Recent Changes` section

Append a new bullet after the existing bullet (line 25), keeping the existing entry:

```markdown
- Updated `README.md` (Status, Dev Ports, Quick Start, Federation Configuration, Federation Identity, Project Structure, View Modes) to reflect completed Phase 0.
- Created `docs/phase0-agent-notes.md` with federation identity, folder layout, and Phase 0 boundaries for AI agents.
```

### 6.3 `Open Questions / Decisions Pending` section

Remove the three bullets that are now resolved (federation remote name, exposed module path, dev ports — all confirmed). Leave the "Optional inputs" bullet (pixel size / minHeight) since it remains unresolved.

Replace the four-bullet block (lines 35–38) with:

```markdown
- **Optional inputs:** Whether the Shell passes pixel size / `minHeight` via Inputs or events (brief §3.2 optional row) — affects `architecture.md` Inputs table.
```

## 7. Verification

After edits, run these checks (documentation-only change; build should be unaffected, but verify no source files were accidentally touched):

1. `git status` — confirm only `README.md`, `docs/phase0-agent-notes.md`, and `.agent/project-info/context.md` are modified/added. No `src/`, `package.json`, `angular.json`, `federation.config.js`, or `node_modules/` changes.
2. `git diff README.md` — visually confirm the eight section updates are present and the TOC block (lines 7–22) is unchanged.
3. `npm run build` — must still succeed (sanity check that no source was touched). If it fails for reasons unrelated to docs, stop and report to caller.
4. Confirm `docs/phase0-agent-notes.md` exists and the README `Documentation & Project Info` section links to it.
5. Confirm no `.gitignore`-matching files are staged (Gitignore Compliance Rule).

## 8. Commit

Single commit on `feat/mfe-demo-phase0`. Do NOT push (push is restricted to Step 5 of the Critical Workflow).

```bash
git add README.md docs/phase0-agent-notes.md .agent/project-info/context.md
git commit -m "docs(mfe-demo): update README for Phase 0 and add phase0 agent notes"
```

## 9. Out of Scope (do NOT do)

- Do NOT create or modify any source file under `src/`.
- Do NOT modify `package.json`, `angular.json`, `federation.config.js`, or `tsconfig*.json`.
- Do NOT create or switch git branches (restricted to Step 2).
- Do NOT push to any remote (restricted to Step 5).
- Do NOT mark TODO Task 11 as `[DONE]` (that is Step 4.6, a separate assignment).
- Do NOT update `tech.md` or `architecture.md` — their "Pending scaffolding" / "TBD" notes are out of scope for this task; only `README.md`, the new doc, and `context.md` are touched.
- Do NOT add a `start` script to `package.json` to make `npm start` work — use `npm run serve` in the README instead.

## 10. Deliverables

- Updated `README.md` reflecting the completed Phase 0 (quick start works, federation identity confirmed, port 4201 documented, `DemoConfig` + `coerceDemoConfig` explained, Shell loading notes present).
- New `docs/phase0-agent-notes.md`.
- Updated `.agent/project-info/context.md`.
- One commit on `feat/mfe-demo-phase0`.
