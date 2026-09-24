import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { createColorResolver, type Scheme } from './resolvers/color';
import { createScaleResolver } from './resolvers/scale-resolver';
import { createShadowResolver } from './resolvers/shadow';
import {
  FONT_SIZE_KEYS,
  FONT_WEIGHT_KEYS,
  LETTER_SPACING_KEYS,
  LINE_HEIGHT_KEYS,
  RADIUS_KEYS,
  SPACING_KEYS,
} from './style-props';
import { createTextVariants } from './text-variants';
import type { ThemeConfig, TokenizeStyle } from './types';

export type { Scheme };

export type CreateThemedOptions = {
  /**
   * Read on every `themed.*` call to resolve semantic color tokens. A plain
   * function rather than React Context or a `ModeProvider`, so `createThemed`
   * stays usable outside React — callers wire it to whatever external store
   * they already use for light/dark switching (e.g. `() =>
   * colorModeStore.getSnapshot().scheme`). Defaults to always `'light'`.
   *
   */
  getScheme?: () => Scheme;
};

/**
 * Builds `{ view, text, image }` from a fully resolved `ThemeConfig`. No
 * React integration here (see `getScheme` above) — this is plain data in,
 * plain functions out.
 */
export function createThemed<const T extends ThemeConfig>(
  config: T,
  options: CreateThemedOptions = {},
) {
  const getScheme = options.getScheme ?? (() => 'light' as const);
  const tokens = config.tokens ?? {};

  const resolveColor = createColorResolver(config, getScheme);
  const resolveRadius = createScaleResolver(RADIUS_KEYS, tokens.radii);
  const resolveSpacing = createScaleResolver(SPACING_KEYS, tokens.spacing);
  const resolveFontSize = createScaleResolver(FONT_SIZE_KEYS, tokens.fontSizes);
  const resolveFontWeight = createScaleResolver(FONT_WEIGHT_KEYS, tokens.fontWeights);
  const resolveLineHeight = createScaleResolver(LINE_HEIGHT_KEYS, tokens.lineHeights);
  const resolveLetterSpacing = createScaleResolver(LETTER_SPACING_KEYS, tokens.letterSpacings);
  const resolveShadow = createShadowResolver(tokens.shadows);

  // Chains every resolver; if none apply, the original input passes through
  // with zero copies end-to-end (each resolver is itself copy-on-write).
  function resolveStyle<S extends object>(input: Record<string, unknown>): S {
    let result = input;
    result = resolveColor(result);
    result = resolveRadius(result);
    result = resolveSpacing(result);
    result = resolveFontSize(result);
    result = resolveLineHeight(result);
    result = resolveLetterSpacing(result);
    result = resolveFontWeight(result);
    result = resolveShadow(result);
    return result as S;
  }

  const text = Object.assign(
    (input: TokenizeStyle<T, TextStyle> = {}) =>
      resolveStyle<TextStyle>(input as Record<string, unknown>),
    createTextVariants(config, (input) => resolveStyle<TextStyle>(input)),
  );

  return {
    view: (input: TokenizeStyle<T, ViewStyle>) =>
      resolveStyle<ViewStyle>(input as Record<string, unknown>),
    text,
    image: (input: TokenizeStyle<T, ImageStyle>) =>
      resolveStyle<ImageStyle>(input as Record<string, unknown>),
  };
}
