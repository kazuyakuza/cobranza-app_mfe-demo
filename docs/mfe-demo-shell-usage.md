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
    profile: { nombre: 'Juan Pérez', dni: '30111222', email: 'juan@example.com', saldo: 15000, estado: 'activo' }
  }
}
```

`config` is opaque to the Shell; `mfe-demo` interprets it as `DemoConfig` internally.

## How `data` / `initialData` map to `DemoConfig`

- Shell copies `WorkspaceModuleDefinition.config` into the instance `data` Input on creation.
- Persisted workspace state restores `data` on reload.
- `mfe:request-add-module` may carry `initialData` to pre-configure a new instance (demo uses `{ view: 'table' }`).
- Field reference (copy of the `DemoConfig` interface from `demo-config.ts`): `view?`, `title?`, `profile?`, `tableRows?`.
- Coercion: invalid `view` → `'table'`; non-string `title` → dropped; non-plain-object `profile` → dropped; non-finite/negative `tableRows` → `5`.
- Link to [`views-and-config.md`](views-and-config.md) for the full field reference.

## Action buttons → events

The demo exposes 8 action buttons that dispatch `mfe:*` events. See [`actions-and-events.md`](actions-and-events.md) for the button → event table — the full table is not duplicated here. Event names used across the demo: `mfe:update-header`, `mfe:show-notification`, `mfe:request-fullscreen`, `mfe:request-remove`, `mfe:request-add-module`, `mfe:module-error`, `mfe:update-min-height`.

## Min-height contract

- The demo dispatches `mfe:update-min-height` (`MFE_EVENTS.UPDATE_MIN_HEIGHT` from `@cobranza-apps/mfe-events@^0.6.0`).
- Dispatch moments:
  - `reason: 'init'` — once on `ngOnInit`.
  - `reason: 'view-change'` — when `config.view` changes via `data`.
  - `reason: 'content-change'` — when `tableRows` changes while `view === 'table'`.
- Per-view declared values (from `demo-min-height.ts`): `table` 320 px, `create-form` 400 px, `profile` 280 px.
- Payload shape (identity-bearing): `{ schemaVersion, moduleType, instanceId, minHeightPx, reason }`.
- **Shell responsibilities:**
  1. Persist `minHeightPx` with the workspace instance so it survives reload.
  2. Apply it as CSS `min-height` on the module container (the demo never sets its own outer height).
  3. Treat it as a *preference*, not an exact height. Never echo it back as `shell:module-state.height` (that field is the current container height, a different concept).
- The demo does NOT implement the Shell-side listener; it only emits.

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

1. **Multiple instances** — add several `demo` Footer entries via the Shell Footer `+`; confirm each gets a distinct `instanceId`, a distinct colour marker, and isolated event logs.
2. **Resize 50 % / 100 %** — toggle `size` (or send `shell:module-state`); views reflow without horizontal overflow; identity panel updates.
3. **Collapse & fullscreen** — toggle `isCollapsed` / `isFullscreen` (or `shell:module-state`); identity panel badges update; no layout breakage.
4. **View change via Footer** — add instances with different `config.view`; confirm `mfe:update-min-height` re-dispatches with `reason: 'view-change'` and a different `minHeightPx` (320 / 400 / 280).
5. **Drag-and-drop** — if the Shell supports DnD, trigger a drag; confirm `dragState` appears in the demo identity panel / event log.
6. **Persistence restore** — save workspace with demo instances in different views, reload; confirm `data` restores the view and `mfe:update-min-height` fires with `reason: 'init'`.
7. **Notification flow** — click the three notification buttons; confirm Shell toasts render.
8. **Remove flow** — click "Quitar módulo"; confirm Shell removes the instance.
9. **Request-add-module flow** — click "Agregar instancia"; confirm Shell creates a new `demo` instance with `initialData: { view: 'table' }`.
10. **Update-min-height flow** — open the standalone preview (`npm run serve`), use "Reenviar min-height" with a debug override; confirm `mfe:update-min-height` fires with the override value and the identity panel updates.
11. **Error flow** — click "Simular error"; confirm Shell error-handling UI.

## Related files

- `../src/app/demo/demo.component.ts`
- `../src/app/demo/demo-dispatcher.ts`
- `../src/app/demo/demo-min-height.ts`
- `../src/app/demo/demo-shell-state.ts`
- [`views-and-config.md`](views-and-config.md)
- [`actions-and-events.md`](actions-and-events.md)
- [`shell-integration-guide.md`](shell-integration-guide.md)