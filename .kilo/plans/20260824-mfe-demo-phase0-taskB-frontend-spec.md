# mfe-demo Phase 0 — Task B Front-end Technical Specification

> Scope: shared-library consumption, `DemoComponent` infrastructure, Shell Inputs wiring, and internal `DemoConfig` types.
> Tasks covered: Task 3 (theme/events/entities), Task 4 (folder structure + main entry), Task 5 (Shell Inputs), Task 6 (DemoConfig).
> Source of truth: `.agent/project-info/brief.md` (on conflict, brief.md wins).

## 1. Target Framework & Tooling

- **Angular 22.1.2**, standalone components only, no NgModules.
- **TypeScript ~6.0.0** (from `package.json`).
- **Builder**: `@angular-architects/native-federation:build` + `@angular/build:application` (esbuild).
- **UI / Theme**: `@cobranza-apps/ui ^0.19.0`.
- **Events**: `@cobranza-apps/mfe-events ^0.5.0`.
- **Domain models**: `@cobranza-apps/entities ^0.5.1` (optional, only for type examples in profile/table mocks).
- **CSS**: Bootstrap 5 peer + `@cobranza-apps/ui` tokens; no parallel styling.
- **Icons**: Font Awesome Free via `@cobranza-apps/ui` / `@fortawesome/angular-fontawesome`.
- **Language**: Spanish UI strings only; no i18n.

## 2. Component Architecture

### 2.1 Federation-exposed component

Create a single standalone component that is the Native Federation remote entry.

| Property | Value |
|----------|-------|
| Class | `DemoComponent` |
| Selector | `cba-demo` |
| Change detection | `ChangeDetectionStrategy.OnPush` |
| Exposed module | `./Component` in `federation.config.js` |

### 2.2 File layout

```text
src/app/
  app.component.ts              # bootstrap root (minimal)
  app.component.html            # `<router-outlet />`
  app.component.scss            # empty or minimal
  app.config.ts                 # application providers
  app.routes.ts                 # single route for standalone preview
  demo-preview/                 # standalone preview host (NOT the federation entry)
    demo-preview.component.ts
    demo-preview.component.html
    demo-preview.component.scss
  demo/                         # federation-exposed component
    demo.component.ts
    demo.component.html
    demo.component.scss
    demo-config.ts              # DemoViewMode + DemoConfig + coercion helpers
    views/                      # sub-view components to keep files under 200 lines
      demo-table.component.ts
      demo-create-form.component.ts
      demo-profile.component.ts
```

### 2.3 Component hierarchy

```text
AppComponent (bootstrap root)
  └── <router-outlet />
        └── DemoPreviewComponent (standalone preview only)
              └── <cba-demo> (DemoComponent)
                    ├── identity panel
                    ├── action buttons
                    ├── data payload viewer
                    ├── event log
                    └── view-specific body
                          ├── DemoTableComponent      (view === 'table')
                          ├── DemoCreateFormComponent (view === 'create-form')
                          └── DemoProfileComponent    (view === 'profile')
```

When the Shell loads the remote via Native Federation, it receives `DemoComponent` directly; `AppComponent` and `DemoPreviewComponent` are not involved.

## 3. State Management & Inputs

### 3.1 Input signals

Use Angular input signals (`input` / `input.required`) for all Shell-provided Inputs. This aligns with Angular 22 standalone best practice and gives fine-grained reactivity without manual `ngOnChanges`.

Inside `DemoComponent`:

```ts
readonly moduleType = input.required<string>();
readonly instanceId = input.required<string>();
readonly size = input.required<ModuleSize>(); // '50%' | '100%'
readonly isCollapsed = input.required<boolean>();
readonly isFullscreen = input.required<boolean>();
readonly data = input<Record<string, unknown> | undefined>(undefined);
```

Import `input` and `computed` from `@angular/core`.

### 3.2 Derived state (computed signals)

```ts
readonly config = computed(() => coerceDemoConfig(this.data()));
readonly view = computed(() => this.config().view ?? 'table');
readonly sizeLabel = computed(() => (this.size() === '100%' ? 'long' : 'short'));
readonly shortInstanceId = computed(() => shortUuid(this.instanceId()));
readonly instanceColor = computed(() => hashToColor(this.instanceId()));
readonly moduleState = signal<ModuleStatePayload | undefined>(undefined);
readonly isVisible = signal(true);
readonly eventLog = signal<Array<EventLogEntry>>([]);
```

