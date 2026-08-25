# Front-end Technical Specification — Task A: mfe-demo Phase 2 Code Implementation

**Source TODO:** `.agent/todos/20260825/20260825-todo-0.md` (items 1–9)  
**Global plan:** `.kilo/plans/20260825-mfe-demo-phase2-global.md`  
**Date:** 2026-08-25  
**Branch:** `feat/phase2-min-height-polish`  
**Output path:** `.kilo/plans/20260825-phase2-taskA-frontend-spec.md`

---

## 1. Goal & scope

Implement the Phase 2 code changes for `mfe-demo` (tasks 1–9 of the TODO). This specification is the single source of truth for the junior implementer. Every structural decision is encoded here; the implementer must not invent alternative approaches.

The work is grouped into eight concrete areas:

1. Min-height contract (helper + dispatch timing + state).
2. Identity panel updates.
3. Preview host updates.
4. `shell:module-state` polish (`dragState` / `previewMode`).
5. Multi-instance & state isolation hardening.
6. Collapse / size / fullscreen behaviour polish.
7. UX & copy polish + dead-code removal.
8. Forms / profile alignment with `@cobranza-apps/entities`.

---

## 2. Target framework & versions

- Angular 22 standalone components, signals, `OnPush`.
- `@cobranza-apps/mfe-events` **^0.6.0** (provides `MFE_EVENTS.UPDATE_MIN_HEIGHT` and `UpdateMinHeightPayload`).
- `@cobranza-apps/ui` **^0.19.0** (`Cba*` components).
- `@cobranza-apps/entities` **^0.5.1** (alignment reference only; UI keeps plain `string` values).
- `reflect-metadata` loaded via `angular.json` `scripts` array (already configured).

---

## 3. Min-height contract

### 3.1 Pure helper

Create a new file `src/app/demo/demo-min-height.ts`.

```ts
export type DemoMinHeightReason = 'init' | 'view-change' | 'content-change';

/** Sensible default min-height preference per view, in CSS pixels. */
export function computeMinHeightPx(view: DemoViewMode): number {
  switch (view) {
    case 'table':       return 320;
    case 'create-form': return 400;
    case 'profile':     return 280;
    default:            return 320;
  }
}
```

- Import `DemoViewMode` from `./demo-config`.
- The function must be pure: no side effects, no DOM reads, no signals.

### 3.2 Dispatcher addition

In `src/app/demo/demo-dispatcher.ts`:

1. Import `MFE_EVENTS` (already imported) and `UpdateMinHeightPayload` from `@cobranza-apps/mfe-events`.
2. Add a public method:

```ts
updateMinHeight(minHeightPx: number, reason: DemoMinHeightReason): void {
  this.send(MFE_EVENTS.UPDATE_MIN_HEIGHT, this.withIdentity({
    minHeightPx,
    reason,
  } as UpdateMinHeightPayload));
}
```

- The payload is built via `withIdentity`, so it automatically includes `schemaVersion`, `moduleType`, and `instanceId`.
- Record the outgoing event in `DemoEventLog` via the existing `send` method.
- **Remove** the `console.log('[mfe-demo] dispatch', name, payload);` line inside `send`. The event log and the preview host capture are sufficient; this line is temporary console noise.

### 3.3 Component state & dispatch timing

In `src/app/demo/demo.component.ts`:

1. Import `computeMinHeightPx` and `DemoMinHeightReason` from `./demo-min-height`.
2. Add a writable signal to track the last declared value:

```ts
readonly lastDeclaredMinHeightPx = signal<number | undefined>(undefined);
```

3. Add a private helper to compute, store, and dispatch:

```ts
private declareMinHeight(reason: DemoMinHeightReason, overridePx?: number): void {
  const view = this.view();
  const minHeightPx = overridePx !== undefined ? overridePx : computeMinHeightPx(view);
  this.lastDeclaredMinHeightPx.set(minHeightPx);
  this.dispatcher.updateMinHeight(minHeightPx, reason);
}
```

4. Dispatch timing:
   - **Init:** in `ngOnInit()`, call `this.dispatcher.ready()` first, then `this.declareMinHeight('init')`.
   - **View change:** add an `effect()` in the constructor (next to the title effect) that watches `this.view()`. Track the previous view in a local variable. On change, call `this.declareMinHeight('view-change')`.
   - **Content change (optional but implemented for table):** add an `effect()` that watches `config().tableRows` **only while `view() === 'table'`**. When the row count changes, call `this.declareMinHeight('content-change')`. For `create-form` and `profile`, no content-change dispatch is required.

