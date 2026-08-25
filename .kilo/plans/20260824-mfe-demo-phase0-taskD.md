# Implementation Plan — Task D: Events + Standalone Preview Host

> Scope: Task 9 (Core event dispatch) + Task 10 (Standalone preview host) of `.agent/todos/20260803/20260803-todo-1.md`.
> Front-end spec: `.kilo/plans/20260824-mfe-demo-phase0-taskD-frontend-spec.md` (read it before implementing).
> Target implementer: **JUNIOR developer under 50% restriction** — all structural decisions are encoded below. Do not deviate.

---

## 0. Pre-analysis

### 0.1 Current repository state (verified)

- Branch: `feat/mfe-demo-phase0` (already created in step 2 — **do NOT** create/switch branches; git actions are restricted to step 2/3/5).
- Angular 22.1.2 standalone app, Native Federation remote configured.
- `@cobranza-apps/mfe-events@0.5.0` installed. Verified public API:
  - `MFE_EVENTS.MODULE_READY` = `'mfe:module-ready'`
  - `MFE_EVENTS.UPDATE_HEADER` = `'mfe:update-header'`
  - `SHELL_EVENTS.MODULE_STATE` = `'shell:module-state'`
  - `SHELL_EVENTS.VISIBILITY_CHANGED` = `'shell:visibility-changed'`
  - `SHELL_EVENTS.THEME_CHANGED` = `'shell:theme-changed'`
  - `dispatchMfeEvent(type, detail, options?)` — validates + dispatches on `window` by default.
  - `isShellEvent(event, type)` / `isMfeEvent(event, type)` — narrow `Event` → `CustomEvent<Payload>`.
  - `SCHEMA_VERSION` = `1` (const).
  - `ModuleSize` = `'50%' | '100%'` (exported).
  - `ModuleStatus` includes `'loaded'` (valid for `UpdateHeaderPayload.status`).
  - Payload interfaces: `ModuleReadyPayload`, `UpdateHeaderPayload` extend `ModuleIdentity` (`moduleType` + `instanceId`).
- `reflect-metadata` is loaded via `angular.json` scripts array. **Do NOT** add `import 'reflect-metadata'` anywhere.
- Existing files to modify (and ONLY these):
  - `src/app/demo/demo.component.ts` (100 lines currently)
  - `src/app/demo/demo.component.html` (55 lines)
  - `src/app/demo/demo.component.scss` (36 lines)
  - `src/app/demo-preview/demo-preview.component.ts` (29 lines)
  - `src/app/demo-preview/demo-preview.component.html` (11 lines)
  - `src/app/demo-preview/demo-preview.component.scss` (4 lines)
- `src/app/demo/demo-config.ts` exports `DemoViewMode`, `DemoConfig`, `coerceDemoConfig` — **do NOT modify** it; import `DemoViewMode` from there in the preview host.

### 0.2 Constraints (hard rules)

- Standalone components only. No `NgModules`.
- `OnPush` change detection must remain.
- Each source file ≤ 200 lines; each method body ≤ 50 lines; max nesting depth ≤ 2.
- Methods ≤ 2 params (use param objects if more needed — not needed here).
- Boolean conditions in `if` statements must be a single section (extract to a method when compound). The spec's listener pattern already uses early returns with single-section conditions — keep that style.
- Private members by default.
- Spanish-only UI strings.
- No commented-out code.
- No `npm install` / dependency changes — everything is already installed.
- No git commands in this step.

### 0.3 Architecture decisions (already chosen — do not re-decide)

1. **Lifecycle hooks** `OnInit` + `OnDestroy` on both components.
2. **Dispatch on `ngOnInit`** (signal inputs are guaranteed available there when Angular hosts the component).
3. **Listeners stored as private arrow-function fields** so `removeEventListener` works without `.bind()` rebinding.
4. **`ngOnInit` split into private helpers** to stay under 50 lines and depth ≤ 2.
5. **Preview controls use `FormsModule` + `[(ngModel)]**` (already a peer dependency; simplest for a junior dev, no manual `$any($event.target)` casts).
6. **Preview `data` is a `computed`** that merges `view`, `title`, and a fixed `tableRows: 5` — so `DemoComponent.coerceDemoConfig` does the validation and the preview never duplicates that logic.
7. **Title fallback** `'Demo'` lives in `DemoComponent` as a constant `DEFAULT_HEADER_TITLE` (not in the preview).

