/**
 * Example theme: `pandaCssTheme` exactly as this package ships it, with no
 * app-side additions. `pnpm example:codegen` runs the CLI on this file and
 * writes `themed.gen.ts` and `themed.md` next to it.
 *
 * Panda ships no semantic tokens, so color props take the primitive palette
 * (`'red.500'`), which is the same in light and dark. A real app usually adds
 * `semanticTokens.colors` / `semanticTokens.text` with
 * `extendTheme(pandaCssTheme, { ... })`.
 */
import { pandaCssTheme } from '../src';

export const themeConfig = pandaCssTheme;
