# Implementation Plan — Task A: mfe-demo Phase 2 Code Implementation

**Source TODO:** `.agent/todos/20260825/20260825-todo-0.md` (Tasks 1–9)
**Front-end spec:** `.kilo/plans/20260825-phase2-taskA-frontend-spec.md`
**Global plan:** `.kilo/plans/20260825-mfe-demo-phase2-global.md`
**Date:** 2026-08-25
**Branch:** `feat/phase2-min-height-polish`
**Version:** `0.3.0` (already bumped in step 3)
**Target implementer:** JUNIOR developer under 50% restriction.

This plan encodes every structural, architectural, and scope decision. The implementer must NOT invent alternative approaches, modify files outside the explicit list, or skip steps. Where the spec offers a choice, this plan picks one.

## Files expected to change (exhaustive list — do NOT touch any other file)

| # | File | Change type |
|---|------|-------------|
| 1 | `package.json` | Edit: bump `@cobranza-apps/mfe-events` `^0.5.0` → `^0.6.0` |
| 2 | `src/app/demo/demo-min-height.ts` | New |
| 3 | `src/app/demo/demo-dispatcher.ts` | Edit: add `updateMinHeight`; import `UpdateMinHeightPayload`; remove `console.log` |
| 4 | `src/app/demo/demo-shell-state.ts` | Edit: add `dragState` / `previewMode` |
| 5 | `src/app/demo/demo.component.ts` | Edit: min-height state + effects + debug method + `data-collapsed` |
| 6 | `src/app/demo/demo.component.html` | Edit: add min-height row, drag/preview rows, `data-collapsed` attr |
| 7 | `src/app/demo/demo.component.scss` | Edit: add `[data-collapsed='true']` rule |
| 8 | `src/app/demo-preview/demo-preview.component.ts` | Edit: capture min-height, override signal, `ViewChild`, drag/preview signals |
| 9 | `src/app/demo-preview/demo-preview.component.html` | Edit: min-height readout, override input, re-dispatch button, drag/preview selects |
| 10 | `src/app/demo-preview/demo-preview.component.scss` | Edit: minor styling for new controls |
| 11 | `src/app/demo/views/demo-create-form/demo-create-form.component.ts` | Edit: rename model fields to entity-aligned keys |
| 12 | `src/app/demo/views/demo-create-form/demo-create-form.component.html` | Edit: update bindings |

No other files may be created or modified. In particular: do NOT touch `demo-config.ts`, `demo-event-log.ts`, `demo-utils.ts`, `demo-profile.component.*`, `demo-table.component.*`, `angular.json`, `tsconfig*.json`, or any docs (docs are Task B).

## Git & command conventions

- All work happens on the current branch `feat/phase2-min-height-polish`. Do NOT create, switch, or merge branches (restricted to step 2 / step 5).
- Do NOT push (restricted to step 5).
- Do NOT bump `package.json` version (already `0.3.0`, restricted to step 3).
- Run a single command per `bash` tool call. Do NOT chain commands with `&` or `&&`. Use `;` only when ordering is required and failure of the first is acceptable.
- Use PowerShell only as last option. For `npm`/`ng` use `bash`.
- After every logical chunk, run `git add <explicit paths>` and `git commit -m "<message>"`. Stage only the files you changed in that chunk — never `git add .` or `git add -A`.
- Before each commit, run `git status` to confirm no `.gitignore`-matching files (e.g. `node_modules/`, `dist/`) are staged. Unstage any with `git restore --staged <path>` if found.

---

## Step 0 — Pre-flight verification (no commits)

### 0.1 Confirm branch and clean state

Run (one command per call):

```
git status
git branch --show-current
```

Expected: branch is `feat/phase2-min-height-polish`. If not, STOP and ask the caller — branch switching is restricted to step 2.

If `git status` shows unstaged changes not belonging to this task, STOP and ask the caller.

### 0.2 Confirm `angular.json` already loads `reflect-metadata`

Read `angular.json` (already verified in spec research): the `esbuild` options `scripts` array contains `"node_modules/reflect-metadata/Reflect.js"`. No action required. Do NOT edit `angular.json`.

### 0.3 Confirm `package.json` version is `0.3.0`

Read `package.json`. Line 3 must be `"version": "0.3.0"`. If not, STOP — version bump is restricted to step 3.

---

## Task 1 — Bump `@cobranza-apps/mfe-events` to `^0.6.0`

### 1.1 Edit `package.json`

In `package.json`, change line 22:

```json
"@cobranza-apps/mfe-events": "^0.5.0",
```

to:

```json
"@cobranza-apps/mfe-events": "^0.6.0",
```

Use the `edit` tool with `oldString`:
```
    "@cobranza-apps/mfe-events": "^0.5.0",
```
and `newString`:
```
    "@cobranza-apps/mfe-events": "^0.6.0",
```

Do NOT change any other dependency.

### 1.2 Install

Run:

```
npm install
```

Expected outcome: `@cobranza-apps/mfe-events` resolves to a `0.6.x` release and `node_modules/@cobranza-apps/mfe-events` is populated. If `npm install` fails or prints peer-dependency errors about `reflect-metadata`, STOP and report the exact error to the caller — do NOT edit `package.json` further and do NOT add `import 'reflect-metadata'` anywhere.

### 1.3 Type-resolution confirmation

Run a type-check via the Angular build (no separate `tsc` script exists). Use:

```
npm run build
```

(If a full build is too slow or fails for unrelated federation reasons, fall back to the editor diagnostics via `vscode-mcp-server_get_diagnostics_code` for the files edited later. But for Task 1, the goal is to confirm the types resolve, so attempt `npm run build` first.)

Then verify by reading the installed type definitions. Locate the package's type entry:

```
npm ls @cobranza-apps/mfe-events
```

Then read the main `.d.ts` of the installed package (use `glob` for `node_modules/@cobranza-apps/mfe-events/**/*.d.ts`) and confirm:

