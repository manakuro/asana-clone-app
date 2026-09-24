import type { ThemeConfig } from './types';

/**
 * Flat `tokens` categories: a one-level merge (`{ ...a, ...b }`, `b` wins per
 * key) is enough. `semanticTokens` categories are nested two levels deep and
 * merged one level deeper — see `NESTED_SEMANTIC_CATEGORY_KEYS`.
 *
 * Kept as explicit, bounded lists rather than a fully generic recursive
 * `DeepMerge<A, B>` over the whole config: the category set is fixed and
 * known, and a fully generic deep-merge type over this shape risks TS
 * type-checker performance issues. Tradeoff: these lists are duplicated here
 * and at the type level (`MergeTokens` / `MergeSemanticTokens` below).
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

function mergeFlat(
  a: Record<string, unknown> | undefined,
  b: Record<string, unknown> | undefined,
): Record<string, unknown> | undefined {
  if (!a) return b;
  if (!b) return a;
  return { ...a, ...b };
}

/** Merges one level deeper, preserving untouched outer keys on both sides. */
function mergeNested<
  A extends Record<string, Record<string, unknown>> | undefined,
  B extends Record<string, Record<string, unknown>> | undefined,
>(a: A, b: B): MergeNested<A, B> {
  const result: Record<string, Record<string, unknown>> = { ...(a as object) };

  for (const key of Object.keys(b ?? {})) {
    const bValue = (b as Record<string, Record<string, unknown>>)[key];
    result[key] =
      key in result ? { ...(result[key] as object), ...bValue } : bValue;
  }

  return result as MergeNested<A, B>;
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

  return merged as ThemeConfig['tokens'];
}

function mergeSemanticTokens(
  a: ThemeConfig['semanticTokens'],
  b: ThemeConfig['semanticTokens'],
): ThemeConfig['semanticTokens'] {
  const merged: Record<string, unknown> = {};

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

// --- type-level merge, mirroring the runtime merge above ---

type Field<T, K extends PropertyKey> = T extends { [P in K]?: infer V }
  ? V
  : undefined;

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

/** `T[Outer][K]`, read via `Field` so `T` needn't extend `ThemeConfig`. */
type Category<
  T,
  Outer extends 'tokens' | 'semanticTokens',
  K extends PropertyKey,
> = Field<Field<T, Outer>, K>;

type MergeFlatToken<A, B, K extends PropertyKey> = MergeFlat<
  Category<A, 'tokens', K>,
  Category<B, 'tokens', K>
>;

type MergeTokens<A, B> = {
  colors: MergeFlatToken<A, B, 'colors'>;
  radii: MergeFlatToken<A, B, 'radii'>;
  spacing: MergeFlatToken<A, B, 'spacing'>;
  fontSizes: MergeFlatToken<A, B, 'fontSizes'>;
  fontWeights: MergeFlatToken<A, B, 'fontWeights'>;
  lineHeights: MergeFlatToken<A, B, 'lineHeights'>;
  letterSpacings: MergeFlatToken<A, B, 'letterSpacings'>;
  zIndices: MergeFlatToken<A, B, 'zIndices'>;
  shadows: MergeFlatToken<A, B, 'shadows'>;
};

type MergeNestedSemanticToken<A, B, K extends PropertyKey> = MergeNested<
  Category<A, 'semanticTokens', K>,
  Category<B, 'semanticTokens', K>
>;

type MergeSemanticTokens<A, B> = {
  colors: MergeNestedSemanticToken<A, B, 'colors'>;
  text: MergeNestedSemanticToken<A, B, 'text'>;
};

type Prettify<T> = { [K in keyof T]: T[K] } & {};

/**
 * Deliberately unconstrained: intersecting with `ThemeConfig` here would pull
 * in its `Record<string, …>` index signatures and widen every token name to
 * `string`, erasing the literal keys `createThemed` relies on.
 */
type Merge2<A, B> = Prettify<{
  tokens: Prettify<MergeTokens<A, B>>;
  semanticTokens: Prettify<MergeSemanticTokens<A, B>>;
}>;

/** Internal recursion — no per-step assignability check against ThemeConfig. */
type ExtendAllHelper<Ts extends readonly unknown[]> = Ts extends readonly [
  infer Only,
]
  ? Only
  : Ts extends readonly [infer First, infer Second, ...infer Rest]
    ? ExtendAllHelper<[Merge2<First, Second>, ...Rest]>
    : ThemeConfig;

/** Left-to-right fold over the type level, mirroring the runtime `reduce`. */
export type ExtendAll<Ts extends readonly ThemeConfig[]> = ExtendAllHelper<Ts>;

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
export function extendTheme<
  const Ts extends readonly [ThemeConfig, ...ThemeConfig[]],
>(...themes: Ts): ExtendAll<Ts> {
  return themes.reduce((acc, theme) =>
    mergeThemeConfig(acc, theme),
  ) as ExtendAll<Ts>;
}
