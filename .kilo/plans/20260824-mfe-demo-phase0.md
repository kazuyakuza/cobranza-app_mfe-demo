# Global Plan: mfe-demo Phase 0 — Scaffold & Contract Foundation

## Pre-Analysis

- **Project:** `mfe-demo` — Angular 22 standalone remote MFE for the Cobranza Shell.
- **Current state:** Greenfield. `src/` has only `.gitkeep`. No `package.json`, `angular.json`, or federation config. `README.md` already exists with accurate Phase 0 content. Branch is `main`, working tree clean.
- **Goal:** Produce a buildable Angular 22 app with Native Federation, shared libraries consumed, a single exposed `DemoComponent` accepting Shell Inputs, `DemoConfig` parsing, default `'table'` view, identity panel + instance marker, core `mfe:*` events, and a standalone preview host.
- **Front-end related:** All task groups are front-end related (Angular component + UI rendering).
- **Out of scope (per TODO):** `'create-form'` and `'profile'` full bodies, full action button set, local event log UI, data payload pretty-printer beyond simple debug, full min-height wiring, real Shell integration testing, production deploy, unit/e2e test suite.

## Technical & Architecture Decisions

1. **Angular CLI scaffolding:** Use `ng new` with standalone components, SCSS, no SSR, routing enabled (needed for standalone preview host route).
2. **Native Federation:** Add `@angular-architects/native-federation` and run its schematic to convert the app to a remote. Remote name: `mfe-demo`. Exposed module: `./Component`.
3. **Shared deps:** Align versions with the Shell's `package.json` (Angular 22.1.2, native-federation ^22.0.6, Bootstrap ^5.3.8, etc.). Add `@cobranza-apps/ui`, `@cobranza-apps/mfe-events`, `@cobranza-apps/entities`.
4. **Theme:** Import `@cobranza-apps/ui` intermediate gray theme SCSS in `src/styles.scss`.
5. **Component design:** `DemoComponent` is a standalone component, selector `cba-demo`, with `@Input()`s matching the Shell contract. Use Angular signals or simple getters for derived state (config, view). Keep methods short (< 50 lines) and files under 200 lines.
6. **Event helpers:** Import event factories from `@cobranza-apps/mfe-events`. Dispatch `mfe:module-ready` and `mfe:update-header` on `ngOnInit`.
7. **Preview host:** A minimal `PreviewHostComponent` on the default route that instantiates `DemoComponent` with mock Inputs and provides buttons to toggle `size` and `DemoConfig.view` / `title`.
8. **Public path / CORS:** Configure `federation.config.js` with `publicPath: 'auto'` for local cross-origin dev.
9. **Git branch:** `feat/mfe-demo-phase0`.
10. **Version:** No `package.json` exists yet; version will be set during scaffolding (`0.1.0`).

---

## Task Group A: Angular 22 + Native Federation Scaffolding

**Goal:** Create a buildable Angular 22 standalone app and convert it to a Native Federation remote.
**TODO coverage:** Tasks 1, 2 (Establish Angular 22 application + Native Federation remote setup).
**Front-end related:** No (infrastructure only).

### Steps

1. **4.1b Analysis & Planning** → Architector
   - Analyze exact Angular CLI commands and Native Federation schematic usage.
   - Plan `angular.json`, `package.json`, `federation.config.js` contents.
   - Save per-task plan to `.kilo/plans/20260824-mfe-demo-phase0-taskA.md`.

2. **4.2 Implementation** → Implementer
   - Scaffold Angular 22 app (`ng new mfe-demo --standalone --routing --style=scss --ssr=false`).
   - Add `@angular-architects/native-federation` and run `ng g @angular-architects/native-federation:init --project mfe-demo --type remote`.
   - Set remote name to `mfe-demo` and exposed module to `./Component`.
   - Configure `publicPath: 'auto'` in `federation.config.js`.
   - Remove default Angular demo content (`app.component.html`, `app.component.scss` placeholders).
   - Verify `ng build` and `ng serve` work with zero errors.
   - Commit.

3. **4.3 Code Review & Simplification** → Code-reviewer + Code-simplifier
   - Review configs for errors. Simplify if needed. Fix plan applied by Implementer if required.

4. **4.4 Documentation** → Docs-specialist
   - Add agent-oriented comments to `federation.config.js` and `angular.json` (minimal).

5. **4.5b Overall Plan Adherence** → Architector
   - Verify scaffolding matches plan and builds cleanly.

6. **4.6 Task Completion** → Implementer
   - Mark TODO tasks 1 and 2 as `[DONE]` and commit.

---

## Task Group B: Shared Libraries + Core Component Infrastructure

**Goal:** Install shared libraries, create folder structure, build `DemoComponent` with Shell Inputs and `DemoConfig` types.
**TODO coverage:** Tasks 3, 4, 5, 6 (Shared libraries consumption + Folder structure + Shell Inputs wiring + DemoConfig types).
**Front-end related:** Yes.

### Steps