- `MFE_EVENTS` contains a key `UPDATE_MIN_HEIGHT` whose string value is `'mfe:update-min-height'`.
- A type `UpdateMinHeightPayload` is exported and includes at least `minHeightPx: number` and `reason: string` (plus identity fields inherited via the event map).

If either symbol is missing, STOP and report to the caller. Do NOT invent a local fallback type and do NOT proceed.

### 1.4 Commit

```
git status
git add package.json package-lock.json
git commit -m "chore(deps): bump @cobranza-apps/mfe-events to ^0.6.0"
```

If `package-lock.json` is gitignored or absent, stage only `package.json`. Verify `node_modules/` is NOT staged.

---

## Task 2 — Min-height declaration (MFE side)

### 2.1 Create `src/app/demo/demo-min-height.ts`

Create a new file with exactly this content (no comments beyond the JSDoc-style header, no extra exports):

```ts
import { type DemoViewMode } from './demo-config';

export type DemoMinHeightReason = 'init' | 'view-change' | 'content-change';

const MIN_HEIGHT_TABLE_PX = 320;
const MIN_HEIGHT_CREATE_FORM_PX = 400;
const MIN_HEIGHT_PROFILE_PX = 280;
const MIN_HEIGHT_DEFAULT_PX = 320;

/**
 * Sensible default min-height preference per view, in CSS pixels.
 *
 * Pure function: no side effects, no DOM reads, no signals. Used by
 * `DemoComponent.declareMinHeight` to pick the value sent via
 * `mfe:update-min-height` (`MFE_EVENTS.UPDATE_MIN_HEIGHT`).
 */
export function computeMinHeightPx(view: DemoViewMode): number {
  switch (view) {
    case 'table':       return MIN_HEIGHT_TABLE_PX;
    case 'create-form': return MIN_HEIGHT_CREATE_FORM_PX;
    case 'profile':     return MIN_HEIGHT_PROFILE_PX;
    default:            return MIN_HEIGHT_DEFAULT_PX;
  }
}
```

Reason for constants instead of inline magic numbers: project rule `avoid-magic-numbers`. The `default` branch covers any future view without crashing.

### 2.2 Edit `src/app/demo/demo-dispatcher.ts`

#### 2.2.1 Add `UpdateMinHeightPayload` import

Current import block (lines 2–8):

```ts
import {
  dispatchMfeEvent,
  MFE_EVENTS,
  SCHEMA_VERSION,
  type MfeEventMap,
  type ModuleStatus,
} from '@cobranza-apps/mfe-events';
```

Change to:

```ts
import {
  dispatchMfeEvent,
  MFE_EVENTS,
  SCHEMA_VERSION,
  type MfeEventMap,
  type ModuleStatus,
  type UpdateMinHeightPayload,
} from '@cobranza-apps/mfe-events';
```

#### 2.2.2 Add import for the reason type

Add a new import line after the existing `./demo-event-log` import (line 10):

```ts
import { type DemoMinHeightReason } from './demo-min-height';
```

#### 2.2.3 Add the `updateMinHeight` method

Insert a new public method immediately after `moduleError()` and before `cycleHeaderDemo()` (i.e., between current line 98 and line 100). Place it right before the `cycleHeaderDemo()` method:

```ts
  updateMinHeight(minHeightPx: number, reason: DemoMinHeightReason): void {
    this.send(
      MFE_EVENTS.UPDATE_MIN_HEIGHT,
      this.withIdentity({ minHeightPx, reason } as UpdateMinHeightPayload),
    );
  }
```

`withIdentity` injects `schemaVersion`, `moduleType`, and `instanceId`, so the dispatched payload matches the `UpdateMinHeightPayload` shape. The `as UpdateMinHeightPayload` cast is intentional and matches the spec — the runtime payload is built by `withIdentity`.

#### 2.2.4 Remove the `console.log` line in `send`

Current `send` method (lines 116–120):

```ts
  private send<K extends keyof MfeEventMap>(name: K, payload: MfeEventMap[K]): void {
    this.options.eventLog.add({ direction: 'out', eventType: name, payload });
    console.log('[mfe-demo] dispatch', name, payload);
    dispatchMfeEvent(name, payload);
  }
```

Remove the `console.log('[mfe-demo] dispatch', ...);` line. Result:

```ts
  private send<K extends keyof MfeEventMap>(name: K, payload: MfeEventMap[K]): void {
    this.options.eventLog.add({ direction: 'out', eventType: name, payload });
    dispatchMfeEvent(name, payload);
  }
```

Also update the class JSDoc: the bullet that says "Logs the payload to the browser console for quick debugging." must be removed (it is no longer accurate). Find the bullet at line 44 and delete that single bullet line; keep the surrounding bullets intact.

### 2.3 Edit `src/app/demo/demo.component.ts`

#### 2.3.1 Add imports

After the existing `import { hashString, truncateInstanceId } from './demo-utils';` (line 26), add:

```ts
import { computeMinHeightPx, type DemoMinHeightReason } from './demo-min-height';
```

Also extend the Angular core import (lines 1–9) to include `signal`:

Current:

```ts
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
```

Change to:

```ts
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
```

#### 2.3.2 Add the `lastDeclaredMinHeightPx` signal

Add immediately after the `data` input declaration (after line 96):

```ts
  readonly lastDeclaredMinHeightPx = signal<number | undefined>(undefined);
```

This signal is owned per instance (instance isolation, §6 of the spec).

#### 2.3.3 Add the private `declareMinHeight` helper

Add as a private method. Place it right after the `onCreateFormSecondary` readonly (after line 157) and before `matchesThisInstance` (line 159):

```ts
  private declareMinHeight(reason: DemoMinHeightReason, overridePx?: number): void {
    const view = this.view();
    const minHeightPx = overridePx !== undefined ? overridePx : computeMinHeightPx(view);
    this.lastDeclaredMinHeightPx.set(minHeightPx);
    this.dispatcher.updateMinHeight(minHeightPx, reason);
  }
```

#### 2.3.4 Add the public debug method for the preview host

Add immediately after `declareMinHeight`:

