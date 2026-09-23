import type { TextStyle } from 'react-native';

type TypescaleToken = Pick<
  TextStyle,
  'fontSize' | 'lineHeight' | 'letterSpacing' | 'fontWeight'
>;

/**
 * Typography scale tokens, aligned with Material Design 3's type scale.
 * https://m3.material.io/styles/typography/type-scale-tokens
 *
 * | Token         | fontSize | lineHeight | letterSpacing | fontWeight |
 * | ------------- | -------- | ---------- | -------------- | ---------- |
 * | display.lg    | 57       | 64         | -0.25          | 400        |
 * | display.md    | 45       | 52         | 0              | 400        |
 * | display.sm    | 36       | 44         | 0              | 400        |
 * | headline.lg   | 32       | 40         | 0              | 400        |
 * | headline.md   | 28       | 36         | 0              | 400        |
 * | headline.sm   | 24       | 32         | 0              | 400        |
 * | title.lg      | 22       | 28         | 0              | 400        |
 * | title.md      | 16       | 24         | 0.15           | 500        |
 * | title.sm      | 14       | 20         | 0.1            | 500        |
 * | body.lg       | 16       | 24         | 0.5            | 400        |
 * | body.md       | 14       | 20         | 0.25           | 400        |
 * | body.sm       | 12       | 16         | 0.4            | 400        |
 * | label.lg      | 14       | 20         | 0.1            | 500        |
 * | label.md      | 12       | 16         | 0.5            | 500        |
 * | label.sm      | 11       | 16         | 0.5            | 500        |
 */
export const typescale = {
  display: {
    lg: {
      fontSize: 57,
      lineHeight: 64,
      letterSpacing: -0.25,
      fontWeight: '400',
    },
    md: { fontSize: 45, lineHeight: 52, letterSpacing: 0, fontWeight: '400' },
    sm: { fontSize: 36, lineHeight: 44, letterSpacing: 0, fontWeight: '400' },
  },
  headline: {
    lg: { fontSize: 32, lineHeight: 40, letterSpacing: 0, fontWeight: '400' },
    md: { fontSize: 28, lineHeight: 36, letterSpacing: 0, fontWeight: '400' },
    sm: { fontSize: 24, lineHeight: 32, letterSpacing: 0, fontWeight: '400' },
  },
  title: {
    lg: { fontSize: 22, lineHeight: 28, letterSpacing: 0, fontWeight: '400' },
    md: {
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.15,
      fontWeight: '500',
    },
    sm: { fontSize: 14, lineHeight: 20, letterSpacing: 0.1, fontWeight: '500' },
  },
  body: {
    lg: { fontSize: 16, lineHeight: 24, letterSpacing: 0.5, fontWeight: '400' },
    md: {
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.25,
      fontWeight: '400',
    },
    sm: { fontSize: 12, lineHeight: 16, letterSpacing: 0.4, fontWeight: '400' },
  },
  label: {
    lg: { fontSize: 14, lineHeight: 20, letterSpacing: 0.1, fontWeight: '500' },
    md: { fontSize: 12, lineHeight: 16, letterSpacing: 0.5, fontWeight: '500' },
    sm: { fontSize: 11, lineHeight: 16, letterSpacing: 0.5, fontWeight: '500' },
  },
} as const satisfies Record<string, Record<'lg' | 'md' | 'sm', TypescaleToken>>;
