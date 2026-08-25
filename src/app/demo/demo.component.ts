import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { type ModuleSize } from '@cobranza-apps/mfe-events';

import { coerceDemoConfig } from './demo-config';

@Component({
  selector: 'cba-demo',
  standalone: true,
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
 * - Must remain multi-instance safe: every piece of state is derived from
 *   inputs, no shared singletons.
 *
 * Selector: `cba-demo`
 */
export class DemoComponent {
  /** Always `'demo'` for this remote (set by the Shell). */
  readonly moduleType = input.required<string>();
  /** Unique per-workspace-instance UUID assigned by the Shell. */
  readonly instanceId = input.required<string>();
  /** Current width fraction — `'50%'` (short) or `'100%'` (long). */
  readonly size = input.required<ModuleSize>();
  /** Whether the module card is collapsed. */
  readonly isCollapsed = input.required<boolean>();
  /** Whether the module card is in fullscreen mode. */
  readonly isFullscreen = input.required<boolean>();
  /**
   * Opaque config payload from the Shell (footer definition, persisted
   * workspace state, or `initialData` from `mfe:request-add-module`).
   * Coerced into `DemoConfig` via `coerceDemoConfig`.
   */
  readonly data = input<Record<string, unknown> | undefined>(undefined);

  /** Validated, default-filled config derived from the raw `data` input. */
  readonly config = computed(() => coerceDemoConfig(this.data()));
  /** Active view mode — shorthand for `config().view`. */
  readonly view = computed(() => this.config().view ?? 'table');
}