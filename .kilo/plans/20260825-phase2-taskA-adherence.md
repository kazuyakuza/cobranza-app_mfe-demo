# Overall Plan Adherence Report — Task A: mfe-demo Phase 2

**Implementation plan:** `.kilo/plans/20260825-phase2-taskA.md`
**Front-end verification report:** `.kilo/plans/20260825-phase2-taskA-verification.md`
**TODO file:** `.agent/todos/20260825/20260825-todo-0.md` (Tasks 1–9)
**Branch:** `feat/phase2-min-height-polish`
**Date:** 2026-08-25
**Verifier:** architector (step 4.5b)

---

## 1. Build status

`npm run build` — **CLEAN** (re-run during this adherence check).

```
Application bundle generation complete. [1.423 seconds]
Output location: C:\projects\cobranza-app\front\mfe-demo\dist\mfe-demo
```

No TypeScript errors, no lint errors. Initial total 181.16 kB / 53.40 kB transfer.

---

## 2. Plan steps followed exactly

| Plan step | Status | Evidence |
|-----------|--------|----------|
| Step 0 — Pre-flight | ✅ Followed | Branch is `feat/phase2-min-height-polish`; `package.json` version `0.3.0` |
| Task 1 — Bump `@cobranza-apps/mfe-events` to `^0.6.0` | ✅ Followed exactly | Commit `b76095e`; `package.json` updated; types resolve; build clean |
| Task 2.1 — Create `demo-min-height.ts` | ✅ Followed | File exists with `computeMinHeightPx` + `DemoMinHeightReason` + named constants |
| Task 2.2 — Edit `demo-dispatcher.ts` | ✅ Followed | `updateMinHeight` added with `withIdentity` + `UpdateMinHeightPayload` cast; `console.log('[mfe-demo] dispatch', ...)` removed; JSDoc bullet removed |
| Task 2.3.1–2.3.2 — Imports + `lastDeclaredMinHeightPx` signal | ✅ Followed | `signal` imported; signal added as instance field |
| Task 2.3.3 — Private `declareMinHeight` helper | ❌ DEVIATION (see §3) | Method is `public`, not `private` |
| Task 2.3.4 — Public `declareMinHeightForPreview` wrapper | ❌ DEVIATION (see §3) | Wrapper method is missing |
| Task 2.3.5 — View-change + content-change effects | ✅ Followed | Both effects present; first-run skip via `previousView`/`previousRowCount` undefined guard; content-change guards `view() !== 'table'` |
| Task 2.3.6 — Init dispatch in `ngOnInit` | ✅ Followed | `ready()` → `shellListeners.attach()` → `declareMinHeight('init')` ordering correct |
| Task 2.3.7 — `matchesThisInstance` strict | ✅ Followed (no-op) | Strict filter preserved (now in extracted `DemoShellListeners`) |
| Task 3.1 — Identity panel min-height row | ✅ Followed | Row present after "Vista", before "Header" |
| Task 3.2 — Identity panel drag/preview rows | ✅ Followed | Rows present after dimensions, before visibility |
| Task 3.3 — `data-collapsed` binding | ✅ Followed | `[attr.data-collapsed]="isCollapsed()"` on root `<section>` |
| Task 3.4.1–3.4.6 — Preview host TS edits | ✅ Followed (except 3.4.7) | `ViewChild`, signals, `moduleStatePayload` extended, `onMfeEvent` captures `UPDATE_MIN_HEIGHT` |
| Task 3.4.7 — `redeclareMinHeight` handler | ❌ DEVIATION (see §3) | Calls `declareMinHeight` directly instead of `declareMinHeightForPreview` |
| Task 3.5 — Preview host HTML controls | ✅ Followed | Override input, drag/preview selects, re-dispatch button, readout all present |
| Task 3.6 — Coercion helpers | ✅ Followed | `numberOrNull` / `stringOrUndefined` present (helper variant chosen, not inline-cast) |
| Task 3.7 — Preview SCSS | ✅ Followed | `.demo-preview__min-height-readout` rule appended |
| Task 4.1–4.3 — Shell-state extension | ✅ Followed | `DragState`/`PreviewMode` types, `applyModuleState` params, `displayDragState`/`displayPreviewMode` computeds |
| Task 4.4 — Identity panel drag/preview rows | ✅ Followed | (same as 3.2) |
| Task 5 — Multi-instance isolation | ✅ Followed (static verification) | Per-instance fields; strict `matchesThisInstance`; `withIdentity` reads instance signals; two-instance runtime test correctly deferred (single-instance preview host) |
| Task 6.1 — Collapsed padding CSS rule | ✅ Followed | `.cba-demo[data-collapsed='true']` rule appended |
| Task 6.2–6.3 — Confirm existing styles | ✅ Followed (no-op) | No layout regressions; build clean |
| Task 7.1–7.2 — Spanish labels review | ✅ Followed (no-op) | Labels consistent |
| Task 7.3 — Dead code / console noise | ✅ Followed | No commented-out code; no stray `console.log` in production paths; preview-only `console.log('[demo-preview] captured', ...)` retained (spec §8.5) |
| Task 7.4 — No commented-out code | ✅ Followed | None found |
| Task 8.1 — Create-form model rename | ✅ Followed | `fullName`/`taxId`/`email`/`phone`/`notes`; `EMPTY_FORM`; instance signals; `resetForm`; JSDoc updated |
| Task 8.2 — Template bindings | ✅ Followed | `[ngModel]`/`(ngModelChange)` updated; Spanish `label="..."` preserved |
| Task 8.3–8.4 — Profile + no schema UI | ✅ Followed (no-op) | No `client.schema.json` / `CreateClientDto` imports |
| Task 9.1 — Preview exercises all paths | ✅ Followed | Three views, size toggle, collapse/fullscreen, simulated `shell:module-state` with drag/preview, min-height readout, re-dispatch button |
| Task 9.2 — No README/docs edits | ✅ Followed | Docs deferred to Task B |
| Step 10 — Final build & diagnostics | ✅ Followed | Build clean |

