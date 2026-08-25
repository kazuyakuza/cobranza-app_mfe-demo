# Simplification Plan — Task C: Actions, Event Log, Data Viewer, Shell Listeners & Preview (Phase 1, Tasks 5–9)

**Source TODO:** `.agent/todos/20260803/20260803-todo-2.md` — Tasks 5–9.  
**Implementation plan reviewed:** `.kilo/plans/20260824-mfe-demo-phase1-taskC.md`.  
**Scope:** Simplify code introduced in commit `2b03a1e` on branch `feat/mfe-demo-phase1`.  
**Goal:** Remove duplication in `DemoDispatcher`, make the action-bar template concise, collapse noisy state in `DemoShellState`, and tighten a few small redundancies in `DemoComponent` and `DemoPreviewComponent`.

---

## Findings summary

1. `DemoDispatcher` repeats `schemaVersion`, `moduleType`, `instanceId` in six of eight payload objects.
2. `DemoShellState` declares seven separate writable signals; a single state snapshot signal is easier to read and update atomically.
3. `DemoComponent.sizeLabelText` is a pass-through computed that delegates to `shellState.sizeLabelText()`; the template can call the helper directly.
4. `demo.component.html` action bar contains eight nearly identical `<cba-button>` lines.
5. `DemoComponent.createInstanceFilter` nests three guard sections after `isShellEvent`; the filter can be expressed in one helper.
6. `DemoPreviewComponent.onMfeEvent` casts `event as CustomEvent<unknown>` instead of using a type guard.
7. `demo-log-entry.ts` only exists to support `DemoEventLog`; merging the two files reduces helper-file count without harming cohesion.

---

## Simplification steps

Execute in order. Each step is atomic; do not combine steps.

### Step 1 — Merge `demo-log-entry.ts` into `demo-event-log.ts`

**Files:**

- Delete: `src/app/demo/demo-log-entry.ts`
- Edit: `src/app/demo/demo-event-log.ts`
- Edit: `src/app/demo/demo-dispatcher.ts`
- Edit: `src/app/demo/demo.component.ts`

**Action 1a.** Rewrite `src/app/demo/demo-event-log.ts` to contain the type, constant, summary helper, and the class:

```ts
import { signal } from '@angular/core';

export interface DemoLogEntry {
  readonly direction: 'in' | 'out';
  readonly timestamp: Date;
  readonly eventType: string;
  readonly payloadSummary: string;
  readonly rawPayload: unknown;
}

export const MAX_LOG_ENTRIES = 25;

const PAYLOAD_SUMMARY_MAX_LENGTH = 120;

export function summarizePayload(payload: unknown): string {
  try {
    const text = JSON.stringify(payload);
    return text.length > PAYLOAD_SUMMARY_MAX_LENGTH
      ? `${text.slice(0, PAYLOAD_SUMMARY_MAX_LENGTH)}…`
      : text;
  } catch {
    return '(payload no serializable)';
  }
}

export class DemoEventLog {
  readonly entries = signal<DemoLogEntry[]>([]);

  add(direction: 'in' | 'out', eventType: string, payload: unknown): void {
    const entry: DemoLogEntry = {
      direction,
      eventType,
      payloadSummary: summarizePayload(payload),
      rawPayload: payload,
      timestamp: new Date(),
    };
    this.entries.update((items) => [entry, ...items].slice(0, MAX_LOG_ENTRIES));
  }

  clear(): void {
    this.entries.set([]);
  }
}
```

**Action 1b.** In `src/app/demo/demo-dispatcher.ts`, replace the import:

```ts
import { DemoEventLog } from './demo-event-log';
```

(The old `./demo-log-entry` import no longer exists.)

**Action 1c.** In `src/app/demo/demo.component.ts`, replace:

```ts
import { MAX_LOG_ENTRIES } from './demo-log-entry';
```

with:

```ts
import { MAX_LOG_ENTRIES } from './demo-event-log';
```

**Why:** The log entry shape and summary function are only used by `DemoEventLog`. One file is simpler than two.

---

### Step 2 — Consolidate `DemoDispatcher` payloads with a base helper

**File:** `src/app/demo/demo-dispatcher.ts`

Add a private helper after the constructor that injects `schemaVersion`, `moduleType`, and `instanceId` into any extra payload fields:

