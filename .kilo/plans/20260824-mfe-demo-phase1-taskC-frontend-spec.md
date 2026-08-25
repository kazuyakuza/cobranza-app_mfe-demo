# Front-end Technical Specification — Task C (Phase 1, Tasks 5–9)

**Project:** `mfe-demo`  
**File:** `.kilo/plans/20260824-mfe-demo-phase1-taskC-frontend-spec.md`  
**Scope:** Actions, Event Log, Data Viewer, Shell Listeners & Standalone Preview improvements for `DemoComponent` and `DemoPreviewComponent`.  
**Target implementer:** Junior developer (50 % restriction — structural decisions are encoded below; do not deviate without asking).

---

## 1. Context & constraints

- `DemoComponent` (`src/app/demo/demo.component.ts`) is the single federation entry component.
- It already owns the identity panel, view switching, title effect, and basic `mfe:*` dispatch (`module-ready`, `update-header`, `show-notification`).
- `DemoPreviewComponent` (`src/app/demo-preview/demo-preview.component.ts`) is the standalone developer host; it is **not** loaded by the Shell.
- All Shell ↔ MFE events must use `@cobranza-apps/mfe-events` helpers and include `moduleType`, `instanceId`, and `schemaVersion: SCHEMA_VERSION`.
- All `shell:*` events listened to by `DemoComponent` must be filtered by `instanceId` and `moduleType === 'demo'`.
- UI language is Spanish only. Desktop only. No DOM outside the component container.
- Prefer `@cobranza-apps/ui` components; do not reimplement Shell chrome (header, drag, collapse, fullscreen, remove).

---

## 2. New dependencies / imports to use

### 2.1 `@cobranza-apps/ui`

| Component | Selector | Purpose |
|-----------|----------|---------|
| `CbaButtonComponent` | `<cba-button>` | All action buttons and "Limpiar log". |
| `CbaCardComponent` | `<cba-card>` | Container for event log and data payload viewer. |
| `CbaAccordionComponent` | `<cba-accordion>` | Collapsible data payload viewer section. |
| `NgbAccordionModule` | `ngbAccordionItem`, `ngbAccordionButton`, etc. | Required peer markup for `CbaAccordionComponent`. |

Import pattern in `demo.component.ts`:

```ts
import {
  CbaAccordionComponent,
  CbaBadgeComponent,
  CbaButtonComponent,
  CbaCardComponent,
} from '@cobranza-apps/ui';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
```

Import pattern in `demo-preview.component.ts`:

```ts
import { CbaButtonComponent } from '@cobranza-apps/ui';
import { FormsModule } from '@angular/forms';
```

### 2.2 `@cobranza-apps/mfe-events`

Already imported. Required additions for type annotations:

```ts
import {
  dispatchMfeEvent,
  dispatchShellEvent,
  isMfeEvent,
  isShellEvent,
  MFE_EVENTS,
  SCHEMA_VERSION,
  SHELL_EVENTS,
  type MfeEventMap,
  type ModuleSize,
  type ModuleStatus,
  type ShellEventMap,
} from '@cobranza-apps/mfe-events';
```

---

## 3. Action buttons — Task 5

### 3.1 Placement

Add a new section **between the identity panel and the `@switch (view())` body** in `demo.component.html`.

```html
<section class="cba-demo__actions" aria-label="Acciones de demostración">
  <!-- buttons -->
</section>
```

### 3.2 Layout / responsive rules

- Container: `display: flex; flex-wrap: wrap; gap: var(--cba-space-2); align-items: center;`.
- Each button: use `<cba-button size="sm">` (default size is too large for a dense debug surface).
- Do **not** use `[block]="true"`. Buttons must wrap naturally at `50 %` width.
- Add bottom margin `var(--cba-space-3)` to separate from the view body.

### 3.3 Button inventory

Render exactly these buttons in this order:

| # | Label | Variant | Icon (optional) | Event | Behaviour |
|---|-------|---------|-----------------|-------|-----------|
| 1 | `Actualizar título` | `primary` | — | `mfe:update-header` | Cycle through 3 title/status combos (see §3.4). |
| 2 | `Notificación éxito` | `success` | — | `mfe:show-notification` | `type: 'success'`, message `'Notificación de éxito'` |
| 3 | `Notificación advertencia` | `warning` | — | `mfe:show-notification` | `type: 'warning'`, message `'Notificación de advertencia'` |
| 4 | `Notificación error` | `danger` | — | `mfe:show-notification` | `type: 'error'`, message `'Notificación de error'` |
| 5 | `Pantalla completa` | `secondary` | — | `mfe:request-fullscreen` | Standard identity payload. |
| 6 | `Quitar módulo` | `danger` | — | `mfe:request-remove` | Standard identity payload. |
| 7 | `Agregar instancia` | `secondary` | — | `mfe:request-add-module` | `moduleType: 'demo'`, `initialData: { view: 'table' }`. |
| 8 | `Simular error` | `danger` | — | `mfe:module-error` | `message: 'Error simulado desde mfe-demo'`, optional `code: 'DEMO_ERROR'`. |

> Note: Button #8 is optional in the TODO but the library exposes a clear helper and payload; include it.

### 3.4 Title/status cycle

Store a `WritableSignal<number>` named `headerDemoIndex` initialized to `0`.

Define a readonly array:

```ts
private readonly HEADER_DEMOS: ReadonlyArray<{ title: string; status: ModuleStatus }> = [
  { title: 'Demo – Título A', status: 'loaded' },
  { title: 'Demo – Título B', status: 'success' },
  { title: 'Demo – Título C', status: 'warning' },
];
```

On "Actualizar título" click:

1. Compute `nextIndex = (headerDemoIndex() + 1) % HEADER_DEMOS.length`.
2. `headerDemoIndex.set(nextIndex)`.
3. Call `dispatchUpdateHeader(HEADER_DEMOS[nextIndex].title, HEADER_DEMOS[nextIndex].status)`.

### 3.5 Dispatch helpers

Add the following private methods in `DemoComponent`:

```ts
private dispatchRequestFullscreen(): void {
  this.dispatch(MFE_EVENTS.REQUEST_FULLSCREEN, {
    schemaVersion: SCHEMA_VERSION,
    moduleType: this.moduleType(),
    instanceId: this.instanceId(),
  });
}

private dispatchRequestRemove(): void {
  this.dispatch(MFE_EVENTS.REQUEST_REMOVE, {
    schemaVersion: SCHEMA_VERSION,
    moduleType: this.moduleType(),
    instanceId: this.instanceId(),
  });
}

private dispatchRequestAddModule(): void {
  this.dispatch(MFE_EVENTS.REQUEST_ADD_MODULE, {
    schemaVersion: SCHEMA_VERSION,
    moduleType: 'demo',
    title: 'Nueva instancia demo',
    initialData: { view: 'table' },
  });
}

private dispatchModuleError(): void {
  this.dispatch(MFE_EVENTS.MODULE_ERROR, {
    schemaVersion: SCHEMA_VERSION,
    moduleType: this.moduleType(),
    instanceId: this.instanceId(),
    message: 'Error simulado desde mfe-demo',
    code: 'DEMO_ERROR',
  });
}
```

Reuse the existing `dispatchShowNotification(type, message)` and `dispatchUpdateHeader(title, status)` helpers.

### 3.6 Event logging from dispatch

Every outgoing event must be recorded in the local event log (see §4). Modify the existing `dispatch` method so it calls `addLogEntry('out', name, payload)` **before** calling `dispatchMfeEvent`.

---

## 4. Local event log — Task 6

### 4.1 Data structure

Create a new type in `src/app/demo/demo-log-entry.ts`:

```ts
export interface DemoLogEntry {
  readonly direction: 'in' | 'out';
  readonly timestamp: Date;
  readonly eventType: string;
  readonly payloadSummary: string;
  readonly rawPayload: unknown;
}
```

Constants in `demo.component.ts`:

```ts
const MAX_LOG_ENTRIES = 25;
```

### 4.2 State

In `DemoComponent`:

```ts
readonly logEntries = signal<DemoLogEntry[]>([]);
```

### 4.3 Helpers