- `coerceDemoConfig` lives in `demo-config.ts` and applies defaults + validation.
- `hashToColor` maps `instanceId` to a deterministic theme-compatible accent/token colour for the visual instance marker.
- `eventLog` keeps the last N (e.g. 20) sent/received events for this instance.

### 3.3 Why signals over simple getters

Getters re-run on every change-detection cycle and do not integrate with Angular's reactive context. Signals:

- notify only consumers of changed values,
- work with `OnPush` change detection,
- keep derived state declarative and testable.

Use signals for Inputs and all derived read-only state. Use plain primitive signals (`signal()`) only for mutable local state (`moduleState`, `isVisible`, `eventLog`).

## 4. DemoConfig Types & Parsing

### 4.1 Types

Create `src/app/demo/demo-config.ts`:

```ts
export type DemoViewMode = 'table' | 'create-form' | 'profile';

export interface DemoConfig {
  /** Which body content to render. Default: 'table'. */
  view?: DemoViewMode;
  /** Optional title to push via mfe:update-header on init. */
  title?: string;
  /** Optional mock profile data when view === 'profile'. */
  profile?: Record<string, unknown>;
  /** Optional number of mock rows when view === 'table'. */
  tableRows?: number;
}
```

### 4.2 Defaults

```ts
export const DEFAULT_DEMO_CONFIG: Required<Pick<DemoConfig, 'view' | 'tableRows'>> = {
  view: 'table',
  tableRows: 5,
};
```

### 4.3 Coercion helper

```ts
export function coerceDemoConfig(data: Record<string, unknown> | undefined): DemoConfig {
  const raw = (data ?? {}) as DemoConfig;

  return {
    view: isValidViewMode(raw.view) ? raw.view : DEFAULT_DEMO_CONFIG.view,
    title: typeof raw.title === 'string' ? raw.title : undefined,
    profile: isPlainObject(raw.profile) ? raw.profile : undefined,
    tableRows: typeof raw.tableRows === 'number' ? raw.tableRows : DEFAULT_DEMO_CONFIG.tableRows,
  };
}

function isValidViewMode(value: unknown): value is DemoViewMode {
  return value === 'table' || value === 'create-form' || value === 'profile';
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
```

Rules:
- Unknown `view` values fall back to `'table'`.
- `tableRows` must be a finite number; otherwise use default.
- `profile` must be a plain object; otherwise undefined.
- `title` must be a string; otherwise undefined.

### 4.4 Computed view mode

Inside `DemoComponent`:

```ts
readonly view = computed(() => this.config().view ?? 'table');
```

Use `view()` in the template to choose the sub-view component.

## 5. Theme Integration

### 5.1 Global theme import

`src/styles.scss` must import the UI library theme exactly once:

```scss
@use '@cobranza-apps/ui/theme';
```

This emits `--cba-*` CSS variables on `:root` and the opt-in `.cba-*` utility classes.

### 5.2 Standalone vs Shell-hosted behaviour

- For `ng serve` / standalone preview, the MFE is the only app on the page, so it must load the theme itself.
- When the Shell hosts this remote, the Shell has already loaded the theme; loading it again emits the same `:root` variables. This duplication is acceptable for Phase 0 and keeps the implementation simple (one global styles file for both modes).
- Do not add second design-system imports or custom `:root` overrides.

## 6. Event Integration

All Shell ↔ MFE events go through `@cobranza-apps/mfe-events`. Import from the package public API only:

```ts
import {
  MFE_EVENTS,
  SHELL_EVENTS,
  SCHEMA_VERSION,
  dispatchMfeEvent,
  isShellEvent,
  type ModuleReadyPayload,
  type UpdateHeaderPayload,
  type ModuleStatePayload,
  type VisibilityChangedPayload,
  type ThemeChangedPayload,
  type ShowNotificationPayload,
  type RequestFullscreenPayload,
  type RequestRemovePayload,
  type RequestAddModulePayload,
  type ModuleErrorPayload,
} from '@cobranza-apps/mfe-events';
```

### 6.1 MFE → Shell dispatch patterns

Every dispatched event that carries module identity must include `moduleType`, `instanceId`, and `schemaVersion: SCHEMA_VERSION`.

#### `mfe:module-ready`

Fire once after the component has successfully mounted and rendered initial content (e.g. inside `afterNextRender` or `ngOnInit` after setting up listeners, before any heavy async work).

