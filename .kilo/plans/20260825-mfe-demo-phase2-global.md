# Global Plan — mfe-demo Phase 2 Polish, Min-height & Delivery

**Source TODO:** `.agent/todos/20260825/20260825-todo-0.md`  
**Date:** 2026-08-25  
**Planner:** Planner Agent  
**Branch:** `feat/phase2-min-height-polish`  
**Version bump:** `0.2.0` → `0.3.0` (minor — new feature: min-height contract + UX polish)

---

## Pre-analysis

### Current project state

- Angular 22 Native Federation remote; `ng build` and `ng serve` work.
- Three views (`table`, `create-form`, `profile`) implemented and switchable.
- Identity panel, per-instance visual marker, action bar (8 buttons), event log (last 25), and data payload viewer all present.
- `DemoDispatcher` dispatches 6 `mfe:*` events; `DemoShellState` consumes `shell:module-state` and `shell:visibility-changed`.
- Standalone preview host (`DemoPreviewComponent`) simulates Shell Inputs and synthetic shell events.
- No tests exist yet.
- `@cobranza-apps/mfe-events` is at `^0.5.0`; needs `^0.6.0` for `UPDATE_MIN_HEIGHT`.
- `reflect-metadata` is already loaded via `angular.json` `scripts` array.

### Technical decisions

- **Min-height contract:** Pure helper `computeMinHeightPx(view)` returns sensible defaults per view. Dispatched via `MFE_EVENTS.UPDATE_MIN_HEIGHT` with `reason: 'init' | 'view-change' | 'content-change'`.
- **State isolation:** `DemoComponent` already owns per-instance `DemoEventLog`, `DemoShellState`, and `DemoDispatcher`. We extend this pattern for `lastDeclaredMinHeightPx`.
- **Shell-state polish:** Extend `DemoShellState` to capture `dragState` and `previewMode` from `shell:module-state` payload; surface them in the identity panel and event log.
- **Collapse / size / fullscreen:** CSS and layout polish only — no architectural changes.
- **UX polish:** Spanish copy consistency pass; no functional changes.
- **Documentation:** New `docs/mfe-demo-shell-usage.md` for Shell developers; update existing docs and README.

### Front-end flag

- **Task A** is front-end related (requires 4.1a + 4.5a).
- **Task B** is documentation only (no 4.1a/4.5a).
- **Task C** is test only (no 4.1a/4.5a).

---

## Task grouping

| Task | TODO items covered | Description |
|------|-------------------|-------------|
| **Task A** | 1–9 | All code implementation: dependency bump, min-height contract, identity panel & preview updates, shell-state polish, multi-instance hardening, collapse/size/fullscreen polish, UX/copy polish, forms alignment, standalone preview finalisation. |
| **Task B** | 10–11 | Documentation: Shell-oriented usage guide (`docs/mfe-demo-shell-usage.md`) with ready-to-copy Footer examples, min-height notes, test scenarios; agent-oriented notes; README updates; cross-links. |
| **Task C** | 12 | Optional light unit tests for pure helpers: `coerceDemoConfig`, `hashString`, event filter by `instanceId`, `computeMinHeightPx`. Non-blocking. |

---

## Execution plan

### Step 2 — Git Feature Branch Setup
- **Sub-agent:** `implementer`
- Commit any unstaged changes, switch to `main`, create `feat/phase2-min-height-polish`, switch to it.

### Step 3 — Version Update
- **Sub-agent:** `implementer`
- Bump `package.json` version `0.2.0` → `0.3.0`; commit `chore: bump version to 0.3.0`.

---

### Task A — Code Implementation (front-end related)

#### A.4.1a — Front-end Technical Specification
- **Sub-agent:** `frontend-specialist`
- Produce front-end spec covering:
  - Min-height dispatch timing (init, view-change, content-change)
  - Identity panel additions (min-height display, dragState/previewMode)
  - Preview host additions (min-height override, re-dispatch button)
  - CSS/layout rules for collapse, 50%, 100%, fullscreen
  - Multi-instance isolation guarantees
- **Output:** `.kilo/plans/20260825-phase2-taskA-frontend-spec.md`

#### A.4.1b — Analysis & Implementation Plan
- **Sub-agent:** `architector`
- Read front-end spec from A.4.1a.
- Produce detailed implementation plan with file paths, code snippets, terminal commands, and step-by-step instructions suitable for a junior developer.
- **Output:** `.kilo/plans/20260825-phase2-taskA.md`
- **Planner presents to user for approval** (auto-approve if TODO says "Don't request me to approve plans" — it does not).

