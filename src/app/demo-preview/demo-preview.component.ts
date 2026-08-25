import {
  ChangeDetectionStrategy,
  Component,
  computed,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  isMfeEvent,
  MFE_EVENTS,
  type ModuleSize,
} from '@cobranza-apps/mfe-events';

import { DemoComponent } from '../demo/demo.component';
import { type DemoViewMode } from '../demo/demo-config';

const MOCK_INSTANCE_ID = 'demo-preview-0001';
const MOCK_TABLE_ROWS = 5;

@Component({
  selector: 'app-demo-preview',
  standalone: true,
  imports: [DemoComponent, FormsModule],
  templateUrl: './demo-preview.component.html',
  styleUrl: './demo-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Standalone preview host for `DemoComponent`.
 *
 * Simulates the Shell when running `ng serve` alone: injects mock inputs,
 * exposes controls for `size`, `view`, and `title`, and logs the outgoing
 * `mfe:module-ready` / `mfe:update-header` events to the console so dispatch
 * can be verified without the real Shell.
 *
 * NOT loaded by the Shell in production — the Shell hosts `DemoComponent`
 * directly via federation.
 */
export class DemoPreviewComponent implements OnInit, OnDestroy {
  readonly instanceId = signal(MOCK_INSTANCE_ID);
  readonly size = signal<ModuleSize>('100%');
  readonly view = signal<DemoViewMode>('table');
  readonly title = signal<string>('');

  readonly data = computed<Record<string, unknown>>(() => ({
    view: this.view(),
    title: this.title() || undefined,
    tableRows: MOCK_TABLE_ROWS,
  }));

  /** Captures `mfe:module-ready` events emitted by the embedded `DemoComponent`. */
  private readonly onModuleReady = (event: Event): void => {
    if (!isMfeEvent(event, MFE_EVENTS.MODULE_READY)) return;
    console.log('[demo-preview] captured', MFE_EVENTS.MODULE_READY, event.detail);
  };

  /** Captures `mfe:update-header` events emitted by the embedded `DemoComponent`. */
  private readonly onUpdateHeader = (event: Event): void => {
    if (!isMfeEvent(event, MFE_EVENTS.UPDATE_HEADER)) return;
    console.log('[demo-preview] captured', MFE_EVENTS.UPDATE_HEADER, event.detail);
  };

  ngOnInit(): void {
    window.addEventListener(MFE_EVENTS.MODULE_READY, this.onModuleReady);
    window.addEventListener(MFE_EVENTS.UPDATE_HEADER, this.onUpdateHeader);
  }

  ngOnDestroy(): void {
    window.removeEventListener(MFE_EVENTS.MODULE_READY, this.onModuleReady);
    window.removeEventListener(MFE_EVENTS.UPDATE_HEADER, this.onUpdateHeader);
  }
}