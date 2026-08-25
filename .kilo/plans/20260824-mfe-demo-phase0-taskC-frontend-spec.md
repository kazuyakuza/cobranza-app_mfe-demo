# Front-end Technical Specification — Task C

## Identity Panel + Visual Instance Marker + Default Table View

**Repository:** `C:\projects\cobranza-app\front\mfe-demo`  
**Branch:** `feat/mfe-demo-phase0`  
**Scope:** TODO Task 7 (Identity panel & visual instance marker) + Task 8 (Default view — 'table')  
**Target implementer:** Junior developer (50 % restriction)  
**Language of UI:** Spanish only  
**Framework:** Angular 22 standalone components  

---

## 1. Goal

Enhance `DemoComponent` so it renders:

1. A compact **identity panel** (Spanish labels) exposing the Shell inputs.
2. A **visual instance marker** derived from `instanceId` so multiple `demo` instances are visually distinct.
3. A real **default `table` view** that respects the `size` input (`50 %` / `100 %`).
4. Spanish placeholders for the other two views (`create-form`, `profile`).

Out of scope for this spec: action buttons, data payload viewer, event log, `create-form` and `profile` full implementations, event wiring to the Shell (those remain as existing scaffolding or are covered by other tasks).

---

## 2. Source-of-truth references

- `brief.md` §3.2 (Inputs), §3.6 (`DemoConfig`), §4.1 (Common chrome), §4.2 (View-specific body content).
- `architecture.md` §4.1, §5, §7.
- `@cobranza-apps/ui` Consumer Guide — surface hierarchy, token compliance mandate, table state patterns, text-color rules.
- `@cobranza-apps/ui` README — component inventory (`CbaBadge`, `CbaCard`, `CbaButton`).

---

## 3. Component boundaries

### 3.1 `DemoComponent` (existing entry component)

**Files:**

- `src/app/demo/demo.component.ts`
- `src/app/demo/demo.component.html`
- `src/app/demo/demo.component.scss`

**Role:** Owns the identity panel, the visual marker, the `@switch` view router, and the placeholder branches for non-table views.

**Inputs (already declared — do not change signatures):**

| Input | Type | Source |
|-------|------|--------|
| `moduleType` | `string` | Shell |
| `instanceId` | `string` | Shell |
| `size` | `'50%' \| '100%'` | Shell |
| `isCollapsed` | `boolean` | Shell |
| `isFullscreen` | `boolean` | Shell |
| `data` | `Record<string, unknown> \| undefined` | Shell |

**New computed signals to add in `demo.component.ts`:**

| Signal | Derivation | Purpose |
|--------|------------|---------|
| `shortInstanceId` | First 8 characters of `instanceId()` followed by `…` | Visible compact id |
| `instanceHue` | `hashString(instanceId()) % 360` | Stable HSL hue for the marker |
| `instanceColorStyle` | `--demo-instance-marker: hsl(${instanceHue()}, 65 %, 45 %)` | Inline style string applied to host or wrapper |
| `sizeLabelText` | `size() === '100%' ? 'Ancho completo (100 %)' : 'Mitad de ancho (50 %)'` | Spanish human-readable size mode |

**Implementation notes for `demo.component.ts`:**

- Add a private pure helper `hashString(value: string): number` that returns a stable 32-bit integer.
- Algorithm (copy exactly):

```ts
private hashString(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    const char = value.charCodeAt(index);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}
```

- Keep method body under 50 lines.
- Keep file under 200 lines.

### 3.2 `DemoTableComponent` (new sub-component)

**Files:**

- `src/app/demo/views/demo-table/demo-table.component.ts`
- `src/app/demo/views/demo-table/demo-table.component.html`
- `src/app/demo/views/demo-table/demo-table.component.scss`

**Role:** Renders the mock table for `view === 'table'`.

**Why a sub-component:** keeps `DemoComponent` under the 200-line file limit and isolates table-specific styling/reflow logic.

**Inputs:**

| Input | Type | Required | Notes |
|-------|------|----------|-------|
| `rowCount` | `number` | yes | Comes from `config().tableRows`. Coerced to a non-negative finite number by `coerceDemoConfig`. |
| `size` | `'50%' \| '100%'` | yes | Used for data-attribute reflow hooks and Spanish size label. |

**Outputs:** none.

**Internal state:**

