/**
 * How the generated `themed.gen.ts` is used in a component. Checked by `tsc`
 * (not run), so it breaks if the generated types stop matching the theme.
 */
import { Text, View } from 'react-native';
import { useThemed } from './themed.gen';

export function Card() {
  const { themed, semanticTokens } = useThemed();

  return (
    <View
      style={themed.view({
        // Semantic colors switch with light/dark.
        backgroundColor: 'bg.panel',
        borderColor: 'border.default',
        borderWidth: 1,
        padding: 4,
        gap: 2,
        borderRadius: 'lg',
        shadow: 'md',
        zIndex: 'docked',
      })}
    >
      <Text
        style={themed.text({
          color: 'fg.default',
          fontSize: 'xl',
          fontWeight: 'semibold',
          lineHeight: 'short',
          letterSpacing: 'tight',
        })}
      >
        Chakra UI tokens
      </Text>
      <Text style={themed.text({ color: 'fg.muted', fontSize: 'sm' })}>
        Colors, spacing, radii, shadows and typography come from the theme.
      </Text>
      {/* Primitive colors are accepted too, but fixed in every scheme. */}
      <View
        style={themed.view({
          backgroundColor: 'red.500',
          paddingHorizontal: 2,
          paddingVertical: 1,
          borderRadius: 'full',
        })}
      >
        <Text style={themed.text({ color: 'white', fontSize: 'xs' })}>
          Badge
        </Text>
      </View>
      {/* Outside `style`, read resolved values from `semanticTokens`. */}
      <View style={{ borderBottomColor: semanticTokens.colors.border.muted }} />
    </View>
  );
}

export function rejected() {
  const { themed } = useThemed();
  // @ts-expect-error colors are token-only
  themed.view({ backgroundColor: '#ffffff' });
  // @ts-expect-error unknown semantic color
  themed.text({ color: 'fg.unknown' });
  // @ts-expect-error unknown spacing token
  themed.view({ padding: 13 });
  // @ts-expect-error unknown radius token
  themed.view({ borderRadius: 'huge' });
  // @ts-expect-error inset shadows are not part of the theme
  themed.view({ shadow: 'inner' });
  // @ts-expect-error no text presets in the Chakra UI theme
  themed.text.title;
}