1. **4.1a Front-end Technical Specification** → Frontend-specialist
   - Spec for `DemoComponent` architecture: selector, inputs, outputs, internal state (signals vs getters), event dispatch integration.
   - Save to `.kilo/plans/20260824-mfe-demo-phase0-taskB-frontend-spec.md`.

2. **4.1b Analysis & Planning** → Architector
   - Read Task B frontend spec. Plan exact file names, folder structure, `package.json` dependency versions aligned with Shell, import patterns for `@cobranza-apps/ui` theme SCSS, event helper usage from `@cobranza-apps/mfe-events`.
   - Save to `.kilo/plans/20260824-mfe-demo-phase0-taskB.md`.

3. **4.2 Implementation** → Implementer
   - Add deps to `package.json`: `@cobranza-apps/ui`, `@cobranza-apps/mfe-events`, `@cobranza-apps/entities`, `bootstrap`, `@ng-bootstrap/ng-bootstrap`, Font Awesome packages, `rxjs`, `tslib`, `zone.js` (align versions with Shell `package.json`).
   - Run `npm install`.
   - Create `src/app/demo/` folder with:
     - `demo-config.ts` (types only)
     - `demo.component.ts` (standalone, selector `cba-demo`, all `@Input()`s, getters for `config` and `view`, `ngOnInit`)
     - `demo.component.html` (minimal template for now — just identity panel placeholder)
     - `demo.component.scss` (empty or minimal)
   - Create `src/app/app.config.ts` with `provideRouter` if not already present.
   - Import UI theme in `src/styles.scss`.
   - Wire `DemoComponent` as the exposed federation module in `federation.config.js`.
   - Remove default `AppComponent` content or keep minimal root for preview host.
   - Commit.

4. **4.3 Code Review & Simplification** → Code-reviewer + Code-simplifier
   - Review component for contract correctness, type safety, rule compliance (max lines, max args, max depth). Fix plan applied by Implementer if needed.

5. **4.4 Documentation** → Docs-specialist
   - Add JSDoc to `DemoComponent` and `DemoConfig` types. Cross-reference `brief.md` §3.6.

6. **4.5a Front-end Implementation Verification** → Frontend-specialist
   - Verify `DemoComponent` matches the frontend spec. Report any diffs.

7. **4.5b Overall Plan Adherence** → Architector
   - Verify all files created, dependencies aligned, component accepts correct Inputs, theme applied.

8. **4.6 Task Completion** → Implementer
   - Mark TODO tasks 3, 4, 5, 6 as `[DONE]` and commit.

---

## Task Group C: Identity Panel + Default Table View

**Goal:** Render the identity panel with Spanish labels, visual instance marker, and the default `'table'` view.
**TODO coverage:** Tasks 7, 8 (Identity panel & visual marker + Default 'table' view).
**Front-end related:** Yes.

### Steps

1. **4.1a Front-end Technical Specification** → Frontend-specialist
   - Spec for identity panel layout (Spanish labels), visual marker (hash-based color), table view (mock rows, reflow at 50%/100%), placeholder for non-table views.
   - Save to `.kilo/plans/20260824-mfe-demo-phase0-taskC-frontend-spec.md`.

2. **4.1b Analysis & Planning** → Architector
   - Read Task C frontend spec. Plan exact HTML structure, SCSS for instance marker (hash → HSL color), table generation logic, responsive behavior.
   - Save to `.kilo/plans/20260824-mfe-demo-phase0-taskC.md`.

3. **4.2 Implementation** → Implementer
   - Update `demo.component.html`:
     - Identity panel: show `moduleType`, `instanceId` (short + hover title), `size`, `isCollapsed`, `isFullscreen`, `view` — all with Spanish labels.
     - Visual marker: CSS class derived from `instanceId` hash (e.g., `border-left: 4px solid <color>`).
     - Table view: generate `tableRows` mock rows (default 6). Show current size mode text ("Modo ancho: 50%" / "100%").
     - Non-table views: show "Vista aún no implementada en Phase 0".
   - Update `demo.component.scss` with instance marker styles.
   - Update `demo.component.ts` with `generateMockRows()` method and `instanceColor` getter.
   - Use `@cobranza-apps/ui` components/tokens where available (e.g., `cba-table`, `cba-card`, or Bootstrap classes).
   - Commit.

4. **4.3 Code Review & Simplification** → Code-reviewer + Code-simplifier
   - Review UI for correctness, Spanish labels, visual marker logic, table reflow. Simplify if needed. Fix plan applied by Implementer.

5. **4.4 Documentation** → Docs-specialist
   - Document view mode switching and instance marker logic in code comments.

6. **4.5a Front-end Implementation Verification** → Frontend-specialist
   - Verify UI matches spec: identity panel visible, marker distinct per instance, table usable at 50% and 100%, Spanish text present.

7. **4.5b Overall Plan Adherence** → Architector
   - Verify tasks 7 and 8 fully implemented per TODO.