```ts
private addLogEntry(direction: 'in' | 'out', eventType: string, payload: unknown): void {
  const payloadSummary = this.summarizePayload(payload);
  const entry: DemoLogEntry = {
    direction,
    timestamp: new Date(),
    eventType,
    payloadSummary,
    rawPayload: payload,
  };
  this.logEntries.update((entries) => [entry, ...entries].slice(0, MAX_LOG_ENTRIES));
}

private summarizePayload(payload: unknown): string {
  try {
    const text = JSON.stringify(payload);
    return text.length > 120 ? `${text.slice(0, 120)}…` : text;
  } catch {
    return '(payload no serializable)';
  }
}

readonly clearLog = (): void => {
  this.logEntries.set([]);
};
```

### 4.4 UI placement

Render the log **below the view body** in `demo.component.html`:

```html
<section class="cba-demo__log" aria-label="Registro de eventos">
  <cba-card>
    <div cbaCardHeader class="cba-demo__log-header">
      <span class="cba-text-caption">Registro de eventos (últimos {{ MAX_LOG_ENTRIES }})</span>
      <cba-button variant="ghost" size="sm" (cbaClick)="clearLog()">Limpiar log</cba-button>
    </div>

    <ul class="cba-demo__log-list">
      @for (entry of logEntries(); track entry.timestamp.getTime() + entry.eventType) {
        <li class="cba-demo__log-item">
          <span class="cba-demo__log-direction" [attr.data-direction]="entry.direction">
            {{ entry.direction === 'out' ? '→ OUT' : '← IN' }}
          </span>
          <span class="cba-demo__log-time">{{ entry.timestamp | date:'HH:mm:ss.SSS' }}</span>
          <span class="cba-demo__log-type">{{ entry.eventType }}</span>
          <code class="cba-demo__log-summary">{{ entry.payloadSummary }}</code>
        </li>
      } @empty {
        <li class="cba-demo__log-empty">Sin eventos registrados.</li>
      }
    </ul>
  </cba-card>
</section>
```

> Note: `DatePipe` (`| date`) requires `import { DatePipe } from '@angular/common'` in `demo.component.ts` imports array.

### 4.5 Styling

In `demo.component.scss`:

```scss
.cba-demo__log {
  margin-top: var(--cba-space-3);
}

.cba-demo__log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--cba-space-2);
}

.cba-demo__log-list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 240px;
  overflow-y: auto;
}

.cba-demo__log-item {
  display: grid;
  grid-template-columns: auto auto 1fr;
  gap: var(--cba-space-2);
  padding: var(--cba-space-1) 0;
  border-bottom: 1px solid var(--cba-border-subtle);
  font-size: 0.8125rem;
}

.cba-demo__log-summary {
  grid-column: 1 / -1;
  color: var(--cba-text-secondary);
  word-break: break-all;
}

.cba-demo__log-direction[data-direction="out"] {
  color: var(--cba-accent-info);
}

.cba-demo__log-direction[data-direction="in"] {
  color: var(--cba-accent-success);
}

.cba-demo__log-empty {
  color: var(--cba-text-muted);
  font-style: italic;
}
```

### 4.6 Isolation

The log must be stored as a component instance signal (`logEntries`). Do **not** extract it to a service or singleton.

---

## 5. Data payload viewer — Task 7

### 5.1 Data source

`data()` Input already exists. Add a computed:

```ts
readonly dataJson = computed(() => JSON.stringify(this.data() ?? null, null, 2));
```

### 5.2 UI placement

Render the viewer **below the event log** in `demo.component.html`, using `CbaAccordionComponent`:

```html
<section class="cba-demo__payload" aria-label="Payload de datos">
  <cba-accordion [closeOthers]="false">
    <div ngbAccordionItem>
      <div ngbAccordionHeader>
        <button ngbAccordionButton>Payload (data)</button>
      </div>
      <div ngbAccordionCollapse>
        <div ngbAccordionBody>
          <ng-template>
            <pre class="cba-demo__payload-pre"><code>{{ dataJson() }}</code></pre>
          </ng-template>
        </div>
      </div>
    </div>
  </cba-accordion>
</section>
```

### 5.3 Styling

