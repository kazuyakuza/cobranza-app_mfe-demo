# Front-end Technical Specification — Task B: Views Implementation (Tasks 1–4)

**Scope:** Implement the `create-form` and `profile` views, polish the existing `table` view, and wire view switching + title behaviour for `mfe-demo` Phase 1.

**Source:** `.agent/todos/20260803/20260803-todo-2.md` Tasks 1–4.

**Out of scope for this spec:** action button bar, event log, data payload viewer, shell event state updates, standalone preview extensions, and documentation (Task Groups C & D).

---

## 1. Target Framework and Version

- **Angular 22.1.2**, standalone components only.
- **TypeScript 5.x** with strict templates.
- **Signals** (`input`, `output`, `computed`, `signal`, `effect`) for all reactive state.
- **ChangeDetectionStrategy.OnPush** on every new component.
- **@cobranza-apps/ui** `^0.19.0` for `cba-button`, `cba-input`, `cba-card`, `cba-badge`.
- **@cobranza-apps/entities** `^0.5.1` used as the reference shape for client/profile fields (`Client.fullName` → *Nombre*, `Client.taxId` → *DNI*, `Client.email`, `Client.phone`, `Client.notes`, `Client.active`).
- **@cobranza-apps/mfe-events** `^0.5.0` for `dispatchMfeEvent`, `MFE_EVENTS`, `SCHEMA_VERSION`, and payload types.

---

## 2. Component Structure

All view sub-components live under `src/app/demo/views/` next to the existing `demo-table/` folder.

```text
src/app/demo/
├── demo.component.ts              (updated)
├── demo.component.html            (updated)
├── demo.component.scss            (updated)
├── demo-config.ts                 (updated: add helper functions)
└── views/
    ├── demo-table/                (minor SCSS polish only)
    ├── demo-create-form/          (new)
    │   ├── demo-create-form.component.ts
    │   ├── demo-create-form.component.html
    │   └── demo-create-form.component.scss
    └── demo-profile/              (new)
        ├── demo-profile.component.ts
        ├── demo-profile.component.html
        └── demo-profile.component.scss
```

### 2.1 `DemoComponent` updates

- Keep all existing Inputs (`moduleType`, `instanceId`, `size`, `isCollapsed`, `isFullscreen`, `data`).
- Keep the identity panel exactly as-is (it already shows `view`).
- Replace the `@switch` placeholders with the new sub-components.
- **Remove** the one-shot `dispatchUpdateHeaderEvent()` call from `ngOnInit()`.
- **Add** a reactive title `effect()` that dispatches `mfe:update-header` on init and on every `data` change.
- **Add** handlers for the create-form outputs that dispatch the required `mfe:*` events.
- Keep file length under 200 lines; move pure helper functions to `demo-config.ts`.

### 2.2 `DemoCreateFormComponent` (new)

Standalone child component for `view === 'create-form'`.

- **Selector:** `app-demo-create-form`
- **Inputs:**
  - `size: '50%' | '100%'` — drives responsive grid.
- **Outputs:**
  - `primaryAction: OutputEmitterRef<void>` — primary button clicked.
  - `secondaryAction: OutputEmitterRef<void>` — cancel/reset button clicked.
- **Internal state:**
  - Five `WritableSignal<string>` fields: `nombre`, `documento`, `email`, `telefono`, `observaciones`.
  - `resetForm()` clears all five signals.
- **Template:** five `cba-input` fields in a CSS Grid, plus two `cba-button` actions.
- **Imports:** `CommonModule`, `FormsModule`, `CbaInputComponent`, `CbaButtonComponent`.

### 2.3 `DemoProfileComponent` (new)

Standalone child component for `view === 'profile'`.

- **Selector:** `app-demo-profile`
- **Inputs:**
  - `profile: Record<string, unknown> | undefined` — optional profile payload from `DemoConfig.profile`.
  - `size: '50%' | '100%'` — future-proofing / reflow hook (display may be identical at both sizes).
