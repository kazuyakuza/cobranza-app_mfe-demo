import { signal } from '@angular/core';

export interface DemoLogEntry {
  readonly direction: 'in' | 'out';
  readonly timestamp: Date;
  readonly eventType: string;
  readonly payloadSummary: string;
  readonly rawPayload: unknown;
}

export interface DemoLogEntryInput {
  readonly direction: 'in' | 'out';
  readonly eventType: string;
  readonly payload: unknown;
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

export class DemoEventLog {
  readonly entries = signal<DemoLogEntry[]>([]);

  add(entry: DemoLogEntryInput): void {
    const newEntry: DemoLogEntry = {
      direction: entry.direction,
      eventType: entry.eventType,
      payloadSummary: summarizePayload(entry.payload),
      rawPayload: entry.payload,
      timestamp: new Date(),
    };
    this.entries.update((items) => [newEntry, ...items].slice(0, MAX_LOG_ENTRIES));
  }

  clear(): void {
    this.entries.set([]);
  }
}
