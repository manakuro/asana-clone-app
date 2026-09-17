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
 * - 6: 24
 * - 8: 32
 */
export const Spacing = {
  '0.5': 2,
  '1': 4,
  '2': 8,
  '4': 16,
  '6': 24,
  '8': 32,
};

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
