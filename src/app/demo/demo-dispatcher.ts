import { type Signal, signal } from '@angular/core';
import {
  dispatchMfeEvent,
  MFE_EVENTS,
  SCHEMA_VERSION,
  type MfeEventMap,
  type ModuleStatus,
  type UpdateMinHeightPayload,
} from '@cobranza-apps/mfe-events';

import { type DemoEventLog } from './demo-event-log';
import { type DemoMinHeightReason } from './demo-min-height';

/**
 * Constructor options for {@link DemoDispatcher}.
 *
 * `moduleType` and `instanceId` are Angular signals read at dispatch time
 * (not at construction time) so the dispatcher always sends the current
 * values even if the Shell updates them later.
 */
export interface DemoDispatcherOptions {
  readonly moduleType: Signal<string>;
  readonly instanceId: Signal<string>;
  readonly eventLog: DemoEventLog;
}

/** One entry in the header-title demo rotation list. */
interface HeaderDemo {
  readonly title: string;
  readonly status: ModuleStatus;
}

/** Mandatory identity fields prepended to every outgoing `mfe:*` payload. */
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

/**
 * Centralised dispatcher for every outgoing `mfe:*` event from a `DemoComponent`
 * instance.
 *
 * Responsibilities:
 * - Builds each event payload with the mandatory identity fields
 *   (`schemaVersion`, `moduleType`, `instanceId`) via {@link withIdentity}.
 * - Records every dispatched event in the instance-owned {@link DemoEventLog}
 *   (direction `'out'`) so the local event-log UI can show it.
 * - Exposes {@link cycleHeaderDemo}, which rotates through a fixed list of
 *   title/status combinations (`HEADER_DEMOS`) so the "Actualizar título"
 *   action button can demo several header states without extra wiring.
 *
 * The dispatcher is stateless apart from the header-cycle index; it is owned
 * by `DemoComponent` and created once per component instance.
 */
export class DemoDispatcher {
  private readonly headerDemoIndex = signal(0);

  constructor(private readonly options: DemoDispatcherOptions) {}

  /** Dispatches `mfe:module-ready` — signals to the Shell that this instance is mounted. */
  ready(): void {
    this.send(MFE_EVENTS.MODULE_READY, this.withIdentity({}));
  }

  /** Dispatches `mfe:update-header` — updates the Shell header title and status badge. */
  updateHeader(title: string, status: ModuleStatus): void {
    this.send(MFE_EVENTS.UPDATE_HEADER, this.withIdentity({ title, status }));
  }

  /** Dispatches `mfe:show-notification` — asks the Shell to show a toast. */
  showNotification(type: 'success' | 'warning' | 'error' | 'info', message: string): void {
    this.send(MFE_EVENTS.SHOW_NOTIFICATION, {
      schemaVersion: SCHEMA_VERSION,
      type,
      message,
    });
  }

  /** Dispatches `mfe:request-fullscreen` — asks the Shell to toggle fullscreen. */
  requestFullscreen(): void {
    this.send(MFE_EVENTS.REQUEST_FULLSCREEN, this.withIdentity({}));
  }

  /** Dispatches `mfe:request-remove` — asks the Shell to remove this module instance. */
  requestRemove(): void {
    this.send(MFE_EVENTS.REQUEST_REMOVE, this.withIdentity({}));
  }

  /** Dispatches `mfe:request-add-module` — asks the Shell to add a new demo instance. */
  requestAddModule(): void {
    this.send(MFE_EVENTS.REQUEST_ADD_MODULE, {
      schemaVersion: SCHEMA_VERSION,
      moduleType: 'demo',
      title: 'Nueva instancia demo',
      initialData: { view: 'table' },
    });
  }

  /** Dispatches `mfe:module-error` — reports a simulated error to the Shell. */
  moduleError(): void {
    this.send(
      MFE_EVENTS.MODULE_ERROR,
      this.withIdentity({
        message: 'Error simulado desde mfe-demo',
        code: 'DEMO_ERROR',
      }),
    );
  }

  /**
   * Dispatches `mfe:update-min-height` — declares the MFE's preferred min-height.
   *
   * Uses `MFE_EVENTS.UPDATE_MIN_HEIGHT` from `@cobranza-apps/mfe-events@^0.6.0`.
   * The Shell should persist `minHeightPx` and apply it as CSS on the module
   * container. The `reason` field is informational.
   *
   * @param minHeightPx - Preferred minimum height in CSS pixels.
   * @param reason - Why the declaration is being made (init / view-change / content-change).
   */
  updateMinHeight(minHeightPx: number, reason: DemoMinHeightReason): void {
    this.send(
      MFE_EVENTS.UPDATE_MIN_HEIGHT,
      this.withIdentity({ minHeightPx, reason } as UpdateMinHeightPayload),
    );
  }

  /**
   * Rotates to the next header title/status demo and dispatches `mfe:update-header`.
   *
   * Cycles through {@link HEADER_DEMOS} so the "Actualizar título" action button
   * can showcase several header states without extra wiring.
   */
  cycleHeaderDemo(): void {
    const nextIndex = (this.headerDemoIndex() + 1) % HEADER_DEMOS.length;
    this.headerDemoIndex.set(nextIndex);
    const demo = HEADER_DEMOS[nextIndex];
    this.updateHeader(demo.title, demo.status);
  }

  /** Prepends the mandatory identity fields (`schemaVersion`, `moduleType`, `instanceId`) to any payload. */
  private withIdentity<T extends object>(extra: T): T & WithIdentity {
    return {
      ...extra,
      schemaVersion: SCHEMA_VERSION,
      moduleType: this.options.moduleType(),
      instanceId: this.options.instanceId(),
    } as T & WithIdentity;
  }

  /** Logs the event to the instance-owned event log and dispatches it on `window`. */
  private send<K extends keyof MfeEventMap>(name: K, payload: MfeEventMap[K]): void {
    this.options.eventLog.add({ direction: 'out', eventType: name, payload });
    dispatchMfeEvent(name, payload);
  }
}
