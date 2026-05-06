/**
 * Truncates `text` to `maxLength` characters, appending a Unicode ellipsis (U+2026).
 * Uses the single `…` character rather than three ASCII dots so the truncated string
 * is always `maxLength + 1` characters, not `maxLength + 3`.
 * @param text - The string to truncate.
 * @param maxLength - Maximum number of characters before truncation is applied.
 * @returns The original string if within limit; otherwise `text.slice(0, maxLength) + '…'`.
 * @example
 * truncate('Hello World', 5) // → 'Hello…'
 * truncate('Hi', 5)          // → 'Hi'
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}…`;
}