---

## 1. High-level approach

### `DemoComponent` (MFE side)

- Add `OnInit` + `OnDestroy` imports and `implements OnInit, OnDestroy`.
- Import `dispatchMfeEvent`, `isShellEvent`, `SHELL_EVENTS`, and payload types from `@cobranza-apps/mfe-events`. `MFE_EVENTS` and `SCHEMA_VERSION` are already imported — extend that import line.
- Add `DEFAULT_HEADER_TITLE = 'Demo'` file-level constant.
- Add three private arrow listeners: `onModuleState`, `onVisibilityChanged`, `onThemeChanged`.
- `ngOnInit` calls three private helpers: `dispatchReadyEvent()`, `dispatchUpdateHeaderEvent()`, `attachShellListeners()`.
- `ngOnDestroy` removes the three listeners.
- No template/SCSS change is strictly required for dispatch, but add a small identity-panel line showing the last received `shell:module-state` size (optional, only if line budget allows — see step 2.4).

### `DemoPreviewComponent` (simulated Shell host)

- Add `OnInit` + `OnDestroy`, `computed`, `FormsModule`.
- Replace the single `data` signal with: `size`, `view`, `title`, `instanceId` signals + `data` computed.
- Add two private arrow listeners: `onModuleReady`, `onUpdateHeader` (capture outgoing `mfe:*` events and log them).
- `ngOnInit` attaches both; `ngOnDestroy` removes both.
- Template: add a control panel (Tamaño select, Vista select, Título input) above `<cba-demo>`, bind `size()` into `[size]`.
- SCSS: minor layout for the control panel.

---

## 2. Detailed steps — `DemoComponent`

### 2.1 File: `src/app/demo/demo.component.ts`

**Replace the entire file** with the content below (it preserves every existing member and adds the event surface). Final length ≈ 150 lines, well under 200.

