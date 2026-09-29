import {
  COLOR_KEYS,
  FONT_SIZE_KEYS,
  FONT_WEIGHT_KEYS,
  LETTER_SPACING_KEYS,
  LINE_HEIGHT_KEYS,
  RADIUS_KEYS,
  SPACING_KEYS,
  type ThemeConfig,
} from '@react-native-themed/core/config';
import { code, jsdoc, member, table, typeLiteral, union } from './emit';
import {
  buildModel,
  colorTable,
  lineHeightNote,
  lineHeightRows,
  PRESET_FIELDS,
  presetGroups,
  presetTable,
  scaleTable,
  shadowTable,
  type TextNode,
} from './model';

export type GenerateOptions = {
  config: ThemeConfig;
  /** How the generated file imports the theme config. */
  themeImport: {
    /** Module specifier relative to the generated file, e.g. `'./theme'`. */
    specifier: string;
    /** `'default'` or a named export. */
    exportName: string;
  };
  /** Defaults to `'@react-native-themed/core'`. */
  coreSpecifier?: string;
  /** Shown in the header so readers know how to regenerate. */
  command?: string;
};

const INDENT = '  ';

// biome-ignore lint/suspicious/noTemplateCurlyInString: emitted TypeScript, not a template
const SPACING_TYPE = "SpacingToken | 'auto' | `${number}%`";

/**
 * Renders `themed.gen.ts` for an evaluated theme config: token unions, one
 * interface of token-aware style props (each with a JSDoc token table), the
 * typography presets, the exact `useThemed().tokens` / `semanticTokens`
 * shapes, and the `createThemed<ThemedTypes>()` instance itself.
 *
 * Pure: config in, source text out. Output is deterministic so regenerating
 * an unchanged theme is a no-op.
 */
