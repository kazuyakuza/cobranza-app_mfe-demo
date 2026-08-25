import { type Signal } from '@angular/core';
import { isShellEvent, SHELL_EVENTS } from '@cobranza-apps/mfe-events';

import { type DemoEventLog } from './demo-event-log';
import { type DemoShellState } from './demo-shell-state';

/**
 * Constructor options for {@link DemoShellListeners}.
 *
 * All dependencies are injected so the listener class stays stateless and
 * trivially testable. `moduleType` and `instanceId` are Angular signals
 * because they originate from `@Input` signals on `DemoComponent`.
 */
interface DemoShellListenersOptions {
  readonly eventLog: DemoEventLog;
  readonly shellState: DemoShellState;
  readonly moduleType: Signal<string>;
  readonly instanceId: Signal<string>;
}

/**
 * Manages `window`-level listeners for every `shell:*` event that
 * `DemoComponent` cares about.
 *
 * Lifecycle:
 * - {@link attach} is called from `DemoComponent.ngOnInit`.
 * - {@link detach} is called from `DemoComponent.ngOnDestroy`.
 *
 * Instance isolation:
 * Every handler first checks {@link matchesThisInstance} so that events
 * dispatched by the Shell for a *different* demo instance are silently
 * ignored. `shell:theme-changed` is the only exception — it has no
 * `instanceId` in its payload and is therefore global.
 *
 * Related:
 * - `DemoShellState` — receives the parsed payloads.
 * - `DemoEventLog` — records every accepted inbound event.
 * - `@cobranza-apps/mfe-events` — canonical event-name constants.
 */
export class DemoShellListeners {
  constructor(private readonly options: DemoShellListenersOptions) {}

  /** Registers all `shell:*` listeners. Call once on component init. */
  attach(): void {
    window.addEventListener(SHELL_EVENTS.MODULE_STATE, this.onModuleState);
    window.addEventListener(SHELL_EVENTS.VISIBILITY_CHANGED, this.onVisibilityChanged);
    window.addEventListener(SHELL_EVENTS.THEME_CHANGED, this.onThemeChanged);
  }

  /** Removes all `shell:*` listeners. Call once on component destroy. */
  detach(): void {
    window.removeEventListener(SHELL_EVENTS.MODULE_STATE, this.onModuleState);
    window.removeEventListener(SHELL_EVENTS.VISIBILITY_CHANGED, this.onVisibilityChanged);
    window.removeEventListener(SHELL_EVENTS.THEME_CHANGED, this.onThemeChanged);
  }

  /**
   * Returns `true` when the event payload belongs to *this* MFE instance.
   *
   * Checks both `instanceId` and `moduleType` to prevent cross-instance and
   * cross-module leakage when the Shell hosts multiple demo modules.
   */
  private readonly matchesThisInstance = (detail: { instanceId: string; moduleType: string }): boolean =>
    detail.instanceId === this.options.instanceId() && detail.moduleType === this.options.moduleType();

  /** Handles `shell:module-state` — forwards to {@link DemoShellState.applyModuleState}. */
  private readonly onModuleState = (event: Event): void => {
    if (!isShellEvent(event, SHELL_EVENTS.MODULE_STATE)) return;
    if (!this.matchesThisInstance(event.detail)) return;
    this.options.eventLog.add({ direction: 'in', eventType: SHELL_EVENTS.MODULE_STATE, payload: event.detail });
    this.options.shellState.applyModuleState(event.detail);
  };

  /** Handles `shell:visibility-changed` — forwards to {@link DemoShellState.applyVisibility}. */
  private readonly onVisibilityChanged = (event: Event): void => {
    if (!isShellEvent(event, SHELL_EVENTS.VISIBILITY_CHANGED)) return;
    if (!this.matchesThisInstance(event.detail)) return;
    this.options.eventLog.add({ direction: 'in', eventType: SHELL_EVENTS.VISIBILITY_CHANGED, payload: event.detail });
    this.options.shellState.applyVisibility(event.detail);
  };

  /**
   * Handles `shell:theme-changed`.
   *
   * This event is global (no `instanceId` check) because the Shell broadcasts
   * theme changes to all modules simultaneously.
   */
  private readonly onThemeChanged = (event: Event): void => {
    if (!isShellEvent(event, SHELL_EVENTS.THEME_CHANGED)) return;
    this.options.eventLog.add({ direction: 'in', eventType: SHELL_EVENTS.THEME_CHANGED, payload: event.detail });
  };
}