```scss
.cba-demo__payload {
  margin-top: var(--cba-space-3);
}

.cba-demo__payload-pre {
  margin: 0;
  padding: var(--cba-space-2);
  background-color: var(--cba-bg-tertiary);
  color: var(--cba-text-primary);
  border-radius: var(--cba-radius-sm);
  font-size: 0.8125rem;
  max-height: 200px;
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-all;
}
```

### 5.4 Live updates

Because `dataJson` is a `computed()` reading `data()`, the preformatted block updates automatically when the Shell changes the `data` Input.

---

## 6. Shell → MFE event listeners — Task 8

### 6.1 Internal state for Shell-driven values

Add the following `WritableSignal`s to `DemoComponent`:

```ts
readonly shellSize = signal<ModuleSize | undefined>(undefined);
readonly shellIsCollapsed = signal<boolean | undefined>(undefined);
readonly shellIsFullscreen = signal<boolean | undefined>(undefined);
readonly shellWidthPx = signal<number | undefined>(undefined);
readonly shellHeightPx = signal<number | undefined>(undefined);
```

### 6.2 Derived display values

Replace the direct use of `size()`, `isCollapsed()`, `isFullscreen()` in the identity panel with computed fallbacks:

```ts
readonly displaySize = computed(() => this.shellSize() ?? this.size());
readonly displayIsCollapsed = computed(() => this.shellIsCollapsed() ?? this.isCollapsed());
readonly displayIsFullscreen = computed(() => this.shellIsFullscreen() ?? this.isFullscreen());

readonly sizeLabelText = computed(() =>
  this.displaySize() === '100%' ? 'Ancho completo (100 %)' : 'Mitad de ancho (50 %)',
);

readonly dimensionsText = computed(() => {
  const width = this.shellWidthPx();
  const height = this.shellHeightPx();
  return width !== undefined && height !== undefined
    ? `${width} × ${height} px`
    : undefined;
});
```

### 6.3 Filter helper

Replace the generic `createShellHandler` with a stricter factory that also checks `moduleType === 'demo'`:

```ts
private readonly createInstanceFilter = <K extends keyof ShellEventMap>(
  eventName: K,
) => (event: Event): void => {
  if (!isShellEvent(event, eventName)) return;
  const detail = event.detail;
  if (!('instanceId' in detail)) return;
  if (detail.instanceId !== this.instanceId()) return;
  if (detail.moduleType !== this.moduleType()) return;

  this.addLogEntry('in', eventName, detail);
  this.handleShellEvent(eventName, detail);
};
```

### 6.4 Event handlers

```ts
private readonly onModuleState = this.createInstanceFilter(SHELL_EVENTS.MODULE_STATE);

private readonly onVisibilityChanged = this.createInstanceFilter(SHELL_EVENTS.VISIBILITY_CHANGED);

private readonly onThemeChanged = (event: Event): void => {
  if (!isShellEvent(event, SHELL_EVENTS.THEME_CHANGED)) return;
  this.addLogEntry('in', SHELL_EVENTS.THEME_CHANGED, event.detail);
};

private handleShellEvent<K extends keyof ShellEventMap>(
  eventName: K,
  detail: ShellEventMap[K],
): void {
  if (eventName === SHELL_EVENTS.MODULE_STATE) {
    const state = detail as ShellEventMap[typeof SHELL_EVENTS.MODULE_STATE];
    this.shellSize.set(state.size);
    this.shellIsCollapsed.set(state.isCollapsed);
    this.shellIsFullscreen.set(state.isFullscreen);
    this.shellWidthPx.set(state.width);
    this.shellHeightPx.set(state.height);
    return;
  }

  if (eventName === SHELL_EVENTS.VISIBILITY_CHANGED) {
    const visibility = detail as ShellEventMap[typeof SHELL_EVENTS.VISIBILITY_CHANGED];
    // Optional: store a small badge signal if useful for the UI.
    this.lastVisibilityReason.set(visibility.reason ?? 'unknown');
    this.lastVisibilityVisible.set(visibility.visible);
  }
}
```

Add optional visibility display signals if used in the template:

```ts
readonly lastVisibilityReason = signal<string | undefined>(undefined);
readonly lastVisibilityVisible = signal<boolean | undefined>(undefined);
```

### 6.5 Identity panel updates

Update `demo.component.html`:

- Replace `sizeLabelText` source with `displaySize()`.
- Replace `isCollapsed()` with `displayIsCollapsed()`.
- Replace `isFullscreen()` with `displayIsFullscreen()`.
- Add a new row that shows `dimensionsText()` when available:

```html
@if (dimensionsText()) {
  <div class="cba-demo__identity-row">
    <span class="cba-text-caption"><strong>Dimensiones:</strong> {{ dimensionsText() }}</span>
  </div>
}
```

### 6.6 Listener registration

Keep `attachShellListeners()` and `ngOnDestroy()` as-is; the handler references now point to the updated `onModuleState` / `onVisibilityChanged` / `onThemeChanged` methods.

---

## 7. Standalone preview improvements — Task 9

### 7.1 New state in `DemoPreviewComponent`

```ts
readonly isCollapsed = signal(false);
readonly isFullscreen = signal(false);
readonly tableRows = signal(5);
readonly profileJson = signal('{}');
```

### 7.2 Derived `data()`

Update the existing `data` computed to include `tableRows` and parsed `profile`:

```ts
readonly data = computed<Record<string, unknown>>(() => {
  const profile = this.safeParseProfile(this.profileJson());
  return {
    view: this.view(),
    title: this.title() || undefined,
    tableRows: this.tableRows(),
    profile,
  };
});

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

### 7.3 Derived shell-state payload

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

### 7.4 New controls in `demo-preview.component.html`

Add the following fields **inside the existing controls fieldset**, keeping the Spanish labels:

```html
<label class="demo-preview__field">
  <span class="cba-text-small">Filas tabla</span>
  <input type="number" min="0" max="50" [(ngModel)]="tableRows" name="tableRows" />
</label>

<label class="demo-preview__field demo-preview__field--wide">
  <span class="cba-text-small">Profile JSON</span>
  <textarea [(ngModel)]="profileJson" name="profileJson" rows="3"></textarea>
</label>

<div class="demo-preview__toggles">
  <label class="demo-preview__checkbox">
    <input type="checkbox" [(ngModel)]="isCollapsed" name="isCollapsed" />
    <span>Colapsado</span>
  </label>
  <label class="demo-preview__checkbox">
    <input type="checkbox" [(ngModel)]="isFullscreen" name="isFullscreen" />
    <span>Pantalla completa</span>
  </label>
</div>

<div class="demo-preview__simulators">
  <cba-button size="sm" (cbaClick)="emitModuleState()">Enviar shell:module-state</cba-button>
  <cba-button size="sm" variant="secondary" (cbaClick)="emitVisibilityChanged(true)">Visible</cba-button>
  <cba-button size="sm" variant="secondary" (cbaClick)="emitVisibilityChanged(false)">Oculto</cba-button>
</div>
```

### 7.5 Simulator methods

```ts
readonly emitModuleState = (): void => {
  dispatchShellEvent(SHELL_EVENTS.MODULE_STATE, this.moduleStatePayload());
};

readonly emitVisibilityChanged = (visible: boolean): void => {
  dispatchShellEvent(SHELL_EVENTS.VISIBILITY_CHANGED, {
    schemaVersion: SCHEMA_VERSION,
    moduleType: 'demo',
    instanceId: this.instanceId(),
    visible,
    reason: visible ? 'workbench' : 'collapse',
  });
};
```

### 7.6 Capture all outgoing `mfe:*` events

Replace the two existing `mfe:*` listeners with a single loop over `Object.values(MFE_EVENTS)`:

```ts
private readonly mfeEventNames = Object.values(MFE_EVENTS);

private readonly onMfeEvent = (event: Event): void => {
  const customEvent = event as CustomEvent<unknown>;
  console.log('[demo-preview] captured', customEvent.type, customEvent.detail);
};

ngOnInit(): void {
  this.mfeEventNames.forEach((name) => {
    window.addEventListener(name, this.onMfeEvent);
  });
}

ngOnDestroy(): void {
  this.mfeEventNames.forEach((name) => {
    window.removeEventListener(name, this.onMfeEvent);
  });
}
```

### 7.7 Bind new inputs to `cba-demo`

Update the host usage:

```html
<cba-demo
  [moduleType]="'demo'"
  [instanceId]="instanceId()"
  [size]="size()"
  [isCollapsed]="isCollapsed()"
  [isFullscreen]="isFullscreen()"
  [data]="data()" />
