export interface DemoLogEntry {
  readonly direction: 'in' | 'out';
  readonly timestamp: Date;
  readonly eventType: string;
  readonly payloadSummary: string;
  readonly rawPayload: unknown;
}

export const MAX_LOG_ENTRIES = 25;

const PAYLOAD_SUMMARY_MAX_LENGTH = 120;

export function summarizePayload(payload: unknown): string {
  try {
    const text = JSON.stringify(payload);
    return text.length > PAYLOAD_SUMMARY_MAX_LENGTH
      ? `${text.slice(0, PAYLOAD_SUMMARY_MAX_LENGTH)}…`
      : text;
  } catch {
    return '(payload no serializable)';
  }
}
