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
