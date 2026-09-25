import { defineTheme } from '@react-native-themed/core';
import { colorTokens, semanticColors } from './colors';
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

export type { Colors, ColorTokenKey } from './colors';
export {
  colorTokens,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  radii,
  semanticColors,
  shadows,
  spacing,
  zIndices,
};
