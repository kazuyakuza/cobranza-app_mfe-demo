# mfe-demo

Demo / placeholder / reference **Micro-frontend (MFE)** remote for the Company Back-office Shell. Built with Angular 22 and `@angular-architects/native-federation`.

It is a **real Native Federation remote** consumed by the Shell during development and kept as a living example for future Company MFEs.

> Source of truth: [`.agent/project-info/brief.md`](.agent/project-info/brief.md). On any conflict, `brief.md` wins.

## Purpose

`mfe-demo` serves three goals:

1. **Test harness** for the Shell while it is WIP — workspace rows, 50% / 100% sizing, collapse, fullscreen, drag & drop, persistence, and multi-instance.
2. **Living reference** of how a Company MFE must implement the Shell ↔ MFE contract (Inputs + `@cobranza-apps/mfe-events`).
3. **Placeholder** that can appear in the Footer config so developers can add modules without waiting for real business MFEs (`mfe-clients`, `mfe-debts`, etc.).

## What It Is Not

- Not a runtime base class or library that other MFEs depend on.
- Not a business domain module (no clients, debts, bank statements).
- Not part of the production product UI for end companies (may stay available in non-prod environments).
- Not a monorepo. This repository contains only the `mfe-demo` remote.
- Not responsible for workspace layout, drag-and-drop, persistence, auth, or module chrome — those belong to the Shell / `@cobranza-apps/ui`.

## Status

> **Early / greenfield.** The repository is in project-setup phase.
>
> - `src/` currently contains only `.gitkeep` (no Angular scaffolding yet).
> - No `package.json`, `angular.json`, or `federation.config.js` yet.
> - `.nvmrc` pins Node `22.22.3`.
>
> The Quick Start and Federation Configuration sections below describe the **planned** setup. Commands will become available after the Angular + Native Federation scaffolding task is executed.

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

## Federation Identity

| Concept | Value |
| --------- | -------- |
| Repo / app name | `mfe-demo` |
| Federation remote name | `mfe-demo` (suggested; confirm with Shell) |
| Exposed module | `./Component` (suggested; confirm with Shell) |
| `moduleType` string in Shell | `demo` |
| Config shape | Internal `DemoConfig` / `DemoViewMode` (lives only inside this repo) |
| npm scope | Optional; not required for Phase 0 if loaded from URL |

## Development Modes

1. **Standalone preview** — `ng serve` runs the app alone with a minimal local host page that simulates Shell Inputs and listens to `mfe:*` events. The preview host allows selecting / injecting different `DemoConfig` values (e.g. a small selector for `view`). Useful for UI work without the full Shell.
2. **Loaded by Shell** (primary mode) — the Shell loads the remote via Native Federation and injects it into the workspace / fullscreen outlet. Different Footer entries (or `initialData`) drive the different views.

## Dev Ports & CORS

> **TBD.** Dev ports are not yet decided. Once the dev server is configured, this section will document:
>
> - The port used by `mfe-demo` standalone preview.
> - The Shell origin allowed for CORS / federation public path.
>
> Federation public path MUST be configured so the remote works when Shell and remote run on different origins / ports in local dev. No port numbers are invented in this document.

## Quick Start

> Commands below are **planned** and will be available after the scaffolding task. They are documented here for reference.

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

To run loaded by the Shell, start the Shell separately and add a Footer entry with `moduleType: 'demo'`. See the Shell repository for its own run instructions.

## Federation Configuration

> **Pending scaffolding.** A `federation.config.js` (or equivalent Native Federation config) will be created in a future task. Planned shape:

- Remote name: `mfe-demo`
- Exposed module: `./Component` → standalone `DemoComponent`
- Public path configured for cross-origin dev with the Shell
- Shared dependencies aligned with Shell / `@cobranza-apps/ui` (Angular, Bootstrap, etc.)

See [`.agent/project-info/architecture.md`](.agent/project-info/architecture.md) §6 for the federation & hosting reference.

## Shell ↔ MFE Contract (summary)

The MFE communicates with the Shell ONLY via Angular Inputs and `@cobranza-apps/mfe-events`. It never manipulates DOM outside its own container and never knows about workspace layout.

