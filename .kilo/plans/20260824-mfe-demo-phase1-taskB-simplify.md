# Simplification Plan — Task B: Views Implementation (Phase 1)

**Source TODO:** `.agent/todos/20260803/20260803-todo-2.md` — Tasks 1–4.
**Implementation plan reviewed:** `.kilo/plans/20260824-mfe-demo-phase1-taskB.md`.
**Scope:** Simplify code introduced in commits `0c35718` through `be6964f` on branch `feat/mfe-demo-phase1`.
**Goal:** Reduce `src/app/demo/demo.component.ts` from 203 lines to under the 200-line limit, remove duplication, and simplify the title `effect()`.

---

## Findings summary

1. `demo.component.ts` exceeds the 200-line file limit by 3 lines.
2. Three shell-event handlers are nearly identical and can be produced by a small factory.
3. Two dispatch methods repeat the same `console.log` + `dispatchMfeEvent` pattern.
4. `previousResolvedTitle` is stored as a class field although it is only used inside the constructor `effect()`.
5. `schemaVersion` and `readyEventName` are unused in the template and can be removed.
6. `hashString()` and `truncateInstanceId()` are pure utilities that do not belong in the component file.
7. `DemoProfileComponent` performs the same `.find((field) => field.label === 'Estado')` lookup twice.
8. `demo-create-form.component.scss` and `demo-profile.component.scss` declare redundant `display: block` rules for inner `div`s that are already block-level by default.

---

## Simplification steps

Execute in order. Each step is atomic; do not combine steps.

### Step 1 — Remove unused public fields in `DemoComponent`

**File:** `src/app/demo/demo.component.ts`

Remove the two fields that are not referenced by the template:

```ts
  readonly schemaVersion = SCHEMA_VERSION;
  readonly readyEventName = MFE_EVENTS.MODULE_READY;
```

Keep `headerEventName` because the template uses it in the identity panel.

**Why:** Eliminates dead state and helps reach the line limit.

---

### Step 2 — Move `previousResolvedTitle` into the constructor `effect()`

**File:** `src/app/demo/demo.component.ts`

Replace the `previousResolvedTitle` class field and the constructor `effect()` with:

```ts
  constructor() {
    let previousTitle = '';
    effect(() => {
      const title = this.resolvedTitle();
      if (title !== previousTitle) {
        this.dispatchUpdateHeader(title, 'loaded');
        previousTitle = title;
      }
    });
  }
```

Remove the standalone field:

```ts
  private previousResolvedTitle = '';
```

**Why:** The previous title is only needed inside the effect. A local variable removes mutable component state.

---

### Step 3 — Consolidate shell event handlers with a factory method

**File:** `src/app/demo/demo.component.ts`

Replace the three handler methods (`onModuleState`, `onVisibilityChanged`, `onThemeChanged`) and their JSDoc comments with:

```ts
  private readonly createShellHandler = (
    eventName: string,
    filterByInstance = true,
  ) => (event: Event): void => {
    if (!isShellEvent(event, eventName)) return;
    if (filterByInstance && event.detail.instanceId !== this.instanceId()) return;
    console.log('[mfe-demo] received', eventName, event.detail);
  };

  private readonly onModuleState = this.createShellHandler(SHELL_EVENTS.MODULE_STATE);
  private readonly onVisibilityChanged = this.createShellHandler(SHELL_EVENTS.VISIBILITY_CHANGED);
  private readonly onThemeChanged = this.createShellHandler(SHELL_EVENTS.THEME_CHANGED, false);
```

**Why:** Removes duplicated guard logic and keeps the same runtime behavior. Theme events remain global because `filterByInstance` is `false`.

---

### Step 4 — Extract pure utilities to `demo-utils.ts`

**File to create:** `src/app/demo/demo-utils.ts`

Create it with this exact content:

```ts
const SHORT_ID_PREFIX_LENGTH = 8;

export function truncateInstanceId(value: string): string {
  return value.length > SHORT_ID_PREFIX_LENGTH
    ? `${value.slice(0, SHORT_ID_PREFIX_LENGTH)}…`
    : value;
}

export function hashString(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    const char = value.charCodeAt(index);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}
```

**File to edit:** `src/app/demo/demo.component.ts`

Add the import at the top of the file:

```ts
import { hashString, truncateInstanceId } from './demo-utils';
```

Remove the following block at the bottom of `demo.component.ts`:

```ts
const SHORT_ID_PREFIX_LENGTH = 8;

function truncateInstanceId(value: string): string {
  return value.length > SHORT_ID_PREFIX_LENGTH
    ? `${value.slice(0, SHORT_ID_PREFIX_LENGTH)}…`
    : value;
}

function hashString(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    const char = value.charCodeAt(index);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}
```

**Why:** `hashString` and `truncateInstanceId` are pure helpers unrelated to the component's responsibilities. Moving them out shrinks the component file and makes them reusable.

---

### Step 5 — Introduce a generic `dispatch` helper

**File:** `src/app/demo/demo.component.ts`

Add the following private method after the constructor:

```ts
  private dispatch<K extends keyof MfeEventMap>(name: K, payload: MfeEventMap[K]): void {
    console.log('[mfe-demo] dispatch', name, payload);
    dispatchMfeEvent(name, payload);
  }
```

Then replace the three dispatch methods with:

```ts
  private dispatchReadyEvent(): void {
    this.dispatch(MFE_EVENTS.MODULE_READY, {
      schemaVersion: SCHEMA_VERSION,
      moduleType: this.moduleType(),
      instanceId: this.instanceId(),
    });
  }

  private dispatchUpdateHeader(title: string, status: ModuleStatus): void {
    this.dispatch(MFE_EVENTS.UPDATE_HEADER, {
      schemaVersion: SCHEMA_VERSION,
      moduleType: this.moduleType(),
      instanceId: this.instanceId(),
      title,
      status,
    });
  }

  private dispatchShowNotification(
    type: 'success' | 'warning' | 'error' | 'info',
    message: string,
  ): void {
    this.dispatch(MFE_EVENTS.SHOW_NOTIFICATION, {
      schemaVersion: SCHEMA_VERSION,
      type,
      message,
    });
  }
```

**Why:** Removes repeated `console.log` + `dispatchMfeEvent` pairs while preserving full type safety through `MfeEventMap`.

---

### Step 6 — Simplify `DemoProfileComponent` estado lookup

**File:** `src/app/demo/views/demo-profile/demo-profile.component.ts`

Add a shared computed for the estado field:

```ts
  readonly estadoField = computed(() =>
    this.fields().find((field) => field.label === 'Estado'),
  );
```

Then update the two derived computeds:

```ts
  readonly estadoBadgeVariant = computed<'success' | 'warning' | 'danger' | 'neutral'>(() =>
    this.resolveEstadoVariant(this.estadoField()?.value ?? ''),
  );

  readonly estadoValue = computed(() => this.estadoField()?.value ?? '—');
```

Finally, change `resolveEstadoVariant` so it receives the string value directly:

```ts
  private resolveEstadoVariant(estado: string): 'success' | 'warning' | 'danger' | 'neutral' {
    if (estado === 'Activo') return 'success';
    if (estado === 'Pendiente') return 'warning';
    if (estado === 'Vencido' || estado === 'Inactivo') return 'danger';
    return 'neutral';
  }
```

**Why:** Avoids searching the fields array twice for the same label.

---

### Step 7 — Remove redundant `display: block` rules

**File:** `src/app/demo/views/demo-create-form/demo-create-form.component.scss`

Remove:

```scss
.demo-create-form {
  display: block;
}
```

**File:** `src/app/demo/views/demo-profile/demo-profile.component.scss`

Remove:

```scss
.demo-profile {
  display: block;
}
```

**Why:** The host is already `display: block`, and the inner `div` elements are block-level by default. These rules add no behavior.

---

## Verification

After applying all steps:

1. Run `vscode-mcp-server_get_diagnostics_code` on:
   - `src/app/demo/demo.component.ts`
   - `src/app/demo/demo-utils.ts`
   - `src/app/demo/views/demo-profile/demo-profile.component.ts`
   Ensure no errors or warnings.
2. Confirm `src/app/demo/demo.component.ts` has fewer than 200 lines (expected ~165–175).
3. Run `npm run build` and confirm it succeeds with zero errors.
4. Confirm the identity panel still shows the current view, header event name, and instance color.
5. Confirm switching among `table`, `create-form`, and `profile` still works.
6. Confirm the `create-form` primary and secondary buttons still dispatch the expected events.

---

## Expected outcome

- `demo.component.ts` drops below the 200-line limit.
- Shell-event handlers are consolidated into one factory.
- Title `effect()` no longer needs a class field for the previous value.
- Dispatch methods share a typed helper.
- Pure utilities live in their own file.
- `DemoProfileComponent` no longer performs duplicate lookups for the `Estado` field.
- Two redundant SCSS rules are removed.

No functional behavior changes.