```ts
  /** Exposed only for the standalone preview host; not part of the public Shell contract. */
  declareMinHeightForPreview(reason: DemoMinHeightReason, overridePx?: number): void {
    this.declareMinHeight(reason, overridePx);
  }
```

#### 2.3.5 Add the view-change effect in the constructor

Current constructor (lines 139–148):

```ts
  constructor() {
    let previousTitle = '';
    effect(() => {
      const title = this.resolvedTitle();
      if (title !== previousTitle) {
        this.dispatcher.updateHeader(title, 'loaded');
        previousTitle = title;
      }
    });
  }
```

Change to:

```ts
  constructor() {
    let previousTitle = '';
    effect(() => {
      const title = this.resolvedTitle();
      if (title !== previousTitle) {
        this.dispatcher.updateHeader(title, 'loaded');
        previousTitle = title;
      }
    });

    let previousView: DemoViewMode | undefined;
    effect(() => {
      const view = this.view();
      if (previousView !== undefined && view !== previousView) {
        this.declareMinHeight('view-change');
      }
      previousView = view;
    });

    let previousRowCount: number | undefined;
    effect(() => {
      if (this.view() !== 'table') {
        return;
      }
      const rowCount = this.config().tableRows ?? 0;
      if (previousRowCount !== undefined && rowCount !== previousRowCount) {
        this.declareMinHeight('content-change');
      }
      previousRowCount = rowCount;
    });
  }
```

Notes for the implementer:
- The view-change effect deliberately skips the first run (when `previousView === undefined`) so init is the only `'init'` dispatch (in `ngOnInit`). Subsequent view changes dispatch `'view-change'`.
- The content-change effect only runs while `view() === 'table'`. `create-form` and `profile` do NOT dispatch content-change.
- Do NOT add `allowSignalWrites` — these effects only call `lastDeclaredMinHeightPx.set` and `dispatcher.updateMinHeight`, neither of which writes to a signal read by another effect in the same change-detection pass in a way that requires the flag. If the Angular compiler complains about signal writes in effects, add `{ allowSignalWrites: true }` as the second argument to each `effect(...)` call. This is the ONLY allowed deviation. Prefer to first try without it.

#### 2.3.6 Dispatch on init in `ngOnInit`

Current `ngOnInit` (lines 181–184):

```ts
  ngOnInit(): void {
    this.dispatcher.ready();
    this.attachShellListeners();
  }
```

Change to:

```ts
  ngOnInit(): void {
    this.dispatcher.ready();
    this.attachShellListeners();
    this.declareMinHeight('init');
  }
```

The `ready()` dispatch happens first, then `update-min-height` with `reason: 'init'`. This ordering matches the spec §3.3.

#### 2.3.7 Confirm `matchesThisInstance` stays strict

Do NOT modify lines 159–160. The spec §4.3 confirms the existing strict filter is correct. This step is a no-op confirmation only — do not edit anything.

### 2.4 Verify Task 2 builds

Run diagnostics on the two edited files:

```
vscode-mcp-server_get_diagnostics_code with path "src/app/demo/demo.component.ts"
vscode-mcp-server_get_diagnostics_code with path "src/app/demo/demo-dispatcher.ts"
vscode-mcp-server_get_diagnostics_code with path "src/app/demo/demo-min-height.ts"
```

Fix any error that is a direct consequence of these edits (e.g. a typo). If an error is unrelated (e.g. federation config), STOP and ask the caller.

### 2.5 Commit Task 2

```
git status
git add src/app/demo/demo-min-height.ts src/app/demo/demo-dispatcher.ts src/app/demo/demo.component.ts
git commit -m "feat(demo): dispatch mfe:update-min-height on init/view-change/content-change"
```

---

## Task 3 — Identity panel & preview min-height display

### 3.1 Identity panel: add the min-height row in `demo.component.html`

The identity panel currently has rows in this order: Módulo/Instancia → Tamaño → Dimensiones → Visibilidad → Vista → Header (lines 6–60).

Insert a new row **immediately after** the "Vista" row (after line 53) and **before** the "Header" row (line 55). Use the `edit` tool with:

`oldString` (the closing of the Vista row plus the opening of the Header row, to anchor uniquely):

```html
    <div class="cba-demo__identity-row">
      <span class="cba-text-caption">
        <strong>Vista:</strong> {{ viewLabel() }}
      </span>
    </div>

    <div class="cba-demo__identity-row">
      <span class="cba-text-caption">
        <strong>Header:</strong> {{ headerEventName }} →
```

`newString`:

```html
    <div class="cba-demo__identity-row">
      <span class="cba-text-caption">
        <strong>Vista:</strong> {{ viewLabel() }}
      </span>
    </div>

    <div class="cba-demo__identity-row">
      <span class="cba-text-caption">
        <strong>Min-height declarado:</strong>
        {{ lastDeclaredMinHeightPx() === undefined ? '—' : lastDeclaredMinHeightPx() + ' px' }}
      </span>
    </div>

    <div class="cba-demo__identity-row">
      <span class="cba-text-caption">
        <strong>Header:</strong> {{ headerEventName }} →
```

### 3.2 Identity panel: drag/preview rows (depends on Task 4)

This depends on `shellState.displayDragState` / `shellState.displayPreviewMode` which are added in Task 4. Do this edit **after** completing Task 4's shell-state changes (see Step 4 below). The exact location is **immediately after** the existing `dimensionsText` block (current lines 31–37) and **before** the `visibilityVisible` block (line 39).

Anchor `oldString`:

```html
    @if (shellState.dimensionsText()) {
      <div class="cba-demo__identity-row">
        <span class="cba-text-caption">
          <strong>Dimensiones:</strong> {{ shellState.dimensionsText() }}
        </span>
      </div>
    }

    @if (shellState.visibilityVisible() !== undefined) {
```

`newString`:

