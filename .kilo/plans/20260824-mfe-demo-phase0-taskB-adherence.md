# Task B 4.5b — Overall Plan Adherence Report

**Plan verified against:** `.kilo/plans/20260824-mfe-demo-phase0-taskB.md`
**TODO source:** `.agent/todos/20260803/20260803-todo-1.md` (Tasks 3–6)
**Branch:** `feat/mfe-demo-phase0`
**Frontend verification report (4.5a):** `.kilo/plans/20260824-mfe-demo-phase0-taskB-verification.md`
**Date:** 2026-08-24

## 1. Methodology

This report compares the committed implementation strictly against the **Task B implementation plan** (`20260824-mfe-demo-phase0-taskB.md`), which defines explicit IN SCOPE / OUT OF SCOPE boundaries in its §0. The 4.5a frontend verification report compared against the *full frontend spec*; many of its "Major diff" flags correspond to items the Task B plan explicitly defers to Tasks 7–11. Those flags are **not** treated as deviations here.

## 2. OUT OF SCOPE items — correctly deferred (NOT deviations)

All items below are listed as OUT OF SCOPE in plan §0 and are correctly absent from the implementation. The 4.5a report flagged them; they are **not** issues for Task B:

| Item | Deferred to | Status |
|------|-------------|--------|
| Identity panel with short UUID + `instanceColor`/`hashToColor`/`shortUuid` | Task 7 | Correctly deferred |
| `src/app/demo/views/` sub-components (`demo-table`, `demo-create-form`, `demo-profile`) | Task 8 | Correctly deferred |
| `mfe:module-ready` / `mfe:update-header` dispatch, `ngOnInit`/`ngOnDestroy`, Shell→MFE listeners | Task 9 | Correctly deferred |
| Preview controls (size/view/title toggles), event log UI, `mfe:*` listening in preview | Task 10 | Correctly deferred |
| README / docs updates | Task 11 | Correctly deferred |
| Action buttons (`<cba-button>`), data pretty-printer, event log | Later tasks | Correctly deferred |
| `DemoPreviewComponent` hardcoded input literals (`[size]="'100%'"`, `[isCollapsed]="false"`, `[isFullscreen]="false"`) | Plan Step 7b explicitly specifies these exact literals; controls are Task 10 | Matches plan exactly |

## 3. IN SCOPE items — adherence matrix

