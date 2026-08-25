# Task A 4.3 — Code Review Fix Plan

Scope: Angular 22 + Native Federation scaffolding completed in Task A 4.2.
Goal: Align the scaffold with `.kilo/plans/20260824-mfe-demo-phase0-taskA.md` and remove schematic artifacts that deviate from the plan.

Out of scope: TODO Tasks 3–11 (shared-library wiring, `DemoComponent`, preview host, README updates, etc.).

## Issues Found

### 1. `package.json` contains an unplanned direct dependency

- **Actual:** `"@softarc/native-federation-orchestrator": "^4.6.0"` is listed in `devDependencies`.
- **Plan:** `devDependencies` should only contain `@angular-architects/native-federation`, `@angular/build`, `@angular/cli`, `@angular/compiler-cli`, and `typescript`.
- **Impact:** This package is already a transitive dependency of `@angular-architects/native-federation` (resolved to `^4.5.2` in `package-lock.json`), so the direct pin is redundant and may drift independently.
- **Fix:**
  1. Remove `"@softarc/native-federation-orchestrator": "^4.6.0"` from `devDependencies`.
  2. Run `npm install`.
  3. Run `npx ng build` and confirm `dist/mfe-demo/browser/remoteEntry.json` is still generated.

### 2. Federation config filename and module format mismatch

- **Actual:** `federation.config.mjs` using ESM syntax (`import` / `export default`).
- **Plan:** `federation.config.js` using CommonJS syntax (`require` / `module.exports`).
- **Impact:** Project docs (`README.md`, `.agent/project-info/*.md`) consistently reference `federation.config.js`. The mismatch can mislead future agents and Shell integration work.
- **Fix:**
  1. Rename `federation.config.mjs` to `federation.config.js`.
  2. Rewrite the file content to match the plan's CommonJS shape (preserve `name`, `exposes`, `skip`, and `shared` values):

     ```js
     const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

     module.exports = withNativeFederation({
       name: 'mfe-demo',
       exposes: {
         './Component': './src/app/app.component.ts',
       },
       skip: [
         'rxjs/ajax',
         'rxjs/fetch',
         'rxjs/testing',
         'rxjs/webSocket',
       ],
       shared: {
         ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto', includeSecondaries: false }),
       },
     });
     ```

  3. Run `npx ng build` and confirm `remoteEntry.json` is generated.

### 3. `angular.json` references a missing `public/` folder

- **Actual:** The `assets` array points to `{ "glob": "**/*", "input": "public" }`, but no `public/` folder exists at the repo root.
- **Plan:** The plan creates `angular.json` with the same asset reference but does not create the folder.
- **Impact:** The build succeeds, but the missing folder may cause confusion or emit warnings when assets are added later.
- **Fix:** Create an empty `public/` directory at the repo root (no files needed inside it). This keeps the asset reference valid and matches the standard Angular project layout.

### 4. `remoteEntry.json` output path differs from the plan's verification step

- **Actual:** `dist/mfe-demo/browser/remoteEntry.json`.
- **Plan verification step expected:** `dist/mfe-demo/remoteEntry.json`.
- **Impact:** Runtime behavior is correct — the dev server serves `http://localhost:4201/remoteEntry.json` from the `browser/` folder. However, the plan's checklist and future Shell integration docs must reference the correct URL.
- **Fix:** No source-code change required. Record the actual path in the Task A completion summary so Task 11 README documents `http://localhost:4201/remoteEntry.json` as the dev manifest URL.

### 5. `src/main.ts` includes an unplanned `hostRemoteEntry` option

- **Actual:**

  ```ts
  initFederation({}, {
    hostRemoteEntry: { url: "./remoteEntry.json" }
  })
  ```

- **Plan:** Expected `initFederation(...)` followed by a dynamic `import('./bootstrap')`; the plan did not specify a second options argument with `hostRemoteEntry`.
- **Impact:** Functional but unnecessary for a pure remote; it deviates from the plan and adds noise.
- **Fix:** Simplify `src/main.ts` to the minimum required for a Native Federation remote. If using top-level `await` (consistent with `tsconfig.json` target `ES2022`):

  ```ts
  import { initFederation } from '@angular-architects/native-federation';

  try {
    await initFederation();
    await import('./bootstrap');
  } catch (err) {
    console.error(err);
  }
  ```

  Run `npx ng build` and confirm the build still succeeds.

## Verification Checklist

- [ ] `@softarc/native-federation-orchestrator` is removed from `package.json`.
- [ ] `npm install` completes without errors.
- [ ] `federation.config.js` exists (not `.mjs`) and uses CommonJS syntax.
- [ ] `public/` folder exists (may be empty).
- [ ] `src/main.ts` no longer contains `hostRemoteEntry`.
- [ ] `npx ng build` succeeds.
- [ ] `dist/mfe-demo/browser/remoteEntry.json` exists and exposes `./Component`.
- [ ] `git status` shows no `node_modules/`, `dist/`, `.angular/`, or `out-tsc/` staged.
