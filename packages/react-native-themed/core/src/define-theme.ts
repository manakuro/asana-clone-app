import type { ThemeConfig } from './types';

/**
 * Identity function used purely as a type gate: checks `config` against
 * `ThemeConfig` (object literals get the usual excess-property check, so a
 * misspelled `radius` or `semanticToken` fails to compile).
 *
 * The return type is deliberately the plain `ThemeConfig` — exact token
 * names come from the generated `themed.gen.ts`, not from literal-type
 * inference here.
 */
export function defineTheme(config: ThemeConfig): ThemeConfig {
  return config;
}
