import { Platform } from 'react-native';

export const HEIGHT = 48;
export const FONT_SIZE = 17;
export const BORDER_RADIUS = 26;
export const CORNERS = 999;

/**
 * Spacing values used throughout the app.
 * - 2xs: 2
 * - xs: 4
 * - sm: 8
 * - md: 16
 * - lg: 24
 * - xl: 32
 */
export const Spacing = {
  '2xs': 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