- **Internal state:**
  - `fields = computed<DemoProfileField[]>(() => buildFields(profile()))`.
  - `buildFields` falls back to `DEFAULT_PROFILE` when `profile` is missing or not a plain object.
  - Map both Spanish keys (`nombre`, `dni`, `email`, `telefono`, `saldo`, `estado`) and entity-like keys (`fullName`, `taxId`, `phone`, `active`, `notes`) to Spanish labels.
  - Coerce every value to `String(value ?? '')`.
- **Template:** a single `cba-card` with header "Ficha del cliente" + status badge, and a `<dl>` list of label/value pairs.
- **Imports:** `CommonModule`, `CbaCardComponent`, `CbaBadgeComponent`.

### 2.4 `DemoTableComponent` (polish only)

No structural changes. Verify and, if necessary, adjust:

- `rowCount` is already driven from `config().tableRows ?? 5` in `DemoComponent`.
- Add `overflow-x: auto` explicitly to `.table-responsive` in case Bootstrap's global utility is not present.
- Keep the 50 % / 100 % `min-width` rules and size caption.

---

## 3. Type Definitions

### 3.1 `demo-config.ts` additions

Add the following pure helpers to the existing file. Do **not** change the `DemoConfig` interface shape.

```ts
export const VIEW_LABELS: Readonly<Record<DemoViewMode, string>> = {
  table: 'Tabla',
  'create-form': 'Alta',
  profile: 'Perfil',
};

export function viewModeToSpanishLabel(view: DemoViewMode): string {
  return VIEW_LABELS[view] ?? 'Desconocida';
}

export function defaultTitleForView(view: DemoViewMode): string {
  return `Demo – ${viewModeToSpanishLabel(view)}`;
}
```

Also export a small `isPlainObject` helper (currently private) so `DemoProfileComponent` can reuse it, or keep a local copy in the profile component to avoid cross-file coupling.

### 3.2 Local component types

`DemoCreateFormComponent`:

```ts
interface DemoCreateFormModel {
  readonly nombre: string;
  readonly documento: string;
  readonly email: string;
  readonly telefono: string;
  readonly observaciones: string;
}
```

`DemoProfileComponent`:

```ts
interface DemoProfileField {
  readonly label: string;
  readonly value: string;
}

const DEFAULT_PROFILE: Record<string, unknown> = {
  nombre: 'Juan Pérez',
  dni: '30.111.222',
  email: 'juan.perez@example.com',
  saldo: '$ 15.000,00',
  estado: 'Activo',
};

const PROFILE_LABELS: Readonly<Record<string, string>> = {
  // Spanish / brief-example keys
  nombre: 'Nombre',
  dni: 'DNI',
  email: 'Email',
  telefono: 'Teléfono',
  saldo: 'Saldo',
  estado: 'Estado',
  // Entity-like keys (from @cobranza-apps/entities Client)
  fullName: 'Nombre',
  taxId: 'DNI',
  phone: 'Teléfono',
  active: 'Estado',
  notes: 'Observaciones',
};
```

---

## 4. Template Structure

### 4.1 `demo.component.html` `@switch`

Replace the two placeholder `@case` blocks with:

```html
@switch (view()) {
  @case ('table') {
    <app-demo-table [rowCount]="config().tableRows ?? 5" [size]="size()" />
  }
  @case ('create-form') {
    <app-demo-create-form
      [size]="size()"
      (primaryAction)="onCreateFormPrimary()"
      (secondaryAction)="onCreateFormSecondary()" />
  }
  @case ('profile') {
    <app-demo-profile
      [profile]="config().profile"
      [size]="size()" />
  }
}
```

### 4.2 `demo-create-form.component.html`

