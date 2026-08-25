# Fix Plan — Task C (Phase 1, Tasks 5–9)

## Issues found

Three `.kilo/rules/max-arguments-per-method.md` violations in the new helper files created for Task C:

1. `src/app/demo/demo-dispatcher.ts` — `DemoDispatcher` constructor has 3 parameters (`moduleType`, `instanceId`, `eventLog`).
2. `src/app/demo/demo-shell-state.ts` — `DemoShellState` constructor has 3 parameters (`inputSize`, `inputIsCollapsed`, `inputIsFullscreen`).
3. `src/app/demo/demo-event-log.ts` — `DemoEventLog.add` method has 3 parameters (`direction`, `eventType`, `payload`).

The rule states: *Methods and functions should not have more than 2 params. When required more than 2 params, encapsulate them in a class or object. When possible, define a type for the param object, and do it in a new file.*

All other functional requirements from Tasks 5–9 are implemented correctly; the build passes. This fix is a pure refactor with no behavior change.

## Fix steps

### Step 1 — Add `DemoDispatcherOptions` type

Create `src/app/demo/demo-dispatcher-options.ts`:

```ts
import { type Signal } from '@angular/core';

import { type DemoEventLog } from './demo-event-log';

export interface DemoDispatcherOptions {
  readonly moduleType: Signal<string>;
  readonly instanceId: Signal<string>;
  readonly eventLog: DemoEventLog;
}
```

### Step 2 — Refactor `DemoDispatcher` constructor

In `src/app/demo/demo-dispatcher.ts`:

- Import `DemoDispatcherOptions`.
- Replace the 3-parameter constructor with:

```ts
constructor(private readonly options: DemoDispatcherOptions) {}
```

- Update all internal references:
  - `this.moduleType()` → `this.options.moduleType()`
  - `this.instanceId()` → `this.options.instanceId()`
  - `this.eventLog` → `this.options.eventLog`

### Step 3 — Add `DemoShellStateOptions` type

Create `src/app/demo/demo-shell-state-options.ts`:

```ts
import { type Signal } from '@angular/core';
import { type ModuleSize } from '@cobranza-apps/mfe-events';

export interface DemoShellStateOptions {
  readonly inputSize: Signal<ModuleSize>;
  readonly inputIsCollapsed: Signal<boolean>;
  readonly inputIsFullscreen: Signal<boolean>;
}
```

### Step 4 — Refactor `DemoShellState` constructor

In `src/app/demo/demo-shell-state.ts`:

- Import `DemoShellStateOptions`.
- Replace the 3-parameter constructor with:

```ts
constructor(private readonly options: DemoShellStateOptions) {}
```

- Update all internal references:
  - `this.inputSize()` → `this.options.inputSize()`
  - `this.inputIsCollapsed()` → `this.options.inputIsCollapsed()`
  - `this.inputIsFullscreen()` → `this.options.inputIsFullscreen()`

### Step 5 — Add `DemoLogEntryInput` type

Create `src/app/demo/demo-log-entry-input.ts`:

```ts
export interface DemoLogEntryInput {
  readonly direction: 'in' | 'out';
  readonly eventType: string;
  readonly payload: unknown;
}
```

### Step 6 — Refactor `DemoEventLog.add` signature

In `src/app/demo/demo-event-log.ts`:

- Import `DemoLogEntryInput`.
- Replace the method signature and body with:

```ts
add(entry: DemoLogEntryInput): void {
  const newEntry: DemoLogEntry = {
    direction: entry.direction,
    eventType: entry.eventType,
    payloadSummary: summarizePayload(entry.payload),
    rawPayload: entry.payload,
    timestamp: new Date(),
  };
  this.entries.update((items) => [newEntry, ...items].slice(0, MAX_LOG_ENTRIES));
}
```

### Step 7 — Update callers of `DemoEventLog.add`

In `src/app/demo/demo-dispatcher.ts`:

- Replace `this.eventLog.add('out', name, payload);` with:

```ts
this.eventLog.add({ direction: 'out', eventType: name, payload });
```

In `src/app/demo/demo.component.ts`:

- Replace `this.eventLog.add('in', eventName, detail);` with:

```ts
this.eventLog.add({ direction: 'in', eventType: eventName, payload: detail });
```

- Replace `this.eventLog.add('in', SHELL_EVENTS.THEME_CHANGED, event.detail);` with:

```ts
this.eventLog.add({
  direction: 'in',
  eventType: SHELL_EVENTS.THEME_CHANGED,
  payload: event.detail,
});
```

### Step 8 — Update construction sites in `DemoComponent`

In `src/app/demo/demo.component.ts`:

- Replace:

```ts
readonly shellState = new DemoShellState(this.size, this.isCollapsed, this.isFullscreen);
```

with:

```ts
readonly shellState = new DemoShellState({
  inputSize: this.size,
  inputIsCollapsed: this.isCollapsed,
  inputIsFullscreen: this.isFullscreen,
});
```

- Replace:

```ts
readonly dispatcher = new DemoDispatcher(this.moduleType, this.instanceId, this.eventLog);
```

with:

```ts
readonly dispatcher = new DemoDispatcher({
  moduleType: this.moduleType,
  instanceId: this.instanceId,
  eventLog: this.eventLog,
});
```

### Step 9 — Verify build

Run `npm run build` from the project root. It must succeed with no errors.

## Files changed

- `src/app/demo/demo-dispatcher-options.ts` — NEW
- `src/app/demo/demo-shell-state-options.ts` — NEW
- `src/app/demo/demo-log-entry-input.ts` — NEW
- `src/app/demo/demo-dispatcher.ts` — MODIFY
- `src/app/demo/demo-shell-state.ts` — MODIFY
- `src/app/demo/demo-event-log.ts` — MODIFY
- `src/app/demo/demo.component.ts` — MODIFY

## Constraints

- Do NOT change behavior; this is a pure refactor.
- Do NOT modify files outside the list above.
- Do NOT run git commands, create branches, bump versions, or push.
