import { isTextPreset } from './text-tree';
import type { TextTokenTree, ThemeConfig } from './types';

type Table = Record<string, unknown>;
type NestedTable = Record<string, Table>;

/**
 * Flat `tokens` categories: a one-level merge (`{ ...a, ...b }`, `b` wins per
 * key) is enough. `semanticTokens.colors` is two levels deep and merged one
 * level deeper; `semanticTokens.text` is a tree of any depth — see
 * `mergeTextTree`.
 *
 * Merging is runtime-only: the result is typed as the plain `ThemeConfig`,
 * and exact token names come from the generated `themed.gen.ts`.
 */
const FLAT_CATEGORY_KEYS = [
  'colors',
  'radii',
  'spacing',
  'fontSizes',
  'fontWeights',
  'lineHeights',
  'letterSpacings',
  'zIndices',
  'shadows',
] as const;

function mergeFlat(a: Table | undefined, b: Table | undefined) {
  if (!a) return b;
  if (!b) return a;
  return { ...a, ...b };
}

/**
 * `colors.<group>.<token>`: groups are merged, tokens replaced whole, so
 * overriding `bg.default` keeps `bg.subtle` and every other group.
 */
function mergeNested(a: NestedTable | undefined, b: NestedTable | undefined) {
  if (!a) return b;
  if (!b) return a;

  const result: NestedTable = { ...a };
  for (const key of Object.keys(b)) {
    result[key] = key in result ? { ...result[key], ...b[key] } : b[key];
  }
  return result;
}

/**
 * `semanticTokens.text`: groups merge recursively, presets (leaves) are
 * replaced whole. So overriding `display.lg` keeps `display.md` and every
 * other group, at any depth. When a key is a preset on one side and a group
 * on the other, the later side replaces it.
 */
function mergeTextTree(
  a: TextTokenTree | undefined,
  b: TextTokenTree | undefined,
): TextTokenTree | undefined {
  if (!a) return b;
  if (!b) return a;

  const result: TextTokenTree = { ...a };
  for (const [key, next] of Object.entries(b)) {
    const prev = result[key];
    result[key] =
      prev && !isTextPreset(prev) && !isTextPreset(next)
        ? (mergeTextTree(prev as TextTokenTree, next as TextTokenTree) ?? next)
        : next;
  }
  return result;
}

function mergeTokens(
  a: ThemeConfig['tokens'],
  b: ThemeConfig['tokens'],
): ThemeConfig['tokens'] {
  if (!a) return b;
  if (!b) return a;

  const merged: Table = {};
  for (const key of FLAT_CATEGORY_KEYS) {
    const value = mergeFlat(a[key], b[key]);
    if (value) merged[key] = value;
  }
  return merged as ThemeConfig['tokens'];
}

function mergeSemanticTokens(
  a: ThemeConfig['semanticTokens'],
  b: ThemeConfig['semanticTokens'],
): ThemeConfig['semanticTokens'] {
  const colors = mergeNested(a?.colors, b?.colors);
  const text = mergeTextTree(a?.text, b?.text);
  return {
    ...(colors ? { colors } : {}),
    ...(text ? { text } : {}),
  } as ThemeConfig['semanticTokens'];
}

function mergeThemeConfig(a: ThemeConfig, b: ThemeConfig): ThemeConfig {
  const defaults = mergeFlat(a.defaults, b.defaults);
  return {
    tokens: mergeTokens(a.tokens, b.tokens),
    semanticTokens: mergeSemanticTokens(a.semanticTokens, b.semanticTokens),
    ...(defaults ? { defaults } : {}),
  };
}

/**
 * Merges N `ThemeConfig`s, folding left-to-right so later themes override
 * earlier ones per key:
 *
 * ```ts
 * const config = extendTheme(materialDesignTheme, chakraUiTheme, {
 *   semanticTokens: {
 *     text: { display: { lg: { fontSize: 60, lineHeight: 68 } } },
 *   },
 * });
 * ```
 */
export function extendTheme(
  ...themes: [ThemeConfig, ...ThemeConfig[]]
): ThemeConfig {
  return themes.reduce(mergeThemeConfig);
}
