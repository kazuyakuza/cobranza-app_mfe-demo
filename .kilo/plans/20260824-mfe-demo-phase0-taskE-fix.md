# Fix Plan — Task E 4.3 Review Findings

**Source:** Code review of Task E (README & Agent Notes) implementation.
**Files reviewed:** `README.md`, `docs/phase0-agent-notes.md`, `.agent/project-info/context.md`.
**Reference plan:** `.kilo/plans/20260824-mfe-demo-phase0-taskE.md`.

## Issues Found

### 1. `.agent/project-info/context.md` — `Current State` is stale

The `Current State` section still describes `DemoComponent` and `DemoPreviewComponent` as "stubs" and the repository stage as "Phase 0 implementation in progress". Task D already implemented both components fully (signal Inputs, `DemoConfig` coercion, table view, identity panel, visual marker, event dispatch, `shell:*` listeners, preview controls, and event logging). Task E then completed the README and agent notes.

Keeping outdated stubs in the context file misleads future agents about the actual project state.

### 2. `.agent/project-info/context.md` — `Immediate Next Steps` is stale

The `Immediate Next Steps` section lists:

1. Implement `DemoComponent` event dispatch and `shell:*` listeners per the spec.
2. Implement `DemoPreviewComponent` controls (`size`, `view`, `title`) and `mfe:*` event logging.
3. Proceed to subsequent Critical Workflow steps for the remaining TODO tasks.

Items 1 and 2 were completed in Task D. Item 3 is partially stale because Task E is now complete. The section should reflect the actual remaining work: marking TODO Task 11 as done and completing Critical Workflow Step 5.

## Proposed Fixes

### Fix 1 — Update `Current State`

Replace the existing bullet list under `## Current State` with:

```markdown
- **Date:** 2026-08-24
- **Branch:** `feat/mfe-demo-phase0`
- **Repository stage:** Phase 0 implementation complete; README and agent notes updated.
  - Angular 22.1.2 standalone app scaffolded.
  - Native Federation configured (`federation.config.js`, `angular.json`).
  - `DemoComponent` fully implemented with signal Inputs, `DemoConfig` coercion, identity panel, visual instance marker, default `'table'` view, and core `mfe:*` event dispatch (`module-ready`, `update-header`).
  - `DemoPreviewComponent` fully implemented as the standalone preview host with `size`, `view`, and `title` controls and `mfe:*` event console logging.
  - `@cobranza-apps/mfe-events` installed and `reflect-metadata` configured in `angular.json`.
```

### Fix 2 — Update `Immediate Next Steps`

Replace the existing numbered list under `## Immediate Next Steps` with:

```markdown
1. Mark TODO Task 11 as `[DONE]` (Critical Workflow Step 4.6).
2. Complete Critical Workflow Step 5: rename the TODO file with `-DONE` suffix, verify all changes are committed on `feat/mfe-demo-phase0`, and merge to `main`.
```

## Verification

1. Read `.agent/project-info/context.md` and confirm:
   - `Current State` no longer uses the word "stub" for `DemoComponent` / `DemoPreviewComponent`.
   - `Immediate Next Steps` no longer references Task D implementation work.
2. Run `git diff .agent/project-info/context.md` and confirm only the two sections above changed.
3. Confirm no other files are modified.

## Out of Scope

- Do not change `README.md` — it already matches the Task E plan.
- Do not change `docs/phase0-agent-notes.md` — it is accurate and complete.
- Do not modify source files, `package.json`, `angular.json`, or `federation.config.js`.
- Do not create, switch, or merge git branches (branch operations are restricted to Critical Workflow Step 2 and Step 5).
- Do not push to remotes.

## Commit

Single commit on `feat/mfe-demo-phase0` after applying both fixes:

```bash
git add .agent/project-info/context.md
git commit -m "docs(mfe-demo): update context.md Current State and Next Steps after Task E"
```
