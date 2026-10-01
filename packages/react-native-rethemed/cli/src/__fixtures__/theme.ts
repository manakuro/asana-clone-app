import { defineTheme, extendTheme } from '@react-native-rethemed/core/config';

const scales = defineTheme({
  tokens: {
    colors: { white: '#ffffff', 'gray.950': '#111111' },
    radii: { none: 0, md: 6, full: 9999 },
    spacing: { px: 1, 0: 0, 0.5: 2, 1: 4, 2: 8, 4: 16 },
    fontSizes: { sm: 14, md: 16, lg: 18 },
    fontWeights: { normal: '400', semibold: '600' },
    lineHeights: { short: 1.375, moderate: 1.5 },
    letterSpacings: { tight: -0.4, wide: 0.4 },
    zIndices: { base: 0, modal: 1400 },
    shadows: {
      sm: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      },
    },
  },
  semanticTokens: {
    colors: {
      bg: {
        default: { light: '#ffffff', dark: '#111111' },
        subtle: { light: '#fafafa', dark: '#18181b' },
      },
      fg: {
        default: { light: '#111111', dark: '#fafafa' },
        muted: { light: '#52525b', dark: '#a1a1aa' },
      },
    },
  },
});

const typography = defineTheme({
  semanticTokens: {
    text: {
      title: {
        md: {
          fontSize: 'md',
          lineHeight: 24,
          letterSpacing: 0.15,
          fontWeight: 'semibold',
        },
        sm: { fontSize: 14, lineHeight: 20, fontWeight: '500' },
      },
      body: {
        md: { fontSize: 'sm', lineHeight: 'moderate' },
      },
      // flat: themed.text.caption(); color per scheme
      caption: {
        fontSize: 'sm',
        letterSpacing: 'wide',
        color: { light: '#71717a', dark: '#a1a1aa' },
      },
      // deeper: themed.text.heading.display.lg()
      heading: {
        display: {
          lg: { fontSize: 36, lineHeight: 44, fontWeight: 'semibold' },
        },
        // color for one scheme only: none from the preset in light
        page: {
          fontSize: 'lg',
          lineHeight: 'short',
          color: { dark: '#fafafa' },
        },
      },
    },
  },
});

export const themeConfig = extendTheme(scales, typography, {
  defaults: { fontSize: 'md' },
});
