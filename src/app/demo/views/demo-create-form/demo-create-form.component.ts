import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CbaButtonComponent, CbaInputComponent } from '@cobranza-apps/ui';

/**
 * Field model for the simulated create form.
 *
 * Entity-aligned form model mirroring `@cobranza-apps/entities` `Client`
 * field names (`fullName`, `taxId`, `email`, `phone`, `notes`). UI labels
 * stay Spanish (Nombre, Documento / DNI, Email, Teléfono, Observaciones);
 * values are plain `string`. No real validation or API submission occurs.
 */
interface DemoCreateFormModel {
  readonly fullName: string;
  readonly taxId: string;
  readonly email: string;
  readonly phone: string;
  readonly notes: string;
}

/** Initial empty state for all form fields — used on init and on "Reiniciar". */
const EMPTY_FORM: DemoCreateFormModel = {
  fullName: '',
  taxId: '',
  email: '',
  phone: '',
  notes: '',
};

@Component({
  selector: 'app-demo-create-form',
  standalone: true,
  imports: [CbaButtonComponent, CbaInputComponent, FormsModule],
  templateUrl: './demo-create-form.component.html',
  styleUrl: './demo-create-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Simulated create-form view for `mfe-demo` (view === 'create-form').
 *
 * Renders five Spanish-labelled test fields (Nombre, Documento / DNI, Email,
 * Teléfono, Observaciones) backed by entity-aligned internal model fields
 * (`fullName`, `taxId`, `email`, `phone`, `notes`) that mirror
 * `@cobranza-apps/entities` `Client`. UI labels remain Spanish; internal
 * values are plain `string`. No real submit, no API, no validation.
 *
 * Emits `primaryAction` / `secondaryAction` outputs; the parent
 * `DemoComponent` dispatches the corresponding `mfe:*` events.
 */
export class DemoCreateFormComponent {
  readonly size = input<'50%' | '100%'>('100%');
  readonly primaryAction = output<void>();
  readonly secondaryAction = output<void>();

  readonly fullName = signal(EMPTY_FORM.fullName);
  readonly taxId = signal(EMPTY_FORM.taxId);
  readonly email = signal(EMPTY_FORM.email);
  readonly phone = signal(EMPTY_FORM.phone);
  readonly notes = signal(EMPTY_FORM.notes);

  /** "Enviar" button handler — emits `primaryAction` for the parent to dispatch. */
  readonly onPrimary = (): void => {
    this.primaryAction.emit();
  };

  /** "Reiniciar" button handler — resets all fields then emits `secondaryAction`. */
  readonly onSecondary = (): void => {
    this.resetForm();
    this.secondaryAction.emit();
  };

  /** Resets every signal back to its initial empty-string value. */
  private resetForm(): void {
    this.fullName.set(EMPTY_FORM.fullName);
    this.taxId.set(EMPTY_FORM.taxId);
    this.email.set(EMPTY_FORM.email);
    this.phone.set(EMPTY_FORM.phone);
    this.notes.set(EMPTY_FORM.notes);
  }
}
