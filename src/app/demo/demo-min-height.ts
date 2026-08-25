import { type DemoViewMode } from './demo-config';

export type DemoMinHeightReason = 'init' | 'view-change' | 'content-change';

const MIN_HEIGHT_TABLE_PX = 320;
const MIN_HEIGHT_CREATE_FORM_PX = 400;
const MIN_HEIGHT_PROFILE_PX = 280;
const MIN_HEIGHT_DEFAULT_PX = 320;

/**
 * Sensible default min-height preference per view, in CSS pixels.
 *
 * Pure function: no side effects, no DOM reads, no signals. Used by
 * `DemoComponent.declareMinHeight` to pick the value sent via
 * `mfe:update-min-height` (`MFE_EVENTS.UPDATE_MIN_HEIGHT`).
 */
export function computeMinHeightPx(view: DemoViewMode): number {
  switch (view) {
    case 'table':       return MIN_HEIGHT_TABLE_PX;
    case 'create-form': return MIN_HEIGHT_CREATE_FORM_PX;
    case 'profile':     return MIN_HEIGHT_PROFILE_PX;
    default:            return MIN_HEIGHT_DEFAULT_PX;
  }
}