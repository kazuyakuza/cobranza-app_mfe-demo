# Task A — Corrected Implementation Plan: Fix UI Styles Imports Error

> Replaces `.kilo/plans/20260824-mfe-demo-phase1-taskA.md` after verification failure.

## Root Cause (verified)

Angular 22's esbuild-based **development server** (`ng serve`) cannot resolve package-style Sass imports such as `@use '@cobranza-apps/ui/theme';`, even though production `ng build` succeeds. The `@cobranza-apps/ui` package provides a `theme.scss` shim at its root for this exact scenario, but the dev-server importer still fails to resolve the bare specifier.

## Verified Fix

Add `stylePreprocessorOptions.includePaths` to `angular.json` so the Sass compiler can locate the theme via Node-resolution-like lookup:

1. **File**: `angular.json`
   - Under `projects.mfe-demo.architect.esbuild.options`, add:
     ```json
     "stylePreprocessorOptions": {
       "includePaths": [
         "node_modules"
       ]
     }
     ```
   - This goes immediately after the existing `"styles"` array.

2. **File**: `src/styles.scss`
   - Keep the existing documented import:
     ```scss
     @use '@cobranza-apps/ui/theme';
     ```
   - Do NOT change this line.

## Verification Steps

1. Run `npm run build` → must succeed with no Sass errors.
2. Run `npm run serve -- --no-watch` → must succeed with no Sass errors.
3. If either fails, STOP and ask caller for clarification.

## Commit

- Stage: `angular.json`
- Message: `fix: add stylePreprocessorOptions for @cobranza-apps/ui theme resolution in dev server`

## Out of Scope

- Do NOT modify any other SCSS files.
- Do NOT change `src/styles.scss` import path.
- Do NOT install or upgrade dependencies.
