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
 * standard MFE inputs. It renders one of three internal views driven by
 * `config.view`, dispatches MFE events, listens for Shell events filtered by
 * `instanceId` and `moduleType`, and exposes an action bar, event log, and
 * data payload viewer.
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

  readonly lastDeclaredMinHeightPx = signal<number | undefined>(undefined);

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

  readonly actionButtons: readonly ActionButtonConfig[] = createDemoActionButtons(this.dispatcher);

  readonly shellListeners = new DemoShellListeners({
    eventLog: this.eventLog,
    shellState: this.shellState,
    moduleType: this.moduleType,
    instanceId: this.instanceId,
  });

  constructor() {
    let previousTitle = '';
    effect(() => {
      const title = this.resolvedTitle();
      if (title !== previousTitle) {
        this.dispatcher.updateHeader(title, 'loaded');
        previousTitle = title;
      }
    });

    let previousView: DemoViewMode | undefined;
    effect(() => {
      const view = this.view();
      if (previousView !== undefined && view !== previousView) {
        this.declareMinHeight('view-change');
      }
      previousView = view;
    });

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

  readonly onCreateFormPrimary = (): void => {
    this.dispatcher.showNotification('success', 'Formulario de prueba enviado (sin API real)');
    this.dispatcher.updateHeader(this.resolvedTitle(), 'success');
  };

  readonly onCreateFormSecondary = (): void => {
    this.dispatcher.showNotification('info', 'Formulario reiniciado');
  };

  /**
   * Computes and dispatches the preferred min-height for the current view.
   * Called internally on init / view change / content change, and exposed
   * for the standalone preview host via `declareMinHeight`.
   */
  declareMinHeight(reason: DemoMinHeightReason, overridePx?: number): void {
    const view = this.view();
    const minHeightPx = overridePx !== undefined ? overridePx : computeMinHeightPx(view);
    this.lastDeclaredMinHeightPx.set(minHeightPx);
    this.dispatcher.updateMinHeight(minHeightPx, reason);
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
