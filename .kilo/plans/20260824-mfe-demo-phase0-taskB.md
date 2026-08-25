# mfe-demo Phase 0 — Task B Implementation Plan

> Scope: TODO Tasks 3 (shared libraries consumption), 4 (folder structure & main entry component), 5 (Shell Inputs wiring), 6 (internal `DemoConfig` types & parsing) from `.agent/todos/20260803/20260803-todo-1.md`.
> Front-end spec source: `.kilo/plans/20260824-mfe-demo-phase0-taskB-frontend-spec.md`.
> On conflict: `brief.md` > spec > this plan.
> Target implementer: JUNIOR developer under 50% restriction. All structural/scope decisions are encoded below; do not deviate.

## 0. Scope Boundaries (READ FIRST)

IN SCOPE for this plan (Tasks 3–6):
- Consume `@cobranza-apps/ui` theme (global SCSS import).
- Consume `@cobranza-apps/mfe-events` (runtime polyfill setup + import types/constants).
- Keep `@cobranza-apps/entities` as a present dependency (no runtime use yet).
- Create `src/app/demo/demo-config.ts` (types + coercion).
- Create `DemoComponent` (standalone, `cba-demo`, `OnPush`) with the 6 Shell input signals + computed `config`/`view`, minimal template, minimal SCSS.
- Wire `DemoComponent` as the federation-exposed `./Component`.
- Minimal standalone-preview route host (stub) so `ng serve` builds and renders `<cba-demo>` with mock inputs.

OUT OF SCOPE (deferred to later TODO tasks — DO NOT implement):
- Task 7: full identity panel + visual instance marker (`hashToColor`, `shortUuid`, `instanceColor`).
- Task 8: real table view body, `views/` sub-components, mock row data from `@cobranza-apps/entities`.
- Task 9: `mfe:module-ready` / `mfe:update-header` dispatch, Shell→MFE listeners, `ngOnInit`/`ngOnDestroy` event wiring.
- Task 10: preview controls (size/view/title toggles), event log UI, `mfe:*` listening in preview.
- Task 11: README / docs updates.
- Action buttons (`<cba-button>`), data payload pretty-printer, event log.

The `DemoComponent` produced here is intentionally a minimal skeleton that renders the current `view` mode and a few bound inputs; it is the stable hook Tasks 7–9 will extend.

## 1. Pre-Analysis & Technical Decisions

### 1.1 Current repo state (verified)
- `package.json` has Angular 22.1.2, `@cobranza-apps/ui ^0.19.0`, `@cobranza-apps/mfe-events ^0.5.0`, `@cobranza-apps/entities ^0.5.1`. `reflect-metadata` is NOT listed but is present in `node_modules` (transitive).
- `angular.json` `esbuild` target: `polyfills: ["zone.js", "es-module-shims"]`, `styles: ["src/styles.scss"]`, `scripts: []`. Dev server port 4201.
- `federation.config.js` exposes `./Component` → `./src/app/app.component.ts` (MUST change).
- `src/main.ts` uses `initFederation()` then dynamic-imports `./bootstrap`. `src/bootstrap.ts` bootstraps `AppComponent`.
- `src/app/app.component.ts` (minimal, `app-root`, `<router-outlet>`), `app.routes.ts` (empty `Routes = []`), `app.config.ts` (`provideRouter(routes)`), `src/styles.scss` (empty).
- No `src/app/demo/` folder yet.

### 1.2 Critical runtime dependency: `reflect-metadata`
`@cobranza-apps/mfe-events` public barrel (`dist/index.js`) re-exports `create-event.js`, which imports `validate-payload.js` → `class-transformer` + `class-validator` + the DTO registry. The DTO classes use `class-validator` decorators whose module-load execution requires `Reflect` metadata APIs. Importing any symbol from `@cobranza-apps/mfe-events` (even a type or constant) loads this graph through the barrel; relying on esbuild tree-shaking (`sideEffects: false`) is fragile. The library's own doc (`node_modules/@cobranza-apps/mfe-events/docs/examples/angular-setup.md`) mandates loading `reflect-metadata` as a global script via `angular.json` `scripts` for Angular esbuild / Native Federation projects.