```

### 7.8 Preview styling additions

In `demo-preview.component.scss`:

```scss
.demo-preview__field--wide {
  flex: 1 1 100%;
}

.demo-preview__field textarea {
  font-family: monospace;
  font-size: 0.8125rem;
}

.demo-preview__toggles {
  display: flex;
  flex-wrap: wrap;
  gap: var(--cba-space-3);
  align-items: center;
}

.demo-preview__checkbox {
  display: flex;
  align-items: center;
  gap: var(--cba-space-1);
}

.demo-preview__simulators {
  display: flex;
  flex-wrap: wrap;
  gap: var(--cba-space-2);
  align-items: center;
  margin-top: var(--cba-space-2);
}
```

---

## 8. Responsive behaviour

- Action buttons use `flex-wrap: wrap` and a gap of `--cba-space-2`; at `50 %` they naturally flow to multiple rows.
- Each button uses `size="sm"` to reduce horizontal footprint.
- Event log list uses `max-height: 240px` and `overflow-y: auto`; summaries use `word-break: break-all`.
- Data payload `<pre>` uses `white-space: pre-wrap` and `word-break: break-all`.
- Table, create-form, and profile views already handle `50 %` / `100 %` via their existing `[size]` Input.
- Preview controls use `flex-wrap: wrap` so the developer tool remains usable on smaller viewports.

---

## 9. Accessibility

- Action section: `aria-label="Acciones de demostración"`.
- Event log section: `aria-label="Registro de eventos"`.
- Data payload section: `aria-label="Payload de datos"`.
- "Limpiar log" button has a clear Spanish label.
- `CbaAccordionComponent` provides native `<button>` expand/collapse with `aria-expanded` from ng-bootstrap.
- Avoid color-only meaning in log: use `→ OUT` / `← IN` text in addition to color.

---

## 10. Acceptance criteria

- [ ] All 8 action buttons render, remain clickable at `50 %` width, and dispatch the correct `mfe:*` event.
- [ ] Every outgoing event includes `moduleType`, `instanceId`, and `schemaVersion: SCHEMA_VERSION`.
- [ ] The local event log displays the last 25 events, newest first, with direction, timestamp, event type, and payload summary.
- [ ] "Limpiar log" empties the list.
- [ ] The data payload viewer shows pretty-printed JSON of the current `data` Input and updates live.
- [ ] `shell:module-state` events filtered by `instanceId` + `moduleType` update the identity panel and internal dimension signals.
- [ ] `shell:visibility-changed` events are logged and optionally reflected in the identity panel.
- [ ] `DemoPreviewComponent` exposes controls for view, title, tableRows, profile JSON, size, isCollapsed, isFullscreen, and can simulate `shell:module-state` and `shell:visibility-changed`.
- [ ] The preview host captures and console-logs every `mfe:*` event emitted by the embedded `DemoComponent`.
- [ ] `npm run build` succeeds with no errors.

---

## 11. Files expected to change

| File | Change |
|------|--------|
| `src/app/demo/demo.component.ts` | Add signals, dispatch helpers, log helpers, shell state handlers. |
| `src/app/demo/demo.component.html` | Add action bar, event log section, payload viewer section. |
| `src/app/demo/demo.component.scss` | Add styles for actions, log, payload viewer. |
| `src/app/demo/demo-log-entry.ts` | New file: `DemoLogEntry` interface. |
| `src/app/demo-preview/demo-preview.component.ts` | Add simulator state/methods and capture all `mfe:*` events. |
| `src/app/demo-preview/demo-preview.component.html` | Add tableRows, profile JSON, toggles, simulator buttons. |
| `src/app/demo-preview/demo-preview.component.scss` | Add styles for new controls. |

---

## 12. Out of scope (do not implement)

- Real API calls or form validation.
- Unit / e2e tests.
- README / docs updates (covered by Task 10 and handled separately).
- Changes to `@cobranza-apps/mfe-events` or `@cobranza-apps/ui`.
- Module chrome (header, drag handle, collapse, fullscreen, remove) — owned by Shell / UI lib.
