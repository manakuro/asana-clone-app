/**
 * Type-level tests (checked by `tsc`, never run): every React Native
 * component that takes a style accepts the output of `themed.view()` /
 * `themed.text()` / `themed.image()`, and the token coverage of the style
 * props is pinned against React Native's own style types.
 *
 * Every `@ts-expect-error` must actually fail, so a regression in core's
 * types (or a React Native typings change) breaks `pnpm tsc`.
 */
import {
  ActivityIndicator,
  Animated,
  Button,
  type ColorValue,
  DrawerLayoutAndroid,
  FlatList,
  Image,
  ImageBackground,
  type ImageStyle,
  InputAccessoryView,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ProgressBarAndroid,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  SectionList,
  StatusBar,
  Switch,
  Text,
  TextInput,
  type TextStyle,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  type ViewStyle,
  VirtualizedList,
} from 'react-native';
import type { UseThemedResult } from '../create-themed';
import type {
  ColorKeys,
  FontSizeKeys,
  FontWeightKeys,
  LetterSpacingKeys,
  LineHeightKeys,
  RadiusKeys,
  SpacingKeys,
  ZIndexKeys,
} from '../style-props';
import type { TokenizeStyle } from '../types';

// ---------------------------------------------------------------------------
// A schema shaped like what `@react-native-rethemed/cli codegen` emits
// ---------------------------------------------------------------------------

type ColorToken = 'bg.default' | 'fg.default' | 'border.default' | 'white';
type StyleProps = { [K in ColorKeys]?: ColorToken } & {
  [K in RadiusKeys]?: 'sm' | 'md';
} & { [K in SpacingKeys]?: 0 | 1 | 2 | 'px' | 'auto' | `${number}%` } & {
  [K in FontSizeKeys]?: 'sm' | 'md' | number;
} & { [K in FontWeightKeys]?: 'bold' | TextStyle['fontWeight'] } & {
  [K in LineHeightKeys]?: 'short' | number;
} & { [K in LetterSpacingKeys]?: 'wide' | number } & {
  [K in ZIndexKeys]?: 'modal' | number;
} & { shadow?: 'sm' };

type TextVariant = (
  override?: TokenizeStyle<TextStyle, StyleProps>,
) => TextStyle;

type Schema = {
  style: StyleProps;
  textVariants: { title: { md: TextVariant }; caption: TextVariant };
  tokens: { colors: { white: '#ffffff' } };
  semanticTokens: {
    colors: { fg: { default: string }; bg: { default: string } };
    text: Record<string, never>;
  };
};

declare const { themed, tokens, semanticTokens }: UseThemedResult<Schema>;

const view = themed.view({ backgroundColor: 'bg.default', padding: 2 });
const text = themed.text({ color: 'fg.default', fontSize: 'md' });
const image = themed.image({ tintColor: 'fg.default', borderRadius: 'md' });
const fg = semanticTokens.colors.fg.default;

// ---------------------------------------------------------------------------
// 1. `style`-like props of every component
// ---------------------------------------------------------------------------

export function Components() {
  const data = [{ key: 'a' }];
  const sections = [{ title: 's', data }];

  return (
    <>
      {/* View-styled */}
      <View style={view} />
      <View style={[view, { width: 10 }, false, null]} />
      <SafeAreaView style={view} />
      <KeyboardAvoidingView style={view} contentContainerStyle={view} />
      <ScrollView style={view} contentContainerStyle={view} />
      <FlatList
        data={data}
        renderItem={() => null}
        style={view}
        contentContainerStyle={view}
        columnWrapperStyle={view}
        numColumns={2}
        ListHeaderComponentStyle={view}
        ListFooterComponentStyle={view}
      />
      <SectionList
        sections={sections}
        renderItem={() => null}
        style={view}
        contentContainerStyle={view}
        ListHeaderComponentStyle={view}
        ListFooterComponentStyle={view}
      />
      <VirtualizedList
        data={data}
        getItem={(d, i) => d[i]}
        getItemCount={(d) => d.length}
        renderItem={() => null}
        style={view}
        contentContainerStyle={view}
      />
      <Pressable style={view} />
      <Pressable style={({ pressed }) => [view, pressed && { opacity: 0.5 }]} />
      <TouchableOpacity style={view} />
      <TouchableHighlight style={view}>
        <View />
      </TouchableHighlight>
      <TouchableWithoutFeedback style={view}>
        <View />
      </TouchableWithoutFeedback>
      <TouchableNativeFeedback style={view}>
        <View />
      </TouchableNativeFeedback>
      <Switch style={view} />
      <ActivityIndicator style={view} />
      <ProgressBarAndroid style={view} />
      <RefreshControl refreshing={false} style={view} />
      <Modal style={view} />
      <InputAccessoryView style={view} />
      <DrawerLayoutAndroid renderNavigationView={() => <View />} style={view} />

      {/* Text-styled */}
      <Text style={text} />
      <Text style={themed.text.title.md()} />
      <Text style={themed.text.caption({ color: 'fg.default' })} />
      <Text style={[text, { textAlign: 'center' }]} />
      <Text style={view} />
      <TextInput style={text} />

      {/* Image-styled */}
      <Image source={{ uri: '' }} style={image} />
      <ImageBackground source={{ uri: '' }} style={view} imageStyle={image} />

      {/* Animated wrappers accept the same resolved styles */}
      <Animated.View style={view} />
      <Animated.Text style={text} />
      <Animated.Image source={{ uri: '' }} style={image} />
      <Animated.ScrollView style={view} contentContainerStyle={view} />
      <Animated.FlatList data={data} renderItem={() => null} style={view} />
      <Animated.SectionList
        sections={sections}
        renderItem={() => null}
        style={view}
      />

      {/* An Image needs themed.image(): ViewStyle's `overflow: 'scroll'` is
          not an ImageStyle. */}
      {/* @ts-expect-error -- use themed.image() for Image */}
      <Image source={{ uri: '' }} style={view} />
    </>
  );
}