**Commits on branch (in order):**

```
225b8c8 docs: add JSDoc comments to Phase 2 source files
90af593 fix(preview): remove unused import, extract isPlainObject, correct JSDoc; add trailing newlines
689ebc8 refactor(demo): extract shell listeners and action buttons into helpers
0fc4f75 docs: add phase2 task A spec, implementation, fix and simplify plans
c94b39f fix(demo): resolve type errors from phase 2 edits
5198a5e refactor(create-form): align model field names with Client entity
fe5cced style(demo): compact padding when collapsed
dcda535 feat(demo): surface dragState and previewMode from shell:module-state
1ebc6da feat(preview): show declared min-height and force re-dispatch control
b2539f1 feat(demo): dispatch mfe:update-min-height on init/view-change/content-change
b76095e chore(deps): bump @cobranza-apps/mfe-events to ^0.6.0
```

Two additional refactor commits (`689ebc8` shell-listener/action-button extraction, `90af593` preview cleanup) were introduced during 4.3 review/simplification. These are within the simplification mandate of step 4.3 and do not expand scope beyond the files listed in the plan. Acceptable.

---

## 3. Deviations

### Deviation A — `DemoComponent.declareMinHeight` visibility / missing wrapper (NOT acceptable)

**Plan requirement (§2.3.3 + §2.3.4 + §3.4.7):**

```ts
// §2.3.3 — private helper
private declareMinHeight(reason: DemoMinHeightReason, overridePx?: number): void {
  const view = this.view();
  const minHeightPx = overridePx !== undefined ? overridePx : computeMinHeightPx(view);
  this.lastDeclaredMinHeightPx.set(minHeightPx);
  this.dispatcher.updateMinHeight(minHeightPx, reason);
}

// §2.3.4 — public wrapper, explicitly scoped for preview host only
/** Exposed only for the standalone preview host; not part of the public Shell contract. */
declareMinHeightForPreview(reason: DemoMinHeightReason, overridePx?: number): void {
  this.declareMinHeight(reason, overridePx);
}
```

```ts
// §3.4.7 — preview host must call the wrapper
readonly redeclareMinHeight = (): void => {
  this.demoComponent?.declareMinHeightForPreview('content-change', this.debugMinHeightOverride());
};
```

**Implementation (`src/app/demo/demo.component.ts` lines 198–208):**

```ts
/**
 * Computes and dispatches the preferred min-height for the current view.
 * Called internally on init / view change / content change, and exposed
 * for the standalone preview host via `declareMinHeight`.
 */
declareMinHeight(reason: DemoMinHeightReason, overridePx?: number): void {
  const view = this.view();
  const minHeightPx = overridePx !== undefined ? overridePx : computeMinHeightPx(view);
  this.lastDeclaredMinHeightPx.set(minHeightPx);
  this.dispatcher.updateMinHeight(minHeightPx, reason);
}
```

**Implementation (`src/app/demo-preview/demo-preview.component.ts` lines 129–132):**

