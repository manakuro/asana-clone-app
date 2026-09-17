import { Colors, ColorTokens } from './colors';
import { useColorScheme } from './use-color-scheme';

type ColorScheme = ReturnType<typeof useColorScheme>;
export function useColor(colorScheme?: ColorScheme) {
  const appColorScheme = useColorScheme() ?? 'dark';
  const theme = colorScheme ?? appColorScheme;

  const colors = {
    bg: Colors.bg[theme],
    fg: Colors.fg[theme],
    border: Colors.border[theme],
    gray: Colors.gray[theme],
    primary: Colors.primary[theme],
    tokens: ColorTokens,
  };

  return {
    colors,
  };
}
