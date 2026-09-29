import {
  chakraUiTheme,
  colorTokens,
} from '@react-native-themed/chakra-ui-tokens';
import { extendTheme } from '@react-native-themed/core/config';
import { materialDesignTheme } from '@react-native-themed/material-design-tokens';

/**
 * `chakraUiTheme` supplies colors/radii/spacing/fontSizes/etc; `materialDesignTheme`
 * supplies the `semanticTokens.text` type-scale. Later themes win per key, so app-local
 * overrides can be appended here later as a third argument.
 *
 * `themed.gen.ts` is generated from this file (`pnpm typegen`, also run on
 * install via `prepare`) — re-run it after editing. Import only from
 * `@react-native-themed/core/config` here: the CLI evaluates this file in
 * plain Node, without `react-native`.
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
