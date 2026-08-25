# Implementation Plan — Task C (Phase 1, Tasks 5–9)

**Project:** `mfe-demo`
**Plan file:** `.kilo/plans/20260824-mfe-demo-phase1-taskC.md`
**TODO file:** `.agent/todos/20260803/20260803-todo-2.md` (Tasks 5–9)
**Front-end spec (input):** `.kilo/plans/20260824-mfe-demo-phase1-taskC-frontend-spec.md`
**Target implementer:** JUNIOR developer, 50 % restriction. All structural / architectural / scope decisions are encoded below. Do NOT deviate. If anything is ambiguous, STOP and ask the caller — never guess.

---

## 0. Verified facts (do not re-verify, trust these)

- `@cobranza-apps/mfe-events` exports: `MFE_EVENTS`, `SHELL_EVENTS`, `SCHEMA_VERSION` (literal `1`), `dispatchMfeEvent`, `dispatchShellEvent`, `isMfeEvent`, `isShellEvent`, and the maps `MfeEventMap` / `ShellEventMap` plus types `ModuleSize` (`'50%' | '100%'`), `ModuleStatus`, `ModuleIdentity`.
- `MFE_EVENTS` members: `REQUEST_ADD_MODULE`, `REQUEST_FULLSCREEN`, `REQUEST_REMOVE`, `UPDATE_HEADER`, `SHOW_NOTIFICATION`, `MODULE_READY`, `MODULE_ERROR`.
- `SHELL_EVENTS` members: `MODULE_STATE`, `THEME_CHANGED`, `VISIBILITY_CHANGED`.
- Payloads (from `payloads.d.ts`):
  - `ShowNotificationPayload` = `{ type, message, title?, duration?, schemaVersion }` — **NO `moduleType` / `instanceId`** (library contract). This is the ONLY outgoing event without module identity; all other `mfe:*` events include `moduleType` + `instanceId`.
  - `RequestAddModulePayload` = `{ moduleType, title?, initialData?, schemaVersion }` — **NO `instanceId`** (it describes a *new* instance, not the current one). This is expected and correct.
  - `ModuleStatePayload` = `{ moduleType, instanceId, size, width, height, isCollapsed, isFullscreen, dragState?, previewMode?, schemaVersion }`.
  - `VisibilityChangedPayload` = `{ moduleType, instanceId, visible, reason?, schemaVersion }`.
- `@cobranza-apps/ui` exports used: `CbaButtonComponent` (`<cba-button>`, output `cbaClick`, inputs `variant`, `size`, `block`), `CbaBadgeComponent`, `CbaCardComponent` (`<cba-card>`, content projection slots `[cbaCardHeader]`, default, `[cbaCardFooter]` — these are plain attributes, **no extra import needed**), `CbaAccordionComponent` (`<cba-accordion>`, input `closeOthers`).
- `CbaButtonVariant` = `'primary' | 'secondary' | 'ghost' | 'danger' | 'success'`. **There is NO `'warning'` button variant.** The front-end spec §3.3 button #3 ("Notificación advertencia") requests `variant="warning"` — this is **invalid**. Correction encoded in §3 below: use `variant="secondary"` for that button.
- `CbaButtonSize` = `'sm' | 'md'`.
- `@ng-bootstrap/ng-bootstrap` v21 is installed. `NgbAccordionModule` exports `NgbAccordionDirective`, `NgbAccordionItem` (`[ngbAccordionItem]`), `NgbAccordionHeader` (`[ngbAccordionHeader]`), `NgbAccordionButton` (`button[ngbAccordionButton]`), `NgbAccordionCollapse` (`[ngbAccordionCollapse]`), `NgbAccordionBody` (`[ngbAccordionBody]`).
- No test script exists (`package.json` only has `ng`, `serve`, `build`). No unit tests to write/run. Verification = `npm run build`.
- Branch / version / git push are **NOT** part of this step (4.1b). This plan is plan-only output. Do NOT run git commands, do NOT create branches, do NOT bump version.

---

## 1. High-level approach

