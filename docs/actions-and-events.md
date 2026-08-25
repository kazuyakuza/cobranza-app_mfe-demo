# Action Buttons & Events

> The full action-button set exposed by `mfe-demo` and the `mfe:*` event each one fires.
> Source of truth: [`architecture.md`](../.agent/project-info/architecture.md) §4.2 and §8.

## Table of Contents
- [Action bar](#action-bar)
- [Action buttons → events](#action-buttons--events)
- [Event payload contract](#event-payload-contract)
- [Create-form handlers](#create-form-handlers)
- [Lifecycle events](#lifecycle-events)
- [Related files](#related-files)

## Action bar

`DemoComponent` renders an action bar (`<section class="cba-demo__actions">`) of `cba-button` elements built from the `actionButtons` array. Buttons wrap/stack at 50 % width. Every dispatch is recorded in the per-instance event log and logged to the browser console.

## Action buttons → events

| Button label (ES) | `mfe:*` event | Variant | Payload notes |
| ----------------- | ------------- | ------- | ------------- |
| Actualizar título | `mfe:update-header` | primary | Cycles through 3 fixed title/status pairs (`HEADER_DEMOS`): `('Demo – Título A', loaded)`, `('Demo – Título B', success)`, `('Demo – Título C', warning)`. |
| Notificación éxito | `mfe:show-notification` | success | `type: 'success'`, message `'Notificación de éxito'`. |
| Notificación advertencia | `mfe:show-notification` | secondary | `type: 'warning'`, message `'Notificación de advertencia'`. |
| Notificación error | `mfe:show-notification` | danger | `type: 'error'`, message `'Notificación de error'`. |
| Pantalla completa | `mfe:request-fullscreen` | secondary | No extra payload beyond identity. |
| Quitar módulo | `mfe:request-remove` | danger | No extra payload beyond identity. |
| Agregar instancia | `mfe:request-add-module` | secondary | `moduleType: 'demo'`, `title: 'Nueva instancia demo'`, `initialData: { view: 'table' }`. |
| Simular error | `mfe:module-error` | danger | `message: 'Error simulado desde mfe-demo'`, `code: 'DEMO_ERROR'`. |

## Event payload contract

- Every outgoing event includes `schemaVersion` (from `SCHEMA_VERSION`), `moduleType`, and `instanceId`.
- `mfe:show-notification` and `mfe:request-add-module` build their payloads directly (see `demo-dispatcher.ts`); the identity-bearing events use the internal `withIdentity` helper.
- All dispatches go through `DemoDispatcher.send`, which records the entry in `DemoEventLog` (direction `'out'`) and calls `console.log('[mfe-demo] dispatch', name, payload)` before `dispatchMfeEvent`.

## Create-form handlers

The `'create-form'` view emits `primaryAction` / `secondaryAction` outputs consumed by `DemoComponent`:

- `onCreateFormPrimary` → `mfe:show-notification` (success, `'Formulario de prueba enviado (sin API real)'`) + `mfe:update-header` (status `success`).
- `onCreateFormSecondary` → resets the form signals + `mfe:show-notification` (info, `'Formulario reiniciado'`).

## Lifecycle events

- `mfe:module-ready` — dispatched once on `ngOnInit` (`DemoDispatcher.ready()`).
- `mfe:update-header` — dispatched on init (title effect) and whenever `resolvedTitle` changes (view switch via `data`).

## Related files

- `../src/app/demo/demo.component.ts` — `actionButtons` array and create-form handlers.
- `../src/app/demo/demo-dispatcher.ts` — `DemoDispatcher` (all `mfe:*` dispatch logic, `HEADER_DEMOS`).
- `../src/app/demo/demo-event-log.ts` — outgoing/incoming event recording.
- [`views-and-config.md`](views-and-config.md) — view selection.
- [`shell-integration-guide.md`](shell-integration-guide.md) — debugging surfaces and Shell test-harness usage.