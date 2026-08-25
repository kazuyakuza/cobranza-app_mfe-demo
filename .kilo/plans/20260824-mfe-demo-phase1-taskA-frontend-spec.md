# Front-end Technical Specification — Fix Sass Theme Import Error

**Task**: Fix the `@use '@cobranza-apps/ui/theme';` import failure that breaks `npm run serve`.
**Scope**: `src/styles.scss` only; no component-level style changes.

---

## 1. Root Cause

`@cobranza-apps/ui` exposes its theme through `package.json` `exports`:

```json
"./theme": {
  "sass": "./theme/theme.scss",
  "style": "./theme/theme.scss",
  "default": "./theme/theme.scss"
},
"./theme.scss": {
  "sass": "./theme/theme.scss",
  "style": "./theme/theme.scss",
  "default": "./theme/theme.scss"
}
```

The package also provides two Angular dev-server shims:

- `node_modules/@cobranza-apps/ui/theme.scss` — forwards to `./theme/theme.scss`.
- `node_modules/@cobranza-apps/ui/theme/_index.scss` — forwards to `./theme.scss` for directory-index resolution.

Despite these shims, Angular 22's esbuild-based dev-server Sass resolver fails to resolve the bare subpath `@cobranza-apps/ui/theme` when running `ng serve`. Production `ng build` resolves the same import correctly, confirming the package artifact is valid and the issue is specific to the dev-server importer.

---

## 2. Correct Import Path

Update `src/styles.scss` to import the theme via the explicit deep file path, bypassing package-export and directory-index resolution:

```scss
@use '@cobranza-apps/ui/theme/theme.scss';
```

This path points directly to `node_modules/@cobranza-apps/ui/theme/theme.scss`, which is the real entry file referenced by the package's `exports` field. It works for both `ng build` and `ng serve`.

**Why not keep `@use '@cobranza-apps/ui/theme';`?**  
The bare subpath relies on package-export or directory-index resolution, which the Angular 22 dev-server importer does not perform correctly.

**Why not use the root shim `@use '@cobranza-apps/ui/theme.scss';`?**  
The root shim is an extra indirection and its resolution behavior is inconsistent across Angular versions. The deep file path is the most explicit and stable fix.

---

## 3. Peer Dependencies / Additional SCSS Setup

No additional peer dependencies or SCSS setup are required. The `@cobranza-apps/ui` peer dependencies are already installed:

- `@angular/common`, `@angular/core`, `@angular/forms` (v22)
- `bootstrap` (^5.3.0)
- `@ng-bootstrap/ng-bootstrap` (^21.0.0)
- `@fortawesome/angular-fontawesome`, `@fortawesome/fontawesome-svg-core`, `@fortawesome/free-regular-svg-icons`, `@fortawesome/free-solid-svg-icons`

Do **not** re-import the theme inside component SCSS files; it must be loaded once globally in `src/styles.scss`.

---

## 4. Verification Steps

1. Update `src/styles.scss` to contain exactly:

   ```scss
   @use '@cobranza-apps/ui/theme/theme.scss';
   ```

2. Run the production build:

   ```bash
   npm run build
   ```

   Expected result: build completes with no Sass import errors.

3. Run the dev server:

   ```bash
   npm run serve
   ```

   Expected result: the dev server starts and stays in watch mode without the `Can't find stylesheet to import` error.

4. Confirm the emitted global CSS contains `--cba-*` custom properties and `.cba-*` utility classes (visible in `dist/mfe-demo/styles-*.css` after build).

---

## 5. Acceptance Criteria

- `src/styles.scss` imports the theme using the deep file path `@cobranza-apps/ui/theme/theme.scss`.
- `npm run build` succeeds with no Sass errors.
- `npm run serve` starts successfully with no `Can't find stylesheet to import` error.
- No new dependencies are added.
- No component-level theme imports are introduced.
