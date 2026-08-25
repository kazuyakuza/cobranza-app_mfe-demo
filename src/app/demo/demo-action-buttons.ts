import { DemoDispatcher } from './demo-dispatcher';

/**
 * Describes a single action-bar button rendered by `DemoComponent`.
 *
 * The template iterates this array and binds `action` to the button's
 * `(click)` handler. Labels are Spanish per project convention.
 *
 * `variant` maps to `CbaButtonComponent` visual variants.
 */
export interface ActionButtonConfig {
  readonly label: string;
  readonly variant: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  readonly action: () => void;
}

/**
 * Builds the fixed set of action buttons shown in the demo action bar.
 *
 * Each button delegates to a method on {@link DemoDispatcher}, which in turn
 * dispatches the corresponding `mfe:*` event. The list is intentionally
 * static — the demo does not support dynamic button injection.
 *
 * @param dispatcher - Instance-owned dispatcher; closures capture it so
 *   each button fires events with the correct `instanceId`.
 * @returns A readonly array consumed by the component template.
 */
export function createDemoActionButtons(dispatcher: DemoDispatcher): readonly ActionButtonConfig[] {
  return [
    { label: 'Actualizar título', variant: 'primary', action: () => dispatcher.cycleHeaderDemo() },
    { label: 'Notificación éxito', variant: 'success', action: () => dispatcher.showNotification('success', 'Notificación de éxito') },
    { label: 'Notificación advertencia', variant: 'secondary', action: () => dispatcher.showNotification('warning', 'Notificación de advertencia') },
    { label: 'Notificación error', variant: 'danger', action: () => dispatcher.showNotification('error', 'Notificación de error') },
    { label: 'Pantalla completa', variant: 'secondary', action: () => dispatcher.requestFullscreen() },
    { label: 'Quitar módulo', variant: 'danger', action: () => dispatcher.requestRemove() },
    { label: 'Agregar instancia', variant: 'secondary', action: () => dispatcher.requestAddModule() },
    { label: 'Simular error', variant: 'danger', action: () => dispatcher.moduleError() },
  ];
}
