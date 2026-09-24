import type { TextStyle, ViewStyle } from 'react-native';
import type {
  ColorKeys,
  FontSizeKeys,
  FontWeightKeys,
  LetterSpacingKeys,
  LineHeightKeys,
  RadiusKeys,
  ShadowStyleProps,
  SpacingKeys,
} from './style-props';

/** One shadow preset — expands into these real RN style props. */
export type ShadowToken = Pick<
  ViewStyle,
  | 'shadowColor'
  | 'shadowOffset'
  | 'shadowOpacity'
  | 'shadowRadius'
  | 'elevation'
>;

/** One `role`/`size` entry in `tokens.text` (Material Design 3 type-scale shape). */
export type TypescaleToken = Pick<
  TextStyle,
  'fontSize' | 'lineHeight' | 'letterSpacing' | 'fontWeight'
>;

/**
 * The shape a theme package (or an app's local override) must satisfy.
 * `tokens` holds values that don't change with color scheme; `semanticTokens`
 * holds values that do (currently only `colors`), mirroring Chakra UI's
 * `tokens` vs `semanticTokens` distinction.
 */
export type ThemeConfig = {
  tokens?: {
    colors?: Record<string, string>;
    radii?: Record<string, number>;
    spacing?: Record<string, number>;
    fontSizes?: Record<string, number>;
    fontWeights?: Record<string, TextStyle['fontWeight']>;
    lineHeights?: Record<string, number>;
    letterSpacings?: Record<string, number>;
    zIndices?: Record<string, number>;
    shadows?: Record<string, ShadowToken>;
    /** role -> size -> style, e.g. `text.title.md`. */
    text?: Record<string, Record<string, TypescaleToken>>;
  };
  semanticTokens?: {
    /** group -> token -> scheme, e.g. `colors.fg.default.light`. */
    colors?: Record<string, Record<string, { light: string; dark: string }>>;
  };
};

type SemanticColorGroups = NonNullable<
  NonNullable<ThemeConfig['semanticTokens']>['colors']
>;

/** Valid `'group.token'` color paths for `T`, e.g. `'fg.default' | 'bg.subtle'`. */
export type ColorToken<T extends ThemeConfig> = T['semanticTokens'] extends {
  colors: infer Groups;
}
  ? Groups extends SemanticColorGroups
    ? {
        [Group in keyof Groups]: `${Group & string}.${keyof Groups[Group] & string}`;
      }[keyof Groups]
    : never
  : never;

export type RadiusToken<T extends ThemeConfig> = T['tokens'] extends {
  radii: infer R;
}
  ? keyof R & string
  : never;

export type SpacingToken<T extends ThemeConfig> = T['tokens'] extends {
  spacing: infer S;
}
  ? keyof S & (string | number)
  : never;

export type FontSizeToken<T extends ThemeConfig> = T['tokens'] extends {
  fontSizes: infer F;
}
  ? keyof F & string
  : never;

export type FontWeightToken<T extends ThemeConfig> = T['tokens'] extends {
  fontWeights: infer F;
}
  ? keyof F & string
  : never;

export type LineHeightToken<T extends ThemeConfig> = T['tokens'] extends {
  lineHeights: infer L;
}
  ? keyof L & string
  : never;

export type LetterSpacingToken<T extends ThemeConfig> = T['tokens'] extends {
  letterSpacings: infer L;
}
  ? keyof L & string
  : never;

/** Names in `tokens.shadows` — what the virtual `shadow` prop accepts. */
export type ShadowPresetToken<T extends ThemeConfig> = T['tokens'] extends {
  shadows: infer S;
}
  ? keyof S & string
  : never;

/**
 * Rewrites `S` (a `ViewStyle`/`TextStyle`/`ImageStyle`) so its token-bearing
 * properties accept a token name from `T` instead of a raw value.
 *
 * - `color`/`radii`/`spacing` families are token-only — no raw-value
 *   fallback. A genuinely one-off value belongs in a second plain style
 *   object passed alongside this one in a `style` array, not squeezed
 *   through the token system.
 * - `fontSize`/`fontWeight`/`lineHeight`/`letterSpacing` accept a token OR a
 *   raw value, asymmetric with the above.
 * - The virtual `shadow` prop only appears when `S` structurally has real
 *   shadow style props (e.g. `ViewStyle`), gated via `ShadowStyleProps`.
 */
export type TokenizeStyle<T extends ThemeConfig, S extends object> = Omit<
  S,
  | ColorKeys
  | RadiusKeys
  | SpacingKeys
  | FontSizeKeys
  | FontWeightKeys
  | LineHeightKeys
  | LetterSpacingKeys
> & {
  [K in ColorKeys & keyof S]?: ColorToken<T>;
} & {
  [K in RadiusKeys & keyof S]?: RadiusToken<T>;
} & {
  [K in SpacingKeys & keyof S]?: SpacingToken<T>;
} & {
  [K in FontSizeKeys & keyof S]?: FontSizeToken<T> | number;
} & {
  [K in FontWeightKeys & keyof S]?:
    | FontWeightToken<T>
    | TextStyle['fontWeight'];
} & {
  [K in LineHeightKeys & keyof S]?: LineHeightToken<T> | number;
} & {
  [K in LetterSpacingKeys & keyof S]?: LetterSpacingToken<T> | number;
} & (Extract<ShadowStyleProps, keyof S> extends never
    ? // biome-ignore lint/complexity/noBannedTypes: intentional "no extra prop" branch
      {}
    : { shadow?: ShadowPresetToken<T> });
