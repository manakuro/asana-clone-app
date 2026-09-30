/**
 * The RN style property names each token category resolves, grouped by
 * category. Kept as `const` arrays (not just types) because the resolvers
 * need to iterate them at runtime.
 */

export const COLOR_KEYS = [
  'color',
  'backgroundColor',
  'borderColor',
  'borderTopColor',
  'borderBottomColor',
  'borderLeftColor',
  'borderRightColor',
  'borderStartColor',
  'borderEndColor',
  'borderBlockColor',
  'borderBlockStartColor',
  'borderBlockEndColor',
  'tintColor',
  'overlayColor',
  'shadowColor',
  'outlineColor',
  'textShadowColor',
  'textDecorationColor',
] as const;
export type ColorKeys = (typeof COLOR_KEYS)[number];

export const RADIUS_KEYS = [
  'borderRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderTopStartRadius',
  'borderTopEndRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderBottomStartRadius',
  'borderBottomEndRadius',
  'borderStartStartRadius',
  'borderStartEndRadius',
  'borderEndStartRadius',
  'borderEndEndRadius',
] as const;
export type RadiusKeys = (typeof RADIUS_KEYS)[number];

export const SPACING_KEYS = [
  'padding',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingHorizontal',
  'paddingVertical',
  'paddingStart',
  'paddingEnd',
  'paddingBlock',
  'paddingBlockStart',
  'paddingBlockEnd',
  'paddingInline',
  'paddingInlineStart',
  'paddingInlineEnd',
  'margin',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginHorizontal',
  'marginVertical',
  'marginStart',
  'marginEnd',
  'marginBlock',
  'marginBlockStart',
  'marginBlockEnd',
  'marginInline',
  'marginInlineStart',
  'marginInlineEnd',
  'gap',
  'rowGap',
  'columnGap',
] as const;
export type SpacingKeys = (typeof SPACING_KEYS)[number];

export const FONT_SIZE_KEYS = ['fontSize'] as const;
export type FontSizeKeys = (typeof FONT_SIZE_KEYS)[number];

export const FONT_WEIGHT_KEYS = ['fontWeight'] as const;
export type FontWeightKeys = (typeof FONT_WEIGHT_KEYS)[number];

export const LINE_HEIGHT_KEYS = ['lineHeight'] as const;
export type LineHeightKeys = (typeof LINE_HEIGHT_KEYS)[number];

export const LETTER_SPACING_KEYS = ['letterSpacing'] as const;
export type LetterSpacingKeys = (typeof LETTER_SPACING_KEYS)[number];

/** Token or raw number, like the typography props. */
export const Z_INDEX_KEYS = ['zIndex'] as const;
export type ZIndexKeys = (typeof Z_INDEX_KEYS)[number];

/**
 * The real RN style properties the virtual `shadow` prop expands into.
 * Not resolved as a scale category itself — see `resolvers/style-resolver.ts`.
 */
export const SHADOW_STYLE_PROPS = [
  'shadowColor',
  'shadowOffset',
  'shadowOpacity',
  'shadowRadius',
  'elevation',
] as const;
export type ShadowStyleProps = (typeof SHADOW_STYLE_PROPS)[number];