```ts
/** Forces `DemoComponent` to re-dispatch `mfe:update-min-height`, optionally with a debug override value. */
readonly redeclareMinHeight = (): void => {
  this.demoComponent?.declareMinHeight('content-change', this.debugMinHeightOverride());
};
```

**Why NOT acceptable:**

1. The plan explicitly encoded a visibility-boundary decision: a `private` internal helper + a `public` wrapper whose JSDoc documents that it is NOT part of the public Shell contract. This was an architectural decision the plan made on behalf of the restricted implementer.
2. The implementer instead made `declareMinHeight` itself `public` and dropped the wrapper. That is a structural/contract decision the 50%-restricted implementer is HARD BLOCKED from making.
3. Project rule `prefer-private-members` requires members to be private by default and public only when absolutely necessary. The wrapper pattern was the plan's mechanism to satisfy this rule while still exposing the preview-only escape hatch. The implementation regressed on this rule.
4. The 4.4 documentation step (commit `225b8c8`) compounded the deviation: the JSDoc on `declareMinHeight` says "exposed for the standalone preview host via `declareMinHeight`", which rationalises the wrong visibility rather than flagging it.
5. Behavior is functionally identical, but the public API surface of `DemoComponent` is broader than the plan/contract permit. This must be corrected.

This matches the front-end verification report's Diff 1, which also concluded the deviation should be corrected.

### Deviation B — Create-form primary button label "Guardar (simulado)" vs spec wording "Enviar" (acceptable, NOT a plan deviation)

The front-end verification report flagged this as an observation against the **spec**, but the **implementation plan** did NOT encode any change to the primary button label. Plan §7.1 explicitly lists the form labels it reviewed and says "No change" for them; §8.1/§8.2 only rename model fields and template **bindings**, and explicitly instruct that the Spanish `label="..."` attributes MUST stay. The plan never listed "Enviar" as a target label.

