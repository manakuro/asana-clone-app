import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import type { ThemeConfig } from '@react-native-themed/core/config';
import { generate } from './generate';
import { loadTheme } from './load-theme';
import { validateTheme } from './validate';

export type CodegenOptions = {
  /** Theme file, absolute or relative to `cwd`. */
  themeFile: string;
  /** Output file. Defaults to `themed.gen.ts` next to the theme file. */
  outFile?: string;
  /** Export holding the config. Auto-detected when omitted. */
  exportName?: string;
  /** Core module specifier used by the generated file. */
  coreSpecifier?: string;
  cwd?: string;
};

export type TokenCounts = {
  colors: number;
  radii: number;
  spacing: number;
  fontSizes: number;
  fontWeights: number;
  lineHeights: number;
  letterSpacings: number;
  shadows: number;
  textPresets: number;
};

export type CodegenResult = {
  themeFile: string;
  exportName: string;
  outFile: string;
  counts: TokenCounts;
  /** `false` when the output was already up to date (nothing written). */
  changed: boolean;
};

/** Which step failed, so the CLI can say where things went wrong. */
export type CodegenStage = 'load' | 'validate' | 'write';

export class CodegenError extends Error {
  constructor(
    readonly stage: CodegenStage,
    message: string,
    readonly details: string[] = [],
  ) {
    super(message);
    this.name = 'CodegenError';
  }
}

/**
 * Progress callbacks, fired as each step completes. The CLI renders them;
 * tests and programmatic callers can ignore them and use the result.
 */
export type CodegenReporter = {
  loaded?: (info: { themeFile: string; exportName: string }) => void;
  validated?: (counts: TokenCounts) => void;
  written?: (info: { outFile: string; changed: boolean }) => void;
};

const size = (table: object | undefined) => Object.keys(table ?? {}).length;

export function countTokens(config: ThemeConfig): TokenCounts {
  const tokens = config.tokens ?? {};
  const nested = (table: Record<string, object> | undefined) =>
    Object.values(table ?? {}).reduce((sum, inner) => sum + size(inner), 0);

  return {
    colors: nested(config.semanticTokens?.colors),
    radii: size(tokens.radii),
    spacing: size(tokens.spacing),
    fontSizes: size(tokens.fontSizes),
    fontWeights: size(tokens.fontWeights),
    lineHeights: size(tokens.lineHeights),
    letterSpacings: size(tokens.letterSpacings),
    shadows: size(tokens.shadows),
    textPresets: nested(config.semanticTokens?.text),
  };
}

/** `./theme` style specifier from the output file to the theme file. */
function importSpecifier(fromFile: string, toFile: string): string {
  const rel = path
    .relative(path.dirname(fromFile), toFile)
    .split(path.sep)
    .join('/')
    .replace(/\.[cm]?[jt]sx?$/, '');
  return rel.startsWith('.') ? rel : `./${rel}`;
}

/**
 * Load → validate → generate → write. Throws `CodegenError` tagged with the
 * failing stage. Skips the write when the output is already identical, so
 * Metro/tsc watchers don't churn.
 */
export async function codegen(
  options: CodegenOptions,
  reporter: CodegenReporter = {},
): Promise<CodegenResult> {
  const cwd = options.cwd ?? process.cwd();
  const themeFile = path.resolve(cwd, options.themeFile);
  const outFile = path.resolve(
    cwd,
    options.outFile ?? path.join(path.dirname(themeFile), 'themed.gen.ts'),
  );

  // --- load -----------------------------------------------------------------
  if (!existsSync(themeFile)) {
    throw new CodegenError('load', `${options.themeFile} not found`);
  }
  let loaded: Awaited<ReturnType<typeof loadTheme>>;
  try {
    loaded = await loadTheme(themeFile, options.exportName);
  } catch (error) {
    throw new CodegenError(
      'load',
      error instanceof Error ? error.message : String(error),
    );
  }
  const { config, exportName } = loaded;
  reporter.loaded?.({ themeFile, exportName });

  // --- validate -------------------------------------------------------------
  const problems = validateTheme(config);
  if (problems.length > 0) {
    throw new CodegenError('validate', 'Invalid theme config', problems);
  }
  const counts = countTokens(config);
  reporter.validated?.(counts);

  // --- generate & write -----------------------------------------------------
  const source = generate({
    config,
    themeImport: { specifier: importSpecifier(outFile, themeFile), exportName },
    coreSpecifier: options.coreSpecifier,
    command: `react-native-themed codegen ${path
      .relative(cwd, themeFile)
      .split(path.sep)
      .join('/')}`,
  });

  const current = existsSync(outFile) ? readFileSync(outFile, 'utf8') : null;
  const changed = current !== source;
  if (changed) {
    try {
      writeFileSync(outFile, source);
    } catch (error) {
      throw new CodegenError(
        'write',
        error instanceof Error ? error.message : String(error),
      );
    }
  }
  reporter.written?.({ outFile, changed });

  return { themeFile, exportName, outFile, counts, changed };
}
