/** Stable prefix length used when truncating long instance IDs for display. */
export const SHORT_ID_PREFIX_LENGTH = 8;

/** Simple string hash used to generate a deterministic hue per instance. */
export function hashString(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    const char = value.charCodeAt(index);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

/** Truncates a long instance ID to a readable prefix followed by an ellipsis. */
export function truncateInstanceId(value: string): string {
  return value.length > SHORT_ID_PREFIX_LENGTH
    ? `${value.slice(0, SHORT_ID_PREFIX_LENGTH)}…`
    : value;
}
