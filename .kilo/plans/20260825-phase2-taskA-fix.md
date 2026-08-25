# Fix Plan — Task A 4.3 Code Review

**Source TODO:** `.agent/todos/20260825/20260825-todo-0.md` (items 1–9)  
**Implementation plan:** `.kilo/plans/20260825-phase2-taskA.md`  
**Front-end spec:** `.kilo/plans/20260825-phase2-taskA-frontend-spec.md`  
**Branch:** `feat/phase2-min-height-polish`  
**Date:** 2026-08-25

## Findings summary

Functionality is correct: min-height dispatches on init/view-change/content-change, identity panel and preview host show the declared value, `dragState`/`previewMode` are surfaced, multi-instance state remains isolated, and `npm run build` is clean.

The following issues require fixes:

| # | Issue | File(s) | Severity |
|---|-------|---------|----------|
| 1 | Unused type import `DemoMinHeightReason` | `src/app/demo-preview/demo-preview.component.ts` | Must fix |
| 2 | `numberOrNull` is public; plan specified private. JSDoc claim that templates cannot access private members is incorrect in Angular Ivy. | `src/app/demo-preview/demo-preview.component.ts` | Must fix |
| 3 | `dragStateFromEvent` / `previewModeFromEvent` were invented instead of the plan-specified `stringOrUndefined` helper or inline-cast fallback. They are also unnecessarily public. | `src/app/demo-preview/demo-preview.component.ts`, `.html` | Must fix |
| 4 | `demo.component.ts` is 240 lines, violating the 200-line max per source file rule. | `src/app/demo/demo.component.ts`, new `src/app/demo/demo-shell-listeners.ts` | Must fix |
| 5 | Missing trailing newline at EOF. | `src/app/demo/demo-min-height.ts`, `src/app/demo/demo.component.scss`, `src/app/demo-preview/demo-preview.component.scss` | Must fix |

## Fix 1 — Remove unused import

**File:** `src/app/demo-preview/demo-preview.component.ts`

Remove:

```ts
import { type DemoMinHeightReason } from '../demo/demo-min-height';
```

`DemoMinHeightReason` is not referenced in this file.

## Fix 2 — Make `numberOrNull` private and remove incorrect JSDoc

**File:** `src/app/demo-preview/demo-preview.component.ts`

Replace:

```ts
  /** Public so the template can call it from `(ngModelChange)` (templates cannot access private members). */
  numberOrNull(value: string | null): number | undefined {
    if (value === null || value === '') return undefined;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
```

with:

```ts
  private numberOrNull(value: string | null): number | undefined {
    if (value === null || value === '') return undefined;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
```

Angular templates can access private members; no public API surface is required.

## Fix 3 — Replace custom drag/preview helpers with inline casts

**File:** `src/app/demo-preview/demo-preview.component.ts`

Remove:

```ts
  readonly dragStateFromEvent = (value: string): 'drag-start' | 'drag-end' | 'dropped' | undefined =>
    value === 'drag-start' || value === 'drag-end' || value === 'dropped' ? value : undefined;

  readonly previewModeFromEvent = (value: string): 'collapsed' | undefined =>
    value === 'collapsed' ? value : undefined;
```

**File:** `src/app/demo-preview/demo-preview.component.html`

Replace:

```html
        (ngModelChange)="simulatedDragState.set(dragStateFromEvent($event))"
```

with:

```html
        (ngModelChange)="simulatedDragState.set($event as 'drag-start' | 'drag-end' | 'dropped' | undefined)"
```

Replace:

```html
        (ngModelChange)="simulatedPreviewMode.set(previewModeFromEvent($event))"
```

with:

```html
        (ngModelChange)="simulatedPreviewMode.set($event as 'collapsed' | undefined)"
```

This aligns with the implementation plan §3.6 fallback (inline-cast variant).

## Fix 4 — Reduce `demo.component.ts` to under 200 lines

Extract shell listener logic to a new helper and trim the class JSDoc.

### 4.1 Create `src/app/demo/demo-shell-listeners.ts`