```ts
private dispatchModuleReady(): void {
  const payload: ModuleReadyPayload = {
    moduleType: this.moduleType(),
    instanceId: this.instanceId(),
    schemaVersion: SCHEMA_VERSION,
  };
  dispatchMfeEvent(MFE_EVENTS.MODULE_READY, payload);
  this.logEvent('out', MFE_EVENTS.MODULE_READY, payload);
}
```

#### `mfe:update-header`

Fire on init (with the optional `config.title`) and whenever the user clicks the "Actualizar título / estado" button.

```ts
private dispatchUpdateHeader(title?: string, status?: ModuleStatus): void {
  const payload: UpdateHeaderPayload = {
    moduleType: this.moduleType(),
    instanceId: this.instanceId(),
    title,
    status,
    schemaVersion: SCHEMA_VERSION,
  };
  dispatchMfeEvent(MFE_EVENTS.UPDATE_HEADER, payload);
  this.logEvent('out', MFE_EVENTS.UPDATE_HEADER, payload);
}
```

On init, use `this.config().title` if present; otherwise a default Spanish title derived from the current view (e.g. `'Demo — Tabla'`, `'Demo — Alta'`, `'Demo — Perfil'`). Default status: `'loaded'`.

### 6.2 Shell → MFE listen patterns

Listen on `window` for `shell:*` events, guard with `isShellEvent`, and filter by `instanceId` (and `moduleType` where applicable).

```ts
private readonly moduleStateListener = (event: Event): void => {
  if (!isShellEvent(event, SHELL_EVENTS.MODULE_STATE)) return;
  if (event.detail.instanceId !== this.instanceId()) return;

  this.moduleState.set(event.detail);
  this.logEvent('in', SHELL_EVENTS.MODULE_STATE, event.detail);
};
```

Register listeners in `ngOnInit` and remove them in `ngOnDestroy` to avoid leaks across multi-instance remounts.

### 6.3 Other MFE → Shell events (reference)

The spec does not require implementing these now, but the architecture must support them:

- `MFE_EVENTS.SHOW_NOTIFICATION` with `ShowNotificationPayload`.
- `MFE_EVENTS.REQUEST_FULLSCREEN` with `RequestFullscreenPayload`.
- `MFE_EVENTS.REQUEST_REMOVE` with `RequestRemovePayload`.
- `MFE_EVENTS.REQUEST_ADD_MODULE` with `RequestAddModulePayload` (include `initialData` to pre-configure the new instance's view).
- `MFE_EVENTS.MODULE_ERROR` with `ModuleErrorPayload` (intentional error demo only).

## 7. Bootstrap / App Config

### 7.1 Federation entry

`federation.config.js` exposes `DemoComponent` directly:

```js
exposes: {
  './Component': './src/app/demo/demo.component.ts',
},
```

The Shell loads `./Component` and renders `<cba-demo>` with the Inputs from §3.2.

### 7.2 Standalone preview

For `ng serve`, the app bootstraps normally through `src/bootstrap.ts`:

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
```

`src/app/app.component.ts` remains minimal:

```ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
```

`src/app/app.component.html`:

```html
<router-outlet />
```

`src/app/app.routes.ts`:

```ts
import { Routes } from '@angular/router';
import { DemoPreviewComponent } from './demo-preview/demo-preview.component';

export const routes: Routes = [
  { path: '', component: DemoPreviewComponent },
];
```

`src/app/app.config.ts`:

```ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
```

### 7.3 DemoPreviewComponent responsibilities

`DemoPreviewComponent` is a standalone component used only in standalone preview. It must:

1. Generate or hardcode a local `instanceId` (UUID string).
2. Provide controls to change `size`, `isCollapsed`, `isFullscreen`, and `data.view`.
3. Render `<cba-demo>` with bound Inputs.
4. Listen to `mfe:*` events on `window` and display the last dispatched event for debugging.

Example template (illustrative):

```html
<div class="demo-preview-layout">
  <aside class="demo-preview-controls">
    <h2>Controles de previsualización</h2>
    <button (click)="setView('table')">Vista tabla</button>
    <button (click)="setView('create-form')">Vista alta</button>
    <button (click)="setView('profile')">Vista perfil</button>
    <button (click)="toggleSize()">Alternar tamaño</button>
    <button (click)="toggleCollapsed()">Alternar colapsado</button>
    <button (click)="toggleFullscreen()">Alternar pantalla completa</button>
  </aside>

  <cba-demo
    [moduleType]="'demo'"
    [instanceId]="instanceId"
    [size]="size()"
    [isCollapsed]="isCollapsed()"
    [isFullscreen]="isFullscreen()"
    [data]="data()" />
</div>
```

## 8. Styling Architecture

### 8.1 Token compliance

- Use `--cba-*` tokens or `.cba-*` utility classes for at least 90 % of all colour/style declarations.
- Do not hard-code hex/RGB/RGBA values or Bootstrap default colours.
- For edge cases, document with a `TODO` comment explaining why a token cannot be used.

### 8.2 Surface hierarchy

| Region | Background token | Notes |
|--------|------------------|-------|
| Module body / panel | `--cba-bg-secondary` | panel surface |
| Identity panel / recessed wells | `--cba-bg-tertiary` | inset surface |
| Table header | `--cba-bg-tertiary` | inset surface |
| Instance marker border | `--cba-accent-*` or `--cba-border-strong` | deterministic colour per instance |

### 8.3 Typography

Use the library typography scale:

- Section titles: `.cba-text-heading-md`
- Body: `.cba-text-body`
- Metadata / captions: `.cba-text-small` or `.cba-text-caption`
- Do not hard-code `font-size` pixel values.

### 8.4 Buttons

Use `<cba-button>` from `@cobranza-apps/ui` for all action buttons. Map variants:

- Primary actions (e.g. "Actualizar header"): `variant="primary"`.
- Secondary actions: `variant="secondary"`.
- Destructive actions (e.g. "Pedir quitar"): `variant="danger"`.
- Success notification demo: `variant="success"`.

### 8.5 Responsive behaviour

Target desktop only (same as Shell). The component must reflow content for:

- `size === '50%'` (`short`): stacked layouts, condensed tables, full-width form fields.
- `size === '100%'` (`long`): more horizontal room, optional side-by-side groups.

Use CSS container queries or flex/grid breakpoints based on the component width rather than viewport media queries, because the MFE lives inside a Shell-managed container.

## 9. API Integration Contract

### 9.1 No real backend calls

Phase 0 is frontend-only. Table rows, form submissions, and profile data are mocks. No HTTP services are required.

### 9.2 Optional entity types

`@cobranza-apps/entities` may be used only for mock data shapes (e.g. client-like profile fields). Do not introduce runtime dependencies on entity classes; import types only where useful.

### 9.3 Error handling

- Unknown `data` shapes are coerced safely via `coerceDemoConfig`.
- Event dispatch validation errors (`MfeEventValidationError`) must be caught and logged; the component must remain usable.
- Intentional `mfe:module-error` demo is optional and triggered only by a explicit user action.

## 10. Accessibility (a11y)

- Semantic markup: use `<section>`, `<header>`, `<table>` where appropriate.
- All interactive controls must be keyboard focusable; use native `<button>` or `cba-button`.
- Buttons must have Spanish accessible labels (`aria-label`) when icon-only.
- Colour must not be the sole means of conveying state (pair status badges with text/icons).
- Focus indicators: rely on `--cba-focus-ring` via library components or apply `box-shadow: var(--cba-focus-ring)` to custom focusable elements.

## 11. Performance Constraints

- Change detection: use `OnPush` on `DemoComponent` and all sub-view components.
- Lazy loading: sub-view components may be loaded eagerly for Phase 0; no dynamic import required.
- Bundle budgets: respect existing Angular budgets (`initial` warning 500 kb, error 1 mb; `anyComponentStyle` warning 2 kb, error 4 kb).
- Avoid shared singleton state; state must live on the component instance so multiple instances are isolated.

## 12. Code Quality Constraints

These constraints are non-negotiable for every file created in this task:

| Rule | Limit |
|------|-------|
| Max lines per file (`src/`) | 200 lines |
| Max lines per method body | 50 lines |
| Max params per method | 2 (use options objects otherwise) |
| Max nested block depth | 2 (extract to method at 3rd level) |
| Members default visibility | `private` unless public is required |
| Comments | Self-documenting code preferred; minimal comments only for complex logic |
| Commented-out code | Not allowed |
| UI strings | Spanish only |
| NgModules | Not allowed |

If a file exceeds 200 lines, split it (e.g. extract view sub-components).

## 13. File-by-File Specification

### 13.1 `src/styles.scss`

```scss
@use '@cobranza-apps/ui/theme';
```

### 13.2 `src/app/demo/demo-config.ts`

Contains `DemoViewMode`, `DemoConfig`, `DEFAULT_DEMO_CONFIG`, `coerceDemoConfig`, and private validators. Keep under 200 lines.

### 13.3 `src/app/demo/demo.component.ts`

- Standalone component, selector `cba-demo`, `OnPush`.
- Imports needed Angular core symbols, `@cobranza-apps/ui` components, `@cobranza-apps/mfe-events` helpers, and view sub-components.
- Declares input signals, computed signals, and private signals.
- Implements `OnInit`, `OnDestroy`.
- Provides private dispatch helpers and shell event listeners.
- Calls `dispatchModuleReady()` once after init.
- Calls `dispatchUpdateHeader()` on init using `config().title` or default Spanish title.

### 13.4 `src/app/demo/demo.component.html`

- Root wrapper with panel background (`--cba-bg-secondary`).
- Identity panel showing `moduleType`, `instanceId` (short + full on hover/copy), `size`, `isCollapsed`, `isFullscreen`, current `view`, and optional pixel dimensions from `moduleState()`.
- Visual instance marker (left border or background tint using `instanceColor()`).
- Action buttons using `<cba-button>`:
  - Actualizar título / estado
  - Mostrar notificación (success / warning / error)
  - Pedir pantalla completa
  - Pedir quitar módulo
  - (Opcional) Pedir agregar otra instancia demo
  - (Opcional) Simular error
- Data payload viewer: pretty-print `data()` (use `json` pipe).
- Event log: last N events for this instance.
- View switcher: render the correct sub-view component based on `view()`.

### 13.5 `src/app/demo/demo.component.scss`

- Use CSS variables from `@cobranza-apps/ui`.
- Panel background, spacing tokens, typography utilities.
- Instance marker style.
- Keep under 4 kb compiled component style budget.

### 13.6 `src/app/demo/views/*.component.ts`

Each sub-view is a standalone `OnPush` component with only the Inputs it needs:

- `DemoTableComponent`: receives `size` and `tableRows`.
- `DemoCreateFormComponent`: receives `size`.
- `DemoProfileComponent`: receives `profile`.

No Outputs required for Phase 0; user actions bubble up through `mfe-events` dispatched by `DemoComponent`.

### 13.7 `src/app/demo-preview/*`

Standalone preview host. Not loaded in federation mode. Responsible for simulating Shell Inputs and listening to `mfe:*` events.

### 13.8 `src/app/app.routes.ts`

Single default route to `DemoPreviewComponent`.

### 13.9 `src/app/app.config.ts`

`provideRouter(routes)` only. No extra providers needed for Phase 0.

### 13.10 `federation.config.js`

Update `exposes['./Component']` to point to `./src/app/demo/demo.component.ts`.

## 14. Acceptance Criteria

1. `npm run build` completes without errors.
2. `DemoComponent` is standalone, selector `cba-demo`, and `OnPush`.
3. All Shell Inputs are declared as Angular input signals and react to changes.
4. `DemoConfig` types and `coerceDemoConfig` helper exist in `demo-config.ts` and apply defaults safely.
5. `view` defaults to `'table'` and switches sub-view rendering.
6. `src/styles.scss` imports `@cobranza-apps/ui/theme` exactly once.
7. `mfe:module-ready` is dispatched once after mount with valid `ModuleReadyPayload`.
8. `mfe:update-header` is dispatched on init and on user action with valid `UpdateHeaderPayload`.
9. Shell → MFE listeners (`shell:module-state`, `shell:visibility-changed`, `shell:theme-changed`) are registered and filter by `instanceId`.
10. UI strings are Spanish only.
11. No NgModules are introduced.
12. Every new `src/` file is ≤ 200 lines; every method body is ≤ 50 lines; no method has > 2 params; no nested block depth > 2.
13. 90 % of styles use `--cba-*` tokens or `.cba-*` utilities; no hard-coded hex values except with documented `TODO`.

## 15. Out of Scope

- Real BFF / API integration.
- Auth / login.
- Workspace layout, drag-and-drop, persistence.
- Mobile layout or i18n.
- Production branding.
- Changes to `@cobranza-apps/mfe-events`.
- Full implementation of notification, fullscreen, remove, add-module, and error buttons (this spec covers wiring and patterns; buttons may be present but functional completion is Task C scope).