#### A.4.2 — Implementation
- **Sub-agent:** `implementer`
- Follow plan from A.4.1b exactly.
- Commit with meaningful messages after each logical chunk.
- Return summary of what was done / not done.

#### A.4.3 — Code Review & Simplification
- **Sub-agents:** `code-reviewer` + `code-simplifier` (concurrent)
- Review for errors/deviations from plan; simplify where possible.
- If fixes or simplifications needed, generate plan and return path.
- **Planner assigns fix/simplification to implementer** (max 3 cycles).

#### A.4.4 — Documentation (code comments)
- **Sub-agent:** `docs-specialist`
- Add JSDoc comments to new helpers, updated methods, and config changes.
- Update any inline docs that reference the old `mfe-events` version.

#### A.4.5a — Front-end Implementation Verification
- **Sub-agent:** `frontend-specialist`
- Verify implementation against spec from A.4.1a.
- Generate report with diffs and quality issues.
- **Output:** `.kilo/plans/20260825-phase2-taskA-verification.md`

#### A.4.5b — Overall Plan Adherence
- **Sub-agent:** `architector`
- Read verification report from A.4.5a.
- Check plan adherence; report deviations and propose fixes if needed.
- **Output:** `.kilo/plans/20260825-phase2-taskA-adherence.md` or clear message.

#### A.4.6 — Task Completion
- **Sub-agent:** `implementer`
- Mark Task A as `[DONE]` in TODO file; commit.

---

### Task B — Documentation

#### B.4.1b — Analysis & Planning
- **Sub-agent:** `architector`
- Plan documentation updates:
  - Create `docs/mfe-demo-shell-usage.md` (Footer examples, min-height notes, test scenarios)
  - Update `docs/shell-integration-guide.md` with min-height and dragState/previewMode notes
  - Update `README.md` status to Phase 2 complete, add min-height mention
  - Update `docs/views-and-config.md` with min-height per view
  - Update `docs/actions-and-events.md` with `mfe:update-min-height`
  - Add agent-oriented notes to `docs/phase0-agent-notes.md` or new file
  - Cross-link all docs
- **Output:** `.kilo/plans/20260825-phase2-taskB.md`
- **Planner presents to user for approval.**

#### B.4.2 — Implementation
- **Sub-agent:** `implementer`
- Write/finalise all docs per plan.
- Commit with meaningful messages.

#### B.4.3 — Code Review & Simplification
- **Sub-agent:** `code-reviewer` + `code-simplifier`
- Review docs for accuracy, clarity, completeness.

#### B.4.4 — Documentation
- **Sub-agent:** `docs-specialist`
- Light pass on consistency, TOC, spelling, cross-links.

#### B.4.5b — Overall Plan Adherence
- **Sub-agent:** `architector`
- Verify docs match implementation from Task A.

#### B.4.6 — Task Completion
- **Sub-agent:** `implementer`
- Mark Task B as `[DONE]` in TODO file; commit.

---

### Task C — Optional Light Tests

#### C.4.1b — Analysis & Planning
- **Sub-agent:** `architector`
- Plan unit tests for pure helpers only:
  - `coerceDemoConfig` → default view, invalid view, title, profile, tableRows
  - `hashString` → stability, same input same output, different inputs different outputs
  - Event filter by `instanceId` → matches, mismatches
  - `computeMinHeightPx(view)` → per-view values, default
- Decide test runner (Jest/Vitest setup if needed).
- **Output:** `.kilo/plans/20260825-phase2-taskC.md`
- **Planner presents to user for approval.**

#### C.4.2 — Implementation
- **Sub-agent:** `implementer`
- Write tests; ensure `npm test` passes.
- Commit.

#### C.4.3 — Code Review & Simplification
- **Sub-agent:** `code-reviewer`
- Review test coverage and correctness.

#### C.4.5b — Overall Plan Adherence
- **Sub-agent:** `architector`
- Verify tests match plan.

#### C.4.6 — Task Completion
- **Sub-agent:** `implementer`
- Mark Task C as `[DONE]` in TODO file; commit.

---

### Step 5 — TODO File Completion
- **Sub-agent:** `implementer`
- Rename TODO file to `20260825-todo-0-DONE.md`.
- Remove any tmp files/folders.
- Ensure all changes committed in feature branch.
- Merge `feat/phase2-min-height-polish` into `main`.
- Push `main` to `origin` only.

### Step 6 — Finish
- Planner provides short resume and next-steps text.
