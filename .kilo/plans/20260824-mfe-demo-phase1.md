# Global Plan — Phase 1: mfe-demo Views, Actions & Debug Surface

> Derived from `.agent/todos/20260803/20260803-todo-2.md`.
> Date: 2026-08-24

---

## Global Pre-Analysis

### Current State
- Phase 0 is complete: Angular 22 app builds, Native Federation remote works, `DemoComponent` exposes `cba-demo` with identity panel, default `table` view, and core `mfe:*` events (`module-ready`, `update-header`).
- `DemoPreviewComponent` provides basic standalone preview with `size`, `view`, `title` controls.
- `@cobranza-apps/mfe-events` is installed (`^0.5.0`) and exports: `MFE_EVENTS`, `SHELL_EVENTS`, `SCHEMA_VERSION`, `dispatchMfeEvent`, `dispatchShellEvent`, `isMfeEvent`, `isShellEvent`, `createMfeEvent`, `createShellEvent`, plus payload assertion helpers.
- `@cobranza-apps/entities` is installed (`^0.5.1`) and exports `clientSchema` among others — useful for typing profile / form fields.
- `@cobranza-apps/ui` is installed (`^0.19.0`) and provides `CbaBadgeComponent`; other components (buttons, inputs, cards) are assumed available under the same package.
- `src/styles.scss` currently imports `@use '@cobranza-apps/ui/theme';` which causes a Sass build error (`Can't find stylesheet to import`). This must be resolved before any UI work can be verified.

### Technical & Architecture Decisions
1. **Styles import fix**: The `@cobranza-apps/ui` package likely requires a different import path or a Sass include path. The fix must follow the library's documented recommendations (check `node_modules/@cobranza-apps/ui` for a README or theming guide).
2. **View sub-components**: `create-form` and `profile` will be created as standalone components under `src/app/demo/views/` (next to `demo-table/`) to keep `demo.component.html` readable and respect the max-lines-per-file rule.
3. **Event log & data viewer**: These are debug-only UI elements. They will be inline in `DemoComponent` (compact, below the action bar) rather than separate routed components, to keep the surface small.
4. **Shell event listeners**: `DemoComponent` already attaches listeners for `shell:module-state`, `shell:visibility-changed`, and `shell:theme-changed`. Phase 1 must make `shell:module-state` update internal signals that drive the identity panel and layout classes. `shell:visibility-changed` will add a log entry and optionally a small badge.
5. **Action buttons**: Will be rendered in a small toolbar inside `DemoComponent` using `cba-button` (or equivalent from `@cobranza-apps/ui`). Every dispatched event must use `dispatchMfeEvent` and include `moduleType`, `instanceId`, and `schemaVersion`.
6. **Standalone preview**: `DemoPreviewComponent` will be extended with controls for `isCollapsed`, `isFullscreen`, mock `profile` data, table rows, and buttons to simulate `shell:module-state` / `shell:visibility-changed` payloads.
7. **Type usage**: `clientSchema` from `@cobranza-apps/entities` will be inspected for usable shape; if it maps well to profile/form fields, local interfaces will align with it. Otherwise, local interfaces are kept.

### Front-End Scope
All tasks in this TODO are front-end related (Angular components, SCSS, event dispatching, preview UI). Therefore **every task group requires sub-steps 4.1a and 4.5a**.

---

## Task Group A — Fix UI Styles Imports Error (Task 0)

**What**: Resolve the Sass `@use '@cobranza-apps/ui/theme';` error so `npm run serve` / `ng build` succeeds.

**Pre-analysis**:
- This is a build blocker. Must be fixed before any other task can be manually verified.
- Likely solutions: change import path to a deep path (e.g., `@cobranza-apps/ui/styles/theme`), add `includePaths` to `angular.json`, or use a CSS entry point instead of SCSS.

**Plan steps**:
1. Inspect `node_modules/@cobranza-apps/ui/package.json` `exports` / `sass` field and any theming documentation.
2. Update `src/styles.scss` with the correct import.
3. Verify `npm run build` succeeds.
4. Commit.

**Front-end related**: Yes.

---

## Task Group B — Views Implementation (Tasks 1–4)

**What**: Implement `create-form` view, `profile` view, polish `table` view, and wire view switching + title behavior.

**Pre-analysis**:
- `create-form`: Simulated form, no real API. Fields: nombre, documento/DNI, email, teléfono, observaciones. Spanish labels. Primary button dispatches `mfe:show-notification` (success) + `mfe:update-header`. Secondary button resets or shows notification.
- `profile`: Read-only key-value list from `config.profile` or mock defaults. Clean card/list style.
- `table`: Already exists; verify it still works after view switching is wired.
- View switching: Drive from `config.view` (default `table`). Update header title on init/data change. Identity panel shows current `view`.
- New files: `src/app/demo/views/demo-create-form/`, `src/app/demo/views/demo-profile/`.

