import { computed, type Signal, signal } from '@angular/core';
import { type ModuleSize } from '@cobranza-apps/mfe-events';

export interface DemoShellStateOptions {
  readonly inputSize: Signal<ModuleSize>;
  readonly inputIsCollapsed: Signal<boolean>;
  readonly inputIsFullscreen: Signal<boolean>;
}

interface ShellStateSnapshot {
  size?: ModuleSize;
  isCollapsed?: boolean;
  isFullscreen?: boolean;
  widthPx?: number;
  heightPx?: number;
  visibilityVisible?: boolean;
  visibilityReason?: string;
}

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

  applyModuleState(state: {
    size: ModuleSize;
    width: number;
    height: number;
    isCollapsed: boolean;
    isFullscreen: boolean;
  }): void {
    this.state.update((current) => ({
      ...current,
      size: state.size,
      widthPx: state.width,
      heightPx: state.height,
      isCollapsed: state.isCollapsed,
      isFullscreen: state.isFullscreen,
    }));
  }

  applyVisibility(payload: { visible: boolean; reason?: string }): void {
    this.state.update((current) => ({
      ...current,
      visibilityVisible: payload.visible,
      visibilityReason: payload.reason ?? 'unknown',
    }));
  }
}
