# Implementation Plan — Task C (Tasks 7 & 8)

## Identity Panel + Visual Instance Marker + Default 'table' View

- **Repository:** `C:\projects\cobranza-app\front\mfe-demo`
- **Branch:** `feat/mfe-demo-phase0` (already created by Step 2; do NOT switch/create branches)
- **Scope:** TODO Task 7 (Identity panel & visual instance marker) + Task 8 (Default view — 'table')
- **Source of truth for UI decisions:** `.kilo/plans/20260824-mfe-demo-phase0-taskC-frontend-spec.md` (hereafter "the Spec")
- **Target implementer:** Junior developer under 50 % restriction — all structural/architectural decisions are encoded below; do NOT improvise.
- **Git push:** RESTRICTED to Step 5 of the Critical Workflow — do NOT push in this step.
- **Version bump:** RESTRICTED to Step 3 — do NOT bump `package.json` here.

---

## 0. Pre-flight (read-only verification — no edits)

0.1. Read these files before touching anything (implementer must read independently):
- `.agent/project-info/brief.md` §3.2, §3.6, §4.1, §4.2
- `.kilo/plans/20260824-mfe-demo-phase0-taskC-frontend-spec.md` (full)
- `src/app/demo/demo.component.ts`, `demo.component.html`, `demo.component.scss`, `demo-config.ts`
- `.agent/project-structure.md`

0.2. Verify the following external APIs exist (already verified by the planner; do NOT re-verify unless debugging):
- `@cobranza-apps/ui` exports `CbaBadgeComponent` (selector `cba-badge`; signal inputs `variant: 'primary'|'success'|'warning'|'danger'|'info'|'neutral'` [optional, default behaviour], `appearance: 'solid'|'outline'` [optional]) and `CbaEmptyStateComponent` (selector `cba-empty-state`; signal input `title: string` [required], `description: string` [optional]).
- Theme tokens exist in `node_modules/@cobranza-apps/ui/theme/_variables.scss`: `--cba-bg-secondary`, `--cba-bg-tertiary`, `--cba-text-primary`, `--cba-text-secondary`, `--cba-border-subtle`, `--cba-hover`, `--cba-space-2`, `--cba-space-3`, `--cba-radius-md`.
- Utility classes from `node_modules/@cobranza-apps/ui/theme/_utilities.scss`: `.cba-text-caption`, `.cba-text-body` (font-size/line-height pair utilities).
- `@cobranza-apps/entities` exports `Client` from `dist/entities/client/index.d.ts`, but the `Client` shape (companyId/clientCode/active required, EncryptedValue unions) does NOT map cleanly to the demo payments table (concepto/monto/fecha/estado). **Decision (encoded, do not revisit):** use the local `DemoTableRow` interface defined in Spec §3.2 — NOT `Client`. The dependency on `@cobranza-apps/entities` remains present (already installed in `package.json`); no change to that dependency.

0.3. Architectural decisions encoded (do NOT deviate):
- **Sub-component approach for the table.** A separate `DemoTableComponent` is REQUIRED (Spec §3.2) to keep `demo.component.ts` under the 200-line file limit and to isolate table styling. Do NOT inline the table into `DemoComponent`.
- **No sub-components for `create-form` / `profile`.** They remain inline placeholders in `demo.component.html` (Spec §7).
- **Selector for the table sub-component:** `app-demo-table` (matches Spec §6.1 markup `<app-demo-table ... />`). Class name `DemoTableComponent`.
- **Standalone only.** No NgModules. All components stay standalone.
- **No new dependencies.** No npm installs. No new imports of `@cobranza-apps/ui/theme` inside component SCSS (theme is already loaded globally in `src/styles.scss` per Task 3).
- **No hard-coded hex/RGB.** Only `--cba-*` tokens plus the one dynamic custom property `--demo-instance-marker`.
- **No DOM manipulation outside the component host.**

---

## 1. Files to create / modify

### Create (3 new files)

