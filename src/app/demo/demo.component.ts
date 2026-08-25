import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CbaBadgeComponent } from '@cobranza-apps/ui';
import { MFE_EVENTS, SCHEMA_VERSION, type ModuleSize } from '@cobranza-apps/mfe-events';

import { coerceDemoConfig } from './demo-config';
import { DemoTableComponent } from './views/demo-table/demo-table.component';

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
 * - Must remain multi-instance safe: every piece of state is derived from
 *   inputs, no shared singletons.
 *
 * Identity panel:
 *   Displays moduleType, short instanceId (full on hover), current size,
 *   collapse/fullscreen flags, and active view label — all in Spanish.
 *
 * Visual instance marker:
 *   A coloured left border (CSS custom property `--demo-instance-marker`)
 *   derived from a stable hash of `instanceId`, so multiple co-located
 *   instances are visually distinct at a glance.
 *
 * Selector: `cba-demo`
 */
export class DemoComponent {
  readonly moduleType = input.required<string>();
  readonly instanceId = input.required<string>();
  readonly size = input.required<ModuleSize>();
  readonly isCollapsed = input.required<boolean>();
  readonly isFullscreen = input.required<boolean>();
  readonly data = input<Record<string, unknown> | undefined>(undefined);

  readonly config = computed(() => coerceDemoConfig(this.data()));
  readonly view = computed(() => this.config().view ?? 'table');

  /** Short form of `instanceId` shown in the identity panel (first 8 chars + ellipsis). */
  readonly shortInstanceId = computed(() => truncateInstanceId(this.instanceId()));

  /** Stable 0–359 hue derived from `instanceId` for the visual instance marker. */
  readonly instanceHue = computed(() => this.hashString(this.instanceId()) % 360);

  /** Inline style object applied to the root `.cba-demo` element to colour the left border. */
  readonly instanceColorStyle = computed(() => ({
    '--demo-instance-marker': `hsl(${this.instanceHue()}, 65%, 45%)`,
  }));

  /** Spanish human-readable size mode shown in the identity panel. */
  readonly sizeLabelText = computed(() =>
    this.size() === '100%' ? 'Ancho completo (100 %)' : 'Mitad de ancho (50 %)',
  );

  /** Spanish label for the active view shown in the identity panel. */
  readonly viewLabel = computed(() => viewModeToSpanishLabel(this.view()));

  readonly schemaVersion = SCHEMA_VERSION;
  readonly readyEventName = MFE_EVENTS.MODULE_READY;

  /** Stable 32-bit integer hash of an arbitrary string (used for the instance marker hue). */
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