| Plan item | Plan step | Implementation | Adheres? |
|-----------|-----------|----------------|----------|
| `reflect-metadata` added to `package.json` dependencies | 1a | `"reflect-metadata": "0.2.2"` present (line 30) | YES |
| `reflect-metadata` global script in `angular.json` esbuild `scripts` | 1c | `["node_modules/reflect-metadata/Reflect.js"]` present (lines 67–69) | YES |
| No other `angular.json` section touched | 1c | Only `esbuild.options.scripts` changed | YES |
| `src/styles.scss` = exactly `@use '@cobranza-apps/ui/theme';` | 2 | Matches (1 line) | YES |
| `demo-config.ts` exports `DemoViewMode`, `DemoConfig` | 3 | Exported | YES |
| `demo-config.ts` exports `DEFAULT_DEMO_CONFIG` | 3 | **Not exported** — split into non-exported `DEFAULT_VIEW` + `DEFAULT_TABLE_ROWS` | **NO** (minor) |
| `demo-config.ts` exports `coerceDemoConfig`; validators module-private | 3 | Exported; validators are module-private | YES |
| `coerceDemoConfig(undefined)` → `{ view: 'table', title: undefined, profile: undefined, tableRows: 5 }` | 3, §4 checklist | Behavior matches | YES |
| `DemoComponent` standalone, selector `cba-demo`, `OnPush` | 4 | Matches | YES |
| 6 input signals with correct names/types | 4 | `moduleType`, `instanceId`, `size: ModuleSize`, `isCollapsed`, `isFullscreen`, `data` all present | YES |
| Import `MFE_EVENTS, SCHEMA_VERSION, type ModuleSize` from `@cobranza-apps/mfe-events` | 4, 10 | **Only `type ModuleSize` imported**; `MFE_EVENTS` + `SCHEMA_VERSION` missing | **NO** |
| `schemaVersion = SCHEMA_VERSION` readonly field | 4 | **Missing** | **NO** |
| `readyEventName = MFE_EVENTS.MODULE_READY` readonly field | 4 | **Missing** | **NO** |
| `sizeLabel` computed signal | 4 | **Missing** | **NO** |
| `config` / `view` computed signals | 4 | Present | YES |
| Template binds all 6 inputs | 5 | 5 of 6 bound in summary; `data` not surfaced (acceptable — pretty-printer is Task 8/9) | PARTIAL (acceptable) |
| Template `@switch` on `view()` with 3 `@case`s, Spanish strings | 5 | Matches | YES |
| Template line `Tamaño: {{ size() }} ({{ sizeLabel() }})` | 5 | **Replaced with `Modo ancho: {{ size() }}`** — drops `sizeLabel()` | **NO** |
| Template line `Esquema: {{ schemaVersion }} · Evento ready: {{ readyEventName }}` | 5 | **Missing entirely** | **NO** |
| `demo.component.scss` uses only `--cba-*` tokens, no hard-coded hex | 6 | Uses `--cba-bg-secondary` only | YES |
| `DemoPreviewComponent` stub `OnPush`, supplies mock `instanceId` + `data` | 7a | Matches | YES |
| `DemoPreviewComponent` template renders `<cba-demo>` with mock inputs | 7b | Matches (hardcoded literals per Step 7b) | YES |
| `app.routes.ts` single `'' → DemoPreviewComponent` route | 8 | Matches | YES |
| `federation.config.js` exposes `./Component` → `./src/app/demo/demo.component.ts`; `name: 'mfe-demo'` unchanged | 9 | Matches | YES |
| `@cobranza-apps/entities` remains in `package.json`, no import | 11 | Present (`^0.5.1`), no import | YES |
| `npx ng build` succeeds with zero errors | 12 | PASS per 4.5a report | YES |
| No `ngOnInit`/`ngOnDestroy`/event dispatch code (Task 9 scope) | §0, §4 checklist | Correctly absent | YES |
| No `views/` sub-components (Task 8 scope) | §0, §4 checklist | Correctly absent | YES |
| Code-quality constraints (file ≤200 lines, method ≤50 lines, ≤2 params, depth ≤2, private by default, no NgModules, no commented code) | §1.8 | All new files satisfy | YES |

## 4. Deviations found

### 4.1 Significant deviations (NOT acceptable — plan explicitly encoded these)

**D1. `@cobranza-apps/mfe-events` runtime consumption is effectively absent.**
- Plan Step 4 specifies `import { MFE_EVENTS, SCHEMA_VERSION, type ModuleSize } from '@cobranza-apps/mfe-events';`.
- Actual import is `import { type ModuleSize } from '@cobranza-apps/mfe-events';`.
- `ModuleSize` is a type-only import (erased at compile time). No runtime symbol from `@cobranza-apps/mfe-events` is referenced.
- Plan §1.4 explicitly states `MFE_EVENTS` and `SCHEMA_VERSION` are consumed **in Task B** (not Task 9), and Step 10 explicitly verifies their import and reference.
- This breaks TODO Task 3 acceptance: "Import and use helpers/types from `@cobranza-apps/mfe-events` (do not re-implement event shapes)." A type-only import does not constitute genuine consumption; the plan deliberately chose to surface the constants via `schemaVersion`/`readyEventName` fields to satisfy this acceptance without crossing into Task 9 dispatch behavior.

**D2. `schemaVersion` and `readyEventName` readonly fields missing from `DemoComponent`.**
- Plan Step 4 specifies:
  ```ts
  readonly schemaVersion = SCHEMA_VERSION;
  readonly readyEventName = MFE_EVENTS.MODULE_READY;
  ```
- Both absent. These are the public fields that (a) make `MFE_EVENTS`/`SCHEMA_VERSION` referenced (avoiding unused-import lint) and (b) prepare Task 9 dispatch payloads. Plan §1.4 and Step 10 require them.

**D3. `sizeLabel` computed signal missing from `DemoComponent`.**
- Plan Step 4 specifies `readonly sizeLabel = computed(() => (this.size() === '100%' ? 'long' : 'short'));`.
- Absent. This is part of Task 5 acceptance ("react to Input changes" — `size` reactivity surfaced as a label).