```html
<div class="demo-create-form" [attr.data-size]="size()">
  <p class="cba-text-caption demo-create-form__hint">
    Formulario de prueba — no realiza envíos reales.
  </p>

  <div class="demo-create-form__grid">
    <cba-input
      label="Nombre"
      placeholder="Ej: Juan Pérez"
      [ngModel]="nombre()"
      (ngModelChange)="nombre.set($event)" />

    <cba-input
      label="Documento / DNI"
      placeholder="Ej: 30.111.222"
      [ngModel]="documento()"
      (ngModelChange)="documento.set($event)" />

    <cba-input
      label="Email"
      type="email"
      placeholder="Ej: juan.perez@example.com"
      [ngModel]="email()"
      (ngModelChange)="email.set($event)" />

    <cba-input
      label="Teléfono"
      type="tel"
      placeholder="Ej: +54 9 11 1234-5678"
      [ngModel]="telefono()"
      (ngModelChange)="telefono.set($event)" />

    <cba-input
      class="demo-create-form__field--wide"
      label="Observaciones"
      placeholder="Notas de prueba"
      [ngModel]="observaciones()"
      (ngModelChange)="observaciones.set($event)" />
  </div>

  <div class="demo-create-form__actions">
    <cba-button variant="primary" (cbaClick)="onPrimary()">
      Guardar (simulado)
    </cba-button>
    <cba-button variant="secondary" (cbaClick)="onSecondary()">
      Reiniciar
    </cba-button>
  </div>
</div>
```

### 4.3 `demo-profile.component.html`

```html
<div class="demo-profile" [attr.data-size]="size()">
  <cba-card>
    <div cbaCardHeader>
      <h2 class="cba-text-heading-md">Ficha del cliente</h2>
      <cba-badge variant="success">Activo</cba-badge>
    </div>

    <dl class="demo-profile__list">
      @for (field of fields(); track field.label) {
        <div class="demo-profile__item">
          <dt class="demo-profile__label">{{ field.label }}</dt>
          <dd class="demo-profile__value">{{ field.value }}</dd>
        </div>
      }
    </dl>
  </cba-card>
</div>
```

---

## 5. SCSS Architecture

Use only `--cba-*` design tokens and existing Bootstrap layout utilities where appropriate. No hard-coded hex values. Keep component styles local to each component file.

### 5.1 `demo-create-form.component.scss`

```scss
:host {
  display: block;
}

.demo-create-form {
  display: block;
}

.demo-create-form__hint {
  margin-bottom: var(--cba-space-3);
  color: var(--cba-text-muted);
}

.demo-create-form__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--cba-space-3);
  margin-bottom: var(--cba-space-3);
}

.demo-create-form__field--wide {
  grid-column: 1 / -1;
}

.demo-create-form[data-size='50%'] .demo-create-form__grid {
  grid-template-columns: 1fr;
}

.demo-create-form__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--cba-space-2);
}
```

### 5.2 `demo-profile.component.scss`

```scss
:host {
  display: block;
}

.demo-profile {
  display: block;
}

.demo-profile__list {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--cba-space-2);
  margin: 0;
}

.demo-profile__item {
  display: flex;
  flex-direction: column;
  gap: var(--cba-space-1);
  padding: var(--cba-space-2) 0;
  border-bottom: 1px solid var(--cba-border-subtle);
}

.demo-profile__item:last-child {
  border-bottom: none;
}

.demo-profile__label {
  color: var(--cba-text-secondary);
  font-size: var(--cba-font-size-caption);
}

.demo-profile__value {
  color: var(--cba-text-primary);
  font-size: var(--cba-font-size-body);
  margin: 0;
}
```

### 5.3 `demo-table.component.scss` polish

Add explicit overflow to the responsive wrapper:

```scss
.table-responsive {
  overflow-x: auto;
}
```

Keep existing `min-width` rules and `[data-size='50%']` override.

### 5.4 Responsive behaviour summary

