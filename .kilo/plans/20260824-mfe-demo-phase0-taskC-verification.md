# Front-end Implementation Verification Report — Task C

**Repository:** `C:\projects\cobranza-app\front\mfe-demo`  
**Branch:** `feat/mfe-demo-phase0`  
**Spec:** `.kilo/plans/20260824-mfe-demo-phase0-taskC-frontend-spec.md`  
**Date:** 2026-08-24  
**Verifier:** frontend-specialist sub-agent

---

## 1. Verification scope

Files reviewed:

- `src/app/demo/views/demo-table/demo-table.component.ts`
- `src/app/demo/views/demo-table/demo-table.component.html`
- `src/app/demo/views/demo-table/demo-table.component.scss`
- `src/app/demo/demo.component.ts`
- `src/app/demo/demo.component.html`
- `src/app/demo/demo.component.scss`

Build command executed:

```bash
npm run build
```

Result: **success** (no new errors).

---

## 2. What matches the spec

| Spec requirement | Status |
|---|---|
| `DemoComponent` inputs remain unchanged and standalone | Matches |
| Identity panel markup, Spanish labels, `abbr` title tooltip | Matches |
| `CbaBadgeComponent` neutral outline badges for collapsed/fullscreen | Matches |
| `viewLabel()` mapping (`Tabla`, `Alta`, `Perfil`, `Desconocida`) | Matches |
| `hashString` algorithm and `instanceHue` / `instanceColorStyle` | Matches |
| Visual marker applied via `[style]` on root `.cba-demo` | Matches |
| `DemoTableComponent` created as standalone sub-component | Matches |
| Mock row shape, Spanish concepts, monto/fecha/estado rotation | Matches |
| `badgeVariantFor` mapping | Matches |
| Empty state for `rowCount === 0` | Matches |
| Table responsive hook `[attr.data-size]` and min-width rules | Matches |
| `@cobranza-apps/ui` tokens for header, body, text, border | Matches |
| No NgModules introduced | Matches |
| File and method line limits respected | Matches |

---

## 3. Diffs from the spec

### 3.1 Placeholder view labels are dynamic instead of hardcoded

**Spec reference:** §7 ("Exact markup")

Expected for `create-form`:

```html
<p class="cba-text-caption">Vista seleccionada: Alta</p>
```

Expected for `profile`:

```html
<p class="cba-text-caption">Vista seleccionada: Perfil</p>
```

Actual in `demo.component.html` (lines 45 and 51):

```html
<p class="cba-text-caption">Vista seleccionada: {{ viewLabel() }}</p>
```

**Impact:** Low — functionally equivalent, but violates the "Exact markup" directive.

**Fix:** Replace the dynamic binding with the hardcoded Spanish strings shown in the spec.

---

### 3.2 `rowCount` binding adds redundant `?? 5` fallback

**Spec reference:** §6.1

Expected:

```html
<app-demo-table [rowCount]="config().tableRows" [size]="size()" />
```

Actual in `demo.component.html` (line 40):

```html
<app-demo-table [rowCount]="config().tableRows ?? 5" [size]="size()" />
```

**Impact:** Low — `coerceDemoConfig` already defaults `tableRows` to `5`, so the fallback is redundant and not specified.

**Fix:** Remove `?? 5` to match the spec exactly.

---

### 3.3 `shortInstanceId` does not always append ellipsis

**Spec reference:** §3.1 ("First 8 characters of `instanceId()` followed by `…`")

Expected behavior: always first 8 characters + `…`.

Actual in `demo.component.ts` (lines 77–80):

```ts
function truncateInstanceId(value: string): string {
  return value.length > SHORT_ID_PREFIX_LENGTH
    ? `${value.slice(0, SHORT_ID_PREFIX_LENGTH)}…`
    : value;
}
```

The ellipsis is only appended when the id is longer than 8 characters.

**Impact:** Very low — typical `instanceId` values (UUIDs) are much longer than 8 characters, so the visible result is the same in practice.

**Fix:** Always return `${value.slice(0, 8)}…` regardless of input length, or update the spec to clarify edge-case behavior.

---

### 3.4 Row hover uses direct `background-color` instead of an overlay blend

**Spec reference:** §6.3

Expected: hover state implemented as an overlay using `linear-gradient` or `background-blend-mode` so the base row color remains visible.

Actual in `demo-table.component.scss` (lines 31–33):

```scss
.demo-table__table tbody tr:hover {
  background-color: var(--cba-hover);
}
```

**Impact:** Low — visual hover feedback exists, but it replaces rather than overlays the row background, which may look different from the intended token usage.

**Fix:** Use an overlay approach, for example:

```scss
.demo-table__table tbody tr:hover {
  background-color: var(--cba-hover);
  background-blend-mode: overlay;
}
```

or a `linear-gradient` combination as suggested in the spec.

---

## 4. Quality issues

### 4.1 Class JSDoc placed after `@Component` decorator

**Location:** `demo.component.ts` (lines 16–29) and `demo-table.component.ts` (lines 35–49).

Both class-level JSDoc blocks appear **below** the `@Component` decorator instead of above it. This reduces discoverability for IDEs and documentation generators.

**Fix:** Move the JSDoc comment immediately before the `@Component` decorator:

```ts
/**
 * Main exposed component of `mfe-demo`.
 * ...
 */
@Component({...})
export class DemoComponent { ... }
```

---

### 4.2 Additional styles not present in the spec

`demo.component.scss` includes extra rules for `:host`, `.cba-demo__identity`, `.cba-demo__identity-row`, `.cba-demo__instance-id`, and `.cba-demo__placeholder`. These are reasonable layout additions and do not conflict with the spec, but they were not part of the specified CSS snippet.

**Impact:** None functional — no action required unless strict spec fidelity is desired.

---

## 5. Conclusion

The implementation is functionally correct and the build passes. The following items deviate from the frontend spec and should be addressed:

1. Hardcode placeholder view labels in `demo.component.html` per §7.
2. Remove redundant `?? 5` fallback in the `rowCount` binding.
3. Decide whether `shortInstanceId` should always append ellipsis and align code or spec.
4. Implement row hover as an overlay blend per §6.3.
5. Move class JSDoc comments above the `@Component` decorator for better tooling support.

No blocking issues were found; all structural, file-size, and method-size constraints are respected.