5. Do **not** dispatch `update-min-height` before `ngOnInit` (identity Inputs must be available).

### 3.4 Identity panel display

In `src/app/demo/demo.component.html`, add a new row **after** the "Vista" row and **before** the "Header" row:

```html
<div class="cba-demo__identity-row">
  <span class="cba-text-caption">
    <strong>Min-height declarado:</strong>
    {{ lastDeclaredMinHeightPx() === undefined ? '—' : lastDeclaredMinHeightPx() + ' px' }}
  </span>
</div>
```

---

## 4. Identity panel updates (shell-state polish)

### 4.1 Extend `DemoShellState`

In `src/app/demo/demo-shell-state.ts`:

1. Extend `ShellStateSnapshot`:

```ts
interface ShellStateSnapshot {
  size?: ModuleSize;
  isCollapsed?: boolean;
  isFullscreen?: boolean;
  widthPx?: number;
  heightPx?: number;
  visibilityVisible?: boolean;
  visibilityReason?: string;
  dragState?: 'drag-start' | 'drag-end' | 'dropped';
  previewMode?: 'collapsed';
}
```

2. Extend the `applyModuleState` parameter type to accept the optional fields:

```ts
applyModuleState(state: {
  size: ModuleSize;
  width: number;
  height: number;
  isCollapsed: boolean;
  isFullscreen: boolean;
  dragState?: 'drag-start' | 'drag-end' | 'dropped';
  previewMode?: 'collapsed';
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

3. Add display computeds:

```ts
readonly displayDragState = computed(() => this.state().dragState);
readonly displayPreviewMode = computed(() => this.state().previewMode);
```

### 4.2 Identity panel markup

In `src/app/demo/demo.component.html`, inside the existing `dimensionsText` block (after the dimensions line), add:

```html
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
```

- Keep the existing dimensions row unchanged. It already displays `widthPx × heightPx` from `shell:module-state`; this is the **container height from the Shell**, not the MFE-declared `minHeightPx`. Do not rename or merge it with the min-height row.

### 4.3 Listener filter

The existing `matchesThisInstance` filter in `DemoComponent` already checks `instanceId` and `moduleType === this.moduleType()`. Since `moduleType` is always `'demo'` in practice, no change is required, but the spec **confirms** it must stay strict:

```ts
private readonly matchesThisInstance = (detail: { instanceId: string; moduleType: string }): boolean =>
  detail.instanceId === this.instanceId() && detail.moduleType === this.moduleType();
```

---

## 5. Preview host updates

In `src/app/demo-preview/demo-preview.component.ts` and `.html`:

### 5.1 Min-height display

Expose a computed that reads the value declared by the hosted `DemoComponent`. Because parent/child direct signal access is not clean, the preview host **captures** the last outgoing `mfe:update-min-height` event via the existing `MFE_EVENTS` listener.

1. Add signal:

```ts
readonly previewDeclaredMinHeightPx = signal<number | undefined>(undefined);
```

2. Update `onMfeEvent` to capture the specific event:

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

### 5.2 Force re-dispatch button

Use `ViewChild` to call a debug method on `DemoComponent`. This is acceptable because `DemoPreviewComponent` is a test harness, not production code.

Implementation steps:

1. In `DemoComponent`, add:

```ts
/** Exposed only for the standalone preview host; not part of the public Shell contract. */
declareMinHeightForPreview(reason: DemoMinHeightReason, overridePx?: number): void {
  this.declareMinHeight(reason, overridePx);
}
```

2. In `DemoPreviewComponent`, query the child:

```ts
import { ViewChild } from '@angular/core';

@ViewChild(DemoComponent) private demoComponent!: DemoComponent;
```

3. Add method:

```ts
readonly redeclareMinHeight = (): void => {
  this.demoComponent?.declareMinHeightForPreview('content-change', this.debugMinHeightOverride());
};
```

### 5.3 Debug override control

In the preview host:

1. Add signal:

```ts
readonly debugMinHeightOverride = signal<number | undefined>(undefined);
```

2. In `.html`, add inside the controls fieldset (group with min-height debug controls):

```html
<label class="demo-preview__field">
  <span class="cba-text-small">Override min-height (debug, px)</span>
  <input type="number" min="0" max="1200" [(ngModel)]="debugMinHeightOverride" name="debugMinHeightOverride" />
</label>

<div class="demo-preview__simulators">
  <cba-button size="sm" variant="secondary" (cbaClick)="redeclareMinHeight()">Reenviar min-height</cba-button>
</div>

