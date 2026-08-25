# Simplification Plan — Task A: Fix Sass Theme Import Error

**Task (TODO file)**: `.agent/todos/20260803/20260803-todo-2.md` → Section `### 0. Fix ui styles imports error`
**Reviewed commit**: `ded457d`
**Files changed in commit**: `angular.json`

---

## Current State

`angular.json` now contains:

```json
"stylePreprocessorOptions": {
  "includePaths": [
    "node_modules"
  ]
}
```

`src/styles.scss` keeps:

```scss
@use '@cobranza-apps/ui/theme';
```

This fixes the dev-server Sass resolution error because `includePaths: ["node_modules"]` lets the Sass loader find `node_modules/@cobranza-apps/ui/theme.scss`.

## Simplification Opportunity

The `includePaths` array is broader than necessary. It exposes the entire `node_modules` directory to Sass load-path resolution. Since the project only imports Sass from `@cobranza-apps/ui`, the include path can be narrowed to `node_modules/@cobranza-apps/ui` and the import can be shortened accordingly.

### Proposed Changes

1. **Update `angular.json`** — replace the broad include path with the package-scoped one.

   **File**: `C:\projects\cobranza-app\front\mfe-demo\angular.json`

   **Exact old string**:

   ```json
   "stylePreprocessorOptions": {
     "includePaths": [
       "node_modules"
     ]
   }
   ```

   **Exact new string**:

   ```json
   "stylePreprocessorOptions": {
     "includePaths": [
       "node_modules/@cobranza-apps/ui"
     ]
   }
   ```

2. **Update `src/styles.scss`** — import the theme relative to the narrowed include path.

   **File**: `C:\projects\cobranza-app\front\mfe-demo\src\styles.scss`

   **Exact old string** (entire file content):

   ```scss
   @use '@cobranza-apps/ui/theme';
   ```

   **Exact new string** (entire file content):

   ```scss
   @use 'theme';
   ```

## Why This Is Simpler

- `includePaths` no longer covers all of `node_modules`, reducing the chance of accidental name collisions and making the Sass lookup scope explicit.
- The import in `src/styles.scss` maps directly to the configured include path.
- No other `.scss` files in the project import from `node_modules`, so the narrowed path is safe.

## Verification Steps

1. Run the production build:

   ```bash
   npm run build
   ```

   **Expected**: build completes with no Sass import errors.

2. Start the dev server:

   ```bash
   npm run serve
   ```

   **Expected**: server starts without `Can't find stylesheet to import` errors and the theme loads.

If either step fails, revert both changes and report the error to the caller.