```ts
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CbaBadgeComponent } from '@cobranza-apps/ui';
import {
  dispatchMfeEvent,
  isShellEvent,
  MFE_EVENTS,
  SCHEMA_VERSION,
  SHELL_EVENTS,
  type ModuleReadyPayload,
  type ModuleSize,
  type ModuleStatePayload,
  type ThemeChangedPayload,
  type UpdateHeaderPayload,
  type VisibilityChangedPayload,
} from '@cobranza-apps/mfe-events';

import { coerceDemoConfig } from './demo-config';
import { DemoTableComponent } from './views/demo-table/demo-table.component';

const DEFAULT_HEADER_TITLE = 'Demo';

@Component({
  selector: 'cba-demo',
  standalone: true,
  imports: [CbaBadgeComponent, DemoTableComponent],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Main exposed component of `mfe-demo`.
 *
 * The Shell hosts this component via Native Federation and injects the
 * standard MFE inputs (see `brief.md §3.2`). The component:
 * - Renders one of three internal views (`table` | `create-form` | `profile`)
 *   driven by the opaque `data` input (coerced into `DemoConfig`).
 * - Owns only the body area — module chrome (header, drag handle, collapse,
 *   fullscreen, remove) belongs to the Shell / `@cobranza-apps/ui`.
 * - Dispatches `mfe:module-ready` and `mfe:update-header` on init.
 * - Listens for `shell:module-state`, `shell:visibility-changed`, and
 *   `shell:theme-changed`, filtering by `instanceId` (except theme, which is
 *   global).
 *
 * Selector: `cba-demo`
 */
export class DemoComponent implements OnInit, OnDestroy {
  readonly moduleType = input.required<string>();
  readonly instanceId = input.required<string>();
  readonly size = input.required<ModuleSize>();
  readonly isCollapsed = input.required<boolean>();
  readonly isFullscreen = input.required<boolean>();
  readonly data = input<Record<string, unknown> | undefined>(undefined);

  readonly config = computed(() => coerceDemoConfig(this.data()));
  readonly view = computed(() => this.config().view ?? 'table');

  readonly shortInstanceId = computed(() => truncateInstanceId(this.instanceId()));

  readonly instanceHue = computed(() => this.hashString(this.instanceId()) % 360);

  readonly instanceColorStyle = computed(() => ({
    '--demo-instance-marker': `hsl(${this.instanceHue()}, 65%, 45%)`,
  }));

  readonly sizeLabelText = computed(() =>
    this.size() === '100%' ? 'Ancho completo (100 %)' : 'Mitad de ancho (50 %)',
  );

  readonly viewLabel = computed(() => viewModeToSpanishLabel(this.view()));

  readonly schemaVersion = SCHEMA_VERSION;
  readonly readyEventName = MFE_EVENTS.MODULE_READY;
  readonly headerEventName = MFE_EVENTS.UPDATE_HEADER;

  private readonly onModuleState = (event: Event): void => {
    if (!isShellEvent(event, SHELL_EVENTS.MODULE_STATE)) return;
    if (event.detail.instanceId !== this.instanceId()) return;
    console.log('[mfe-demo] received', SHELL_EVENTS.MODULE_STATE, event.detail);
  };

  private readonly onVisibilityChanged = (event: Event): void => {
    if (!isShellEvent(event, SHELL_EVENTS.VISIBILITY_CHANGED)) return;
    if (event.detail.instanceId !== this.instanceId()) return;
    console.log('[mfe-demo] received', SHELL_EVENTS.VISIBILITY_CHANGED, event.detail);
  };

  private readonly onThemeChanged = (event: Event): void => {
    if (!isShellEvent(event, SHELL_EVENTS.THEME_CHANGED)) return;
    console.log('[mfe-demo] received', SHELL_EVENTS.THEME_CHANGED, event.detail);
  };

  ngOnInit(): void {
    this.dispatchReadyEvent();
    this.dispatchUpdateHeaderEvent();
    this.attachShellListeners();
  }

  ngOnDestroy(): void {
    window.removeEventListener(SHELL_EVENTS.MODULE_STATE, this.onModuleState);
    window.removeEventListener(SHELL_EVENTS.VISIBILITY_CHANGED, this.onVisibilityChanged);
    window.removeEventListener(SHELL_EVENTS.THEME_CHANGED, this.onThemeChanged);
  }

  private dispatchReadyEvent(): void {
    const payload: ModuleReadyPayload = {
      schemaVersion: SCHEMA_VERSION,
      moduleType: this.moduleType(),
      instanceId: this.instanceId(),
    };
    console.log('[mfe-demo] dispatch', MFE_EVENTS.MODULE_READY, payload);
    dispatchMfeEvent(MFE_EVENTS.MODULE_READY, payload);
  }

  private dispatchUpdateHeaderEvent(): void {
    const payload: UpdateHeaderPayload = {
      schemaVersion: SCHEMA_VERSION,
      moduleType: this.moduleType(),
      instanceId: this.instanceId(),
      title: this.config().title ?? DEFAULT_HEADER_TITLE,
      status: 'loaded',
    };
    console.log('[mfe-demo] dispatch', MFE_EVENTS.UPDATE_HEADER, payload);
    dispatchMfeEvent(MFE_EVENTS.UPDATE_HEADER, payload);
  }

  private attachShellListeners(): void {
    window.addEventListener(SHELL_EVENTS.MODULE_STATE, this.onModuleState);
    window.addEventListener(SHELL_EVENTS.VISIBILITY_CHANGED, this.onVisibilityChanged);
    window.addEventListener(SHELL_EVENTS.THEME_CHANGED, this.onThemeChanged);
  }

  private hashString(value: string): number {
    let hash = 0;
    for (let index = 0; index < value.length; index += 1) {
      const char = value.charCodeAt(index);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return Math.abs(hash);
  }
}

const SHORT_ID_PREFIX_LENGTH = 8;

function truncateInstanceId(value: string): string {
  return value.length > SHORT_ID_PREFIX_LENGTH
    ? `${value.slice(0, SHORT_ID_PREFIX_LENGTH)}…`
    : value;
}

const VIEW_LABELS: Readonly<Record<string, string>> = {
  table: 'Tabla',
  'create-form': 'Alta',
  profile: 'Perfil',
};

function viewModeToSpanishLabel(view: string): string {
  return VIEW_LABELS[view] ?? 'Desconocida';
}
```

**Notes for the implementer:**

