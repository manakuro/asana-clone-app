/**
 * How the generated `themed.gen.ts` is used in a component. Checked by `tsc`
 * (not run), so it breaks if the generated types stop matching the theme.
 */
import { Text, View } from 'react-native';
import { useThemed } from './themed.gen';

/** Placeholder; this theme defines no colors (see the second style object). */
const onSurfaceVariant = '#49454f';

export function Article() {
  const { themed, semanticTokens } = useThemed();

  return (
    <View
      style={themed.view({
        // md.sys.measurement.space200 / space100 / space50, keyed by dp
        padding: 16,
        gap: 8,
        marginBottom: 4,
      })}
    >
      {/* Presets are called by path: themed.text.<role>.<size>(). */}
      <Text style={themed.text.headline.sm()}>Material Design type scale</Text>
      <Text style={themed.text.title.md()}>Title medium</Text>
      {/* Raw values are fine in the override (this theme has no scales). */}
      <Text style={themed.text.body.lg({ fontSize: 18, lineHeight: 26 })}>
        Body large, slightly bigger
      </Text>
      {/* No color tokens: raw colors go in a second plain style object. */}
      <Text style={[themed.text.label.sm(), { color: onSurfaceVariant }]}>
        Label small · {semanticTokens.text.label.sm.fontSize}pt
      </Text>
    </View>
  );
}

export function rejected() {
  const { themed } = useThemed();
  // @ts-expect-error no color tokens in the Material Design theme
  themed.text({ color: 'fg.default' });
  // @ts-expect-error not an M3 spacing value (no 12dp token)
  themed.view({ padding: 12 });
  // @ts-expect-error keys are dp values, not M3 token numbers
  themed.view({ padding: 100 });
  // @ts-expect-error unknown size
  themed.text.title.xl();
  // @ts-expect-error unknown role
  themed.text.caption;
  // @ts-expect-error a role is a group, not a preset
  themed.text.body();
}
