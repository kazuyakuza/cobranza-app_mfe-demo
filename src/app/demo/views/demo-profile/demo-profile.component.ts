import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { CbaBadgeComponent, CbaCardComponent } from '@cobranza-apps/ui';

import { isPlainObject } from '../../demo-config';

/** Single label/value pair rendered in the read-only profile `<dl>` list. */
interface DemoProfileField {
  readonly label: string;
  readonly value: string;
}

/**
 * Estado values that render with a red/danger badge variant.
 * All other known values map to `'success'` (Activo), `'warning'` (Pendiente),
 * or `'neutral'` (unknown). See {@link DemoProfileComponent.resolveEstadoVariant}.
 */
const DANGER_ESTADOS: Readonly<Set<string>> = new Set(['Vencido', 'Inactivo']);

/**
 * Fallback profile data used when `config.profile` is absent or not a plain
 * object. Provides sensible Spanish mock defaults so the profile view always
 * renders meaningful content in the standalone preview and demo scenarios.
 */
const DEFAULT_PROFILE: Record<string, unknown> = {
  nombre: 'Juan Pérez',
  dni: '30.111.222',
  email: 'juan.perez@example.com',
  saldo: '$ 15.000,00',
  estado: 'Activo',
};

/**
 * Maps profile data keys to Spanish display labels.
 *
 * Supports two naming conventions:
 * - Spanish brief-example keys: `nombre`, `dni`, `email`, `telefono`, `saldo`, `estado`.
 * - Entity-like keys from `@cobranza-apps/entities` `Client`: `fullName`, `taxId`,
 *   `phone`, `active`, `notes`.
 *
 * Unknown keys fall back to capitalized key name via `capitalize()`.
 */
const PROFILE_LABELS: Readonly<Record<string, string>> = {
  nombre: 'Nombre',
  dni: 'DNI',
  email: 'Email',
  telefono: 'Teléfono',
  saldo: 'Saldo',
  estado: 'Estado',
  fullName: 'Nombre',
  taxId: 'DNI',
  phone: 'Teléfono',
  active: 'Estado',
  notes: 'Observaciones',
};

@Component({
  selector: 'app-demo-profile',
  standalone: true,
  imports: [CbaBadgeComponent, CbaCardComponent],
  templateUrl: './demo-profile.component.html',
  styleUrl: './demo-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Read-only profile / detail view for `mfe-demo` (view === 'profile').
 *
 * Renders a `cba-card` with a `<dl>` key-value list built from
 * `config.profile`. Falls back to `DEFAULT_PROFILE` (Spanish mock) when
 * `profile` is absent or not a plain object.
 *
 * Key mappings support both Spanish brief-example keys (`nombre`, `dni`,
 * `email`, `telefono`, `saldo`, `estado`) and entity-like keys from
 * `@cobranza-apps/entities` `Client` (`fullName`, `taxId`, `phone`,
 * `active`, `notes`). Unknown keys are labelled with their capitalized key.
 */
export class DemoProfileComponent {
  readonly profile = input<Record<string, unknown> | undefined>(undefined);
  readonly size = input<'50%' | '100%'>('100%');

  readonly fields = computed<DemoProfileField[]>(() =>
    this.buildFields(this.profile()),
  );

  readonly estadoField = computed(() =>
    this.fields().find((field) => field.label === 'Estado'),
  );

  readonly estadoBadgeVariant = computed<'success' | 'warning' | 'danger' | 'neutral'>(() =>
    this.resolveEstadoVariant(this.estadoField()?.value ?? ''),
  );

  readonly estadoValue = computed(() => this.estadoField()?.value ?? '—');

  private buildFields(profile: Record<string, unknown> | undefined): DemoProfileField[] {
    const source = isPlainObject(profile) ? profile : DEFAULT_PROFILE;
    return Object.entries(source).map(([key, value]) => ({
      label: PROFILE_LABELS[key] ?? capitalize(key),
      value: String(value ?? ''),
    }));
  }

  private resolveEstadoVariant(estado: string): 'success' | 'warning' | 'danger' | 'neutral' {
    if (estado === 'Activo') return 'success';
    if (estado === 'Pendiente') return 'warning';
    if (DANGER_ESTADOS.has(estado)) return 'danger';
    return 'neutral';
  }
}

function capitalize(value: string): string {
  if (value.length === 0) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}
