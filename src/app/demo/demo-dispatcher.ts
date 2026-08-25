import { type Signal, signal } from '@angular/core';
import {
  dispatchMfeEvent,
  MFE_EVENTS,
  SCHEMA_VERSION,
  type MfeEventMap,
  type ModuleStatus,
} from '@cobranza-apps/mfe-events';

import { DemoEventLog } from './demo-event-log';

interface HeaderDemo {
  readonly title: string;
  readonly status: ModuleStatus;
}

const HEADER_DEMOS: ReadonlyArray<HeaderDemo> = [
  { title: 'Demo – Título A', status: 'loaded' },
  { title: 'Demo – Título B', status: 'success' },
  { title: 'Demo – Título C', status: 'warning' },
];

export class DemoDispatcher {
  private readonly headerDemoIndex = signal(0);

  constructor(
    private readonly moduleType: Signal<string>,
    private readonly instanceId: Signal<string>,
    private readonly eventLog: DemoEventLog,
  ) {}

  ready(): void {
    this.send(MFE_EVENTS.MODULE_READY, {
      schemaVersion: SCHEMA_VERSION,
      moduleType: this.moduleType(),
      instanceId: this.instanceId(),
    });
  }

  updateHeader(title: string, status: ModuleStatus): void {
    this.send(MFE_EVENTS.UPDATE_HEADER, {
      schemaVersion: SCHEMA_VERSION,
      moduleType: this.moduleType(),
      instanceId: this.instanceId(),
      title,
      status,
    });
  }

  showNotification(type: 'success' | 'warning' | 'error' | 'info', message: string): void {
    this.send(MFE_EVENTS.SHOW_NOTIFICATION, {
      schemaVersion: SCHEMA_VERSION,
      type,
      message,
    });
  }

  requestFullscreen(): void {
    this.send(MFE_EVENTS.REQUEST_FULLSCREEN, {
      schemaVersion: SCHEMA_VERSION,
      moduleType: this.moduleType(),
      instanceId: this.instanceId(),
    });
  }

  requestRemove(): void {
    this.send(MFE_EVENTS.REQUEST_REMOVE, {
      schemaVersion: SCHEMA_VERSION,
      moduleType: this.moduleType(),
      instanceId: this.instanceId(),
    });
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
    this.send(MFE_EVENTS.MODULE_ERROR, {
      schemaVersion: SCHEMA_VERSION,
      moduleType: this.moduleType(),
      instanceId: this.instanceId(),
      message: 'Error simulado desde mfe-demo',
      code: 'DEMO_ERROR',
    });
  }

  cycleHeaderDemo(): void {
    const nextIndex = (this.headerDemoIndex() + 1) % HEADER_DEMOS.length;
    this.headerDemoIndex.set(nextIndex);
    const demo = HEADER_DEMOS[nextIndex];
    this.updateHeader(demo.title, demo.status);
  }

  private send<K extends keyof MfeEventMap>(name: K, payload: MfeEventMap[K]): void {
    this.eventLog.add('out', name, payload);
    console.log('[mfe-demo] dispatch', name, payload);
    dispatchMfeEvent(name, payload);
  }
}
