import { signal } from '@angular/core';

import { type DemoLogEntry, MAX_LOG_ENTRIES, summarizePayload } from './demo-log-entry';

export class DemoEventLog {
  readonly entries = signal<DemoLogEntry[]>([]);

  add(direction: 'in' | 'out', eventType: string, payload: unknown): void {
    const entry: DemoLogEntry = {
      direction,
      eventType,
      payloadSummary: summarizePayload(payload),
      rawPayload: payload,
      timestamp: new Date(),
    };
    this.entries.update((items) => [entry, ...items].slice(0, MAX_LOG_ENTRIES));
  }

  clear(): void {
    this.entries.set([]);
  }
}
