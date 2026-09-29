import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import type {
  ColorKeys,
  FontSizeKeys,
  FontWeightKeys,
  LetterSpacingKeys,
  LineHeightKeys,
  RadiusKeys,
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

/**
 * One `role`/`size` entry in `semanticTokens.text` (Material Design 3
 * type-scale shape). Each field is either a key of the matching primitive
 * scale in `tokens` (e.g. `fontSize: 'lg'`) or a raw value. References are
 * validated by `@react-native-themed/cli typegen` against the final config,
 * since a partial theme may reference keys supplied by another theme it is
 * later merged with.
 *
 * No `color`: typography and color are independent axes, combined by the
 * component-variant layer rather than baked into the type scale.
 */
export type TextToken = {
  fontSize?: string | number;
  lineHeight?: string | number;
  letterSpacing?: string | number;
  fontWeight?: string | TextStyle['fontWeight'];
};

/**
 * The shape a theme package (or an app's local override) must satisfy.
 * `tokens` holds primitive values (the smallest design-system units);
 * `semanticTokens` holds role-named values built on top of them — the
 * scheme-dependent `colors` and the `text` type scale — mirroring Chakra
 * UI's `tokens` vs `semanticTokens` distinction.
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
  };
  semanticTokens?: {
    /** group -> token -> scheme, e.g. `colors.fg.default.light`. */
    colors?: Record<string, Record<string, { light: string; dark: string }>>;
    /** role -> size -> style, e.g. `text.title.md`. */
    text?: Record<string, Record<string, TextToken>>;
  };
};

// ---------------------------------------------------------------------------
// Schema — the slot the generated `themed.gen.ts` fills in
// ---------------------------------------------------------------------------

/**
 * Exact token types for one theme. Written by
 * `@react-native-themed/cli typegen` from the evaluated config, never by
 * hand, so core never has to infer token names from literal types.
 */
export type ThemedSchema = {
  /**
   * Every token-aware style prop (plus the virtual `shadow`). Each primitive
   * only picks the props its RN style type actually has — see `TokenizeStyle`.
   */
  style: object;
  /** `themed.text.<role>.<size>(override?)` */
  textVariants: object;
  /** `useThemed().tokens` */
  tokens: object;
  /** `useThemed().semanticTokens`, colors resolved for the current scheme. */
  semanticTokens: object;
};

/**
 * Swaps `Base`'s token-bearing props for the token-aware ones in `P`.
 * `Omit` + `Pick` only — one level, no recursion. `Pick` is homomorphic, so
 * the generated JSDoc (token tables) survives into editor hovers.
 *
 * Only props `Base` actually has are picked (e.g. no `color` on `View`); the
 * virtual `shadow` prop is kept when `Base` has real shadow props.
 */
export type TokenizeStyle<Base, P> = Omit<Base, keyof P> &
  Pick<
    P,
    Extract<
      keyof P,
      keyof Base | ('shadowColor' extends keyof Base ? 'shadow' : never)
    >
  >;

export type ThemedStyles<S extends ThemedSchema> = {
  /** Resolves token values in a `View` style. */
  view: (style: TokenizeStyle<ViewStyle, S['style']>) => ViewStyle;
  /** Resolves token values in an `Image` style. */
  image: (style: TokenizeStyle<ImageStyle, S['style']>) => ImageStyle;
  /**
   * Resolves token values in a `Text` style. Typography presets are
   * available as `themed.text.<role>.<size>(override?)`.
   */
  text: ((style?: TokenizeStyle<TextStyle, S['style']>) => TextStyle) &
    S['textVariants'];
};

// ---------------------------------------------------------------------------
// Fallback when typegen has not been run: usable, but no token names
// ---------------------------------------------------------------------------

type LooseTokenKeys =
  | ColorKeys
  | RadiusKeys
  | SpacingKeys
  | FontSizeKeys
  | FontWeightKeys
  | LineHeightKeys
  | LetterSpacingKeys
  | 'shadow';

type LooseStyle = { [K in LooseTokenKeys]?: string | number };

export type LooseSchema = {
  style: LooseStyle;
  textVariants: Record<
    string,
    Record<
      string,
      (override?: TokenizeStyle<TextStyle, LooseStyle>) => TextStyle
    >
  >;
  tokens: NonNullable<ThemeConfig['tokens']>;
  semanticTokens: {
    colors: Record<string, Record<string, string>>;
    text: NonNullable<NonNullable<ThemeConfig['semanticTokens']>['text']>;
  };
};
