import type { ThemeConfig } from './types';

/**
 * Flat token categories: a one-level merge (`{ ...a, ...b }`, `b` wins per
 * key) is enough. `text` (under `tokens`) and `semanticTokens.colors` are
 * nested two levels deep and merged one level deeper — see `MergeNested`.
 *
 * Kept as an explicit, bounded list rather than a fully generic recursive
 * `DeepMerge<A, B>` over the whole config: the category set is fixed and
 * known, and a fully generic deep-merge type over this shape risks TS
 * type-checker performance issues. Tradeoff: this list is duplicated here and
 * at the type level (`MergeTokens` below) — see Open Question 4 in
 * AI_INSTRUCTIONS.md.
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

function mergeFlat(
  a: Record<string, unknown> | undefined,
  b: Record<string, unknown> | undefined,
): Record<string, unknown> | undefined {
  if (!a) return b;
  if (!b) return a;
  return { ...a, ...b };
}

/** Merges one level deeper, preserving untouched outer keys on both sides. */
function mergeNested(
  a: Record<string, Record<string, unknown>> | undefined,
  b: Record<string, Record<string, unknown>> | undefined,
): Record<string, Record<string, unknown>> | undefined {
  if (!a) return b;
  if (!b) return a;

  const result: Record<string, Record<string, unknown>> = { ...a };
  for (const key of Object.keys(b)) {
    result[key] = { ...a[key], ...b[key] };
  }
  return result;
}

function mergeTokens(
  a: ThemeConfig['tokens'],
  b: ThemeConfig['tokens'],
): ThemeConfig['tokens'] {
  if (!a) return b;
  if (!b) return a;

  const merged: Record<string, unknown> = {};

  for (const key of FLAT_CATEGORY_KEYS) {
    const value = mergeFlat(
      a[key] as Record<string, unknown> | undefined,
      b[key] as Record<string, unknown> | undefined,
    );
    if (value) merged[key] = value;
  }

  const text = mergeNested(a.text, b.text);
  if (text) merged.text = text;

  return merged as ThemeConfig['tokens'];
}

function mergeSemanticTokens(
  a: ThemeConfig['semanticTokens'],
  b: ThemeConfig['semanticTokens'],
): ThemeConfig['semanticTokens'] {
  const colors = mergeNested(a?.colors, b?.colors);
  return colors ? { colors } : {};
}

function mergeThemeConfig(a: ThemeConfig, b: ThemeConfig): ThemeConfig {
  return {
    tokens: mergeTokens(a.tokens, b.tokens),
    semanticTokens: mergeSemanticTokens(a.semanticTokens, b.semanticTokens),
  };
}

// --- type-level merge, mirroring the runtime merge above ---

type Field<T, K extends PropertyKey> = T extends { [P in K]?: infer V } ? V : undefined;

type MergeFlat<A, B> = [A] extends [undefined]
  ? B
  : [B] extends [undefined]
    ? A
    : Omit<A, keyof B> & B;

type MergeNested<A, B> = [A] extends [undefined]
  ? B
  : [B] extends [undefined]
    ? A
    : {
        [K in keyof A | keyof B]: K extends keyof B
          ? K extends keyof A
            ? MergeFlat<A[K], B[K]>
            : B[K]
          : K extends keyof A
            ? A[K]
            : never;
      };

type MergeTokens<A extends ThemeConfig, B extends ThemeConfig> = {
  colors: MergeFlat<Field<A['tokens'], 'colors'>, Field<B['tokens'], 'colors'>>;
  radii: MergeFlat<Field<A['tokens'], 'radii'>, Field<B['tokens'], 'radii'>>;
  spacing: MergeFlat<Field<A['tokens'], 'spacing'>, Field<B['tokens'], 'spacing'>>;
  fontSizes: MergeFlat<Field<A['tokens'], 'fontSizes'>, Field<B['tokens'], 'fontSizes'>>;
  fontWeights: MergeFlat<Field<A['tokens'], 'fontWeights'>, Field<B['tokens'], 'fontWeights'>>;
  lineHeights: MergeFlat<Field<A['tokens'], 'lineHeights'>, Field<B['tokens'], 'lineHeights'>>;
  letterSpacings: MergeFlat<
    Field<A['tokens'], 'letterSpacings'>,
    Field<B['tokens'], 'letterSpacings'>
  >;
  zIndices: MergeFlat<Field<A['tokens'], 'zIndices'>, Field<B['tokens'], 'zIndices'>>;
  shadows: MergeFlat<Field<A['tokens'], 'shadows'>, Field<B['tokens'], 'shadows'>>;
  text: MergeNested<Field<A['tokens'], 'text'>, Field<B['tokens'], 'text'>>;
};

type MergeSemanticTokens<A extends ThemeConfig, B extends ThemeConfig> = {
  colors: MergeNested<
    Field<A['semanticTokens'], 'colors'>,
    Field<B['semanticTokens'], 'colors'>
  >;
};

type Merge2<A extends ThemeConfig, B extends ThemeConfig> = {
  tokens: MergeTokens<A, B>;
  semanticTokens: MergeSemanticTokens<A, B>;
};

/** Left-to-right fold over the type level, mirroring the runtime `reduce`. */
export type ExtendAll<Ts extends readonly ThemeConfig[]> = Ts extends readonly [
  infer Only extends ThemeConfig,
]
  ? Only
  : Ts extends readonly [
        infer First extends ThemeConfig,
        infer Second extends ThemeConfig,
        ...infer Rest extends ThemeConfig[],
      ]
    ? ExtendAll<[Merge2<First, Second>, ...Rest]>
    : ThemeConfig;

/**
 * Merges N `ThemeConfig`s, folding left-to-right so later themes override
 * earlier ones per key:
 *
 * ```ts
 * const config = extendTheme(materialDesignTheme, chakraUiTheme, {
 *   tokens: { text: { display: { lg: { fontSize: 60 } } } },
 * });
 * ```
 */
export function extendTheme<const Ts extends readonly [ThemeConfig, ...ThemeConfig[]]>(
  ...themes: Ts
): ExtendAll<Ts> {
  return themes.reduce((acc, theme) => mergeThemeConfig(acc, theme)) as ExtendAll<Ts>;
}