```html
    @if (shellState.dimensionsText()) {
      <div class="cba-demo__identity-row">
        <span class="cba-text-caption">
          <strong>Dimensiones:</strong> {{ shellState.dimensionsText() }}
        </span>
      </div>
    }

    @if (shellState.displayDragState()) {
      <div class="cba-demo__identity-row">
        <span class="cba-text-caption">
          <strong>Arrastre:</strong> {{ shellState.displayDragState() }}
        </span>
      </div>
    }

    @if (shellState.displayPreviewMode()) {
      <div class="cba-demo__identity-row">
        <span class="cba-text-caption">
          <strong>Modo preview:</strong> {{ shellState.displayPreviewMode() }}
        </span>
      </div>
    }

    @if (shellState.visibilityVisible() !== undefined) {
```

The dimensions row stays unchanged and continues to represent the Shell-reported container height (NOT the MFE-declared `minHeightPx`). Do not merge or rename it.

### 3.3 Bind `data-collapsed` on the root `<section>` (also part of Task 6)

Current root opening (lines 1–4):

```html
<section
  class="cba-demo"
  [attr.data-size]="size()"
  [style]="instanceColorStyle()">
```

Change to:

```html
<section
  class="cba-demo"
  [attr.data-size]="size()"
  [attr.data-collapsed]="isCollapsed()"
  [style]="instanceColorStyle()">
```

`isCollapsed` is an existing required input (line 94 of the TS). No new state needed.

### 3.4 Preview host — `demo-preview.component.ts`

#### 3.4.1 Imports

Current Angular core import (lines 1–8):

```ts
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
```

Add `ViewChild`:

```ts
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
```

Add the `DemoMinHeightReason` type import after the existing `DemoViewMode` import (line 20):

```ts
import { type DemoMinHeightReason } from '../demo/demo-min-height';
```

#### 3.4.2 `ViewChild` query on `DemoComponent`

Add as a class member. Place immediately after the `profileJson = signal('{}');` line (after line 63):

```ts
  @ViewChild(DemoComponent) private demoComponent?: DemoComponent;
```

Use optional `?` because the child is not available before `ngAfterViewInit` and the redeclare handler guards with `?.`.

#### 3.4.3 New signals for min-height capture and debug override

Add after the `ViewChild` line:

```ts
  readonly previewDeclaredMinHeightPx = signal<number | undefined>(undefined);
  readonly debugMinHeightOverride = signal<number | undefined>(undefined);
```

#### 3.4.4 New drag/preview simulation signals

Add after the two new signals above:

```ts
  readonly simulatedDragState = signal<'drag-start' | 'drag-end' | 'dropped' | undefined>(undefined);
  readonly simulatedPreviewMode = signal<'collapsed' | undefined>(undefined);
```

#### 3.4.5 Extend `moduleStatePayload` computed

Current (lines 72–81):

```ts
  readonly moduleStatePayload = computed(() => ({
    schemaVersion: SCHEMA_VERSION,
    moduleType: 'demo',
    instanceId: this.instanceId(),
    size: this.size(),
    width: this.size() === '100%' ? 1200 : 600,
    height: 400,
    isCollapsed: this.isCollapsed(),
    isFullscreen: this.isFullscreen(),
  }));
```

Change to:

```ts
  readonly moduleStatePayload = computed(() => ({
    schemaVersion: SCHEMA_VERSION,
    moduleType: 'demo',
    instanceId: this.instanceId(),
    size: this.size(),
    width: this.size() === '100%' ? 1200 : 600,
    height: 400,
    isCollapsed: this.isCollapsed(),
    isFullscreen: this.isFullscreen(),
    dragState: this.simulatedDragState(),
    previewMode: this.simulatedPreviewMode(),
  }));
```

#### 3.4.6 Capture `UPDATE_MIN_HEIGHT` in `onMfeEvent`

Current (lines 85–88):

```ts
  private readonly onMfeEvent = (event: Event): void => {
    if (!(event instanceof CustomEvent)) return;
    console.log('[demo-preview] captured', event.type, event.detail);
  };
```

Change to:

```ts
  private readonly onMfeEvent = (event: Event): void => {
    if (!(event instanceof CustomEvent)) return;
    if (event.type === MFE_EVENTS.UPDATE_MIN_HEIGHT) {
      const payload = event.detail as { minHeightPx?: number };
      if (typeof payload?.minHeightPx === 'number') {
        this.previewDeclaredMinHeightPx.set(payload.minHeightPx);
      }
    }
    console.log('[demo-preview] captured', event.type, event.detail);
  };
```

The existing `console.log('[demo-preview] captured', ...)` line is intentional preview-only logging (spec §8.5 allows it). Do NOT remove it.

#### 3.4.7 Add the `redeclareMinHeight` handler

Add after `onMfeEvent`:

```ts
  readonly redeclareMinHeight = (): void => {
    this.demoComponent?.declareMinHeightForPreview('content-change', this.debugMinHeightOverride());
  };
```

Reason `'content-change'` is chosen for the manual re-dispatch (it is a user-initiated re-declaration, not an init or view switch). This matches the spec §5.2 example exactly.

### 3.5 Preview host — `demo-preview.component.html`

Insert the min-height debug controls inside the existing `<fieldset class="demo-preview__controls">`, immediately **before** the closing `</fieldset>` (line 60) and **after** the `demo-preview__simulators` div (lines 55–59).

Anchor `oldString`:

```html
    <div class="demo-preview__simulators">
      <cba-button size="sm" (cbaClick)="emitModuleState()">Enviar shell:module-state</cba-button>
      <cba-button size="sm" variant="secondary" (cbaClick)="emitVisibilityChanged(true)">Visible</cba-button>
      <cba-button size="sm" variant="secondary" (cbaClick)="emitVisibilityChanged(false)">Oculto</cba-button>
    </div>
  </fieldset>
```

`newString`:

