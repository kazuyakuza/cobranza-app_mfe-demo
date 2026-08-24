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