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

/**
 * Per-instance, in-memory log of `mfe:*` (outgoing) and `shell:*` (incoming)
 * events for a single `DemoComponent`.
 *
 * Key properties:
 * - **Instance isolation** — each `DemoComponent` constructs its own
 *   `DemoEventLog`, so events from one MFE instance never leak into another
 *   instance's log (critical when the Shell hosts several `demo` modules).
 * - **Bounded size** — the log is capped at {@link MAX_LOG_ENTRIES} (25)
 *   entries; new entries are prepended and the oldest are dropped, so the UI
 *   remains compact even during long sessions.
 * - **Signal-based** — `entries` is an Angular `signal`, so any template
 *   binding re-renders automatically when a new event is recorded.
 *
 * Entries store both a human-readable {@link DemoLogEntry.payloadSummary}
 * (truncated JSON, max 120 chars) and the {@link DemoLogEntry.rawPayload}
 * for the data-viewer accordion.
 */
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
