# mfe-demo — Product

> Source of truth: [`brief.md`](brief.md). On conflict, `brief.md` wins.

## 1. Problem Definition

The Company Back-office Shell is a workspace-style host that loads multiple Micro-frontends (MFEs) via Native Federation. While the Shell is Work-In-Progress, there is no real business MFE available to:

- Validate the Shell ↔ MFE contract (Inputs, events, multi-instance, sizing, fullscreen, persistence).
- Let developers add modules to the Footer config without waiting for real business MFEs.
- Show future MFE authors a concrete, working reference of the expected contract.

`mfe-demo` fills that gap as a real Native Federation remote that is intentionally non-business.

## 2. Target Consumers

| Consumer | How they use `mfe-demo` |
| -------- | ----------------------- |
| Company Back-office Shell | Loads the remote during development to test workspace rows, 50%/100% sizing, collapse, fullscreen, drag & drop, persistence, and multi-instance. |
| Future MFE authors (developers) | Read it as a living reference of how a Company MFE must implement the Shell ↔ MFE contract. |
| Footer config authors | Add `demo` entries to surface placeholder modules in non-prod environments. |

UI language: **Spanish only** (no i18n). Target form factor: **Desktop only**.

## 3. Product Goals

1. **Test harness** — Exercise the Shell while it is WIP (workspace rows, 50%/100%, collapse, fullscreen, drag & drop, persistence, multi-instance).
2. **Living reference** — Demonstrate correct implementation of the Shell ↔ MFE contract for future MFEs.
3. **Placeholder** — Appear in the Footer config so developers can add modules without waiting for real business MFEs (`mfe-clients`, `mfe-debts`, etc.).

## 4. User Experience

All content lives inside the MFE container, **below** the Shell-owned `ModuleHeader`. The MFE never re-implements ModuleHeader, drag handle, size toggle, collapse, remove, or fullscreen chrome.

### 4.1 Always-present chrome

1. **Identity panel** — `moduleType`, `instanceId` (shortened + full on hover/copy), current `size`, `isCollapsed`, `isFullscreen`, current `view` mode, and optionally reported width/height in px.
2. **Visual instance marker** — Distinct background tint or coloured left border per instance (hash of `instanceId` → colour) so multi-instance is obvious at a glance.
3. **Action buttons** (using `@cobranza-apps/ui` buttons):
   - Actualizar título / estado del header (`mfe:update-header`)
   - Mostrar notificación success / warning / error (`mfe:show-notification`)
   - Pedir pantalla completa (`mfe:request-fullscreen`)
   - Pedir quitar módulo (`mfe:request-remove`)
   - (Opcional) Pedir agregar otra instancia `demo` (`mfe:request-add-module`)
   - (Opcional) Simular error (`mfe:module-error`)
4. **Data payload viewer** — Pretty-print of the raw `data` Input (when present) for debugging config.
5. **Event log (local)** — Last N events received / sent for this instance, to help debug Shell integration.

### 4.2 View-specific body (driven by `config.view`, default `table`)

| `view` | Content |
| -------- | --------- |
| `table` | Placeholder table / list that reflows with size. Uses `config.tableRows` (or a sensible default) for the number of mock rows. Short text explaining current size mode. Optional static chart placeholder to verify overflow behaviour. |
| `create-form` | Simulated fixed create form (not real, no API). Typical fields: nombre, documento, email, etc. Buttons only show notifications or update header (no real submit). Must remain usable at 50% (short) and 100% (long). |
| `profile` | Read-only profile / detail view (ficha). Key-value list from `config.profile` (or sensible mock defaults if absent). Looks like a client profile card / listado de información. |

View types are based on entities defined in `@cobranza-apps/entities`. Spanish labels only.

## 5. Non-Goals (Out of Scope)

- Business domain logic (clients, debts, bank statements, etc.).
- Real BFF / API calls (Phase 0 = frontend-only; mocks only if needed).
- Auth / login (owned by `mfe-auth` + Shell).
- Workspace layout, drag-and-drop, persistence (owned by Shell).
- Becoming a shared library that other MFEs import.
- Mobile layout.
- i18n.
- Production branding for company end-users (this is a developer tool / placeholder).
- Changes to `@cobranza-apps/mfe-events` for `DemoConfig` (keep `data` / `initialData` as opaque `Record<string, unknown>`).

## 6. Success Criteria

- Shell can load multiple `mfe-demo` instances simultaneously with isolated state per instance.
- Every `mfe:*` event includes `moduleType` + `instanceId`; every listened `shell:*` event is filtered by `instanceId`.
- All three view modes (`table`, `create-form`, `profile`) render correctly and reflow at `50%` and `100%`.
- Footer config entries with different `config` values produce the expected view on mount.
- Standalone preview (`ng serve`) works without the full Shell and allows injecting different `DemoConfig` values.