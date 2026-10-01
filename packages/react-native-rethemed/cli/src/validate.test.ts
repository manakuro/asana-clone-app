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
      'semanticTokens.text.body.md.fontsize: unknown preset field (expected fontSize, lineHeight, letterSpacing, fontWeight, color)',
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

  it('accepts preset colors as a string or per scheme', () => {
    expect(
      validateTheme({
        semanticTokens: {
          text: {
            caption: { fontSize: 12, color: { light: '#111', dark: '#fff' } },
            onDark: { color: { dark: '#fff' } },
            fixed: { fontSize: 12, color: '#777' },
          },
        },
      }),
    ).toEqual([]);
  });

  it('rejects malformed preset colors', () => {
    const shape =
      "must be a color string or { light?, dark? } (preset field names such as 'color' can't name a group or preset)";
    expect(
      validateTheme({
        semanticTokens: {
          text: {
            a: { fontSize: 12, color: {} },
            // @ts-expect-error -- `dim` is not a scheme
            b: { fontSize: 12, color: { light: '#111', dim: '#222' } },
            // @ts-expect-error -- not a color
            c: { fontSize: 12, color: 3 },
          },
        },
      }),
    ).toEqual([
      `semanticTokens.text.a.color: ${shape}`,
      `semanticTokens.text.b.color: ${shape}`,
      `semanticTokens.text.c.color: ${shape}`,
    ]);
  });

  it('rejects a group or preset named like a preset field', () => {
    const problems = validateTheme({
      semanticTokens: {
        text: { brand: { color: { fontSize: 12 }, md: { fontSize: 14 } } },
      },
    });
    expect(problems).toEqual([
      'semanticTokens.text.brand: mixes preset fields (color) with groups (md)',
    ]);
  });
});
