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
export class DemoPreviewComponent {
  readonly instanceId = signal(MOCK_INSTANCE_ID);
  readonly data = signal<Record<string, unknown>>(MOCK_DATA);
}