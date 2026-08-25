import { type DemoViewMode } from './demo-config';

/**
 * Reason the MFE is (re)declaring its min-height preference.
 *
 * Maps to the `reason` field of `UpdateMinHeightPayload` in
 * `@cobranza-apps/mfe-events@^0.6.0`. The Shell may use this for logging
 * or analytics but the layout behaviour is identical for all reasons.
 *
 * - `'init'`          — first declaration after component mount.
 * - `'view-change'`   — `config.view` changed (e.g. table → create-form).
 * - `'content-change'` — material content shift (e.g. table row count changed).
 */
export type DemoMinHeightReason = 'init' | 'view-change' | 'content-change';

/** Min-height for the mock data-table view (`view === 'table'`). */
const MIN_HEIGHT_TABLE_PX = 320;

/** Min-height for the create-form view (`view === 'create-form'`). */
const MIN_HEIGHT_CREATE_FORM_PX = 400;

/** Min-height for the read-only profile card (`view === 'profile'`). */
const MIN_HEIGHT_PROFILE_PX = 280;

/** Fallback for unknown / future view modes. */
const MIN_HEIGHT_DEFAULT_PX = 320;

/**
 * Sensible default min-height preference per view, in CSS pixels.
 *
 * Pure function: no side effects, no DOM reads, no signals. Used by
 * `DemoComponent` to pick the value sent via
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