<p class="demo-preview__min-height-readout cba-text-caption">
  Min-height declarado actual: {{ previewDeclaredMinHeightPx() === undefined ? '—' : previewDeclaredMinHeightPx() + ' px' }}
</p>
```

- When `debugMinHeightOverride` is empty/`undefined`, the normal `computeMinHeightPx(view)` value is used.
- When it has a numeric value, that value is dispatched instead.

### 5.4 Simulated `shell:module-state` with drag/preview

Extend `moduleStatePayload` to include optional `dragState` and `previewMode` based on new preview signals:

```ts
readonly simulatedDragState = signal<'drag-start' | 'drag-end' | 'dropped' | undefined>(undefined);
readonly simulatedPreviewMode = signal<'collapsed' | undefined>(undefined);

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

Add small select controls in the preview `.html` for these two signals.

---

## 6. Multi-instance & state isolation

### 6.1 Already-isolated state

The following are already created per `DemoComponent` instance and must stay that way:

- `eventLog = new DemoEventLog()`
- `shellState = new DemoShellState(...)`
- `dispatcher = new DemoDispatcher(...)`
- `lastDeclaredMinHeightPx` (new signal)
- create-form signals inside `DemoCreateFormComponent`

### 6.2 Required confirmations

- `DemoComponent` must **not** share any of the above objects between instances.
- Every outgoing event must carry the current `instanceId()`. `DemoDispatcher.withIdentity` already does this via signals; confirm it remains unchanged.
- `matchesThisInstance` must remain strict (see §4.3).
- The visual marker hue from `hashString(instanceId())` is already deterministic and distinct; confirm no change.

### 6.3 Verification checklist for implementer

After implementation, the implementer must manually verify (via standalone preview with at least two `cba-demo` instances) that:

- Changing a form field in instance A does not affect instance B.
- Event logs show different `instanceId` values per instance.
- `lastDeclaredMinHeightPx` differs independently when views differ.
- `shell:module-state` sent to instance A does not update instance B's identity panel.

---

## 7. Collapse / size / fullscreen behaviour

### 7.1 Collapse

When `isCollapsed` is true:

- The body must still render but should not force large vertical breakage.
- Identity panel rows can remain visible; they are compact.
- Add a CSS rule in `demo.component.scss`:

```scss
.cba-demo[data-collapsed='true'] {
  padding-top: var(--cba-space-2);
  padding-bottom: var(--cba-space-2);
}
```

- Bind `[attr.data-collapsed]="isCollapsed()"` on the root `<section>` in `demo.component.html`.

### 7.2 Size 50 %

- Action bar already uses `flex-wrap`; confirm it remains.
- Table: the existing `.table-responsive { overflow-x: auto; }` plus `min-width` is correct. Verify the table does not overflow the module boundary horizontally; the wrapper scrolls instead.
- Create-form: existing `[data-size='50%'] .demo-create-form__grid { grid-template-columns: 1fr; }` is correct.
- Profile: single-column layout is already correct.

### 7.3 Size 100 % & fullscreen

- Content uses available width.
- No extra changes needed beyond existing styles.

### 7.4 Identity panel sync

- Identity panel must read from `shellState.display*` computeds, not raw Inputs, so `shell:module-state` overrides are reflected.
- The new min-height row reads from `lastDeclaredMinHeightPx()` which is owned by the component instance.

---

## 8. UX & copy polish

### 8.1 Spanish labels to review

Review and standardise:

- Identity panel keys: Módulo, Instancia, Tamaño, Dimensiones, Visibilidad, Arrastre, Modo preview, Vista, Min-height declarado, Header.
- Action buttons: keep existing labels.
- Form labels: Nombre, Documento / DNI, Email, Teléfono, Observaciones.
- Profile keys: Nombre, DNI, Email, Teléfono, Saldo, Estado, Observaciones.
- Event log: "Registro de eventos (últimos 25)", "Limpiar log", "Sin eventos registrados.", "→ OUT", "← IN".
- Data viewer accordion: "Payload (data)".
- Preview host controls: group labels in Spanish.

### 8.2 Create-form hint

Keep the hint text:

```html
<p class="cba-text-caption demo-create-form__hint">
  Formulario de prueba — no realiza envíos reales.
</p>
```

Do not make it larger or more prominent.

### 8.3 Event log

- Min-height events (`mfe:update-min-height`) must appear with direction `→ OUT`, timestamp, event type, and truncated payload summary.
- Keep compact rows; no change to layout.

### 8.4 Data payload viewer

- Keep inside the collapsible accordion at the bottom.
- No styling that makes it compete with the main body.

### 8.5 Dead code & console noise