```ts
  private withIdentity<T extends object>(
    extra: T,
  ): T & { schemaVersion: number; moduleType: string; instanceId: string } {
    return {
      ...extra,
      schemaVersion: SCHEMA_VERSION,
      moduleType: this.moduleType(),
      instanceId: this.instanceId(),
    } as T & { schemaVersion: number; moduleType: string; instanceId: string };
  }
```

Then replace every identity-bearing dispatch method with a one-liner:

```ts
  ready(): void {
    this.send(MFE_EVENTS.MODULE_READY, this.withIdentity({}));
  }

  updateHeader(title: string, status: ModuleStatus): void {
    this.send(MFE_EVENTS.UPDATE_HEADER, this.withIdentity({ title, status }));
  }

  requestFullscreen(): void {
    this.send(MFE_EVENTS.REQUEST_FULLSCREEN, this.withIdentity({}));
  }

  requestRemove(): void {
    this.send(MFE_EVENTS.REQUEST_REMOVE, this.withIdentity({}));
  }

  moduleError(): void {
    this.send(MFE_EVENTS.MODULE_ERROR, this.withIdentity({
      message: 'Error simulado desde mfe-demo',
      code: 'DEMO_ERROR',
    }));
  }
```

Keep `showNotification` and `requestAddModule` unchanged (they intentionally omit identity fields per the library contract).

**Why:** Removes ~30 lines of duplicated payload scaffolding while preserving the exact runtime payloads.

---

### Step 3 — Collapse `DemoShellState` into a single state signal

**File:** `src/app/demo/demo-shell-state.ts`

Replace the seven writable signals with one state snapshot signal and derive display values from it.

```ts
import { computed, type Signal, signal } from '@angular/core';
import { type ModuleSize } from '@cobranza-apps/mfe-events';

interface ShellStateSnapshot {
  size?: ModuleSize;
  isCollapsed?: boolean;
  isFullscreen?: boolean;
  widthPx?: number;
  heightPx?: number;
  visibilityVisible?: boolean;
  visibilityReason?: string;
}

export class DemoShellState {
  private readonly state = signal<ShellStateSnapshot>({});

  constructor(
    private readonly inputSize: Signal<ModuleSize>,
    private readonly inputIsCollapsed: Signal<boolean>,
    private readonly inputIsFullscreen: Signal<boolean>,
  ) {}

  readonly displaySize = computed(() => this.state().size ?? this.inputSize());
  readonly displayIsCollapsed = computed(() => this.state().isCollapsed ?? this.inputIsCollapsed());
  readonly displayIsFullscreen = computed(() => this.state().isFullscreen ?? this.inputIsFullscreen());

  readonly sizeLabelText = computed(() =>
    this.displaySize() === '100%' ? 'Ancho completo (100 %)' : 'Mitad de ancho (50 %)',
  );

  readonly dimensionsText = computed(() => {
    const { widthPx, heightPx } = this.state();
    return widthPx !== undefined && heightPx !== undefined ? `${widthPx} × ${heightPx} px` : undefined;
  });

  readonly visibilityVisible = computed(() => this.state().visibilityVisible);
  readonly visibilityReason = computed(() => this.state().visibilityReason);

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

  applyVisibility(payload: { visible: boolean; reason?: string }): void {
    this.state.update((current) => ({
      ...current,
      visibilityVisible: payload.visible,
      visibilityReason: payload.reason ?? 'unknown',
    }));
  }
}
```

**Why:** One signal is easier to reason about than seven, and `applyModuleState`/`applyVisibility` update all related fields atomically.

---

### Step 4 — Remove `DemoComponent.sizeLabelText` pass-through

**File:** `src/app/demo/demo.component.ts`

Remove:

```ts
  readonly sizeLabelText = computed(() => this.shellState.sizeLabelText());
```

**File:** `src/app/demo/demo.component.html`

Replace:

```html
        <strong>Tamaño:</strong> {{ sizeLabelText() }}
```

with:

```html
        <strong>Tamaño:</strong> {{ shellState.sizeLabelText() }}
```

**Why:** The computed added an unnecessary layer of indirection.

---

### Step 5 — Render the action bar with `@for`

**File:** `src/app/demo/demo.component.ts`

Add the action-button config interface and a readonly array after the helper instances. Insert it right after `readonly dispatcher = ...`:

```ts
interface ActionButtonConfig {
  readonly label: string;
  readonly variant: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  readonly action: () => void;
}

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

**File:** `src/app/demo/demo.component.html`

Replace the entire `<section class="cba-demo__actions">` block with:

```html
  <section class="cba-demo__actions" aria-label="Acciones de demostración">
    @for (button of actionButtons; track button.label) {
      <cba-button size="sm" [variant]="button.variant" (cbaClick)="button.action()">
        {{ button.label }}
      </cba-button>
    }
  </section>
