import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MFE_EVENTS, SCHEMA_VERSION, type ModuleSize } from '@cobranza-apps/mfe-events';

import { coerceDemoConfig, type DemoViewMode } from './demo-config';

@Component({
  selector: 'cba-demo',
  standalone: true,
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoComponent {
  readonly moduleType = input.required<string>();
  readonly instanceId = input.required<string>();
  readonly size = input.required<ModuleSize>();
  readonly isCollapsed = input.required<boolean>();
  readonly isFullscreen = input.required<boolean>();
  readonly data = input<Record<string, unknown> | undefined>(undefined);

  readonly config = computed(() => coerceDemoConfig(this.data()));
  readonly view = computed<DemoViewMode>(() => this.config().view ?? 'table');
  readonly sizeLabel = computed(() => (this.size() === '100%' ? 'long' : 'short'));

  readonly schemaVersion = SCHEMA_VERSION;
  readonly readyEventName = MFE_EVENTS.MODULE_READY;
}