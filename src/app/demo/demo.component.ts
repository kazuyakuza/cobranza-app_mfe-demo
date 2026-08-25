import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
  type ModuleReadyPayload,
  type ModuleSize,
  type ModuleStatePayload,
  type ThemeChangedPayload,
  type UpdateHeaderPayload,
  type VisibilityChangedPayload,
} from '@cobranza-apps/mfe-events';

import { coerceDemoConfig } from './demo-config';
import { DemoTableComponent } from './views/demo-table/demo-table.component';

const DEFAULT_HEADER_TITLE = 'Demo';

@Component({
  selector: 'cba-demo',
  standalone: true,
  imports: [CbaBadgeComponent, DemoTableComponent],
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

  readonly instanceHue = computed(() => this.hashString(this.instanceId()) % 360);

  readonly instanceColorStyle = computed(() => ({
    '--demo-instance-marker': `hsl(${this.instanceHue()}, 65%, 45%)`,
  }));

  readonly sizeLabelText = computed(() =>
    this.size() === '100%' ? 'Ancho completo (100 %)' : 'Mitad de ancho (50 %)',
  );

  readonly viewLabel = computed(() => viewModeToSpanishLabel(this.view()));

  readonly schemaVersion = SCHEMA_VERSION;
  readonly readyEventName = MFE_EVENTS.MODULE_READY;
  readonly headerEventName = MFE_EVENTS.UPDATE_HEADER;

  private readonly onModuleState = (event: Event): void => {
    if (!isShellEvent(event, SHELL_EVENTS.MODULE_STATE)) return;
    if (event.detail.instanceId !== this.instanceId()) return;
    console.log('[mfe-demo] received', SHELL_EVENTS.MODULE_STATE, event.detail);
  };

  private readonly onVisibilityChanged = (event: Event): void => {
    if (!isShellEvent(event, SHELL_EVENTS.VISIBILITY_CHANGED)) return;
    if (event.detail.instanceId !== this.instanceId()) return;
    console.log('[mfe-demo] received', SHELL_EVENTS.VISIBILITY_CHANGED, event.detail);
  };

  private readonly onThemeChanged = (event: Event): void => {
    if (!isShellEvent(event, SHELL_EVENTS.THEME_CHANGED)) return;
    console.log('[mfe-demo] received', SHELL_EVENTS.THEME_CHANGED, event.detail);
  };

  ngOnInit(): void {
    this.dispatchReadyEvent();
    this.dispatchUpdateHeaderEvent();
    this.attachShellListeners();
  }

  ngOnDestroy(): void {
    window.removeEventListener(SHELL_EVENTS.MODULE_STATE, this.onModuleState);
    window.removeEventListener(SHELL_EVENTS.VISIBILITY_CHANGED, this.onVisibilityChanged);
    window.removeEventListener(SHELL_EVENTS.THEME_CHANGED, this.onThemeChanged);
  }

  private dispatchReadyEvent(): void {
    const payload: ModuleReadyPayload = {
      schemaVersion: SCHEMA_VERSION,
      moduleType: this.moduleType(),
      instanceId: this.instanceId(),
    };
    console.log('[mfe-demo] dispatch', MFE_EVENTS.MODULE_READY, payload);
    dispatchMfeEvent(MFE_EVENTS.MODULE_READY, payload);
  }

  private dispatchUpdateHeaderEvent(): void {
    const payload: UpdateHeaderPayload = {
      schemaVersion: SCHEMA_VERSION,
      moduleType: this.moduleType(),
      instanceId: this.instanceId(),
      title: this.config().title ?? DEFAULT_HEADER_TITLE,
      status: 'loaded',
    };
    console.log('[mfe-demo] dispatch', MFE_EVENTS.UPDATE_HEADER, payload);
    dispatchMfeEvent(MFE_EVENTS.UPDATE_HEADER, payload);
  }

  private attachShellListeners(): void {
    window.addEventListener(SHELL_EVENTS.MODULE_STATE, this.onModuleState);
    window.addEventListener(SHELL_EVENTS.VISIBILITY_CHANGED, this.onVisibilityChanged);
    window.addEventListener(SHELL_EVENTS.THEME_CHANGED, this.onThemeChanged);
  }

  private hashString(value: string): number {
    let hash = 0;
    for (let index = 0; index < value.length; index += 1) {
      const char = value.charCodeAt(index);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return Math.abs(hash);
  }
}

const SHORT_ID_PREFIX_LENGTH = 8;

function truncateInstanceId(value: string): string {
  return value.length > SHORT_ID_PREFIX_LENGTH
    ? `${value.slice(0, SHORT_ID_PREFIX_LENGTH)}…`
    : value;
}

const VIEW_LABELS: Readonly<Record<string, string>> = {
  table: 'Tabla',
  'create-form': 'Alta',
  profile: 'Perfil',
};

function viewModeToSpanishLabel(view: string): string {
  return VIEW_LABELS[view] ?? 'Desconocida';
}