DECISION: Set up `reflect-metadata` now as part of Task 3 (shared-library consumption enabler):
1. Add `reflect-metadata` explicitly to `package.json` dependencies.
2. Add `"node_modules/reflect-metadata/Reflect.js"` to the `esbuild` target `scripts` array in `angular.json`.
3. Run `npm install` to sync the lockfile.

Do NOT `import 'reflect-metadata'` in `src/main.ts` (CommonJS specifier fails under ESM shims per the library doc).

### 1.3 `@cobranza-apps/ui` theme import
Per spec §13.1 and UI `package.json` `exports["./theme"]` → `./theme/theme.scss`, the global theme is imported once via:
```scss
@use '@cobranza-apps/ui/theme';
```
This emits `--cba-*` CSS variables on `:root` and `.cba-*` utility classes. Available tokens (verified in `node_modules/@cobranza-apps/ui/theme/_variables.scss`): `--cba-bg-secondary` (#F2F0E8), `--cba-bg-tertiary` (#D8C3A5), `--cba-accent-primary`, `--cba-accent-success`, `--cba-accent-warning`, `--cba-accent-danger`, `--cba-accent-info`, `--cba-border-strong`, `--cba-focus-ring`.

### 1.4 `@cobranza-apps/mfe-events` symbols consumed in Task B
Import only what is USED in Task B (avoid unused-symbol lint errors):
- `MFE_EVENTS` (runtime constant) — referenced via `MFE_EVENTS.MODULE_READY` exposed as a readonly field for template display and Task 9 preparation.
- `SCHEMA_VERSION` (runtime constant) — exposed as a readonly field for template display.
- `type ModuleSize` — used as the type of the `size` input signal (replaces the literal `'50%' | '100%'`; `ModuleSize` is exactly that union per `dist/types.d.ts`).

Payload interfaces (`ModuleReadyPayload`, `UpdateHeaderPayload`, `ModuleStatePayload`, etc.) and helpers (`dispatchMfeEvent`, `isShellEvent`) are NOT imported in Task B — they are used in Task 9. Importing them now would create unused imports.

### 1.5 `@cobranza-apps/entities` usage in Task B
Mock table rows are Task 8 scope. Task B leaves `@cobranza-apps/entities` as a present dependency with NO import. The plan records that Task 8 will import `Client` (`import { Client } from '@cobranza-apps/entities'`) for mock row typing. No code change for entities in Task B.

### 1.6 Input signal strategy
Per spec §3.1: `moduleType`, `instanceId`, `size`, `isCollapsed`, `isFullscreen` use `input.required<T>()`; `data` uses `input<Record<string, unknown> | undefined>(undefined)`. Because the 5 identity inputs are required, `DemoComponent` cannot be routed directly without a host that supplies them. Therefore a minimal `DemoPreviewComponent` stub is created as the route host (Task 4: "root of the standalone preview route if applicable"). The stub supplies hardcoded mock values; controls and event listening are Task 10.

### 1.7 File layout produced by this plan
```text
src/
  styles.scss                         # MODIFIED — add theme import
  app/
    app.routes.ts                     # MODIFIED — add '' route to DemoPreviewComponent
    demo/
      demo-config.ts                  # NEW — types + coercion (Task 6)
      demo.component.ts               # NEW — standalone entry (Tasks 4, 5, 6)
      demo.component.html             # NEW — minimal template
      demo.component.scss             # NEW — minimal token-based styles
    demo-preview/
      demo-preview.component.ts       # NEW — minimal stub host (Task 4 preview route)
      demo-preview.component.html     # NEW
      demo-preview.component.scss     # NEW
federation.config.js                  # MODIFIED — expose ./Component → demo.component.ts
package.json                          # MODIFIED — add reflect-metadata dependency
angular.json                          # MODIFIED — add reflect-metadata global script
```
No `src/app/demo/views/` folder (Task 8). No changes to `app.component.*` or `app.config.ts`.

### 1.8 Code-quality constraints (non-negotiable, from `.kilo/rules/`)
- `src/` files ≤ 200 lines; method bodies ≤ 50 lines; methods ≤ 2 params; nested block depth ≤ 2; members `private` unless public API required; no commented-out code; no NgModules; Spanish UI strings; self-documenting names.
- All new components are `standalone: true` with `ChangeDetectionStrategy.OnPush`.

## 2. High-Level Approach

1. Enable `@cobranza-apps/mfe-events` at runtime by adding `reflect-metadata` (dependency + global script) — Task 3 enabler.
2. Apply the `@cobranza-apps/ui` gray theme globally via `src/styles.scss` — Task 3.
3. Create `demo-config.ts` with `DemoViewMode`, `DemoConfig`, `DEFAULT_DEMO_CONFIG`, `coerceDemoConfig`, and private validators — Task 6.
4. Create `DemoComponent` (standalone, `cba-demo`, `OnPush`) with the 6 input signals, computed `config`/`view`/`sizeLabel`, and readonly `schemaVersion`/`readyEventName` fields that consume `mfe-events` constants — Tasks 4, 5, 6.
5. Add a minimal `DemoComponent` template + SCSS using `--cba-*` tokens and Angular `@switch` control flow — Task 4.
6. Create a minimal `DemoPreviewComponent` stub that renders `<cba-demo>` with hardcoded mock inputs — Task 4 (preview route).
7. Wire `app.routes.ts` default route to `DemoPreviewComponent` — Task 4.
8. Update `federation.config.js` to expose `./Component` → `./src/app/demo/demo.component.ts` — Task 4.
9. Verify with `npx ng build`; commit.

## 3. Detailed Atomic Steps

### Step 1 — Add `reflect-metadata` dependency (Task 3 enabler)

**1a.** Edit `package.json`: add `"reflect-metadata": "0.2.2"` into the `dependencies` object (keep JSON valid; place it alphabetically among `@cobranza-apps/*` and `@fortawesome/*` is not required, but keep it as a dependency entry). Resulting entry appears alongside the other runtime deps.

**1b.** Run `npm install` (syncs `package-lock.json`; `reflect-metadata` is already in `node_modules`, so this is a no-op install that just records it as an explicit dependency). Single command, not chained.

**1c.** Edit `angular.json`: in `projects.mfe-demo.architect.esbuild.options.scripts` (currently `[]`), set:
```json
"scripts": [
  "node_modules/reflect-metadata/Reflect.js"
]
```
Do NOT touch the `build`, `serve`, `serve-original`, or `esbuild.configurations` sections. Do NOT add the script to `polyfills` (it must load as a traditional global script before app bootstrap, per the mfe-events doc).

### Step 2 — Apply UI theme globally (Task 3)

**2a.** Overwrite `src/styles.scss` (currently empty) with exactly:
```scss
@use '@cobranza-apps/ui/theme';
```
No additional rules, no `:root` overrides, no second design-system imports. This single line is the complete global stylesheet for Task B.

### Step 3 — Create `src/app/demo/demo-config.ts` (Task 6)

Create the file with this exact content:

```ts
export type DemoViewMode = 'table' | 'create-form' | 'profile';

export interface DemoConfig {
  view?: DemoViewMode;
  title?: string;
  profile?: Record<string, unknown>;
  tableRows?: number;
}

export const DEFAULT_DEMO_CONFIG: Required<Pick<DemoConfig, 'view' | 'tableRows'>> = {
  view: 'table',
  tableRows: 5,
};

export function coerceDemoConfig(data: Record<string, unknown> | undefined): DemoConfig {
  const raw = (data ?? {}) as DemoConfig;

  return {
    view: isValidViewMode(raw.view) ? raw.view : DEFAULT_DEMO_CONFIG.view,
    title: typeof raw.title === 'string' ? raw.title : undefined,
    profile: isPlainObject(raw.profile) ? raw.profile : undefined,
    tableRows: isValidTableRowCount(raw.tableRows)
      ? raw.tableRows
      : DEFAULT_DEMO_CONFIG.tableRows,
  };
}

function isValidViewMode(value: unknown): value is DemoViewMode {
  return value === 'table' || value === 'create-form' || value === 'profile';
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isValidTableRowCount(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}
```

Notes:
- `coerceDemoConfig` is a pure function with one param (≤2 params rule satisfied).
- Unknown `view` falls back to `'table'`; non-finite or negative `tableRows` falls back to default 5.
- Keep validators `function` (module-private, not exported) — they are file-local helpers.

### Step 4 — Create `src/app/demo/demo.component.ts` (Tasks 4, 5, 6)

Create the file with this content:

```ts
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MFE_EVENTS, SCHEMA_VERSION, type ModuleSize } from '@cobranza-apps/mfe-events';

import { coerceDemoConfig, type DemoViewMode } from './demo-config';

@Component({
  selector: 'cba-demo',
  standalone: true,
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoComponent {
  readonly moduleType = input.required<string>();
  readonly instanceId = input.required<string>();
  readonly size = input.required<ModuleSize>();
  readonly isCollapsed = input.required<boolean>();
  readonly isFullscreen = input.required<boolean>();
  readonly data = input<Record<string, unknown> | undefined>(undefined);

  readonly config = computed(() => coerceDemoConfig(this.data()));
  readonly view = computed<DemoViewMode>(() => this.config().view ?? 'table');
  readonly sizeLabel = computed(() => (this.size() === '100%' ? 'long' : 'short'));

  readonly schemaVersion = SCHEMA_VERSION;
  readonly readyEventName = MFE_EVENTS.MODULE_READY;
}
```

Notes:
- `ModuleSize` (from `@cobranza-apps/mfe-events`) is the `'50%' | '100%'` union; using it as the `size` input type is genuine consumption of the library's types and avoids re-implementing the union.
- `schemaVersion` and `readyEventName` are readonly fields that bind `SCHEMA_VERSION` and `MFE_EVENTS.MODULE_READY` for template display; they also prepare Task 9 (which will use these same constants in dispatch payloads). They are public because the template reads them.
- No `ngOnInit`/`ngOnDestroy`/event dispatch — that is Task 9.
- No `imports` array needed (template uses only built-in `@switch` control flow and text bindings).
- File is ~28 lines, well under 200.

### Step 5 — Create `src/app/demo/demo.component.html` (Task 4)

Create the file with this content:

```html
<section class="cba-demo" [attr.data-size]="size()">
  <header class="cba-demo__summary">
    <p class="cba-text-caption">Módulo: {{ moduleType() }} · Instancia: {{ instanceId() }}</p>
    <p class="cba-text-caption">
      Tamaño: {{ size() }} ({{ sizeLabel() }}) · Colapsado: {{ isCollapsed() }} ·
      Pantalla completa: {{ isFullscreen() }}
    </p>
    <p class="cba-text-caption">Vista actual: {{ view() }}</p>
    <p class="cba-text-caption">Esquema: {{ schemaVersion }} · Evento ready: {{ readyEventName }}</p>
  </header>

  @switch (view()) {
    @case ('table') {
      <p class="cba-text-body">Vista tabla — filas simuladas: {{ config().tableRows }}.</p>
    }
    @case ('create-form') {
      <p class="cba-text-body">Vista alta — pendiente en Phase 0.</p>
    }
    @case ('profile') {
      <p class="cba-text-body">Vista perfil — pendiente en Phase 0.</p>
    }
  }
</section>
```

Notes:
- Spanish strings only.
- `@switch`/`@case` are Angular 17+ built-in control flow (no import required).
- All 6 inputs are bound in the summary so Input reactivity is visible (Task 5 acceptance: identity panel + content update when inputs change — minimal form here; full panel is Task 7).
- `config().tableRows` is always a number after coercion, so no `?? 5` fallback in template.

### Step 6 — Create `src/app/demo/demo.component.scss` (Task 4)

Create the file with this content:

```scss
:host {
  display: block;
  background-color: var(--cba-bg-secondary);
  padding: 0.75rem;
}

.cba-demo__summary {
  margin-bottom: 0.5rem;
}
```

Notes:
- Uses `--cba-bg-secondary` token (panel surface per spec §8.2).
- No hard-coded hex values.
- Well under the 4 kb `anyComponentStyle` budget.

### Step 7 — Create minimal `DemoPreviewComponent` stub (Task 4 preview route)

**7a.** Create `src/app/demo-preview/demo-preview.component.ts`:
```ts
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { DemoComponent } from '../demo/demo.component';

const MOCK_INSTANCE_ID = 'demo-preview-0001';
const MOCK_DATA: Record<string, unknown> = { view: 'table', tableRows: 5 };

@Component({
  selector: 'app-demo-preview',
  standalone: true,
  imports: [DemoComponent],
  templateUrl: './demo-preview.component.html',
  styleUrl: './demo-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoPreviewComponent {
  readonly instanceId = signal(MOCK_INSTANCE_ID);
  readonly data = signal<Record<string, unknown>>(MOCK_DATA);
}
```

**7b.** Create `src/app/demo-preview/demo-preview.component.html`:
```html
<div class="demo-preview">
  <h1 class="cba-text-heading-md">Previsualización mfe-demo</h1>
  <p class="cba-text-small">Host simulado — controles completos en Task 10.</p>
  <cba-demo
    [moduleType]="'demo'"
    [instanceId]="instanceId()"
    [size]="'100%'"
    [isCollapsed]="false"
    [isFullscreen]="false"
    [data]="data()" />
</div>
```

**7c.** Create `src/app/demo-preview/demo-preview.component.scss`:
```scss
:host {
  display: block;
  padding: 1rem;
}
```

Notes:
- This stub only supplies mock Inputs so `DemoComponent` (with required inputs) renders under `ng serve`. Controls, size/view switching, and `mfe:*` event listening are Task 10 — do NOT add them here.
- `size` is hardcoded to `'100%'` and `data` to `{ view: 'table', tableRows: 5 }`.

### Step 8 — Wire standalone preview route (Task 4)

Overwrite `src/app/app.routes.ts` with:
```ts
import { Routes } from '@angular/router';

import { DemoPreviewComponent } from './demo-preview/demo-preview.component';

export const routes: Routes = [
  { path: '', component: DemoPreviewComponent },
];
```

Do NOT change `app.config.ts` (`provideRouter(routes)` is already correct) or `app.component.*` (already minimal with `<router-outlet>`).

### Step 9 — Update federation exposure (Task 4)

Edit `federation.config.js`: change the `exposes['./Component']` value from `'./src/app/app.component.ts'` to `'./src/app/demo/demo.component.ts'`. Keep the inline comment accurate. Result:
```js
exposes: {
  './Component': './src/app/demo/demo.component.ts',
},
```
Do NOT change `name`, `skip`, or `shared`.

### Step 10 — Verify mfe-events consumption (Task 3 acceptance)

Confirm `src/app/demo/demo.component.ts` imports `MFE_EVENTS`, `SCHEMA_VERSION`, and `type ModuleSize` from `@cobranza-apps/mfe-events` and that `MFE_EVENTS`/`SCHEMA_VERSION` are referenced (via `readyEventName`/`schemaVersion` fields) and `ModuleSize` is referenced (as `size` input type). No unused imports. This satisfies TODO Task 3 line "Import and use helpers/types from `@cobranza-apps/mfe-events` (do not re-implement event shapes)" for Phase 0 Task B. Full helper-function dispatch is Task 9.

### Step 11 — Entities dependency presence (Task 3 acceptance)

No code change. Confirm `@cobranza-apps/entities` remains in `package.json` dependencies (it does). Task 8 will import `Client` for mock table rows. Do NOT add an unused import in Task B (would violate no-unused rules).

### Step 12 — Build verification

Run `npx ng build` (single command; uses the default `production` configuration which is the acceptance criteria). Expected: build completes with zero errors. The federation manifest (`dist/mfe-demo/` + remote entry) must be generated.

If the build fails:
- On `reflect-metadata` / `Unable to resolve specifier 'reflect-metadata'`: confirm `angular.json` `scripts` entry (Step 1c) and that `node_modules/reflect-metadata/Reflect.js` exists.
- On SCSS `@use '@cobranza-apps/ui/theme'` resolution: confirm `node_modules/@cobranza-apps/ui/theme/theme.scss` exists (it does) and Dart Sass is the configured compiler (Angular 22 default).
- On `MFE_EVENTS`/`SCHEMA_VERSION`/`ModuleSize` not found: confirm the import path is exactly `'@cobranza-apps/mfe-events'`.
- Do NOT edit unrelated config to silence errors. If an error is outside the files touched by this plan, STOP and return the question to the caller.

Do NOT run `ng serve` as part of this plan (the caller/user performs manual `ng serve` verification per the TODO "Manual verification" section).

### Step 13 — Git commit

Stage only the files created/modified by this plan:
- `package.json`, `package-lock.json`
- `angular.json`
- `src/styles.scss`
- `src/app/app.routes.ts`
- `src/app/demo/demo-config.ts`
- `src/app/demo/demo.component.ts`
- `src/app/demo/demo.component.html`
- `src/app/demo/demo.component.scss`
- `src/app/demo-preview/demo-preview.component.ts`
- `src/app/demo-preview/demo-preview.component.html`
- `src/app/demo-preview/demo-preview.component.scss`
- `federation.config.js`

Follow `.kilo/rules/gitignore-compliance.md`: read `.gitignore`, run `git status`, ensure no `node_modules/`, `dist/`, or other ignored paths are staged.

Commit on the current branch (`feat/mfe-demo-phase0`) — do NOT create or switch branches (branch setup is restricted to Critical Workflow step 2). Do NOT push (push is restricted to step 5).

Suggested commit message:
```
feat(mfe-demo): consume shared libs + wire DemoComponent entry (Task B)

- import @cobranza-apps/ui theme in src/styles.scss
- add reflect-metadata runtime polyfill for @cobranza-apps/mfe-events
- add demo-config.ts (DemoViewMode, DemoConfig, coerceDemoConfig)
- add DemoComponent (cba-demo, OnPush, 6 Shell input signals, computed config/view)
- add minimal demo-preview stub host + default route
- expose ./Component -> demo.component.ts in federation.config.js
```

## 4. Code Review Checklist (for step 4.3)

- [ ] `src/styles.scss` contains exactly `@use '@cobranza-apps/ui/theme';` and nothing else.
- [ ] `demo-config.ts` exports `DemoViewMode`, `DemoConfig`, `DEFAULT_DEMO_CONFIG`, `coerceDemoConfig`; validators are module-private; `coerceDemoConfig(undefined)` returns `{ view: 'table', title: undefined, profile: undefined, tableRows: 5 }`.
- [ ] `demo.component.ts` is `standalone`, selector `cba-demo`, `OnPush`; the 6 inputs match spec §3.1 names and types exactly; `ModuleSize` is imported from `@cobranza-apps/mfe-events`; `MFE_EVENTS` and `SCHEMA_VERSION` are imported and referenced.
- [ ] No `ngOnInit`/`ngOnDestroy`/event dispatch code present (Task 9 scope).
- [ ] No `views/` sub-components present (Task 8 scope).
- [ ] `demo.component.html` uses Spanish strings, `@switch` on `view()`, binds all 6 inputs.
- [ ] `demo.component.scss` uses only `--cba-*` tokens; no hard-coded hex.
- [ ] `federation.config.js` exposes `./Component` → `./src/app/demo/demo.component.ts`; `name: 'mfe-demo'` unchanged.
- [ ] `app.routes.ts` has exactly one route `{ path: '', component: DemoPreviewComponent }`.
- [ ] `angular.json` `esbuild.options.scripts` includes `node_modules/reflect-metadata/Reflect.js`; no other angular.json section changed.
- [ ] `package.json` lists `reflect-metadata` in `dependencies`.
- [ ] Every new `src/` file ≤ 200 lines; every method body ≤ 50 lines; no method > 2 params; max nested depth ≤ 2; members private unless template-public; no commented-out code; no NgModules.
- [ ] `npx ng build` succeeds with zero errors.

## 5. Acceptance Criteria Mapping

| TODO Task | Acceptance | Where satisfied |
|-----------|------------|-----------------|
| 3 — UI theme import + intermediate gray theme applied | `src/styles.scss` imports `@cobranza-apps/ui/theme` | Step 2 |
| 3 — Import/use mfe-events helpers/types | `MFE_EVENTS`, `SCHEMA_VERSION`, `ModuleSize` imported and referenced | Steps 4, 10 |
| 3 — entities present (unused ok) | `@cobranza-apps/entities` stays in `package.json` | Step 11 |
| 4 — `src/app/demo/` folder + files | `demo.component.{ts,html,scss}`, `demo-config.ts` created | Steps 3–6 |
| 4 — `DemoComponent` standalone, exposed as federation entry | `federation.config.js` exposes `./Component` → `demo.component.ts` | Step 9 |
| 4 — stable selector | `cba-demo` (documented in commit + spec) | Step 4 |
| 4 — standalone preview route | `app.routes.ts` `'' → DemoPreviewComponent` | Steps 7–8 |
| 5 — 6 `@Input()`s with correct names/types | input signals `moduleType`, `instanceId`, `size: ModuleSize`, `isCollapsed`, `isFullscreen`, `data` | Step 4 |
| 5 — react to Input changes | computed `config`/`view`/`sizeLabel` + template bindings | Steps 4–5 |
| 5 — sensible defaults for standalone preview | `DemoPreviewComponent` supplies mock values | Step 7 |
| 6 — `demo-config.ts` with `DemoViewMode` + `DemoConfig` | types exported | Step 3 |
| 6 — derived `config`/`view` on component | `config` and `view` computed signals, default `'table'` | Step 4 |
| 6 — types not in mfe-events | `demo-config.ts` lives only in this repo | Step 3 |

## 6. Verification by Caller / User (out of plan execution)

After this plan is implemented:
- `npx ng build` succeeds (Step 12).
- `ng serve` (port 4201) shows the preview with the summary header and "Vista tabla — filas simuladas: 5."
- DevTools console has NO `reflect-metadata` / mfe-events load errors.
- Full `mfe:module-ready` / `mfe:update-header` dispatch verification is deferred to Task 9.

## 7. Notes for Downstream Tasks

- Task 7 will extend `demo.component.html` with the full identity panel + visual marker (`hashToColor`, `shortUuid`, `instanceColor`) and add `--cba-bg-tertiary` / `--cba-accent-*` usage to `demo.component.scss`.
- Task 8 will create `src/app/demo/views/demo-table.component.ts` etc., import `Client` from `@cobranza-apps/entities` for mock rows, and replace the `@case ('table')` inline placeholder with `<cba-demo-table>`.
- Task 9 will add `ngOnInit`/`ngOnDestroy`, import `dispatchMfeEvent`, `isShellEvent`, `SHELL_EVENTS`, and the payload interfaces; wire `mfe:module-ready` + `mfe:update-header` dispatch and `shell:*` listeners; `reflect-metadata` is already loaded by Step 1.
- Task 10 will expand `DemoPreviewComponent` with size/view/title toggles and `mfe:*` event listening.
- `CbaButtonComponent` selector `cba-button` with `(cbaClick)` output and `variant` ∈ `primary|secondary|ghost|danger|success` is available from `@cobranza-apps/ui` for Task 7/9 action buttons (verified in `node_modules/@cobranza-apps/ui/types/cobranza-apps-ui.d.ts`).
