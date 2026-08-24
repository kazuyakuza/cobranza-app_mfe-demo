# mfe-demo — Architecture

> Source of truth: [`brief.md`](brief.md). On conflict, `brief.md` wins.

## 1. System Context

```text
+-------------------+        Native Federation (dynamic import)        +-------------------+
|  Back-office Shell| --------------------------------------------------> |   mfe-demo (remote)|
|  (host / workspace)|<------------------- mfe:* events ------------------|   Angular 22 remote|
|  @cobranza-apps/ui |------------------- shell:* events ----------------->|   standalone comp. |
+-------------------+                                                          +-------------------+
        |                                                                 relies on
        |  consumes                                                       @cobranza-apps/ui
        v                                                                 @cobranza-apps/mfe-events
  @cobranza-apps/mfe-events                                               @cobranza-apps/entities (optional)
  @cobranza-apps/ui
  @cobranza-apps/entities
```

`mfe-demo` is a **remote** loaded by the Shell. It is NOT a host, NOT a library, NOT a monorepo. It renders only inside its own container body (below the Shell-owned `ModuleHeader`).

## 2. Architectural Boundaries (Core Rules)

- Never manipulate the DOM outside its own container.
- Never know about rows, drag-and-drop, or the workspace layout engine.
- Communicate with the Shell ONLY via `@cobranza-apps/mfe-events` + Angular Inputs provided by the Shell host.
- Module chrome (title bar actions, drag handle) is owned by the Shell / `@cobranza-apps/ui`. This MFE renders only body content.
- Per-instance state isolation: no shared singleton state across instances.

## 3. Component Architecture (Planned)

```text
src/app/
  demo/
    demo.component.ts        # main exposed standalone component (accepts Inputs §3.2)
    demo.component.html
    demo.component.scss
    demo-config.ts           # DemoViewMode + DemoConfig types (brief §3.6)
    views/                   # optional sub-components: table / create-form / profile
  core/                      # optional event-helper wrappers (filter by instanceId)
  app.config.ts
src/bootstrap.ts             # federation bootstrap if required
src/index.html
src/styles.scss              # imports @cobranza-apps/ui theme
```

Single clear entry component is preferred; sub-views may be plain components or template branches. Keep the surface small.

## 4. Shell ↔ MFE Contract

### 4.1 Inputs (Shell → Component)

| Input | Type | Purpose |
| ------- | ------ | --------- |
| `moduleType` | `string` | Always `'demo'` for this remote |
| `instanceId` | `string` (UUID) | Unique per workspace instance |
| `size` | `'50%' \| '100%'` | Current width fraction (`short`/`long` aliases allowed) |
| `isCollapsed` | `boolean` | Collapsed state |
| `isFullscreen` | `boolean` | Fullscreen state |
| `data` | `Record<string, unknown> \| undefined` | Opaque initial / runtime data (see §5 below) |
| (optional) pixel size / minHeight inputs | as defined by Shell | If Shell prefers Inputs over events for dimensions |

The component must react to Input changes (tables/charts/content adapt when size or fullscreen changes).

### 4.2 Events — MFE → Shell (must implement via `@cobranza-apps/mfe-events`)

| Event | When to fire | Demo behaviour |
| ------- | -------------- | ---------------- |
| `mfe:module-ready` | After first successful mount | Shell can hide skeleton |
| `mfe:update-header` | On init and when user changes title/status in demo UI | Update title + status badge |
| `mfe:show-notification` | Button "Mostrar notificación" | Toast success / warning / error |
| `mfe:request-fullscreen` | Button "Pedir pantalla completa" | Shell switches this instance to fullscreen |
| `mfe:request-remove` | Button "Pedir quitar" (optional) | Shell removes this instance |
| `mfe:module-error` | Only if intentional error demo is triggered | Optional error path |
| `mfe:request-add-module` (optional) | Button asking Shell to add another `demo` instance | May include `initialData` to pre-configure the new instance's view |

### 4.3 Events — Shell → MFE (must listen)

| Event | Demo behaviour |
| ------- | ---------------- |
| `shell:module-state` | Update internal display of size / collapse / fullscreen / dimensions; reflow content |
| `shell:visibility-changed` | Pause / resume heavy work if needed (demo can just log or show a badge) |
| `shell:theme-changed` | Optional; theme is global via CSS tokens — react only if demo needs to |

**Always filter by `instanceId`.** Always review and follow `@cobranza-apps/mfe-events` lib documentation.

## 5. Configurable View Mode (`DemoConfig`)

The Shell transports opaque configuration through `data` — **no changes to `@cobranza-apps/mfe-events` are required**.

```ts
type DemoViewMode = 'table' | 'create-form' | 'profile';

interface DemoConfig {
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

Component usage:

```ts
@Input() data: Record<string, unknown> | undefined;

get config(): DemoConfig {
  return (this.data ?? {}) as DemoConfig;
}

get view(): DemoViewMode {
  return this.config.view ?? 'table';
}
```

Data sources: Shell Footer `WorkspaceModuleDefinition.config` → copied to `data`; workspace `WorkspaceModule.data` persisted/restored; Shell → MFE `data` Input; `mfe:request-add-module` `initialData`. The Shell does NOT interpret `data` content.

## 6. Federation & Hosting

- **Remote name:** `mfe-demo` (suggested; confirm with Shell).
- **Exposed module:** `./Component` (suggested; confirm with Shell).
- **Exposed component:** standalone, accepts Inputs from §4.1.
- **Public path / CORS:** configure federation public path so the remote works when Shell and remote run on different origins/ports in local dev. Document expected ports in README.
- **Dev modes:**
  1. **Standalone preview** — `ng serve` with a minimal local host page that simulates Shell Inputs and listens to `mfe:*` events; allows selecting / injecting different `DemoConfig` values.
  2. **Loaded by Shell** — primary mode; Shell loads the remote via Native Federation into the workspace / fullscreen outlet; Footer entries / `initialData` drive the views.

## 7. Design Patterns

- **Standalone components only** (Angular 22, no NgModules).
- **Input-driven reactivity** — content reacts to `Input` changes (`size`, `isFullscreen`, `data`).
- **Event-bus filtering** — all `shell:*` listeners filter by `instanceId` (+ usually `moduleType`).
- **Per-instance state** — no shared singletons; state lives on the component instance.
- **Opaque config contract** — `DemoConfig` is internal to this repo; the Shell only sees `Record<string, unknown>`.
- **CSS tokens / Bootstrap 5** — consume `@cobranza-apps/ui` theme + tokens; do not invent parallel styling.

## 8. Critical Paths

1. **Mount → ready:** component mounts → reads Inputs → emits `mfe:module-ready` → Shell hides skeleton.
2. **Size change → reflow:** Shell changes `size` Input (or sends `shell:module-state`) → component reflows table/form/profile for `50%` vs `100%`.
3. **Fullscreen request:** user clicks "Pedir pantalla completa" → `mfe:request-fullscreen` → Shell switches instance → `shell:module-state` / `isFullscreen` Input reflects new state.
4. **Add module:** user clicks "Pedir agregar" → `mfe:request-add-module` with optional `initialData` → Shell creates new instance → new instance receives `data` Input.
5. **Error path (optional):** user triggers "Simular error" → `mfe:module-error` → Shell handles error UI.

## 9. Min-Height Declaration

If the Shell contract supports it (Input and/or event), declare a sensible `minHeightPx` (enough for header chrome + a small form + a short table). Update it if content changes significantly; different views may need different min-heights.