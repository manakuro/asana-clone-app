/**
 * How the generated `themed.gen.ts` is used in a component. Checked by `tsc`
 * (not run), so it breaks if the generated types stop matching the theme.
 */
import { Text, View } from 'react-native';
import { useThemed } from './themed.gen';

export function Card() {
  const { themed } = useThemed();

  // Panda ships primitive colors only. Color props take them by name; they
  // are the same in light and dark (add `semanticTokens.colors` for colors
  // that follow the scheme).
  return (
    <View
      style={themed.view({
        backgroundColor: 'white',
        borderColor: 'zinc.200',
        borderWidth: 1,
        padding: 4.5,
        gap: 2,
        borderRadius: 'xl',
        shadow: 'md',
      })}
    >
      <Text
        style={themed.text({
          color: 'zinc.900',
          fontSize: 'xl',
          fontWeight: 'semibold',
          lineHeight: 'snug',
          letterSpacing: 'tight',
        })}
      >
        Panda CSS tokens
      </Text>
      <Text
        style={themed.text({
          color: 'zinc.500',
          fontSize: 'sm',
          lineHeight: 'relaxed',
        })}
      >
        Spacing, radii, shadows, colors and typography come from the theme.
      </Text>
    </View>
  );
}

export function rejected() {
  const { themed } = useThemed();
  // @ts-expect-error colors are token-only
  themed.view({ backgroundColor: '#ffffff' });
  // @ts-expect-error `current` (currentcolor) is not converted
  themed.text({ color: 'current' });
  // @ts-expect-error Panda's spacing has no `px` key (Chakra's does)
  themed.view({ padding: 'px' });
  // @ts-expect-error inset shadows are not converted
  themed.view({ shadow: 'inner' });
  // @ts-expect-error no semantic colors in the Panda theme
  themed.view({ backgroundColor: 'bg.default' });
  // @ts-expect-error no text presets in the Panda theme
  themed.text.md;
}
