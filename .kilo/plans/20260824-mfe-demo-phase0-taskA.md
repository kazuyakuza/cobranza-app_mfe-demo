# Plan — Task A (4.1b): Angular 22 Remote Scaffold + Native Federation

- **TODO file:** `.agent/todos/20260803/20260803-todo-1.md`
- **TODO tasks covered by this plan:** `### 1. Establish Angular 22 application (remote)` and `### 2. Native Federation remote setup`.
- **Branch:** `feat/mfe-demo-phase0` (already created in Step 2; do NOT switch/create branches).
- **Target implementer:** JUNIOR developer under 50% restriction.
- **Plan date:** 2026-08-24.

## 0. Scope & Non-Scope

IN SCOPE (this plan only):
- Create a buildable Angular 22 standalone application (SCSS, routing skeleton, no SSR).
- Configure it as a Native Federation **remote** (`@angular-architects/native-federation`).
- Remote name `mfe-demo`; exposed module `./Component` (temporary target = scaffolded `AppComponent`; will be repointed to `DemoComponent` in TODO Task 4).
- Dev server port `4201`.
- Remove/default the Angular demo content.
- Verify `npx ng build` + federation manifest generation; manual `npx ng serve` smoke.

OUT OF SCOPE (handled by later TODO tasks — DO NOT implement here):
- `@cobranza-apps/ui` theme import + `@cobranza-apps/mfe-events` / `entities` consumption (TODO Task 3).
- `DemoComponent`, `demo-config.ts`, folder `src/app/demo/` (TODO Task 4).
- Shell Inputs wiring, events dispatch, identity panel, table view, preview host, README (TODO Tasks 5–11).
- Git push (restricted to Critical Workflow Step 5).
- Version bump (Step 3 handles versioning; this plan creates the initial `package.json` with `version: "0.0.0"`).

## 1. Pre-Conditions & Ambiguities to Verify

1. **Node version:** `.nvmrc` pins `22.22.3`. Before running any `npm`/`npx` command, run `nvm use 22.22.3` (or `fnm use`). If the version manager is unavailable, confirm `node -v` is `v22.x` before proceeding.
2. **`@cobranza-apps/*` registry:** The brief states these packages are "already published". This plan assumes they resolve via the default npm registry. If `npm install` fails with `404` / `E404` for any `@cobranza-apps/*` package, **STOP and escalate to the caller** (a private registry / `.npmrc` may be required). Do NOT invent a registry URL.
3. **Bash availability:** Commands below are single commands (no chaining with `&`/`&&`). Do NOT use PowerShell. If a command is reported "unknown", retry the exact same command up to 2 more times before escalating.

## 2. High-Level Approach

1. Hand-author the base Angular 22 project files (`package.json`, `tsconfig*.json`, `angular.json`, minimal `src/`) — deterministic, no shell file-copy needed.
2. `npm install`.
3. Verify base scaffold builds: `npx ng build` (Angular application builder).
4. Add Native Federation remote via the official schematic: `npx ng add @angular-architects/native-federation --project mfe-demo --port 4201 --type remote`. This swaps the `angular.json` build/serve builders, creates `federation.config.js`, splits `src/main.ts` into `src/main.ts` (federation init) + `src/bootstrap.ts` (app bootstrap).
5. Edit `federation.config.js`: set `name: 'mfe-demo'` and `exposes: { './Component': './src/app/app.component.ts' }`.
6. Ensure default Angular demo content is gone (already minimal because we hand-authored; verify only).
7. Verify federation build + `remoteEntry.json` generation; manual serve smoke on port `4201`.
8. Update `.gitignore` for Angular artifacts; commit.

## 3. Detailed Steps

### Step 3.1 — Update `.gitignore` for Angular artifacts

Append the following block to the existing `.gitignore` (do NOT remove existing entries):

```gitignore
# Node / Angular
node_modules/
.angular/
out-tsc/
```

`dist/` and `.vscode/` are already present — leave them.

### Step 3.2 — Create `package.json`

Create `package.json` at repo root with EXACTLY this content:

```json
{
  "name": "mfe-demo",
  "version": "0.0.0",
  "private": true,
  "description": "Demo / placeholder / reference Native Federation remote (Angular 22) for the Cobranza App Company Back-office Shell.",
  "scripts": {
    "ng": "ng",
    "serve": "ng serve",
    "build": "ng build"
  },
  "dependencies": {
    "@angular/animations": "22.1.2",
    "@angular/cdk": "22.1.2",
    "@angular/common": "22.1.2",
    "@angular/compiler": "22.1.2",
    "@angular/core": "22.1.2",
    "@angular/forms": "22.1.2",
    "@angular/localize": "22.1.2",
    "@angular/platform-browser": "22.1.2",
    "@angular/platform-browser-dynamic": "22.1.2",
    "@angular/router": "22.1.2",
    "@cobranza-apps/entities": "^0.5.1",
    "@cobranza-apps/mfe-events": "^0.5.0",
    "@cobranza-apps/ui": "^0.19.0",
    "@fortawesome/angular-fontawesome": "^5.1.0",
    "@fortawesome/fontawesome-svg-core": "^7.3.0",
    "@fortawesome/free-regular-svg-icons": "^7.3.1",
    "@fortawesome/free-solid-svg-icons": "^7.3.1",
    "@ng-bootstrap/ng-bootstrap": "^21.0.0",
    "bootstrap": "^5.3.8",
    "es-module-shims": "^2.8.4",
    "reflect-metadata": "^0.2.2",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.15.0"
  },
  "devDependencies": {
    "@angular-architects/native-federation": "^22.0.6",
    "@angular/build": "22.1.2",
    "@angular/cli": "22.1.2",
    "@angular/compiler-cli": "22.1.2",
    "typescript": "~6.0.0"
  }
}
```

Notes:
- The `dependencies` set mirrors the Shell's `dependencies` so Native Federation `shareAll` shares matching versions (single instance of Angular / UI lib / events between host and remote).
- Testing deps (vitest/playwright) are intentionally omitted for Phase 0 (TODO: testing optional / non-blocking).
- `@angular/platform-browser-dynamic` is unused by `bootstrapApplication` but kept for shared-deps parity with the Shell; harmless.

### Step 3.3 — Create `tsconfig.json`

Create `tsconfig.json` at repo root:

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "outDir": "./dist/out-tsc",
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "moduleResolution": "bundler",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "lib": ["ES2022", "dom"]
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}
```

### Step 3.4 — Create `tsconfig.app.json`

Create `tsconfig.app.json` at repo root:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "files": ["src/main.ts"],
  "include": ["src/**/*.d.ts"]
}
```

### Step 3.5 — Create `angular.json`

Create `angular.json` at repo root with EXACTLY this content (Angular 22 application builder, SCSS, routing, dev port `4201`, no SSR):

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "mfe-demo": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss"
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "outputPath": "dist/mfe-demo",
            "index": "src/index.html",
            "browser": "src/main.ts",
            "polyfills": ["zone.js"],
            "tsConfig": "tsconfig.app.json",
            "assets": [
              {
                "glob": "**/*",
                "input": "public"
              }
            ],
            "styles": ["src/styles.scss"],
            "scripts": []
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kb",
                  "maximumError": "1mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kb",
                  "maximumError": "4kb"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular/build:dev-server",
          "configurations": {
            "production": {
              "buildTarget": "mfe-demo:build:production"
            },
            "development": {
              "buildTarget": "mfe-demo:build:development"
            }
          },
          "defaultConfiguration": "development",
          "options": {
            "port": 4201
          }
        },
        "extract-i18n": {
          "builder": "@angular/build:extract-i18n"
        }
      }
    }
  }
}
```

### Step 3.6 — Create `src/index.html`

Create `src/index.html`:

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>mfe-demo</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>
```

### Step 3.7 — Create `src/main.ts` (pre-federation bootstrap)

