# Views & Configuration

> How `mfe-demo` selects and renders its three body views via the opaque `data` Input.
> Source of truth: [`brief.md`](../.agent/project-info/brief.md) §3.6 and §4.2,
> [`architecture.md`](../.agent/project-info/architecture.md) §5.

## Table of Contents

- [View modes](#view-modes)
- [How a view is selected](#how-a-view-is-selected)
- [Configuration sources](#configuration-sources)
- [Field reference (DemoConfig)](#field-reference-democonfig)
- [Coercion rules](#coercion-rules)
- [Title behaviour](#title-behaviour)
- [Example Footer entries](#example-footer-entries)
- [Min-height per view](#min-height-per-view)
- [Related files](#related-files)

## View modes

| `view` value | Spanish label | Component | Selector | Body content |
| ------------ | ------------- | --------- | -------- | ------------ |
| `table` | Tabla | `DemoTableComponent` | `app-demo-table` | Mock data table with `config.tableRows` rows (default 5). Responsive wrapper; reflows at 50 % / 100 %. |
| `create-form` | Alta | `DemoCreateFormComponent` | `app-demo-create-form` | Simulated 2-column form (nombre, documento, email, teléfono, observaciones). No real submit / no API. Form actions dispatch events documented in [`actions-and-events.md`](actions-and-events.md). |
| `profile` | Perfil | `DemoProfileComponent` | `app-demo-profile` | Read-only `<dl>` key-value card from `config.profile`. Falls back to Spanish mock defaults (nombre, dni, email, saldo, estado) when `profile` is absent. `estado` rendered as a colour-coded `cba-badge`. |

## How a view is selected

`DemoComponent` reads the `data` Input and coerces it into a validated `DemoConfig` via `coerceDemoConfig` (see `src/app/demo/demo-config.ts`). The body is switched with an Angular `@switch` on `config.view`, defaulting to `'table'` when `view` is missing or invalid. Because `data` is a signal Input, view changes arrive live and re-render the body without a reload. The identity panel always shows the current `view` Spanish label (`Tabla` / `Alta` / `Perfil`).

## Configuration sources

| Source | Field | How it reaches the MFE |
| ------ | ----- | ---------------------- |
| Shell Footer definition | `WorkspaceModuleDefinition.config` | Copied into `data` when the instance is created. |
| Shell workspace state | `WorkspaceModule.data?: Record<string, unknown>` | Persisted / restored with the instance; passed as `data` Input. |
| Shell → MFE Input | `data` | Angular signal Input on `DemoComponent`. |
| `mfe:request-add-module` | `initialData?: Record<string, unknown>` | Optional; the demo uses it to pre-configure a new instance's `view`. |

**The Shell does NOT interpret the content of `data`.** `DemoConfig` is an internal convention of `mfe-demo` and is NOT part of `@cobranza-apps/mfe-events`.

## Field reference (DemoConfig)

```ts
type DemoViewMode = 'table' | 'create-form' | 'profile';

interface DemoConfig {
  view?: DemoViewMode;                       // default: 'table'
  title?: string;                            // pushed via mfe:update-header on init
  profile?: Record<string, unknown>;         // mock data when view === 'profile'
  tableRows?: number;                        // mock rows when view === 'table'
}
```

## Coercion rules

- Unknown / invalid `view` → falls back to `'table'`.
- Non-string `title` → dropped (`undefined`).
- Non-plain-object `profile` (null, array, primitive) → dropped.
- Non-finite or negative `tableRows` → falls back to `5`.

## Title behaviour

When `config.title` is present it is pushed via `mfe:update-header` on init; otherwise the title defaults to `"Demo – <SpanishLabel>"` (e.g. `"Demo – Tabla"`, `"Demo – Alta"`, `"Demo – Perfil"`) and auto-updates when the view changes via `data`. An `effect()` watches `resolvedTitle` and re-dispatches `mfe:update-header` on change.

## Example Footer entries

```ts
{ moduleType: 'demo', label: 'Demo – Tabla',  config: { view: 'table' } },
{ moduleType: 'demo', label: 'Demo – Alta',   config: { view: 'create-form', title: 'Alta simulada' } },
{ moduleType: 'demo', label: 'Demo – Perfil', config: { view: 'profile', title: 'Cliente demo', profile: { nombre: 'Juan Pérez', dni: '30111222', saldo: 15000 } } }
```

## Min-height per view

The demo declares a preferred `minHeightPx` per view via `mfe:update-min-height`. The Shell should persist it and apply it as CSS `min-height` on the module container.

| `view` | Declared `minHeightPx` |
| ------- | ---------------------- |
| `table` | 320 |
| `create-form` | 400 |
| `profile` | 280 |
| (default / unknown) | 320 |

Dispatch moments and payload shape: [`actions-and-events.md`](actions-and-events.md) §Min-height declaration. Shell-side responsibilities: [`mfe-demo-shell-usage.md`](mfe-demo-shell-usage.md) §Min-height contract.

## Related files

- `../src/app/demo/demo-config.ts` — `DemoViewMode`, `DemoConfig`, `coerceDemoConfig`.
- `../src/app/demo/demo.component.ts` — view switching and title effect.
- `../src/app/demo/views/demo-table/demo-table.component.ts`
- `../src/app/demo/views/demo-create-form/demo-create-form.component.ts`
- `../src/app/demo/views/demo-profile/demo-profile.component.ts`
- [`actions-and-events.md`](actions-and-events.md) — action buttons and dispatched events.
- [`shell-integration-guide.md`](shell-integration-guide.md) — debugging surfaces and Shell test-harness usage.
