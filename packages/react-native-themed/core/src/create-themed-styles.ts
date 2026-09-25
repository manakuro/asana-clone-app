import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import {
  type ColorScheme,
  createColorResolver,
} from './resolvers/color-resolver';
import { createScaleResolver } from './resolvers/scale-resolver';
import { createShadowResolver } from './resolvers/shadow-resolver';
import {
  FONT_SIZE_KEYS,
  FONT_WEIGHT_KEYS,
  LETTER_SPACING_KEYS,
  LINE_HEIGHT_KEYS,
  RADIUS_KEYS,
  SPACING_KEYS,
} from './style-props';
import { createTextVariants } from './text-variants';
import type { CheckTextRefs, ThemeConfig, TokenizeStyle } from './types';

/**
 * Builds `{ view, text, image }` from a fully resolved `ThemeConfig` for one
 * fixed color scheme. No React here — plain data in, plain functions out.
 * `createThemed` calls this once per scheme and hands the result out through
 * `useThemed()`, so components re-render (and pick up new colors) when the
 * scheme changes.
 */
export function createThemedStyles<const T extends ThemeConfig>(
  config: T & CheckTextRefs<T>,
  scheme: ColorScheme,
) {
  const tokens = config.tokens ?? {};

  const resolveColor = createColorResolver(config, scheme);
  const resolveRadius = createScaleResolver(RADIUS_KEYS, tokens.radii);
  const resolveSpacing = createScaleResolver(SPACING_KEYS, tokens.spacing);
  const resolveFontSize = createScaleResolver(FONT_SIZE_KEYS, tokens.fontSizes);
  const resolveFontWeight = createScaleResolver(
    FONT_WEIGHT_KEYS,
    tokens.fontWeights,
  );
  const resolveLineHeight = createScaleResolver(
    LINE_HEIGHT_KEYS,
    tokens.lineHeights,
  );
  const resolveLetterSpacing = createScaleResolver(
    LETTER_SPACING_KEYS,
    tokens.letterSpacings,
  );
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

  const baseText = (input: TokenizeStyle<T, TextStyle> = {}) =>
    resolveStyle<TextStyle>(input as Record<string, unknown>);
  const variants = createTextVariants(config, (input) =>
    resolveStyle<TextStyle>(input),
  );
  // `Object.assign` would throw for roles that collide with non-writable
  // function properties (`name`, `length`); defineProperty overrides them.
  for (const [role, sizes] of Object.entries(variants)) {
    Object.defineProperty(baseText, role, {
      value: sizes,
      enumerable: true,
      configurable: true,
    });
  }
  const text = baseText as typeof baseText & typeof variants;

  return {
    view: (input: TokenizeStyle<T, ViewStyle>) =>
      resolveStyle<ViewStyle>(input as Record<string, unknown>),
    text,
    image: (input: TokenizeStyle<T, ImageStyle>) =>
      resolveStyle<ImageStyle>(input as Record<string, unknown>),
  };
}
