# Task D 4.3 — Code Simplification Plan

## Scope

Event dispatch + standalone preview host for Phase 0 `mfe-demo`.

Files reviewed:

- `src/app/demo/demo.component.ts`
- `src/app/demo/demo.component.html`
- `src/app/demo-preview/demo-preview.component.ts`
- `src/app/demo-preview/demo-preview.component.html`
- `src/app/demo-preview/demo-preview.component.scss`

All proposed changes are small, localized refactors. No new features, no scope changes, no TODO escalation required.

## Simplifications

### 1. Remove unused shell payload type imports

**File:** `src/app/demo/demo.component.ts`

`ModuleStatePayload`, `ThemeChangedPayload`, and `VisibilityChangedPayload` are imported but never used. Remove them from the `@cobranza-apps/mfe-events` import.

Keep `ModuleReadyPayload` and `UpdateHeaderPayload` because they are used to type dispatch payloads.

### 2. Drop debug-only event-name properties and the Header identity row

**Files:** `src/app/demo/demo.component.ts`, `src/app/demo/demo.component.html`

`schemaVersion`, `readyEventName`, and `headerEventName` exist only to show the event name in the identity panel. The brief does not require this row, and it duplicates the title already visible via `config().title`.

- Remove the three `readonly` properties from the class.
- Remove the identity row that renders `<strong>Header:</strong> {{ headerEventName }} → ...`.

Result: the identity panel contains only the required fields (`moduleType`, `instanceId`, `size`, `isCollapsed`, `isFullscreen`, `view`), which matches the brief exactly.

### 3. Inline instance marker color and bind the CSS custom property directly

**Files:** `src/app/demo/demo.component.ts`, `src/app/demo/demo.component.html`

Current state:

- `instanceHue` computes a numeric hue.
- `instanceColorStyle` builds an object `{ '--demo-instance-marker': 'hsl(...)' }`.
- The template binds `[style]="instanceColorStyle()"`, which allocates a new object on every signal read.

Simplify to a single computed that returns the HSL string and bind it directly to the CSS variable:

```ts
readonly instanceMarkerColor = computed(
  () => `hsl(${this.hashString(this.instanceId()) % 360}, 65%, 45%)`,
);
```

```html
<section
  class="cba-demo"
  [attr.data-size]="size()"
  [style.--demo-instance-marker]="instanceMarkerColor()">
```

Remove `instanceHue` and `instanceColorStyle`.

### 4. Consolidate MFE dispatch logging into one helper

**File:** `src/app/demo/demo.component.ts`

Both `dispatchReadyEvent` and `dispatchUpdateHeaderEvent` repeat the same `console.log(...)` + `dispatchMfeEvent(...)` sequence.

Add a private helper:

```ts
private dispatchMfeEventWithLog<T>(eventName: string, payload: T): void {
  console.log('[mfe-demo] dispatch', eventName, payload);
  dispatchMfeEvent(eventName, payload);
}
```

Then each dispatch method becomes:

```ts
private dispatchReadyEvent(): void {
  this.dispatchMfeEventWithLog(MFE_EVENTS.MODULE_READY, {
    schemaVersion: SCHEMA_VERSION,
    moduleType: this.moduleType(),
    instanceId: this.instanceId(),
  });
}

private dispatchUpdateHeaderEvent(): void {
  this.dispatchMfeEventWithLog(MFE_EVENTS.UPDATE_HEADER, {
    schemaVersion: SCHEMA_VERSION,
    moduleType: this.moduleType(),
    instanceId: this.instanceId(),
    title: this.config().title ?? DEFAULT_HEADER_TITLE,
    status: 'loaded',
  });
}
```

This removes duplicated log/dispatch boilerplate without changing payloads.

### 5. Data-drive the shell event listeners

**File:** `src/app/demo/demo.component.ts`

Three near-identical listener methods (`onModuleState`, `onVisibilityChanged`, `onThemeChanged`) are attached and removed in three near-identical lines.

