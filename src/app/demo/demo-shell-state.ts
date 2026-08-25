import { computed, type Signal, signal } from '@angular/core';
import { type ModuleSize } from '@cobranza-apps/mfe-events';

/**
 * Constructor options for {@link DemoShellState}.
 *
 * The three `input*` signals are the raw Angular Inputs injected by the
 * Shell. They serve as fallback values when no `shell:module-state` event
 * has arrived yet.
 */
export interface DemoShellStateOptions {
  readonly inputSize: Signal<ModuleSize>;
  readonly inputIsCollapsed: Signal<boolean>;
  readonly inputIsFullscreen: Signal<boolean>;
}

/**
 * Drag-and-drop lifecycle states pushed by the Shell via `shell:module-state`.
 *
 * - `'drag-start'` — the user started dragging this module.
 * - `'drag-end'`   — the drag ended (may or may not have been dropped).
 * - `'dropped'`    — the module was dropped into a new position.
 *
 * Optional field — `undefined` when the Shell does not support drag-and-drop.
 */
type DragState = 'drag-start' | 'drag-end' | 'dropped';

/**
 * Preview modes pushed by the Shell via `shell:module-state`.
 *
 * - `'collapsed'` — the Shell is showing a preview thumbnail rather than the
 *   full module body.
 *
 * Optional field — `undefined` when the Shell does not support preview mode.
 */
type PreviewMode = 'collapsed';

interface ShellStateSnapshot {
  size?: ModuleSize;
  isCollapsed?: boolean;
  isFullscreen?: boolean;
  widthPx?: number;
  heightPx?: number;
  visibilityVisible?: boolean;
  visibilityReason?: string;
  dragState?: DragState;
  previewMode?: PreviewMode;
}

/**
 * Holds the latest state pushed by the Shell via `shell:module-state` and
 * `shell:visibility-changed`, and exposes **display computeds** that the
 * identity panel and layout bind to.
 *
 * Resolution order for each display computed (`displaySize`,
 * `displayIsCollapsed`, `displayIsFullscreen`):
 * 1. The value from the latest `shell:module-state` event (stored in the
 *    internal `state` signal), when present.
 * 2. Otherwise, the raw Angular Input (`size` / `isCollapsed` / `isFullscreen`)
 *    injected by the Shell.
 *
 * This means the identity panel always reflects the most specific information
 * available: explicit Shell events override the static Inputs, and the Inputs
 * act as a sensible fallback on init.
 *
 * Also exposes `dimensionsText` (e.g. `"1200 × 400 px"`) and visibility
 * computeds for the identity panel badges. Owned by `DemoComponent`, one
 * instance per MFE instance.
 */
export class DemoShellState {
  private readonly state = signal<ShellStateSnapshot>({});

  constructor(private readonly options: DemoShellStateOptions) {}

  readonly displaySize = computed(() => this.state().size ?? this.options.inputSize());
  readonly displayIsCollapsed = computed(
    () => this.state().isCollapsed ?? this.options.inputIsCollapsed(),
  );
  readonly displayIsFullscreen = computed(
    () => this.state().isFullscreen ?? this.options.inputIsFullscreen(),
  );

  readonly sizeLabelText = computed(() =>
    this.displaySize() === '100%' ? 'Ancho completo (100 %)' : 'Mitad de ancho (50 %)',
  );

  readonly dimensionsText = computed(() => {
    const { widthPx, heightPx } = this.state();
    return widthPx !== undefined && heightPx !== undefined ? `${widthPx} × ${heightPx} px` : undefined;
  });

  readonly visibilityVisible = computed(() => this.state().visibilityVisible);
  readonly visibilityReason = computed(() => this.state().visibilityReason);
  readonly displayDragState = computed(() => this.state().dragState);
  readonly displayPreviewMode = computed(() => this.state().previewMode);

  /**
   * Merges a `shell:module-state` payload into the internal state signal.
   *
   * Called by {@link DemoShellListeners.onModuleState} after instance filtering.
   * The `dragState` and `previewMode` fields are optional — they remain
   * `undefined` when the Shell does not provide them.
   */
  applyModuleState(state: {
    size: ModuleSize;
    width: number;
    height: number;
    isCollapsed: boolean;
    isFullscreen: boolean;
    dragState?: DragState;
    previewMode?: PreviewMode;
  }): void {
    this.state.update((current) => ({
      ...current,
      size: state.size,
      widthPx: state.width,
      heightPx: state.height,
      isCollapsed: state.isCollapsed,
      isFullscreen: state.isFullscreen,
      dragState: state.dragState,
      previewMode: state.previewMode,
    }));
  }

  /**
   * Merges a `shell:visibility-changed` payload into the internal state signal.
   *
   * Called by {@link DemoShellListeners.onVisibilityChanged} after instance filtering.
   */
  applyVisibility(payload: { visible: boolean; reason?: string }): void {
    this.state.update((current) => ({
      ...current,
      visibilityVisible: payload.visible,
      visibilityReason: payload.reason ?? 'unknown',
    }));
  }
}