**Plan steps**:
1. Inspect `@cobranza-apps/entities` `clientSchema` for field shapes.
2. Create `DemoCreateFormComponent` (standalone) with local form model, template, SCSS.
3. Create `DemoProfileComponent` (standalone) with input for profile data + mock defaults.
4. Update `demo.component.html` to use new components in `@switch` and remove placeholders.
5. Add title-behavior logic in `DemoComponent` (update header on init + when `data` changes; view-appropriate default if no explicit title).
6. Ensure identity panel shows `view` value (already present; confirm).
7. Verify responsive behavior at 50% and 100% width for all views.
8. Commit.

**Front-end related**: Yes.

---

## Task Group C — Actions, Event Log, Data Viewer, Shell Listeners & Preview (Tasks 5–9)

**What**: Full action button set, local event log UI, data payload viewer, shell event listener wiring, and extended standalone preview.

**Pre-analysis**:
- Action buttons: 7–8 buttons (update header, 3 notifications, fullscreen, remove, add module, optional error). All use `@cobranza-apps/mfe-events` helpers. Must fit at 50% width (wrap/stack).
- Event log: In-memory array (last 20–30 events), per-instance only. Show direction (in/out), event type, short payload summary, timestamp. Newest first. "Limpiar log" control.
- Data payload viewer: Pretty-print `data` Input. Compact, collapsible if UI lib supports it.
- Shell listeners: `shell:module-state` must update internal signals (size, isCollapsed, isFullscreen) so identity panel and layout reflect changes. `shell:visibility-changed` logs. Filter by `instanceId`.
- Standalone preview: Add controls for `isCollapsed`, `isFullscreen`, `tableRows`, `profile` JSON input, buttons to simulate shell events, and display event log.

**Plan steps**:
1. Add event-log and payload-viewer UI sections to `DemoComponent` template and class.
2. Implement action bar with all buttons and their `dispatchMfeEvent` calls.
3. Wire `shell:module-state` listener to update signals and log entries.
4. Wire `shell:visibility-changed` listener to log entries.
5. Extend `DemoPreviewComponent` with new controls and shell-event simulation.
6. Verify all dispatches appear in console and local event log.
7. Commit.

**Front-end related**: Yes.

---

## Task Group D — Documentation Update (Task 10)

**What**: Create/update docs explaining views, action buttons, event log, and preview usage.

**Pre-analysis**:
- README already has a good structure. We need new `/docs` files for:
  1. Views and how to select them via `DemoConfig`.
  2. Action buttons and which events they fire.
- Update README status to "Phase 1 complete" and link new docs.

**Plan steps**:
1. Create `docs/phase1-views.md`.
2. Create `docs/phase1-actions-and-events.md`.
3. Update `README.md` status and links.
4. Commit.

**Front-end related**: No (documentation only; skip 4.1a and 4.5a).

---

## Execution Map

| Step | Sub-agent | Details |
|------|-----------|---------|
| Step 2 | implementer | Git feature branch setup (`feat/mfe-demo-phase1`) |
| Step 3 | implementer | Bump version to `0.2.0` (minor — new features) |
| Task A | frontend-specialist | 4.1a Front-end Spec |
| Task A | architector | 4.1b Implementation Plan |
| Task A | implementer | 4.2 Implementation |
| Task A | code-reviewer + code-simplifier | 4.3 Review & Simplification |
| Task A | docs-specialist | 4.4 Documentation (inline comments + doc update) |
| Task A | frontend-specialist | 4.5a Front-end Verification |
| Task A | architector | 4.5b Overall Plan Adherence |
| Task A | implementer | 4.6 Task Completion |
| Task B | frontend-specialist | 4.1a Front-end Spec |
| Task B | architector | 4.1b Implementation Plan |
| Task B | implementer | 4.2 Implementation |
| Task B | code-reviewer + code-simplifier | 4.3 Review & Simplification |
| Task B | docs-specialist | 4.4 Documentation |
| Task B | frontend-specialist | 4.5a Front-end Verification |
| Task B | architector | 4.5b Overall Plan Adherence |
| Task B | implementer | 4.6 Task Completion |
| Task C | frontend-specialist | 4.1a Front-end Spec |
| Task C | architector | 4.1b Implementation Plan |
| Task C | implementer | 4.2 Implementation |
| Task C | code-reviewer + code-simplifier | 4.3 Review & Simplification |
| Task C | docs-specialist | 4.4 Documentation |
| Task C | frontend-specialist | 4.5a Front-end Verification |
| Task C | architector | 4.5b Overall Plan Adherence |
| Task C | implementer | 4.6 Task Completion |
| Task D | architector | 4.1b Implementation Plan (no 4.1a) |
| Task D | implementer | 4.2 Implementation |
| Task D | code-reviewer + code-simplifier | 4.3 Review & Simplification |
| Task D | docs-specialist | 4.4 Documentation |
| Task D | architector | 4.5b Overall Plan Adherence (no 4.5a) |
| Task D | implementer | 4.6 Task Completion |
| Step 5 | implementer | TODO file completion, merge to `main`, push to `origin` |
