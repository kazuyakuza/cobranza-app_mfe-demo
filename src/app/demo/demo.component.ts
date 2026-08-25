import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import {
  CbaAccordionComponent, CbaBadgeComponent, CbaButtonComponent, CbaCardComponent,
} from '@cobranza-apps/ui';
import {
  isShellEvent,
  MFE_EVENTS,
  SHELL_EVENTS,
  type ModuleSize,
} from '@cobranza-apps/mfe-events';

import { coerceDemoConfig, defaultTitleForView, viewModeToSpanishLabel } from './demo-config';
import { DemoDispatcher } from './demo-dispatcher';
import { DemoEventLog, MAX_LOG_ENTRIES } from './demo-event-log';
import { DemoShellState } from './demo-shell-state';
import { hashString, truncateInstanceId } from './demo-utils';
import { DemoCreateFormComponent } from './views/demo-create-form/demo-create-form.component';
import { DemoProfileComponent } from './views/demo-profile/demo-profile.component';
import { DemoTableComponent } from './views/demo-table/demo-table.component';

interface ActionButtonConfig {
  readonly label: string;
  readonly variant: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  readonly action: () => void;
}

@Component({
  selector: 'cba-demo',
  standalone: true,
  imports: [
    CbaAccordionComponent,
    CbaBadgeComponent,
    CbaButtonComponent,
    CbaCardComponent,
    DatePipe,
    DemoCreateFormComponent,
    DemoProfileComponent,
    DemoTableComponent,
    NgbAccordionModule,
  ],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Main exposed component of `mfe-demo`.
 *
 * The Shell hosts this component via Native Federation and injects the
 * standard MFE inputs (see `brief.md §3.2`). The component:
 *
 * **View switching** — Renders one of three internal views driven by
 * `config.view` (default `'table'`):
 * - `'table'` → {@link DemoTableComponent} (mock data table).
 * - `'create-form'` → {@link DemoCreateFormComponent} (simulated form, no real API).
 * - `'profile'` → {@link DemoProfileComponent} (read-only profile card).
 *
 * **Title behaviour** — `resolvedTitle` returns `config.title` when present,
 * otherwise falls back to {@link defaultTitleForView} (e.g. `"Demo – Tabla"`).
 * An `effect()` watches `resolvedTitle` and auto-dispatches `mfe:update-header`
 * whenever the title changes (including when the view switches via `data`).
 *
 * **Shell events** — Dispatches `mfe:module-ready` and `mfe:update-header` on
 * init. Listens for `shell:module-state`, `shell:visibility-changed`, and
 * `shell:theme-changed`. The instance-scoped listeners are filtered by both
 * `instanceId` and `moduleType`; theme is global. Every incoming/outgoing event
 * is recorded in the instance-owned `DemoEventLog`.
 *
 * **Action bar** — Renders the full action button set via `DemoDispatcher`,
 * which records each outgoing `mfe:*` event in the event log.
 *
 * **Create-form handlers** — `onCreateFormPrimary` dispatches a success
 * notification + header status update; `onCreateFormSecondary` dispatches
 * an info notification. Both are wired to `DemoCreateFormComponent` outputs.
 *
 * Owns only the body area — module chrome (header, drag handle, collapse,
 * fullscreen, remove) belongs to the Shell / `@cobranza-apps/ui`.
 *
 * Selector: `cba-demo`
 */
export class DemoComponent implements OnInit, OnDestroy {
  readonly moduleType = input.required<string>();
  readonly instanceId = input.required<string>();
  readonly size = input.required<ModuleSize>();
  readonly isCollapsed = input.required<boolean>();
  readonly isFullscreen = input.required<boolean>();
  readonly data = input<Record<string, unknown> | undefined>(undefined);

  readonly config = computed(() => coerceDemoConfig(this.data()));
  readonly view = computed(() => this.config().view ?? 'table');
  readonly viewLabel = computed(() => viewModeToSpanishLabel(this.view()));
  readonly resolvedTitle = computed(() =>
    this.config().title ?? defaultTitleForView(this.view()),
  );

  readonly shortInstanceId = computed(() => truncateInstanceId(this.instanceId()));
  readonly instanceHue = computed(() => hashString(this.instanceId()) % 360);
  readonly instanceColorStyle = computed(() => ({
    '--demo-instance-marker': `hsl(${this.instanceHue()}, 65%, 45%)`,
  }));

  readonly dataJson = computed(() => JSON.stringify(this.data() ?? null, null, 2));

  readonly headerEventName = MFE_EVENTS.UPDATE_HEADER;
  readonly maxLogEntries = MAX_LOG_ENTRIES;

  readonly eventLog = new DemoEventLog();
  readonly shellState = new DemoShellState({
    inputSize: this.size,
    inputIsCollapsed: this.isCollapsed,
    inputIsFullscreen: this.isFullscreen,
  });
  readonly dispatcher = new DemoDispatcher({
    moduleType: this.moduleType,
    instanceId: this.instanceId,
    eventLog: this.eventLog,
  });

  readonly actionButtons: readonly ActionButtonConfig[] = [
    { label: 'Actualizar título', variant: 'primary', action: () => this.dispatcher.cycleHeaderDemo() },
    { label: 'Notificación éxito', variant: 'success', action: () => this.dispatcher.showNotification('success', 'Notificación de éxito') },
    { label: 'Notificación advertencia', variant: 'secondary', action: () => this.dispatcher.showNotification('warning', 'Notificación de advertencia') },
    { label: 'Notificación error', variant: 'danger', action: () => this.dispatcher.showNotification('error', 'Notificación de error') },
    { label: 'Pantalla completa', variant: 'secondary', action: () => this.dispatcher.requestFullscreen() },
    { label: 'Quitar módulo', variant: 'danger', action: () => this.dispatcher.requestRemove() },
    { label: 'Agregar instancia', variant: 'secondary', action: () => this.dispatcher.requestAddModule() },
    { label: 'Simular error', variant: 'danger', action: () => this.dispatcher.moduleError() },
  ];

  constructor() {
    let previousTitle = '';
    effect(() => {
      const title = this.resolvedTitle();
      if (title !== previousTitle) {
        this.dispatcher.updateHeader(title, 'loaded');
        previousTitle = title;
      }
    });
  }

  readonly onCreateFormPrimary = (): void => {
    this.dispatcher.showNotification('success', 'Formulario de prueba enviado (sin API real)');
    this.dispatcher.updateHeader(this.resolvedTitle(), 'success');
  };

  readonly onCreateFormSecondary = (): void => {
    this.dispatcher.showNotification('info', 'Formulario reiniciado');
  };

  private readonly matchesThisInstance = (detail: { instanceId: string; moduleType: string }): boolean =>
    detail.instanceId === this.instanceId() && detail.moduleType === this.moduleType();

  private readonly onModuleState = (event: Event): void => {
    if (!isShellEvent(event, SHELL_EVENTS.MODULE_STATE)) return;
    if (!this.matchesThisInstance(event.detail)) return;
    this.eventLog.add({ direction: 'in', eventType: SHELL_EVENTS.MODULE_STATE, payload: event.detail });
    this.shellState.applyModuleState(event.detail);
  };

  private readonly onVisibilityChanged = (event: Event): void => {
    if (!isShellEvent(event, SHELL_EVENTS.VISIBILITY_CHANGED)) return;
    if (!this.matchesThisInstance(event.detail)) return;
    this.eventLog.add({ direction: 'in', eventType: SHELL_EVENTS.VISIBILITY_CHANGED, payload: event.detail });
    this.shellState.applyVisibility(event.detail);
  };

  private readonly onThemeChanged = (event: Event): void => {
    if (!isShellEvent(event, SHELL_EVENTS.THEME_CHANGED)) return;
    this.eventLog.add({ direction: 'in', eventType: SHELL_EVENTS.THEME_CHANGED, payload: event.detail });
  };

  ngOnInit(): void {
    this.dispatcher.ready();
    this.attachShellListeners();
  }

  ngOnDestroy(): void {
    window.removeEventListener(SHELL_EVENTS.MODULE_STATE, this.onModuleState);
    window.removeEventListener(SHELL_EVENTS.VISIBILITY_CHANGED, this.onVisibilityChanged);
    window.removeEventListener(SHELL_EVENTS.THEME_CHANGED, this.onThemeChanged);
  }

  private attachShellListeners(): void {
    window.addEventListener(SHELL_EVENTS.MODULE_STATE, this.onModuleState);
    window.addEventListener(SHELL_EVENTS.VISIBILITY_CHANGED, this.onVisibilityChanged);
    window.addEventListener(SHELL_EVENTS.THEME_CHANGED, this.onThemeChanged);
  }
}