- The two unused type imports `ModuleStatePayload`, `VisibilityChangedPayload`, `ThemeChangedPayload` are **not** required by the compiler (the arrow listeners infer `event.detail` from `isShellEvent` narrowing). If the linter complains about unused imports, **remove only those three type imports** and keep the rest. Do not remove `ModuleReadyPayload` or `UpdateHeaderPayload` (used in the dispatch helpers).
- Do not change the selector, the existing inputs, the existing computed signals, or the `hashString` helper.
- The `readyEventName` / `headerEventName` readonly fields are kept for template/identity-panel display; `headerEventName` is newly added (the spec exposes `UPDATE_HEADER` for the identity panel). If the template does not reference `headerEventName`, the linter may flag it as unused — in that case **remove `headerEventName`** (keep `readyEventName` only if the template uses it; otherwise remove that too). Prefer referencing them in the template per step 2.2.

### 2.2 File: `src/app/demo/demo.component.html`

Add one extra identity-row that surfaces the dispatched header event name and the default title, so the dispatch is visible in the UI (not only in the console). Insert it **after** the existing `Vista` row (line 35, before `</header>`).

Replace the block:

```html
    <div class="cba-demo__identity-row">
      <span class="cba-text-caption">
        <strong>Vista:</strong> {{ viewLabel() }}
      </span>
    </div>
  </header>
```

with:

```html
    <div class="cba-demo__identity-row">
      <span class="cba-text-caption">
        <strong>Vista:</strong> {{ viewLabel() }}
      </span>
    </div>

    <div class="cba-demo__identity-row">
      <span class="cba-text-caption">
        <strong>Header:</strong> {{ headerEventName }} →
        «{{ config().title ?? 'Demo' }}»
      </span>
    </div>
  </header>
```

This keeps `headerEventName` used (avoids the unused-field lint) and gives the developer a visible confirmation of the title that was pushed via `mfe:update-header`.

No other HTML change required. The existing `@switch (view())` body stays intact.

### 2.3 File: `src/app/demo/demo.component.scss`

No change required for event dispatch. Leave the file untouched. (If the new identity row overflows, the existing `.cba-demo__identity-row { flex-wrap: wrap }` already handles it.)

### 2.4 Optional `lastModuleState` signal — **SKIP**

The spec §5.4 marks storing the last `ModuleStatePayload` in a signal as optional and only if it does not push the file over 200 lines. The file in step 2.1 is already ~150 lines; adding a signal + template binding + scss would approach the budget and add nesting. **Do not implement it.** Logging to console is sufficient for Phase 0 (spec §5.4 explicitly allows log-only).

---

## 3. Detailed steps — `DemoPreviewComponent`

### 3.1 File: `src/app/demo-preview/demo-preview.component.ts`

**Replace the entire file** with the content below. Final length ≈ 75 lines.

```ts
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  isMfeEvent,
  MFE_EVENTS,
  type ModuleSize,
} from '@cobranza-apps/mfe-events';

import { DemoComponent } from '../demo/demo.component';
import { type DemoViewMode } from '../demo/demo-config';

const MOCK_INSTANCE_ID = 'demo-preview-0001';
const MOCK_TABLE_ROWS = 5;

@Component({
  selector: 'app-demo-preview',
  standalone: true,
  imports: [DemoComponent, FormsModule],
  templateUrl: './demo-preview.component.html',
  styleUrl: './demo-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Standalone preview host for `DemoComponent`.
 *
 * Simulates the Shell when running `ng serve` alone: injects mock inputs,
 * exposes controls for `size`, `view`, and `title`, and logs the outgoing
 * `mfe:module-ready` / `mfe:update-header` events to the console so dispatch
 * can be verified without the real Shell.
 *
 * NOT loaded by the Shell in production — the Shell hosts `DemoComponent`
 * directly via federation.
 */
export class DemoPreviewComponent implements OnInit, OnDestroy {
  readonly instanceId = signal(MOCK_INSTANCE_ID);
  readonly size = signal<ModuleSize>('100%');
  readonly view = signal<DemoViewMode>('table');
  readonly title = signal<string>('');

  readonly data = computed<Record<string, unknown>>(() => ({
    view: this.view(),
    title: this.title() || undefined,
    tableRows: MOCK_TABLE_ROWS,
  }));

  private readonly onModuleReady = (event: Event): void => {
    if (!isMfeEvent(event, MFE_EVENTS.MODULE_READY)) return;
    console.log('[demo-preview] captured', MFE_EVENTS.MODULE_READY, event.detail);
  };

  private readonly onUpdateHeader = (event: Event): void => {
    if (!isMfeEvent(event, MFE_EVENTS.UPDATE_HEADER)) return;
    console.log('[demo-preview] captured', MFE_EVENTS.UPDATE_HEADER, event.detail);
  };

  ngOnInit(): void {
    window.addEventListener(MFE_EVENTS.MODULE_READY, this.onModuleReady);
    window.addEventListener(MFE_EVENTS.UPDATE_HEADER, this.onUpdateHeader);
  }

  ngOnDestroy(): void {
    window.removeEventListener(MFE_EVENTS.MODULE_READY, this.onModuleReady);
    window.removeEventListener(MFE_EVENTS.UPDATE_HEADER, this.onUpdateHeader);
  }
}
```

