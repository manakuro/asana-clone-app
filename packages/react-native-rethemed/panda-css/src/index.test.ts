import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { preset } from '@pandacss/preset-panda';
import { codegen } from '@react-native-rethemed/cli/src/codegen';
import { validateTheme } from '@react-native-rethemed/cli/src/validate';
import { extendTheme } from '@react-native-rethemed/core/config';
import { describe, expect, it } from 'vitest';
import {
  convertPreset,
  convertShadow,
  EXCLUDED_CATEGORIES,
  toHex,
  toPoints,
  toRatio,
} from '../scripts/convert';
import {
  colors,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  pandaCssTheme,
  radii,
  shadows,
  spacing,
} from './index';

describe('tokens.gen.ts', () => {
  it('matches the installed @pandacss/preset-panda (run `pnpm generate` if not)', () => {
    expect(convertPreset(preset)).toEqual({
      colors,
      radii,
      spacing,
      fontSizes,
      fontWeights,
      lineHeights,
      letterSpacings,
      shadows,
    });
  });

  it('covers every Panda token category except the excluded ones', () => {
    const converted = new Set([
      'colors',
      'radii',
      'spacing',
      'fontSizes',
      'fontWeights',
      'lineHeights',
      'letterSpacings',
      'shadows',
    ]);
    const categories = Object.keys(preset.theme?.tokens ?? {});
    expect(
      categories.filter(
        (c) =>
          !converted.has(c) &&
          !(EXCLUDED_CATEGORIES as readonly string[]).includes(c),
      ),
    ).toEqual([]);
  });
});

describe('pandaCssTheme', () => {
  it('has no semantic tokens, like the Panda preset', () => {
    expect(preset.theme).not.toHaveProperty('semanticTokens');
    expect(pandaCssTheme).not.toHaveProperty('semanticTokens');
  });

  it('passes CLI validation on its own', () => {
    expect(validateTheme(pandaCssTheme)).toEqual([]);
  });

  it('passes CLI validation with app-defined semantic colors', () => {
    const config = extendTheme(pandaCssTheme, {
      semanticTokens: {
        colors: {
          bg: {
            default: { light: colors.white, dark: colors['zinc.950'] },
          },
          fg: {
            default: { light: colors['zinc.900'], dark: colors['zinc.50'] },
          },
        },
      },
    });
    expect(validateTheme(config)).toEqual([]);
  });

  it('generates types and docs with the CLI', async () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'rn-rethemed-panda-'));
    const outFile = path.join(dir, 'themed.gen.ts');
    const docsFile = path.join(dir, 'themed.md');
    const result = await codegen({
      themeFile: path.join(import.meta.dirname, 'index.ts'),
      exportName: 'pandaCssTheme',
      outFile,
      docsFile,
    });
    expect(result.counts).toMatchObject({
      colors: 0,
      primitiveColors: 289,
      radii: 9,
      spacing: 36,
      shadows: 7,
      textPresets: 0,
    });
    expect(readFileSync(outFile, 'utf8')).toContain("'4xl'");
    const docs = readFileSync(docsFile, 'utf8');
    // The palette is rendered as a hue × shade grid.
    expect(docs).toContain(
      '| hue | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |',
    );
    expect(docs).toMatch(/\| `red` \| #fef2f2 \|[^\n]* \| #fb2c36 \|/);
  });

  it('has an up-to-date example (run `pnpm example:codegen` if not)', async () => {
    const example = path.join(import.meta.dirname, '../example');
    const result = await codegen({
      themeFile: path.join(example, 'theme.ts'),
      exportName: 'themeConfig',
      docsFile: path.join(example, 'themed.md'),
    });
    expect(result.changed).toBe(false);
    expect(result.docs?.changed).toBe(false);
  });
});

describe('colors', () => {
  it('converts oklch to the same hex as Tailwind', () => {
    expect(colors['red.500']).toBe('#fb2c36');
    expect(colors['blue.500']).toBe('#2b7fff');
    expect(colors.black).toBe('#000000');
    expect(colors.white).toBe('#ffffff');
  });

  it('keeps transparent as 8-digit hex and drops currentcolor', () => {
    expect(colors.transparent).toBe('#00000000');
    expect(colors).not.toHaveProperty('current');
  });

  it('includes 11 shades for every hue', () => {
    const hues = Object.keys(colors)
      .filter((k) => k.includes('.'))
      .map((k) => k.split('.')[0]);
    const counts = Object.values(
      hues.reduce<Record<string, number>>((acc, hue) => {
        acc[hue] = (acc[hue] ?? 0) + 1;
        return acc;
      }, {}),
    );
    expect(counts.length).toBe(26);
    expect(new Set(counts)).toEqual(new Set([11]));
  });

  it('only contains valid hex values', () => {
    for (const value of Object.values(colors)) {
      expect(value).toMatch(/^#([0-9a-f]{6}|[0-9a-f]{8})$/);
    }
  });

  it('gamut-maps colors outside sRGB instead of failing', () => {
    expect(toHex('oklch(70% 0.4 150)')).toMatch(/^#[0-9a-f]{6}$/);
  });
});

describe('scales', () => {
  it('converts rem and em to points at 16px', () => {
    expect(spacing[4.5]).toBe(18);
    expect(spacing[5.5]).toBe(22);
    expect(fontSizes['2xs']).toBe(8);
    expect(radii.full).toBe(9999);
    expect(letterSpacings.tight).toBe(-0.4);
    expect(letterSpacings.widest).toBe(1.6);
  });

  it('keeps line heights as ratios', () => {
    expect(lineHeights.snug).toBe(1.375);
  });

  it('parses lengths and ratios', () => {
    expect(toPoints('0rem')).toBe(0);
    expect(toPoints('0.125rem')).toBe(2);
    expect(toPoints('1px')).toBe(1);
    expect(toRatio('1.375')).toBe(1.375);
    expect(() => toRatio('calc(1 / 0.75)')).toThrow('unsupported line height');
    expect(() => toPoints('60ch')).toThrow('unsupported length');
  });
});

describe('shadows', () => {
  it('uses the first layer and halves the CSS blur', () => {
    expect(shadows.md).toEqual({
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 4,
    });
  });

  it('drops inset shadows', () => {
    expect(Object.keys(shadows)).toEqual([
      '2xs',
      'xs',
      'sm',
      'md',
      'lg',
      'xl',
      '2xl',
    ]);
    expect(
      convertShadow('inner', 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)'),
    ).toBeUndefined();
  });

  it('fails loudly for a new shadow without an elevation', () => {
    expect(() => convertShadow('3xl', '0 1px 2px rgb(0 0 0 / 0.1)')).toThrow(
      "no elevation defined for shadow '3xl'",
    );
  });
});
