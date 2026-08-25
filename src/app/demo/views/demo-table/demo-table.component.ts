import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CbaBadgeComponent, CbaEmptyStateComponent } from '@cobranza-apps/ui';

/** Single mock row rendered in the demo 'table' view. */
interface DemoTableRow {
  readonly id: number;
  readonly concepto: string;
  readonly monto: string;
  readonly fecha: string;
  readonly estado: 'Pagado' | 'Pendiente' | 'Vencido';
}

const CONCEPTOS: readonly string[] = [
  'Cuota mensual',
  'Pago parcial',
  'Recargo por mora',
  'Servicio de gestión',
  'Reembolso ajustado',
  'Cargo administrativo',
];

const ESTADOS: readonly DemoTableRow['estado'][] = ['Pagado', 'Pendiente', 'Vencido'];
const FIXED_FECHA = '24/08/2026';
const SIZE_LABEL_LONG = 'Ancho completo (100 %)';
const SIZE_LABEL_SHORT = 'Mitad de ancho (50 %)';

@Component({
  selector: 'app-demo-table',
  standalone: true,
  imports: [CbaBadgeComponent, CbaEmptyStateComponent],
  templateUrl: './demo-table.component.html',
  styleUrl: './demo-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Mock table sub-component rendered by `DemoComponent` when `view === 'table'`.
 *
 * Phase 0 placeholder — displays deterministic Spanish-locale mock rows
 * (concepto / monto / fecha / estado) so the table layout can be verified
 * at both 50 % and 100 % module widths without a real backend.
 *
 * Key decisions for future agents:
 * - Rows are derived from `rowCount` via `computed()`, not stored as state.
 * - Uses `CbaBadgeComponent` for estado pills and `CbaEmptyStateComponent`
 *   when `rowCount === 0`.
 * - `badgeVariantFor` maps Spanish estado strings to CbaBadge variants;
 *   extend here if new estados are added.
 * - All strings are Spanish-only per project constraints.
 */
export class DemoTableComponent {
  /** Number of mock rows to render. Coerced to a non-negative finite number upstream. */
  readonly rowCount = input.required<number>();
  /** Current module width fraction — drives the `data-size` reflow hook and size caption. */
  readonly size = input.required<'50%' | '100%'>();

  /** Mock rows derived from `rowCount`. Empty when `rowCount === 0`. */
  readonly rows = computed<DemoTableRow[]>(() => this.buildMockRows(this.rowCount()));

  /** Spanish human-readable size mode shown above the table. */
  readonly sizeLabelText = computed(() =>
    this.size() === '100%' ? SIZE_LABEL_LONG : SIZE_LABEL_SHORT,
  );

  /** Maps a Spanish estado string to a `CbaBadge` variant. */
  badgeVariantFor(estado: DemoTableRow['estado']): 'success' | 'warning' | 'danger' {
    if (estado === 'Pagado') {
      return 'success';
    }
    if (estado === 'Pendiente') {
      return 'warning';
    }
    return 'danger';
  }

  private buildMockRows(count: number): DemoTableRow[] {
    const safeCount = Math.max(0, Math.floor(count));
    return Array.from({ length: safeCount }, (_, index) => buildRow(index));
  }
}

function buildRow(index: number): DemoTableRow {
  return {
    id: index + 1,
    concepto: CONCEPTOS[index % CONCEPTOS.length],
    monto: `$ ${(index + 1) * 1250}`,
    fecha: FIXED_FECHA,
    estado: ESTADOS[index % ESTADOS.length],
  };
}