| View | 100 % layout | 50 % layout |
|------|--------------|-------------|
| `table` | `min-width: 36rem`, horizontal scroll if needed | `min-width: 28rem`, horizontal scroll if needed |
| `create-form` | 2-column grid, wide `Observaciones` | 1-column stacked grid, actions wrap |
| `profile` | single-column card | single-column card (same) |

---

## 6. Event Dispatching Strategy

All `mfe:*` dispatches happen in `DemoComponent` so it has access to `moduleType()` and `instanceId()`.

### 6.1 Form primary action

When `DemoCreateFormComponent.primaryAction` fires:

1. Dispatch `mfe:show-notification` with:
   - `type: 'success'`
   - `message: 'Formulario de prueba enviado (sin API real)'`
   - `schemaVersion: SCHEMA_VERSION`
2. Dispatch `mfe:update-header` with:
   - `title: config().title ?? defaultTitleForView(view())`
   - `status: 'success'`
   - `moduleType`, `instanceId`, `schemaVersion`

### 6.2 Form secondary action

When `DemoCreateFormComponent.secondaryAction` fires:

1. The child component resets its own signals before emitting.
2. `DemoComponent` dispatches `mfe:show-notification` with:
   - `type: 'info'`
   - `message: 'Formulario reiniciado'`
   - `schemaVersion: SCHEMA_VERSION`

### 6.3 Helper methods in `DemoComponent`

```ts
private dispatchUpdateHeader(title: string, status: ModuleStatus): void {
  const payload: UpdateHeaderPayload = {
    schemaVersion: SCHEMA_VERSION,
    moduleType: this.moduleType(),
    instanceId: this.instanceId(),
    title,
    status,
  };
  console.log('[mfe-demo] dispatch', MFE_EVENTS.UPDATE_HEADER, payload);
  dispatchMfeEvent(MFE_EVENTS.UPDATE_HEADER, payload);
}

private dispatchShowNotification(
  type: 'success' | 'warning' | 'error' | 'info',
  message: string,
): void {
  const payload: ShowNotificationPayload = {
    schemaVersion: SCHEMA_VERSION,
    type,
    message,
  };
  console.log('[mfe-demo] dispatch', MFE_EVENTS.SHOW_NOTIFICATION, payload);
  dispatchMfeEvent(MFE_EVENTS.SHOW_NOTIFICATION, payload);
}

readonly onCreateFormPrimary = (): void => {
  this.dispatchShowNotification('success', 'Formulario de prueba enviado (sin API real)');
  this.dispatchUpdateHeader(
    this.config().title ?? defaultTitleForView(this.view()),
    'success',
  );
};

readonly onCreateFormSecondary = (): void => {
  this.dispatchShowNotification('info', 'Formulario reiniciado');
};
```

Import `ShowNotificationPayload`, `UpdateHeaderPayload`, and `ModuleStatus` from `@cobranza-apps/mfe-events`.

---

## 7. Title Behaviour Logic

Replace the one-shot `dispatchUpdateHeaderEvent()` call with a reactive `effect()` that runs on init and on every `data` change.

### 7.1 Algorithm

1. Compute `view = config().view ?? 'table'`.
2. Compute `resolvedTitle = config().title ?? defaultTitleForView(view)`.
3. Compare `resolvedTitle` with a private `previousResolvedTitle`.
4. If different:
   - Call `dispatchUpdateHeader(resolvedTitle, 'loaded')`.
   - Store `previousResolvedTitle = resolvedTitle`.

### 7.2 Implementation sketch

```ts
export class DemoComponent implements OnInit, OnDestroy {
  // ... existing signals

  private previousResolvedTitle = '';

  constructor() {
    effect(() => {
      const config = this.config();
      const view = config.view ?? 'table';
      const resolvedTitle = config.title ?? defaultTitleForView(view);

      if (resolvedTitle !== this.previousResolvedTitle) {
        this.dispatchUpdateHeader(resolvedTitle, 'loaded');
        this.previousResolvedTitle = resolvedTitle;
      }
    });
  }

  ngOnInit(): void {
    this.dispatchReadyEvent();
    this.attachShellListeners();
  }

  // ... rest unchanged
}
```

