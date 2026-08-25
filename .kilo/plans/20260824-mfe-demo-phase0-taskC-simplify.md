# Task C Code Simplification Plan — Identity Panel + Default Table View

## Summary

The implementation is already small and readable. A few localized simplifications are possible:

1. Remove unused computed property in `DemoComponent`.
2. Replace imperative row-building loop with a declarative `Array.from`.
3. Remove an unnecessary wrapper method around estado-to-variant mapping.
4. Replace chained `if` statements with a lookup record for view labels.
5. Reduce hard-coded Spanish labels in the placeholder templates.

All proposed changes are local, preserve behavior, and stay within Task C scope.

---

## 1. `src/app/demo/demo.component.ts`

### 1.1 Remove dead code: `sizeLabel`

The computed property `sizeLabel` is defined but never referenced in the reviewed files:

```ts
readonly sizeLabel = computed(() => (this.size() === '100%' ? 'long' : 'short'));
```

**Action:** Delete this property. Verify it is not used in any test or sibling file before committing.

### 1.2 Simplify `viewModeToSpanishLabel` with a lookup record

Replace the chained `if` statements:

```ts
function viewModeToSpanishLabel(view: string): string {
  if (view === 'table') {
    return 'Tabla';
  }
  if (view === 'create-form') {
    return 'Alta';
  }
  if (view === 'profile') {
    return 'Perfil';
  }
  return 'Desconocida';
}
```

With a readonly lookup record:

```ts
const VIEW_LABELS: Readonly<Record<string, string>> = {
  table: 'Tabla',
  'create-form': 'Alta',
  profile: 'Perfil',
};

function viewModeToSpanishLabel(view: string): string {
  return VIEW_LABELS[view] ?? 'Desconocida';
}
```

**Rationale:** Easier to extend, single source of truth, shorter, and aligns with the `self-documenting-code` rule.

---

## 2. `src/app/demo/views/demo-table/demo-table.component.ts`

### 2.1 Simplify `buildMockRows`

Replace the imperative loop:

```ts
private buildMockRows(count: number): DemoTableRow[] {
  const safeCount = Math.max(0, Math.floor(count));
  const result: DemoTableRow[] = [];
  for (let index = 0; index < safeCount; index += 1) {
    result.push(buildRow(index));
  }
  return result;
}
```

With `Array.from`:

```ts
private buildMockRows(count: number): DemoTableRow[] {
  const safeCount = Math.max(0, Math.floor(count));
  return Array.from({ length: safeCount }, (_, index) => buildRow(index));
}
```

**Rationale:** Removes mutable accumulator and reduces body length.

### 2.2 Remove `badgeVariantFor` wrapper method

The method:

```ts
badgeVariantFor(estado: DemoTableRow['estado']): 'success' | 'warning' | 'danger' {
  return mapEstadoToVariant(estado);
}
```

only delegates to the module-level `mapEstadoToVariant`.

**Action:** Inline the mapping into `badgeVariantFor` and delete the standalone `mapEstadoToVariant` function:

```ts
/** Maps a Spanish estado string to a `CbaBadge` variant. */
badgeVariantFor(estado: DemoTableRow['estado']): 'success' | 'warning' | 'danger' {
  if (estado === 'Pagado') {
    return 'success';
  }
  if (estado === 'Pendiente') {
    return 'warning';
  }
  return 'danger';
}
```

**Rationale:** Removes one level of indirection and keeps the public method the template already calls.

---

## 3. `src/app/demo/demo.component.html`

### 3.1 Reuse `viewLabel()` in placeholder cases

The `create-form` and `profile` placeholder cases are identical except for hard-coded view names:

```html
@case ('create-form') {
  <div class="cba-demo__placeholder">
    <p class="cba-text-body">Vista aún no implementada en Phase 0.</p>
    <p class="cba-text-caption">Vista seleccionada: Alta</p>
  </div>
}
@case ('profile') {
  <div class="cba-demo__placeholder">
    <p class="cba-text-body">Vista aún no implementada en Phase 0.</p>
    <p class="cba-text-caption">Vista seleccionada: Perfil</p>
  </div>
}
```

Replace the hard-coded labels with `viewLabel()`:

```html
@case ('create-form') {
  <div class="cba-demo__placeholder">
    <p class="cba-text-body">Vista aún no implementada en Phase 0.</p>
    <p class="cba-text-caption">Vista seleccionada: {{ viewLabel() }}</p>
  </div>
}
@case ('profile') {
  <div class="cba-demo__placeholder">
    <p class="cba-text-body">Vista aún no implementada en Phase 0.</p>
    <p class="cba-text-caption">Vista seleccionada: {{ viewLabel() }}</p>
  </div>
}
```

**Rationale:** Keeps the Spanish label mapping in one place (`viewModeToSpanishLabel`) and reduces duplication. The two cases must remain separate because Angular `@switch` does not support fall-through, but the markup is now identical.

---

## Files affected

- `src/app/demo/demo.component.ts`
- `src/app/demo/demo.component.html`
- `src/app/demo/views/demo-table/demo-table.component.ts`

## Out of scope

- No changes to Tasks 9–11.
- No new components, services, or shared utilities.
- No behavioral changes to the identity panel or table rendering.
