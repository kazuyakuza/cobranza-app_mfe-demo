# Task A 4.3 — Code Simplification Plan

## Findings

After reviewing the implementation diff (`d2ce6d6..c94b39f`), the code is generally clean, but a few simplifications are possible:

1. **Unnecessary indirection** in `DemoComponent`: `declareMinHeight` is private and `declareMinHeightForPreview` is a thin public wrapper that only forwards the call. This can be collapsed into a single public method.
2. **Multi-section boolean condition** in `DemoPreviewComponent.safeParseProfile`: the guard `typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)` violates the single-section boolean conditions rule.
3. **File length** in `src/app/demo/demo.component.ts`: the file is 216 lines, exceeding the 200-line limit. The bulk comes from the long `actionButtons` array and its `ActionButtonConfig` interface, which can move to a dedicated factory file.
4. **Missing trailing newlines** in `demo-min-height.ts` and `demo.component.scss`.

## Simplification Steps

### 1. Collapse `declareMinHeight` / `declareMinHeightForPreview` wrapper

**File:** `src/app/demo/demo.component.ts`

- Remove the `private` modifier from `declareMinHeight` so it becomes public.
- Delete the `declareMinHeightForPreview` method and its JSDoc comment entirely.

Before:

```ts
  private declareMinHeight(reason: DemoMinHeightReason, overridePx?: number): void {
    const view = this.view();
    const minHeightPx = overridePx !== undefined ? overridePx : computeMinHeightPx(view);
    this.lastDeclaredMinHeightPx.set(minHeightPx);
    this.dispatcher.updateMinHeight(minHeightPx, reason);
  }

  /** Exposed only for the standalone preview host; not part of the public Shell contract. */
  declareMinHeightForPreview(reason: DemoMinHeightReason, overridePx?: number): void {
    this.declareMinHeight(reason, overridePx);
  }
```

After:

```ts
  /**
   * Computes and dispatches the preferred min-height for the current view.
   * Called internally on init / view change / content change, and exposed
   * for the standalone preview host via `declareMinHeightForPreview`.
   */
  declareMinHeight(reason: DemoMinHeightReason, overridePx?: number): void {
    const view = this.view();
    const minHeightPx = overridePx !== undefined ? overridePx : computeMinHeightPx(view);
    this.lastDeclaredMinHeightPx.set(minHeightPx);
    this.dispatcher.updateMinHeight(minHeightPx, reason);
  }
```

### 2. Update preview host to call the renamed method

**File:** `src/app/demo-preview/demo-preview.component.ts`

- Replace `declareMinHeightForPreview` with `declareMinHeight`.

Before:

```ts
  readonly redeclareMinHeight = (): void => {
    this.demoComponent?.declareMinHeightForPreview('content-change', this.debugMinHeightOverride());
  };
```

After:

```ts
  readonly redeclareMinHeight = (): void => {
    this.demoComponent?.declareMinHeight('content-change', this.debugMinHeightOverride());
  };
```

### 3. Extract action buttons config to a factory file

**New file:** `src/app/demo/demo-action-buttons.ts`

Create the file with the moved interface and a factory function that receives a `DemoDispatcher` instance.

```ts
import { DemoDispatcher } from './demo-dispatcher';

export interface ActionButtonConfig {
  readonly label: string;
  readonly variant: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  readonly action: () => void;
}

export function createDemoActionButtons(dispatcher: DemoDispatcher): readonly ActionButtonConfig[] {
  return [
    { label: 'Actualizar título', variant: 'primary', action: () => dispatcher.cycleHeaderDemo() },
    { label: 'Notificación éxito', variant: 'success', action: () => dispatcher.showNotification('success', 'Notificación de éxito') },
    { label: 'Notificación advertencia', variant: 'secondary', action: () => dispatcher.showNotification('warning', 'Notificación de advertencia') },
    { label: 'Notificación error', variant: 'danger', action: () => dispatcher.showNotification('error', 'Notificación de error') },
    { label: 'Pantalla completa', variant: 'secondary', action: () => dispatcher.requestFullscreen() },
    { label: 'Quitar módulo', variant: 'danger', action: () => dispatcher.requestRemove() },
    { label: 'Agregar instancia', variant: 'secondary', action: () => dispatcher.requestAddModule() },
    { label: 'Simular error', variant: 'danger', action: () => dispatcher.moduleError() },
  ];
}
```

**File:** `src/app/demo/demo.component.ts`

- Delete the local `ActionButtonConfig` interface.
- Delete the inline `actionButtons` array.
- Import `ActionButtonConfig` and `createDemoActionButtons` from `./demo-action-buttons`.
- Add `readonly actionButtons: readonly ActionButtonConfig[] = createDemoActionButtons(this.dispatcher);` after the `dispatcher` declaration.

Before:

```ts
interface ActionButtonConfig {
  readonly label: string;
  readonly variant: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  readonly action: () => void;
}
```

After:

```ts
import { ActionButtonConfig, createDemoActionButtons } from './demo-action-buttons';
```

Before:

```ts
  readonly actionButtons: readonly ActionButtonConfig[] = [
    { label: 'Actualizar título', variant: 'primary', action: () => this.dispatcher.cycleHeaderDemo() },
    { label: 'Notificación éxito', variant: 'success', action: () => this.dispatcher.showNotification('success', 'Notificación de éxito') },
    { label: 'Notificación advertencia', variant: 'secondary', action: () => this.dispatcher.showNotification('warning', 'Notificación de advertencia') },
    { label: 'Notificación error', variant: 'danger', action: () => this.dispatcher.showNotification('error', 'Notificación de error') },
    { label: 'Pantalla completa', variant: 'secondary', action: () => this.dispatcher.requestFullscreen() },
    { label: 'Quitar módulo', variant: 'danger', action: () => this.dispatcher.requestRemove() },
    { label: 'Agregar instancia', variant: 'secondary', action: () => this.dispatcher.requestAddModule() },
    { label: 'Simular error', variant: 'danger', action: () => this.dispatcher.moduleError() },
  ];
```

After:

```ts
  readonly actionButtons: readonly ActionButtonConfig[] = createDemoActionButtons(this.dispatcher);
```

This reduces `demo.component.ts` below the 200-line limit.

### 4. Extract `isPlainObject` helper for single-section boolean condition

**File:** `src/app/demo-preview/demo-preview.component.ts`

- Add a private type-guard method.
- Use it inside `safeParseProfile`.

Before:

```ts
  private safeParseProfile(value: string): Record<string, unknown> | undefined {
    try {
      const parsed = JSON.parse(value);
      return typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)
        ? (parsed as Record<string, unknown>)
        : undefined;
    } catch {
      return undefined;
    }
  }
```

After:

```ts
  private safeParseProfile(value: string): Record<string, unknown> | undefined {
    try {
      const parsed = JSON.parse(value);
      return this.isPlainObject(parsed) ? parsed : undefined;
    } catch {
      return undefined;
    }
  }

  private isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }
```

### 5. Add missing trailing newlines

**Files:**

- `src/app/demo/demo-min-height.ts`
- `src/app/demo/demo.component.scss`

Ensure each file ends with a single newline character.

## Verification

After applying the changes:

1. Run `ng build` to confirm there are no TypeScript errors.
2. Run unit tests if available.
3. Verify `demo.component.ts` is under 200 lines.
4. Verify the preview host can still redeclare min-height via the "Reenviar min-height" control.
5. Verify action buttons still dispatch the expected events.
