# Fix Plan — Task D (Phase 1, Task 10): Documentation Update

> Target TODO: `.agent/todos/20260803/20260803-todo-2.md` → `### 10. Documentation update`.
> Branch: `feat/mfe-demo-phase1`.
> Scope: documentation-only fixes. No `src/**` changes.

## 1. Issues Found

### 1.1 Factual inaccuracy in `docs/actions-and-events.md`

The "Event payload contract" section claims:

> Every outgoing event includes `schemaVersion` (from `SCHEMA_VERSION`), `moduleType`, and `instanceId`.

This does **not** match the actual implementation in `src/app/demo/demo-dispatcher.ts`:

- `mfe:show-notification` sends `{ schemaVersion, type, message }` — it does **not** include `moduleType` or `instanceId`.
- `mfe:request-add-module` sends `{ schemaVersion, moduleType: 'demo', title, initialData }` — it includes `moduleType` but **not** `instanceId`.
- Only the identity-bearing events (`mfe:module-ready`, `mfe:update-header`, `mfe:request-fullscreen`, `mfe:request-remove`, `mfe:module-error`) use `withIdentity` and therefore include `schemaVersion` + `moduleType` + `instanceId`.

Note: the original TODO constraint states that every outgoing `mfe:*` event must include `moduleType` + `instanceId`. The current implementation deviates from that constraint for two events. This fix plan only corrects the documentation to reflect the committed code; it does **not** modify the dispatcher implementation.

### 1.2 Minor inaccuracy in `docs/shell-integration-guide.md`

The visibility state is rendered in the identity panel as plain text (`<span>`), not as a `cba-badge`. Two references call it a "badge":

- "What the Shell can test" table: "the identity panel shows a Visible/Oculto **badge** with the reason."
- "Incoming events the MFE listens for" table: "Updates visibility **badge** + reason in the identity panel."

The collapse/fullscreen states **are** rendered as `cba-badge` components, so only the visibility wording needs correction.

## 2. Fix Steps

### Step 2.1 — Update `docs/actions-and-events.md`

Replace the first bullet under `## Event payload contract` with an accurate description.

**Current text:**

```markdown
- Every outgoing event includes `schemaVersion` (from `SCHEMA_VERSION`), `moduleType`, and `instanceId`.
- `mfe:show-notification` and `mfe:request-add-module` build their payloads directly (see `demo-dispatcher.ts`); the identity-bearing events use the internal `withIdentity` helper.
- All dispatches go through `DemoDispatcher.send`, which records the entry in `DemoEventLog` (direction `'out'`) and calls `console.log('[mfe-demo] dispatch', name, payload)` before `dispatchMfeEvent`.
```

**New text:**

```markdown
- Identity-bearing events (`mfe:module-ready`, `mfe:update-header`, `mfe:request-fullscreen`, `mfe:request-remove`, `mfe:module-error`) include `schemaVersion` (from `SCHEMA_VERSION`), `moduleType`, and `instanceId` via the internal `withIdentity` helper.
- `mfe:show-notification` is built directly and includes `schemaVersion`, `type`, and `message` only — it does not carry identity fields.
- `mfe:request-add-module` is built directly and includes `schemaVersion`, `moduleType: 'demo'`, `title`, and `initialData` — it does not include `instanceId`.
- All dispatches go through `DemoDispatcher.send`, which records the entry in `DemoEventLog` (direction `'out'`) and calls `console.log('[mfe-demo] dispatch', name, payload)` before `dispatchMfeEvent`.
```

### Step 2.2 — Update `docs/shell-integration-guide.md`

**First change** (in "What the Shell can test with mfe-demo" → Visibility row):

From:

```markdown
| Visibility | Send `shell:visibility-changed`; the identity panel shows a Visible/Oculto badge with the reason. |
```

To:

```markdown
| Visibility | Send `shell:visibility-changed`; the identity panel shows a Visible/Oculto label with the reason. |
```

**Second change** (in "Incoming events the MFE listens for" → `shell:visibility-changed` row):

From:

```markdown
| `shell:visibility-changed` | `instanceId` + `moduleType === 'demo'` | Updates visibility badge + reason in the identity panel. |
```

To:

```markdown
| `shell:visibility-changed` | `instanceId` + `moduleType === 'demo'` | Updates visibility label + reason in the identity panel. |
```

## 3. Verification

After applying the fixes:

1. `docs/actions-and-events.md` no longer claims that every outgoing event includes `moduleType` + `instanceId`.
2. `docs/shell-integration-guide.md` no longer describes the visibility state as a badge.
3. Re-read the changed paragraphs and confirm they match:
   - `src/app/demo/demo-dispatcher.ts` lines 57–98 for payload shapes.
   - `src/app/demo/demo.component.html` lines 39–47 for visibility rendering.
4. Run `git status` and confirm only the two docs files are modified.

## 4. Out of Scope

- Do **not** change `src/app/demo/demo-dispatcher.ts` or any other source file.
- Do **not** update `README.md` — its new bullets are accurate.
- Do **not** create or modify plan files for other tasks.
- Do **not** commit or push — commit is restricted to the implementer step.

## 5. Completion Signal

Return the path to this fix plan file and a short summary of the two documentation corrections.