8. **4.6 Task Completion** → Implementer
   - Mark TODO tasks 7, 8 as `[DONE]` and commit.

---

## Task Group D: Events + Standalone Preview Host

**Goal:** Dispatch `mfe:module-ready` and `mfe:update-header` on init, and provide a standalone preview host for `ng serve`.
**TODO coverage:** Tasks 9, 10 (Core event dispatch + Standalone preview host).
**Front-end related:** Yes (preview host has UI).

### Steps

1. **4.1a Front-end Technical Specification** → Frontend-specialist
   - Spec for preview host UI: mock input controls (size toggle, view/title selector), event console/log display.
   - Save to `.kilo/plans/20260824-mfe-demo-phase0-taskD-frontend-spec.md`.

2. **4.1b Analysis & Planning** → Architector
   - Read Task D frontend spec. Plan exact event dispatch logic using `@cobranza-apps/mfe-events` helpers, preview host component design, route wiring.
   - Save to `.kilo/plans/20260824-mfe-demo-phase0-taskD.md`.

3. **4.2 Implementation** → Implementer
   - In `demo.component.ts`:
     - Import event factories from `@cobranza-apps/mfe-events`.
     - In `ngOnInit`: dispatch `mfe:module-ready` (with `moduleType`, `instanceId`, `schemaVersion`) and `mfe:update-header` (title from `config.title` or "Demo", status `loaded`).
     - Console-log dispatched events for standalone preview visibility.
   - Create `src/app/preview/` folder with:
     - `preview-host.component.ts` (standalone)
     - `preview-host.component.html`
     - `preview-host.component.scss`
   - `PreviewHostComponent` must:
     - Instantiate `DemoComponent` via template (or render it directly with mock `@Input()` bindings).
     - Provide buttons/controls to toggle `size` between `'50%'` and `'100%'`.
     - Provide a small select/buttons to change `DemoConfig.view` (`table` / `create-form` / `profile`) and `title`.
     - Pass mock `moduleType = 'demo'`, generated `instanceId`.
     - Listen to / console-log outgoing `mfe:*` events (can use a global listener on `window` if events are CustomEvents).
   - Wire preview host as the default route in `app.config.ts`.
   - Ensure `ng serve` shows the preview host by default.
   - Commit.

4. **4.3 Code Review & Simplification** → Code-reviewer + Code-simplifier
   - Review event payload shapes for contract compliance. Simplify preview host if needed. Fix plan applied by Implementer.

5. **4.4 Documentation** → Docs-specialist
   - Add JSDoc to event dispatch methods and preview host. Document how to run standalone preview.

6. **4.5a Front-end Implementation Verification** → Frontend-specialist
   - Verify preview host UI is functional and events are dispatched correctly.

7. **4.5b Overall Plan Adherence** → Architector
   - Verify tasks 9 and 10 fully implemented per TODO.

8. **4.6 Task Completion** → Implementer
   - Mark TODO tasks 9, 10 as `[DONE]` and commit.

---

## Task Group E: README & Agent Notes

**Goal:** Ensure README covers Phase 0 setup and add optional agent notes.
**TODO coverage:** Task 11 (README & agent notes).
**Front-end related:** No.

### Steps

1. **4.1b Analysis & Planning** → Architector
   - Plan README updates: purpose, install & run standalone (`ng serve`), federation identity, Shell loading notes, `DemoConfig` explanation, dev ports.
   - Save to `.kilo/plans/20260824-mfe-demo-phase0-taskE.md`.

2. **4.2 Implementation** → Implementer
   - Update `README.md` with Phase 0 relevant sections (ports, quick start now works, federation config present).
   - Optionally create `docs/phase0-agent-notes.md` with folder layout and Phase 0 boundaries.
   - Commit.

3. **4.3 Code Review & Simplification** → Code-reviewer + Code-simplifier
   - Review README for accuracy and conciseness. Fix plan applied by Implementer if needed.

4. **4.4 Documentation** → Docs-specialist
   - Ensure README has proper formatting, TOC if > 100 lines, cross-links.

5. **4.5b Overall Plan Adherence** → Architector
   - Verify README matches plan and TODO requirements.

6. **4.6 Task Completion** → Implementer
   - Mark TODO task 11 as `[DONE]` and commit.

---

## Step 2: Git Feature Branch Setup

- Run by Implementer sub-agent.
- Commit any unstaged changes.
- Switch to `main`, create `feat/mfe-demo-phase0`.

## Step 3: Version Update

- Run by Implementer sub-agent.
- After `package.json` is created during Task A, set version to `0.1.0` (initial).
- Commit as `chore: bump version to 0.1.0`.

## Step 5: TODO File Completion

- Run by Implementer sub-agent.
- Rename `.agent/todos/20260803/20260803-todo-1.md` to `20260803-todo-1-DONE.md`.
- Remove any tmp files/folders.
- Ensure all files committed in `feat/mfe-demo-phase0`.
- Merge `feat/mfe-demo-phase0` into `main`.
- Push `main` to `origin`.
