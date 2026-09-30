import { defineTheme } from '@react-native-rethemed/core/config';
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
  // Chakra's body text size; `lineHeights` are ratios of it when a style has
  // no `fontSize` of its own.
  defaults: {
    fontSize: 'md',
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
