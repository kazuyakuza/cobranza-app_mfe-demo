# Implementation Plan — Task B: Views Implementation (Tasks 1–4)

**Source TODO:** `.agent/todos/20260803/20260803-todo-2.md` — Tasks 1–4.
**Front-end spec:** `.kilo/plans/20260824-mfe-demo-phase1-taskB-frontend-spec.md`.
**Scope:** Implement `create-form` and `profile` views, polish `table` view, wire view switching + title behaviour.
**Out of scope:** action button bar, event log, data payload viewer, shell event state updates, standalone preview extensions, documentation (those are Task Groups C & D).

---

## 0. Preconditions (implementer must verify before editing)

1. Read the front-end spec file in full: `.kilo/plans/20260824-mfe-demo-phase1-taskB-frontend-spec.md`.
2. Confirm these files exist and match the spec's assumptions:
   - `src/app/demo/demo.component.ts` (172 lines) — has `@switch (view())` with two placeholder `@case` blocks for `create-form` and `profile`.
   - `src/app/demo/demo.component.html` (62 lines) — identity panel + `@switch`.
   - `src/app/demo/demo-config.ts` (65 lines) — `DemoViewMode`, `DemoConfig`, `coerceDemoConfig`, private `isPlainObject`.
   - `src/app/demo/views/demo-table/` — existing table sub-component.
3. Confirm `@cobranza-apps/ui` exports: `CbaButtonComponent`, `CbaInputComponent`, `CbaCardComponent`, `CbaBadgeComponent` (verified present in `node_modules/@cobranza-apps/ui/types/cobranza-apps-ui.d.ts`).
4. Confirm `@cobranza-apps/mfe-events` exports: `dispatchMfeEvent`, `MFE_EVENTS`, `SCHEMA_VERSION`, `type ShowNotificationPayload`, `type UpdateHeaderPayload`, `type ModuleStatus` (verified in `dist/`).
5. Confirm design tokens exist: `--cba-space-1/2/3`, `--cba-text-muted/secondary/primary`, `--cba-border-subtle`, `--cba-font-size-caption/body`, `--cba-bg-secondary`, `--cba-hover`, `--cba-radius-md` (verified in `theme/_variables.scss`). Utility classes `cba-text-caption`, `cba-text-heading-md`, `cba-text-body`, `cba-text-small` exist (verified in `theme/_utilities.scss`).
6. If any precondition fails, STOP and return a question to the caller. Do NOT proceed.

---

## 1. High-Level Approach

Five ordered phases, each committed separately:

1. **demo-config.ts additions** — export `VIEW_LABELS`, `viewModeToSpanishLabel`, `defaultTitleForView`, and `isPlainObject` (make it public). No behaviour change.
2. **DemoCreateFormComponent** — new standalone sub-component under `views/demo-create-form/`.
3. **DemoProfileComponent** — new standalone sub-component under `views/demo-profile/`.
4. **DemoComponent wiring** — replace placeholders in the `@switch`, replace one-shot header dispatch with a reactive `effect()`, add form output handlers, update imports.
5. **DemoTableComponent polish** — add explicit `overflow-x: auto` to `.table-responsive`.
6. **Build verification** — `npm run build` must succeed.
7. **Update `.agent/project-structure.md`** — add the two new view folders.

No unit/e2e test suite exists in this project (TODO §"out of scope": unit/e2e optional, do not block). No git branch actions in this step (branch handled in Critical Workflow step 2).

---

## 2. Detailed Steps

### Step 2.1 — Update `src/app/demo/demo-config.ts`

**Goal:** Move view-label helpers out of `demo.component.ts` into `demo-config.ts` and make `isPlainObject` reusable.

**Exact changes:**

A. Make `isPlainObject` public by removing the `function` keyword privacy (it is already a top-level function, just exported). Add `export` keyword.

Replace:
```ts
function isPlainObject(value: unknown): value is Record<string, unknown> {
```
with:
```ts
export function isPlainObject(value: unknown): value is Record<string, unknown> {
```

B. Add the following block at the END of the file (after `isValidTableRowCount`), using real newlines:

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

**Do NOT** change the `DemoConfig` interface, `DEFAULT_DEMO_CONFIG`, or `coerceDemoConfig`. **Do NOT** remove any existing exports.

**Verify:** `vscode-mcp-server_get_diagnostics_code` on `demo-config.ts` — no errors.

