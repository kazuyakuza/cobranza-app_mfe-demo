import {
  ChangeDetectionStrategy,
  Component,
  computed,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CbaButtonComponent } from '@cobranza-apps/ui';
import {
  dispatchShellEvent,
  MFE_EVENTS,
  SCHEMA_VERSION,
  SHELL_EVENTS,
  type ModuleSize,
} from '@cobranza-apps/mfe-events';

import { DemoComponent } from '../demo/demo.component';
import { type DemoViewMode } from '../demo/demo-config';

const MOCK_INSTANCE_ID = 'demo-preview-0001';
const MOCK_TABLE_ROWS = 5;

@Component({
  selector: 'app-demo-preview',
  standalone: true,
  imports: [CbaButtonComponent, DemoComponent, FormsModule],
  templateUrl: './demo-preview.component.html',
  styleUrl: './demo-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Standalone preview host for `DemoComponent`.
 *
 * Simulates the Shell when running `ng serve` alone: injects mock Inputs,
 * exposes controls for `size`, `view`, `title`, `tableRows`, `profile` JSON,
 * and size/collapse/fullscreen toggles.
 *
 * **Shell event simulation** — exposes two buttons that dispatch synthetic
 * `shell:module-state` ({@link emitModuleState}) and `shell:visibility-changed`
 * ({@link emitVisibilityChanged}) events scoped to the mock `instanceId`.
 * These exercise the listener path inside `DemoComponent` (and its
 * `DemoShellState`) without a real Shell, so developers can verify that the
 * identity panel, layout, and event log react correctly.
 *
 * **Outgoing event capture** — on init, subscribes to every `mfe:*` event
 * name exposed by `@cobranza-apps/mfe-events` and logs the payload to the
 * browser console, so the developer can inspect every dispatch triggered by
 * the action buttons, the view switcher, or the create-form handlers.
 *
 * NOT loaded by the Shell in production — the Shell hosts `DemoComponent`
 * directly via federation.
 */
export class DemoPreviewComponent implements OnInit, OnDestroy {
  readonly instanceId = signal(MOCK_INSTANCE_ID);
  readonly size = signal<ModuleSize>('100%');
  readonly view = signal<DemoViewMode>('table');
  readonly title = signal<string>('');
  readonly isCollapsed = signal(false);
  readonly isFullscreen = signal(false);
  readonly tableRows = signal(MOCK_TABLE_ROWS);
  readonly profileJson = signal('{}');

  @ViewChild(DemoComponent) private demoComponent?: DemoComponent;

  readonly previewDeclaredMinHeightPx = signal<number | undefined>(undefined);
  readonly debugMinHeightOverride = signal<number | undefined>(undefined);

  readonly simulatedDragState = signal<'drag-start' | 'drag-end' | 'dropped' | undefined>(undefined);
  readonly simulatedPreviewMode = signal<'collapsed' | undefined>(undefined);

  readonly data = computed<Record<string, unknown>>(() => ({
    view: this.view(),
    title: this.title() || undefined,
    tableRows: this.tableRows(),
    profile: this.safeParseProfile(this.profileJson()),
  }));

  readonly moduleStatePayload = computed(() => ({
    schemaVersion: SCHEMA_VERSION,
    moduleType: 'demo',
    instanceId: this.instanceId(),
    size: this.size(),
    width: this.size() === '100%' ? 1200 : 600,
    height: 400,
    isCollapsed: this.isCollapsed(),
    isFullscreen: this.isFullscreen(),
    dragState: this.simulatedDragState(),
    previewMode: this.simulatedPreviewMode(),
  }));

  private readonly mfeEventNames = Object.values(MFE_EVENTS);

  private readonly onMfeEvent = (event: Event): void => {
    if (!(event instanceof CustomEvent)) return;
    if (event.type === MFE_EVENTS.UPDATE_MIN_HEIGHT) {
      const payload = event.detail as { minHeightPx?: number };
      if (typeof payload?.minHeightPx === 'number') {
        this.previewDeclaredMinHeightPx.set(payload.minHeightPx);
      }
    }
    console.log('[demo-preview] captured', event.type, event.detail);
  };

  readonly redeclareMinHeight = (): void => {
    this.demoComponent?.declareMinHeight('content-change', this.debugMinHeightOverride());
  };

  readonly emitModuleState = (): void => {
    dispatchShellEvent(SHELL_EVENTS.MODULE_STATE, this.moduleStatePayload());
  };

  readonly emitVisibilityChanged = (visible: boolean): void => {
    dispatchShellEvent(SHELL_EVENTS.VISIBILITY_CHANGED, {
      schemaVersion: SCHEMA_VERSION,
      moduleType: 'demo',
      instanceId: this.instanceId(),
      visible,
      reason: visible ? 'workbench' : 'collapse',
    });
  };

  ngOnInit(): void {
    this.mfeEventNames.forEach((name) => window.addEventListener(name, this.onMfeEvent));
  }

  ngOnDestroy(): void {
    this.mfeEventNames.forEach((name) => window.removeEventListener(name, this.onMfeEvent));
  }

  private safeParseProfile(value: string): Record<string, unknown> | undefined {
    try {
      const parsed = JSON.parse(value);
      return this.isPlainObject(parsed) ? parsed : undefined;
    } catch {
      return undefined;
    }
  }

  private isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }

  /** Called from the template in `(ngModelChange)`; Angular template type-checking requires public access. */
  numberOrNull(value: string | null): number | undefined {
    if (value === null || value === '') return undefined;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  readonly dragStateFromEvent = (value: string): 'drag-start' | 'drag-end' | 'dropped' | undefined =>
    value === 'drag-start' || value === 'drag-end' || value === 'dropped' ? value : undefined;

  readonly previewModeFromEvent = (value: string): 'collapsed' | undefined =>
    value === 'collapsed' ? value : undefined;
}
