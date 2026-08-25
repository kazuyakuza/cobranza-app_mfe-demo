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
export class DemoComponent {
  readonly moduleType = input.required<string>();
  readonly instanceId = input.required<string>();
  readonly size = input.required<ModuleSize>();
  readonly isCollapsed = input.required<boolean>();
  readonly isFullscreen = input.required<boolean>();
  readonly data = input<Record<string, unknown> | undefined>(undefined);

  readonly config = computed(() => coerceDemoConfig(this.data()));
  readonly view = computed(() => this.config().view ?? 'table');
}