```html
    <div class="demo-preview__simulators">
      <cba-button size="sm" (cbaClick)="emitModuleState()">Enviar shell:module-state</cba-button>
      <cba-button size="sm" variant="secondary" (cbaClick)="emitVisibilityChanged(true)">Visible</cba-button>
      <cba-button size="sm" variant="secondary" (cbaClick)="emitVisibilityChanged(false)">Oculto</cba-button>
    </div>

    <label class="demo-preview__field">
      <span class="cba-text-small">Override min-height (debug, px)</span>
      <input
        type="number"
        min="0"
        max="1200"
        [ngModel]="debugMinHeightOverride()"
        (ngModelChange)="debugMinHeightOverride.set(numberOrNull($event))"
        name="debugMinHeightOverride" />
    </label>

    <label class="demo-preview__field">
      <span class="cba-text-small">Arrastre (dragState)</span>
      <select
        [ngModel]="simulatedDragState()"
        (ngModelChange)="simulatedDragState.set(stringOrUndefined($event))"
        name="simulatedDragState">
        <option [ngValue]="undefined">—</option>
        <option value="drag-start">drag-start</option>
        <option value="drag-end">drag-end</option>
        <option value="dropped">dropped</option>
      </select>
    </label>

    <label class="demo-preview__field">
      <span class="cba-text-small">Modo preview (previewMode)</span>
      <select
        [ngModel]="simulatedPreviewMode()"
        (ngModelChange)="simulatedPreviewMode.set(stringOrUndefined($event))"
        name="simulatedPreviewMode">
        <option [ngValue]="undefined">—</option>
        <option value="collapsed">collapsed</option>
      </select>
    </label>

    <div class="demo-preview__simulators">
      <cba-button size="sm" variant="secondary" (cbaClick)="redeclareMinHeight()">Reenviar min-height</cba-button>
    </div>

    <p class="demo-preview__min-height-readout cba-text-caption">
      Min-height declarado actual:
      {{ previewDeclaredMinHeightPx() === undefined ? '—' : previewDeclaredMinHeightPx() + ' px' }}
    </p>
  </fieldset>
```

`numberOrNull` and `stringOrUndefined` are helper methods added in §3.6 below. They are needed because `ngModelChange` emits `string | null` for number inputs and `string` for selects, but the signals expect `number | undefined` and `'drag-start' | ... | undefined`. Do NOT use `[(ngModel)]` directly on these signals — the type mismatch would break the build.

### 3.6 Preview host — add the two coercion helpers

Add as private methods at the end of `DemoPreviewComponent` (after `safeParseProfile`):

```ts
  private numberOrNull(value: string | null): number | undefined {
    if (value === null || value === '') return undefined;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  private stringOrUndefined(value: string): string | undefined {
    return value === '' ? undefined : value;
  }
```

The `simulatedDragState` and `simulatedPreviewMode` signals are typed as unions; assigning a `string | undefined` directly would be a type error. To keep the helper generic and avoid a per-variant helper, cast at the call site is avoided by relying on TypeScript's narrowening of the literal options in the `<select>`. If the compiler still complains, change the two `(ngModelChange)` handlers to inline arrow functions with explicit casts:

```html
(ngModelChange)="simulatedDragState.set($event as 'drag-start' | 'drag-end' | 'dropped' | undefined)"
```

and

```html
(ngModelChange)="simulatedPreviewMode.set($event as 'collapsed' | undefined)"
```

and drop `stringOrUndefined`. **Pick the inline-cast variant if the helper variant fails type-check.** Do not use both.

### 3.7 Preview host — `demo-preview.component.scss`

Append (do not remove existing rules):

```scss
.demo-preview__min-height-readout {
  flex: 1 1 100%;
  margin-top: var(--cba-space-2);
  color: var(--cba-text-secondary);
}
```

No other style changes.

### 3.8 Commit Task 3

```
git status
git add src/app/demo/demo.component.html src/app/demo-preview/demo-preview.component.ts src/app/demo-preview/demo-preview.component.html src/app/demo-preview/demo-preview.component.scss
git commit -m "feat(preview): show declared min-height and force re-dispatch control"
```

