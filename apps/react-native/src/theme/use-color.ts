import { Colors } from './colors';
import { useColorScheme } from './use-color-scheme';

export function useColor(
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
  props?: { light?: string; dark?: string },
) {
  const theme = useColorScheme() ?? 'dark';
  const colorFromProps = props?.[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
