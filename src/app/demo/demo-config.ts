export type DemoViewMode = 'table' | 'create-form' | 'profile';

export interface DemoConfig {
  view?: DemoViewMode;
  title?: string;
  profile?: Record<string, unknown>;
  tableRows?: number;
}

const DEFAULT_VIEW: DemoViewMode = 'table';
const DEFAULT_TABLE_ROWS = 5;

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