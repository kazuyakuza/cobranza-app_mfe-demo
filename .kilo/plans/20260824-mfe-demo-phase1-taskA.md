# Implementation Plan — Task A: Fix Sass Theme Import Error

**Task (TODO file)**: `.agent/todos/20260803/20260803-todo-2.md` → Section `### 0. Fix ui styles imports error`
**Front-end spec**: `.kilo/plans/20260824-mfe-demo-phase1-taskA-frontend-spec.md`
**Target file**: `src/styles.scss`

---

## High-Level Approach

A single one-line edit in `src/styles.scss`. Replace the bare subpath import that Angular 22's dev-server Sass resolver cannot resolve, with the explicit deep file path to the real theme entry file. No other files change. No dependencies change.

Root cause (per front-end spec): `@use '@cobranza-apps/ui/theme';` relies on package-export / directory-index resolution, which the Angular 22 esbuild dev-server importer fails to perform. `ng build` resolves it correctly; `ng serve` does not. The fix bypasses export resolution by pointing directly at `node_modules/@cobranza-apps/ui/theme/theme.scss`.

---

## Atomic Steps

### Step 1 — Edit `src/styles.scss`

**File**: `C:\projects\cobranza-app\front\mfe-demo\src\styles.scss`

**Exact old string** (entire current file content):

```scss
@use '@cobranza-apps/ui/theme';
```

**Exact new string** (entire new file content):

```scss
@use '@cobranza-apps/ui/theme/theme.scss';
```

Use `vscode-mcp-server_replace_lines_code` with:
- `startLine`: 1
- `endLine`: 1
- `originalCode`: `@use '@cobranza-apps/ui/theme';`
- `content`: `@use '@cobranza-apps/ui/theme/theme.scss';`

Do not add any other lines, comments, or imports. The file must remain a single line.

### Step 2 — Verify production build

**Command**:

```bash
npm run build
```

**Expected**: build completes successfully with no Sass import errors and no `Can't find stylesheet to import` message.

If the build fails with a Sass error, STOP and return the error to the caller. Do not try alternative import paths.

### Step 3 — Verify dev server

**Command**:

```bash
npm run serve
```

**Expected**: dev server starts and stays in watch mode. No `Can't find stylesheet to import` error for `@cobranza-apps/ui/theme`.

Since `ng serve` runs in watch mode and does not exit on success, confirm it starts without the Sass error, then stop it (Ctrl+C / terminate the process). Do not leave it running.

### Step 4 — Gitignore compliance check

Before committing, run `git status` and read `.gitignore`. Confirm:
- Only `src/styles.scss` is modified.
- No `node_modules/`, `dist/`, or other gitignored paths are staged.

### Step 5 — Commit

Stage only `src/styles.scss` and commit:

```bash
git add src/styles.scss
git commit -m "fix(styles): use deep theme path for @cobranza-apps/ui theme import"
```

Do not stage any other file. Do not push (push is restricted to step 5 of the Critical Workflow).

---

## Verification Summary

| Check | Command | Expected |
|-------|---------|----------|
| Build | `npm run build` | No Sass errors |
| Serve | `npm run serve` | Starts without `Can't find stylesheet to import` |
| Git | `git status` | Only `src/styles.scss` modified |

---

## Out of Scope (do NOT do)

- Do not modify any component SCSS files.
- Do not add new dependencies.
- Do not touch `package.json`, `angular.json`, or federation config.
- Do not re-import the theme in component styles.
- Do not create or update documentation (handled in step 4.4).
- Do not switch branches or push (restricted to other Critical Workflow steps).
- Do not mark the TODO task as `[DONE]` (handled in step 4.6).

---

## Commit Message

```
fix(styles): use deep theme path for @cobranza-apps/ui theme import
```
