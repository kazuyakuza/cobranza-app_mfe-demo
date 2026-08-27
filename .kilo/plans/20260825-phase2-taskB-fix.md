# Fix Plan — Phase 2 Task B Documentation Review

**Source TODO:** `.agent/todos/20260825/20260825-todo-0.md` (Tasks 10 & 11)  
**Reviewed plan:** `.kilo/plans/20260825-phase2-taskB.md`  
**Branch:** `feat/phase2-min-height-polish` (do NOT switch branches)  
**Target implementer:** JUNIOR developer under 50% restriction.  
**Scope:** Documentation-only corrections. No source code changes. No git branch operations. No version bump.

---

## Findings summary

Two documentation accuracy issues were found during 4.3 review:

1. **`.agent/project-info/context.md` is outdated.** The "Current Work Focus" section still references "Task B (4.1b Planning)" even though 4.2 implementation has completed and the documentation files are committed. This violates the project-info convention of updating `context.md` at the end of every task.
2. **`docs/mfe-demo-shell-usage.md` profile Footer example uses lowercase `estado: 'activo'`.** The implementation's badge logic (`DemoProfileComponent.resolveEstadoVariant`) only recognizes `'Activo'` (capitalized) as the success variant; a lowercase value renders as a neutral badge. Because this doc is explicitly "ready-to-copy", the example should match the implementation's expected values.

All other reviewed docs were found accurate against the implementation and the TODO requirements.

---

## Hard boundaries for the implementer

- You may ONLY edit:
  - `.agent/project-info/context.md`
  - `docs/mfe-demo-shell-usage.md`
- You MUST NOT:
  - Edit any file under `src/`.
  - Edit any other documentation file (including `README.md`, `docs/views-and-config.md`, `docs/actions-and-events.md`, `docs/shell-integration-guide.md`, `docs/phase0-agent-notes.md`, `.agent/project-info/brief.md`).
  - Run `git checkout`, `git merge`, `git push`, or change branches.
  - Create any new files.
- Use real newline characters in every file write. No literal `\n` sequences.
- After every file write, re-read it once to verify formatting before committing.

---

## Fix 1 — Update `.agent/project-info/context.md`

### What to change

Replace the outdated "Current Work Focus" section so it reflects that Task B 4.2 implementation is complete and 4.3 review is in progress.

### Exact replacement

Replace lines 15–17:

```markdown
## Current Work Focus

Executing `.agent/todos/20260825/20260825-todo-0.md` via the Critical Workflow — Task B (4.1b Planning): documentation plan for Tasks 10–11.
```

With:

```markdown
## Current Work Focus

Executing `.agent/todos/20260825/20260825-todo-0.md` via the Critical Workflow — Task B (4.3 Code Review): verifying documentation accuracy and completeness after 4.2 implementation.
```

Leave all other sections unchanged.

### Verification

- [ ] `context.md` no longer references "4.1b Planning".
- [ ] "Current State" section remains unchanged.
- [ ] "Recent Changes" section remains unchanged.

---

## Fix 2 — Correct profile example in `docs/mfe-demo-shell-usage.md`

### What to change

In the "Footer definition examples" section, the `profile` example currently reads:

```ts
profile: { nombre: 'Juan Pérez', dni: '30111222', email: 'juan@example.com', saldo: 15000, estado: 'activo' }
```

Change `estado: 'activo'` to `estado: 'Activo'` so the ready-to-copy example produces the success badge variant rendered by `DemoProfileComponent`.

### Exact edit

Old:

```ts
    profile: { nombre: 'Juan Pérez', dni: '30111222', email: 'juan@example.com', saldo: 15000, estado: 'activo' }
```

New:

```ts
    profile: { nombre: 'Juan Pérez', dni: '30111222', email: 'juan@example.com', saldo: 15000, estado: 'Activo' }
```

Do NOT change the other two Footer examples (`table` and `create-form`).

### Verification

- [ ] The `profile` Footer example contains `estado: 'Activo'`.
- [ ] The file still has all 8 required sections and a Table of Contents.
- [ ] No literal `\n` sequences were introduced.

---

## Commit strategy

The implementer commits in this exact order:

1. After editing `.agent/project-info/context.md`:
   `docs: update context.md to reflect Task B 4.2 completion and 4.3 review`
2. After editing `docs/mfe-demo-shell-usage.md`:
   `docs: fix ready-to-copy profile example estado casing`

Do NOT push. Do NOT merge. Step 5 of the Critical Workflow handles that.

---

## Output to caller

Return:

- Fix plan file path: `.kilo/plans/20260825-phase2-taskB-fix.md`
- Short summary: updated `context.md` work-focus wording and fixed `estado` casing in the Shell usage profile example.