**Inputs (Shell → component):** `moduleType`, `instanceId`, `size` (`'50%' | '100%'`), `isCollapsed`, `isFullscreen`, `data` (opaque `Record<string, unknown>`), and optional pixel-size / minHeight inputs.

**Events MFE → Shell:** `mfe:module-ready`, `mfe:update-header`, `mfe:show-notification`, `mfe:request-fullscreen`, `mfe:request-remove`, `mfe:module-error`, and optionally `mfe:request-add-module`.

**Events Shell → MFE (listen, filter by `instanceId`):** `shell:module-state`, `shell:visibility-changed`, `shell:theme-changed`.

Full tables and critical paths: [`.agent/project-info/architecture.md`](.agent/project-info/architecture.md) §4 and §8.

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

Example Footer entries (Shell side):

```ts
{ moduleType: 'demo', label: 'Demo – Tabla',  config: { view: 'table' } },
{ moduleType: 'demo', label: 'Demo – Alta',   config: { view: 'create-form', title: 'Alta simulada' } },
{ moduleType: 'demo', label: 'Demo – Perfil', config: { view: 'profile', title: 'Cliente demo', profile: { nombre: 'Juan Pérez', dni: '30111222', saldo: 15000 } } }
```

Details: [`.agent/project-info/brief.md`](.agent/project-info/brief.md) §3.6 and [`.agent/project-info/architecture.md`](.agent/project-info/architecture.md) §5.

## Related Packages

| Package | Usage |
| -------- | ----- |
| `@cobranza-apps/ui` | Theme SCSS, `cba-*` components, `ModuleHeader` / `ModuleContainer`, core components. |
| `@cobranza-apps/mfe-events` | Typed Shell ↔ MFE event contracts (required). |
| `@cobranza-apps/entities` | Domain models (optional; only if needed for view type examples). |

Always review and follow each lib's documentation when integrating.

## Project Structure

Planned `src/` layout (after scaffolding):

```text
mfe-demo/
├── src/
│   ├── app/
│   │   ├── demo/                # main exposed component + views
│   │   ├── core/                # optional event-helper wrappers
│   │   └── app.config.ts
│   ├── bootstrap.ts             # federation bootstrap if required
│   ├── index.html
│   └── styles.scss              # imports @cobranza-apps/ui theme
├── federation.config.js         # (pending) Native Federation config
├── public/
├── package.json                 # (pending)
├── angular.json                 # (pending)
├── tsconfig*.json               # (pending)
├── .nvmrc                       # Node 22.22.3
├── README.md
└── docs/                        # optional short USAGE for agents
```

Full architecture and component layout: [`.agent/project-info/architecture.md`](.agent/project-info/architecture.md) §3.

## Documentation & Project Info

- [`.agent/project-info/brief.md`](.agent/project-info/brief.md) — core requirements and scope (source of truth).
- [`.agent/project-info/product.md`](.agent/project-info/product.md) — product / UX reference.
- [`.agent/project-info/architecture.md`](.agent/project-info/architecture.md) — system architecture, contract, critical paths.
- [`.agent/project-info/tech.md`](.agent/project-info/tech.md) — stack, setup, constraints, tooling.
- [`.agent/project-info/context.md`](.agent/project-info/context.md) — current state and work focus.
- [`.agent/project-info/instructions.md`](.agent/project-info/instructions.md) — project-info instructions for agents.
- [`.agent/WORKFLOWS.md`](.agent/WORKFLOWS.md) — project workflows.
- [`.kilo/commands/critical-workflow.md`](.kilo/commands/critical-workflow.md) — critical workflow reference.

## For AI Agents

All agents working on this project MUST adhere to the workflows and rules outlined in [`AGENTS.md`](AGENTS.md).

Before starting any task:

1. Read [`AGENTS.md`](AGENTS.md) — primary source of instructions for agents.
2. Follow the procedures defined in [`.agent/WORKFLOWS.md`](.agent/WORKFLOWS.md), especially the [Critical Workflow](.kilo/commands/critical-workflow.md).
3. Read [`.agent/project-info/context.md`](.agent/project-info/context.md) for the current project state.