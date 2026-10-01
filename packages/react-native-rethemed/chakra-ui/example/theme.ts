/**
 * Example theme: `chakraUiTheme` exactly as this package ships it, with no
 * app-side additions. `pnpm example:codegen` runs the CLI on this file and
 * writes `themed.gen.ts` and `themed.md` next to it.
 *
 * Chakra ships no text presets; an app adds `semanticTokens.text` (e.g. with
 * `materialDesignTheme`) via `extendTheme(chakraUiTheme, { ... })`.
 */
import { chakraUiTheme } from '../src';

export const themeConfig = chakraUiTheme;