**Notes for the implementer:**

- `MOCK_DATA` constant from the old file is removed because `data` is now a `computed`. Do not re-add it.
- `FormsModule` is imported to enable `[(ngModel)]` in the template (step 3.2).
- `ModuleSize` type import is required for the `size` signal generic.
- `DemoViewMode` is imported as type-only from `../demo/demo-config` (do not import the runtime `coerceDemoConfig`; the preview lets `DemoComponent` coerce).

### 3.2 File: `src/app/demo-preview/demo-preview.component.html`

**Replace the entire file** with the content below.

```html
<div class="demo-preview">
  <h1 class="cba-text-heading-md">Previsualización mfe-demo</h1>
  <p class="cba-text-small">Host simulado — eventos visibles en consola.</p>

  <fieldset class="demo-preview__controls">
    <legend class="cba-text-caption">Controles del host simulado</legend>

    <label class="demo-preview__field">
      <span class="cba-text-small">Tamaño</span>
      <select [(ngModel)]="size" name="size">
        <option value="100%">Completo (100 %)</option>
        <option value="50%">Mitad (50 %)</option>
      </select>
    </label>

    <label class="demo-preview__field">
      <span class="cba-text-small">Vista</span>
      <select [(ngModel)]="view" name="view">
        <option value="table">Tabla</option>
        <option value="create-form">Alta</option>
        <option value="profile">Perfil</option>
      </select>
    </label>

    <label class="demo-preview__field">
      <span class="cba-text-small">Título del header</span>
      <input
        type="text"
        [(ngModel)]="title"
        name="title"
        placeholder="Título para mfe:update-header" />
    </label>
  </fieldset>

  <cba-demo
    [moduleType]="'demo'"
    [instanceId]="instanceId()"
    [size]="size()"
    [isCollapsed]="false"
    [isFullscreen]="false"
    [data]="data()" />
</div>
```

**Notes for the implementer:**

- `[(ngModel)]="size"` binds directly to the `size` signal (Angular 22 supports two-way binding to signals in templates). Same for `view` and `title`.
- `[size]="size()"` on `<cba-demo>` reads the signal value reactively; when the select changes `size`, the demo identity panel + table reflow.
- The `name` attributes are required by `FormsModule` for `ngModel` uniqueness inside a form-like fieldset.
- Empty `title` → `data().title === undefined` → `DemoComponent` falls back to `'Demo'` (verified by the `?? DEFAULT_HEADER_TITLE` in step 2.1).

### 3.3 File: `src/app/demo-preview/demo-preview.component.scss`

**Replace the entire file** with the content below.

```scss
:host {
  display: block;
  padding: 1rem;
}

.demo-preview__controls {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: var(--cba-space-3);
  margin: var(--cba-space-3) 0;
  padding: var(--cba-space-3);
  border: 1px solid var(--cba-border-subtle);
  border-radius: var(--cba-radius-md);
}

.demo-preview__field {
  display: flex;
  flex-direction: column;
  gap: var(--cba-space-1);
}

.demo-preview__field select,
.demo-preview__field input {
  padding: var(--cba-space-1) var(--cba-space-2);
  border: 1px solid var(--cba-border-subtle);
  border-radius: var(--cba-radius-sm);
  background-color: var(--cba-bg-primary);
}
```

**Notes:**

