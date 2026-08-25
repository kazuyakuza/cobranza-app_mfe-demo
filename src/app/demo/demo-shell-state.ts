import { computed, type Signal, signal, type WritableSignal } from '@angular/core';
import { type ModuleSize } from '@cobranza-apps/mfe-events';

export class DemoShellState {
  readonly size: WritableSignal<ModuleSize | undefined> = signal(undefined);
  readonly isCollapsed: WritableSignal<boolean | undefined> = signal(undefined);
  readonly isFullscreen: WritableSignal<boolean | undefined> = signal(undefined);
  readonly widthPx: WritableSignal<number | undefined> = signal(undefined);
  readonly heightPx: WritableSignal<number | undefined> = signal(undefined);
  readonly visibilityVisible: WritableSignal<boolean | undefined> = signal(undefined);
  readonly visibilityReason: WritableSignal<string | undefined> = signal(undefined);

  constructor(
    private readonly inputSize: Signal<ModuleSize>,
    private readonly inputIsCollapsed: Signal<boolean>,
    private readonly inputIsFullscreen: Signal<boolean>,
  ) {}

  readonly displaySize = computed(() => this.size() ?? this.inputSize());
  readonly displayIsCollapsed = computed(() => this.isCollapsed() ?? this.inputIsCollapsed());
  readonly displayIsFullscreen = computed(() => this.isFullscreen() ?? this.inputIsFullscreen());

  readonly sizeLabelText = computed(() =>
    this.displaySize() === '100%' ? 'Ancho completo (100 %)' : 'Mitad de ancho (50 %)',
  );

  readonly dimensionsText = computed(() => {
    const width = this.widthPx();
    const height = this.heightPx();
    return width !== undefined && height !== undefined ? `${width} × ${height} px` : undefined;
  });

  applyModuleState(state: {
    size: ModuleSize;
    width: number;
    height: number;
    isCollapsed: boolean;
    isFullscreen: boolean;
  }): void {
    this.size.set(state.size);
    this.widthPx.set(state.width);
    this.heightPx.set(state.height);
    this.isCollapsed.set(state.isCollapsed);
    this.isFullscreen.set(state.isFullscreen);
  }

  applyVisibility(payload: { visible: boolean; reason?: string }): void {
    this.visibilityVisible.set(payload.visible);
    this.visibilityReason.set(payload.reason ?? 'unknown');
  }
}