| Path | Purpose |
|------|---------|
| `src/app/demo/views/demo-table/demo-table.component.ts` | Standalone sub-component logic |
| `src/app/demo/views/demo-table/demo-table.component.html` | Table template |
| `src/app/demo/views/demo-table/demo-table.component.scss` | Table styles (tokens only) |

### Modify (4 existing files)

| Path | Change |
|------|--------|
| `src/app/demo/demo.component.ts` | Add computed signals + private helpers + imports |
| `src/app/demo/demo.component.html` | Replace summary header with identity panel; update `@switch` cases |
| `src/app/demo/demo.component.scss` | Add instance marker border, identity rows, placeholder styles |
| `.agent/project-structure.md` | Add the new `views/demo-table/` folder entry |

### Do NOT touch

- `src/app/demo/demo-config.ts` (no changes — `coerceDemoConfig` already clamps `tableRows` to a non-negative finite number with default 5)
- `src/app/app.component.ts`, `app.config.ts`, `app.routes.ts`, `demo-preview/*` (out of scope for Task C)
- `package.json`, `angular.json`, `federation.config.js`, `tsconfig*.json`
- Any file under `node_modules/`

---

## 2. Step-by-step implementation

### Step 2.1 — Create `DemoTableComponent` TypeScript file

**File:** `src/app/demo/views/demo-table/demo-table.component.ts`

**Full content (copy exactly; this is ≤ 200 lines and every method body ≤ 50 lines):**

```ts
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CbaBadgeComponent, CbaEmptyStateComponent } from '@cobranza-apps/ui';

/** Single mock row rendered in the demo 'table' view. */
interface DemoTableRow {
  readonly id: number;
  readonly concepto: string;
  readonly monto: string;
  readonly fecha: string;
  readonly estado: 'Pagado' | 'Pendiente' | 'Vencido';
}

const CONCEPTOS: readonly string[] = [
  'Cuota mensual',
  'Pago parcial',
  'Recargo por mora',
  'Servicio de gestión',
  'Reembolso ajustado',
  'Cargo administrativo',
];

const ESTADOS: readonly DemoTableRow['estado'][] = ['Pagado', 'Pendiente', 'Vencido'];
const FIXED_FECHA = '24/08/2026';
const SIZE_LABEL_LONG = 'Ancho completo (100 %)';
const SIZE_LABEL_SHORT = 'Mitad de ancho (50 %)';

@Component({
  selector: 'app-demo-table',
  standalone: true,
  templateUrl: './demo-table.component.html',
  styleUrl: './demo-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Mock data table rendered by `DemoComponent` when `view === 'table'`.
 * Rows are generated deterministically from the `rowCount` input.
 */
export class DemoTableComponent {
  /** Number of mock rows to render. Coerced to a non-negative finite number upstream. */
  readonly rowCount = input.required<number>();
  /** Current module width fraction — drives the `data-size` reflow hook and size caption. */
  readonly size = input.required<'50%' | '100%'>();

  /** Mock rows derived from `rowCount`. Empty when `rowCount === 0`. */
  readonly rows = computed<DemoTableRow[]>(() => this.buildMockRows(this.rowCount()));

  /** Spanish human-readable size mode shown above the table. */
  readonly sizeLabelText = computed(() =>
    this.size() === '100%' ? SIZE_LABEL_LONG : SIZE_LABEL_SHORT,
  );

  /** Maps a Spanish estado string to a `CbaBadge` variant. */
  badgeVariantFor(estado: DemoTableRow['estado']): 'success' | 'warning' | 'danger' {
    return mapEstadoToVariant(estado);
  }

  private buildMockRows(count: number): DemoTableRow[] {
    const safeCount = Math.max(0, Math.floor(count));
    const result: DemoTableRow[] = [];
    for (let index = 0; index < safeCount; index += 1) {
      result.push(buildRow(index));
    }
    return result;
  }
}

function buildRow(index: number): DemoTableRow {
  return {
    id: index + 1,
    concepto: CONCEPTOS[index % CONCEPTOS.length],
    monto: `$ ${(index + 1) * 1250}`,
    fecha: FIXED_FECHA,
    estado: ESTADOS[index % ESTADOS.length],
  };
}

function mapEstadoToVariant(estado: DemoTableRow['estado']): 'success' | 'warning' | 'danger' {
  if (estado === 'Pagado') {
    return 'success';
  }
  if (estado === 'Pendiente') {
    return 'warning';
  }
  return 'danger';
}
```

