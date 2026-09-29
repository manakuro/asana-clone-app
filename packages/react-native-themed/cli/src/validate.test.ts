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

  it('accepts presets at any depth', () => {
    expect(
      validateTheme({
        tokens: { fontSizes: { xs: 12 } },
        semanticTokens: {
          text: {
            caption: { fontSize: 'xs' },
            heading: { display: { lg: { fontSize: 57 } } },
          },
        },
      }),
    ).toEqual([]);
  });

  it('rejects nodes mixing preset fields with groups', () => {
    expect(
      validateTheme({
        semanticTokens: {
          text: { title: { fontSize: 16, md: { fontSize: 14 } } },
        },
      }),
    ).toEqual([
      'semanticTokens.text.title: mixes preset fields (fontSize) with groups (md)',
    ]);
  });

  it('rejects unknown preset fields and empty nodes', () => {
    expect(
      validateTheme({
        semanticTokens: {
          // @ts-expect-error -- typo on purpose
          text: { body: { md: { fontsize: 14 } }, caption: {} },
        },
      }),
    ).toEqual([
      'semanticTokens.text.body.md.fontsize: unknown preset field (expected fontSize, lineHeight, letterSpacing, fontWeight)',
      'semanticTokens.text.caption: is empty',
    ]);
  });

  it('rejects top-level names that collide with function properties', () => {
    expect(
      validateTheme({
        semanticTokens: { text: { name: { fontSize: 14 } } },
      }),
    ).toEqual([
      "semanticTokens.text.name: 'name' is reserved (it collides with a function property of themed.text)",
    ]);
  });
});