Create `src/main.ts`:

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
```

> This file will be **rewritten automatically** by the federation schematic in Step 3.13. Do not edit it manually after that.

### Step 3.8 — Create `src/styles.scss`

Create `src/styles.scss` as an empty file (single newline, no content):

```scss
```

> The `@cobranza-apps/ui` theme import belongs to TODO Task 3, NOT this plan. Keep this file empty for now.

### Step 3.9 — Create `src/app/app.config.ts`

Create `src/app/app.config.ts`:

```ts
import { ApplicationConfig, provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
```

### Step 3.10 — Create `src/app/app.routes.ts`

Create `src/app/app.routes.ts`:

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [];
```

> Routing is enabled (empty route list) to satisfy "routing enabled only if needed for the standalone preview". The preview host routes will be added in TODO Task 10.

### Step 3.11 — Create `src/app/app.component.ts`

Create `src/app/app.component.ts`:

```ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
```

### Step 3.12 — Create `src/app/app.component.html` and `src/app/app.component.scss`

Create `src/app/app.component.html`:

```html
<router-outlet></router-outlet>
```

Create `src/app/app.component.scss` as an empty file (single newline):

```scss
```

> This is intentionally minimal. There is no default Angular demo content because we hand-authored the files (satisfies TODO Task 1: "Remove any default Angular demo content"). No `.spec.ts` is created (testing optional in Phase 0).

### Step 3.13 — Remove `src/.gitkeep`

Delete `src/.gitkeep` (the `src/` tree now has real content). Use the editor file-delete capability or, if unavailable, leave it (harmless) — but prefer removing it to keep the tree clean.

### Step 3.14 — Install dependencies

Run (single command):

```bash
npm install
```

Expected: install completes; `node_modules/` created (gitignored per Step 3.1).

If `404`/`E404` appears for any `@cobranza-apps/*` package → STOP, escalate to caller (see §1.2).

### Step 3.15 — Verify base Angular scaffold builds

Run (single command):

```bash
npx ng build
```

Expected: build succeeds with zero errors; `dist/mfe-demo/` contains `index.html`, `main-*.js`, etc.

If this fails because of the hand-authored `angular.json`, escalate to caller (do NOT silently switch to a different scaffolding approach). A known fallback the caller may approve is scaffolding via `npx @angular/cli@22.1.2 new mfe-demo --directory mfe-demo-tmp --style=scss --routing --ssr=false --skip-git --skip-install` and copying the generated `angular.json`/`tsconfig*`/`src` into place — but this requires caller approval (it involves a temp folder and file moves outside the 50% restriction latitude).

### Step 3.16 — Add Native Federation (remote) via the official schematic

Run (single command):

```bash
npx ng add @angular-architects/native-federation --project mfe-demo --port 4201 --type remote
```

Expected behaviour of the schematic:
- Installs/ensures `@angular-architects/native-federation` (already in `package.json` from Step 3.2).
- Rewrites `angular.json` `build` and `serve` builders to the Native Federation builders (`@angular-architects/native-federation:build` / `:serve` or its esbuild adapter) and sets port `4201`.
- Creates `federation.config.js` at repo root (with `name: 'mfe-demo'`, empty `exposes`, a `skip` list for `rxjs/*`, and `shareAll` shared deps).
- Moves the body of `src/main.ts` into a new `src/bootstrap.ts` and rewrites `src/main.ts` to call `initFederation(...)` then dynamic-`import('./bootstrap')`.

Interactive prompts (only if flags are not accepted):
- "Host or remote?" → answer `remote`.
- "Port?" → answer `4201`.
- "Proceed with installation?" → answer `y`.

If the schematic errors or the flags are rejected, retry once; if still failing, escalate to caller with the exact error.

### Step 3.17 — Verify `package.json` integrity after schematic

Re-read `package.json`. Confirm:
- `@angular/*` versions are still `22.1.2` (schematic must not have downgraded Angular).
- `@angular-architects/native-federation` is present (`^22.0.6` or `~22.x`).
- `@cobranza-apps/*` packages are still present.

If Angular versions were altered, restore them to the values in Step 3.2 and re-run `npm install`.

### Step 3.18 — Edit `federation.config.js`: set remote name + expose

Open `federation.config.js`. The schematic-generated file looks roughly like:

```js
const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'mfe-demo',
  exposes: {},
  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/web',
  ],
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto', includeSecondaries: false }),
  },
});
```

Make exactly two changes:
1. Ensure `name` is `'mfe-demo'` (it should already be; if not, set it).
2. Replace the `exposes` value with:

```js
  exposes: {
    './Component': './src/app/app.component.ts',
  },
```

Do NOT change the `skip`, `shared`, or the `require(...)` import line. Do NOT add `publicPath` — Native Federation derives the public path automatically from the dev server origin (the Angular/Vite dev server sends permissive CORS headers by default, satisfying cross-origin loading from the Shell).

> **Temporary expose target note:** `./Component` currently points to the scaffolded `AppComponent` so the federation build passes in this task. TODO Task 4 will create `src/app/demo/demo.component.ts` and repoint this expose to `./src/app/demo/demo.component.ts`. This is expected and planned.

### Step 3.19 — Verify default demo content is removed

Confirm (read each file):
- `src/app/app.component.html` contains only `<router-outlet></router-outlet>` (no Angular welcome page).
- `src/app/app.component.scss` is empty.
- `src/styles.scss` is empty.
- No `*.spec.ts` files exist under `src/`.

If the schematic introduced any demo content, remove it to match the above. (It should not.)

### Step 3.20 — Verify federation build + manifest

Run (single command):

```bash
npx ng build
```

Expected:
- Build succeeds with zero errors.
- `dist/mfe-demo/remoteEntry.json` exists (Native Federation manifest). Verify by listing `dist/mfe-demo/` and confirming `remoteEntry.json` is present.

If `remoteEntry.json` is missing or the build fails, escalate to caller with the build output.

### Step 3.21 — Manual serve smoke (optional but recommended)

Start the dev server (blocking). Use the `background_process` tool to run `npx ng serve` so it does not block, OR run it and stop with `Ctrl+C` after verifying:

```bash
npx ng serve
```

Expected:
- Server starts on `http://localhost:4201/`.
- Opening `http://localhost:4201/` in a browser renders a blank page (empty `<router-outlet>`) with no console errors.
- `http://localhost:4201/remoteEntry.json` returns a JSON document in the browser (or via `curl http://localhost:4201/remoteEntry.json` while the server runs).

Stop the server after verifying. Do NOT leave it running for the commit.

### Step 3.22 — Final gitignore compliance check

Before committing, run `git status`. Confirm `node_modules/`, `dist/`, `.angular/`, `out-tsc/` are NOT staged. If any are staged, unstage them (`git restore --staged <path>`).

### Step 3.23 — Commit

Stage the new/modified files (be selective; do NOT `git add -A` if it would include unwanted artifacts — but given the gitignore is correct, `git add -A` is acceptable after the Step 3.22 check):

```bash
git add -A
```

Then commit:

```bash
git commit -m "feat(mfe-demo): scaffold Angular 22 remote with Native Federation"
```

Do NOT push (push is restricted to Critical Workflow Step 5).

## 4. Files Touched (summary)

New:
- `package.json`
- `tsconfig.json`
- `tsconfig.app.json`
- `angular.json`
- `federation.config.js` (created by schematic, then edited)
- `src/index.html`
- `src/main.ts` (authored, then rewritten by schematic)
- `src/bootstrap.ts` (created by schematic)
- `src/styles.scss`
- `src/app/app.config.ts`
- `src/app/app.routes.ts`
- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/app.component.scss`

Modified:
- `.gitignore` (append Angular entries)

Removed:
- `src/.gitkeep`

## 5. Verification Checklist (implementer must confirm before signalling completion)

- [ ] `node -v` is v22.x (`.nvmrc` honoured).
- [ ] `npm install` completed; no `@cobranza-apps/*` resolution errors.
- [ ] `npx ng build` (base scaffold, pre-federation) succeeded.
- [ ] `npx ng add @angular-architects/native-federation --project mfe-demo --port 4201 --type remote` completed.
- [ ] `federation.config.js` has `name: 'mfe-demo'` and `exposes: { './Component': './src/app/app.component.ts' }`.
- [ ] `src/main.ts` calls `initFederation` and dynamic-imports `./bootstrap`; `src/bootstrap.ts` calls `bootstrapApplication`.
- [ ] `package.json` Angular versions still `22.1.2`; `@cobranza-apps/*` still present.
- [ ] No default Angular demo content; no `*.spec.ts` under `src/`.
- [ ] `npx ng build` (federation) succeeded; `dist/mfe-demo/remoteEntry.json` exists.
- [ ] (Optional) `npx ng serve` serves on `4201`; `remoteEntry.json` reachable.
- [ ] `git status` shows no `node_modules/`/`dist/`/`.angular/` staged.
- [ ] Commit created on `feat/mfe-demo-phase0`; no push performed.

## 6. Decisions Encoded (for the 50%-restricted implementer)

- **Scaffolding method:** hand-author files (no `ng new`, no temp folder, no shell copy) → deterministic.
- **Federation method:** official `ng add` schematic (do NOT hand-write the federation builder config in `angular.json`).
- **Expose target:** `./Component` → `./src/app/app.component.ts` (temporary; Task 4 repoints to `DemoComponent`).
- **Dev port:** `4201` (assumes Shell uses `4200`; document in README in TODO Task 11).
- **publicPath / CORS:** implicit via Native Federation + Vite dev-server default CORS; no explicit config.
- **Testing:** omitted (Phase 0 optional). No `test` script, no spec files.
- **Initial version:** `0.0.0` (versioning handled by Critical Workflow Step 3).

## 7. Completion Signal

Implementer MUST return a summary stating:
- What was done (files created/modified, schematic run, build status, manifest present).
- What was NOT done (no push, no theme/events/demo-component — those are later tasks).
- The chosen dev port (`4201`) and the temporary expose target.
- Any escalations encountered (registry, schematic flags, build failures).