**Notes for the implementer:**
- Keep the module-level `const` declarations and the three pure helper functions (`buildRow`, `mapEstadoToVariant`) OUTSIDE the class. They are module-private helpers that keep `DemoTableComponent` methods small and the file self-documenting.
- `badgeVariantFor` is public (called from the template). All other logic is private/module-scoped.
- Do NOT add JSDoc beyond what is shown. Self-documenting names per project rules.
- The Spec §3.2 says "Format monto as `'$ ' + (index + 1) * 1_250`." The `buildRow` helper above produces exactly that string via template literal. Keep the literal space after `$`.
- The Spec §3.2 says "Generate at least 4 distinct Spanish concepts" — `CONCEPTOS` has 6.
- Do NOT import `Client` from `@cobranza-apps/entities` (see Decision §0.3).

---

### Step 2.2 — Create `DemoTableComponent` template

**File:** `src/app/demo/views/demo-table/demo-table.component.html`

**Full content (copy exactly):**

```html
<div class="demo-table" [attr.data-size]="size()">
  <p class="cba-text-caption demo-table__size-label" aria-live="polite">
    {{ sizeLabelText() }}
  </p>

  @if (rows().length === 0) {
    <cba-empty-state
      title="Sin filas"
      description="La configuración solicitó 0 filas de ejemplo."
    />
  } @else {
    <div class="table-responsive">
      <table class="demo-table__table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Concepto</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          @for (row of rows(); track row.id) {
            <tr>
              <td>{{ row.id }}</td>
              <td>{{ row.concepto }}</td>
              <td>{{ row.monto }}</td>
              <td>{{ row.fecha }}</td>
              <td>
                <cba-badge [variant]="badgeVariantFor(row.estado)">
                  {{ row.estado }}
                </cba-badge>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  }
</div>
```

**Notes:**
- The empty-state branch (Spec §6.4) wraps the table in `@if ... @else`. The `<cba-empty-state>` `title` is a required input and MUST be the string `"Sin filas"`. The `description` is optional but REQUIRED here per Spec §6.4 — use the exact Spanish string shown.
- `track row.id` is required by Angular `@for` control flow.
- Do NOT add `appearance` to the estado `<cba-badge>` (default solid fill is correct for estado badges).
- The `<div class="table-responsive">` is the Bootstrap utility class (Bootstrap 5 is a peer dependency already installed) — Spec §6.2.

---

### Step 2.3 — Create `DemoTableComponent` styles

**File:** `src/app/demo/views/demo-table/demo-table.component.scss`

**Full content (copy exactly; tokens only, no hex):**

```scss
.demo-table {
  display: block;
}

.demo-table__size-label {
  margin-bottom: var(--cba-space-2);
}

.demo-table__table {
  width: 100%;
  min-width: 36rem;
  border-collapse: collapse;
  background-color: var(--cba-bg-secondary);
  color: var(--cba-text-primary);
}

.demo-table__table thead th {
  background-color: var(--cba-bg-tertiary);
  color: var(--cba-text-secondary);
  font-weight: 600;
  border-bottom: 1px solid var(--cba-border-subtle);
  padding: var(--cba-space-2) var(--cba-space-3);
  text-align: left;
}

.demo-table__table tbody td {
  padding: var(--cba-space-2) var(--cba-space-3);
  border-bottom: 1px solid var(--cba-border-subtle);
}

.demo-table__table tbody tr:hover {
  background-color: var(--cba-hover);
}

.demo-table[data-size='50%'] .demo-table__table {
  min-width: 28rem;
}
```

