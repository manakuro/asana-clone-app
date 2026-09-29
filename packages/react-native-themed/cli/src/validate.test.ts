import { describe, expect, it } from 'vitest';
import { themeConfig } from './__fixtures__/theme';
import { validateTheme } from './validate';

describe('validateTheme', () => {
  it('accepts a consistent config', () => {
    expect(validateTheme(themeConfig)).toEqual([]);
  });

  it('rejects text presets referencing undefined scale keys', () => {
    expect(
      validateTheme({
        tokens: { fontSizes: { md: 16 } },
        semanticTokens: {
          text: {
            title: { md: { fontSize: 'nope', lineHeight: 'short' } },
          },
        },
      }),
    ).toEqual([
      "semanticTokens.text.title.md.fontSize: 'nope' is not a key of tokens.fontSizes",
      "semanticTokens.text.title.md.lineHeight: 'short' is not a key of tokens.lineHeights (tokens.lineHeights is not defined)",
    ]);
  });

  it('accepts raw RN font weights without a fontWeights scale', () => {
    expect(
      validateTheme({
        semanticTokens: { text: { title: { md: { fontWeight: 'bold' } } } },
      }),
    ).toEqual([]);
  });

  it('rejects semantic colors missing a scheme', () => {
    expect(
      validateTheme({
        semanticTokens: {
          // @ts-expect-error -- missing `dark` on purpose
          colors: { fg: { default: { light: '#000' } } },
        },
      }),
    ).toEqual([
      "semanticTokens.colors.fg.default: must define both 'light' and 'dark' strings",
    ]);
  });

  it('rejects a defaults.fontSize that is not a fontSizes key', () => {
    expect(
      validateTheme({
        tokens: { fontSizes: { md: 16 } },
        defaults: { fontSize: 'base' },
      }),
    ).toEqual(["defaults.fontSize: 'base' is not a key of tokens.fontSizes"]);
    expect(
      validateTheme({
        tokens: { fontSizes: { md: 16 } },
        defaults: { fontSize: 'md' },
      }),
    ).toEqual([]);
  });
});
