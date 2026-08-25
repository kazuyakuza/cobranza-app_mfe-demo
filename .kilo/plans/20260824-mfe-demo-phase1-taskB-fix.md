# Fix Plan — Task B Code Review (Views Implementation)

**Source TODO:** `.agent/todos/20260803/20260803-todo-2.md` — Tasks 1–4  
**Implementation plan reviewed:** `.kilo/plans/20260824-mfe-demo-phase1-taskB.md`  
**Branch:** `feat/mfe-demo-phase1`  
**Scope:** Correct rule violations found during 4.3 Code Review; no functional/scope expansion.

---

## Issues Found

| # | File | Severity | Description |
|---|------|----------|-------------|
| 1 | `src/app/demo/demo.component.ts` | Must fix | File is **203 lines**, exceeding the `max-lines-per-file` rule (200 lines). The bottom helper code (`hashString`, `truncateInstanceId`, `SHORT_ID_PREFIX_LENGTH`) is reusable and should be extracted. |
| 2 | `src/app/demo/views/demo-profile/demo-profile.component.ts` | Must fix | `resolveEstadoVariant` contains a multi-section boolean condition (`estado === 'Vencido' || estado === 'Inactivo'`) inside an `if`, violating the `single-section-boolean-conditions` rule. |

`npm run build` currently succeeds and all reviewed functionality (view switching, title effect, form/profile components, event handlers) matches the implementation plan. Only the two rule violations above need correction.

---

## Fix Steps

### Step 1 — Extract instance ID helpers to a new utility file

Create `src/app/demo/demo-instance-helpers.ts` with the pure helper functions currently living at the bottom of `demo.component.ts`.

**New file content:**

```ts
/** Stable prefix length used when truncating long instance IDs for display. */
export const SHORT_ID_PREFIX_LENGTH = 8;

/** Simple string hash used to generate a deterministic hue per instance. */
export function hashString(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    const char = value.charCodeAt(index);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

/** Truncates a long instance ID to a readable prefix followed by an ellipsis. */
export function truncateInstanceId(value: string): string {
  return value.length > SHORT_ID_PREFIX_LENGTH
    ? `${value.slice(0, SHORT_ID_PREFIX_LENGTH)}…`
    : value;
}
```

**Constraints:**
- Keep the functions pure and unchanged (same logic, same `SHORT_ID_PREFIX_LENGTH` value).
- Do NOT add unrelated helpers.

---

### Step 2 — Update `src/app/demo/demo.component.ts`

**A. Add the new import** after the `demo-config` import line:

```ts
import { hashString, truncateInstanceId } from './demo-instance-helpers';
```

**B. Replace the `instanceHue` computed** to use the imported helper instead of the private method:

Replace:
```ts
  readonly instanceHue = computed(() => this.hashString(this.instanceId()) % 360);
```

With:
```ts
  readonly instanceHue = computed(() => hashString(this.instanceId()) % 360);
```

**C. Remove the private `hashString` method** (lines ~186–194):

```ts
  private hashString(value: string): number {
    let hash = 0;
    for (let index = 0; index < value.length; index += 1) {
      const char = value.charCodeAt(index);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return Math.abs(hash);
  }
```

**D. Remove the bottom module-level helpers** (lines ~197–203):

```ts
const SHORT_ID_PREFIX_LENGTH = 8;

function truncateInstanceId(value: string): string {
  return value.length > SHORT_ID_PREFIX_LENGTH
    ? `${value.slice(0, SHORT_ID_PREFIX_LENGTH)}…`
    : value;
}
```

The file should now end after the `attachShellListeners` method and its closing brace.

**E. Verify line count** with `read` — the file must be **≤ 200 lines** (target ~188 lines).

**F. Verify diagnostics** with `vscode-mcp-server_get_diagnostics_code` on `demo.component.ts` — no errors.

---

### Step 3 — Fix single-section boolean condition in `demo-profile.component.ts`

In `src/app/demo/views/demo-profile/demo-profile.component.ts`, replace the inline `||` condition with a named constant set.

**A. Add a module-level constant** above `DEFAULT_PROFILE`:

```ts
const DANGER_ESTADOS: Readonly<Set<string>> = new Set(['Vencido', 'Inactivo']);
```

**B. Replace the condition inside `resolveEstadoVariant`**:

Replace:
```ts
    if (estado === 'Vencido' || estado === 'Inactivo') return 'danger';
```

With:
```ts
    if (DANGER_ESTADOS.has(estado)) return 'danger';
```

**C. Verify diagnostics** with `vscode-mcp-server_get_diagnostics_code` on `demo-profile.component.ts` — no errors.

---

### Step 4 — Final verification

1. Run `npm run build` and confirm it succeeds with zero errors.
2. Confirm `src/app/demo/demo.component.ts` is ≤ 200 lines.
3. Confirm no new diagnostics appear in the touched files.

---

## Files Touched (summary)

| File | Action |
|------|--------|
| `src/app/demo/demo-instance-helpers.ts` | create — extracted `hashString`, `truncateInstanceId`, `SHORT_ID_PREFIX_LENGTH` |
| `src/app/demo/demo.component.ts` | edit — import helpers, remove local private method + bottom helpers |
| `src/app/demo/views/demo-profile/demo-profile.component.ts` | edit — replace multi-section `if` condition with `DANGER_ESTADOS` set |

**No other files may be modified.** No new dependencies. No functional behaviour changes.

---

## Acceptance Criteria

- [ ] `demo.component.ts` ≤ 200 lines.
- [ ] `demo-profile.component.ts` no longer contains a multi-section `if` condition.
- [ ] `npm run build` succeeds.
- [ ] All existing functionality from Tasks 1–4 remains intact (view switching, title effect, form/profile rendering, event handlers).