- Generate mock rows inside a `computed` signal from `rowCount()`.
- Row shape:

```ts
interface DemoTableRow {
  readonly id: number;
  readonly concepto: string;
  readonly monto: string;
  readonly fecha: string;
  readonly estado: 'Pagado' | 'Pendiente' | 'Vencido';
}
```

- Generate at least 4 distinct Spanish concepts and rotate them by row index.
- Format monto as `'$ ' + (index + 1) * 1_250`.
- Fecha as a fixed recent date string, e.g. `'24/08/2026'`.
- Estado cycles through `'Pagado'`, `'Pendiente'`, `'Vencido'`.

**Template structure:**

```html
<div class="demo-table" [attr.data-size]="size()">
  <p class="cba-text-caption demo-table__size-label" aria-live="polite">
    {{ sizeLabelText() }}
  </p>

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
</div>
```

- Import `CbaBadgeComponent` from `@cobranza-apps/ui`.
- `badgeVariantFor(estado: string)` returns:
  - `'success'` for `'Pagado'`
  - `'warning'` for `'Pendiente'`
  - `'danger'` for `'Vencido'`

---

## 4. Identity panel specification

### 4.1 Layout and markup

Inside `demo.component.html`, replace the current `<header class="cba-demo__summary">` block with a structured identity panel:

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

  <!-- view switch -->
</section>
```

### 4.2 Spanish labels

| Concept | Spanish label | Notes |
|---------|---------------|-------|
| `moduleType` | **Módulo:** | prefix + value |
| `instanceId` | **Instancia:** | short form, full in `title` attribute |
| `size` | **Tamaño:** | `sizeLabelText()` (see §3.1) |
| `isCollapsed` | badge text: `Colapsado` / `Expandido` | use `CbaBadge` neutral outline |
| `isFullscreen` | badge text: `Pantalla completa` / `Ventana normal` | use `CbaBadge` neutral outline |
| `view` | **Vista:** | `viewLabel()` maps raw view to Spanish |

**`viewLabel()` mapping:**

- `'table'` → `'Tabla'`
- `'create-form'` → `'Alta'`
- `'profile'` → `'Perfil'`
- fallback → `'Desconocida'`

### 4.3 Accessibility

- The full `instanceId` must be exposed via `[title]` on the `<abbr>` element.
- Badges use `cba-badge`, which internally renders `role="status"`.
- No icons-only controls in the identity panel.

---

## 5. Visual instance marker specification

### 5.1 Behavior

- Every `demo` instance receives a distinct left border color derived deterministically from `instanceId`.
- The same `instanceId` must always produce the same color across reloads.
- The marker must not override the module surface color (`--cba-bg-secondary`); it only adds a 4 px left border.

### 5.2 Algorithm

Use the `hashString` helper from §3.1:

```ts
readonly instanceHue = computed(() => this.hashString(this.instanceId()) % 360);
readonly instanceColorStyle = computed(() => ({
  '--demo-instance-marker': `hsl(${this.instanceHue()}, 65%, 45%)`,
}));
```

Apply it as an inline `[style]` binding on the root `.cba-demo` element:

```html
<section class="cba-demo" [style]="instanceColorStyle()">
```

### 5.3 CSS application

In `demo.component.scss`:

```scss
.cba-demo {
  display: block;
  background-color: var(--cba-bg-secondary);
  padding: var(--cba-space-3);
  border-left: 4px solid var(--demo-instance-marker);
  border-radius: var(--cba-radius-md);
}
```

- `--demo-instance-marker` is the only CSS custom property this component defines.
- No hard-coded hex values; only `--cba-*` tokens and the dynamic marker.

---

## 6. Default 'table' view specification

### 6.1 Integration into `DemoComponent`

In `demo.component.html`, inside `@switch (view())`:

```html
@case ('table') {
  <app-demo-table [rowCount]="config().tableRows" [size]="size()" />
}
```

Add `DemoTableComponent` to the `imports` array of `DemoComponent`.

### 6.2 Responsive / reflow behavior

- At `size() === '50%'` the table keeps all five columns.
- Use `.table-responsive` from Bootstrap to allow horizontal scroll if content overflows.
- Set a `min-width` on the table so it does not compress unreadably at 50 %.
- At `size() === '100%'` the table uses 100 % width.
- Use `[attr.data-size]` selector hooks in SCSS:

```scss
.demo-table__table {
  width: 100%;
  min-width: 36rem;
}

