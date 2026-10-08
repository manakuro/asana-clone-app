import { chakraUiTheme, colors } from '@react-native-rethemed/chakra-ui-tokens';
import { extendTheme } from '@react-native-rethemed/core';
import { materialDesignTheme } from '@react-native-rethemed/material-design-tokens';

/**
 * `chakraUiTheme` supplies colors/radii/spacing/fontSizes/etc; `materialDesignTheme`
 * supplies the `semanticTokens.text` type-scale. Later themes win per key, so app-local
 * overrides can be appended here later as a third argument.
 *
 * `themed.gen.ts` is generated from this file by `pnpm themed:codegen` (also
 * run on install via `prepare`) — re-run it after editing. Import only from
 * `@react-native-rethemed/core/config` here: the CLI evaluates this file in
 * plain Node, without `react-native`.
 */
export const themeConfig = extendTheme(chakraUiTheme, {
  tokens: {
    colors: {
      testColor: '#000000',
    },
  },
  semanticTokens: {
    colors: {
      primary: {
        bg: { light: colors['gray.950'], dark: colors.white },
        fg: { light: colors.white, dark: colors['gray.950'] },
      },
      bg: {
        default: { light: colors.white, dark: colors['gray.950'] },
      },
    },
    text: {
      ...materialDesignTheme?.semanticTokens?.text,
      /**
       * `test-caption` is a custom type-scale for captions. It is used only for CLI testing.
       */
      'test-caption': {
        sm: {
          fontSize: 14,
          fontWeight: 500,
          color: {
            light: colors['gray.950'],
            dark: colors.white,
          },
        },
      },
    },
  },
  defaults: {
    fontSize: 'md',
  },
});
