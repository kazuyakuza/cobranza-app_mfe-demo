# Front-end Implementation Verification — Task A: mfe-demo Phase 2

**Spec:** `.kilo/plans/20260825-phase2-taskA-frontend-spec.md`  
**Branch:** `feat/phase2-min-height-polish`  
**Date:** 2026-08-25  
**Verifier:** frontend-specialist

---

## Summary

| Item | Result |
|------|--------|
| Build (`npm run build`) | PASS |
| Spec sections with full compliance | 7 of 8 |
| Structural / contract deviation | 1 (method visibility in `DemoComponent`) |
| Minor copy observation | 1 (create-form primary button label) |
| Critical/blocking issues | 0 |

Overall: **PARTIAL PASS**. The implementation is functionally correct and builds cleanly, but it deviates from the spec's mandated visibility boundary for `declareMinHeight`. The deviation should be corrected to match the spec exactly.

---

## Checklist

### 3. Min-height contract

| # | Spec requirement | Status | Notes |
|---|------------------|--------|-------|
| 3.1 | `demo-min-height.ts` created with `DemoMinHeightReason` and pure `computeMinHeightPx` | PASS | Magic numbers extracted to named constants (`MIN_HEIGHT_TABLE_PX`, etc.) — acceptable local improvement; function remains pure |
| 3.2 | `DemoDispatcher.updateMinHeight` added using `MFE_EVENTS.UPDATE_MIN_HEIGHT` and `UpdateMinHeightPayload` | PASS | `withIdentity` applied; payload shape matches |
| 3.2 | Remove `console.log('[mfe-demo] dispatch', ...)` from `DemoDispatcher.send` | PASS | Line removed; only event-log + preview capture remain |
| 3.3 | `lastDeclaredMinHeightPx` signal added | PASS | |
| 3.3 | Private helper `declareMinHeight` in `DemoComponent` | **FAIL** | Helper is `public` and named `declareMinHeight`; spec required `private declareMinHeight` + public `declareMinHeightForPreview` |
| 3.3 | Init dispatch: `ready()` then `declareMinHeight('init')` in `ngOnInit` | PASS | |
| 3.3 | View-change effect watches `view()` and skips first fire | PASS | |
| 3.3 | Content-change effect watches `config().tableRows` only while `view() === 'table'` | PASS | Guards with `if (this.view() !== 'table') return;` |
| 3.3 | No dispatch before `ngOnInit` | PASS | Effects skip initial fire; init dispatch is in `ngOnInit` |
| 3.4 | Identity panel shows "Min-height declarado: N px" | PASS | Row present after "Vista" and before "Header" |

### 4. Identity panel updates (shell-state polish)

| # | Spec requirement | Status | Notes |
|---|------------------|--------|-------|
| 4.1 | `ShellStateSnapshot` extended with `dragState` and `previewMode` | PASS | |
| 4.1 | `applyModuleState` accepts optional `dragState` / `previewMode` | PASS | |
| 4.1 | `displayDragState` and `displayPreviewMode` computeds exist | PASS | |
| 4.2 | Identity panel renders `dragState` and `previewMode` rows | PASS | Placed after dimensions row as specified |
| 4.3 | `matchesThisInstance` remains strict (`instanceId` + `moduleType`) | PASS | Implemented in `DemoShellListeners` |

### 5. Preview host updates

| # | Spec requirement | Status | Notes |
|---|------------------|--------|-------|
| 5.1 | `previewDeclaredMinHeightPx` signal | PASS | |
| 5.1 | `onMfeEvent` captures `MFE_EVENTS.UPDATE_MIN_HEIGHT` | PASS | |
| 5.2 | `ViewChild(DemoComponent)` and `redeclareMinHeight` method | PASS | |
| 5.2 | DemoComponent exposes debug method `declareMinHeightForPreview` | **FAIL** | Method is named `declareMinHeight` and is public; direct consequence of §3.3 deviation |
| 5.3 | `debugMinHeightOverride` signal + input + re-dispatch button + readout | PASS | Input uses `numberOrNull` helper for safe parsing |
| 5.4 | `simulatedDragState` / `simulatedPreviewMode` signals included in `moduleStatePayload` | PASS | Select controls present |

### 6. Multi-instance & state isolation

| # | Spec requirement | Status | Notes |
|---|------------------|--------|-------|
| 6.1 | State objects created per `DemoComponent` instance | PASS | `eventLog`, `shellState`, `dispatcher`, `lastDeclaredMinHeightPx` all instance-owned |
| 6.2 | No sharing between instances; `withIdentity` uses current signals | PASS | |
| 6.2 | `matchesThisInstance` strict | PASS | |
| 6.2 | Visual marker hue deterministic per instance | PASS | `hashString(instanceId()) % 360` unchanged |

### 7. Collapse / size / fullscreen behaviour

