/**
 * How the generated `themed.gen.ts` is used in a component. Checked by `tsc`
 * (not run), so it breaks if the generated types stop matching the theme.
 */
import { Text, View } from 'react-native';
import { useThemed } from './themed.gen';

export function Card() {
  const { themed, tokens } = useThemed();

  return (
    <View
      style={[
        themed.view({
          padding: 4.5,
          gap: 2,
          borderRadius: 'xl',
          shadow: 'md',
        }),
        // Panda has no semantic colors: raw palette values go in a second
        // style object (or add `semanticTokens.colors` to the theme).
        { backgroundColor: tokens.colors.white },
      ]}
    >
      <Text
        style={[
          themed.text({
            fontSize: 'xl',
            fontWeight: 'semibold',
            lineHeight: 'snug',
            letterSpacing: 'tight',
          }),
          { color: tokens.colors['zinc.900'] },
        ]}
      >
        Panda CSS tokens
      </Text>
      <Text
        style={[
          themed.text({ fontSize: 'sm', lineHeight: 'relaxed' }),
          { color: tokens.colors['zinc.500'] },
        ]}
      >
        Spacing, radii, shadows and typography come from the theme.
      </Text>
    </View>
  );
}

export function rejected() {
  const { themed } = useThemed();
  // @ts-expect-error Panda's spacing has no `px` key (Chakra's does)
  themed.view({ padding: 'px' });
  // @ts-expect-error inset shadows are not converted
  themed.view({ shadow: 'inner' });
  // @ts-expect-error no semantic colors in the Panda theme
  themed.view({ backgroundColor: 'bg.default' });
  // @ts-expect-error no text presets in the Panda theme
  themed.text.md;
}
