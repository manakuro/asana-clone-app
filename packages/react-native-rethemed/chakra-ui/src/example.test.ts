import path from 'node:path';
import { codegen } from '@react-native-rethemed/cli/src/codegen';
import { validateTheme } from '@react-native-rethemed/cli/src/validate';
import { describe, expect, it } from 'vitest';
import { chakraUiTheme } from './index';

describe('chakraUiTheme', () => {
  it('passes CLI validation', () => {
    expect(validateTheme(chakraUiTheme)).toEqual([]);
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
