/**
 * Example theme: `materialDesignTheme` exactly as this package ships it, with
 * no app-side additions. `pnpm example:codegen` runs the CLI on this file and
 * writes `themed.gen.ts` and `themed.md` next to it.
 *
 * Material Design 3's type scale and spacing: no colors or radii. Spacing
 * keys are dp values (`space100` = 8dp → `padding: 8`).
 */
import { materialDesignTheme } from '../src';

export const themeConfig = materialDesignTheme;
