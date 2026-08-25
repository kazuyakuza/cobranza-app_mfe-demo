# mfe-demo

Demo / placeholder / reference **Micro-frontend (MFE)** remote for the Company Back-office Shell. Built with Angular 22 and `@angular-architects/native-federation`.

> Source of truth: [`.agent/project-info/brief.md`](.agent/project-info/brief.md). On any conflict, `brief.md` wins.

## Table of Contents

- [Purpose](#purpose)
- [What It Is Not](#what-it-is-not)
- [Status](#status)
- [Tech Stack](#tech-stack)
- [Federation Identity](#federation-identity)
- [Development Modes](#development-modes)
- [Dev Ports & CORS](#dev-ports--cors)
- [Quick Start](#quick-start)
- [Federation Configuration](#federation-configuration)
- [Shell ↔ MFE Contract (summary)](#shell--mfe-contract-summary)
- [View Modes (`DemoConfig`)](#view-modes-democonfig)
- [Project Structure](#project-structure)
- [Documentation & Project Info](#documentation--project-info)
- [For AI Agents](#for-ai-agents)

## Purpose

1. **Test harness** for the Shell while it is WIP — workspace rows, sizing, collapse, fullscreen, drag & drop, persistence, and multi-instance.
2. **Living reference** for the Shell ↔ MFE contract (Inputs + `@cobranza-apps/mfe-events`).
3. **Placeholder** that can appear in the Footer config so developers can add modules without waiting for real business MFEs.

## What It Is Not

- Not a runtime base class, library, or business domain module (no clients, debts, bank statements).
- Not part of the production product UI for end companies (may stay available in non-prod environments).
- Not a monorepo. This repository contains only the `mfe-demo` remote.
- Not responsible for workspace layout, drag-and-drop, persistence, auth, or module chrome — those belong to the Shell / `@cobranza-apps/ui`.

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

## Tech Stack

| Item | Choice | Notes |
| ------ | -------- | ------- |
| Framework | Angular 22 (standalone components only) | Matches Shell and `@cobranza-apps/ui` major version (currently `22.1.2`) |
| Micro-frontend | `@angular-architects/native-federation` | Remote configuration; exposes one bootstrap / entry component |
| Builder | esbuild (Angular application builder) | |
| UI / Theme | `@cobranza-apps/ui` | Theme SCSS, `cba-*` components, `ModuleHeader` / `ModuleContainer` |
| Events | `@cobranza-apps/mfe-events` | Typed Shell ↔ MFE event contracts (required) |
| Domain models | `@cobranza-apps/entities` | Optional; only if needed for type demos |
| CSS | Bootstrap 5 (peer of UI lib) + UI tokens | No parallel styling |
| Icons | Font Awesome Free (via UI lib) | |
| Language | TypeScript 5.x | |
| Testing | Vitest / Jest + Angular testing utilities | |
| Node.js | `22.22.3` (pinned in `.nvmrc`) | Use `nvm use` / `fnm use` |
| Package manager | npm | No global installs |

See [`.agent/project-info/tech.md`](.agent/project-info/tech.md) for the full technical reference.

Related packages: `@cobranza-apps/ui` (theme and components), `@cobranza-apps/mfe-events` (required event contracts), and optionally `@cobranza-apps/entities`.

## Federation Identity

| Concept | Value |
| --------- | -------- |
| Repo / app name | `mfe-demo` |
| Federation remote name | `mfe-demo` |
| Exposed module | `./Component` → `src/app/demo/demo.component.ts` (selector `cba-demo`) |
| `moduleType` string in Shell | `demo` |
| Config shape | Internal `DemoConfig` / `DemoViewMode` (lives only inside this repo) |
| npm scope | Optional; not required for Phase 0 if loaded from URL |

## Development Modes

1. **Standalone preview** — `ng serve` runs the app alone with a minimal local host page that simulates Shell Inputs and listens to `mfe:*` events. The preview host allows selecting / injecting different `DemoConfig` values (e.g. a small selector for `view`). Useful for UI work without the full Shell.
2. **Loaded by Shell** (primary mode) — the Shell loads the remote via Native Federation and injects it into the workspace / fullscreen outlet. Different Footer entries (or `initialData`) drive the different views.

## Dev Ports & CORS

- **Standalone preview:** `http://localhost:4201` (configured in `angular.json` → `architect.serve-original.options.port`).
- **Shell (local dev):** run the Shell on its own port (see the Shell repo) and point its federation config at this remote's manifest: `http://localhost:4201/remoteEntry.json`.
- **Public path / CORS:** the Angular dev server serves the Native Federation manifest (`remoteEntry.json`) at the dev server root; cross-origin loading is handled via import maps and `es-module-shims`. No extra CORS configuration is needed for local `localhost` dev. Confirm the exact `remoteEntry` URL and remote name against the Shell's federation config.

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

**Theming:** `src/styles.scss` imports the shared theme via `@use '@cobranza-apps/ui/theme'`. This resolves because `angular.json` → `esbuild.options.stylePreprocessorOptions.includePaths` adds `node_modules` to the Sass include paths (required for the Angular esbuild builder, which does not include it by default).

## Federation Configuration

`federation.config.js` configures this app as a Native Federation remote:

- **Remote name:** `mfe-demo`
- **Exposed module:** `./Component` → `./src/app/demo/demo.component.ts` (standalone `DemoComponent`, selector `cba-demo`)
- **Shared dependencies:** `shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto', includeSecondaries: false })` — aligned with the Shell and `@cobranza-apps/ui`.
- **Skipped RxJS entry points:** `rxjs/ajax`, `rxjs/fetch`, `rxjs/testing`, `rxjs/webSocket`.
- **Public path:** handled by the Angular dev server; the remote serves `remoteEntry.json` at `http://localhost:4201/remoteEntry.json` during local dev.

Entry flow: `src/main.ts` calls `initFederation()` then dynamically imports `src/bootstrap.ts` to bootstrap the Angular application.

See [`.agent/project-info/architecture.md`](.agent/project-info/architecture.md) §6 for the federation & hosting reference.

## Shell ↔ MFE Contract (summary)

The MFE communicates with the Shell only via Angular Inputs and `@cobranza-apps/mfe-events`. It never manipulates DOM outside its own container and never knows about workspace layout.

| Direction | Channel | Details |
| --------- | ------- | ------- |
| Shell → MFE | Component Inputs | `moduleType`, `instanceId`, `size`, `isCollapsed`, `isFullscreen`, `data`, optional pixel-size / minHeight inputs. |
| MFE → Shell | `@cobranza-apps/mfe-events` | `mfe:module-ready`, `mfe:update-header`, `mfe:show-notification`, `mfe:request-fullscreen`, `mfe:request-remove`, `mfe:module-error`, `mfe:request-add-module`, `mfe:update-min-height` (declares preferred `minHeightPx`; Shell persists + applies as CSS). |
| Shell → MFE | `@cobranza-apps/mfe-events` | `shell:module-state` (size, width/height, isCollapsed, isFullscreen, optional `dragState` / `previewMode`), `shell:visibility-changed`, `shell:theme-changed` (filter by `instanceId`). |

Full tables and critical paths: [`.agent/project-info/architecture.md`](.agent/project-info/architecture.md) §4 and §8.

## View Modes (`DemoConfig`)

The Shell transports opaque configuration through the `data` Input. `mfe-demo` interprets it internally as `DemoConfig`; the Shell only sees `Record<string, unknown>`.

Supported views: `'table'` (mock data table), `'create-form'` (simulated form), `'profile'` (read-only profile card).

Full field reference, coercion rules, title behaviour, and example Shell Footer entries: [`docs/views-and-config.md`](docs/views-and-config.md).

## Project Structure

Current `src/` layout:

```text
src/
├── app/
│   ├── demo/
│   │   ├── demo.component.ts        # main exposed standalone component (cba-demo)
│   │   ├── demo.component.html
│   │   ├── demo.component.scss
│   │   ├── demo-config.ts           # DemoViewMode + DemoConfig + coerceDemoConfig + view helpers
│   │   ├── demo-dispatcher.ts       # outgoing mfe:* event dispatcher + header title cycling
│   │   ├── demo-event-log.ts        # per-instance bounded event log (last 25 in/out events)
│   │   ├── demo-shell-state.ts      # shell-driven signals + display computeds for identity panel
│   │   ├── demo-utils.ts            # pure utility functions (hashString, truncateInstanceId)
│   │   └── views/
│   │       ├── demo-table/          # mock table sub-component (view === 'table')
│   │       ├── demo-create-form/    # simulated create form (view === 'create-form')
│   │       └── demo-profile/        # read-only profile card (view === 'profile')
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

## Documentation & Project Info

- [`.agent/project-info/brief.md`](.agent/project-info/brief.md) — core requirements and scope (source of truth).
- [`.agent/project-info/product.md`](.agent/project-info/product.md) — product / UX reference.
- [`.agent/project-info/architecture.md`](.agent/project-info/architecture.md) — system architecture, contract, critical paths.
- [`.agent/project-info/tech.md`](.agent/project-info/tech.md) — stack, setup, constraints, tooling.
- [`.agent/project-info/context.md`](.agent/project-info/context.md) — current state and work focus.
- [`.agent/project-info/instructions.md`](.agent/project-info/instructions.md) — project-info instructions for agents.
- [`.agent/WORKFLOWS.md`](.agent/WORKFLOWS.md) — project workflows.
- [`.kilo/commands/critical-workflow.md`](.kilo/commands/critical-workflow.md) — critical workflow reference.
- [`docs/how-to-write-todo-files.md`](docs/how-to-write-todo-files.md) — guide for writing TODO files.
- [`docs/how-to-set-up-git.md`](docs/how-to-set-up-git.md) — guide for Git setup.
- [`docs/phase0-agent-notes.md`](docs/phase0-agent-notes.md) — Phase 0 boundaries and folder layout notes for AI agents.
- [`docs/views-and-config.md`](docs/views-and-config.md) — the three views and how to select them via Footer `config` / `data` / `initialData`.
- [`docs/actions-and-events.md`](docs/actions-and-events.md) — action buttons and which `mfe:*` events they fire.
- [`docs/shell-integration-guide.md`](docs/shell-integration-guide.md) — event log & data viewer debugging surfaces and how the Shell can use `mfe-demo` as a test harness.
- [`docs/mfe-demo-shell-usage.md`](docs/mfe-demo-shell-usage.md) — ready-to-copy Footer definitions, min-height contract, and manual test scenarios for Shell developers.

## For AI Agents

All agents MUST follow the workflows and rules in [`AGENTS.md`](AGENTS.md), the procedures in [`.agent/WORKFLOWS.md`](.agent/WORKFLOWS.md) (especially the [Critical Workflow](.kilo/commands/critical-workflow.md)), and read [`.agent/project-info/context.md`](.agent/project-info/context.md) for the current project state before starting any task.
