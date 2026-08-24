# Simplification Plan: README.md

## Goal
Reduce README.md verbosity and redundancy while preserving all information.

## Simplifications to Apply

### 1. Merge intro with Purpose section
- Keep the first paragraph (repo tagline + source of truth link).
- Remove the standalone second paragraph ("It is a real Native Federation remote...") because the Purpose section already says this.
- In Purpose, change the three bullets to a single concise sentence each; remove the intro clause "mfe-demo serves three goals:".

**Current (lines 3-16)** → **Target:**

```markdown
# mfe-demo

Demo / placeholder / reference **Micro-frontend (MFE)** remote for the Company Back-office Shell. Built with Angular 22 and `@angular-architects/native-federation`.

> Source of truth: [`.agent/project-info/brief.md`](.agent/project-info/brief.md). On any conflict, `brief.md` wins.

## Purpose

1. **Test harness** for the Shell while it is WIP — workspace rows, sizing, collapse, fullscreen, drag & drop, persistence, and multi-instance.
2. **Living reference** for the Shell ↔ MFE contract (Inputs + `@cobranza-apps/mfe-events`).
3. **Placeholder** that can appear in the Footer config so developers can add modules without waiting for real business MFEs.
```

### 2. Tighten "What It Is Not"
- Combine first two bullets into one: "Not a runtime base class, library, or business domain module (no clients, debts, bank statements)."
- Keep remaining three bullets as-is.

### 3. Tighten "Status" section
- Replace the multi-line quote block with a concise paragraph.
- Keep: early/greenfield, `src/` only `.gitkeep`, no Angular scaffolding, `.nvmrc` pins Node `22.22.3`, and that Quick Start / Federation sections are planned.

**Target:**

```markdown
## Status

> **Early / greenfield.** `src/` currently contains only `.gitkeep`; there is no `package.json`, `angular.json`, or `federation.config.js` yet. `.nvmrc` pins Node `22.22.3`.
>
> The Quick Start and Federation Configuration sections describe the **planned** setup and will become available after the Angular + Native Federation scaffolding task.
```

### 4. Merge "Related Packages" into "Tech Stack"
- Delete the "Related Packages" section.
- Add a "Related packages" sentence at the end of "Tech Stack" pointing to the three packages.

**Add after Tech Stack table (line 52):**

```markdown
Related packages: `@cobranza-apps/ui` (theme and components), `@cobranza-apps/mfe-events` (required event contracts), and optionally `@cobranza-apps/entities`.
```

### 5. Tighten "Dev Ports & CORS"
- Replace the verbose TBD block with one short paragraph.

**Target:**

```markdown
## Dev Ports & CORS

> **TBD.** This section will document the standalone preview port and the Shell origin allowed for CORS / federation public path once the dev server is configured. No port numbers are invented here.
```

### 6. Tighten "Quick Start"
- Remove the redundant "Commands below are planned..." callout because the Status section already states this.
- Keep prerequisites and commands.
- Shorten the Shell-loaded sentence.

**Target:**

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

### 7. Tighten "Federation Configuration"
- Remove the "Pending scaffolding..." paragraph and inline the note.
- Keep the bullet list.

**Target:**

```markdown
## Federation Configuration

> **Pending scaffolding.** Planned `federation.config.js` shape:

- Remote name: `mfe-demo`
- Exposed module: `./Component` → standalone `DemoComponent`
- Public path configured for cross-origin dev with the Shell
- Shared dependencies aligned with Shell / `@cobranza-apps/ui`

See [`.agent/project-info/architecture.md`](.agent/project-info/architecture.md) §6 for the federation & hosting reference.
```

### 8. Tighten "Shell ↔ MFE Contract"
- Keep the summary sentence.
- Convert the three bold paragraphs into a compact table or bullet list.
- Remove duplicated event names already listed elsewhere.

**Target:**

```markdown
## Shell ↔ MFE Contract (summary)

The MFE communicates with the Shell only via Angular Inputs and `@cobranza-apps/mfe-events`. It never manipulates DOM outside its own container and never knows about workspace layout.

| Direction | Channel | Details |
| --------- | ------- | ------- |
| Shell → MFE | Component Inputs | `moduleType`, `instanceId`, `size`, `isCollapsed`, `isFullscreen`, `data`, optional pixel-size / minHeight inputs. |
| MFE → Shell | `@cobranza-apps/mfe-events` | `mfe:module-ready`, `mfe:update-header`, `mfe:show-notification`, `mfe:request-fullscreen`, `mfe:request-remove`, `mfe:module-error`, optionally `mfe:request-add-module`. |
| Shell → MFE | `@cobranza-apps/mfe-events` | `shell:module-state`, `shell:visibility-changed`, `shell:theme-changed` (filter by `instanceId`). |

Full tables and critical paths: [`.agent/project-info/architecture.md`](.agent/project-info/architecture.md) §4 and §8.
```

### 9. Tighten "Project Structure"
- Remove the `mfe-demo/` root wrapper from the tree (readers already know the repo name).
- Remove the duplicate "Full architecture..." sentence at the end.

**Target:**

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

### 10. Tighten "For AI Agents"
- Convert the numbered list to a compact paragraph.

**Target:**

```markdown
## For AI Agents

All agents MUST follow the workflows and rules in [`AGENTS.md`](AGENTS.md), the procedures in [`.agent/WORKFLOWS.md`](.agent/WORKFLOWS.md) (especially the [Critical Workflow](.kilo/commands/critical-workflow.md)), and read [`.agent/project-info/context.md`](.agent/project-info/context.md) for the current project state before starting any task.
```

## Constraints
- Do not remove any sections, only condense them.
- Do not change technical facts (versions, event names, config shapes, file paths).
- Preserve all hyperlinks to `.agent/project-info/*` files.
- Do not add new information.
