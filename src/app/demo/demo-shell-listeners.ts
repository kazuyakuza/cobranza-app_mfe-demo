import { type Signal } from '@angular/core';
import { isShellEvent, SHELL_EVENTS } from '@cobranza-apps/mfe-events';

import { type DemoEventLog } from './demo-event-log';
import { type DemoShellState } from './demo-shell-state';

interface DemoShellListenersOptions {
  readonly eventLog: DemoEventLog;
  readonly shellState: DemoShellState;
  readonly moduleType: Signal<string>;
  readonly instanceId: Signal<string>;
}

export class DemoShellListeners {
  constructor(private readonly options: DemoShellListenersOptions) {}

  attach(): void {
    window.addEventListener(SHELL_EVENTS.MODULE_STATE, this.onModuleState);
    window.addEventListener(SHELL_EVENTS.VISIBILITY_CHANGED, this.onVisibilityChanged);
    window.addEventListener(SHELL_EVENTS.THEME_CHANGED, this.onThemeChanged);
  }

  detach(): void {
    window.removeEventListener(SHELL_EVENTS.MODULE_STATE, this.onModuleState);
    window.removeEventListener(SHELL_EVENTS.VISIBILITY_CHANGED, this.onVisibilityChanged);
    window.removeEventListener(SHELL_EVENTS.THEME_CHANGED, this.onThemeChanged);
  }

  private readonly matchesThisInstance = (detail: { instanceId: string; moduleType: string }): boolean =>
    detail.instanceId === this.options.instanceId() && detail.moduleType === this.options.moduleType();

  private readonly onModuleState = (event: Event): void => {
    if (!isShellEvent(event, SHELL_EVENTS.MODULE_STATE)) return;
    if (!this.matchesThisInstance(event.detail)) return;
    this.options.eventLog.add({ direction: 'in', eventType: SHELL_EVENTS.MODULE_STATE, payload: event.detail });
    this.options.shellState.applyModuleState(event.detail);
  };

  private readonly onVisibilityChanged = (event: Event): void => {
    if (!isShellEvent(event, SHELL_EVENTS.VISIBILITY_CHANGED)) return;
    if (!this.matchesThisInstance(event.detail)) return;
    this.options.eventLog.add({ direction: 'in', eventType: SHELL_EVENTS.VISIBILITY_CHANGED, payload: event.detail });
    this.options.shellState.applyVisibility(event.detail);
  };

  private readonly onThemeChanged = (event: Event): void => {
    if (!isShellEvent(event, SHELL_EVENTS.THEME_CHANGED)) return;
    this.options.eventLog.add({ direction: 'in', eventType: SHELL_EVENTS.THEME_CHANGED, payload: event.detail });
  };
}