The plan is the authority for the 50%-restricted implementer. Since the plan did not require changing the button label, the implementation correctly left it as "Guardar (simulado)". **No plan deviation. No action required.** (If the user wants strict spec-wording alignment, that is a separate decision outside Task A's plan.)

---

## 4. Missing functionality from TODO Tasks 1–9

None. All TODO tasks 1–9 are covered by the plan and implemented:

- Task 1: dependency bump ✅
- Task 2: min-height declaration (init / view-change / content-change) ✅
- Task 3: identity panel + preview min-height display + override + re-dispatch ✅
- Task 4: `dragState` / `previewMode` surfaced from `shell:module-state` ✅
- Task 5: multi-instance isolation — statically verified; two-instance runtime test correctly deferred (single-instance preview host renders one instance; rewriting it to render two is scope expansion the plan explicitly prohibited) ✅
- Task 6: collapse / size / fullscreen behaviour — CSS rule added, existing styles preserved ✅
- Task 7: UX/copy polish + dead-code removal ✅
- Task 8: create-form model aligned with `Client` entity field names; UI labels stay Spanish; no schema-driven UI ✅
- Task 9: standalone preview finalisation — all paths exercisable; docs deferred to Task B ✅

Tasks 10–12 (Shell-oriented docs, agent-oriented docs, optional light tests) are Task B / out of Task A scope, per the global plan.

---

## 5. Architectural / scope deviations

1. **Deviation A (§3 above)** — visibility-boundary regression. Architectural; must be fixed.
2. Step 4.3 introduced two refactor commits (`689ebc8` extracting `DemoShellListeners` and action-button helper, `90af593` preview cleanup). These are within the 4.3 simplification mandate and confined to files already in the plan's exhaustive list. Acceptable; not a scope deviation.
3. No files outside the plan's exhaustive list (§"Files expected to change") were modified. `demo-config.ts`, `demo-event-log.ts`, `demo-utils.ts`, `demo-profile.component.*`, `demo-table.component.*`, `angular.json`, `tsconfig*.json` were NOT touched. Confirmed via commit inspection.

---

## 6. Verdict

**PARTIAL ADHERENCE.** The implementation adheres to the plan in all functional and structural aspects except one: the `declareMinHeight` visibility boundary (Deviation A). The build is clean and all TODO Tasks 1–9 functionality is present. Deviation A is a contract/visibility regression that must be corrected before Task A can be marked fully adherent.

Deviation B is not a plan deviation and requires no action.

---

## 7. Fix plan for Deviation A

A targeted fix is required. It touches exactly two files and makes three small edits. No other files may be changed.

### 7.1 Edit `src/app/demo/demo.component.ts`

**7.1.1** Make `declareMinHeight` private and add the public wrapper. Replace the current block (lines 198–208):

```ts
  /**
   * Computes and dispatches the preferred min-height for the current view.
   * Called internally on init / view change / content change, and exposed
   * for the standalone preview host via `declareMinHeight`.
   */
  declareMinHeight(reason: DemoMinHeightReason, overridePx?: number): void {
    const view = this.view();
    const minHeightPx = overridePx !== undefined ? overridePx : computeMinHeightPx(view);
    this.lastDeclaredMinHeightPx.set(minHeightPx);
    this.dispatcher.updateMinHeight(minHeightPx, reason);
  }
```

with:

```ts
  /**
   * Computes and dispatches the preferred min-height for the current view.
   * Called internally on init / view change / content change. Private to
   * keep the public Shell-contract surface minimal.
   */
  private declareMinHeight(reason: DemoMinHeightReason, overridePx?: number): void {
    const view = this.view();
    const minHeightPx = overridePx !== undefined ? overridePx : computeMinHeightPx(view);
    this.lastDeclaredMinHeightPx.set(minHeightPx);
    this.dispatcher.updateMinHeight(minHeightPx, reason);
  }

  /** Exposed only for the standalone preview host; not part of the public Shell contract. */
  declareMinHeightForPreview(reason: DemoMinHeightReason, overridePx?: number): void {
    this.declareMinHeight(reason, overridePx);
  }
```

The internal call sites at lines 168, 181, 213 (`this.declareMinHeight(...)`) remain valid because they are inside the same class and can call the private method.

### 7.2 Edit `src/app/demo-preview/demo-preview.component.ts`

**7.2.1** Update the `redeclareMinHeight` call site (lines 129–132). Replace:

```ts
  /** Forces `DemoComponent` to re-dispatch `mfe:update-min-height`, optionally with a debug override value. */
  readonly redeclareMinHeight = (): void => {
    this.demoComponent?.declareMinHeight('content-change', this.debugMinHeightOverride());
  };
```

with:

```ts
  /** Forces `DemoComponent` to re-dispatch `mfe:update-min-height`, optionally with a debug override value. */
  readonly redeclareMinHeight = (): void => {
    this.demoComponent?.declareMinHeightForPreview('content-change', this.debugMinHeightOverride());
  };
```

**7.2.2** Update the `@ViewChild` JSDoc on line 74. Replace:

```ts
  /** Reference to the child `DemoComponent` — used to call `declareMinHeight` directly. */
```

with:

```ts
  /** Reference to the child `DemoComponent` — used to call `declareMinHeightForPreview` for forced re-dispatch. */
```

### 7.3 (Optional) Edit `src/app/demo/demo-min-height.ts` JSDoc reference

Line 32 currently reads:

```
 * `DemoComponent.declareMinHeight` to pick the value sent via
```

After the fix, `declareMinHeight` is private. The reference is semantically still about the internal method, but to avoid documenting a private member from an external file, update to:

```
 * `DemoComponent` to pick the value sent via
```

This is a one-line JSDoc wording adjustment; low priority but recommended for consistency.

### 7.4 Verify

1. Run `vscode-mcp-server_get_diagnostics_code` on:
   - `src/app/demo/demo.component.ts`
   - `src/app/demo-preview/demo-preview.component.ts`
2. Run `npm run build`. Expected: clean.
3. Confirm no other call sites of `declareMinHeight` exist outside `demo.component.ts` (run `grep` for `declareMinHeight` across `src/`). The only external reference after the fix should be `declareMinHeightForPreview` in `demo-preview.component.ts`.

### 7.5 Commit

```
git status
git add src/app/demo/demo.component.ts src/app/demo-preview/demo-preview.component.ts
git commit -m "fix(demo): restore private declareMinHeight and public preview-only wrapper"
```

(If §7.3 is applied, also stage `src/app/demo/demo-min-height.ts` and extend the message with " and update JSDoc reference".)

---

## 8. Summary

- **Build:** clean.
- **Plan adherence:** PARTIAL. All functional steps followed; one architectural visibility-boundary deviation (Deviation A) must be fixed.
- **Missing TODO functionality:** none.
- **Scope deviations:** none beyond the 4.3 simplification commits (acceptable).
- **Required action:** apply the §7 fix plan (3 edits across 2 files, 1 optional JSDoc tweak, 1 commit), then Task A is fully adherent.

*End of adherence report.*