- Uses `@cobranza-apps/ui` CSS custom properties (`--cba-space-*`, `--cba-border-subtle`, `--cba-radius-*`, `--cba-bg-primary`). These are already available globally because `styles.scss` imports the UI theme (verified in earlier tasks). If any token is missing, the implementer may fall back to the literal values `0.25rem`/`0.5rem`/`1px solid #ccc`/`0.25rem`/`#fff` — but first check the existing `demo.component.scss` which already uses `--cba-space-*` and `--cba-radius-md`, confirming the tokens are present.
- Do not add mobile breakpoints.

---

## 4. Verification (run after edits, before declaring done)

### 4.1 Type / build check

Run from the repo root:

```
npx ng build
```

**Expected:** build succeeds with zero errors. If `reflect-metadata` related errors appear, do **not** add an import — confirm `angular.json` scripts already include `reflect-metadata` (it does; this was verified in earlier tasks). If a lint error flags unused type imports, apply the trim rule from step 2.1.

### 4.2 Serve check (manual smoke by the implementer)

```
npx ng serve
```

Open the preview URL (default `http://localhost:4200`). Confirm:

1. The identity panel renders with `Módulo: demo`, an `instanceId`, `Tamaño: Ancho completo (100 %)`, `Vista: Tabla`, and the new `Header: mfe:update-header → «Demo»` row.
2. Open DevTools console. On page load, two logs appear from `[mfe-demo] dispatch` (`mfe:module-ready` and `mfe:update-header`) and two from `[demo-preview] captured` (the preview host catching the same events).
3. Change **Tamaño** to `Mitad (50 %)`: identity panel updates to `Mitad de ancho (50 %)` and the table reflows.
4. Change **Vista** to `Alta` or `Perfil`: the placeholder "Vista aún no implementada en Phase 0." renders and `Vista` label updates.
5. Type a value in **Título del header**, then **reload the page**: the new title appears in the `Header:` identity row and in the `mfe:update-header` console payload. (Re-dispatch on title change without reload is out of scope for Phase 0 — spec §4.3.)

### 4.3 Lint / diagnostics check

Run the VS Code diagnostics tool (`vscode-mcp-server_get_diagnostics_code`) on the two modified `.ts` files with severities `[0, 1]`. Expected: no errors or warnings.

### 4.4 Acceptance criteria mapping (from spec §10)

- `mfe:module-ready` dispatch on init → step 2.1 `dispatchReadyEvent()`.
- `mfe:update-header` dispatch on init with `config().title ?? 'Demo'` and `status: 'loaded'` → step 2.1 `dispatchUpdateHeaderEvent()`.
- Every dispatched event logged before dispatch → both helpers `console.log` before `dispatchMfeEvent`.
- Listens for the three `shell:*` events → step 2.1 arrow listeners + `attachShellListeners()`.
- `instanceId` filtering (except theme) → early returns in `onModuleState` / `onVisibilityChanged`; `onThemeChanged` has no filter.
- Listeners removed on destroy → `ngOnDestroy`.
- Preview controls for `size`, `view`, `title` → step 3.2 template + step 3.1 signals.
- Preview logs captured `mfe:*` events → step 3.1 arrow listeners.
- No NgModules, standalone preserved → both `@Component` keep `standalone: true`.
- Spanish-only UI strings → all labels in steps 2.2 and 3.2 are Spanish.
- `ng build` + `ng serve` functional → step 4.1 / 4.2.

---

## 5. Out of scope (do NOT implement)

- Action buttons (`mfe:show-notification`, `mfe:request-fullscreen`, `mfe:request-remove`, `mfe:request-add-module`, `mfe:module-error`).
- Re-dispatching `mfe:update-header` when `title` changes without reload (Phase 0 = init-only, per spec §4.3).
- `lastModuleState` signal + UI (explicitly skipped in step 2.4).
- Reflow logic driven by `shell:module-state` payload (Phase 0 = log only).
- Sub-view components for `create-form` / `profile`.
- Any modification to `@cobranza-apps/mfe-events`, `demo-config.ts`, `demo-table` sub-component, `app.config.ts`, `federation.config.js`, `angular.json`, `styles.scss`, README, or docs (those belong to other TODO tasks / workflow steps).
- Git branch/commit/push operations (restricted to step 2/3/5 of the Critical Workflow).
- Unit / e2e tests (optional in Phase 0; do not block).

---

## 6. Deliverable

A single response to the caller containing:
- The plan file path: `.kilo/plans/20260824-mfe-demo-phase0-taskD.md`.
- A short confirmation that no source files were modified and no git commands were run.