**Commit:** `feat(demo): add view-label and title helpers to demo-config`.

---

### Step 2.2 — Create `DemoCreateFormComponent`

**New files (3):**

#### 2.2.1 `src/app/demo/views/demo-create-form/demo-create-form.component.ts`

Create with this exact content (real newlines):

```ts
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { CbaButtonComponent, CbaInputComponent } from '@cobranza-apps/ui';

/** Field model for the simulated create form. Spanish-labelled test fields. */
interface DemoCreateFormModel {
  readonly nombre: string;
  readonly documento: string;
  readonly email: string;
  readonly telefono: string;
  readonly observaciones: string;
}

const EMPTY_FORM: DemoCreateFormModel = {
  nombre: '',
  documento: '',
  email: '',
  telefono: '',
  observaciones: '',
};

@Component({
  selector: 'app-demo-create-form',
  standalone: true,
  imports: [CbaButtonComponent, CbaInputComponent],
  templateUrl: './demo-create-form.component.html',
  styleUrl: './demo-create-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Simulated create-form view for `mfe-demo` (view === 'create-form').
 *
 * Renders five Spanish-labelled test fields (nombre, documento, email,
 * teléfono, observaciones) plus a primary "Guardar (simulado)" and a
 * secondary "Reiniciar" button. No real submit, no API, no validation.
 *
 * Field names mirror `@cobranza-apps/entities` `Client` (fullName, taxId,
 * email, phone, notes) but are kept as local Spanish strings for clarity.
 *
 * Emits `primaryAction` / `secondaryAction` outputs; the parent
 * `DemoComponent` dispatches the corresponding `mfe:*` events.
 */
export class DemoCreateFormComponent {
  readonly size = input<'50%' | '100%'>('100%');
  readonly primaryAction = output<void>();
  readonly secondaryAction = output<void>();

  readonly nombre = signal(EMPTY_FORM.nombre);
  readonly documento = signal(EMPTY_FORM.documento);
  readonly email = signal(EMPTY_FORM.email);
  readonly telefono = signal(EMPTY_FORM.telefono);
  readonly observaciones = signal(EMPTY_FORM.observaciones);

  readonly onPrimary = (): void => {
    this.primaryAction.emit();
  };

  readonly onSecondary = (): void => {
    this.resetForm();
    this.secondaryAction.emit();
  };

  private resetForm(): void {
    this.nombre.set(EMPTY_FORM.nombre);
    this.documento.set(EMPTY_FORM.documento);
    this.email.set(EMPTY_FORM.email);
    this.telefono.set(EMPTY_FORM.telefono);
    this.observaciones.set(EMPTY_FORM.observaciones);
  }
}
```

**Notes for implementer:**
- `CommonModule` is NOT needed (no `*ngIf`, no `*ngFor`; the template uses control-flow-free static markup). Do NOT import it.
- `FormsModule` is NOT needed — `cba-input` is a `ControlValueAccessor`; we use `[ngModel]` / `(ngModelChange)` which requires `FormsModule`. **Correction:** `FormsModule` IS required for `ngModel` bindings. Add it to imports.

**Revised imports line** (use this, not the one above):
```ts
import { FormsModule } from '@angular/forms';
...
  imports: [CbaButtonComponent, CbaInputComponent, FormsModule],
```

So the full corrected import block at top:
```ts
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

And `imports: [CbaButtonComponent, CbaInputComponent, FormsModule]`.

#### 2.2.2 `src/app/demo/views/demo-create-form/demo-create-form.component.html`

Create with this exact content (real newlines):

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

#### 2.2.3 `src/app/demo/views/demo-create-form/demo-create-form.component.scss`

Create with this exact content (real newlines):

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

**Verify:** `vscode-mcp-server_get_diagnostics_code` on the new `.ts` file — no errors.

**Commit:** `feat(demo): add DemoCreateFormComponent view`.

---

### Step 2.3 — Create `DemoProfileComponent`

**New files (3):**

#### 2.3.1 `src/app/demo/views/demo-profile/demo-profile.component.ts`

Create with this exact content (real newlines):

```ts
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { CbaBadgeComponent, CbaCardComponent } from '@cobranza-apps/ui';

import { isPlainObject } from '../../demo-config';

