# Plan — Task 2: Update README File

- **TODO file:** `.agent/todos/20260803/20260803-todo-0.md` (line 2: `update readme file`)
- **Critical Workflow step:** 4.1b (Analysis & Planning)
- **Branch:** `feat/init-project-info-and-readme` (already created in Step 2; do NOT switch branches)
- **Target implementer:** JUNIOR developer under 50% restriction
- **Scope:** Single file rewrite — `README.md` at repository root. No other files. No code. No scaffolding.

## 1. Task Objective

Replace the current `README.md` (which still contains the base-project template text — "Base Project for AI Agent Driven Development") with content specific to the `mfe-demo` project, derived from the source of truth `.agent/project-info/brief.md` and supporting files `tech.md` / `architecture.md` / `product.md`.

The new README must be a developer-facing entry document that explains what `mfe-demo` is, its role, stack, federation identity, dev modes, expected ports / CORS, quick start, federation config summary, contract reference, and links to project-info docs.

## 2. Pre-Analysis & Decisions (encoded, non-negotiable)

The following decisions are FIXED. The implementer MUST NOT alter them:

1. **Single file touched:** `README.md` (repo root). Do NOT create, edit, or delete any other file. Do NOT touch `.agent/`, `.kilo/`, `src/`, `docs/`, or any config.
2. **Full overwrite:** The entire current content of `README.md` is replaced. The implementer MUST first `read` the existing file (tool requirement) then `write` the new content verbatim from §6 of this plan.
3. **Language:** README body in **English** (it is a developer-facing technical document; the product UI is Spanish-only, but the README is not product UI). Preserve any Spanish strings that are part of the contract examples (e.g. button labels "Mostrar notificación") as-is, in italics or code spans, when referenced.
4. **Honest status:** The repo is greenfield (no `package.json`, no `angular.json`, no `federation.config.js`, `src/` only has `.gitkeep`). The README MUST include a "Status" note stating this clearly, and the "Quick Start" section MUST mark commands as planned / pending scaffolding (not yet runnable). Do NOT present scaffolding commands as if they work today.
5. **No invented facts:** Dev ports are NOT yet decided (open question in `context.md`). The README MUST state ports are TBD and will be documented once the dev server is configured — do NOT invent port numbers.
6. **Source of truth:** `brief.md` wins on conflicts. Where the README summarizes the contract, it MUST link to `architecture.md` for full detail rather than duplicating the full tables.
7. **No emojis.**
8. **Newlines:** Use real newline characters in the written file (newline-prevention rule).
9. **Preserve AI-agent onboarding footer:** `brief.md` ends with a "DO NOT DELETE" section pointing agents to `AGENTS.md`. The README MUST include an equivalent short "For AI Agents" section linking to `AGENTS.md` and `.agent/WORKFLOWS.md`.
10. **No version bump, no git commit in this plan's scope:** Commits happen at 4.2/4.6 under implementer instructions. This plan only defines the file content. The implementer at 4.2 will commit with message `docs: rewrite README for mfe-demo project`.

## 3. High-Level Approach

1. Implementer reads existing `README.md` (tool precondition for `write`).
2. Implementer writes the new content (provided verbatim in §6) to `README.md`, fully replacing prior content.
3. Implementer verifies the file was written correctly by reading it back.
4. Implementer commits the change (message: `docs: rewrite README for mfe-demo project`).
5. Implementer returns a summary (what was done, what was NOT done).

No build/test step applies (markdown documentation only; no `package.json` exists).

## 4. Atomic Steps for the Implementer (4.2)

### Step 4.2.1 — Read current README
- Tool: `read`
- Path: `C:\projects\cobranza-app\front\mfe-demo\README.md`
- Purpose: satisfy `write` tool precondition and confirm current base-project content.

### Step 4.2.2 — Overwrite README with the new content
- Tool: `write`
- Path: `C:\projects\cobranza-app\front\mfe-demo\README.md`
- Content: EXACTLY the full markdown in §6 of this plan (byte-for-byte, preserving real newlines).
- Do NOT add or remove any line outside §6.

### Step 4.2.3 — Verify the written file
- Tool: `read`
- Path: `C:\projects\cobranza-app\front\mfe-demo\README.md`
- Assertion: first line is exactly `# mfe-demo` and the file ends with the "For AI Agents" section. If not, STOP and ask caller.

### Step 4.2.4 — Gitignore compliance check
- Run `git status` (bash). Confirm ONLY `README.md` is modified. If any other file appears staged or modified, STOP and ask caller — do NOT stage unrelated files.
- Do NOT run `git add .` (broad add). Stage only `README.md` explicitly.

### Step 4.2.5 — Stage and commit
- Bash single command: `git add README.md`
- Bash single command: `git commit -m "docs: rewrite README for mfe-demo project"`
- Do NOT push (push is restricted to Step 5 of the Critical Workflow).
- Do NOT switch branches.

### Step 4.2.6 — Return summary
- Report: what was done (file rewritten, commit hash), what was NOT done (no scaffolding, no port decisions, no other files touched).

## 5. Verification Criteria (for 4.5b adherence check)

- `README.md` exists at repo root and starts with `# mfe-demo`.
- No other file in the repository was modified by this task.
- The README contains sections: Purpose, What It Is Not, Status, Tech Stack, Federation Identity, Development Modes, Dev Ports / CORS, Quick Start, Federation Configuration, Shell ↔ MFE Contract (summary + link), View Modes (`DemoConfig`), Related Packages, Project Structure (link), Documentation & Project Info links, For AI Agents.
- Dev ports are described as TBD (not invented).
- Quick Start commands are clearly marked as pending scaffolding.
- A commit with message `docs: rewrite README for mfe-demo project` exists on branch `feat/init-project-info-and-readme`.

## 6. Full Expected Content of `README.md`

The implementer MUST write the following content verbatim to `README.md` (real newlines, no literal `\n`):

```markdown
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
```

## 7. Notes for the Implementer

- The fenced markdown block in §6 above is the SOURCE of the file content. The implementer writes the INNER markdown (starting with `# mfe-demo` and ending with the `context.md` line) to `README.md`. Do NOT include the enclosing triple-backtick fence lines in the written file.
- All link paths are relative to repo root and MUST be preserved exactly (e.g. `.agent/project-info/brief.md`, `AGENTS.md`, `.kilo/commands/critical-workflow.md`).
- Do NOT introduce a Table of Contents: the README stays under ~150 lines and a TOC is not required by the rules for files under 100 lines of documentation. (The README is documentation, not `src/`, so the 200-line rule does not apply, but brevity is preferred.)
- If the `write` tool rejects the operation because the file was not read first, re-run Step 4.2.1 then retry Step 4.2.2.
- If `git status` shows any modified file other than `README.md`, STOP and ask the caller. Do NOT stage or commit anything else.

## 8. Out of Scope for This Task

- Angular / Native Federation scaffolding.
- `package.json`, `angular.json`, `federation.config.js` creation.
- Deciding or documenting concrete dev ports.
- Any code under `src/`.
- Any change to `.agent/`, `.kilo/`, or config files.
- README of any other repo.
