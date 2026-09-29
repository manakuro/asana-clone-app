import type { ThemeConfig } from './types';

type Table = Record<string, unknown>;
type NestedTable = Record<string, Table>;

/**
 * Flat `tokens` categories: a one-level merge (`{ ...a, ...b }`, `b` wins per
 * key) is enough. `semanticTokens` categories are nested two levels deep and
 * merged one level deeper — see `NESTED_SEMANTIC_CATEGORY_KEYS`.
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

/**
 * Two-level `semanticTokens` categories (`colors.<group>.<token>`,
 * `text.<role>.<size>`): outer keys are merged, inner keys are replaced whole,
 * so overriding `text.display.lg` keeps `display.md`/`display.sm` and every
 * other role.
 */
const NESTED_SEMANTIC_CATEGORY_KEYS = ['colors', 'text'] as const;

function mergeFlat(a: Table | undefined, b: Table | undefined) {
  if (!a) return b;
  if (!b) return a;
  return { ...a, ...b };
}

/** Merges one level deeper, preserving untouched outer keys on both sides. */
function mergeNested(a: NestedTable | undefined, b: NestedTable | undefined) {
  if (!a) return b;
  if (!b) return a;

  const result: NestedTable = { ...a };
  for (const key of Object.keys(b)) {
    result[key] = key in result ? { ...result[key], ...b[key] } : b[key];
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
  const merged: Table = {};
  for (const key of NESTED_SEMANTIC_CATEGORY_KEYS) {
    const value = mergeNested(a?.[key], b?.[key]);
    if (value) merged[key] = value;
  }
  return merged as ThemeConfig['semanticTokens'];
}

function mergeThemeConfig(a: ThemeConfig, b: ThemeConfig): ThemeConfig {
  return {
    tokens: mergeTokens(a.tokens, b.tokens),
    semanticTokens: mergeSemanticTokens(a.semanticTokens, b.semanticTokens),
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
