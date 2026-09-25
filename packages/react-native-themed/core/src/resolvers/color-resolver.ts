import { COLOR_KEYS } from '../style-props';
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

/**
 * Resolves `'group.token'` color paths (e.g. `'fg.default'`) against
 * `config.semanticTokens.colors` for a fixed `scheme`. `createThemed`
 * builds one resolver per scheme up front, so no scheme lookup happens at
 * call time.
 *
 * Copy-on-write, same as `createScaleResolver`. Colors aren't scale-based
 * (they need a group/token split, not a flat table), so this stays its own
 * resolver rather than going through that factory.
 */
export function createColorResolver(config: ThemeConfig, scheme: ColorScheme) {
  if (!config.semanticTokens?.colors) {
    return (input: Record<string, unknown>) => input;
  }
  const groups = resolveSemanticColors(config, scheme);

  return function resolveColorStyle(
    input: Record<string, unknown>,
  ): Record<string, unknown> {
    let result = input;

    for (const prop of COLOR_KEYS) {
      const value = input[prop];
      if (typeof value !== 'string') continue;

      const dot = value.indexOf('.');
      if (dot === -1) continue;

      const group = value.slice(0, dot);
      const token = value.slice(dot + 1);
      if (!Object.hasOwn(groups, group)) continue;
      if (!Object.hasOwn(groups[group], token)) continue;

      if (result === input) {
        result = { ...input };
      }
      result[prop] = groups[group][token];
    }

    return result;
  };
}
