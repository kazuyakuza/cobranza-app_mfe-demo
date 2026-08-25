import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CbaButtonComponent, CbaInputComponent } from '@cobranza-apps/ui';

/** Field model for the simulated create form. Spanish-labelled test fields. */
interface DemoCreateFormModel {
  readonly nombre: string;
  readonly documento: string;
  readonly email: string;
  readonly telefono: string;
  readonly observaciones: string;
}

const EMPTY_FORM: DemoCreateFormModel = {
  nombre: '',
  documento: '',
  email: '',
  telefono: '',
  observaciones: '',
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
 * Renders five Spanish-labelled test fields (nombre, documento, email,
 * teléfono, observaciones) plus a primary "Guardar (simulado)" and a
 * secondary "Reiniciar" button. No real submit, no API, no validation.
 *
 * Field names mirror `@cobranza-apps/entities` `Client` (fullName, taxId,
 * email, phone, notes) but are kept as local Spanish strings for clarity.
 *
 * Emits `primaryAction` / `secondaryAction` outputs; the parent
 * `DemoComponent` dispatches the corresponding `mfe:*` events.
 */
export class DemoCreateFormComponent {
  readonly size = input<'50%' | '100%'>('100%');
  readonly primaryAction = output<void>();
  readonly secondaryAction = output<void>();

  readonly nombre = signal(EMPTY_FORM.nombre);
  readonly documento = signal(EMPTY_FORM.documento);
  readonly email = signal(EMPTY_FORM.email);
  readonly telefono = signal(EMPTY_FORM.telefono);
  readonly observaciones = signal(EMPTY_FORM.observaciones);

  readonly onPrimary = (): void => {
    this.primaryAction.emit();
  };

  readonly onSecondary = (): void => {
    this.resetForm();
    this.secondaryAction.emit();
  };

  private resetForm(): void {
    this.nombre.set(EMPTY_FORM.nombre);
    this.documento.set(EMPTY_FORM.documento);
    this.email.set(EMPTY_FORM.email);
    this.telefono.set(EMPTY_FORM.telefono);
    this.observaciones.set(EMPTY_FORM.observaciones);
  }
}
