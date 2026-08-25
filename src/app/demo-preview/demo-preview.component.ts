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
  /** Mock `instanceId` — identifies this preview instance in Shell events. */
  readonly instanceId = signal(MOCK_INSTANCE_ID);
  /** Simulated container width mode. */
  readonly size = signal<ModuleSize>('100%');
  /** Active view mode forwarded to `DemoComponent` via `data`. */
  readonly view = signal<DemoViewMode>('table');
  /** Optional title override — empty string means "use default". */
  readonly title = signal<string>('');
  /** Simulated collapse state. */
  readonly isCollapsed = signal(false);
  /** Simulated fullscreen state. */
  readonly isFullscreen = signal(false);
  /** Mock row count for the table view. */
  readonly tableRows = signal(MOCK_TABLE_ROWS);
  /** Free-form JSON for the profile view — parsed into `data.profile`. */
  readonly profileJson = signal('{}');

  /** Reference to the child `DemoComponent` — used to call `declareMinHeight` directly. */
  @ViewChild(DemoComponent) private demoComponent?: DemoComponent;

  /** Last `minHeightPx` captured from `mfe:update-min-height` events. */
  readonly previewDeclaredMinHeightPx = signal<number | undefined>(undefined);
  /** Debug override — when set, "Reenviar min-height" uses this value instead of the computed one. */
  readonly debugMinHeightOverride = signal<number | undefined>(undefined);

  /** Simulated `dragState` included in the synthetic `shell:module-state` payload. */
  readonly simulatedDragState = signal<'drag-start' | 'drag-end' | 'dropped' | undefined>(undefined);
  /** Simulated `previewMode` included in the synthetic `shell:module-state` payload. */
  readonly simulatedPreviewMode = signal<'collapsed' | undefined>(undefined);

  /** Assembled `data` object forwarded to `DemoComponent` as its opaque config input. */
  readonly data = computed<Record<string, unknown>>(() => ({
    view: this.view(),
    title: this.title() || undefined,
    tableRows: this.tableRows(),
    profile: this.safeParseProfile(this.profileJson()),
  }));

  /** Full `shell:module-state` payload ready to dispatch via {@link emitModuleState}. */
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

  /** All `mfe:*` event names — used to subscribe/unsubscribe on the `window`. */
  private readonly mfeEventNames = Object.values(MFE_EVENTS);

  /**
   * Captures every outgoing `mfe:*` event for console inspection.
   *
   * Also extracts `minHeightPx` from `mfe:update-min-height` so the preview
   * panel can display the last declared value.
   */
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

  /** Forces `DemoComponent` to re-dispatch `mfe:update-min-height`, optionally with a debug override value. */
  readonly redeclareMinHeight = (): void => {
    this.demoComponent?.declareMinHeight('content-change', this.debugMinHeightOverride());
  };

  /** Dispatches a synthetic `shell:module-state` event scoped to the mock `instanceId`. */
  readonly emitModuleState = (): void => {
    dispatchShellEvent(SHELL_EVENTS.MODULE_STATE, this.moduleStatePayload());
  };

  /** Dispatches a synthetic `shell:visibility-changed` event scoped to the mock `instanceId`. */
  readonly emitVisibilityChanged = (visible: boolean): void => {
    dispatchShellEvent(SHELL_EVENTS.VISIBILITY_CHANGED, {
      schemaVersion: SCHEMA_VERSION,
      moduleType: 'demo',
      instanceId: this.instanceId(),
      visible,
      reason: visible ? 'workbench' : 'collapse',
    });
  };

  /** Subscribes to every `mfe:*` event name on `window` for console logging. */
  ngOnInit(): void {
    this.mfeEventNames.forEach((name) => window.addEventListener(name, this.onMfeEvent));
  }

  /** Unsubscribes from all `mfe:*` listeners. */
  ngOnDestroy(): void {
    this.mfeEventNames.forEach((name) => window.removeEventListener(name, this.onMfeEvent));
  }

  /** Parses the profile JSON textarea; returns `undefined` on invalid input instead of throwing. */
  private safeParseProfile(value: string): Record<string, unknown> | undefined {
    try {
      const parsed = JSON.parse(value);
      return this.isPlainObject(parsed) ? parsed : undefined;
    } catch {
      return undefined;
    }
  }

  /** Type guard: `true` when `value` is a non-null, non-array plain object. */
  private isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }

  /**
   * Converts a template input value to `number | undefined`.
   *
   * Called from the template in `(ngModelChange)`; Angular template type-checking
   * requires public access. Returns `undefined` for empty strings and non-finite values.
   */
  numberOrNull(value: string | null): number | undefined {
    if (value === null || value === '') return undefined;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  /** Narrows a raw `<select>` value to a valid `DragState` or `undefined`. */
  readonly dragStateFromEvent = (value: string): 'drag-start' | 'drag-end' | 'dropped' | undefined =>
    value === 'drag-start' || value === 'drag-end' || value === 'dropped' ? value : undefined;

  /** Narrows a raw `<select>` value to a valid `PreviewMode` or `undefined`. */
  readonly previewModeFromEvent = (value: string): 'collapsed' | undefined =>
    value === 'collapsed' ? value : undefined;
}
