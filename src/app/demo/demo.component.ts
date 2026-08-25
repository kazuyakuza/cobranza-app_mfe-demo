import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import {
  CbaAccordionComponent, CbaBadgeComponent, CbaButtonComponent, CbaCardComponent,
} from '@cobranza-apps/ui';
import {
  MFE_EVENTS,
  type ModuleSize,
} from '@cobranza-apps/mfe-events';

import { ActionButtonConfig, createDemoActionButtons } from './demo-action-buttons';
import {
  coerceDemoConfig,
  defaultTitleForView,
  type DemoViewMode,
  viewModeToSpanishLabel,
} from './demo-config';
import { DemoDispatcher } from './demo-dispatcher';
import { DemoEventLog, MAX_LOG_ENTRIES } from './demo-event-log';
import { computeMinHeightPx, type DemoMinHeightReason } from './demo-min-height';
import { DemoShellListeners } from './demo-shell-listeners';
import { DemoShellState } from './demo-shell-state';
import { hashString, truncateInstanceId } from './demo-utils';
import { DemoCreateFormComponent } from './views/demo-create-form/demo-create-form.component';
import { DemoProfileComponent } from './views/demo-profile/demo-profile.component';
import { DemoTableComponent } from './views/demo-table/demo-table.component';

/**
 * Main exposed component of `mfe-demo`.
 *
 * The Shell hosts this component via Native Federation and injects the
 * standard MFE inputs. It renders one of three internal views driven by
 * `config.view`, dispatches MFE events, listens for Shell events filtered by
 * `instanceId` and `moduleType`, and exposes an action bar, event log, and
 * data payload viewer.
 *
 * Lifecycle:
 * - `ngOnInit` — dispatches `mfe:module-ready`, attaches Shell listeners,
 *   and declares the initial min-height (`reason: 'init'`).
 * - `ngOnDestroy` — detaches Shell listeners.
 *
 * Reactive effects (constructor):
 * - Title changes → `mfe:update-header`.
 * - View changes → `mfe:update-min-height` (`reason: 'view-change'`).
 * - Table row-count changes → `mfe:update-min-height` (`reason: 'content-change'`).
 *
 * Selector: `cba-demo`
 *
 * @see DemoDispatcher — outgoing `mfe:*` events.
 * @see DemoShellListeners — incoming `shell:*` events.
 * @see DemoShellState — display computeds for the identity panel.
 */
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
export class DemoComponent implements OnInit, OnDestroy {
  /** Federation `moduleType` — always `'demo'` for this MFE. */
  readonly moduleType = input.required<string>();
  /** Unique instance identifier assigned by the Shell Footer. */
  readonly instanceId = input.required<string>();
  /** Current container width mode (`'50%'` = short, `'100%'` = long). */
  readonly size = input.required<ModuleSize>();
  /** Whether the Shell has collapsed this module. */
  readonly isCollapsed = input.required<boolean>();
  /** Whether the Shell has expanded this module to fullscreen. */
  readonly isFullscreen = input.required<boolean>();
  /** Opaque config from the Shell Footer — coerced into {@link DemoConfig}. */
  readonly data = input<Record<string, unknown> | undefined>(undefined);

  /** Last `minHeightPx` declared via `mfe:update-min-height`; shown in the identity panel. */
  readonly lastDeclaredMinHeightPx = signal<number | undefined>(undefined);

  /** Parsed, validated config derived from the opaque Shell `data` input. */
  readonly config = computed(() => coerceDemoConfig(this.data()));
  /** Active view mode — drives which child component is rendered. */
  readonly view = computed(() => this.config().view ?? 'table');
  /** Spanish display label for the active view (identity panel badge). */
  readonly viewLabel = computed(() => viewModeToSpanishLabel(this.view()));
  /** Effective header title — explicit `config.title` or auto-generated from view. */
  readonly resolvedTitle = computed(() =>
    this.config().title ?? defaultTitleForView(this.view()),
  );

  /** Truncated `instanceId` for compact display (e.g. `"demo-prev…0001"`). */
  readonly shortInstanceId = computed(() => truncateInstanceId(this.instanceId()));
  /** HSL hue derived from `instanceId` hash — stable colour per instance. */
  readonly instanceHue = computed(() => hashString(this.instanceId()) % 360);
  /** CSS custom-property map for the instance-colour marker stripe. */
  readonly instanceColorStyle = computed(() => ({
    '--demo-instance-marker': `hsl(${this.instanceHue()}, 65%, 45%)`,
  }));

