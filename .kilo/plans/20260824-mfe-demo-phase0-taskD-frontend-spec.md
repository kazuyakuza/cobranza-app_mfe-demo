# Front-end Technical Specification — Task D: Events + Standalone Preview Host

> Scope: Task 9 (Core event dispatch) + Task 10 (Standalone preview host) of `20260803-todo-1.md`.
> Source of truth: `brief.md` §3.3, §3.4, §3.6 and `architecture.md` §4.2, §4.3.
> Target implementer: **JUNIOR developer under 50% restriction** — all structural decisions are encoded below.

---

## 1. Goal

Wire the Shell ↔ MFE event contract into the existing Angular 22 standalone stubs:

- `src/app/demo/demo.component.ts` — dispatch `mfe:module-ready` and `mfe:update-header` on init; listen for `shell:*` events and filter by `instanceId`.
- `src/app/demo-preview/demo-preview.component.ts` — simulate the Shell host, provide controls to mutate `size`, `view`, and `title`, and log outgoing `mfe:*` events.

No source files beyond these two components (and their templates) may be modified for this task.

---

## 2. Framework & Environment

| Item | Value |
|------|-------|
| Framework | Angular 22.1.2 standalone components |
| Event lib | `@cobranza-apps/mfe-events` 0.5.0 (already installed) |
| `reflect-metadata` | Loaded via `angular.json` scripts array (already configured) — do **not** `import 'reflect-metadata'` in code |
| Change detection | `OnPush` (already set on both components) |
| Language | Spanish UI strings only |
| Module system | No `NgModules` |
| File limits | ≤200 lines per file; ≤50 lines per method body |

---

## 3. `@cobranza-apps/mfe-events` API to use

Import everything from the package root:

```ts
import {
  MFE_EVENTS,
  SHELL_EVENTS,
  SCHEMA_VERSION,
  dispatchMfeEvent,
  isShellEvent,
  isMfeEvent,
  type ModuleReadyPayload,
  type UpdateHeaderPayload,
  type ModuleStatePayload,
  type VisibilityChangedPayload,
  type ThemeChangedPayload,
} from '@cobranza-apps/mfe-events';
```

Useful event-name values:

- `MFE_EVENTS.MODULE_READY` → `'mfe:module-ready'`
- `MFE_EVENTS.UPDATE_HEADER` → `'mfe:update-header'`
- `SHELL_EVENTS.MODULE_STATE` → `'shell:module-state'`
- `SHELL_EVENTS.VISIBILITY_CHANGED` → `'shell:visibility-changed'`
- `SHELL_EVENTS.THEME_CHANGED` → `'shell:theme-changed'`

Always pass `schemaVersion: SCHEMA_VERSION` in every payload.

---

## 4. `DemoComponent` event dispatch (MFE → Shell)

### 4.1 Lifecycle hook

Use `ngOnInit()` to dispatch the two required events. With signal inputs, required inputs are guaranteed to be available in `OnInit` when the component is hosted by Angular.

### 4.2 `mfe:module-ready`

Dispatch once on init using `dispatchMfeEvent`:

```ts
const readyPayload: ModuleReadyPayload = {
  schemaVersion: SCHEMA_VERSION,
  moduleType: this.moduleType(),
  instanceId: this.instanceId(),
};
console.log('[mfe-demo] dispatch', MFE_EVENTS.MODULE_READY, readyPayload);
dispatchMfeEvent(MFE_EVENTS.MODULE_READY, readyPayload);
```

### 4.3 `mfe:update-header`

Dispatch once on init with:

- `title`: `this.config().title ?? 'Demo'`
- `status`: `'loaded'` (matches `@cobranza-apps/ui` `ModuleStatus` union)

```ts
const headerPayload: UpdateHeaderPayload = {
  schemaVersion: SCHEMA_VERSION,
  moduleType: this.moduleType(),
  instanceId: this.instanceId(),
  title: this.config().title ?? 'Demo',
  status: 'loaded',
};
console.log('[mfe-demo] dispatch', MFE_EVENTS.UPDATE_HEADER, headerPayload);
dispatchMfeEvent(MFE_EVENTS.UPDATE_HEADER, headerPayload);
```

> Phase 0 requirement: only the init dispatch is required. Re-dispatching when `config().title` changes is **not** required for this task.