**Notes:**
- The `data-size='50%'` reflow hook matches Spec §6.2 exactly (attribute value is the literal `'50%'`).
- Do NOT use Bootstrap `.table` class on `<table>` (Spec §6.3 forbids Bootstrap default table colours). Set token values explicitly as above.
- Do NOT re-import `@cobranza-apps/ui/theme`.

---

### Step 2.4 — Modify `demo.component.ts`

**File:** `src/app/demo/demo.component.ts`

**Replace the ENTIRE current file content** with the following (keeps existing inputs/signals, adds identity-panel logic; ≤ 200 lines, every method body ≤ 50 lines):

```ts
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CbaBadgeComponent } from '@cobranza-apps/ui';
import { MFE_EVENTS, SCHEMA_VERSION, type ModuleSize } from '@cobranza-apps/mfe-events';

import { coerceDemoConfig } from './demo-config';
import { DemoTableComponent } from './views/demo-table/demo-table.component';

@Component({
  selector: 'cba-demo',
  standalone: true,
  imports: [CbaBadgeComponent, DemoTableComponent],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Main exposed component of `mfe-demo`.
 *
 * The Shell hosts this component via Native Federation and injects the
 * standard MFE inputs (see `brief.md §3.2`). The component:
 * - Renders one of three internal views (`table` | `create-form` | `profile`)
 *   driven by the opaque `data` input (coerced into `DemoConfig`).
 * - Owns only the body area — module chrome (header, drag handle, collapse,
 *   fullscreen, remove) belongs to the Shell / `@cobranza-apps/ui`.
 * - Must remain multi-instance safe: every piece of state is derived from
 *   inputs, no shared singletons.
 *
 * Selector: `cba-demo`
 */
export class DemoComponent {
  readonly moduleType = input.required<string>();
  readonly instanceId = input.required<string>();
  readonly size = input.required<ModuleSize>();
  readonly isCollapsed = input.required<boolean>();
  readonly isFullscreen = input.required<boolean>();
  readonly data = input<Record<string, unknown> | undefined>(undefined);

  readonly config = computed(() => coerceDemoConfig(this.data()));
  readonly view = computed(() => this.config().view ?? 'table');

  /** Short form of `instanceId` shown in the identity panel (first 8 chars + ellipsis). */
  readonly shortInstanceId = computed(() => truncateInstanceId(this.instanceId()));

  /** Stable 0–359 hue derived from `instanceId` for the visual instance marker. */
  readonly instanceHue = computed(() => this.hashString(this.instanceId()) % 360);

  /** Inline style object applied to the root `.cba-demo` element to colour the left border. */
  readonly instanceColorStyle = computed(() => ({
    '--demo-instance-marker': `hsl(${this.instanceHue()}, 65%, 45%)`,
  }));

  /** Spanish human-readable size mode shown in the identity panel. */
  readonly sizeLabelText = computed(() =>
    this.size() === '100%' ? 'Ancho completo (100 %)' : 'Mitad de ancho (50 %)',
  );

  /** Spanish label for the active view shown in the identity panel. */
  readonly viewLabel = computed(() => viewModeToSpanishLabel(this.view()));

  readonly schemaVersion = SCHEMA_VERSION;
  readonly readyEventName = MFE_EVENTS.MODULE_READY;
  readonly sizeLabel = computed(() => (this.size() === '100%' ? 'long' : 'short'));

  /** Stable 32-bit integer hash of an arbitrary string (used for the instance marker hue). */
  private hashString(value: string): number {
    let hash = 0;
    for (let index = 0; index < value.length; index += 1) {
      const char = value.charCodeAt(index);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return Math.abs(hash);
  }
}

const SHORT_ID_PREFIX_LENGTH = 8;

function truncateInstanceId(value: string): string {
  return value.length > SHORT_ID_PREFIX_LENGTH
    ? `${value.slice(0, SHORT_ID_PREFIX_LENGTH)}…`
    : value;
}

function viewModeToSpanishLabel(view: string): string {
  if (view === 'table') {
    return 'Tabla';
  }
  if (view === 'create-form') {
    return 'Alta';
  }
  if (view === 'profile') {
    return 'Perfil';
  }
  return 'Desconocida';
}
```