```

**Why:** Removes eight repetitive markup lines and makes the button list data-driven.

---

### Step 6 — Simplify the shell-event instance filter

**File:** `src/app/demo/demo.component.ts`

Replace the `createInstanceFilter` generic closure with a typed helper and two bound handlers. The whole block:

```ts
  private readonly createInstanceFilter = <K extends keyof ShellEventMap>(
    eventName: K,
  ) => (event: Event): void => {
    if (!isShellEvent(event, eventName)) return;
    const detail = event.detail;
    if (!('instanceId' in detail)) return;
    if (detail.instanceId !== this.instanceId()) return;
    if (detail.moduleType !== this.moduleType()) return;
    this.eventLog.add('in', eventName, detail);
    this.handleShellEvent(eventName, detail);
  };

  private readonly onModuleState = this.createInstanceFilter(SHELL_EVENTS.MODULE_STATE);
  private readonly onVisibilityChanged = this.createInstanceFilter(SHELL_EVENTS.VISIBILITY_CHANGED);
```

becomes:

```ts
  private readonly matchesThisInstance = (detail: { instanceId: string; moduleType: string }): boolean =>
    detail.instanceId === this.instanceId() && detail.moduleType === this.moduleType();

  private readonly onModuleState = (event: Event): void => {
    if (!isShellEvent(event, SHELL_EVENTS.MODULE_STATE)) return;
    if (!this.matchesThisInstance(event.detail)) return;
    this.eventLog.add('in', SHELL_EVENTS.MODULE_STATE, event.detail);
    this.shellState.applyModuleState(event.detail);
  };

  private readonly onVisibilityChanged = (event: Event): void => {
    if (!isShellEvent(event, SHELL_EVENTS.VISIBILITY_CHANGED)) return;
    if (!this.matchesThisInstance(event.detail)) return;
    this.eventLog.add('in', SHELL_EVENTS.VISIBILITY_CHANGED, event.detail);
    this.shellState.applyVisibility(event.detail);
  };
```

Then remove the `handleShellEvent` method entirely, as well as the unused `ShellEventMap` import.

**Why:** `handleShellEvent` only existed to route the two instance-scoped events; inlining the `apply*` calls removes the need for generic narrowing and `as` casts. The filter condition is now a single named boolean expression.

---

### Step 7 — Type-guard the preview event capture

**File:** `src/app/demo-preview/demo-preview.component.ts`

Replace:

```ts
  private readonly onMfeEvent = (event: Event): void => {
    const customEvent = event as CustomEvent<unknown>;
    console.log('[demo-preview] captured', customEvent.type, customEvent.detail);
  };
```

with:

```ts
  private readonly onMfeEvent = (event: Event): void => {
    if (!(event instanceof CustomEvent)) return;
    console.log('[demo-preview] captured', event.type, event.detail);
  };
```

**Why:** Avoids an unchecked type cast and keeps the same runtime behavior.

---

## Verification

After applying all steps:

1. Run `vscode-mcp-server_get_diagnostics_code` on:
   - `src/app/demo/demo.component.ts`
   - `src/app/demo/demo-event-log.ts`
   - `src/app/demo/demo-dispatcher.ts`
   - `src/app/demo/demo-shell-state.ts`
   - `src/app/demo-preview/demo-preview.component.ts`
   Ensure no errors or warnings.
2. Run `npm run build` and confirm it succeeds with zero errors.
3. Confirm the action bar still renders eight buttons and each still dispatches the expected `mfe:*` event.
4. Confirm the event log still records outgoing and incoming events, newest first, capped at `MAX_LOG_ENTRIES`.
5. Confirm the identity panel still reflects `size`, `isCollapsed`, `isFullscreen`, dimensions, and visibility from simulated shell events.
6. Confirm the preview still captures every `mfe:*` event in the console.

---

## Expected outcome

- `DemoDispatcher` no longer repeats identity payload fields.
- `DemoShellState` uses a single state signal.
- `DemoComponent` loses the `sizeLabelText` pass-through and the `handleShellEvent` indirection.
- `demo.component.html` action bar is data-driven via `@for`.
- `demo-log-entry.ts` is removed; its contents live in `demo-event-log.ts`.
- `DemoPreviewComponent` captures events with a proper type guard.

No functional behavior changes.
