# Global Plan: Initialize Project Info & Update README

## Pre-Analysis

- Project: `mfe-demo` — a Native Federation remote (Angular 22) acting as a demo/placeholder MFE for the Company Back-office Shell.
- Current state: `brief.md` exists with real content, but other core project-info files (`product.md`, `context.md`, `architecture.md`, `tech.md`) are missing.
- `README.md` still contains the base-project template text.
- `src/` is empty; no `package.json` yet — project is at early scaffolding stage.
- These tasks are **documentation-only** (no front-end code), so steps 4.1a and 4.5a are skipped.

## Task 1: Initialize Project Info

**Goal**: Create the four missing core project-info files under `.agent/project-info/` based on `brief.md` and the repository context.

**Files to create**:
- `.agent/project-info/product.md` — User experience, problem definition, product goals.
- `.agent/project-info/context.md` — Current work focus, recent changes, immediate next steps.
- `.agent/project-info/architecture.md` — System architecture, design patterns, critical paths.
- `.agent/project-info/tech.md` — Stack, development setup, technical constraints, tool usage patterns.

**Per-task steps**:
1. **4.1b Analysis & Planning** — Architector reads `brief.md`, existing rules/workflows, and repo state; produces detailed implementation plan.
2. **4.2 Implementation** — Implementer creates the four markdown files with accurate content derived from `brief.md` and project context.
3. **4.3 Code Review & Simplification** — Code-reviewer checks for accuracy, completeness, and consistency with `brief.md`; code-simplifier looks for clarity improvements. Fix plan applied by Implementer if needed.
4. **4.4 Documentation** — Docs-specialist ensures proper formatting, cross-references, and any additional agent guidance.
5. **4.5b Overall Plan Adherence** — Architector verifies all four files were created correctly and match the plan.
6. **4.6 Task Completion** — Implementer marks task as `[DONE]` in TODO file and commits.

## Task 2: Update README File

**Goal**: Replace the base-project `README.md` with an `mfe-demo`-specific README that explains the project purpose, quick start, development modes, federation config, and links to docs.

**File to modify**:
- `README.md`

**Per-task steps**:
1. **4.1b Analysis & Planning** — Architector reads `brief.md` and current `README.md`; produces detailed plan for the new README content and structure.
2. **4.2 Implementation** — Implementer rewrites `README.md` with mfe-demo content (purpose, stack, dev modes, ports, etc.).
3. **4.3 Code Review & Simplification** — Code-reviewer & simplifier review for accuracy and conciseness. Fix plan applied by Implementer if needed.
4. **4.4 Documentation** — Docs-specialist ensures formatting, TOC if needed, and cross-links.
5. **4.5b Overall Plan Adherence** — Architector verifies README content matches plan and `brief.md`.
6. **4.6 Task Completion** — Implementer marks task as `[DONE]` in TODO file and commits.

## Step 2: Git Feature Branch Setup
- Run by Implementer sub-agent.
- Commit any unstaged changes.
- Switch to `main`, create `feat/init-project-info-and-readme`.

## Step 3: Version Update
- No `package.json` or version file present. Skip.

## Step 5: TODO File Completion
- Rename `.agent/todos/20260803/20260803-todo-0.md` to `20260803-todo-0-DONE.md`.
- Merge feature branch into `main`.
- Push `main` to `origin`.