// ---------------------------------------------------------------------------
// 2. Color props outside `style`: pass a resolved semantic color
// ---------------------------------------------------------------------------

export function ColorProps() {
  return (
    <>
      <ActivityIndicator color={fg} />
      <Button title="" onPress={() => {}} color={fg} />
      <Text selectionColor={fg} />
      <TextInput
        placeholderTextColor={fg}
        selectionColor={fg}
        selectionHandleColor={fg}
        cursorColor={fg}
        underlineColorAndroid={fg}
      />
      <Image source={{ uri: '' }} tintColor={fg} />
      <Switch
        trackColor={{ false: fg, true: fg }}
        thumbColor={fg}
        ios_backgroundColor={fg}
      />
      <RefreshControl
        refreshing={false}
        tintColor={fg}
        titleColor={fg}
        colors={[fg]}
        progressBackgroundColor={fg}
      />
      <TouchableHighlight underlayColor={fg}>
        <View />
      </TouchableHighlight>
      <ScrollView endFillColor={fg} />
      <StatusBar backgroundColor={fg} />
      <Modal backdropColor={fg} />
      <InputAccessoryView backgroundColor={fg} />
      <DrawerLayoutAndroid
        renderNavigationView={() => <View />}
        drawerBackgroundColor={fg}
        statusBarBackgroundColor={fg}
      />
      <ProgressBarAndroid color={fg} />
      <View style={{ backgroundColor: tokens.colors.white }} />
    </>
  );
}

// ---------------------------------------------------------------------------
// 3. Token-aware inputs
// ---------------------------------------------------------------------------

themed.view({ shadow: 'sm', borderTopStartRadius: 'sm', gap: 'px' });
themed.text({ shadow: 'sm', lineHeight: 'short', letterSpacing: 'wide' });
themed.image({ shadow: 'sm', backgroundColor: 'bg.default' });
themed.view({ zIndex: 'modal' });
themed.view({ zIndex: 10 });
themed.view({ paddingBlock: 1, marginInlineEnd: 'auto' });
themed.view({ borderBlockStartColor: 'border.default' });
themed.text({
  textShadowColor: 'fg.default',
  textDecorationColor: 'fg.default',
});
themed.image({ overlayColor: 'bg.default' });
// Primitive colors are color tokens too.
themed.view({ backgroundColor: 'white' });

// @ts-expect-error -- colors are token-only
themed.view({ backgroundColor: '#fff' });
// @ts-expect-error -- `color` is not a View style
themed.view({ color: 'fg.default' });
// @ts-expect-error -- `tintColor` is not a View style
themed.view({ tintColor: 'fg.default' });
// @ts-expect-error -- `fontSize` is not a View style
themed.view({ fontSize: 'md' });
// @ts-expect-error -- `color` is not an Image style
themed.image({ color: 'fg.default' });
// @ts-expect-error -- unknown zIndex token
themed.view({ zIndex: 'toast' });
// @ts-expect-error -- `textShadowColor` is not a View style
themed.view({ textShadowColor: 'fg.default' });
// @ts-expect-error -- logical spacing is token-only
themed.view({ paddingBlock: 12 });
// @ts-expect-error -- typo in a style prop
themed.view({ backgroundColour: 'bg.default' });

// ---------------------------------------------------------------------------
// 4. Coverage against React Native's style types
// ---------------------------------------------------------------------------

type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
    ? true
    : false;
type Expect<T extends true> = T;

/** Style props of `S` whose value type is a color. */
type ColorProp<S> = {
  [K in keyof S]-?: [ColorValue] extends [NonNullable<S[K]>] ? K : never;
}[keyof S];
type AnyColorProp =
  | ColorProp<ViewStyle>
  | ColorProp<TextStyle>
  | ColorProp<ImageStyle>;

type AnyStyleKey = keyof ViewStyle | keyof TextStyle | keyof ImageStyle;
type RadiusProp = Extract<
  Exclude<AnyStyleKey, 'shadowRadius' | 'textShadowRadius'>,
  `${string}Radius`
>;
type SpacingProp = Extract<
  AnyStyleKey,
  `margin${string}` | `padding${string}` | `${string}Gap` | 'gap'
>;

/**
 * Every React Native style prop that takes a color / radius / spacing value
 * is token-aware. A new RN prop of those kinds (or a typo in
 * `style-props.ts`) fails here. Positional props (`top`, `inset*`, …) are
 * deliberately not spacing tokens, so they are not matched above.
 */
export type Coverage = [
  Expect<Equal<Exclude<AnyColorProp, ColorKeys>, never>>,
  Expect<Equal<Exclude<RadiusProp, RadiusKeys>, never>>,
  Expect<Equal<Exclude<SpacingProp, SpacingKeys>, never>>,
  // Every token key is a real React Native style prop (no typos).
  Expect<
    Equal<
      Exclude<ColorKeys | RadiusKeys | SpacingKeys | ZIndexKeys, AnyStyleKey>,
      never
    >
  >,
];
