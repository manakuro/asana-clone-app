import path from 'node:path';
import { codegen } from '@react-native-rethemed/cli/src/codegen';
import { validateTheme } from '@react-native-rethemed/cli/src/validate';
import { describe, expect, it } from 'vitest';
import { materialDesignTheme, spacing } from './index';

describe('materialDesignTheme', () => {
  it('passes CLI validation', () => {
    expect(validateTheme(materialDesignTheme)).toEqual([]);
  });

  it('keys spacing by dp: the M3 nested units plus the 8dp grid', () => {
    expect(Object.entries(spacing).map(([k, v]) => [Number(k), v])).toEqual(
      [0, 2, 4, 6, 8, 10, 16, 24, 32, 40, 48, 56, 64, 72].map((dp) => [dp, dp]),
    );
  });

  it('has an up-to-date example (run `pnpm example:codegen` if not)', async () => {
    const example = path.join(import.meta.dirname, '../example');
    const result = await codegen({
      themeFile: path.join(example, 'theme.ts'),
      exportName: 'themeConfig',
      docsFile: path.join(example, 'themed.md'),
    });
    expect(result.warnings).toEqual([]);
    expect(result.changed).toBe(false);
    expect(result.docs?.changed).toBe(false);
  });
});