Implement Tasks 5–9 by extending the existing `DemoComponent` and `DemoPreviewComponent` and adding four small instance-owned helper modules. The front-end spec is followed verbatim **except** the single button-variant correction noted in §0/§3.

To satisfy `.kilo/rules/max-lines-per-file.md` (≤ 200 lines, ideally ≤ 125 effective, for `src/**/*.ts`), logic is extracted into four new cohesive files so `demo.component.ts` stays thin:

1. `src/app/demo/demo-log-entry.ts` — pure types + constants + `summarizePayload` (no Angular).
2. `src/app/demo/demo-event-log.ts` — `DemoEventLog` class: instance-owned log signal + `add` / `clear`.
3. `src/app/demo/demo-shell-state.ts` — `DemoShellState` class: instance-owned shell-driven signals + display computed values + apply methods.
4. `src/app/demo/demo-dispatcher.ts` — `DemoDispatcher` class: owns all `mfe:*` dispatch (including the header-title demo cycling) and records every outgoing event in the log.

`DemoComponent` becomes a thin orchestrator: owns the three helper instances, the shell-event filter, the create-form output handlers, and the `dataJson` computed. `DemoPreviewComponent` is extended in place (it stays under the line limit, no extraction needed).

Files changed:
| File | Action |
|------|--------|
| `src/app/demo/demo-log-entry.ts` | NEW |
| `src/app/demo/demo-event-log.ts` | NEW |
| `src/app/demo/demo-shell-state.ts` | NEW |
| `src/app/demo/demo-dispatcher.ts` | NEW |
| `src/app/demo/demo.component.ts` | MODIFY (rewrite imports, fields, constructor, shell handlers; remove inline dispatch helpers) |
| `src/app/demo/demo.component.html` | MODIFY (identity panel updates, action bar, event log section, payload viewer section) |
| `src/app/demo/demo.component.scss` | MODIFY (add styles for actions, log, payload) |
| `src/app/demo-preview/demo-preview.component.ts` | MODIFY (add simulator state/methods, capture all `mfe:*`) |
| `src/app/demo-preview/demo-preview.component.html` | MODIFY (add tableRows, profile JSON, toggles, simulator buttons, bind new inputs) |
| `src/app/demo-preview/demo-preview.component.scss` | MODIFY (add styles for new controls) |

---

## 2. Pre-implementation checklist (implementer runs these first)

1. `git status` — confirm working tree is clean (or only has expected in-progress files). Do NOT commit/branch (restricted to workflow step 2).
2. Read the four existing files to confirm they match §0: `src/app/demo/demo.component.ts`, `demo.component.html`, `demo.component.scss`, and `src/app/demo-preview/demo-preview.component.ts`, `demo-preview.component.html`, `demo-preview.component.scss`.
3. Confirm `src/app/demo/views/` sub-components exist (`demo-table`, `demo-create-form`, `demo-profile`) — they do (see `project-structure.md`); do NOT modify them.

---

## 3. Task 5 — Action buttons (full set)

### 3.1 New file `src/app/demo/demo-dispatcher.ts`

Create exactly this file (real newlines, not `\n`):

