# Simplification Plan — Initialize Project Info

## Scope

Review and simplify the four project-info files created in Task 1:

- `.agent/project-info/product.md`
- `.agent/project-info/context.md`
- `.agent/project-info/architecture.md`
- `.agent/project-info/tech.md`

All changes must preserve facts and keep `brief.md` as the source of truth. Do not expand scope beyond these four files.

## Identified simplifications

### 1. `architecture.md` — simplify system-context diagram

**Current**: multi-line ASCII box diagram with misaligned borders and a separate `relies on` annotation.

**Change**: Replace the ASCII art with a short, clean bullet list or a simple two-line diagram. Keep the same facts: Shell loads remote via Native Federation; events flow through `@cobranza-apps/mfe-events`; remote depends on `@cobranza-apps/ui`, `@cobranza-apps/mfe-events`, and optionally `@cobranza-apps/entities`.

**Rationale**: The current diagram is hard to read and the same information is stated in prose right below it.

### 2. `architecture.md` + `tech.md` — remove federation naming duplication

**Current**:

- `architecture.md` §6 lists remote name, exposed module, dev modes, and public-path/CORS notes.
- `tech.md` §4 repeats remote name and exposed module.
- `tech.md` §6 repeats the federation identity table.

**Change**:

- In `architecture.md` §6, keep the remote name, exposed module, and public-path/CORS note. Move the dev-mode list to `tech.md` §3 (it already says "Planned setup steps").
- In `tech.md` §4, reduce to one sentence pointing to `architecture.md` §6 for federation naming details. Example: "See `architecture.md` §6 for remote name, exposed module, and public-path configuration."
- In `tech.md` §6, keep only the table but add a note that details live in `architecture.md` §6, or merge the two tables if it does not add new information.

**Rationale**: Same facts in two files are harder to keep in sync.

### 3. `architecture.md` + `tech.md` — consolidate boundary/constraints

**Current**:

- `architecture.md` §2 "Architectural Boundaries (Core Rules)" lists DOM, workspace, event bus, chrome ownership, and state isolation rules.
- `tech.md` §7 "Technical Constraints" repeats DOM, workspace, event bus, chrome ownership, language, i18n, and no-BFF/no-auth rules.

**Change**:

- Keep `architecture.md` §2 as the primary home for architectural boundaries.
- In `tech.md` §7, reduce to a short intro plus a reference: "See `architecture.md` §2 for architectural boundaries. Technical constraints specific to this repo: Angular 22 standalone only, Spanish UI, desktop only, no real API calls, no i18n."

**Rationale**: Boundaries are architectural; tech constraints should only add technology-specific items not already covered.

### 4. `architecture.md` — tighten component architecture section

**Current**: §3 includes a file-tree snippet and then a paragraph restating "Single clear entry component is preferred; sub-views may be plain components or template branches. Keep the surface small."

**Change**: Remove the restating paragraph. The file tree and one-line comment after it already convey the intent. If a comment is needed, replace the paragraph with a single inline note inside the tree, e.g. `# standalone component; sub-views may be template branches`.

**Rationale**: Avoid saying the same thing twice.

### 5. `architecture.md` — simplify config section prose

**Current**: §5 starts with "The Shell transports opaque configuration through `data` — **no changes to `@cobranza-apps/mfe-events` are required**." Then it shows the TypeScript interface, then "Component usage", then a paragraph about data sources.

**Change**:

- Keep the opening sentence.
- Keep the TypeScript interface.
- Remove or merge the "Component usage" snippet; it is an obvious getter pattern and does not add new information. If kept, reduce it to a single inline example inside the prose.
- Keep the data-sources paragraph.

**Rationale**: The code snippet is trivial and the interface already documents the shape.

### 6. `tech.md` — merge redundant tooling sections

**Current**: §3 "Development Setup" lists planned setup steps. §11 "Tooling Patterns" repeats the same tool choices (Angular CLI, esbuild, Native Federation, Bootstrap 5).

**Change**: Remove §11 entirely. Move any unique detail (e.g. "Bootstrap 5 + UI tokens") into §3's notes or §1's stack table. Add a one-line note at the end of §3: "Tooling: Angular CLI, esbuild, Native Federation, Bootstrap 5 + UI tokens."

**Rationale**: Two sections describing the same tools is redundant.

### 7. `product.md` — minor tightening

**Current**: §1 lists three bullet problems, then a sentence that `mfe-demo` fills the gap. §3 product goals restate nearly the same three ideas.

**Change**:

- In §1, remove the third bullet ("Show future MFE authors a concrete, working reference...") and merge the remaining two bullets into one or two concise sentences.
- Keep §3 product goals unchanged, since they are the authoritative list.
- Alternatively, move the three ideas from §1 directly into §3 as goals and remove §1's bullet list, keeping only the problem statement in §1.

**Rationale**: §1 and §3 currently repeat the same intent with different wording.

### 8. Cross-file — unify repeated "Spanish only / Desktop only" statements

**Current**: This constraint appears in `product.md`, `architecture.md` §2/notes, and `tech.md` §7.

**Change**: Keep the statement in `product.md` (product-level constraint) and `tech.md` §7 (technical constraint). In `architecture.md`, reference `product.md` or remove if already implied by §2's boundary rules.

**Rationale**: Product-level facts belong in `product.md`; technical constraints belong in `tech.md`.

## Out of scope

- Do not modify `brief.md` or `instructions.md`.
- Do not restructure sections beyond the changes listed above.
- Do not remove any contract tables, event definitions, or config types.
- Do not add new content.

## Verification

After editing:

1. Read each file once more and confirm no duplicate facts remain between `architecture.md` and `tech.md`.
2. Confirm all links/references (`brief.md`, section numbers) still resolve correctly.
3. Confirm no TODO line or TODO sub-item status is changed; only the four files above are modified.
