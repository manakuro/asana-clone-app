import type { ThemeConfig } from '../types';

export type ColorScheme = 'light' | 'dark';

/**
 * Flattens `config.semanticTokens.colors` into group -> token -> string for
 * one scheme (e.g. `{ fg: { default: '#000' } }`). Semantic values are
 * already concrete strings in the config, so this only picks `light`/`dark`.
 */
export function resolveSemanticColors(
  config: ThemeConfig,
  scheme: ColorScheme,
): Record<string, Record<string, string>> {
  const groups = config.semanticTokens?.colors ?? {};
  const result: Record<string, Record<string, string>> = {};

  for (const group of Object.keys(groups)) {
    const tokens: Record<string, string> = {};
    for (const token of Object.keys(groups[group])) {
      tokens[token] = groups[group][token][scheme];
    }
    result[group] = tokens;
  }

  return result;
}