```ts
import { type Signal, signal } from '@angular/core';
import {
  dispatchMfeEvent,
  MFE_EVENTS,
  SCHEMA_VERSION,
  type MfeEventMap,
  type ModuleStatus,
} from '@cobranza-apps/mfe-events';

import { DemoEventLog } from './demo-event-log';

interface HeaderDemo {
  readonly title: string;
  readonly status: ModuleStatus;
}

const HEADER_DEMOS: ReadonlyArray<HeaderDemo> = [
  { title: 'Demo – Título A', status: 'loaded' },
  { title: 'Demo – Título B', status: 'success' },
  { title: 'Demo – Título C', status: 'warning' },
];

export class DemoDispatcher {
  private readonly headerDemoIndex = signal(0);

  constructor(
    private readonly moduleType: Signal<string>,
    private readonly instanceId: Signal<string>,
    private readonly eventLog: DemoEventLog,
  ) {}

  ready(): void {
    this.send(MFE_EVENTS.MODULE_READY, {
      schemaVersion: SCHEMA_VERSION,
      moduleType: this.moduleType(),
      instanceId: this.instanceId(),
    });
  }

  updateHeader(title: string, status: ModuleStatus): void {
    this.send(MFE_EVENTS.UPDATE_HEADER, {
      schemaVersion: SCHEMA_VERSION,
      moduleType: this.moduleType(),
      instanceId: this.instanceId(),
      title,
      status,
    });
  }

  showNotification(type: 'success' | 'warning' | 'error' | 'info', message: string): void {
    this.send(MFE_EVENTS.SHOW_NOTIFICATION, {
      schemaVersion: SCHEMA_VERSION,
      type,
      message,
    });
  }

  requestFullscreen(): void {
    this.send(MFE_EVENTS.REQUEST_FULLSCREEN, {
      schemaVersion: SCHEMA_VERSION,
      moduleType: this.moduleType(),
      instanceId: this.instanceId(),
    });
  }

  requestRemove(): void {
    this.send(MFE_EVENTS.REQUEST_REMOVE, {
      schemaVersion: SCHEMA_VERSION,
      moduleType: this.moduleType(),
      instanceId: this.instanceId(),
    });
  }

  requestAddModule(): void {
    this.send(MFE_EVENTS.REQUEST_ADD_MODULE, {
      schemaVersion: SCHEMA_VERSION,
      moduleType: 'demo',
      title: 'Nueva instancia demo',
      initialData: { view: 'table' },
    });
  }

  moduleError(): void {
    this.send(MFE_EVENTS.MODULE_ERROR, {
      schemaVersion: SCHEMA_VERSION,
      moduleType: this.moduleType(),
      instanceId: this.instanceId(),
      message: 'Error simulado desde mfe-demo',
      code: 'DEMO_ERROR',
    });
  }

  cycleHeaderDemo(): void {
    const nextIndex = (this.headerDemoIndex() + 1) % HEADER_DEMOS.length;
    this.headerDemoIndex.set(nextIndex);
    const demo = HEADER_DEMOS[nextIndex];
    this.updateHeader(demo.title, demo.status);
  }

  private send<K extends keyof MfeEventMap>(name: K, payload: MfeEventMap[K]): void {
    this.eventLog.add('out', name, payload);
    console.log('[mfe-demo] dispatch', name, payload);
    dispatchMfeEvent(name, payload);
  }
}
```

Notes:
- `showNotification` intentionally omits `moduleType`/`instanceId` (library payload has no such fields — see §0).
- `requestAddModule` intentionally uses `moduleType: 'demo'` and omits `instanceId` (it describes a new instance — see §0).
- Every dispatch routes through `send`, which records an `'out'` log entry before `dispatchMfeEvent` (spec §3.6).

### 3.2 Action bar markup (added to `demo.component.html`)

Between the identity `</header>` and the `@switch (view())` body, insert:

```html
<section class="cba-demo__actions" aria-label="Acciones de demostración">
  <cba-button size="sm" variant="primary" (cbaClick)="dispatcher.cycleHeaderDemo()">Actualizar título</cba-button>
  <cba-button size="sm" variant="success" (cbaClick)="dispatcher.showNotification('success', 'Notificación de éxito')">Notificación éxito</cba-button>
  <cba-button size="sm" variant="secondary" (cbaClick)="dispatcher.showNotification('warning', 'Notificación de advertencia')">Notificación advertencia</cba-button>
  <cba-button size="sm" variant="danger" (cbaClick)="dispatcher.showNotification('error', 'Notificación de error')">Notificación error</cba-button>
  <cba-button size="sm" variant="secondary" (cbaClick)="dispatcher.requestFullscreen()">Pantalla completa</cba-button>
  <cba-button size="sm" variant="danger" (cbaClick)="dispatcher.requestRemove()">Quitar módulo</cba-button>
  <cba-button size="sm" variant="secondary" (cbaClick)="dispatcher.requestAddModule()">Agregar instancia</cba-button>
  <cba-button size="sm" variant="danger" (cbaClick)="dispatcher.moduleError()">Simular error</cba-button>
</section>
```