  /** Pretty-printed JSON of the raw `data` input — shown in the data viewer accordion. */
  readonly dataJson = computed(() => JSON.stringify(this.data() ?? null, null, 2));

  /** Event name constant for `mfe:update-header` — exposed for the template. */
  readonly headerEventName = MFE_EVENTS.UPDATE_HEADER;
  /** Max entries kept in the event log — exposed for the template. */
  readonly maxLogEntries = MAX_LOG_ENTRIES;

  /** Instance-owned event log — records both inbound and outbound events. */
  readonly eventLog = new DemoEventLog();
  /** Holds latest Shell-pushed state; exposes display computeds for the identity panel. */
  readonly shellState = new DemoShellState({
    inputSize: this.size,
    inputIsCollapsed: this.isCollapsed,
    inputIsFullscreen: this.isFullscreen,
  });
  /** Centralised dispatcher for every outgoing `mfe:*` event. */
  readonly dispatcher = new DemoDispatcher({
    moduleType: this.moduleType,
    instanceId: this.instanceId,
    eventLog: this.eventLog,
  });

  /** Fixed action-bar buttons — each delegates to a `DemoDispatcher` method. */
  readonly actionButtons: readonly ActionButtonConfig[] = createDemoActionButtons(this.dispatcher);

  /** Manages `shell:*` window listeners; attached on init, detached on destroy. */
  readonly shellListeners = new DemoShellListeners({
    eventLog: this.eventLog,
    shellState: this.shellState,
    moduleType: this.moduleType,
    instanceId: this.instanceId,
  });

  constructor() {
    // Push `mfe:update-header` whenever the resolved title changes.
    let previousTitle = '';
    effect(() => {
      const title = this.resolvedTitle();
      if (title !== previousTitle) {
        this.dispatcher.updateHeader(title, 'loaded');
        previousTitle = title;
      }
    });

    // Re-declare min-height when the active view changes (skip the first fire).
    let previousView: DemoViewMode | undefined;
    effect(() => {
      const view = this.view();
      if (previousView !== undefined && view !== previousView) {
        this.declareMinHeight('view-change');
      }
      previousView = view;
    });

    // Re-declare min-height when the table row count changes (skip the first fire).
    let previousRowCount: number | undefined;
    effect(() => {
      if (this.view() !== 'table') {
        return;
      }
      const rowCount = this.config().tableRows ?? 0;
      if (previousRowCount !== undefined && rowCount !== previousRowCount) {
        this.declareMinHeight('content-change');
      }
      previousRowCount = rowCount;
    });
  }

  /** Create-form "Enviar" handler — dispatches success notification + header status. */
  readonly onCreateFormPrimary = (): void => {
    this.dispatcher.showNotification('success', 'Formulario de prueba enviado (sin API real)');
    this.dispatcher.updateHeader(this.resolvedTitle(), 'success');
  };

  /** Create-form "Reiniciar" handler — dispatches info notification. */
  readonly onCreateFormSecondary = (): void => {
    this.dispatcher.showNotification('info', 'Formulario reiniciado');
  };

  /**
   * Computes and dispatches the preferred min-height for the current view.
   * Called internally on init / view change / content change. Private to
   * keep the public Shell-contract surface minimal.
   */
  private declareMinHeight(reason: DemoMinHeightReason, overridePx?: number): void {
    const view = this.view();
    const minHeightPx = overridePx !== undefined ? overridePx : computeMinHeightPx(view);
    this.lastDeclaredMinHeightPx.set(minHeightPx);
    this.dispatcher.updateMinHeight(minHeightPx, reason);
  }

  /** Exposed only for the standalone preview host; not part of the public Shell contract. */
  declareMinHeightForPreview(reason: DemoMinHeightReason, overridePx?: number): void {
    this.declareMinHeight(reason, overridePx);
  }

  ngOnInit(): void {
    this.dispatcher.ready();
    this.shellListeners.attach();
    this.declareMinHeight('init');
  }

  ngOnDestroy(): void {
    this.shellListeners.detach();
  }
}
