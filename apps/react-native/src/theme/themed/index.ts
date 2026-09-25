import {
  chakraUiTheme,
  colorTokens,
} from '@react-native-themed/chakra-ui-tokens';
import { createThemed, extendTheme } from '@react-native-themed/core';
import { materialDesignTheme } from '@react-native-themed/material-design-tokens';

/**
 * `chakraUiTheme` supplies colors/radii/spacing/fontSizes/etc; `materialDesignTheme`
 * supplies the `semanticTokens.text` type-scale. Later themes win per key, so app-local
 * overrides can be appended here later as a third argument.
 */
export const themeConfig = extendTheme(chakraUiTheme, materialDesignTheme, {
  semanticTokens: {
    colors: {
      primary: {
        bg: { light: colorTokens['gray.950'], dark: colorTokens.white },
        fg: { light: colorTokens.white, dark: colorTokens['gray.950'] },
      },
      bg: {
        default: { light: colorTokens.white, dark: colorTokens['gray.950'] },
      },
    },
  },
});

/**
 * `useThemed()` returns `themed` / `tokens` / `semanticTokens` resolved for the
 * scheme held by `ThemedProvider`, so every consumer re-renders when it changes.
 */
export const { ThemedProvider, useThemed, useColorMode } =
  createThemed(themeConfig);