.demo-table[data-size='50%'] .demo-table__table {
  min-width: 28rem;
}
```

### 6.3 Tokens for table styling

Per `@cobranza-apps/ui` Consumer Guide Table State Patterns:

| Element | Token |
|---------|-------|
| Table header (`thead th`) | `background-color: var(--cba-bg-tertiary)` |
| Header text | `color: var(--cba-text-secondary); font-weight: 600` |
| Header bottom border | `border-bottom: 1px solid var(--cba-border-subtle)` |
| Body rows | `background-color: var(--cba-bg-secondary)` |
| Body text | `color: var(--cba-text-primary)` |
| Row hover | `background-color: var(--cba-hover)` overlay (use `linear-gradient` or `background-blend-mode`) |
| Cell padding | `var(--cba-space-2) var(--cba-space-3)` |
| Size caption | `var(--cba-text-caption)` |

Do not use Bootstrap default `.table` colors; explicitly set the token values.

### 6.4 Empty-state edge case

If `rowCount === 0`, render `CbaEmptyStateComponent` instead of the table:

```html
@if (rows().length === 0) {
  <cba-empty-state title="Sin filas" description="La configuración solicitó 0 filas de ejemplo." />
} @else { <!-- table --> }
```

---

## 7. Non-table views specification

For `create-form` and `profile`, keep an inline placeholder. Exact markup:

```html
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
```

- Do **not** create sub-components for these placeholders.
- The Spanish string must be exactly: `Vista aún no implementada en Phase 0`.

---

## 8. File and method limits

| File | Max lines | Notes |
|------|-----------|-------|
| `demo.component.ts` | 200 | Keep helpers private and small. |
| `demo.component.html` | not strictly limited by rule, but keep concise |
| `demo-table.component.ts` | 200 | Mock generation in one private helper. |
| `demo-table.component.html` | keep readable |
| `demo-table.component.scss` | use tokens only |

**Method limits:**

- No method body may exceed 50 lines.
- Split `DemoTableComponent` mock generation into a private `buildMockRows(count: number): DemoTableRow[]` helper if needed.

---

## 9. Imports and dependencies

### 9.1 `DemoComponent`

Add to existing imports:

```ts
import { CbaBadgeComponent } from '@cobranza-apps/ui';
import { DemoTableComponent } from './views/demo-table/demo-table.component';
```

### 9.2 `DemoTableComponent`

```ts
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CbaBadgeComponent, CbaEmptyStateComponent } from '@cobranza-apps/ui';
```

---

## 10. Acceptance criteria

1. `DemoComponent` renders the identity panel with Spanish labels for moduleType, instanceId, size, collapsed state, fullscreen state, and current view.
2. `instanceId` shows a short form; hovering reveals the full UUID via browser tooltip.
3. Each distinct `instanceId` produces a stable, distinct left border color.
4. `view === 'table'` renders `DemoTableComponent` with exactly `config().tableRows` rows (default 5, clamped to ≥ 0).
5. The table uses `@cobranza-apps/ui` tokens for header, rows, text, hover, and badges.
6. The table reflows correctly at `50 %` and `100 %` widths (responsive scroll, min-width hooks).
7. `view === 'create-form'` and `view === 'profile'` render the exact Spanish placeholder: `Vista aún no implementada en Phase 0`.
8. No NgModules are introduced; all components remain standalone.
9. No source file exceeds 200 lines; no method exceeds 50 lines.
10. `npm run build` succeeds with no new errors.

---

## 11. Files to create / modify

### Modify

- `src/app/demo/demo.component.ts`
- `src/app/demo/demo.component.html`
- `src/app/demo/demo.component.scss`

### Create

- `src/app/demo/views/demo-table/demo-table.component.ts`
- `src/app/demo/views/demo-table/demo-table.component.html`
- `src/app/demo/views/demo-table/demo-table.component.scss`

---

## 12. Anti-patterns to avoid

- Do not re-import `@cobranza-apps/ui/theme` inside component SCSS (already loaded globally in `src/styles.scss`).
- Do not use hard-coded hex/RGB values.
- Do not use `NgModule`.
- Do not add shared singleton services for state.
- Do not mutate Inputs or attempt to write to `size()`, `isCollapsed()`, etc.
- Do not create placeholders for `create-form`/`profile` outside the inline `@switch`.
