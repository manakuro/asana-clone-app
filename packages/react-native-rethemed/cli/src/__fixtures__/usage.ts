/**
 * Type-level tests for the generated fixture (checked by `tsc`, not run).
 * Every `@ts-expect-error` must actually fail, so a regression in either the
 * generator or core's `TokenizeStyle` breaks `pnpm tsc`.
 */
import type { TextStyle, ViewStyle } from 'react-native';
import { useThemed } from './themed.gen';

export function usage() {
  const { themed, tokens, semanticTokens } = useThemed();

  // --- accepted ---
  const view: ViewStyle = themed.view({
    backgroundColor: 'bg.default',
    borderRadius: 'md',
    padding: 4,
    marginHorizontal: 0.5,
    gap: 'px',
    shadow: 'sm',
    flex: 1,
  });
  themed.view({ padding: 'auto', margin: '10%' });
  themed.view({ zIndex: 'modal' });
  themed.view({ zIndex: 3, paddingBlock: 1, borderBlockColor: 'fg.muted' });
  themed.text({ textShadowColor: 'fg.muted' });
  const text: TextStyle = themed.text({
    color: 'fg.muted',
    fontSize: 'lg',
    fontWeight: 'semibold',
    lineHeight: 'short',
    letterSpacing: 'wide',
  });
  themed.text({ fontSize: 13, fontWeight: '300', lineHeight: 20 });
  themed.text();
  themed.text.title.md();
  themed.text.body.md({ color: 'fg.default' });
  themed.text.caption();
  themed.text.heading.display.lg({ color: 'fg.muted' });
  themed.text.heading.page();
  themed.image({ tintColor: 'fg.default', borderRadius: 'full' });
  // primitive colors are color tokens too (fixed in every scheme)
  themed.view({ backgroundColor: 'gray.950', borderColor: 'white' });

  const white: '#ffffff' = tokens.colors.white;
  const md: 16 = tokens.fontSizes.md;
  const fg: string = semanticTokens.colors.fg.default;
  const preset: 'md' = semanticTokens.text.title.md.fontSize;
  // preset colors are resolved for the current scheme
  const captionColor: '#71717a' | '#a1a1aa' = semanticTokens.text.caption.color;
  const pageColor: '#fafafa' | undefined =
    semanticTokens.text.heading.page.color;

  // --- rejected ---
  // @ts-expect-error unknown color token
  themed.view({ backgroundColor: 'bg.unknown' });
  // @ts-expect-error colors are token-only
  themed.view({ backgroundColor: '#fff' });
  // @ts-expect-error unknown spacing token
  themed.view({ padding: 3 });
  // @ts-expect-error unknown radius token
  themed.view({ borderRadius: 'xl' });
  // @ts-expect-error `color` is not a View style
  themed.view({ color: 'fg.default' });
  // @ts-expect-error unknown zIndex token
  themed.view({ zIndex: 'toast' });
  // @ts-expect-error unknown shadow preset
  themed.view({ shadow: 'xl' });
  // @ts-expect-error typo in a style prop
  themed.view({ backgroundColour: 'bg.default' });
  // @ts-expect-error unknown size
  themed.text.title.lg();
  // @ts-expect-error unknown role
  themed.text.display;
  // @ts-expect-error a group is not callable
  themed.text.heading();
  // @ts-expect-error unknown nested preset
  themed.text.heading.display.sm();
  // @ts-expect-error unknown primitive token
  tokens.colors.black;
  // @ts-expect-error unknown semantic color group
  semanticTokens.colors.border;

  return { view, text, white, md, fg, preset, captionColor, pageColor };
}