### 7.3 Behaviour matrix

| `config.title` | `config.view` | Dispatched title |
|----------------|---------------|------------------|
| `'Alta simulada'` | `create-form` | `'Alta simulada'` |
| `undefined` | `table` | `'Demo – Tabla'` |
| `undefined` | `create-form` | `'Demo – Alta'` |
| `undefined` | `profile` | `'Demo – Perfil'` |
| `'Cliente demo'` | `profile` | `'Cliente demo'` |

---

## 8. Dependencies to Import

### 8.1 `DemoComponent`

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
import { CbaBadgeComponent } from '@cobranza-apps/ui';
import {
  dispatchMfeEvent,
  isShellEvent,
  MFE_EVENTS,
  SCHEMA_VERSION,
  SHELL_EVENTS,
  type ModuleReadyPayload,
  type ModuleStatePayload,
  type ModuleStatus,
  type ShowNotificationPayload,
  type ThemeChangedPayload,
  type UpdateHeaderPayload,
  type VisibilityChangedPayload,
} from '@cobranza-apps/mfe-events';

import { coerceDemoConfig, defaultTitleForView } from './demo-config';
import { DemoCreateFormComponent } from './views/demo-create-form/demo-create-form.component';
import { DemoProfileComponent } from './views/demo-profile/demo-profile.component';
import { DemoTableComponent } from './views/demo-table/demo-table.component';
```

### 8.2 `DemoCreateFormComponent`

```ts
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CbaButtonComponent, CbaInputComponent } from '@cobranza-apps/ui';
```

### 8.3 `DemoProfileComponent`

```ts
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { CbaBadgeComponent, CbaCardComponent } from '@cobranza-apps/ui';
```

---

## 9. Accessibility

- Form labels are rendered by `cba-input` (`<label for>` + `aria-describedby`).
- Buttons are native `<button>` elements via `cba-button` (Enter / Space operable).
- Profile card renders `<article>` via `cba-card`; use `<dl>` / `<dt>` / `<dd>` for the key-value list.
- Spanish text only.
- No reliance on colour alone for status (badge text + colour).

---

## 10. Acceptance Criteria

- [ ] `npm run build` succeeds.
- [ ] `DemoConfig.view` drives the body: `table` (default), `create-form`, or `profile`.
- [ ] `create-form` renders five Spanish-labelled fields: Nombre, Documento / DNI, Email, Teléfono, Observaciones.
- [ ] `create-form` primary button dispatches `mfe:show-notification` (success) and `mfe:update-header` (status `success`).
- [ ] `create-form` secondary button resets the form and dispatches `mfe:show-notification` (info).
- [ ] `create-form` layout is usable at 50 % and 100 % width without horizontal overflow.
- [ ] `profile` renders a read-only key-value card from `config.profile` when present.
- [ ] `profile` renders sensible Spanish mock defaults when `config.profile` is absent.
- [ ] `profile` remains readable at 50 % and 100 % width.
- [ ] `table` respects `config.tableRows` and shows no horizontal overflow at 50 %.
- [ ] Identity panel always shows the current `view` value.
- [ ] Header title is dispatched on init and whenever `data` changes.
- [ ] When no explicit `title` is provided, the header title defaults to `Demo – <view-label>`.
- [ ] All new components are standalone, OnPush, and under 200 lines.

---

## 11. Notes for Subsequent Tasks

- Leave the identity panel and `@switch` block in `demo.component.html` above the future action bar / event log / data viewer sections (Task Group C).
- `DemoComponent` should not yet implement the action button bar, event log, or data viewer; only add the title `effect()` and form event handlers described here.
- `DemoPreviewComponent` will be extended in Task Group C; for now it already provides the `view`, `size`, and `title` controls needed to exercise these views.
