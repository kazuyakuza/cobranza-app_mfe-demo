# Task E 4.3 — Documentation Simplification Plan

Scope: `README.md`, `docs/phase0-agent-notes.md`, and `.agent/project-info/context.md` as completed in Task E 4.2.
Goal: Reduce redundancy across README and agent notes, tighten verbose wording, and keep context.md factual and current. Do not change technical facts or remove links required by the Critical Workflow.

## 1. `README.md` — remove redundancy with agent notes and architecture docs

### 1.1 Remove duplicated "Related packages" paragraph

After the **Tech Stack** table there is a paragraph that repeats packages already listed in the table:

```text
Related packages: `@cobranza-apps/ui` (theme and components), `@cobranza-apps/mfe-events` (required event contracts), and optionally `@cobranza-apps/entities`.
```

**Action:** Delete this paragraph. The table already covers these packages.

### 1.2 Tighten the **Status** section

Current paragraph explains build state, default view, identity panel, and deferred work in one long block. Keep the completion statement and move the deferred-work details to `docs/phase0-agent-notes.md` (where they already exist).

**Action:** Replace the current **Status** paragraph with:

```markdown
> **Phase 0 complete.** Buildable Angular 22 Native Federation remote. `ng build` and `ng serve` work; standalone preview runs at `http://localhost:4201`. The default `'table'` view, identity panel, per-instance marker, and core `mfe:*` events are implemented. See `docs/phase0-agent-notes.md` for deferred items.
```

### 1.3 Simplify **Development Modes**

The two numbered paragraphs are verbose and repeat the same idea twice (standalone vs. Shell).

**Action:** Replace with:

```markdown
1. **Standalone preview** — `ng serve` runs the app alone with a local host page that simulates Shell Inputs and logs `mfe:*` events.
2. **Loaded by Shell** — the Shell loads the remote via Native Federation and injects it into the workspace. Footer entries or `initialData` drive the different views.
```

### 1.4 Simplify **Federation Configuration** section

The section repeats details already in `architecture.md` and the **Federation Identity** table. Keep only the identity facts and a pointer to the architecture doc.

**Action:** Replace the entire **Federation Configuration** section with:

```markdown
`federation.config.js` exposes `./Component` from `src/app/demo/demo.component.ts` as remote `mfe-demo`. Shared dependencies use `shareAll` aligned with the Shell and `@cobranza-apps/ui`. Entry flow: `src/main.ts` calls `initFederation()` then imports `src/bootstrap.ts`.

See [`.agent/project-info/architecture.md`](.agent/project-info/architecture.md) §6 for full federation and hosting details.
```

### 1.5 Tighten **Shell ↔ MFE Contract (summary)**

The explanatory sentence above the table and the detailed channel descriptions are verbose for a README summary.

**Action:** Keep the one-line intro and the table; remove the paragraph that follows the table (`Full tables and critical paths...` is already implied by the section title and the existing link can move under the table). Replace the section with:

```markdown
Communication uses Angular Inputs and `@cobranza-apps/mfe-events` only.

| Direction | Channel | Details |
| --------- | ------- | ------- |
| Shell → MFE | Component Inputs | `moduleType`, `instanceId`, `size`, `isCollapsed`, `isFullscreen`, `data`, optional pixel-size / minHeight inputs. |
| MFE → Shell | `@cobranza-apps/mfe-events` | `mfe:module-ready`, `mfe:update-header`, `mfe:show-notification`, `mfe:request-fullscreen`, `mfe:request-remove`, `mfe:module-error`, optionally `mfe:request-add-module`. |
| Shell → MFE | `@cobranza-apps/mfe-events` | `shell:module-state`, `shell:visibility-changed`, `shell:theme-changed` (filter by `instanceId`). |

Full contract: [`.agent/project-info/architecture.md`](.agent/project-info/architecture.md) §4 and §8.
```

### 1.6 Simplify **View Modes (`DemoConfig`)**

The type definition and long coercion explanation belong in the source file (`src/app/demo/demo-config.ts`) and `architecture.md`. The README should only show the public shape and an example.

**Action:** Replace the section body with:

```markdown
The Shell passes opaque configuration via the `data` Input. This repo interprets it as `DemoConfig` (internal type; not part of `@cobranza-apps/mfe-events`):

```ts
type DemoViewMode = 'table' | 'create-form' | 'profile';

interface DemoConfig {
  view?: DemoViewMode;   // default: 'table'
  title?: string;
  profile?: Record<string, unknown>;
  tableRows?: number;    // default: 5
}
```

Invalid values are coerced to defaults by `coerceDemoConfig` in `src/app/demo/demo-config.ts`.

Example Shell Footer entries:

```ts
{ moduleType: 'demo', label: 'Demo – Tabla',  config: { view: 'table' } },
{ moduleType: 'demo', label: 'Demo – Alta',   config: { view: 'create-form', title: 'Alta simulada' } },
{ moduleType: 'demo', label: 'Demo – Perfil', config: { view: 'profile', title: 'Cliente demo', profile: { nombre: 'Juan Pérez', dni: '30111222', saldo: 15000 } } }
```

Details: [`.agent/project-info/brief.md`](.agent/project-info/brief.md) §3.6 and [`.agent/project-info/architecture.md`](.agent/project-info/architecture.md) §5.
```

### 1.7 Simplify **Project Structure**

The full `src/` tree duplicates `.agent/project-structure.md` and `docs/phase0-agent-notes.md`.

**Action:** Replace the full tree with a concise summary:

```markdown
```text
src/
├── app/demo/          # exposed standalone component + DemoConfig + views/
├── app/demo-preview/  # standalone preview host (ng serve)
├── bootstrap.ts
├── main.ts
└── styles.scss
```

