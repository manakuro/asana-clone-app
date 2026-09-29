import type { ThemeConfig } from '@react-native-themed/core/config';

/** Values RN's `TextStyle['fontWeight']` accepts as strings. */
const RN_FONT_WEIGHTS = new Set([
  'normal',
  'bold',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  'ultralight',
  'thin',
  'light',
  'medium',
  'regular',
  'semibold',
  'condensedBold',
  'condensed',
  'heavy',
  'black',
]);

const TEXT_REF_SCALES = {
  fontSize: 'fontSizes',
  lineHeight: 'lineHeights',
  letterSpacing: 'letterSpacings',
  fontWeight: 'fontWeights',
} as const;

/**
 * Checks what the type system can no longer check once token types are
 * generated rather than inferred: every `semanticTokens.text` reference must
 * name a key of the matching `tokens` scale, and every semantic color must
 * define both schemes. Returns human-readable problems (empty when valid).
 */
export function validateTheme(config: ThemeConfig): string[] {
  const problems: string[] = [];
  const tokens = config.tokens ?? {};

  for (const [role, sizes] of Object.entries(
    config.semanticTokens?.text ?? {},
  )) {
    for (const [size, preset] of Object.entries(sizes)) {
      for (const [field, scaleName] of Object.entries(TEXT_REF_SCALES)) {
        const value = preset[field as keyof typeof preset];
        if (typeof value !== 'string') continue;

        const scale = tokens[scaleName];
        if (scale && Object.hasOwn(scale, value)) continue;
        if (field === 'fontWeight' && RN_FONT_WEIGHTS.has(value)) continue;

        problems.push(
          `semanticTokens.text.${role}.${size}.${field}: '${value}' is not a key of tokens.${scaleName}` +
            (scale ? '' : ` (tokens.${scaleName} is not defined)`),
        );
      }
    }
  }

  const baseFontSize = config.defaults?.fontSize;
  if (
    typeof baseFontSize === 'string' &&
    !(tokens.fontSizes && Object.hasOwn(tokens.fontSizes, baseFontSize))
  ) {
    problems.push(
      `defaults.fontSize: '${baseFontSize}' is not a key of tokens.fontSizes`,
    );
  }

  for (const [group, colors] of Object.entries(
    config.semanticTokens?.colors ?? {},
  )) {
    for (const [name, value] of Object.entries(colors)) {
      if (typeof value?.light !== 'string' || typeof value?.dark !== 'string') {
        problems.push(
          `semanticTokens.colors.${group}.${name}: must define both 'light' and 'dark' strings`,
        );
      }
    }
  }

  return problems;
}
