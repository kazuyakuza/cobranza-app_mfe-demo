import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CbaBadgeComponent } from '@cobranza-apps/ui';
import {
  dispatchMfeEvent,
  isShellEvent,
  MFE_EVENTS,
  SCHEMA_VERSION,
  SHELL_EVENTS,
  type MfeEventMap,
  type ModuleSize,
  type ModuleStatus,
  type ShellEventMap,
} from '@cobranza-apps/mfe-events';

import { coerceDemoConfig, defaultTitleForView, viewModeToSpanishLabel } from './demo-config';
import { hashString, truncateInstanceId } from './demo-utils';
import { DemoCreateFormComponent } from './views/demo-create-form/demo-create-form.component';
import { DemoProfileComponent } from './views/demo-profile/demo-profile.component';
import { DemoTableComponent } from './views/demo-table/demo-table.component';

@Component({
  selector: 'cba-demo',
  standalone: true,
  imports: [CbaBadgeComponent, DemoTableComponent, DemoCreateFormComponent, DemoProfileComponent],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Main exposed component of `mfe-demo`.
 *
 * The Shell hosts this component via Native Federation and injects the
 * standard MFE inputs (see `brief.md §3.2`). The component:
 * - Renders one of three internal views (`table` | `create-form` | `profile`)
 *   driven by the opaque `data` input (coerced into `DemoConfig`).
 * - Owns only the body area — module chrome (header, drag handle, collapse,
 *   fullscreen, remove) belongs to the Shell / `@cobranza-apps/ui`.
 * - Dispatches `mfe:module-ready` and `mfe:update-header` on init.
 * - Listens for `shell:module-state`, `shell:visibility-changed`, and
 *   `shell:theme-changed`, filtering by `instanceId` (except theme, which is
 *   global).
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

  readonly shortInstanceId = computed(() => truncateInstanceId(this.instanceId()));

  readonly instanceHue = computed(() => hashString(this.instanceId()) % 360);

  readonly instanceColorStyle = computed(() => ({
    '--demo-instance-marker': `hsl(${this.instanceHue()}, 65%, 45%)`,
  }));

  readonly sizeLabelText = computed(() =>
    this.size() === '100%' ? 'Ancho completo (100 %)' : 'Mitad de ancho (50 %)',
  );

  readonly viewLabel = computed(() => viewModeToSpanishLabel(this.view()));

  readonly resolvedTitle = computed(() =>
    this.config().title ?? defaultTitleForView(this.view()),
  );

  readonly headerEventName = MFE_EVENTS.UPDATE_HEADER;

  constructor() {
    let previousTitle = '';
    effect(() => {
      const title = this.resolvedTitle();
      if (title !== previousTitle) {
        this.dispatchUpdateHeader(title, 'loaded');
        previousTitle = title;
      }
    });
  }

  private readonly createShellHandler = <K extends keyof ShellEventMap>(
    eventName: K,
    filterByInstance = true,
  ) => (event: Event): void => {
    if (!isShellEvent(event, eventName)) return;
    const detail = event.detail;
    if (filterByInstance) {
      if (!('instanceId' in detail)) return;
      if (detail.instanceId !== this.instanceId()) return;
    }
    console.log('[mfe-demo] received', eventName, detail);
  };

  private readonly onModuleState = this.createShellHandler(SHELL_EVENTS.MODULE_STATE);
  private readonly onVisibilityChanged = this.createShellHandler(SHELL_EVENTS.VISIBILITY_CHANGED);
  private readonly onThemeChanged = this.createShellHandler(SHELL_EVENTS.THEME_CHANGED, false);

  ngOnInit(): void {
    this.dispatchReadyEvent();
    this.attachShellListeners();
  }

  ngOnDestroy(): void {
    window.removeEventListener(SHELL_EVENTS.MODULE_STATE, this.onModuleState);
    window.removeEventListener(SHELL_EVENTS.VISIBILITY_CHANGED, this.onVisibilityChanged);
    window.removeEventListener(SHELL_EVENTS.THEME_CHANGED, this.onThemeChanged);
  }

  /** Dispatches `mfe:module-ready` with schema version, module type, and instance ID. */
  private dispatchReadyEvent(): void {
    this.dispatch(MFE_EVENTS.MODULE_READY, {
      schemaVersion: SCHEMA_VERSION,
      moduleType: this.moduleType(),
      instanceId: this.instanceId(),
    });
  }

  /** Dispatches `mfe:update-header` with the resolved title and a status. */
  private dispatchUpdateHeader(title: string, status: ModuleStatus): void {
    this.dispatch(MFE_EVENTS.UPDATE_HEADER, {
      schemaVersion: SCHEMA_VERSION,
      moduleType: this.moduleType(),
      instanceId: this.instanceId(),
      title,
      status,
    });
  }

  /** Dispatches a global `mfe:show-notification` toast. */
  private dispatchShowNotification(
    type: 'success' | 'warning' | 'error' | 'info',
    message: string,
  ): void {
    this.dispatch(MFE_EVENTS.SHOW_NOTIFICATION, {
      schemaVersion: SCHEMA_VERSION,
      type,
      message,
    });
  }

  private dispatch<K extends keyof MfeEventMap>(name: K, payload: MfeEventMap[K]): void {
    console.log('[mfe-demo] dispatch', name, payload);
    dispatchMfeEvent(name, payload);
  }

  readonly onCreateFormPrimary = (): void => {
    this.dispatchShowNotification('success', 'Formulario de prueba enviado (sin API real)');
    this.dispatchUpdateHeader(this.resolvedTitle(), 'success');
  };

  readonly onCreateFormSecondary = (): void => {
    this.dispatchShowNotification('info', 'Formulario reiniciado');
  };

  /** Registers `window` listeners for the three shell events; cleaned up in `ngOnDestroy`. */
  private attachShellListeners(): void {
    window.addEventListener(SHELL_EVENTS.MODULE_STATE, this.onModuleState);
    window.addEventListener(SHELL_EVENTS.VISIBILITY_CHANGED, this.onVisibilityChanged);
    window.addEventListener(SHELL_EVENTS.THEME_CHANGED, this.onThemeChanged);
  }
}
