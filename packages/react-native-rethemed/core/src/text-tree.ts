import type { ColorScheme } from './resolvers/color-resolver';
import type { TextColor, TextToken, TextTokenTree } from './types';

/** The fields a `semanticTokens.text` preset (leaf) may have. */
export const TEXT_TOKEN_FIELDS = [
  'fontSize',
  'lineHeight',
  'letterSpacing',
  'fontWeight',
  'color',
] as const;

const isPrimitive = (value: unknown) =>
  typeof value === 'string' || typeof value === 'number';

const isPresetField = (key: string) =>
  (TEXT_TOKEN_FIELDS as readonly string[]).includes(key);

/**
 * A node of `semanticTokens.text` is a **preset** (leaf) when it has any
 * preset field (`fontSize`, …, `color`) or when every value is a primitive,
 * and a **group** otherwise (`{ md: {...}, sm: {...} }`). The field check
 * matters because `color` may itself be an object (`{ light, dark }`), so
 * "all primitives" alone can't tell a preset from a group; preset field
 * names are therefore reserved and can't name a group or preset. Mixed
 * nodes are rejected by `@react-native-rethemed/cli codegen`.
 */
export function isTextPreset(
  node: TextToken | TextTokenTree,
): node is TextToken {
  const keys = Object.keys(node);
  return keys.some(isPresetField) || Object.values(node).every(isPrimitive);
}

/**
 * A preset `color` for one scheme: a string applies to both, an object picks
 * `light` / `dark`, and a missing scheme yields `undefined` (no color).
 */
export function resolveTextColor(
  color: TextColor | undefined,
  scheme: ColorScheme,
): string | undefined {
  return typeof color === 'object' && color !== null ? color[scheme] : color;
}

/**
 * The text tree with every preset `color` resolved for `scheme`; a preset
 * whose color doesn't cover the scheme loses its `color` key. Presets
 * without `color` are returned as-is (same object).
 */
export function resolveTextTree(
  tree: TextTokenTree | undefined,
  scheme: ColorScheme,
): TextTokenTree {
  const result: TextTokenTree = {};
  for (const [key, node] of Object.entries(tree ?? {})) {
    if (typeof node !== 'object' || node === null) continue;
    if (!isTextPreset(node)) {
      result[key] = resolveTextTree(node as TextTokenTree, scheme);
    } else if (node.color === undefined) {
      result[key] = node;
    } else {
      const { color, ...rest } = node;
      const resolved = resolveTextColor(color, scheme);
      result[key] =
        resolved === undefined ? rest : { ...rest, color: resolved };
    }
  }
  return result;
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
