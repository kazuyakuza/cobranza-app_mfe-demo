# Task A 4.3 — Code Simplification Plan

Scope: Angular 22 + Native Federation scaffolding just completed in Task A 4.2.
Goal: Remove redundant dependencies, clean verbose config formatting, and simplify the federation bootstrap entry point while keeping the scaffold buildable and correct.

> This plan does NOT touch TODO Tasks 3–11 scope (shared-library wiring, DemoComponent, preview host, README updates, etc.). It only polishes the existing scaffold.

## 1. `package.json` — remove unused dependencies

The scaffold uses standalone-component bootstrap (`bootstrapApplication` from `@angular/platform-browser`) and has no i18n or JIT runtime. The following packages are not imported anywhere and can be removed safely:

- `@angular/localize` — Spanish-only UI; no `$localize` usage.
- `@angular/platform-browser-dynamic` — Only needed for NgModule/JIT bootstrap (`platformBrowserDynamic`). Standalone bootstrap does not use it.
- `reflect-metadata` — Not required for Angular 22 standalone + AOT.

### Action

Delete these three lines from `dependencies`.

### Verification

- Run `npm install` after editing.
- Run `ng build` and `ng serve` (smoke only) and confirm no compilation/runtime errors.

## 2. `angular.json` — remove unused i18n target

`extract-i18n` is only useful when `@angular/localize` is in use. Since that dependency is being removed, delete the target:

```json
"extract-i18n": {
  "builder": "@angular/build:extract-i18n"
},
```

### Action

Remove the `extract-i18n` entry from the `architect` section.

## 3. `src/main.ts` — simplify promise chain with async/await

Current code chains `.catch(...).then(...).catch(...)`. Replace with a single `try/catch` using top-level `await` (supported because `tsconfig.json` targets `ES2022`).

### Current

```ts
import { initFederation } from '@angular-architects/native-federation';

initFederation({}, {
  hostRemoteEntry: { url: "./remoteEntry.json" }
})
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
```

### Simplified

```ts
import { initFederation } from '@angular-architects/native-federation';

try {
  await initFederation({}, {
    hostRemoteEntry: { url: './remoteEntry.json' }
  });
  await import('./bootstrap');
} catch (err) {
  console.error(err);
}
```

### Action

Replace the content of `src/main.ts` with the snippet above.

## 4. `federation.config.mjs` — remove excessive blank lines

The file contains three consecutive blank lines after `name: 'mfe-demo',`. Reduce to a single blank line to improve readability.

### Action

Replace the multi-line gap with one blank line. Do not change any configuration values or comments.

## 5. Out of scope / intentionally not changed

The following items are either required by the upcoming TODO tasks or are correct as-is, so they are left untouched:

- `@angular/animations`, `@angular/forms`, `@angular/cdk`, `@angular/compiler`, `@fortawesome/*`, `@ng-bootstrap/ng-bootstrap`, `bootstrap`, `es-module-shims`, `@cobranza-apps/*` — planned for use by shared libraries and Phase 0 UI work.
- `serve-original` target in `angular.json` — useful for running the raw app without the federation wrapper during debugging; keep until proven redundant.
- Empty `src/styles.scss`, empty `src/app/app.routes.ts`, and minimal `src/app/app.component.*` — will be populated/renamed in subsequent TODO tasks.
- `tsconfig.federation.json` only listing `src/app/app.component.ts` — correct for the current scaffold; will be updated when the DemoComponent becomes the exposed entry.

## Verification Checklist

- [ ] `package.json` no longer lists `@angular/localize`, `@angular/platform-browser-dynamic`, or `reflect-metadata`.
- [ ] `angular.json` no longer has an `extract-i18n` target.
- [ ] `src/main.ts` uses `try { await initFederation(...); await import('./bootstrap'); } catch`.
- [ ] `federation.config.mjs` has no triple blank lines.
- [ ] `npm install` completes successfully.
- [ ] `ng build` succeeds with no errors.
- [ ] `ng serve` starts without errors.