Replace them with a loop over a small config array:

```ts
private readonly shellListenerConfigs = [
  { eventName: SHELL_EVENTS.MODULE_STATE, filterByInstance: true },
  { eventName: SHELL_EVENTS.VISIBILITY_CHANGED, filterByInstance: true },
  { eventName: SHELL_EVENTS.THEME_CHANGED, filterByInstance: false },
] as const;

private readonly shellListenerHandlers = new Map<string, EventListener>();

private attachShellListeners(): void {
  for (const { eventName, filterByInstance } of this.shellListenerConfigs) {
    const handler = (event: Event): void => {
      if (!isShellEvent(event, eventName)) return;
      if (filterByInstance && event.detail.instanceId !== this.instanceId()) return;
      console.log('[mfe-demo] received', eventName, event.detail);
    };
    this.shellListenerHandlers.set(eventName, handler);
    window.addEventListener(eventName, handler);
  }
}

ngOnDestroy(): void {
  for (const [eventName, handler] of this.shellListenerHandlers) {
    window.removeEventListener(eventName, handler);
  }
}
```

Delete the three `private readonly on*` methods and the original `attachShellListeners` body.

Behavior remains identical: module-state and visibility-changed are filtered by `instanceId`; theme-changed is global.

### 6. Merge create-form/profile placeholder cases

**File:** `src/app/demo/demo.component.html`

`create-form` and `profile` render the exact same placeholder. Replace the two `@case` blocks with one `@default` block:

```html
@switch (view()) {
  @case ('table') {
    <app-demo-table [rowCount]="config().tableRows ?? 5" [size]="size()" />
  }
  @default {
    <div class="cba-demo__placeholder">
      <p class="cba-text-body">Vista aún no implementada en Phase 0.</p>
      <p class="cba-text-caption">Vista seleccionada: {{ viewLabel() }}</p>
    </div>
  }
}
```

This removes duplicated template markup. Future phases can reintroduce per-view cases when the views are actually implemented.

### 7. Convert preview `instanceId` from signal to plain string

**Files:** `src/app/demo-preview/demo-preview.component.ts`, `src/app/demo-preview/demo-preview.component.html`

`instanceId` is a signal that never changes. Use a plain readonly string instead:

```ts
readonly instanceId = MOCK_INSTANCE_ID;
```

In the template, remove the function call:

```html
[instanceId]="instanceId"
```

This avoids unnecessary signal overhead for a constant mock value.

### 8. Data-drive the preview event capture listeners

**File:** `src/app/demo-preview/demo-preview.component.ts`

The two capture listeners (`onModuleReady`, `onUpdateHeader`) do the same thing for two event names. Replace them with a loop:

```ts
private readonly capturedMfeEvents = [
  MFE_EVENTS.MODULE_READY,
  MFE_EVENTS.UPDATE_HEADER,
] as const;

private readonly mfeListenerHandlers = new Map<string, EventListener>();

ngOnInit(): void {
  for (const eventName of this.capturedMfeEvents) {
    const handler = (event: Event): void => {
      if (!isMfeEvent(event, eventName)) return;
      console.log('[demo-preview] captured', eventName, event.detail);
    };
    this.mfeListenerHandlers.set(eventName, handler);
    window.addEventListener(eventName, handler);
  }
}

ngOnDestroy(): void {
  for (const [eventName, handler] of this.mfeListenerHandlers) {
    window.removeEventListener(eventName, handler);
  }
}
```

Delete `onModuleReady` and `onUpdateHeader`.

## Verification

After applying the changes:

1. Run `ng build` and confirm zero errors.
2. Run `ng serve`, open the standalone preview, and confirm:
   - Identity panel still shows `moduleType`, `instanceId`, `size`, collapsed/fullscreen state, and current view.
   - The instance marker color is still applied.
   - Console still logs `mfe:module-ready` and `mfe:update-header` on load.
   - Changing preview size updates the table layout and identity panel.
3. Confirm that no files outside the reviewed list were modified.