**Notes for the implementer:**
- The existing class doc comment is preserved verbatim.
- The `sizeLabel` computed (`'long'`/`'short'`) is preserved — it was added in Task B and is referenced by nothing in the new template, but MUST be kept to avoid removing existing functionality (Code Guidelines §5). It is harmless.
- The `imports` array on the `@Component` decorator is NEW (the current file has no `imports` because the template used no other components). Add `CbaBadgeComponent` and `DemoTableComponent` exactly as shown.
- `hashString` is private and its body is 7 lines — well under the 50-line method limit. Copy the algorithm verbatim from Spec §3.1 (it is a standard djb2-like hash).
- `instanceColorStyle` returns an object (Spec §5.2 object form), which Angular's `[style]` binding accepts. Do NOT convert it to a string.
- `truncateInstanceId` and `viewModeToSpanishLabel` are module-level pure helpers — keep them OUTSIDE the class to keep methods small and the file self-documenting.
- The `viewLabel` mapping table (Spec §4.2) is encoded in `viewModeToSpanishLabel` with the exact fallback string `'Desconocida'`.

---

### Step 2.5 — Modify `demo.component.html`

**File:** `src/app/demo/demo.component.html`

**Replace the ENTIRE current file content** with the following (Spec §4.1 identity panel + Spec §6.1 table integration + Spec §7 placeholders):

```html
<section
  class="cba-demo"
  [attr.data-size]="size()"
  [style]="instanceColorStyle()">

  <header class="cba-demo__identity">
    <div class="cba-demo__identity-row">
      <span class="cba-text-caption">
        <strong>Módulo:</strong> {{ moduleType() }}
      </span>
      <span class="cba-text-caption">
        <strong>Instancia:</strong>
        <abbr [title]="instanceId()" class="cba-demo__instance-id">
          {{ shortInstanceId() }}
        </abbr>
      </span>
    </div>

    <div class="cba-demo__identity-row">
      <span class="cba-text-caption">
        <strong>Tamaño:</strong> {{ sizeLabelText() }}
      </span>
      <cba-badge variant="neutral" appearance="outline">
        {{ isCollapsed() ? 'Colapsado' : 'Expandido' }}
      </cba-badge>
      <cba-badge variant="neutral" appearance="outline">
        {{ isFullscreen() ? 'Pantalla completa' : 'Ventana normal' }}
      </cba-badge>
    </div>

    <div class="cba-demo__identity-row">
      <span class="cba-text-caption">
        <strong>Vista:</strong> {{ viewLabel() }}
      </span>
    </div>
  </header>

  @switch (view()) {
    @case ('table') {
      <app-demo-table [rowCount]="config().tableRows ?? 5" [size]="size()" />
    }
    @case ('create-form') {
      <div class="cba-demo__placeholder">
        <p class="cba-text-body">Vista aún no implementada en Phase 0.</p>
        <p class="cba-text-caption">Vista seleccionada: Alta</p>
      </div>
    }
    @case ('profile') {
      <div class="cba-demo__placeholder">
        <p class="cba-text-body">Vista aún no implementada en Phase 0.</p>
        <p class="cba-text-caption">Vista seleccionada: Perfil</p>
      </div>
    }
  }
</section>
```

**Notes:**
- The `[rowCount]` binding uses `config().tableRows ?? 5`. `coerceDemoConfig` ALWAYS returns a `tableRows` number (never `undefined`), so the `?? 5` is defensive and never triggers; keep it exactly as written to satisfy the input's `required` semantics without relying on the internal guarantee of `coerceDemoConfig` (Spec §6.1 uses `config().tableRows` directly — the `?? 5` is a safe equivalent and avoids a TypeScript `number | undefined` complaint if `DemoConfig.tableRows` is ever widened). Do NOT change to `config().tableRows!`.
- The placeholder Spanish strings MUST be exactly `Vista aún no implementada en Phase 0` (Spec §7, acceptance criterion 7). Copy character-for-character including the accented `ú`.
- The `<abbr>` element exposes the full `instanceId` via `[title]` (Spec §4.3 accessibility).
- Do NOT add icons to the identity panel (Spec §4.3 forbids icons-only controls).
- The `<section>` is the single root element. Do NOT add extra wrapper elements.

