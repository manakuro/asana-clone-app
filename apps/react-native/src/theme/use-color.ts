import { Colors, ColorTokens } from './colors';
import { useColorScheme } from './use-color-scheme';

type ColorScheme = ReturnType<typeof useColorScheme>;

type ThemedColors = {
  [K in keyof typeof Colors]: (typeof Colors)[K][ColorScheme];
};

export function useColor(colorScheme?: ColorScheme) {
  const appColorScheme = useColorScheme() ?? 'dark';
  const theme = (colorScheme ?? appColorScheme) as ColorScheme;

  const colors = Object.fromEntries(
    (Object.keys(Colors) as (keyof typeof Colors)[]).map((key) => [
      key,
      Colors[key][theme],
    ]),
  ) as ThemedColors;

  return {
    colors: {
      ...colors,
      tokens: ColorTokens,
    },
  };
}
