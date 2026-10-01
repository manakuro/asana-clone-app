/**
 * Example theme: `materialDesignTheme` exactly as this package ships it, with
 * no app-side additions. `pnpm example:codegen` runs the CLI on this file and
 * writes `themed.gen.ts` and `themed.md` next to it.
 *
 * Material Design 3's type scale only: no colors, radii or spacing. An app
 * combines it with a token package, e.g.
 * `extendTheme(chakraUiTheme, materialDesignTheme)`.
 */
import { materialDesignTheme } from '../src';

export const themeConfig = materialDesignTheme;