**D4. Template `Esquema: {{ schemaVersion }} · Evento ready: {{ readyEventName }}` line missing.**
- Plan Step 5 explicitly includes this `<p>` line in the summary header.
- Absent. This is the UI surface that makes the mfe-events constants visible (Task 3 visibility) and is the stable hook Task 9 will wire dispatch to.

**D5. Template wording changed and `sizeLabel()` binding dropped.**
- Plan Step 5 specifies `Tamaño: {{ size() }} ({{ sizeLabel() }})`.
- Actual: `Modo ancho: {{ size() }}`. The `({{ sizeLabel() }})` segment is dropped.
- The plan's exact wording was the encoded decision; the JUNIOR implementer under 50% restriction had no latitude to rewrite the template contract. Note: the TODO Task 8 "Modo ancho" wording belongs to Task 8 (OUT OF SCOPE for Task B); the plan deliberately used `Tamaño` + `sizeLabel` for Task B.

### 4.2 Minor deviation

**D6. `DEFAULT_DEMO_CONFIG` not exported.**
- Plan Step 3 specifies the exported constant `DEFAULT_DEMO_CONFIG`; Plan §4 Code Review Checklist item 2 explicitly checks for the export.
- Actual: two non-exported constants `DEFAULT_VIEW` and `DEFAULT_TABLE_ROWS`.
- Functionally equivalent (coercion behavior is identical), but the plan's export contract is not met. Low impact, but the implementer was required to follow the plan exactly.

### 4.3 Items flagged by 4.5a report that are NOT deviations (out of scope)

For clarity, these 4.5a flags are rejected as Task B deviations because plan §0 explicitly defers them:

- "Computed `sizeLabel`, `shortInstanceId`, `instanceColor` missing" — `shortInstanceId`/`instanceColor` are Task 7 (OUT OF SCOPE); **but `sizeLabel` is IN SCOPE** (D3 above).
- "Private signals `moduleState`, `isVisible`, `eventLog` missing" — Task 9 scope. Not a deviation.
- "OnInit/OnDestroy not implemented" — Task 9 scope. Not a deviation.
- "Shell→MFE listeners missing" — Task 9 scope. Not a deviation.
- "`mfe:module-ready` / `mfe:update-header` dispatch missing" — Task 9 scope. Not a deviation.
- "Action buttons / data payload viewer / event log missing" — Later tasks. Not a deviation.
- "View sub-components missing" — Task 8 scope. Not a deviation.
- "Preview controls missing / hardcoded input literals" — Task 10 scope; hardcoded literals are explicitly specified by Plan Step 7b. Not a deviation.
- "Accessibility affordances missing" — Not in Task B plan. Not a deviation.
- "`<cba-button>` not used" — Action buttons are Task 7/9. Not a deviation.

## 5. Verdict

The implementation **partially adheres** to the Task B plan. The folder structure, federation wiring, theme import, `reflect-metadata` setup, `DemoConfig` types/coercion, 6 input signals, `config`/`view` computed, `DemoPreviewComponent` stub, routing, and build success all match the plan. The OUT OF SCOPE items are correctly deferred.

However, **5 significant deviations (D1–D5)** and **1 minor deviation (D6)** exist. D1–D5 collectively weaken the Task 3 acceptance criterion (`@cobranza-apps/mfe-events` consumption) and the Task 5 `sizeLabel` reactivity requirement. These are not acceptable because the plan explicitly encoded these decisions (Steps 4, 5, 10) and the JUNIOR implementer under 50% restriction was required to follow them verbatim.

## 6. Proposed Fix Plan (for implementer sub-agent, single sub-task)

The fixes are confined to two files: `src/app/demo/demo.component.ts` and `src/app/demo/demo.component.html`, plus one export in `src/app/demo/demo-config.ts`. No structural or architectural decisions remain open.

### Fix 1 — `src/app/demo/demo-config.ts` (D6)

