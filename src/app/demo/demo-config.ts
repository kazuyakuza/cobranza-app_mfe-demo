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

const DEFAULT_VIEW: DemoViewMode = 'table';
const DEFAULT_TABLE_ROWS = 5;

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
    view: isValidViewMode(raw.view) ? raw.view : DEFAULT_VIEW,
    title: typeof raw.title === 'string' ? raw.title : undefined,
    profile: isPlainObject(raw.profile) ? raw.profile : undefined,
    tableRows: isValidTableRowCount(raw.tableRows) ? raw.tableRows : DEFAULT_TABLE_ROWS,
  };
}

function isValidViewMode(value: unknown): value is DemoViewMode {
  return value === 'table' || value === 'create-form' || value === 'profile';
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isValidTableRowCount(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}