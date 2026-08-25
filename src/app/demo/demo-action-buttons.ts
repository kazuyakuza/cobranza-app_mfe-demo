import { DemoDispatcher } from './demo-dispatcher';

export interface ActionButtonConfig {
  readonly label: string;
  readonly variant: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  readonly action: () => void;
}

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