> Variant correction: button #3 uses `secondary` (not `warning` — invalid variant per §0).

---

## 4. Task 6 — Local event log

### 4.1 New file `src/app/demo/demo-log-entry.ts`

```ts
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
```

### 4.2 New file `src/app/demo/demo-event-log.ts`

```ts
import { signal } from '@angular/core';

import { type DemoLogEntry, MAX_LOG_ENTRIES, summarizePayload } from './demo-log-entry';

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

Instance-owned (constructed per `DemoComponent` instance → isolation guaranteed; no singleton/service).

### 4.3 Log markup (added to `demo.component.html`, below the `@switch` body)

```html
<section class="cba-demo__log" aria-label="Registro de eventos">
  <cba-card>
    <div cbaCardHeader class="cba-demo__log-header">
      <span class="cba-text-caption">Registro de eventos (últimos {{ maxLogEntries }})</span>
      <cba-button variant="ghost" size="sm" (cbaClick)="eventLog.clear()">Limpiar log</cba-button>
    </div>

    <ul class="cba-demo__log-list">
      @for (entry of eventLog.entries(); track entry.timestamp.getTime() + entry.eventType) {
        <li class="cba-demo__log-item">
          <span class="cba-demo__log-direction" [attr.data-direction]="entry.direction">
            {{ entry.direction === 'out' ? '→ OUT' : '← IN' }}
          </span>
          <span class="cba-demo__log-time">{{ entry.timestamp | date: 'HH:mm:ss.SSS' }}</span>
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

`maxLogEntries` is a public readonly field on `DemoComponent` equal to `MAX_LOG_ENTRIES` (so the template can render the number without importing the const directly).

---

## 5. Task 7 — Data payload viewer

### 5.1 Computed in `DemoComponent`

```ts
readonly dataJson = computed(() => JSON.stringify(this.data() ?? null, null, 2));
```

### 5.2 Payload markup (added to `demo.component.html`, below the log section)

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

Requires `CbaAccordionComponent` + `NgbAccordionModule` in the component `imports` array (see §7.1).

---

## 6. Task 8 — Shell → MFE event listeners

### 6.1 New file `src/app/demo/demo-shell-state.ts`

```ts
import { computed, type Signal, signal, type WritableSignal } from '@angular/core';
import { type ModuleSize } from '@cobranza-apps/mfe-events';

export class DemoShellState {
  readonly size: WritableSignal<ModuleSize | undefined> = signal(undefined);
  readonly isCollapsed: WritableSignal<boolean | undefined> = signal(undefined);
  readonly isFullscreen: WritableSignal<boolean | undefined> = signal(undefined);
  readonly widthPx: WritableSignal<number | undefined> = signal(undefined);
  readonly heightPx: WritableSignal<number | undefined> = signal(undefined);
  readonly visibilityVisible: WritableSignal<boolean | undefined> = signal(undefined);
  readonly visibilityReason: WritableSignal<string | undefined> = signal(undefined);

  constructor(
    private readonly inputSize: Signal<ModuleSize>,
    private readonly inputIsCollapsed: Signal<boolean>,
    private readonly inputIsFullscreen: Signal<boolean>,
  ) {}

  readonly displaySize = computed(() => this.size() ?? this.inputSize());
  readonly displayIsCollapsed = computed(() => this.isCollapsed() ?? this.inputIsCollapsed());
  readonly displayIsFullscreen = computed(() => this.isFullscreen() ?? this.inputIsFullscreen());

  readonly sizeLabelText = computed(() =>
    this.displaySize() === '100%' ? 'Ancho completo (100 %)' : 'Mitad de ancho (50 %)',
  );

  readonly dimensionsText = computed(() => {
    const width = this.widthPx();
    const height = this.heightPx();
    return width !== undefined && height !== undefined ? `${width} × ${height} px` : undefined;
  });

  applyModuleState(state: {
    size: ModuleSize;
    width: number;
    height: number;
    isCollapsed: boolean;
    isFullscreen: boolean;
  }): void {
    this.size.set(state.size);
    this.widthPx.set(state.width);
    this.heightPx.set(state.height);
    this.isCollapsed.set(state.isCollapsed);
    this.isFullscreen.set(state.isFullscreen);
  }

  applyVisibility(payload: { visible: boolean; reason?: string }): void {
    this.visibilityVisible.set(payload.visible);
    this.visibilityReason.set(payload.reason ?? 'unknown');
  }
}
```

### 6.2 Identity panel updates (`demo.component.html`)

In the existing identity `<header>`:
- Replace `{{ sizeLabelText() }}` → keep as is (now sourced from `shellState.sizeLabelText()`; see §7.3 — the component exposes `sizeLabelText` as a computed delegating to `shellState`).
- Replace `isCollapsed()` → `shellState.displayIsCollapsed()`.
- Replace `isFullscreen()` → `shellState.displayIsFullscreen()`.
- Add a dimensions row (after the size/collapse/fullscreen row), only when available:

```html
@if (shellState.dimensionsText()) {
  <div class="cba-demo__identity-row">
    <span class="cba-text-caption">
      <strong>Dimensiones:</strong> {{ shellState.dimensionsText() }}
    </span>
  </div>
}
```

- Add a visibility row (after dimensions), only when a visibility event has been received:

```html
@if (shellState.visibilityVisible() !== undefined) {
  <div class="cba-demo__identity-row">
    <span class="cba-text-caption">
      <strong>Visibilidad:</strong>
      {{ shellState.visibilityVisible() ? 'Visible' : 'Oculto' }}
      ({{ shellState.visibilityReason() }})
    </span>
  </div>
}
```

### 6.3 Shell filter + handlers (in `DemoComponent`, see §7.3)

The component keeps `createInstanceFilter`, `onModuleState`, `onVisibilityChanged`, `onThemeChanged`, `handleShellEvent`, `attachShellListeners`, `ngOnDestroy`. Detail in §7.3.

---

## 7. `demo.component.ts` — full rewrite specification

### 7.1 Imports

Replace the import block with:

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
import { DatePipe } from '@angular/common';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import {
  CbaAccordionComponent,
  CbaBadgeComponent,
  CbaButtonComponent,
  CbaCardComponent,
} from '@cobranza-apps/ui';
import {
  isShellEvent,
  MFE_EVENTS,
  SHELL_EVENTS,
  type ModuleSize,
  type ShellEventMap,
} from '@cobranza-apps/mfe-events';

import { coerceDemoConfig, defaultTitleForView, viewModeToSpanishLabel } from './demo-config';
import { DemoDispatcher } from './demo-dispatcher';
import { DemoEventLog } from './demo-event-log';
import { MAX_LOG_ENTRIES } from './demo-log-entry';
import { DemoShellState } from './demo-shell-state';
import { hashString, truncateInstanceId } from './demo-utils';
import { DemoCreateFormComponent } from './views/demo-create-form/demo-create-form.component';
import { DemoProfileComponent } from './views/demo-profile/demo-profile.component';
import { DemoTableComponent } from './views/demo-table/demo-table.component';
```

Notes:
- `dispatchMfeEvent`, `SCHEMA_VERSION`, `MfeEventMap`, `ModuleStatus`, `isMfeEvent`, `dispatchShellEvent` are **no longer imported here** — they live in `DemoDispatcher`. Remove them.
- `DatePipe` is required by the `| date` pipe in the log template.

### 7.2 `@Component` decorator

```ts
@Component({
  selector: 'cba-demo',
  standalone: true,
  imports: [
    CbaAccordionComponent,
    CbaBadgeComponent,
    CbaButtonComponent,
    CbaCardComponent,
    DatePipe,
    DemoCreateFormComponent,
    DemoProfileComponent,
    DemoTableComponent,
    NgbAccordionModule,
  ],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
```

### 7.3 Class body (replace the entire current class body)

Keep the existing JSDoc comment above the class (update the "Shell events" bullet to mention instance + moduleType filtering and event log). The class body must be exactly this structure (order matters for readability):

```ts
export class DemoComponent implements OnInit, OnDestroy {
  readonly moduleType = input.required<string>();
  readonly instanceId = input.required<string>();
  readonly size = input.required<ModuleSize>();
  readonly isCollapsed = input.required<boolean>();
  readonly isFullscreen = input.required<boolean>();
  readonly data = input<Record<string, unknown> | undefined>(undefined);

  readonly config = computed(() => coerceDemoConfig(this.data()));
  readonly view = computed(() => this.config().view ?? 'table');
  readonly viewLabel = computed(() => viewModeToSpanishLabel(this.view()));
  readonly resolvedTitle = computed(() =>
    this.config().title ?? defaultTitleForView(this.view()),
  );

  readonly shortInstanceId = computed(() => truncateInstanceId(this.instanceId()));
  readonly instanceHue = computed(() => hashString(this.instanceId()) % 360);
  readonly instanceColorStyle = computed(() => ({
    '--demo-instance-marker': `hsl(${this.instanceHue()}, 65%, 45%)`,
  }));

  readonly dataJson = computed(() => JSON.stringify(this.data() ?? null, null, 2));

  readonly headerEventName = MFE_EVENTS.UPDATE_HEADER;
  readonly maxLogEntries = MAX_LOG_ENTRIES;

  readonly eventLog = new DemoEventLog();
  readonly shellState = new DemoShellState(this.size, this.isCollapsed, this.isFullscreen);
  readonly dispatcher = new DemoDispatcher(this.moduleType, this.instanceId, this.eventLog);

  readonly sizeLabelText = computed(() => this.shellState.sizeLabelText());

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

  readonly onCreateFormPrimary = (): void => {
    this.dispatcher.showNotification('success', 'Formulario de prueba enviado (sin API real)');
    this.dispatcher.updateHeader(this.resolvedTitle(), 'success');
  };

  readonly onCreateFormSecondary = (): void => {
    this.dispatcher.showNotification('info', 'Formulario reiniciado');
  };

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

  private readonly onThemeChanged = (event: Event): void => {
    if (!isShellEvent(event, SHELL_EVENTS.THEME_CHANGED)) return;
    this.eventLog.add('in', SHELL_EVENTS.THEME_CHANGED, event.detail);
  };

  ngOnInit(): void {
    this.dispatcher.ready();
    this.attachShellListeners();
  }

  ngOnDestroy(): void {
    window.removeEventListener(SHELL_EVENTS.MODULE_STATE, this.onModuleState);
    window.removeEventListener(SHELL_EVENTS.VISIBILITY_CHANGED, this.onVisibilityChanged);
    window.removeEventListener(SHELL_EVENTS.THEME_CHANGED, this.onThemeChanged);
  }

  private handleShellEvent<K extends keyof ShellEventMap>(
    eventName: K,
    detail: ShellEventMap[K],
  ): void {
    if (eventName === SHELL_EVENTS.MODULE_STATE) {
      this.shellState.applyModuleState(detail as ShellEventMap[typeof SHELL_EVENTS.MODULE_STATE]);
      return;
    }
    if (eventName === SHELL_EVENTS.VISIBILITY_CHANGED) {
      this.shellState.applyVisibility(detail as ShellEventMap[typeof SHELL_EVENTS.VISIBILITY_CHANGED]);
    }
  }

  private attachShellListeners(): void {
    window.addEventListener(SHELL_EVENTS.MODULE_STATE, this.onModuleState);
    window.addEventListener(SHELL_EVENTS.VISIBILITY_CHANGED, this.onVisibilityChanged);
    window.addEventListener(SHELL_EVENTS.THEME_CHANGED, this.onThemeChanged);
  }
}
```

Notes / decisions encoded:
- The previous `dispatchReadyEvent`, `dispatchUpdateHeader`, `dispatchShowNotification`, and generic `dispatch` methods are **removed** — replaced by `DemoDispatcher`. Do not leave them commented out (no-commented-code rule).
- `sizeLabelText` is kept as a thin computed on the component (delegating to `shellState`) so the existing template line `{{ sizeLabelText() }}` keeps working unchanged.
- `onThemeChanged` no longer filters by `instanceId` (theme is global) but still logs the incoming event.
- `createInstanceFilter` filters by both `instanceId` and `moduleType === this.moduleType()` (spec §6.3).
- This file will be ~130 lines total, ~95 effective — within `max-lines-per-file.md`.

### 7.4 `demo.component.html` — full structure order

Final order of top-level children inside `<section class="cba-demo" ...>`:
1. `<header class="cba-demo__identity">` (existing, with §6.2 modifications: collapse/fullscreen now read `shellState.displayIsCollapsed()` / `shellState.displayIsFullscreen()`; add dimensions + visibility rows).
2. `<section class="cba-demo__actions">` (§3.2).
3. `@switch (view()) { ... }` (existing body — unchanged).
4. `<section class="cba-demo__log">` (§4.3).
5. `<section class="cba-demo__payload">` (§5.2).

Keep the existing `@switch` body (table / create-form / profile) exactly as-is.

### 7.5 `demo.component.scss` — additions

Append (do not remove existing rules):

```scss
.cba-demo__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--cba-space-2);
  align-items: center;
  margin-bottom: var(--cba-space-3);
}

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

If any of these CSS custom properties (`--cba-accent-info`, `--cba-accent-success`, `--cba-bg-tertiary`, `--cba-text-secondary`, `--cba-text-muted`, `--cba-border-subtle`, `--cba-radius-sm`, `--cba-space-*`) do not exist in the UI theme, leave them as-is — missing tokens degrade gracefully to `unset`/inherit. Do NOT invent replacement tokens.

---

## 8. Task 9 — Standalone preview improvements

### 8.1 `demo-preview.component.ts` — imports

Replace the import block with:

```ts
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CbaButtonComponent } from '@cobranza-apps/ui';
import {
  dispatchShellEvent,
  MFE_EVENTS,
  SCHEMA_VERSION,
  SHELL_EVENTS,
  type ModuleSize,
} from '@cobranza-apps/mfe-events';

import { DemoComponent } from '../demo/demo.component';
import { type DemoViewMode } from '../demo/demo-config';
```

Notes:
- `isMfeEvent` is removed (no longer used — the new capture loop logs all events without guarding).
- `CbaButtonComponent` is added (simulator buttons).
- `dispatchShellEvent`, `SCHEMA_VERSION`, `SHELL_EVENTS` are added (simulators).

### 8.2 `demo-preview.component.ts` — class body

Replace the entire class body with:

```ts
const MOCK_INSTANCE_ID = 'demo-preview-0001';
const MOCK_TABLE_ROWS = 5;

@Component({
  selector: 'app-demo-preview',
  standalone: true,
  imports: [CbaButtonComponent, DemoComponent, FormsModule],
  templateUrl: './demo-preview.component.html',
  styleUrl: './demo-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * (Keep the existing JSDoc; append one line: "Also simulates shell:module-state
 * and shell:visibility-changed and captures every outgoing mfe:* event.")
 */
export class DemoPreviewComponent implements OnInit, OnDestroy {
  readonly instanceId = signal(MOCK_INSTANCE_ID);
  readonly size = signal<ModuleSize>('100%');
  readonly view = signal<DemoViewMode>('table');
  readonly title = signal<string>('');
  readonly isCollapsed = signal(false);
  readonly isFullscreen = signal(false);
  readonly tableRows = signal(MOCK_TABLE_ROWS);
  readonly profileJson = signal('{}');

  readonly data = computed<Record<string, unknown>>(() => ({
    view: this.view(),
    title: this.title() || undefined,
    tableRows: this.tableRows(),
    profile: this.safeParseProfile(this.profileJson()),
  }));

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

  private readonly mfeEventNames = Object.values(MFE_EVENTS);

  private readonly onMfeEvent = (event: Event): void => {
    const customEvent = event as CustomEvent<unknown>;
    console.log('[demo-preview] captured', customEvent.type, customEvent.detail);
  };

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

  ngOnInit(): void {
    this.mfeEventNames.forEach((name) => window.addEventListener(name, this.onMfeEvent));
  }

  ngOnDestroy(): void {
    this.mfeEventNames.forEach((name) => window.removeEventListener(name, this.onMfeEvent));
  }

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
}
```

Notes / decisions:
- `MOCK_TABLE_ROWS` stays as a named constant (used as the `tableRows` signal default) — do not inline the magic `5`.
- The two previous explicit listeners (`onModuleReady`, `onUpdateHeader`) are **removed** and replaced by the loop over `Object.values(MFE_EVENTS)` (spec §7.6).
- `emitVisibilityChanged` takes one param (≤ 2 args rule satisfied).

### 8.3 `demo-preview.component.html`

Keep the existing `<h1>`, `<p>`, and the opening `<fieldset class="demo-preview__controls">` with the existing size / view / title fields. **Append** the following new fields inside the same `<fieldset>` (before `</fieldset>`):

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

Then **replace** the existing `<cba-demo ... />` host usage with:

```html
<cba-demo
  [moduleType]="'demo'"
  [instanceId]="instanceId()"
  [size]="size()"
  [isCollapsed]="isCollapsed()"
  [isFullscreen]="isFullscreen()"
  [data]="data()" />
```

(Only difference: `isCollapsed` / `isFullscreen` now bind to the new signals instead of hardcoded `false`.)

### 8.4 `demo-preview.component.scss` — additions

Append:

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

## 9. Documentation (Task 10) — OUT OF SCOPE for this plan

Task 10 (documentation update) is a separate task in the TODO file and is handled by the docs-specialist in workflow step 4.4. The implementer MUST NOT create/modify any `docs/` or `README.md` files in this step.

---

## 10. Build / verification steps (implementer runs after all edits)

1. Run `npm run build` from the project root. It MUST succeed with no errors.
2. If the build fails:
   - Read the error. If it is a typo / import path / type mismatch within the files this plan touches → fix it directly (this is a minor local detail within scope).
   - If the error is in `@cobranza-apps/ui`, `@cobranza-apps/mfe-events`, or any file NOT listed in §1 → STOP and report to the caller. Do NOT modify out-of-scope files.
3. Do NOT run `npm run serve` (long-running; not required for verification).
4. Do NOT run any unit tests (none exist).
5. Do NOT commit, branch, or push (restricted to other workflow steps).

---

## 11. Acceptance check (implementer self-check before signalling done)

- [ ] `demo-log-entry.ts`, `demo-event-log.ts`, `demo-shell-state.ts`, `demo-dispatcher.ts` exist with the exact content in §3.1/§4.1/§4.2/§6.1.
- [ ] `demo.component.ts` imports match §7.1; no `dispatchMfeEvent` / `SCHEMA_VERSION` / `MfeEventMap` / `ModuleStatus` / `isMfeEvent` imports remain.
- [ ] `demo.component.ts` class body matches §7.3; old `dispatch*` private methods removed (not commented).
- [ ] `demo.component.html` has the 5 sections in §7.4 order; 8 action buttons present; button #3 uses `variant="secondary"`.
- [ ] `demo.component.scss` has the new rules in §7.5; existing rules preserved.
- [ ] `demo-preview.component.ts` imports match §8.1; class body matches §8.2; `isMfeEvent` import removed.
- [ ] `demo-preview.component.html` has new fields inside the existing fieldset and the updated `<cba-demo>` binding.
- [ ] `demo-preview.component.scss` has the new rules in §8.4.
- [ ] `npm run build` succeeds.
- [ ] No files outside §1 were modified. No `docs/` / `README.md` changes. No git operations.

---

## 12. Summary to return to caller

The implementer MUST return:
- Plan path: `.kilo/plans/20260824-mfe-demo-phase1-taskC.md`
- A short summary: "Plan created for Tasks 5–9. Four new helper files (`demo-log-entry.ts`, `demo-event-log.ts`, `demo-shell-state.ts`, `demo-dispatcher.ts`) extract logic to keep `demo.component.ts` under the 200-line limit. One correction to the front-end spec: button #3 variant changed from invalid `warning` to `secondary`. No git/build actions taken (plan-only step)."