```ts
import { type Signal } from '@angular/core';
import { isShellEvent, SHELL_EVENTS } from '@cobranza-apps/mfe-events';

import { type DemoEventLog } from './demo-event-log';
import { type DemoShellState } from './demo-shell-state';

interface DemoShellListenersOptions {
  readonly eventLog: DemoEventLog;
  readonly shellState: DemoShellState;
  readonly moduleType: Signal<string>;
  readonly instanceId: Signal<string>;
}

export class DemoShellListeners {
  constructor(private readonly options: DemoShellListenersOptions) {}

  attach(): void {
    window.addEventListener(SHELL_EVENTS.MODULE_STATE, this.onModuleState);
    window.addEventListener(SHELL_EVENTS.VISIBILITY_CHANGED, this.onVisibilityChanged);
    window.addEventListener(SHELL_EVENTS.THEME_CHANGED, this.onThemeChanged);
  }

  detach(): void {
    window.removeEventListener(SHELL_EVENTS.MODULE_STATE, this.onModuleState);
    window.removeEventListener(SHELL_EVENTS.VISIBILITY_CHANGED, this.onVisibilityChanged);
    window.removeEventListener(SHELL_EVENTS.THEME_CHANGED, this.onThemeChanged);
  }

  private readonly matchesThisInstance = (detail: { instanceId: string; moduleType: string }): boolean =>
    detail.instanceId === this.options.instanceId() && detail.moduleType === this.options.moduleType();

  private readonly onModuleState = (event: Event): void => {
    if (!isShellEvent(event, SHELL_EVENTS.MODULE_STATE)) return;
    if (!this.matchesThisInstance(event.detail)) return;
    this.options.eventLog.add({ direction: 'in', eventType: SHELL_EVENTS.MODULE_STATE, payload: event.detail });
    this.options.shellState.applyModuleState(event.detail);
  };

  private readonly onVisibilityChanged = (event: Event): void => {
    if (!isShellEvent(event, SHELL_EVENTS.VISIBILITY_CHANGED)) return;
    if (!this.matchesThisInstance(event.detail)) return;
    this.options.eventLog.add({ direction: 'in', eventType: SHELL_EVENTS.VISIBILITY_CHANGED, payload: event.detail });
    this.options.shellState.applyVisibility(event.detail);
  };

  private readonly onThemeChanged = (event: Event): void => {
    if (!isShellEvent(event, SHELL_EVENTS.THEME_CHANGED)) return;
    this.options.eventLog.add({ direction: 'in', eventType: SHELL_EVENTS.THEME_CHANGED, payload: event.detail });
  };
}
```

### 4.2 Update `src/app/demo/demo.component.ts`

1. In the `@cobranza-apps/mfe-events` import, remove `isShellEvent` and `SHELL_EVENTS` (keep `MFE_EVENTS` and `type ModuleSize`).
2. Add:

```ts
import { DemoShellListeners } from './demo-shell-listeners';
```

3. Add the helper field after the `dispatcher` field:

```ts
  readonly shellListeners = new DemoShellListeners({
    eventLog: this.eventLog,
    shellState: this.shellState,
    moduleType: this.moduleType,
    instanceId: this.instanceId,
  });
```

4. Remove these private members from the class:

```ts
  private readonly matchesThisInstance = (detail: { instanceId: string; moduleType: string }): boolean =>
    detail.instanceId === this.instanceId() && detail.moduleType === this.moduleType();

  private readonly onModuleState = (event: Event): void => {
    if (!isShellEvent(event, SHELL_EVENTS.MODULE_STATE)) return;
    if (!this.matchesThisInstance(event.detail)) return;
    this.eventLog.add({ direction: 'in', eventType: SHELL_EVENTS.MODULE_STATE, payload: event.detail });
    this.shellState.applyModuleState(event.detail);
  };

  private readonly onVisibilityChanged = (event: Event): void => {
    if (!isShellEvent(event, SHELL_EVENTS.VISIBILITY_CHANGED)) return;
    if (!this.matchesThisInstance(event.detail)) return;
    this.eventLog.add({ direction: 'in', eventType: SHELL_EVENTS.VISIBILITY_CHANGED, payload: event.detail });
    this.shellState.applyVisibility(event.detail);
  };

  private readonly onThemeChanged = (event: Event): void => {
    if (!isShellEvent(event, SHELL_EVENTS.THEME_CHANGED)) return;
    this.eventLog.add({ direction: 'in', eventType: SHELL_EVENTS.THEME_CHANGED, payload: event.detail });
  };
```

5. Replace `ngOnInit`:

```ts
  ngOnInit(): void {
    this.dispatcher.ready();
    this.shellListeners.attach();
    this.declareMinHeight('init');
  }
```

6. Replace `ngOnDestroy`:

```ts
  ngOnDestroy(): void {
    this.shellListeners.detach();
  }
```

7. Remove `attachShellListeners()` method.

8. Trim the class JSDoc by removing the "Create-form handlers" and "Owns only the body area" sections. Replace the current JSDoc (lines 62–96) with:

```ts
/**
 * Main exposed component of `mfe-demo`.
 *
 * The Shell hosts this component via Native Federation and injects the
 * standard MFE inputs. It renders one of three internal views driven by
 * `config.view`, dispatches MFE events, listens for Shell events filtered by
 * `instanceId` and `moduleType`, and exposes an action bar, event log, and
 * data payload viewer.
 *
 * Selector: `cba-demo`
 */
```

This should bring `demo.component.ts` below the 200-line limit while preserving the public contract and instance isolation.

## Fix 5 — Add trailing newlines

Ensure the following files end with a single newline character:

- `src/app/demo/demo-min-height.ts`
- `src/app/demo/demo.component.scss`
- `src/app/demo-preview/demo-preview.component.scss`

## Verification

After applying all fixes:

1. Run `vscode-mcp-server_get_diagnostics_code` on every edited file.
2. Run `npm run build` and confirm it is clean.
3. Confirm `git diff --stat` shows no unexpected file changes.
4. Confirm `demo.component.ts` has 200 lines or fewer.

## Out of scope / deferred

- README / docs updates (Task B).
- Two-instance runtime verification in the standalone preview host (already verified statically; the host renders one instance by design).
