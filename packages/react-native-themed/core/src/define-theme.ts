import type { ThemeConfig } from './types';

/**
 * Identity function used purely as a type gate: it checks `config` against
 * `ThemeConfig` (`satisfies`-style) while preserving the literal types of
 * everything passed in, so `createThemed`/`extendTheme` can infer exact
 * token names from whatever theme package uses this.
 */
export function defineTheme<const T extends ThemeConfig>(config: T): T {
  return config;
}
