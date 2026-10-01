import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { formatCounts } from './cli';
import { CodegenError, codegen } from './codegen';

const fixtureTheme = path.join(import.meta.dirname, '__fixtures__/theme.ts');
const tmpOut = () =>
  path.join(mkdtempSync(path.join(tmpdir(), 'rn-themed-')), 'themed.gen.ts');

describe('codegen', () => {
  it('reports each step and returns what it did', async () => {
    const outFile = tmpOut();
    const events: string[] = [];

    const result = await codegen(
      { themeFile: fixtureTheme, outFile },
      {
        loaded: ({ exportName }) => events.push(`loaded:${exportName}`),
        validated: (c) => events.push(`validated:${c.colors}`),
        written: ({ changed }) => events.push(`written:${changed}`),
      },
    );

    expect(events).toEqual([
      'loaded:themeConfig',
      'validated:4',
      'written:true',
    ]);
    expect(result).toMatchObject({
      exportName: 'themeConfig',
      outFile,
      changed: true,
      counts: {
        colors: 4,
        radii: 3,
        spacing: 6,
        fontSizes: 3,
        fontWeights: 2,
        lineHeights: 2,
        letterSpacings: 2,
        shadows: 1,
        textPresets: 6,
      },
    });
    expect(readFileSync(outFile, 'utf8')).toContain(
      'createThemed<ThemedTypes>(themeConfig);',
    );
  });

  it('also writes the docs when requested', async () => {
    const outFile = tmpOut();
    const docsFile = path.join(path.dirname(outFile), 'docs/themed.md');
    const events: string[] = [];

    const result = await codegen(
      { themeFile: fixtureTheme, outFile, docsFile },
      { docsWritten: ({ changed }) => events.push(`docs:${changed}`) },
    );

    expect(events).toEqual(['docs:true']);
    expect(result.docs).toEqual({ file: docsFile, changed: true });
    expect(readFileSync(docsFile, 'utf8')).toContain('# Theme tokens');
    expect(readFileSync(outFile, 'utf8')).toMatch(/--docs .*docs\/themed\.md/);

    const again = await codegen({ themeFile: fixtureTheme, outFile, docsFile });
    expect(again.docs?.changed).toBe(false);
  });

  it('writes no docs unless asked', async () => {
    const result = await codegen({
      themeFile: fixtureTheme,
      outFile: tmpOut(),
    });
    expect(result.docs).toBeUndefined();
  });

  it('skips the write when the output is already up to date', async () => {
    const outFile = tmpOut();
    await codegen({ themeFile: fixtureTheme, outFile });
    const second = await codegen({ themeFile: fixtureTheme, outFile });
    expect(second.changed).toBe(false);
  });

  it('tags a missing theme file as a load failure', async () => {
    await expect(
      codegen({ themeFile: 'does-not-exist.ts', outFile: tmpOut() }),
    ).rejects.toMatchObject({ stage: 'load' });
  });

  it('tags an invalid theme as a validation failure with details', async () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'rn-themed-'));
    const themeFile = path.join(dir, 'theme.ts');
    writeFileSync(
      themeFile,
      `export default { tokens: { fontSizes: { md: 16 } }, semanticTokens: { text: { title: { md: { fontSize: 'nope' } } } } };`,
    );

    const error = await codegen({ themeFile }).catch((e: unknown) => e);
    expect(error).toBeInstanceOf(CodegenError);
    expect(error).toMatchObject({
      stage: 'validate',
      details: [
        "semanticTokens.text.title.md.fontSize: 'nope' is not a key of tokens.fontSizes",
      ],
    });
  });
});

describe('formatCounts', () => {
  it('lists non-empty categories', () => {
    expect(
      formatCounts({
        colors: 54,
        primitiveColors: 123,
        radii: 11,
        spacing: 35,
        fontSizes: 14,
        fontWeights: 9,
        lineHeights: 5,
        letterSpacings: 5,
        shadows: 0,
        textPresets: 15,
      }),
    ).toBe(
      '54 semantic colors · 123 primitive colors · 11 radii · 35 spacing · 15 text presets',
    );
  });
});

describe('codegen warnings', () => {
  it('warns about a semantic color shadowing a primitive, but still writes', async () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'rn-themed-'));
    const themeFile = path.join(dir, 'theme.ts');
    writeFileSync(
      themeFile,
      `export default {
        tokens: { colors: { 'red.500': '#ef4444' } },
        semanticTokens: {
          colors: { red: { 500: { light: '#f00', dark: '#f88' } } },
        },
      };`,
    );
    const warned: string[][] = [];
    const result = await codegen(
      { themeFile },
      { warned: (w) => warned.push(w) },
    );
    const expected = [
      "'red.500' is both a semantic color and a primitive color (tokens.colors); color props resolve it to the semantic color",
    ];
    expect(result.warnings).toEqual(expected);
    expect(warned).toEqual([expected]);
    expect(result.changed).toBe(true);
  });

  it('does not report when there is nothing to warn about', async () => {
    const warned: string[][] = [];
    const result = await codegen(
      { themeFile: fixtureTheme, outFile: tmpOut() },
      { warned: (w) => warned.push(w) },
    );
    expect(result.warnings).toEqual([]);
    expect(warned).toEqual([]);
  });
});