---

### Step 2.6 — Modify `demo.component.scss`

**File:** `src/app/demo/demo.component.scss`

**Replace the ENTIRE current file content** with the following (Spec §5.3 marker + identity panel layout + placeholder):

```scss
:host {
  display: block;
}

.cba-demo {
  display: block;
  background-color: var(--cba-bg-secondary);
  padding: var(--cba-space-3);
  border-left: 4px solid var(--demo-instance-marker);
  border-radius: var(--cba-radius-md);
}

.cba-demo__identity {
  margin-bottom: var(--cba-space-3);
}

.cba-demo__identity-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--cba-space-2);
  margin-bottom: var(--cba-space-2);
}

.cba-demo__identity-row:last-child {
  margin-bottom: 0;
}

.cba-demo__instance-id {
  cursor: help;
  text-decoration: underline dotted;
}

.cba-demo__placeholder {
  padding: var(--cba-space-2) 0;
}
```

**Notes:**
- `--demo-instance-marker` is the ONLY custom CSS property this component defines. It is supplied at runtime by `instanceColorStyle()` via `[style]` binding (Spec §5.3).
- The previous `:host { padding: 0.75rem; }` is replaced by padding on `.cba-demo` using the `--cba-space-3` token (Spec §5.3). Do NOT keep the old `0.75rem` literal — replace it.
- Do NOT hard-code hex/RGB anywhere. The hover colour of the marker is not needed; the marker is a flat border.
- The `.cba-demo__summary` class from the old SCSS is removed (it is no longer referenced in the new HTML — the summary header is replaced by the identity panel). Removing it does NOT violate Code Guidelines §5 because the HTML element that used it is also removed in the same change.

---

### Step 2.7 — Update `.agent/project-structure.md`

**File:** `.agent/project-structure.md`

The current file lists `# (no folders yet)` under `# Folders in src/`, which is outdated (folders already exist from Tasks 1–6). This step ONLY adds the new folder created by Task C; do NOT attempt a full re-audit of the structure (that is a separate workflow).

**Edit:** under the `# Folders in src/` section, replace the placeholder line `- (no folders yet)` is NOT present — instead the section currently shows `# (no folders yet)`. Replace:

```text
# Folders in src/

# (no folders yet)
```

with:

```text
# Folders in src/

- app/demo/ - main exposed federation entry component (DemoComponent) and its DemoConfig
- app/demo/views/demo-table/ - mock data table sub-component rendered when view === 'table'
- app/demo-preview/ - standalone preview host used when running ng serve without the Shell
```

**Notes:**
- Only the three listed folders are documented. `app/` itself is not a leaf folder and is intentionally not listed (the existing convention documents leaf folders that contain source files).
- Do NOT modify the `# Other folders` section.

---

## 3. Build verification

3.1. Run the build (single command — do NOT chain):

```
npx ng build
```

**Expected:** build succeeds with zero errors. No new warnings related to `demo.component.*` or `demo-table.component.*`.

3.2. If the build fails:
- Read the error. Do NOT guess a fix that changes architecture.
- If the error is a typo or a missing import listed in this plan, fix it inline.
- If the error implies an API mismatch with `@cobranza-apps/ui` (e.g. `CbaBadgeComponent` export name), STOP and return the question to the caller — do NOT substitute a different component.
- If the error is about `config().tableRows ?? 5` type, replace `?? 5` with `as number` cast on `config().tableRows` — but only if the build explicitly complains. Otherwise keep `?? 5`.

