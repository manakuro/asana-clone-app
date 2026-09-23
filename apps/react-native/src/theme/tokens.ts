import { Platform } from 'react-native';

export const Height = 48;
export const FontSize = 17;
export const BorderRadius = 26;
export const Corners = 999;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
