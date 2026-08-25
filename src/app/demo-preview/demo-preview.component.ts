import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { DemoComponent } from '../demo/demo.component';

const MOCK_INSTANCE_ID = 'demo-preview-0001';
const MOCK_DATA: Record<string, unknown> = { view: 'table', tableRows: 5 };

@Component({
  selector: 'app-demo-preview',
  standalone: true,
  imports: [DemoComponent],
  templateUrl: './demo-preview.component.html',
  styleUrl: './demo-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Standalone preview host for `DemoComponent`.
 *
 * Used only by the local dev mode (`ng serve`) to simulate the Shell without
 * requiring Native Federation. Renders `<cba-demo>` with mock inputs so
 * UI work and view-mode switching can be tested in isolation.
 *
 * NOT loaded by the Shell in production — the Shell hosts `DemoComponent`
 * directly via federation.
 */
export class DemoPreviewComponent {
  readonly instanceId = signal(MOCK_INSTANCE_ID);
  readonly data = signal<Record<string, unknown>>(MOCK_DATA);
}