/**
 * Pure utility functions for the `mfe-demo` component tree.
 *
 * These helpers have no Angular or Shell dependencies — they operate only on
 * plain strings and numbers. They are extracted here so that both
 * `DemoComponent` and the standalone preview host can share them without
 * circular imports.
 *
 * Functions:
 * - {@link hashString} — deterministic numeric hash (used for per-instance hue).
 * - {@link truncateInstanceId} — shortens long UUIDs for the identity panel.
 *
 * Related: `src/app/demo/demo-config.ts` (config coercion), `src/app/demo/demo.component.ts`.
 */

/** Stable prefix length used when truncating long instance IDs for display. */
export const SHORT_ID_PREFIX_LENGTH = 8;

/**
 * Simple string hash used to generate a deterministic hue per instance.
 *
 * Uses the djb2-style `hash * 33 + char` algorithm. The result is always
 * non-negative (via `Math.abs`) so it can be used directly as a hue degree
 * (0–359) for the per-instance colour marker in the identity panel.
 *
 * @param value - Arbitrary string (typically an `instanceId` UUID).
 * @returns A non-negative integer hash.
 */
export function hashString(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    const char = value.charCodeAt(index);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Truncates a long instance ID to a readable prefix followed by an ellipsis.
 *
 * Used in the identity panel to keep the UI compact when the Shell passes
 * full UUIDs. If `value` is already short (≤ {@link SHORT_ID_PREFIX_LENGTH}),
 * it is returned unchanged.
 *
 * @param value - Full instance ID (typically a UUID from the Shell).
 * @returns The first {@link SHORT_ID_PREFIX_LENGTH} characters + `…`, or the original string.
 */
export function truncateInstanceId(value: string): string {
  return value.length > SHORT_ID_PREFIX_LENGTH
    ? `${value.slice(0, SHORT_ID_PREFIX_LENGTH)}…`
    : value;
}
