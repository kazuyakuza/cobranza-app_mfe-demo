# Shell Integration Guide

> How the Company Back-office Shell can use `mfe-demo` to test its workspace features, and how the
> event log / data viewer help debug the Shell ↔ MFE integration.
> Source of truth: [`brief.md`](../.agent/project-info/brief.md) §1 and §3, [`architecture.md`](../.agent/project-info/architecture.md) §4 and §8.

## Table of Contents
- [Debugging surfaces](#debugging-surfaces)
- [What the Shell can test with mfe-demo](#what-the-shell-can-test-with-mfe-demo)
- [Incoming events the MFE listens for](#incoming-events-the-mfe-listens-for)
- [Standalone preview vs loaded by Shell](#standalone-preview-vs-loaded-by-shell)
- [Related files](#related-files)

## Debugging surfaces

### Event log

`DemoEventLog` keeps the last 25 events for the current instance only (no shared singleton). It records both outgoing `mfe:*` and incoming `shell:*` events that passed the `instanceId` + `moduleType` filter. Rendered as a list inside a `cba-card` with direction (`→ OUT` / `← IN`), timestamp, event type, and a truncated JSON payload summary. A "Limpiar log" button clears the log. **Purpose: debugging Shell integration** — verify that the Shell receives dispatched events and that the MFE reacts to the right `shell:*` events for the right instance.

### Data payload viewer

A collapsible `cba-accordion` labelled "Payload (data)" shows a pretty-printed JSON of the raw `data` Input, updated live when `data` changes. **Purpose: debugging what configuration the Shell actually forwarded** to this instance (Footer `config`, persisted `data`, or `initialData`).

**The event log and data payload viewer are debugging surfaces for Shell integration; they are not production UI.**

## What the Shell can test with mfe-demo

| Shell functionality | How mfe-demo helps |
| ------------------- | ------------------ |
| Multi-instance | Add several `demo` Footer entries; each instance gets a unique `instanceId` and a distinct visual marker (hue derived from `instanceId`). Event logs stay isolated per instance. |
| 50 % / 100 % sizing | Toggle the `size` Input or send `shell:module-state`; the table/form/profile reflow and the identity panel updates its size label. |
| Collapse / fullscreen | Toggle `isCollapsed` / `isFullscreen` Inputs or send `shell:module-state`; identity panel badges update. |
| Header title & status | Use the "Actualizar título" button or send a `data` Input with a `title`; `mfe:update-header` updates the Shell header. |
| Notifications | Three buttons dispatch `mfe:show-notification` (success / warning / error) so the Shell toast pipeline can be verified. |
| Fullscreen request | "Pantalla completa" dispatches `mfe:request-fullscreen` so the Shell can test its fullscreen transition + the resulting `shell:module-state` echo. |
| Module removal | "Quitar módulo" dispatches `mfe:request-remove` so the Shell can test instance removal. |
| Add-module flow | "Agregar instancia" dispatches `mfe:request-add-module` with `initialData`; the Shell can test creating a new pre-configured instance. |
| Error path | "Simular error" dispatches `mfe:module-error` so the Shell can test its error-handling UI. |
| Configuration transport | Footer `config` → `data` round-trip can be inspected live in the data payload viewer. |
| Visibility | Send `shell:visibility-changed`; the identity panel shows a Visible/Oculto badge with the reason. |

## Incoming events the MFE listens for

| Event | Filter | Demo behaviour |
| ----- | ------ | -------------- |
| `shell:module-state` | `instanceId` + `moduleType === 'demo'` | Updates `DemoShellState` (size, width/height px, isCollapsed, isFullscreen); identity panel reflows. |
| `shell:visibility-changed` | `instanceId` + `moduleType === 'demo'` | Updates visibility badge + reason in the identity panel. |
| `shell:theme-changed` | global (no instance filter) | Recorded in the event log only. |

## Standalone preview vs loaded by Shell

`ng serve` runs `DemoPreviewComponent` at `http://localhost:4201`, which injects mock Inputs and exposes controls for `view`, `title`, `tableRows`, `profile` JSON, `size`, `isCollapsed`, `isFullscreen`, plus buttons that dispatch synthetic `shell:module-state` and `shell:visibility-changed` events scoped to the mock `instanceId`. This exercises the listener path without a real Shell. When loaded by the Shell, the Shell hosts `DemoComponent` directly via federation (`./Component`, remote name `mfe-demo`); the preview host is NOT used in that mode.

## Related files

- `../src/app/demo/demo.component.ts` — shell listeners + identity panel wiring.
- `../src/app/demo/demo-event-log.ts` — `DemoEventLog` (debugging event log).
- `../src/app/demo/demo-shell-state.ts` — `DemoShellState` (incoming state resolution).
- `../src/app/demo-preview/demo-preview.component.ts` — standalone preview host (shell event simulation).
- [`views-and-config.md`](views-and-config.md) — view selection.
- [`actions-and-events.md`](actions-and-events.md) — action buttons and dispatched events.