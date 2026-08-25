# mfe-demo Phase 0 — Task B Code Simplification Plan

> Reviewer: code-simplifier sub-agent  
> Scope: Files produced by Task B 4.2 (TODO Tasks 3–6): `src/app/demo/demo-config.ts`, `src/app/demo/demo.component.{ts,html,scss}`, `src/app/demo-preview/demo-preview.component.{ts,html,scss}`, `src/app/app.routes.ts`, `src/styles.scss`.  
> Constraint: Do NOT modify files directly. Do NOT expand scope to Tasks 7–11.

## Summary

The implementation is already small and follows the approved plan. Four low-risk simplifications were identified that reduce template bindings, class surface, and cognitive load without changing Task B's scope or behavior.

## Simplifications

### 1. Remove unused `schemaVersion` / `readyEventName` class fields and their imports

**Files:** `src/app/demo/demo.component.ts`, `src/app/demo/demo.component.html`

**Current state:**
- `demo.component.ts` imports `MFE_EVENTS` and `SCHEMA_VERSION` only to expose them as readonly fields for the template.
- `demo.component.html` renders `Esquema: {{ schemaVersion }} · Evento ready: {{ readyEventName }}` in the summary panel.

**Why simplify:**
- These values are not part of the Task B acceptance criteria and are not required by the identity panel spec (Task 7).
- Task 9 will import `MFE_EVENTS` and `SCHEMA_VERSION` directly when it wires event dispatch; keeping them as class fields now adds dead weight.
- Removing them eliminates two public class members, two template bindings, and two imports.

**Atomic change:**

In `src/app/demo/demo.component.ts`:
- Change import to: `import { type ModuleSize } from '@cobranza-apps/mfe-events';`
- Remove class fields:
  ```ts
  readonly schemaVersion = SCHEMA_VERSION;
  readonly readyEventName = MFE_EVENTS.MODULE_READY;
  ```

In `src/app/demo/demo.component.html`:
- Remove the entire fourth summary paragraph:
  ```html
  <p class="cba-text-caption">Esquema: {{ schemaVersion }} · Evento ready: {{ readyEventName }}</p>
  ```

### 2. Remove `sizeLabel` computed and use Spanish size text

**Files:** `src/app/demo/demo.component.ts`, `src/app/demo/demo.component.html`

**Current state:**
- `demo.component.ts` defines `readonly sizeLabel = computed(() => (this.size() === '100%' ? 'long' : 'short'));`.
- The template shows `Tamaño: {{ size() }} ({{ sizeLabel() }})` — a mix of Spanish and English.

**Why simplify:**
- `size()` already carries the meaningful value (`'50%'` / `'100%'`). An extra computed signal and English label add noise.
- The TODO brief explicitly suggests Spanish size text: *“Modo ancho: 50%” / “100%”*.

**Atomic change:**

In `src/app/demo/demo.component.ts`:
- Remove the `sizeLabel` computed property.

In `src/app/demo/demo.component.html`:
- Replace the size paragraph with:
  ```html
  <p class="cba-text-caption">
    Modo ancho: {{ size() }} · Colapsado: {{ isCollapsed() }} · Pantalla completa: {{ isFullscreen() }}
  </p>
  ```

### 3. Drop redundant generic annotation on `view` computed

**File:** `src/app/demo/demo.component.ts`

**Current state:**
```ts
readonly view = computed<DemoViewMode>(() => this.config().view ?? 'table');
```

**Why simplify:**
- The generic parameter is redundant; TypeScript infers `DemoViewMode` from the fallback value `'table'` and the `config().view` type.

**Atomic change:**
```ts
readonly view = computed(() => this.config().view ?? 'table');
```

### 4. Simplify `DEFAULT_DEMO_CONFIG` and replace complex type

**File:** `src/app/demo/demo-config.ts`

**Current state:**
```ts
export const DEFAULT_DEMO_CONFIG: Required<Pick<DemoConfig, 'view' | 'tableRows'>> = {
  view: 'table',
  tableRows: 5,
};
```

**Why simplify:**
- `Required<Pick<DemoConfig, 'view' | 'tableRows'>>` adds cognitive load for a simple defaults pair.
- Two standalone constants are clearer and avoid the partial `DemoConfig` shape.

**Atomic change:**
```ts
const DEFAULT_VIEW: DemoViewMode = 'table';
const DEFAULT_TABLE_ROWS = 5;
```

Then update `coerceDemoConfig` to reference them directly:
```ts
export function coerceDemoConfig(data: Record<string, unknown> | undefined): DemoConfig {
  const raw = (data ?? {}) as DemoConfig;

  return {
    view: isValidViewMode(raw.view) ? raw.view : DEFAULT_VIEW,
    title: typeof raw.title === 'string' ? raw.title : undefined,
    profile: isPlainObject(raw.profile) ? raw.profile : undefined,
    tableRows: isValidTableRowCount(raw.tableRows) ? raw.tableRows : DEFAULT_TABLE_ROWS,
  };
}
```

Because `DEFAULT_DEMO_CONFIG` is not imported anywhere else in the reviewed files, it can be removed without impact.

### 5. Rephrase preview placeholder to avoid internal TODO references

**File:** `src/app/demo-preview/demo-preview.component.html`

**Current state:**
```html
<p class="cba-text-small">Host simulado — controles completos en Task 10.</p>
```

**Why simplify:**
- "Task 10" is an internal TODO artifact, not user-facing language.
- A neutral Spanish phrase keeps the UI clean and self-describing.

**Atomic change:**
```html
<p class="cba-text-small">Host simulado — controles en desarrollo.</p>
```

## Files affected

| File | Change |
|------|--------|
| `src/app/demo/demo-config.ts` | Replace `DEFAULT_DEMO_CONFIG` with `DEFAULT_VIEW` + `DEFAULT_TABLE_ROWS` constants (no export change). |
| `src/app/demo/demo.component.ts` | Remove `sizeLabel`, `schemaVersion`, `readyEventName`; narrow mfe-events import to `type ModuleSize`; drop `computed` generic. |
| `src/app/demo/demo.component.html` | Update size label to Spanish; remove schema/ready paragraph. |
| `src/app/demo-preview/demo-preview.component.html` | Rephrase placeholder text. |

## Not in scope / intentionally not suggested

- Adding `mfe:module-ready` / `mfe:update-header` dispatch — Task 9.
- Building the full identity panel, visual marker, or table body — Tasks 7–8.
- Adding preview controls or event logging — Task 10.
- Changing boolean rendering (`false` → `Sí/No`) — minor UX polish, not simplification.
- Refactoring `coerceDemoConfig` to use object spread — current explicit form is clearer; spread would not reduce complexity.