(The identity-panel drag/preview rows added in §3.2 will be committed together with Task 4's shell-state changes in Step 4.5, because they depend on those computeds existing.)

---

## Task 4 — `shell:module-state` polish (`dragState` / `previewMode`)

### 4.1 Extend `ShellStateSnapshot`

In `src/app/demo/demo-shell-state.ts`, replace the interface (lines 10–18):

```ts
interface ShellStateSnapshot {
  size?: ModuleSize;
  isCollapsed?: boolean;
  isFullscreen?: boolean;
  widthPx?: number;
  heightPx?: number;
  visibilityVisible?: boolean;
  visibilityReason?: string;
}
```

with:

```ts
type DragState = 'drag-start' | 'drag-end' | 'dropped';
type PreviewMode = 'collapsed';

interface ShellStateSnapshot {
  size?: ModuleSize;
  isCollapsed?: boolean;
  isFullscreen?: boolean;
  widthPx?: number;
  heightPx?: number;
  visibilityVisible?: boolean;
  visibilityReason?: string;
  dragState?: DragState;
  previewMode?: PreviewMode;
}
```

### 4.2 Extend `applyModuleState` parameter type and body

Replace the current `applyModuleState` (lines 65–80):

```ts
  applyModuleState(state: {
    size: ModuleSize;
    width: number;
    height: number;
    isCollapsed: boolean;
    isFullscreen: boolean;
  }): void {
    this.state.update((current) => ({
      ...current,
      size: state.size,
      widthPx: state.width,
      heightPx: state.height,
      isCollapsed: state.isCollapsed,
      isFullscreen: state.isFullscreen,
    }));
  }
```

with:

```ts
  applyModuleState(state: {
    size: ModuleSize;
    width: number;
    height: number;
    isCollapsed: boolean;
    isFullscreen: boolean;
    dragState?: DragState;
    previewMode?: PreviewMode;
  }): void {
    this.state.update((current) => ({
      ...current,
      size: state.size,
      widthPx: state.width,
      heightPx: state.height,
      isCollapsed: state.isCollapsed,
      isFullscreen: state.isFullscreen,
      dragState: state.dragState,
      previewMode: state.previewMode,
    }));
  }
```

### 4.3 Add display computeds

Add immediately after the `visibilityReason` computed (after line 63):

```ts
  readonly displayDragState = computed(() => this.state().dragState);
  readonly displayPreviewMode = computed(() => this.state().previewMode);
```

### 4.4 Apply the identity-panel drag/preview rows edit (Task 3 §3.2)

Now that `displayDragState` and `displayPreviewMode` exist, perform the `demo.component.html` edit described in §3.2.

### 4.5 Commit Task 4

```
git status
git add src/app/demo/demo-shell-state.ts src/app/demo/demo.component.html
git commit -m "feat(demo): surface dragState and previewMode from shell:module-state"
```

---

## Task 5 — Multi-instance & state isolation hardening

This task is primarily a verification task. No new source files are created. The implementer's job is to **confirm** the existing isolation guarantees hold and that no edit in Tasks 2–4 broke them.

### 5.1 Confirm per-instance ownership in `demo.component.ts`

Read the edited `demo.component.ts` and confirm:

1. `eventLog`, `shellState`, `dispatcher`, and `lastDeclaredMinHeightPx` are all instance fields (declared with `readonly` on the class, not module-level singletons). They are — lines 116–126 plus the new signal from §2.3.2.
2. `DemoCreateFormComponent` fields (`nombre`/`fullName` etc. after Task 8) are per-instance signals on that component class (confirmed in `demo-create-form.component.ts` — they are instance `readonly` signals).
3. `matchesThisInstance` (lines 159–160) still checks both `instanceId` and `moduleType`. Do NOT modify it.
4. `DemoDispatcher.withIdentity` still reads `this.options.moduleType()` and `this.options.instanceId()` from the signals passed in `DemoDispatcherOptions`. Do NOT modify it.

If any of these invariants has been broken by an earlier edit, STOP and report to the caller. Do NOT attempt a redesign.

### 5.2 Manual multi-instance verification

The standalone preview (`DemoPreviewComponent`) currently hosts a single `cba-demo`. The TODO §5 expects two-instance verification. Since the preview host in scope only renders one instance (and rewriting the host to render two is out of scope for Task A — it is a test-harness change that would expand scope), the implementer must instead verify isolation **statically** and note the limitation:

Static checks (read the code, do not run a browser):

- The window event listeners (`onModuleState`, `onVisibilityChanged`) filter by `matchesThisInstance` before applying state. Confirmed in `demo.component.ts` lines 162–174.
- Every `mfe:*` dispatch goes through `DemoDispatcher.send` → `withIdentity`, which stamps the current `instanceId()`. Confirmed in `demo-dispatcher.ts`.
- `instanceHue` is `computed(() => hashString(this.instanceId()) % 360)` — deterministic and per-instance. Confirmed.

Record in the completion summary: "Multi-instance isolation verified statically. Two-instance runtime verification is out of scope for the standalone preview host (renders one instance); recommended as a manual Shell-integration check." Do NOT modify `demo-preview.component.*` to render two instances — that is scope expansion.

### 5.3 No commit

Task 5 produces no code changes. Do NOT create an empty commit. The verification result is reported in the final summary.

---

## Task 6 — Collapse / size / fullscreen behaviour polish

### 6.1 Add the collapsed padding rule to `demo.component.scss`

Append at the end of the file (after line 108):

```scss
.cba-demo[data-collapsed='true'] {
  padding-top: var(--cba-space-2);
  padding-bottom: var(--cba-space-2);
}
```

### 6.2 Confirm `data-collapsed` binding exists

Already done in §3.3. Verify the root `<section>` now has `[attr.data-collapsed]="isCollapsed()"`. If missing, apply the §3.3 edit.

### 6.3 Confirm 50% / 100% / fullscreen styles need no change

Read `demo.component.scss`, `demo-create-form.component.scss`, `demo-table.component.scss`, `demo-profile.component.scss` (use `read`). The spec §7.2 and §7.3 confirm no additional rules are required — the existing `flex-wrap` on the action bar, `.table-responsive { overflow-x: auto; }` on the table, and `[data-size='50%'] .demo-create-form__grid { grid-template-columns: 1fr; }` on the form are correct. Do NOT edit these files. If a rule is missing, STOP and ask the caller — adding new layout rules is an architectural decision beyond the 50% restriction.

### 6.4 Commit Task 6

```
git status
git add src/app/demo/demo.component.scss src/app/demo/demo.component.html
git commit -m "style(demo): compact padding when collapsed"
```

(If `demo.component.html` was already committed in §3.8 and unchanged since, stage only `demo.component.scss`.)

---

## Task 7 — UX & copy polish + dead-code removal

### 7.1 Spanish labels review

The labels already in use (verified by reading the templates):

- Identity panel: Módulo, Instancia, Tamaño, Dimensiones, Visibilidad, Arrastre, Modo preview, Vista, Min-height declarado, Header. All Spanish or recognised technical terms. No change.
- Action buttons: "Actualizar título", "Notificación éxito/advertencia/error", "Pantalla completa", "Quitar módulo", "Agregar instancia", "Simular error". No change.
- Form labels: Nombre, Documento / DNI, Email, Teléfono, Observaciones. No change.
- Profile keys: handled by `PROFILE_LABELS` map (already includes `notes: 'Observaciones'`). No change.
- Event log: "Registro de eventos (últimos 25)", "Limpiar log", "Sin eventos registrados.", "→ OUT", "← IN". No change.
- Data viewer accordion: "Payload (data)". No change.
- Preview controls: "Tamaño", "Vista", "Título del header", "Filas tabla", "Profile JSON", "Colapsado", "Pantalla completa", "Enviar shell:module-state", "Visible", "Oculto", plus the new "Override min-height (debug, px)", "Arrastre (dragState)", "Modo preview (previewMode)", "Reenviar min-height", "Min-height declarado actual:". All Spanish or recognised debug terms. No change.

### 7.2 Create-form hint

Already present (`demo-create-form.component.html` line 2–4): "Formulario de prueba — no realiza envíos reales." No change. Do NOT enlarge or restyle it.

### 7.3 Dead code & console noise

- The `console.log('[mfe-demo] dispatch', ...)` line was removed in §2.2.4. Confirm it is gone by reading `demo-dispatcher.ts`.
- The JSDoc bullet about console logging was removed in §2.2.4. Confirm.
- The preview-only `console.log('[demo-preview] captured', ...)` stays (spec §8.5 allows it). Do NOT remove.
- Search for any newly-introduced unused imports in the edited files. Run `vscode-mcp-server_get_diagnostics_code` on each edited file; if a warning flags an unused import, remove that single import line. Do NOT remove imports that are used.

### 7.4 No commented-out code

After all edits, run `grep` for `// ` and `/*` in the edited files to ensure no commented-out code was introduced. Remove any commented-out code (project rule `no-commented-code`). JSDoc comments (`/** ... */`) are allowed and must remain.

### 7.5 Commit Task 7

If any unused imports or commented-out code were removed:

```
git status
git add <explicit paths>
git commit -m "chore(demo): remove dead code and console noise"
```

If nothing was removed (the earlier commits already cleaned up), skip the commit and note "No additional dead code found" in the summary.

---

## Task 8 — Forms / profile alignment with `@cobranza-apps/entities`

### 8.1 Rename the create-form model fields

In `src/app/demo/views/demo-create-form/demo-create-form.component.ts`:

#### 8.1.1 Replace the `DemoCreateFormModel` interface (lines 19–25)

Current:

```ts
interface DemoCreateFormModel {
  readonly nombre: string;
  readonly documento: string;
  readonly email: string;
  readonly telefono: string;
  readonly observaciones: string;
}
```

Replace with:

```ts
interface DemoCreateFormModel {
  readonly fullName: string;
  readonly taxId: string;
  readonly email: string;
  readonly phone: string;
  readonly notes: string;
}
```

#### 8.1.2 Replace `EMPTY_FORM` (lines 28–34)

Current:

```ts
const EMPTY_FORM: DemoCreateFormModel = {
  nombre: '',
  documento: '',
  email: '',
  telefono: '',
  observaciones: '',
};
```

Replace with:

```ts
const EMPTY_FORM: DemoCreateFormModel = {
  fullName: '',
  taxId: '',
  email: '',
  phone: '',
  notes: '',
};
```

#### 8.1.3 Replace the instance signals (lines 62–66)

Current:

```ts
  readonly nombre = signal(EMPTY_FORM.nombre);
  readonly documento = signal(EMPTY_FORM.documento);
  readonly email = signal(EMPTY_FORM.email);
  readonly telefono = signal(EMPTY_FORM.telefono);
  readonly observaciones = signal(EMPTY_FORM.observaciones);
```

Replace with:

```ts
  readonly fullName = signal(EMPTY_FORM.fullName);
  readonly taxId = signal(EMPTY_FORM.taxId);
  readonly email = signal(EMPTY_FORM.email);
  readonly phone = signal(EMPTY_FORM.phone);
  readonly notes = signal(EMPTY_FORM.notes);
```

#### 8.1.4 Replace `resetForm` body (lines 77–83)

Current:

```ts
  private resetForm(): void {
    this.nombre.set(EMPTY_FORM.nombre);
    this.documento.set(EMPTY_FORM.documento);
    this.email.set(EMPTY_FORM.email);
    this.telefono.set(EMPTY_FORM.telefono);
    this.observaciones.set(EMPTY_FORM.observaciones);
  }
```

Replace with:

```ts
  private resetForm(): void {
    this.fullName.set(EMPTY_FORM.fullName);
    this.taxId.set(EMPTY_FORM.taxId);
    this.email.set(EMPTY_FORM.email);
    this.phone.set(EMPTY_FORM.phone);
    this.notes.set(EMPTY_FORM.notes);
  }
```

#### 8.1.5 Update the class JSDoc

The JSDoc on the class (lines 44–56) currently says the fields are `nombre, documento, email, teléfono, observaciones` and "kept as local Spanish strings". Update only the field-name references to reflect the entity-aligned internal names while keeping the Spanish UI label note. Replace the relevant sentences:

Find:

```
 * Renders five Spanish-labelled test fields (nombre, documento, email,
 * teléfono, observaciones) plus a primary "Guardar (simulado)" and a
 * secondary "Reiniciar" button. No real submit, no API, no validation.
 *
 * Field names mirror `@cobranza-apps/entities` `Client` (fullName, taxId,
 * email, phone, notes) but are kept as local Spanish strings for clarity.
```

Replace with:

```
 * Renders five Spanish-labelled test fields (Nombre, Documento / DNI, Email,
 * Teléfono, Observaciones) backed by entity-aligned internal model fields
 * (`fullName`, `taxId`, `email`, `phone`, `notes`) that mirror
 * `@cobranza-apps/entities` `Client`. UI labels remain Spanish; internal
 * values are plain `string`. No real submit, no API, no validation.
```

Also update the `DemoCreateFormModel` JSDoc (lines 11–18). Find:

```
 * Spanish-labelled test fields that mirror `@cobranza-apps/entities` `Client`
 * (fullName → nombre, taxId → documento, email, phone → teléfono,
 * notes → observaciones). Kept as local Spanish strings for clarity in the
 * demo UI; no real validation or API submission occurs.
```

Replace with:

```
 * Entity-aligned form model mirroring `@cobranza-apps/entities` `Client`
 * field names (`fullName`, `taxId`, `email`, `phone`, `notes`). UI labels
 * stay Spanish (Nombre, Documento / DNI, Email, Teléfono, Observaciones);
 * values are plain `string`. No real validation or API submission occurs.
```

### 8.2 Update the create-form template bindings

In `src/app/demo/views/demo-create-form/demo-create-form.component.html`:

- Line 11: `[ngModel]="nombre()"` → `[ngModel]="fullName()"`; `(ngModelChange)="nombre.set($event)"` → `(ngModelChange)="fullName.set($event)"`
- Line 17: `[ngModel]="documento()"` → `[ngModel]="taxId()"`; `(ngModelChange)="documento.set($event)"` → `(ngModelChange)="taxId.set($event)"`
- Line 24: email binding is unchanged.
- Line 30: `[ngModel]="telefono()"` → `[ngModel]="phone()"`; `(ngModelChange)="telefono.set($event)"` → `(ngModelChange)="phone.set($event)"`
- Line 37: `[ngModel]="observaciones()"` → `[ngModel]="notes()"`; `(ngModelChange)="observaciones.set($event)"` → `(ngModelChange)="notes.set($event)"`

The visible `label="..."` attributes (Nombre, Documento / DNI, Email, Teléfono, Observaciones) MUST stay Spanish. Do NOT change them.

### 8.3 Profile alignment

`DemoProfileComponent` already supports both Spanish keys and entity-aligned keys via `PROFILE_LABELS`, and `notes: 'Observaciones'` is present (line 58). No change required. Do NOT edit `demo-profile.component.ts` or `.html`.

### 8.4 No schema-driven UI

Do NOT import `client.schema.json`, `CreateClientDto`, or any encrypted-value type. Do NOT add `@cobranza-apps/entities` imports to the create-form component. The alignment is by-name-only via the local `DemoCreateFormModel` interface.

### 8.5 Commit Task 8

```
git status
git add src/app/demo/views/demo-create-form/demo-create-form.component.ts src/app/demo/views/demo-create-form/demo-create-form.component.html
git commit -m "refactor(create-form): align model field names with Client entity"
```

---

## Task 9 — Standalone preview finalisation

### 9.1 Confirm the preview exercises all required paths

Read the edited `demo-preview.component.ts` and `.html` and confirm:

- Three views are selectable via the "Vista" `<select>` (table / create-form / profile). Already present (lines 17–23 of the html). No change.
- Size toggle (50% / 100%). Already present. No change.
- Collapse / fullscreen checkboxes. Already present. No change.
- Simulated `shell:module-state` now includes `dragState` and `previewMode` from the new selects (§3.4.5, §3.5). Confirmed by this plan.
- Min-height declaration visibility: `previewDeclaredMinHeightPx` readout (§3.5). Confirmed.
- Forced re-dispatch: "Reenviar min-height" button calling `redeclareMinHeight()` (§3.4.7, §3.5). Confirmed.

### 9.2 No README / docs edits

Task 9's "Document the preview entry command and default ports" is documentation work that belongs to Task B. Do NOT edit `README.md` or any docs file in Task A. Note in the completion summary: "Preview entry command (`npm run serve`) and default port (4201) documentation deferred to Task B."

### 9.3 No commit

Task 9 produces no new code changes beyond what was committed in Tasks 3–4. Do NOT create an empty commit.

---

## Final build & diagnostics

### 10.1 Run diagnostics on every edited file

Call `vscode-mcp-server_get_diagnostics_code` for each of:

- `src/app/demo/demo-min-height.ts`
- `src/app/demo/demo-dispatcher.ts`
- `src/app/demo/demo-shell-state.ts`
- `src/app/demo/demo.component.ts`
- `src/app/demo/demo.component.html` (diagnostics may be limited for templates; rely on the TS file)
- `src/app/demo-preview/demo-preview.component.ts`
- `src/app/demo/views/demo-create-form/demo-create-form.component.ts`

Fix any error that is a direct consequence of these edits. If an error is unrelated to this task, STOP and ask the caller.

### 10.2 Run the full build

```
npm run build
```

Expected: clean build, no TypeScript errors, no lint errors. If the build fails:

- For a type error in a file edited by this plan: fix it directly.
- For a type error in a file NOT edited by this plan: STOP and report to the caller.
- For a federation/bundling error unrelated to the code changes: STOP and report.

### 10.3 Final commit (only if 10.1/10.2 required fixes)

If fixes were made:

```
git status
git add <explicit paths>
git commit -m "fix(demo): resolve type errors from phase 2 edits"
```

If no fixes were needed, skip.

### 10.4 Final git status

```
git status
git log --oneline -10
```

Confirm the working tree is clean (no unstaged changes) and the feature branch contains the commits from Tasks 1, 2, 3, 4, 6, 8 (and 7/10.3 if applicable).

---

## Acceptance criteria mapping (for the implementer's self-check)

After all steps, confirm each criterion (from spec §11). The implementer must record pass/fail in the completion summary:

1. `npm run build` is clean — verified in §10.2.
2. `MFE_EVENTS.UPDATE_MIN_HEIGHT` dispatches on init with `reason: 'init'` and identity fields — verified by code in §2.3.6 + §2.2.3.
3. Changing `config.view` re-dispatches with `reason: 'view-change'` and correct per-view `minHeightPx` — verified by the effect in §2.3.5.
4. Identity panel shows "Min-height declarado: N px" — verified by §3.1.
5. Identity panel shows `dragState` and `previewMode` when present — verified by §3.2 + §4.3.
6. Preview host shows current declared min-height and can force re-dispatch with optional override — verified by §3.4–§3.7.
7. Two instances do not share state — verified statically in §5 (runtime two-instance test out of scope for the single-instance preview host).
8. Collapse / 50% / 100% / fullscreen layouts do not break — verified by §6 (CSS rule added; existing styles confirmed).
9. Spanish labels consistent; no dead code / temporary `console.log` in production paths — verified by §7.
10. Form and profile use plain `string`; UI not driven by `client.schema.json` — verified by §8.

---

## Completion summary format

The implementer's final response MUST include:

- Plan file path: `.kilo/plans/20260825-phase2-taskA.md`
- Commits made (hash + message) — paste `git log --oneline -10` output.
- Per-task status: Task 1 ✅, Task 2 ✅, … Task 9 ✅ (or ⚠️ with explanation).
- Acceptance criteria self-check results (10 items).
- Anything NOT done (e.g., two-instance runtime test, docs deferred to Task B).
- Any deviations from this plan (must be zero unless a step explicitly allowed one, e.g. the `allowSignalWrites` fallback in §2.3.5 or the inline-cast fallback in §3.6).

---

*End of plan.*
