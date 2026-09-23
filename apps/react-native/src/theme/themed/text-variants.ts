import type { TextStyle } from 'react-native';
import { typescale } from '@/theme/tokens/typescale';
import type { TokenizeStyle } from './types';

type TypescaleRole = keyof typeof typescale;
type TypescaleSize = keyof (typeof typescale)[TypescaleRole];

type TextVariantFn = (override?: TokenizeStyle<TextStyle>) => TextStyle;

export type TextVariants = {
  [R in TypescaleRole]: {
    [S in TypescaleSize]: TextVariantFn;
  };
};

/**
 * Builds `themed.text.<role>.<size>(override?)` from `typescale`.
 * Each variant merges its preset (fontSize/lineHeight/letterSpacing/fontWeight)
 * with the caller's override, then runs it through the same `resolve`
 * (color/radius/spacing) as `themed.text()` itself.
 */
export function createTextVariants(
  resolve: (input: TokenizeStyle<TextStyle>) => TextStyle,
): TextVariants {
  const roles = Object.keys(typescale) as TypescaleRole[];

  return Object.fromEntries(
    roles.map((role) => {
      const sizes = Object.keys(typescale[role]) as TypescaleSize[];

      const bySize = sizes.map((size) => {
        const preset = typescale[role][size];
        const fn: TextVariantFn = (override) =>
          resolve({ ...preset, ...override } as TokenizeStyle<TextStyle>);
        return [size, fn] as const;
      });

      return [role, Object.fromEntries(bySize)] as const;
    }),
  ) as TextVariants;
}
