import { type Signal, signal } from '@angular/core';
import {
  dispatchMfeEvent,
  MFE_EVENTS,
  SCHEMA_VERSION,
  type MfeEventMap,
  type ModuleStatus,
} from '@cobranza-apps/mfe-events';

import { type DemoEventLog } from './demo-event-log';

export interface DemoDispatcherOptions {
  readonly moduleType: Signal<string>;
  readonly instanceId: Signal<string>;
  readonly eventLog: DemoEventLog;
}

interface HeaderDemo {
  readonly title: string;
  readonly status: ModuleStatus;
}

interface WithIdentity {
  schemaVersion: number;
  moduleType: string;
  instanceId: string;
}

const HEADER_DEMOS: ReadonlyArray<HeaderDemo> = [
  { title: 'Demo – Título A', status: 'loaded' },
  { title: 'Demo – Título B', status: 'success' },
  { title: 'Demo – Título C', status: 'warning' },
];

export class DemoDispatcher {
  private readonly headerDemoIndex = signal(0);

  constructor(private readonly options: DemoDispatcherOptions) {}

  ready(): void {
    this.send(MFE_EVENTS.MODULE_READY, this.withIdentity({}));
  }

  updateHeader(title: string, status: ModuleStatus): void {
    this.send(MFE_EVENTS.UPDATE_HEADER, this.withIdentity({ title, status }));
  }

  showNotification(type: 'success' | 'warning' | 'error' | 'info', message: string): void {
    this.send(MFE_EVENTS.SHOW_NOTIFICATION, {
      schemaVersion: SCHEMA_VERSION,
      type,
      message,
    });
  }

  requestFullscreen(): void {
    this.send(MFE_EVENTS.REQUEST_FULLSCREEN, this.withIdentity({}));
  }

  requestRemove(): void {
    this.send(MFE_EVENTS.REQUEST_REMOVE, this.withIdentity({}));
  }

  requestAddModule(): void {
    this.send(MFE_EVENTS.REQUEST_ADD_MODULE, {
      schemaVersion: SCHEMA_VERSION,
      moduleType: 'demo',
      title: 'Nueva instancia demo',
      initialData: { view: 'table' },
    });
  }

  moduleError(): void {
    this.send(
      MFE_EVENTS.MODULE_ERROR,
      this.withIdentity({
        message: 'Error simulado desde mfe-demo',
        code: 'DEMO_ERROR',
      }),
    );
  }

  cycleHeaderDemo(): void {
    const nextIndex = (this.headerDemoIndex() + 1) % HEADER_DEMOS.length;
    this.headerDemoIndex.set(nextIndex);
    const demo = HEADER_DEMOS[nextIndex];
    this.updateHeader(demo.title, demo.status);
  }

  private withIdentity<T extends object>(extra: T): T & WithIdentity {
    return {
      ...extra,
      schemaVersion: SCHEMA_VERSION,
      moduleType: this.options.moduleType(),
      instanceId: this.options.instanceId(),
    } as T & WithIdentity;
  }

  private send<K extends keyof MfeEventMap>(name: K, payload: MfeEventMap[K]): void {
    this.options.eventLog.add({ direction: 'out', eventType: name, payload });
    console.log('[mfe-demo] dispatch', name, payload);
    dispatchMfeEvent(name, payload);
  }
}
