import type { ThemeConfig } from './types';

type TokensShape = NonNullable<ThemeConfig['tokens']>;
type SemanticTokensShape = NonNullable<ThemeConfig['semanticTokens']>;

/** Maps every key of `T` not in `Shape` to `never`, so typos fail to compile. */
type NoExtraKeys<T, Shape> = {
  [K in Exclude<keyof T, keyof Shape>]: never;
};

/**
 * `const T extends ThemeConfig` alone doesn't reject excess keys (a misspelled
 * `radius` or `semanticToken` is silently accepted), so check the top level
 * and both token categories explicitly.
 */
type StrictThemeConfig<T> = NoExtraKeys<T, ThemeConfig> &
  (T extends { tokens: infer Tk }
    ? { tokens: NoExtraKeys<Tk, TokensShape> }
    : unknown) &
  (T extends { semanticTokens: infer St }
    ? { semanticTokens: NoExtraKeys<St, SemanticTokensShape> }
    : unknown);

/**
 * Identity function used purely as a type gate: it checks `config` against
 * `ThemeConfig` (`satisfies`-style, rejecting unknown keys) while preserving
 * the literal types of everything passed in, so `createThemed`/`extendTheme`
 * can infer exact token names from whatever theme package uses this.
 */
export function defineTheme<const T extends ThemeConfig>(
  config: T & StrictThemeConfig<T>,
): T {
  return config;
}
