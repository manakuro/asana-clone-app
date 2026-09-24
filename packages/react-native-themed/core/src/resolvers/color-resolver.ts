import { COLOR_KEYS } from '../style-props';
import type { ThemeConfig } from '../types';

export type ColorScheme = 'light' | 'dark';

/**
 * Resolves `'group.token'` color paths (e.g. `'fg.default'`) against
 * `config.semanticTokens.colors`, picking the `light`/`dark` entry via
 * `getColorScheme()` — called once per style, not per property.
 *
 * Copy-on-write, same as `createScaleResolver`. Colors aren't scale-based
 * (they need a scheme lookup, not a flat table), so this stays its own
 * resolver rather than going through that factory.
 */
export function createColorResolver(
  config: ThemeConfig,
  getColorScheme: () => ColorScheme,
) {
  const groups = config.semanticTokens?.colors;
  if (!groups) {
    return (input: Record<string, unknown>) => input;
  }

  return function resolveColorStyle(
    input: Record<string, unknown>,
  ): Record<string, unknown> {
    let result = input;
    let scheme: ColorScheme | undefined;

    for (const prop of COLOR_KEYS) {
      const value = input[prop];
      if (typeof value !== 'string') continue;

      const dot = value.indexOf('.');
      if (dot === -1) continue;

      const entry = groups[value.slice(0, dot)]?.[value.slice(dot + 1)];
      if (!entry) continue;

      scheme ??= getColorScheme();
      if (result === input) {
        result = { ...input };
      }
      result[prop] = entry[scheme];
    }

    return result;
  };
}
