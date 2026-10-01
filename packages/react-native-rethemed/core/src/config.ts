/**
 * `@react-native-rethemed/core/config` — the React/RN-free part of core.
 *
 * Theme files (and theme packages) import from here so
 * `@react-native-rethemed/cli codegen` can evaluate them in plain Node without
 * loading `react-native`.
 */
export { defineTheme } from './define-theme';
export { extendTheme } from './extend-theme';
export {
  RN_DEFAULT_FONT_SIZE,
  resolveBaseFontSize,
} from './resolvers/line-height-resolver';
export {
  COLOR_KEYS,
  FONT_SIZE_KEYS,
  FONT_WEIGHT_KEYS,
  LETTER_SPACING_KEYS,
  LINE_HEIGHT_KEYS,
  RADIUS_KEYS,
  SHADOW_STYLE_PROPS,
  SPACING_KEYS,
  Z_INDEX_KEYS,
} from './style-props';
export {
  isTextPreset,
  resolveTextColor,
  TEXT_TOKEN_FIELDS,
  walkTextPresets,
} from './text-tree';
export type {
  LooseSchema,
  ShadowToken,
  TextColor,
  TextToken,
  TextTokenTree,
  ThemeConfig,
  ThemedSchema,
  ThemedStyles,
  TokenizeStyle,
} from './types';
