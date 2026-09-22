import { Platform } from 'react-native';

export const Height = 48;
export const FontSize = 17;
export const BorderRadius = 26;
export const Corners = 999;

/**
 * Spacing values used throughout the app, aligned with Chakra UI's spacing tokens.
 * https://www.chakra-ui.com/docs/theming/spacing
 * - 0.5: 2
 * - 1: 4
 * - 2: 8
 * - 4: 16
 * - 5: 20
 * - 6: 24
 * - 8: 32
 * - 9: 36
 * - 10: 40
 */
export const Spacing = {
  '0.5': 2,
  '1': 4,
  '2': 8,
  '4': 16,
  '5': 20,
  '6': 24,
  '8': 32,
  '9': 36,
  '10': 40,
} as const;

/**
 * Radii values used throughout the app, aligned with Chakra UI's spacing tokens.
 * https://www.chakra-ui.com/docs/theming/radii
 *
 * - none: 0
 * - 2xs: 1
 * - xs: 2
 * - sm: 4
 * - md: 6
 * - lg: 8
 * - xl: 12
 * - 2xl: 16
 * - 3xl: 24
 * - 4xl: 32
 * - full: 9999
 */
export const Radii = {
  none: 0,
  '2xs': 1,
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  '4xl': 32,
  full: 9999,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
