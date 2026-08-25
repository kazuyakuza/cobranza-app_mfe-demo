# Shell Usage Guide — mfe-demo

> Ready-to-copy configuration and manual test scenarios for Shell developers integrating
> the `mfe-demo` Native Federation remote.
> Source of truth: [`brief.md`](../.agent/project-info/brief.md) §3 and §5,
> [`architecture.md`](../.agent/project-info/architecture.md) §4 and §8.

## Table of Contents

- [Federation identity](#federation-identity)
- [Remote entry & dev port](#remote-entry--dev-port)
- [Footer definition examples](#footer-definition-examples)
- [How `data` / `initialData` map to `DemoConfig`](#how-data--initialdata-map-to-democonfig)
- [Action buttons → events](#action-buttons--events)
- [Min-height contract](#min-height-contract)
- [`shell:module-state` fields consumed](#shellmodule-state-fields-consumed)
- [Suggested manual test scenarios](#suggested-manual-test-scenarios)
- [Related files](#related-files)

## Federation identity

| Concept | Value |
| --------- | -------- |
| Remote name | `mfe-demo` |
| Exposed module | `./Component` |
| Component selector | `cba-demo` |
| `moduleType` (Shell side) | `demo` |
| Dev port | `4201` |
| Remote entry (local dev) | `http://localhost:4201/remoteEntry.json` |

## Remote entry & dev port

- Standalone preview: `http://localhost:4201` (run `npm run serve` or `npx ng serve`).
- Add the remote to the Shell's federation config with remote name `mfe-demo` pointing at `http://localhost:4201/remoteEntry.json`.
- No extra CORS config is needed for local `localhost` dev.

## Footer definition examples

Three ready-to-copy blocks (one per view). Each is a `WorkspaceModuleDefinition`-shaped snippet with `label`, `moduleType: 'demo'`, and `config`:

```ts
// table
{ moduleType: 'demo', label: 'Demo – Tabla', config: { view: 'table', tableRows: 5 } }

// create-form
{ moduleType: 'demo', label: 'Demo – Alta', config: { view: 'create-form', title: 'Alta simulada' } }

// profile
{
  moduleType: 'demo',
  label: 'Demo – Perfil',
  config: {
    view: 'profile',
    title: 'Cliente demo',
    profile: { nombre: 'Juan Pérez', dni: '30111222', email: 'juan@example.com', saldo: 15000, estado: 'Activo' }
  }
}
```

`config` is opaque to the Shell; `mfe-demo` interprets it as `DemoConfig` internally.

## How `data` / `initialData` map to `DemoConfig`

- Shell Footer `config` → `data` Input on creation.
- Persisted workspace state restores `data` on reload.
- `mfe:request-add-module` may carry `initialData` (demo uses `{ view: 'table' }`).

`DemoConfig` fields (`view?`, `title?`, `profile?`, `tableRows?`) and coercion rules live in [`views-and-config.md`](views-and-config.md).

## Action buttons → events

The demo exposes 8 action buttons that dispatch `mfe:*` events. See [`actions-and-events.md`](actions-and-events.md) for the full button → event table.

## Min-height contract

The demo dispatches `mfe:update-min-height` (`MFE_EVENTS.UPDATE_MIN_HEIGHT` from `@cobranza-apps/mfe-events@^0.6.0`) with reasons `'init'`, `'view-change'`, and `'content-change'`. Per-view values and payload shape are documented in [`views-and-config.md`](views-and-config.md) and [`actions-and-events.md`](actions-and-events.md).

**Shell responsibilities:**

1. Persist `minHeightPx` with the workspace instance.
2. Apply it as CSS `min-height` on the module container.
3. Treat it as a *preference*, not an exact height. Never echo it back as `shell:module-state.height`.

## `shell:module-state` fields consumed

The demo reads the following fields from `shell:module-state` (filtered by `instanceId` + `moduleType === 'demo'`):

| Field | Demo usage |
| ----- | ---------- |
| `size` | Identity panel size label; layout reflow. |
| `width`, `height` | Identity panel "1200 × 400 px" dimensions text. |
| `isCollapsed`, `isFullscreen` | Identity panel badges; layout. |
| `dragState?` (`'drag-start' \| 'drag-end' \| 'dropped'`) | Optional; shown in identity panel + event log when present. |
| `previewMode?` (`'collapsed'`) | Optional; shown in identity panel + event log when present. |

Note: `height` is the current container height reported by the Shell — NOT the demo's declared `minHeightPx`.

## Suggested manual test scenarios

1. **Multiple instances** — add several `demo` Footer entries; confirm distinct `instanceId`, colour marker, and isolated event logs.
2. **Resize 50 % / 100 %** — toggle `size`; views reflow and identity panel updates.
3. **Collapse & fullscreen** — toggle `isCollapsed` / `isFullscreen`; identity panel badges update.
4. **View change** — switch `config.view`; confirm `mfe:update-min-height` fires with `reason: 'view-change'` and the matching `minHeightPx`.
5. **Drag & drop / preview** — trigger drag or send `shell:module-state` with `dragState` / `previewMode`; confirm identity panel / event log reflects them.
6. **Persistence restore** — save, reload, confirm `data` restores the view and `mfe:update-min-height` fires with `reason: 'init'`.
7. **Notification, remove, add-module, error flows** — click the notification buttons, "Quitar módulo", "Agregar instancia", and "Simular error"; confirm Shell reacts.
8. **Min-height override** — in standalone preview, use "Reenviar min-height" with a debug override; confirm `mfe:update-min-height` fires and identity panel updates.

## Related files

- `../src/app/demo/demo.component.ts`
- `../src/app/demo/demo-dispatcher.ts`
- `../src/app/demo/demo-min-height.ts`
- `../src/app/demo/demo-shell-state.ts`
- [`views-and-config.md`](views-and-config.md)
- [`actions-and-events.md`](actions-and-events.md)
- [`shell-integration-guide.md`](shell-integration-guide.md)