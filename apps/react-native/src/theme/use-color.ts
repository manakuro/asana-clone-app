import {
  type Colors,
  colorTokens,
  colors as themeColors,
} from '@react-native-themed/chakra-ui-tokens';
import { useColorScheme } from './use-color-scheme';

type ColorScheme = ReturnType<typeof useColorScheme>;

type ThemedColors = {
  [K in keyof Colors]: Colors[K][ColorScheme];
};

export function useColor(colorScheme?: ColorScheme) {
  const appColorScheme = useColorScheme();
  const theme = colorScheme ?? appColorScheme;

  const colors = Object.fromEntries(
    (Object.keys(themeColors) as (keyof Colors)[]).map((key) => [
      key,
      themeColors[key][theme],
    ]),
  ) as ThemedColors;

  return {
    colors: {
      ...colors,
      tokens: colorTokens,
    },
  };
}