- Remove `console.log('[mfe-demo] dispatch', ...)` from `DemoDispatcher.send`.
- Remove any unused imports introduced during edits.
- Remove any commented-out code.
- Do not add new `console.log` statements except the existing preview capture log.

---

## 9. Forms / profile alignment

### 9.1 Create-form model alignment

In `src/app/demo/views/demo-create-form/demo-create-form.component.ts`:

1. Rename the internal form model fields to align with `Client` entity field names while keeping Spanish UI labels:

```ts
interface DemoCreateFormModel {
  readonly fullName: string;
  readonly taxId: string;
  readonly email: string;
  readonly phone: string;
  readonly notes: string;
}

const EMPTY_FORM: DemoCreateFormModel = {
  fullName: '',
  taxId: '',
  email: '',
  phone: '',
  notes: '',
};
```

2. Update signals and template bindings accordingly (`fullName`, `taxId`, `phone`, `notes`).
3. UI labels remain Spanish: Nombre, Documento / DNI, Email, Teléfono, Observaciones.
4. Keep all values as plain `string`; no encryption types in the UI.

### 9.2 Profile alignment

`DemoProfileComponent` already supports both Spanish keys and entity-like keys (`fullName`, `taxId`, `phone`, `active`, `notes`). No change is required except confirming that `notes` is included in `PROFILE_LABELS` (it already is).

### 9.3 No schema-driven UI

- Do **not** import or use `client.schema.json` in any view.
- Do **not** use `CreateClientDto` or encrypted value types in the form UI.
- Plain `string` values only.

---

## 10. Dependency bump

### 10.1 `package.json`

Update:

```json
"@cobranza-apps/mfe-events": "^0.6.0"
```

### 10.2 Install & type check

Run:

```bash
npm install
```

Then confirm TypeScript resolves:

- `MFE_EVENTS.UPDATE_MIN_HEIGHT`
- `UpdateMinHeightPayload`

If the import fails, stop and notify the caller — do not invent workarounds.

### 10.3 `reflect-metadata`

Confirm `angular.json` still contains:

```json
"scripts": [
  "node_modules/reflect-metadata/Reflect.js"
]
```

Do not add ESM `import 'reflect-metadata'` in application code.

---

## 11. Acceptance criteria

- [ ] `npm run build` is clean (no TypeScript errors, no lint errors).
- [ ] `MFE_EVENTS.UPDATE_MIN_HEIGHT` dispatches on init with `reason: 'init'` and correct identity fields.
- [ ] Changing `config.view` re-dispatches with `reason: 'view-change'` and the correct per-view `minHeightPx`.
- [ ] Identity panel shows "Min-height declarado: N px".
- [ ] Identity panel shows `dragState` and `previewMode` when present in `shell:module-state`.
- [ ] Preview host shows current declared min-height and can force re-dispatch with optional override.
- [ ] Two instances in the preview do not share event logs, form state, or min-height state.
- [ ] Collapse, 50 %, 100 %, and fullscreen layouts do not break; actions remain usable.
- [ ] All Spanish labels are consistent; no dead code or temporary `console.log` remain in production paths.
- [ ] Form and profile use plain `string` values; UI is not driven by `client.schema.json`.

---

## 12. Files expected to change

| File | Change type |
| ---- | ----------- |
| `src/app/demo/demo-min-height.ts` | New |
| `src/app/demo/demo-config.ts` | No change (helper moved to own file) |
| `src/app/demo/demo-dispatcher.ts` | Add `updateMinHeight`; remove console.log |
| `src/app/demo/demo-shell-state.ts` | Add dragState/previewMode |
| `src/app/demo/demo.component.ts` | Add min-height state/effects; expose debug method |
| `src/app/demo/demo.component.html` | Add min-height row; drag/preview rows; data-collapsed attr |
| `src/app/demo/demo.component.scss` | Add `[data-collapsed='true']` rule |
| `src/app/demo-preview/demo-preview.component.ts` | Capture min-height; override signal; ViewChild; drag/preview controls |
| `src/app/demo-preview/demo-preview.component.html` | Add min-height readout, override input, re-dispatch button, drag/preview selects |
| `src/app/demo-preview/demo-preview.component.scss` | Minor styling for new controls |
| `src/app/demo/views/demo-create-form/demo-create-form.component.ts` | Rename model fields to entity-aligned keys |
| `src/app/demo/views/demo-create-form/demo-create-form.component.html` | Update bindings |
| `package.json` | Bump `@cobranza-apps/mfe-events` to `^0.6.0` |

---

*End of specification.*
