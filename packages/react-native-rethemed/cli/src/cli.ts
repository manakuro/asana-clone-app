import path from 'node:path';
import { parseArgs, styleText } from 'node:util';
import * as p from '@clack/prompts';
import { CodegenError, codegen, type TokenCounts } from './codegen';

const USAGE = `Usage: react-native-rethemed codegen <theme-file> [options]

Generates typed \`themed\` bindings (themed.gen.ts) from a theme config.

Options:
  -o, --out <file>      Output file (default: <theme-dir>/themed.gen.ts)
  -d, --docs <file>     Also write a Markdown token reference for AI
                        agents and humans (e.g. docs/themed.md)
  -e, --export <name>   Export holding the config (default: the default
                        export, or the only ThemeConfig-looking export)
      --core <module>   Core module specifier used by the generated file
                        (default: @react-native-rethemed/core)
  -h, --help            Show this help`;

const dim = (text: string) => styleText('dim', text);

/** Paths as the user typed them: relative to where the command ran. */
const display = (file: string) =>
  path.relative(process.cwd(), file).split(path.sep).join('/');

const COUNT_LABELS: [keyof TokenCounts, string][] = [
  ['colors', 'semantic colors'],
  ['primitiveColors', 'primitive colors'],
  ['radii', 'radii'],
  ['spacing', 'spacing'],
  ['shadows', 'shadows'],
  ['textPresets', 'text presets'],
];

/** `54 semantic colors · 11 radii · 35 spacing`, skipping empty categories. */
export function formatCounts(counts: TokenCounts): string {
  const parts = COUNT_LABELS.filter(([key]) => counts[key] > 0).map(
    ([key, label]) => `${counts[key]} ${label}`,
  );
  return parts.length > 0 ? parts.join(' · ') : 'no tokens';
}

const STAGE_TITLES = {
  load: 'Failed to load theme',
  validate: 'Invalid theme config',
  write: 'Failed to write output',
} as const;

const parseCodegenArgs = (args: string[]) =>
  parseArgs({
    args,
    allowPositionals: true,
    options: {
      out: { type: 'string', short: 'o' },
      docs: { type: 'string', short: 'd' },
      export: { type: 'string', short: 'e' },
      core: { type: 'string' },
      help: { type: 'boolean', short: 'h' },
    },
  });

async function runCodegen(args: string[]): Promise<void> {
  let parsed: ReturnType<typeof parseCodegenArgs>;
  try {
    parsed = parseCodegenArgs(args);
  } catch (error) {
    // e.g. an unknown option or a missing option value
    console.error(`${error instanceof Error ? error.message : error}\n`);
    console.log(USAGE);
    process.exitCode = 1;
    return;
  }
  const { values, positionals } = parsed;

  if (values.help || positionals.length !== 1) {
    console.log(USAGE);
    if (!values.help) process.exitCode = 1;
    return;
  }

  const startedAt = performance.now();
  p.intro('react-native-rethemed ⚡️');

  try {
    await codegen(
      {
        themeFile: positionals[0],
        outFile: values.out,
        exportName: values.export,
        coreSpecifier: values.core,
        docsFile: values.docs,
      },
      {
        loaded: ({ themeFile, exportName }) =>
          p.log.step(
            `✅ Loaded theme  ${dim(`${display(themeFile)} (${exportName})`)}`,
          ),
        validated: (counts) =>
          p.log.step(`✅ Validated tokens  ${dim(formatCounts(counts))}`),
        warned: (warnings) =>
          p.log.warn(
            [
              `⚠️  ${warnings.length === 1 ? '1 warning' : `${warnings.length} warnings`}`,
              ...warnings.map((w) => dim(`  - ${w}`)),
            ].join('\n'),
          ),
        written: ({ outFile, changed }) =>
          p.log.step(
            changed
              ? `✅ Generated ${display(outFile)}`
              : `⏭️  ${display(outFile)} ${dim('is up to date')}`,
          ),
        docsWritten: ({ docsFile, changed }) =>
          p.log.step(
            changed
              ? `✅ Generated ${display(docsFile)}`
              : `⏭️  ${display(docsFile)} ${dim('is up to date')}`,
          ),
      },
    );
  } catch (error) {
    if (error instanceof CodegenError) {
      const details = error.details.map((d) => dim(`  - ${d}`));
      const title =
        error.stage === 'validate'
          ? STAGE_TITLES.validate
          : `${STAGE_TITLES[error.stage]}: ${error.message}`;
      p.log.error([`❌ ${title}`, ...details].join('\n'));
    } else {
      p.log.error(`❌ ${error instanceof Error ? error.message : error}`);
    }
    p.cancel('Failed');
    process.exitCode = 1;
    return;
  }

  p.outro(`🎉 Done in ${Math.round(performance.now() - startedAt)}ms`);
}

export async function main(argv: string[]): Promise<void> {
  const [command, ...rest] = argv;
  switch (command) {
    case 'codegen':
      await runCodegen(rest);
      break;
    case undefined:
    case '-h':
    case '--help':
      console.log(USAGE);
      break;
    default:
      console.error(`Unknown command: ${command}\n`);
      console.log(USAGE);
      process.exitCode = 1;
  }
}
