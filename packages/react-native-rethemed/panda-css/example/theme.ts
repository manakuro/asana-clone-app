/**
 * Example theme: `pandaCssTheme` exactly as this package ships it, with no
 * app-side additions. `pnpm example:codegen` runs the CLI on this file and
 * writes `themed.gen.ts` and `themed.md` next to it.
 *
 * Panda ships no semantic tokens, so the generated color props accept no
 * tokens here. A real app adds `semanticTokens.colors` / `semanticTokens.text`
 * with `extendTheme(pandaCssTheme, { ... })`.
 */
import { pandaCssTheme } from '../src';

export const themeConfig = pandaCssTheme;
