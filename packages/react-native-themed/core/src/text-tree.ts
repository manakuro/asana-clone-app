import type { TextToken, TextTokenTree } from './types';

/** The fields a `semanticTokens.text` preset (leaf) may have. */
export const TEXT_TOKEN_FIELDS = [
  'fontSize',
  'lineHeight',
  'letterSpacing',
  'fontWeight',
] as const;

const isPrimitive = (value: unknown) =>
  typeof value === 'string' || typeof value === 'number';

/**
 * A node of `semanticTokens.text` is a **preset** (leaf) when every value is
 * a primitive (`{ fontSize: 'lg', lineHeight: 'short' }`), and a **group**
 * otherwise (`{ md: {...}, sm: {...} }`). No marker key is needed because
 * preset fields are always primitives and group children always objects.
 * Mixed nodes are rejected by `@react-native-themed/cli codegen`.
 */
export function isTextPreset(
  node: TextToken | TextTokenTree,
): node is TextToken {
  return Object.values(node).every(isPrimitive);
}

/**
 * Visits every preset in a text tree, depth-first in definition order,
 * with its path (`['heading', 'display', 'lg']`).
 */
export function walkTextPresets(
  tree: TextTokenTree | undefined,
  visit: (path: string[], preset: TextToken) => void,
  path: string[] = [],
): void {
  for (const [key, node] of Object.entries(tree ?? {})) {
    if (typeof node !== 'object' || node === null) continue;
    if (isTextPreset(node)) {
      visit([...path, key], node);
    } else {
      walkTextPresets(node as TextTokenTree, visit, [...path, key]);
    }
  }
}
