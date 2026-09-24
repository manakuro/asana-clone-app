import { chakraUiTheme } from '@react-native-themed/chakra-ui-tokens';
import { createThemed, extendTheme } from '@react-native-themed/core';
import { materialDesignTheme } from '@react-native-themed/material-design-tokens';
import { getSnapshot } from '../store/color-mode-store';

/**
 * `chakraUiTheme` supplies colors/radii/spacing/fontSizes/etc; `materialDesignTheme`
 * supplies the `semanticTokens.text` type-scale. Later themes win per key, so app-local
 * overrides can be appended here later as a third argument.
 */
export const themeConfig = extendTheme(chakraUiTheme, materialDesignTheme);

/**
 * `getScheme` reads the same external store `ColorModeProvider` subscribes
 * to, so `themed.*` calls stay live across the app's light/dark toggle
 * without `createThemed` itself needing any React integration.
 */
export const themed = createThemed(themeConfig, {
  getColorScheme: () => getSnapshot().scheme,
});
