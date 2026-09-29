import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { generate } from './generate';
import { loadTheme } from './load-theme';
import { validateTheme } from './validate';

const USAGE = `Usage: react-native-themed typegen <theme-file> [options]

Generates typed \`themed\` bindings (themed.gen.ts) from a theme config.

Options:
  -o, --out <file>      Output file (default: <theme-dir>/themed.gen.ts)
  -e, --export <name>   Export holding the config (default: the default
                        export, or the only ThemeConfig-looking export)
      --core <module>   Core module specifier used by the generated file
                        (default: @react-native-themed/core)
  -h, --help            Show this help`;

/** `./theme` style specifier from the output file to the theme file. */
function importSpecifier(fromFile: string, toFile: string): string {
  const rel = path
    .relative(path.dirname(fromFile), toFile)
    .split(path.sep)
    .join('/')
    .replace(/\.[cm]?[jt]sx?$/, '');
  return rel.startsWith('.') ? rel : `./${rel}`;
}

async function typegen(args: string[]): Promise<void> {
  const { values, positionals } = parseArgs({
    args,
    allowPositionals: true,
    options: {
      out: { type: 'string', short: 'o' },
      export: { type: 'string', short: 'e' },
      core: { type: 'string' },
      help: { type: 'boolean', short: 'h' },
    },
  });

  if (values.help || positionals.length !== 1) {
    console.log(USAGE);
    if (!values.help) process.exitCode = 1;
    return;
  }

  const themeFile = path.resolve(positionals[0]);
  if (!existsSync(themeFile)) throw new Error(`Not found: ${themeFile}`);
  const outFile = path.resolve(
    values.out ?? path.join(path.dirname(themeFile), 'themed.gen.ts'),
  );

  const { config, exportName } = await loadTheme(themeFile, values.export);

  const problems = validateTheme(config);
  if (problems.length > 0) {
    throw new Error(
      `Invalid theme config:\n${problems.map((p) => `  - ${p}`).join('\n')}`,
    );
  }

  const source = generate({
    config,
    themeImport: {
      specifier: importSpecifier(outFile, themeFile),
      exportName,
    },
    coreSpecifier: values.core,
    command: `react-native-themed typegen ${path.relative(process.cwd(), themeFile)}`,
  });

  // Skip identical writes so Metro/tsc watchers don't churn.
  const current = existsSync(outFile) ? readFileSync(outFile, 'utf8') : null;
  const rel = path.relative(process.cwd(), outFile);
  if (current === source) {
    console.log(`react-native-themed: ${rel} is up to date`);
    return;
  }
  writeFileSync(outFile, source);
  console.log(`react-native-themed: wrote ${rel}`);
}

export async function main(argv: string[]): Promise<void> {
  const [command, ...rest] = argv;
  try {
    switch (command) {
      case 'typegen':
        await typegen(rest);
        break;
      default:
        console.log(USAGE);
        process.exitCode = command ? 1 : 0;
    }
  } catch (error) {
    console.error(
      `react-native-themed: ${error instanceof Error ? error.message : error}`,
    );
    process.exitCode = 1;
  }
}