3.3. Do NOT run `ng serve` (manual smoke verification is the user's responsibility per TODO "Manual verification"). Do NOT open a browser.

---

## 4. Git actions (commit only — NO push)

4.1. After the build passes, stage exactly these files (and nothing else):

```
src/app/demo/views/demo-table/demo-table.component.ts
src/app/demo/views/demo-table/demo-table.component.html
src/app/demo/views/demo-table/demo-table.component.scss
src/app/demo/demo.component.ts
src/app/demo/demo.component.html
src/app/demo/demo.component.scss
.agent/project-structure.md
```

4.2. Before committing, run `git status` and verify:
- No `node_modules/` content is staged.
- No `dist/` or build-output directory is staged.
- No `.kilo/plans/*.md` files are staged (plans are out of scope of this implementation commit; the planner/caller manages plan files).
- No unrelated files (e.g. `demo-preview/*`, `app.routes.ts`) are staged.

4.3. Commit message (copy exactly):

```
feat(demo): add identity panel, instance marker, and default table view

- DemoComponent renders Spanish identity panel (moduleType, instanceId,
  size, collapsed/fullscreen badges, view) with stable HSL left-border
  marker derived from a hash of instanceId.
- New DemoTableComponent sub-component renders mock rows (config.tableRows,
  default 5) using @cobranza-apps/ui tokens and CbaBadge for estado.
- create-form and profile views render inline Spanish placeholders.
- Updates .agent/project-structure.md with the new views/demo-table folder.
```

4.4. Do NOT push. Do NOT create a PR. Do NOT switch branches. Do NOT merge. Do NOT bump `package.json` version.

---

## 5. Acceptance criteria mapping (for the implementer's self-check)

After implementing, verify against Spec §10:

| Spec criterion | How to verify (read-only — no browser) |
|----------------|----------------------------------------|
| 1. Identity panel with Spanish labels | HTML contains `Módulo:`, `Instancia:`, `Tamaño:`, `Vista:` and the two `<cba-badge>` labels |
| 2. `instanceId` short + full on hover | `<abbr [title]="instanceId()">` wraps `{{ shortInstanceId() }}` |
| 3. Distinct stable marker per instance | `instanceColorStyle()` returns HSL with `instanceHue()` from `hashString(instanceId()) % 360` |
| 4. Table renders `config().tableRows` rows | `DemoTableComponent.rows` computed from `rowCount` input bound to `config().tableRows ?? 5` |
| 5. UI tokens for table | SCSS uses `--cba-bg-tertiary`, `--cba-text-secondary`, `--cba-border-subtle`, `--cba-bg-secondary`, `--cba-text-primary`, `--cba-hover`, `--cba-space-2/3` |
| 6. Reflow at 50% / 100% | `[attr.data-size]` + `.demo-table[data-size='50%']` SCSS hook |
| 7. Exact Spanish placeholder | `Vista aún no implementada en Phase 0` in both non-table cases |
| 8. Standalone only | All components have `standalone: true`; no NgModule references |
| 9. File/method limits | `demo.component.ts` ≤ 200 lines, `demo-table.component.ts` ≤ 200 lines, every method body ≤ 50 lines |
| 10. Build succeeds | Step 3.1 |

---

## 6. Out-of-scope reminders (do NOT implement)

- Action buttons (`mfe:show-notification`, `mfe:request-fullscreen`, etc.) — Task 9.
- Event dispatch (`mfe:module-ready`, `mfe:update-header`) — Task 9.
- Event log UI — later phase.
- Data payload pretty-printer — later phase.
- `create-form` / `profile` real bodies — later phase.
- Standalone preview host toggles — Task 10.
- README updates — Task 11.
- Unit/e2e tests — optional, do not block (TODO line 14).
- Any change to `demo-config.ts`.

---

## 7. Summary the implementer MUST return to the caller

After completion, the implementer's summary MUST state:
- Which files were created and which were modified (full paths).
- That `npx ng build` succeeded (paste the final success line) OR the exact error if it failed.
- The git commit hash created in Step 4.3.
- That NO push, branch switch, version bump, or scope expansion occurred.
- Anything that was NOT done (should be nothing if all steps completed).