See [`.agent/project-structure.md`](.agent/project-structure.md) for the maintained folder list and [`.agent/project-info/architecture.md`](.agent/project-info/architecture.md) §3 for architecture details.
```

## 2. `docs/phase0-agent-notes.md` — remove overlap with README

### 2.1 Replace **Federation Identity** table with a compact list

The table duplicates README.md. Agent notes should be scannable.

**Action:** Replace the table with:

```markdown
- Remote name: `mfe-demo`
- Exposed module: `./Component` → `src/app/demo/demo.component.ts`
- Component selector: `cba-demo`
- Shell `moduleType`: `demo`
- Dev port: `4201`
- Remote entry (local dev): `http://localhost:4201/remoteEntry.json`
```

### 2.2 Simplify **Folder Layout (Phase 0)**

The tree is already short, but the note below it duplicates `.agent/project-structure.md`.

**Action:** Remove the line:

```text
See [`project-structure.md`](../.agent/project-structure.md) for the maintained list.
```

The heading already references Phase 0; agents know to check `project-structure.md` from the README link list.

### 2.3 Tighten **Phase 0 Boundaries** bullets

Several bullets can be combined without losing meaning.

**Action:** Replace the **Implemented** list with:

```markdown
- Angular 22 standalone app configured as a Native Federation remote.
- `DemoComponent` with signal Inputs and `DemoConfig` coercion (default view `'table'`, default `tableRows` `5`).
- `'table'` view with mock rows that reflow with `size`.
- Identity panel + per-instance visual marker derived from `instanceId`.
- `mfe:module-ready` and `mfe:update-header` dispatched on init.
- `shell:module-state`, `shell:visibility-changed`, `shell:theme-changed` listeners (`instanceId`-filtered, except theme which is global).
- Standalone preview host with `size` / `view` / `title` controls and console logging of outgoing `mfe:*` events.
```

## 3. `.agent/project-info/context.md` — keep factual and current

### 3.1 Update **Current State** to reflect Task E completion

The bullets still describe stubs; Task E 4.2 completed the implementation.

**Action:** Replace the **Current State** bullets with:

```markdown
- Angular 22.1.2 standalone app scaffolded.
- Native Federation configured (`federation.config.js`, `angular.json`).
- `DemoComponent` implemented with signal Inputs, `DemoConfig` coercion, table view, identity panel, and core `mfe:*` events.
- `DemoPreviewComponent` implemented as the standalone preview host.
- `@cobranza-apps/mfe-events` installed and `reflect-metadata` configured in `angular.json`.
- `README.md` and `docs/phase0-agent-notes.md` updated for Phase 0.
```

### 3.2 Simplify **Current Work Focus**

The numbered list is verbose and mixes completed work with next steps.

**Action:** Replace with:

```markdown
Task E of `.agent/todos/20260803/20260803-todo-1.md` is in code review / simplification. Implementation of `README.md` and `docs/phase0-agent-notes.md` is complete.
```

### 3.3 Update **Recent Changes**

Make the list current and remove duplicate references.

**Action:** Replace with:

```markdown
- Updated `README.md` for Phase 0 status, federation identity, quick start, and project structure.
- Created `docs/phase0-agent-notes.md` with Phase 0 boundaries and agent conventions.
- Implemented `DemoComponent` event dispatch, `shell:*` listeners, and `DemoPreviewComponent` controls per Task D spec.
```

### 3.4 Update **Immediate Next Steps**

The current steps describe implementation that is already done.

**Action:** Replace with:

```markdown
1. Apply documentation simplifications from Task E 4.3.
2. Proceed to Task E 4.5 (overall plan adherence) and remaining TODO tasks.
```

## 4. Out of scope / intentionally not changed

- Do not remove the **Table of Contents** from `README.md`; it is useful for a long readme.
- Do not remove the **For AI Agents** section in `README.md`; it points agents to required files.
- Do not change source code, federation config, or build setup.
- Do not alter the factual content of the **Agent Conventions** section; only simplify the **Implemented** list.

## Verification Checklist

- [ ] `README.md` no longer contains the "Related packages" paragraph after the Tech Stack table.
- [ ] `README.md` **Status** section is one concise paragraph pointing to `docs/phase0-agent-notes.md`.
- [ ] `README.md` **Development Modes** section is two short bullets.
- [ ] `README.md` **Federation Configuration** section is one short paragraph plus architecture link.
- [ ] `README.md` **Shell ↔ MFE Contract (summary)** section keeps the table and removes verbose surrounding text.
- [ ] `README.md` **View Modes (`DemoConfig`)** section no longer duplicates coercion details from `demo-config.ts`.
- [ ] `README.md` **Project Structure** section shows only the top-level folders and links to `project-structure.md`.
- [ ] `docs/phase0-agent-notes.md` **Federation Identity** uses a compact list instead of a table.
- [ ] `docs/phase0-agent-notes.md` no longer duplicates the `project-structure.md` link under **Folder Layout**.
- [ ] `docs/phase0-agent-notes.md` **Implemented** list is shorter but still complete.
- [ ] `.agent/project-info/context.md` reflects that Task E implementation is complete and lists correct next steps.
