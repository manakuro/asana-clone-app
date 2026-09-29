/**
 * `useThemed()` returns `themed` / `tokens` / `semanticTokens` resolved for the
 * scheme held by `ThemedProvider`, so every consumer re-renders when it changes.
 *
 * The instance and its token types live in the generated `themed.gen.ts`
 * (see `theme.ts`).
 */
export { themeConfig } from './theme';
export type {
  ColorToken,
  FontSizeToken,
  FontWeightToken,
  LetterSpacingToken,
  LineHeightToken,
  RadiusToken,
  ShadowToken,
  SpacingToken,
} from './themed.gen';
export { ThemedProvider, useColorMode, useThemed } from './themed.gen';