export function generate({
  config,
  themeImport,
  coreSpecifier = '@react-native-themed/core',
  command = 'react-native-themed codegen',
}: GenerateOptions): string {
  const tokens = config.tokens ?? {};
  const semanticColors = config.semanticTokens?.colors ?? {};
  const semanticText = config.semanticTokens?.text ?? {};
  const model = buildModel(config);

  const typeAlias = (name: string, names: string[]) => {
    const body = union(names);
    return `export type ${name} =${body.startsWith('\n') ? '' : ' '}${body};`;
  };
  const keys = (entries: readonly (readonly [string, ...unknown[]])[]) =>
    entries.map(([k]) => k);

  // --- JSDoc token tables ---------------------------------------------------
  const colorDoc = [
    code('semanticTokens.colors'),
    '',
    ...colorTable(model.colors),
  ];
  const scaleDoc = (source: string, rows: [string, unknown][]) => [
    code(`tokens.${source}`),
    '',
    ...scaleTable(rows),
  ];
  const lineHeightDoc = [
    lineHeightNote(model),
    '',
    code('tokens.lineHeights'),
    '',
    ...scaleTable(lineHeightRows(model)),
  ];
  const shadowDoc = [
    'Virtual prop: expands to `shadowColor` / `shadowOffset` / `shadowOpacity` / `shadowRadius` / `elevation`.',
    '',
    code('tokens.shadows'),
    '',
    ...shadowTable(model.shadows),
  ];

  const props = (names: readonly string[], type: string, doc: string[]) =>
    names
      .map((n) => `${jsdoc(doc, INDENT)}\n${INDENT}${n}?: ${type};`)
      .join('\n');

  // --- typography presets ---------------------------------------------------
  const presetDoc = (path: string, cells: string[]) => [
    code(`semanticTokens.text.${path}`),
    '',
    ...table([...PRESET_FIELDS], ['right', 'right', 'right', 'right'], [cells]),
  ];
  /** One member per node; groups nest, and list their own presets. */
  const emitTextNodes = (nodes: TextNode[], depth: number): string =>
    nodes
      .map((node) => {
        const pad = INDENT.repeat(depth);
        if (node.kind === 'preset') {
          return `${jsdoc(presetDoc(node.path, node.cells), pad)}\n${pad}${member(node.name)}: TextVariant;`;
        }
        const [own] = presetGroups(node.children, node.path).filter(
          (g) => g.path === node.path,
        );
        const doc = [
          code(`semanticTokens.text.${node.path}`),
          ...(own ? ['', ...presetTable(own.presets)] : []),
        ];
        return `${jsdoc(doc, pad)}\n${pad}${member(node.name)}: {\n${emitTextNodes(node.children, depth + 1)}\n${pad}};`;
      })
      .join('\n');
  const variants = emitTextNodes(model.text, 1);

  // --- useThemed().semanticTokens -------------------------------------------
  const semanticColorType = Object.entries(semanticColors)
    .map(([group, names]) => {
      const inner = INDENT.repeat(3);
      const fields = Object.entries(names)
        .map(([name, v]) => {
          const doc = table(
            ['light', 'dark'],
            ['left', 'left'],
            [[v.light, v.dark]],
          );
          return `${jsdoc(doc, inner)}\n${inner}${member(name)}: string;`;
        })
        .join('\n');
      return `${INDENT.repeat(2)}${member(group)}: {\n${fields}\n${INDENT.repeat(2)}};`;
    })
    .join('\n');

  const themeBinding =
    themeImport.exportName === 'default'
      ? 'themeConfig'
      : themeImport.exportName;
  const themeImportLine =
    themeImport.exportName === 'default'
      ? `import themeConfig from '${themeImport.specifier}';`
      : `import { ${themeImport.exportName} } from '${themeImport.specifier}';`;

  return `// Code generated by @react-native-themed/cli. DO NOT EDIT.
// Regenerate with: ${command}

import type { TextStyle } from 'react-native';
import { createThemed, type TokenizeStyle } from '${coreSpecifier}';
${themeImportLine}

// ---------------------------------------------------------------------------
// Token names
// ---------------------------------------------------------------------------

${typeAlias(
  'ColorToken',
  model.colors.map((c) => c.token),
)}
${typeAlias('RadiusToken', keys(model.radii))}
${typeAlias('SpacingToken', keys(model.spacing))}
${typeAlias('FontSizeToken', keys(model.fontSizes))}
${typeAlias('FontWeightToken', keys(model.fontWeights))}
${typeAlias('LineHeightToken', keys(model.lineHeights))}
${typeAlias('LetterSpacingToken', keys(model.letterSpacings))}
${typeAlias('ShadowToken', keys(model.shadows))}

// ---------------------------------------------------------------------------
// Token-aware style props. Each primitive picks the ones its RN style type
// has (see \`TokenizeStyle\` in core), so e.g. \`color\` never shows on View.
// ---------------------------------------------------------------------------

export interface ThemedStyleProps {
${props(COLOR_KEYS, 'ColorToken', colorDoc)}
${props(RADIUS_KEYS, 'RadiusToken', scaleDoc('radii', model.radii))}
${props(SPACING_KEYS, SPACING_TYPE, scaleDoc('spacing', model.spacing))}
${props(FONT_SIZE_KEYS, 'FontSizeToken | number', scaleDoc('fontSizes', model.fontSizes))}
${props(FONT_WEIGHT_KEYS, "FontWeightToken | TextStyle['fontWeight']", scaleDoc('fontWeights', model.fontWeights))}
${props(LINE_HEIGHT_KEYS, 'LineHeightToken | number', lineHeightDoc)}
${props(LETTER_SPACING_KEYS, 'LetterSpacingToken | number', scaleDoc('letterSpacings', model.letterSpacings))}
${props(['shadow'], 'ShadowToken', shadowDoc)}
}

// ---------------------------------------------------------------------------
// Typography presets: themed.text.<path>(override?)
// ---------------------------------------------------------------------------

type TextVariant = (
  override?: TokenizeStyle<TextStyle, ThemedStyleProps>,
) => TextStyle;

export interface ThemedTextVariants {
${variants}
}

// ---------------------------------------------------------------------------
// useThemed().tokens / useThemed().semanticTokens
// ---------------------------------------------------------------------------

export interface ThemedTokens ${typeLiteral(tokens, '')}

export interface ThemedSemanticTokens {
  /** Resolved for the current color scheme. */
  colors: {
${semanticColorType}
  };
  text: ${typeLiteral(semanticText, INDENT)};
}

// ---------------------------------------------------------------------------
// Instance
// ---------------------------------------------------------------------------

export interface ThemedTypes {
  style: ThemedStyleProps;
  textVariants: ThemedTextVariants;
  tokens: ThemedTokens;
  semanticTokens: ThemedSemanticTokens;
}

export const { ThemedProvider, useThemed, useColorMode } =
  createThemed<ThemedTypes>(${themeBinding});
`;
}
