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

`DemoEventLog` keeps the last 25 incoming `shell:*` and outgoing `mfe:*` events for the current instance only. It shows direction, timestamp, event type, and a truncated payload summary. Use it to verify that the Shell receives dispatched events and that the MFE reacts to the right `shell:*` events for the right instance.

### Data payload viewer

A collapsible `cba-accordion` shows the raw `data` Input as pretty-printed JSON. Use it to inspect the configuration the Shell forwarded (Footer `config`, persisted `data`, or `initialData`).

**Both surfaces are debugging aids, not production UI.**

## What the Shell can test with mfe-demo

> Button-triggered `mfe:*` events are documented in [`actions-and-events.md`](actions-and-events.md). The table below focuses on the Shell feature being exercised.

| Shell functionality | How mfe-demo helps |
| ------------------- | ------------------ |
| Multi-instance | Add several `demo` Footer entries; each instance gets a unique `instanceId` and a distinct visual marker. Event logs stay isolated per instance. |
| 50 % / 100 % sizing | Toggle the `size` Input or send `shell:module-state`; the views reflow and the identity panel updates its size label. |
| Collapse / fullscreen | Toggle `isCollapsed` / `isFullscreen` Inputs or send `shell:module-state`; identity panel badges update. |
| Header title & status | Update via the "Actualizar título" button or a `data` Input with `title`; see [`actions-and-events.md`](actions-and-events.md) for the payload. |
| Notifications | Verify the Shell toast pipeline with the three notification buttons. |
| Fullscreen request | Test the Shell fullscreen transition and the resulting `shell:module-state` echo. |
| Module removal | Test instance removal. |
| Add-module flow | Test creating a new pre-configured instance via `mfe:request-add-module`. |
| Error path | Test Shell error-handling UI via `mfe:module-error`. |
| Configuration transport | Inspect the Footer `config` → `data` round-trip live in the data payload viewer. |
| Visibility | Send `shell:visibility-changed`; the identity panel shows a Visible/Oculto label with the reason. |
| Min-height | The demo emits `mfe:update-min-height` on init / view-change / content-change; the Shell should persist `minHeightPx` and apply it as CSS `min-height`. See [`mfe-demo-shell-usage.md`](mfe-demo-shell-usage.md). |
| Drag & preview | Send `shell:module-state` with `dragState` (`'drag-start' \| 'drag-end' \| 'dropped'`) or `previewMode` (`'collapsed'`); the identity panel + event log reflect them. |

## Incoming events the MFE listens for

| Event | Filter | Demo behaviour |
| ----- | ------ | -------------- |
| `shell:module-state` | `instanceId` + `moduleType === 'demo'` | Updates `DemoShellState` (size, width/height px, isCollapsed, isFullscreen, optional `dragState`, optional `previewMode`); identity panel reflows. |
| `shell:visibility-changed` | `instanceId` + `moduleType === 'demo'` | Updates visibility label + reason in the identity panel. |
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
