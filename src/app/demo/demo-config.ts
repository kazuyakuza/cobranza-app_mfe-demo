/**
 * Internal view modes for the demo MFE.
 * Maps to `brief.md §3.6` — Shell passes these via the opaque `data` input.
 * - `'table'`       → mock data table (default)
 * - `'create-form'` → simulated create form
 * - `'profile'`     → read-only profile card
 */
export type DemoViewMode = 'table' | 'create-form' | 'profile';

/**
 * Typed shape of the opaque `data` input the Shell forwards to this MFE.
 * See `brief.md §3.6` for field semantics and example payloads.
 *
 * The Shell never interprets these fields — they are an internal convention
 * of `mfe-demo` only.
 */
export interface DemoConfig {
  /** Which body view to render. Defaults to `'table'`. */
  view?: DemoViewMode;
  /** Optional title pushed via `mfe:update-header` on init. */
  title?: string;
  /** Mock profile payload rendered when `view === 'profile'`. */
  profile?: Record<string, unknown>;
  /** Number of mock rows rendered when `view === 'table'`. */
  tableRows?: number;
}

export const DEFAULT_DEMO_CONFIG: Required<Pick<DemoConfig, 'view' | 'tableRows'>> = {
  view: 'table',
  tableRows: 5,
};

/**
 * Coerces the opaque Shell `data` input into a validated `DemoConfig`.
 *
 * - Unknown / invalid `view` → falls back to `DEFAULT_VIEW`.
 * - Non-string `title`       → dropped (`undefined`).
 * - Non-plain-object `profile` → dropped.
 * - Non-finite / negative `tableRows` → falls back to `DEFAULT_TABLE_ROWS`.
 *
 * Always returns a complete `DemoConfig` — callers can read fields without
 * further null checks.
 */
export function coerceDemoConfig(data: Record<string, unknown> | undefined): DemoConfig {
  const raw = (data ?? {}) as DemoConfig;

  return {
    view: isValidViewMode(raw.view) ? raw.view : DEFAULT_DEMO_CONFIG.view,
    title: typeof raw.title === 'string' ? raw.title : undefined,
    profile: isPlainObject(raw.profile) ? raw.profile : undefined,
    tableRows: isValidTableRowCount(raw.tableRows) ? raw.tableRows : DEFAULT_DEMO_CONFIG.tableRows,
  };
}

function isValidViewMode(value: unknown): value is DemoViewMode {
  return value === 'table' || value === 'create-form' || value === 'profile';
}

/**
 * Type guard that checks whether `value` is a non-null, non-array plain object.
 *
 * Used by {@link coerceDemoConfig} to validate the `profile` field and by
 * `DemoProfileComponent` to decide whether to use the provided profile data
 * or fall back to `DEFAULT_PROFILE`.
 *
 * @param value - Unknown value from the Shell `data` input.
 * @returns `true` when `value` is a plain `Record<string, unknown>`.
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isValidTableRowCount(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

/**
 * Spanish display labels for each {@link DemoViewMode}.
 *
 * Used by the identity panel ("Vista: Tabla / Alta / Perfil") and by
 * {@link defaultTitleForView} to build the auto-generated header title
 * when the Shell does not provide an explicit `config.title`.
 */
export const VIEW_LABELS: Readonly<Record<DemoViewMode, string>> = {
  table: 'Tabla',
  'create-form': 'Alta',
  profile: 'Perfil',
};

/**
 * Returns the Spanish display label for a given view mode.
 *
 * @param view - One of the three supported {@link DemoViewMode} values.
 * @returns `'Tabla'`, `'Alta'`, `'Perfil'`, or `'Desconocida'` as fallback.
 */
export function viewModeToSpanishLabel(view: DemoViewMode): string {
  return VIEW_LABELS[view] ?? 'Desconocida';
}

/**
 * Builds the default header title for a view when `config.title` is absent.
 *
 * Format: `"Demo – <SpanishLabel>"` (e.g. `"Demo – Tabla"`, `"Demo – Alta"`).
 * Used by `DemoComponent.resolvedTitle` to auto-update the Shell header
 * when the view changes via `data` / `initialData`.
 *
 * @param view - Current {@link DemoViewMode}.
 * @returns A Spanish title string suitable for `mfe:update-header`.
 */
export function defaultTitleForView(view: DemoViewMode): string {
  return `Demo – ${viewModeToSpanishLabel(view)}`;
}