/** Single label/value pair rendered in the read-only profile list. */
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
  nombre: 'Nombre',
  dni: 'DNI',
  email: 'Email',
  telefono: 'Teléfono',
  saldo: 'Saldo',
  estado: 'Estado',
  fullName: 'Nombre',
  taxId: 'DNI',
  phone: 'Teléfono',
  active: 'Estado',
  notes: 'Observaciones',
};

@Component({
  selector: 'app-demo-profile',
  standalone: true,
  imports: [CbaBadgeComponent, CbaCardComponent],
  templateUrl: './demo-profile.component.html',
  styleUrl: './demo-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Read-only profile / detail view for `mfe-demo` (view === 'profile').
 *
 * Renders a `cba-card` with a `<dl>` key-value list built from
 * `config.profile`. Falls back to `DEFAULT_PROFILE` (Spanish mock) when
 * `profile` is absent or not a plain object.
 *
 * Key mappings support both Spanish brief-example keys (`nombre`, `dni`,
 * `email`, `telefono`, `saldo`, `estado`) and entity-like keys from
 * `@cobranza-apps/entities` `Client` (`fullName`, `taxId`, `phone`,
 * `active`, `notes`). Unknown keys are labelled with their capitalized key.
 */
export class DemoProfileComponent {
  readonly profile = input<Record<string, unknown> | undefined>(undefined);
  readonly size = input<'50%' | '100%'>('100%');

  readonly fields = computed<DemoProfileField[]>(() =>
    this.buildFields(this.profile()),
  );

  readonly estadoBadgeVariant = computed<'success' | 'warning' | 'danger' | 'neutral'>(() =>
    this.resolveEstadoVariant(this.fields()),
  );

  private buildFields(profile: Record<string, unknown> | undefined): DemoProfileField[] {
    const source = isPlainObject(profile) ? profile : DEFAULT_PROFILE;
    return Object.entries(source).map(([key, value]) => ({
      label: PROFILE_LABELS[key] ?? capitalize(key),
      value: String(value ?? ''),
    }));
  }

  private resolveEstadoVariant(fields: DemoProfileField[]): 'success' | 'warning' | 'danger' | 'neutral' {
    const estado = fields.find((field) => field.label === 'Estado')?.value ?? '';
    if (estado === 'Activo') return 'success';
    if (estado === 'Pendiente') return 'warning';
    if (estado === 'Vencido' || estado === 'Inactivo') return 'danger';
    return 'neutral';
  }
}

function capitalize(value: string): string {
  if (value.length === 0) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}
```

**Notes for implementer:**
- `CommonModule` is NOT needed. Do NOT import it.
- `isPlainObject` is imported from `../../demo-config` (the export added in Step 2.1).
- The `estadoBadgeVariant` computed is used in the template to pick a badge variant from the `Estado` field value; defaults to `neutral`.

#### 2.3.2 `src/app/demo/views/demo-profile/demo-profile.component.html`

Create with this exact content (real newlines):

```html
<div class="demo-profile" [attr.data-size]="size()">
  <cba-card>
    <div cbaCardHeader>
      <h2 class="cba-text-heading-md">Ficha del cliente</h2>
      <cba-badge [variant]="estadoBadgeVariant()">{{ estadoValue() }}</cba-badge>
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

**Add `estadoValue` computed to the component** (the template references it). Add this to the class body after `estadoBadgeVariant`:

```ts
  readonly estadoValue = computed(() =>
    this.fields().find((field) => field.label === 'Estado')?.value ?? '—',
  );
```

#### 2.3.3 `src/app/demo/views/demo-profile/demo-profile.component.scss`

Create with this exact content (real newlines):

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

**Verify:** `vscode-mcp-server_get_diagnostics_code` on the new `.ts` file — no errors.

**Commit:** `feat(demo): add DemoProfileComponent view`.

---

### Step 2.4 — Wire `DemoComponent`

**Files to edit:** `src/app/demo/demo.component.ts`, `src/app/demo/demo.component.html`.

#### 2.4.1 `demo.component.ts` changes

**A. Update imports block** (lines 1–26). Replace the existing import block with:

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
  type ModuleSize,
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

**B. Remove the local `DEFAULT_HEADER_TITLE` constant** (line 27). Delete:
```ts
const DEFAULT_HEADER_TITLE = 'Demo';
```

**C. Update `@Component` imports array** — add the two new components:
```ts
  imports: [CbaBadgeComponent, DemoTableComponent, DemoCreateFormComponent, DemoProfileComponent],
```

**D. Add `previousResolvedTitle` field and a reactive title `effect()` in the constructor; remove the one-shot `dispatchUpdateHeaderEvent()` call from `ngOnInit`.**

Replace the class body section from `export class DemoComponent implements OnInit, OnDestroy {` through `ngOnInit()` with:

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

  readonly shortInstanceId = computed(() => truncateInstanceId(this.instanceId()));

  readonly instanceHue = computed(() => this.hashString(this.instanceId()) % 360);

  readonly instanceColorStyle = computed(() => ({
    '--demo-instance-marker': `hsl(${this.instanceHue()}, 65%, 45%)`,
  }));

  readonly sizeLabelText = computed(() =>
    this.size() === '100%' ? 'Ancho completo (100 %)' : 'Mitad de ancho (50 %)',
  );

  readonly viewLabel = computed(() => viewModeToSpanishLabel(this.view()));

  readonly resolvedTitle = computed(() =>
    this.config().title ?? defaultTitleForView(this.view()),
  );

  readonly schemaVersion = SCHEMA_VERSION;
  readonly readyEventName = MFE_EVENTS.MODULE_READY;
  readonly headerEventName = MFE_EVENTS.UPDATE_HEADER;

  private previousResolvedTitle = '';

  constructor() {
    effect(() => {
      const resolvedTitle = this.resolvedTitle();
      if (resolvedTitle !== this.previousResolvedTitle) {
        this.dispatchUpdateHeader(resolvedTitle, 'loaded');
        this.previousResolvedTitle = resolvedTitle;
      }
    });
  }
```

**E. Update `ngOnInit`** — remove the `dispatchUpdateHeaderEvent()` call (now handled by the effect). Replace with:

```ts
  ngOnInit(): void {
    this.dispatchReadyEvent();
    this.attachShellListeners();
  }
```

**F. Replace `dispatchUpdateHeaderEvent()` with a parametrised `dispatchUpdateHeader()` + add `dispatchShowNotification()` + add the two form output handlers.**

Replace the existing `dispatchUpdateHeaderEvent()` method (lines 125–136) with:

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
    this.dispatchUpdateHeader(this.resolvedTitle(), 'success');
  };

  readonly onCreateFormSecondary = (): void => {
    this.dispatchShowNotification('info', 'Formulario reiniciado');
  };
```

**G. Delete the now-duplicate local `VIEW_LABELS` const and `viewModeToSpanishLabel` function** at the bottom of the file (lines 164–171), since they now live in `demo-config.ts`. The `viewLabel` computed still calls `viewModeToSpanishLabel` — it must now import it.

**Update the `demo-config` import** (already done in step A above) — but `viewModeToSpanishLabel` is used by the `viewLabel` computed. Add it to the import:

```ts
import { coerceDemoConfig, defaultTitleForView, viewModeToSpanishLabel } from './demo-config';
```

**H. Keep unchanged:** the three shell listener handlers (`onModuleState`, `onVisibilityChanged`, `onThemeChanged`), `ngOnDestroy`, `dispatchReadyEvent`, `attachShellListeners`, `hashString`, `truncateInstanceId`, `SHORT_ID_PREFIX_LENGTH`.

**File length check:** after edits the file should be ~155 lines (under the 200-line limit). Verify with `read` after editing.

**Verify:** `vscode-mcp-server_get_diagnostics_code` on `demo.component.ts` — no errors.

#### 2.4.2 `demo.component.html` changes

Replace the two placeholder `@case` blocks (lines 49–60) with the real sub-components. The `@switch` block becomes:

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

**Do NOT** change the identity panel (lines 1–43). **Do NOT** remove the `.cba-demo__placeholder` SCSS rule from `demo.component.scss` (it is harmless; leave it to avoid unrelated edits per Code Guidelines rule 5).

**Verify:** `vscode-mcp-server_get_diagnostics_code` on `demo.component.html` (via the `.ts` file) — no errors.

**Commit:** `feat(demo): wire create-form and profile views + reactive title effect`.

---

### Step 2.5 — Polish `DemoTableComponent` SCSS

**File:** `src/app/demo/views/demo-table/demo-table.component.scss`.

Add explicit `overflow-x: auto` to `.table-responsive`. The class is used in the template at line 12. Append at the end of the file:

```scss
.table-responsive {
  overflow-x: auto;
}
```

**Do NOT** change the existing `min-width` rules or the `[data-size='50%']` override. **Do NOT** edit the `.ts` or `.html` files of demo-table.

**Verify:** `vscode-mcp-server_get_diagnostics_code` — no errors.

**Commit:** `style(demo): explicit overflow-x on table responsive wrapper`.

---

### Step 2.6 — Build verification

Run:
```
npm run build
```

**Acceptance:** build succeeds with zero errors. If it fails, read the error, fix within the scope of this plan (only the files touched in steps 2.1–2.5), and re-run. Do NOT modify unrelated files. If the error is outside this plan's scope, STOP and return a question to the caller.

**Do NOT** run `npm run serve` (long-running; not required for verification).

---

### Step 2.7 — Update `.agent/project-structure.md`

Add the two new view folders under `# Folders in src/`. The `# Folders in src/` section becomes:

```markdown
- app/demo/ - main exposed federation entry component (DemoComponent) and its DemoConfig
- app/demo/views/demo-table/ - mock data table sub-component rendered when view === 'table'
- app/demo/views/demo-create-form/ - simulated create-form sub-component rendered when view === 'create-form'
- app/demo/views/demo-profile/ - read-only profile / detail card sub-component rendered when view === 'profile'
- app/demo-preview/ - standalone preview host used when running ng serve without the Shell
```

**Do NOT** change the `# Other folders` section.

**Commit:** `docs: update project-structure with new view folders`.

---

## 3. Acceptance Criteria (from spec §10)

After all steps, verify each:

- [ ] `npm run build` succeeds.
- [ ] `DemoConfig.view` drives the body: `table` (default), `create-form`, `profile`.
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

## 4. Behaviour Matrix (title dispatch — spec §7.3)

| `config.title` | `config.view` | Dispatched title |
|----------------|---------------|------------------|
| `'Alta simulada'` | `create-form` | `'Alta simulada'` |
| `undefined` | `table` | `'Demo – Tabla'` |
| `undefined` | `create-form` | `'Demo – Alta'` |
| `undefined` | `profile` | `'Demo – Perfil'` |
| `'Cliente demo'` | `profile` | `'Cliente demo'` |

The `effect()` in the constructor re-runs whenever `data()` (and thus `config()` / `resolvedTitle()`) changes, and dispatches only when the resolved title differs from the previous one — preventing duplicate dispatches on unrelated signal reads.

---

## 5. Files Touched (summary)

| File | Action |
|------|--------|
| `src/app/demo/demo-config.ts` | edit — export `isPlainObject`, add `VIEW_LABELS` / `viewModeToSpanishLabel` / `defaultTitleForView` |
| `src/app/demo/views/demo-create-form/demo-create-form.component.ts` | create |
| `src/app/demo/views/demo-create-form/demo-create-form.component.html` | create |
| `src/app/demo/views/demo-create-form/demo-create-form.component.scss` | create |
| `src/app/demo/views/demo-profile/demo-profile.component.ts` | create |
| `src/app/demo/views/demo-profile/demo-profile.component.html` | create |
| `src/app/demo/views/demo-profile/demo-profile.component.scss` | create |
| `src/app/demo/demo.component.ts` | edit — imports, effect, handlers, remove local helpers |
| `src/app/demo/demo.component.html` | edit — replace placeholder `@case` blocks |
| `src/app/demo/views/demo-table/demo-table.component.scss` | edit — add `.table-responsive` overflow |
| `.agent/project-structure.md` | edit — add two new folders |

**No other files** may be created or modified. No new dependencies. No git branch changes (handled in Critical Workflow step 2).

---

## 6. Constraints Enforced

- Standalone components only; `ChangeDetectionStrategy.OnPush` on every new component.
- Signals for all reactive state (`input`, `output`, `computed`, `signal`, `effect`).
- Spanish-only UI text.
- Only `--cba-*` design tokens in SCSS; no hard-coded hex.
- Max 200 lines per `src/` file; max 50 lines per method body; max 2 params per method; max depth 2.
- No commented-out code.
- Private members by default.
- `@cobranza-apps/mfe-events` helpers used for all dispatches; every `mfe:update-header` includes `moduleType` + `instanceId` + `schemaVersion`.
- `mfe:show-notification` payloads do NOT include module identity (per library contract — it is a global notification).
