import type { ThemeConfig } from '../types';

/** React Native's own default `fontSize`. */
export const RN_DEFAULT_FONT_SIZE = 14;

/**
 * `defaults.fontSize` as a number: a `tokens.fontSizes` key is looked up,
 * a raw number is used as-is, anything else falls back to RN's default.
 */
export function resolveBaseFontSize(config: ThemeConfig): number {
  const base = config.defaults?.fontSize;
  if (typeof base === 'number') return base;
  const scale = config.tokens?.fontSizes;
  if (typeof base === 'string' && scale && Object.hasOwn(scale, base)) {
    return scale[base];
  }
  return RN_DEFAULT_FONT_SIZE;
}

/** Avoids float noise like `17.600000000000001` without pixel-snapping. */
const round2 = (value: number) => Math.round(value * 100) / 100;

/**
 * Resolves `lineHeight` tokens, which are **ratios of `fontSize`** (like CSS
 * unitless line-height): `fontSize × ratio`. The `fontSize` comes from the
 * same style — already resolved to a number, since the font-size resolver
 * runs first — or else from `baseFontSize` (`defaults.fontSize`).
 *
 * A raw number that is not a token passes through as an absolute value, as
 * React Native expects. Copy-on-write, like the other resolvers.
 */
export function createLineHeightResolver(
  lineHeights: Record<string, number> | undefined,
  baseFontSize: number,
) {
  if (!lineHeights) {
    return (input: Record<string, unknown>) => input;
  }

  return function resolveLineHeightStyle(
    input: Record<string, unknown>,
  ): Record<string, unknown> {
    const token = input.lineHeight;
    if (
      (typeof token !== 'string' && typeof token !== 'number') ||
      !Object.hasOwn(lineHeights, token)
    ) {
      return input;
    }

    const fontSize =
      typeof input.fontSize === 'number' ? input.fontSize : baseFontSize;
    return {
      ...input,
      lineHeight: round2(fontSize * lineHeights[token as string]),
    };
  };
}
