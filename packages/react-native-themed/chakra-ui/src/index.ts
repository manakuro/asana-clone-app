import { defineTheme } from '@react-native-themed/core';
import { colorTokens, colors, semanticColors } from './colors';
import {
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  radii,
  shadows,
  spacing,
  zIndices,
} from './scales';

export const chakraUiTheme = defineTheme({
  tokens: {
    colors: colorTokens,
    radii,
    spacing,
    fontSizes,
    fontWeights,
    lineHeights,
    letterSpacings,
    zIndices,
    shadows,
  },
  semanticTokens: {
    colors: semanticColors,
  },
});

export { colorTokens, colors, radii, spacing, fontSizes, fontWeights, lineHeights, letterSpacings, zIndices, shadows };
export type { Colors, ColorTokenKey } from './colors';