Replace the two non-exported constants:
```ts
const DEFAULT_VIEW: DemoViewMode = 'table';
const DEFAULT_TABLE_ROWS = 5;
```
with the exported constant specified by Plan Step 3:
```ts
export const DEFAULT_DEMO_CONFIG: Required<Pick<DemoConfig, 'view' | 'tableRows'>> = {
  view: 'table',
  tableRows: 5,
};
```
Then update `coerceDemoConfig` to reference `DEFAULT_DEMO_CONFIG.view` and `DEFAULT_DEMO_CONFIG.tableRows` instead of `DEFAULT_VIEW` / `DEFAULT_TABLE_ROWS`. Keep the three validator functions (`isValidViewMode`, `isPlainObject`, `isValidTableRowCount`) module-private and unchanged. Preserve all existing JSDoc; only update references inside `coerceDemoConfig`'s body.

### Fix 2 — `src/app/demo/demo.component.ts` (D1, D2, D3)

Change the import line to match Plan Step 4 exactly:
```ts
import { MFE_EVENTS, SCHEMA_VERSION, type ModuleSize } from '@cobranza-apps/mfe-events';
```
Add the two readonly fields and the `sizeLabel` computed specified by Plan Step 4, placed after the `view` computed and before the closing brace of the class:
```ts
readonly sizeLabel = computed(() => (this.size() === '100%' ? 'long' : 'short'));

readonly schemaVersion = SCHEMA_VERSION;
readonly readyEventName = MFE_EVENTS.MODULE_READY;
```
Preserve all existing JSDoc and the existing 6 input signals + `config`/`view` computed. Do not add lifecycle hooks or event dispatch (Task 9 scope).

### Fix 3 — `src/app/demo/demo.component.html` (D4, D5)

Replace the second `<p class="cba-text-caption">` line:
```html
<p class="cba-text-caption">
  Modo ancho: {{ size() }} · Colapsado: {{ isCollapsed() }} · Pantalla completa: {{ isFullscreen() }}
</p>
```
with the Plan Step 5 wording:
```html
<p class="cba-text-caption">
  Tamaño: {{ size() }} ({{ sizeLabel() }}) · Colapsado: {{ isCollapsed() }} ·
  Pantalla completa: {{ isFullscreen() }}
</p>
```
Then add the missing summary line immediately after the `Vista actual: {{ view() }}` line and before the closing `</header>`:
```html
<p class="cba-text-caption">Esquema: {{ schemaVersion }} · Evento ready: {{ readyEventName }}</p>
```
Leave the `@switch` block and all other lines unchanged.

### Fix 4 — Build verification

Run `npx ng build` (single command). Expected: zero errors. If it fails on `MFE_EVENTS`/`SCHEMA_VERSION` not found, confirm the import specifier is exactly `'@cobranza-apps/mfe-events'` and that `node_modules/@cobranza-apps/mfe-events/dist/index.js` re-exports those constants (it does, per plan §1.2). Do not edit unrelated config.

### Fix 5 — Git commit

Stage only:
- `src/app/demo/demo-config.ts`
- `src/app/demo/demo.component.ts`
- `src/app/demo/demo.component.html`

Follow `.kilo/rules/gitignore-compliance.md`. Commit on `feat/mfe-demo-phase0` (no branch switch, no push). Suggested message:
```
fix(mfe-demo): restore mfe-events consumption + sizeLabel per Task B plan

- import MFE_EVENTS, SCHEMA_VERSION and expose as readonly fields
- add sizeLabel computed signal
- restore Esquema/Evento ready template line and Tamaño/(sizeLabel) wording
- export DEFAULT_DEMO_CONFIG per plan Step 3
```

## 7. Summary

- **Adheres to Task B plan?** Partially. Structure, wiring, theme, polyfill, inputs, coercion, routing, federation, and build all match. OUT OF SCOPE items correctly deferred.
- **Issues found:** 5 significant deviations (D1–D5) around `@cobranza-apps/mfe-events` runtime consumption and `sizeLabel` reactivity; 1 minor export-shape deviation (D6).
- **4.5a report flags rejected:** All "Major diff" flags for identity panel, view sub-components, event dispatch, listeners, action buttons, event log, and preview controls correspond to OUT OF SCOPE items and are not Task B deviations.
- **Proposed action:** Apply the 5-fix plan above (3 file edits + build + commit) to restore full adherence. No scope/architecture decisions are reopened.