| # | Spec requirement | Status | Notes |
|---|------------------|--------|-------|
| 7.1 | `[data-collapsed='true']` CSS rule | PASS | Rule added in `demo.component.scss` |
| 7.1 | Root `<section>` binds `[attr.data-collapsed]` | PASS | |
| 7.2 | Size 50% layout (flex-wrap action bar, table scroll, create-form 1-col) | PASS | Existing styles preserved |
| 7.3 | Size 100% / fullscreen use available width | PASS | No regression |
| 7.4 | Identity panel reads from `shellState.display*` computeds | PASS | `lastDeclaredMinHeightPx` owned by component instance |

### 8. UX & copy polish

| # | Spec requirement | Status | Notes |
|---|------------------|--------|-------|
| 8.1 | Spanish labels consistent across identity panel, actions, forms, profile, event log, data viewer, preview | PASS | |
| 8.1 | Create-form primary button label | OBSERVATION | Spec refers to it as "Enviar"; implementation uses "Guardar (simulado)". Functionally clear, but differs from spec wording |
| 8.2 | Create-form hint unchanged | PASS | |
| 8.3 | Min-height events appear in event log | PASS | `DemoDispatcher.send` records all outgoing events |
| 8.4 | Data payload viewer kept in accordion | PASS | |
| 8.5 | Dead code / console noise removed | PASS | No commented code; no stray `console.log` in production paths |

### 9. Forms / profile alignment

| # | Spec requirement | Status | Notes |
|---|------------------|--------|-------|
| 9.1 | Create-form model renamed to entity-aligned keys (`fullName`, `taxId`, `phone`, `notes`) | PASS | |
| 9.1 | UI labels remain Spanish; values plain `string` | PASS | |
| 9.2 | Profile `notes` included in `PROFILE_LABELS` | PASS | |
| 9.3 | No schema-driven UI / encrypted types | PASS | No `client.schema.json` usage |

### 10. Dependency bump

| # | Spec requirement | Status | Notes |
|---|------------------|--------|-------|
| 10.1 | `package.json` bumps `@cobranza-apps/mfe-events` to `^0.6.0` | PASS | |
| 10.2 | TypeScript resolves `MFE_EVENTS.UPDATE_MIN_HEIGHT` and `UpdateMinHeightPayload` | PASS | `npm run build` clean |
| 10.3 | `angular.json` still loads `reflect-metadata/Reflect.js` via scripts | PASS | No ESM import added in app code |

---

## Diffs between spec and implementation

### Diff 1 — `DemoComponent.declareMinHeight` visibility / naming

**Spec (§3.3 + §5.2):**

```ts
private declareMinHeight(reason: DemoMinHeightReason, overridePx?: number): void { ... }

declareMinHeightForPreview(reason: DemoMinHeightReason, overridePx?: number): void {
  this.declareMinHeight(reason, overridePx);
}
```

**Implementation (`src/app/demo/demo.component.ts` lines 203–208):**

```ts
declareMinHeight(reason: DemoMinHeightReason, overridePx?: number): void {
  const view = this.view();
  const minHeightPx = overridePx !== undefined ? overridePx : computeMinHeightPx(view);
  this.lastDeclaredMinHeightPx.set(minHeightPx);
  this.dispatcher.updateMinHeight(minHeightPx, reason);
}
```

**Impact:**
- The public surface of `DemoComponent` is broader than spec intended.
- The semantic boundary "exposed only for the standalone preview host; not part of the public Shell contract" is lost.
- Behavior is identical, but the contract differs and the implementer made a structural decision beyond the 50% restriction.

### Diff 2 — Create-form primary button label (minor)

**Spec wording:** "Create-form 'Enviar' handler" (§3.3)  
**Implementation:** Button label is "Guardar (simulado)" (`demo-create-form.component.html` line 42).  
**Impact:** Cosmetic only; no functional impact.

---

## Front-end quality issues

1. **Structural contract deviation** (see Diff 1). This is the only material issue.
2. No TypeScript errors.
3. No lint errors observed during build.
4. No commented-out code.
5. No new console noise in production paths.

---

## Steps to fix failures

### Fix Diff 1 — restore intended visibility boundary

In `src/app/demo/demo.component.ts`:

1. Change `declareMinHeight` from `public` to `private`.
2. Add the public wrapper method exactly as specified:

```ts
/** Exposed only for the standalone preview host; not part of the public Shell contract. */
declareMinHeightForPreview(reason: DemoMinHeightReason, overridePx?: number): void {
  this.declareMinHeight(reason, overridePx);
}
```

3. In `src/app/demo-preview/demo-preview.component.ts` line 131, update the call:

```ts
readonly redeclareMinHeight = (): void => {
  this.demoComponent?.declareMinHeightForPreview('content-change', this.debugMinHeightOverride());
};
```

### Fix Diff 2 — align button label (optional)

If strict adherence to spec wording is required, change the primary button label in `src/app/demo/views/demo-create-form/demo-create-form.component.html` from "Guardar (simulado)" to "Enviar". This is low priority and functionally equivalent.

---

## Verification commands run

```bash
npm run build
```

Result: **clean** (no TypeScript errors, no lint errors, output generated successfully).

---

*End of verification report.*