### 4.4 Console logging rule

Always log **before** dispatching, using the pattern:

```ts
console.log('[mfe-demo] dispatch', eventConstant, payload);
```

This makes outgoing events visible in standalone preview mode where the Shell is not present.

---

## 5. `DemoComponent` Shell → MFE listeners

### 5.1 Events to listen

Attach three `window` listeners in `ngOnInit()`:

1. `SHELL_EVENTS.MODULE_STATE`
2. `SHELL_EVENTS.VISIBILITY_CHANGED`
3. `SHELL_EVENTS.THEME_CHANGED`

Store the listener function references as private arrow-bound fields so they can be removed in `ngOnDestroy()`.

### 5.2 Filtering

For every `shell:*` event except `shell:theme-changed` (which is global), drop events whose `event.detail.instanceId !== this.instanceId()`.

For `shell:theme-changed`, process every event (no `instanceId` field).

### 5.3 Listener pattern

```ts
private readonly onModuleState = (event: Event): void => {
  if (!isShellEvent(event, SHELL_EVENTS.MODULE_STATE)) return;
  if (event.detail.instanceId !== this.instanceId()) return;
  console.log('[mfe-demo] received', SHELL_EVENTS.MODULE_STATE, event.detail);
};
```

Use the same pattern for `VISIBILITY_CHANGED`. For `THEME_CHANGED` omit the `instanceId` check.

### 5.4 Phase 0 behaviour

For this task, logging the received payload is sufficient. Optional: store the last received `ModuleStatePayload` in a `lastModuleState` signal and display it in the identity panel — but only if it does not push the file beyond the 200-line limit.

### 5.5 Cleanup

Remove all three listeners in `ngOnDestroy()`:

```ts
ngOnDestroy(): void {
  window.removeEventListener(SHELL_EVENTS.MODULE_STATE, this.onModuleState);
  window.removeEventListener(SHELL_EVENTS.VISIBILITY_CHANGED, this.onVisibilityChanged);
  window.removeEventListener(SHELL_EVENTS.THEME_CHANGED, this.onThemeChanged);
}
```

---

## 6. `DemoPreviewComponent` — standalone preview host

### 6.1 Existing responsibilities (must preserve)

- Render `<cba-demo>` with mock inputs.
- Use a stable mock `instanceId` and initial `data`.

### 6.2 New state signals

Add the following signals to `DemoPreviewComponent`:

```ts
readonly size = signal<ModuleSize>('100%');
readonly view = signal<DemoViewMode>('table');
readonly title = signal<string>('');
readonly instanceId = signal<string>('demo-preview-0001');
```

> `ModuleSize` is exported from `@cobranza-apps/mfe-events` (`'50%' | '100%'`). `DemoViewMode` comes from `src/app/demo/demo-config.ts`.

### 6.3 Derived `data` input

Replace the existing `data` signal with a computed that merges the preview controls into a `DemoConfig` object:

```ts
readonly data = computed<Record<string, unknown>>(() => ({
  view: this.view(),
  title: this.title() || undefined,
  tableRows: 5,
}));
```

This lets the preview mutate `DemoConfig.view` and `DemoConfig.title` without duplicating `coerceDemoConfig` logic.

### 6.4 Controls in template

Add a control panel **above** `<cba-demo>` with Spanish labels:

1. **Tamaño** — two buttons or a `<select>`:
   - Option/value `'50%'` → label `"Mitad (50 %)"`
   - Option/value `'100%'` → label `"Completo (100 %)"`
   - Changing this updates `size`.

2. **Vista** — `<select>` bound to `view`:
   - `'table'` → `"Tabla"`
   - `'create-form'` → `"Alta"`
   - `'profile'` → `"Perfil"`

3. **Título del header** — text input bound to `title`:
   - Placeholder: `"Título para mfe:update-header"`
   - Empty value means no `title` field in `data` (falls back to `"Demo"` inside `DemoComponent`).

Use Angular forms via `ngModel` (import `FormsModule`) or plain event bindings (`(input)="title.set($any($event.target).value)"`). `FormsModule` is acceptable and already a peer of the project.

### 6.5 Inputs passed to `<cba-demo>`

Update the template binding to pass the live signals:

```html
<cba-demo
  [moduleType]="'demo'"
  [instanceId]="instanceId()"
  [size]="size()"
  [isCollapsed]="false"
  [isFullscreen]="false"
  [data]="data()" />
```

### 6.6 Listen for outgoing `mfe:*` events

In `ngOnInit()` add window listeners for every MFE event the component might dispatch in this task:

- `MFE_EVENTS.MODULE_READY`
- `MFE_EVENTS.UPDATE_HEADER`

Use `isMfeEvent` to narrow the type. Log with:

```ts
console.log('[demo-preview] captured', MFE_EVENTS.MODULE_READY, event.detail);
```

Remove listeners in `ngOnDestroy()`.

---

## 7. Component contracts

### 7.1 `DemoComponent`

| Kind | Member | Notes |
|------|--------|-------|
| Inputs (existing) | `moduleType`, `instanceId`, `size`, `isCollapsed`, `isFullscreen`, `data` | Preserve exactly as signal inputs |
| Lifecycle | `ngOnInit()` | Dispatch ready + update-header; attach window listeners |
| Lifecycle | `ngOnDestroy()` | Remove all window listeners |
| Private field | `onModuleState` | Arrow listener for `shell:module-state` |
| Private field | `onVisibilityChanged` | Arrow listener for `shell:visibility-changed` |
| Private field | `onThemeChanged` | Arrow listener for `shell:theme-changed` |

### 7.2 `DemoPreviewComponent`

| Kind | Member | Notes |
|------|--------|-------|
| State | `size` | `'50%' \| '100%'` signal |
| State | `view` | `DemoViewMode` signal |
| State | `title` | `string` signal |
| State | `instanceId` | `string` signal |
| Derived | `data` | computed `DemoConfig` object from controls |
| Lifecycle | `ngOnInit()` | Attach `mfe:*` window listeners |
| Lifecycle | `ngOnDestroy()` | Remove listeners |

---

## 8. Template strings (Spanish)

All user-facing labels must be in Spanish. Examples:

- `"Previsualización mfe-demo"`
- `"Tamaño"`
- `"Mitad (50 %)"`
- `"Completo (100 %)"`
- `"Vista"`
- `"Tabla"`
- `"Alta"`
- `"Perfil"`
- `"Título del header"`
- `"Host simulado — eventos visibles en consola"`

---

## 9. File and method size constraints

- `demo.component.ts` must remain ≤200 lines; `demo-preview.component.ts` must remain ≤200 lines.
- No method body may exceed 50 lines.
- If `ngOnInit()` grows too large, split into private helpers such as `private dispatchReadyEvent()`, `private dispatchUpdateHeaderEvent()`, `private attachShellListeners()`.
- Prefer extracting constants (e.g., `DEFAULT_PREVIEW_TITLE = 'Demo'`) if reused.

---

## 10. Acceptance criteria

- [ ] `DemoComponent` dispatches `mfe:module-ready` on init with correct `moduleType`, `instanceId`, and `schemaVersion`.
- [ ] `DemoComponent` dispatches `mfe:update-header` on init with title `config().title ?? 'Demo'` and status `'loaded'`.
- [ ] Every dispatched MFE event is logged to console before dispatch.
- [ ] `DemoComponent` listens for `shell:module-state`, `shell:visibility-changed`, and `shell:theme-changed` on `window`.
- [ ] Shell events are filtered by `event.detail.instanceId === this.instanceId()` (except theme).
- [ ] Listeners are removed on destroy.
- [ ] `DemoPreviewComponent` provides working controls for `size`, `view`, and `title`.
- [ ] `DemoPreviewComponent` logs captured `mfe:module-ready` and `mfe:update-header` events to console.
- [ ] No NgModules are introduced; components remain standalone.
- [ ] All UI strings are in Spanish.
- [ ] `ng build` and `ng serve` remain functional with no new errors.

---

## 11. Out of scope

- Action buttons for `mfe:show-notification`, `mfe:request-fullscreen`, `mfe:request-remove`, `mfe:request-add-module`, or `mfe:module-error` (future tasks).
- Reflow/render logic based on `shell:module-state` dimensions (Phase 0 = log only).
- Sub-view components for `create-form` and `profile`.
- Any changes to `@cobranza-apps/mfe-events` or the Shell contract.
- README / docs updates (covered by other TODO tasks).
