import {
  isTextPreset,
  RN_DEFAULT_FONT_SIZE,
  resolveBaseFontSize,
  type ShadowToken,
  type TextColor,
  type TextToken,
  type TextTokenTree,
  type ThemeConfig,
  walkTextPresets,
} from '@react-native-rethemed/core/config';
import { code, orderedEntries, table } from './emit';

/**
 * The evaluated theme flattened into display order — the single view of the
 * tokens that both `themed.gen.ts` and the Markdown docs render from, so the
 * two can never disagree.
 */
export type TokenModel = {
  /** `semanticTokens.colors`, flattened to `'group.token'`. */
  colors: { token: string; group: string; light: string; dark: string }[];
  radii: [string, number][];
  spacing: [string, number][];
  fontSizes: [string, number][];
  fontWeights: [string, unknown][];
  lineHeights: [string, number][];
  letterSpacings: [string, number][];
  shadows: [string, ShadowToken][];
  zIndices: [string, number][];
  /** `tokens.colors` — scheme-independent primitives, also color tokens. */
  primitiveColors: [string, string][];
  /** `semanticTokens.text` as a tree, each preset's cells already rendered. */
  text: TextNode[];
  /**
   * The first preset (by path) whose `lineHeight` is a token (a ratio, so it
   * follows `fontSize`) and the first whose `lineHeight` is an absolute
   * number. Overriding a preset's size works differently for each.
   */
  presetLineHeights: { ratio?: string; absolute?: string };
  /** `defaults.fontSize` resolved, for line-height ratios without a fontSize. */
  baseFontSize: { value: number; label: string };
};

/** A node of `semanticTokens.text`: a preset (leaf) or a group. */
export type TextNode =
  | {
      kind: 'preset';
      name: string;
      path: string;
      cells: string[];
      /** The preset's `color`, rendered; `undefined` when it has none. */
      color?: string;
    }
  | { kind: 'group'; name: string; path: string; children: TextNode[] };

export const PRESET_FIELDS = [
  'fontSize',
  'lineHeight',
  'letterSpacing',
  'fontWeight',
] as const;

export function buildModel(config: ThemeConfig): TokenModel {
  const tokens = config.tokens ?? {};
  const byValue = (v: number) => v;

  const scaleFor = {
    fontSize: tokens.fontSizes,
    lineHeight: tokens.lineHeights,
    letterSpacing: tokens.letterSpacings,
    fontWeight: tokens.fontWeights,
  } as const;
  const baseFontSize = resolveBaseFontSize(config);
  const fontSizeOf = (preset: TextToken) => {
    const { fontSize } = preset;
    if (typeof fontSize === 'number') return fontSize;
    const scale = tokens.fontSizes;
    return typeof fontSize === 'string' &&
      scale &&
      Object.hasOwn(scale, fontSize)
      ? scale[fontSize]
      : baseFontSize;
  };

  /**
   * `'lg'` -> `` `lg` (18) `` so a table shows what a reference means. A
   * line-height token is a ratio, so it also shows the computed value:
   * `` `short` (×1.375 → 24.75) ``.
   */
  const presetCell = (preset: TextToken, field: keyof typeof scaleFor) => {
    const value = preset[field];
    if (value === undefined) return '–';
    const scale = scaleFor[field] as Record<string, unknown> | undefined;
    if (typeof value === 'string' && scale && Object.hasOwn(scale, value)) {
      if (field === 'lineHeight') {
        const ratio = scale[value] as number;
        return `${code(value)} (×${ratio} → ${round2(fontSizeOf(preset) * ratio)})`;
      }
      return `${code(value)} (${scale[value]})`;
    }
    return String(value);
  };

  const baseKey = config.defaults?.fontSize;
  const baseLabel =
    typeof baseKey === 'string'
      ? `${code(baseKey)} (${baseFontSize})`
      : typeof baseKey === 'number'
        ? String(baseKey)
        : `${RN_DEFAULT_FONT_SIZE} (React Native default)`;

  return {
    colors: Object.entries(config.semanticTokens?.colors ?? {}).flatMap(
      ([group, names]) =>
        Object.entries(names).map(([name, v]) => ({
          token: `${group}.${name}`,
          group,
          light: v.light,
          dark: v.dark,
        })),
    ),
    radii: orderedEntries(tokens.radii, byValue),
    spacing: orderedEntries(tokens.spacing, byValue),
    fontSizes: orderedEntries(tokens.fontSizes, byValue),
    fontWeights: orderedEntries(tokens.fontWeights, (v) => Number(v) || 0),
    lineHeights: orderedEntries(tokens.lineHeights, byValue),
    letterSpacings: orderedEntries(tokens.letterSpacings, byValue),
    shadows: Object.entries(tokens.shadows ?? {}),
    zIndices: orderedEntries(tokens.zIndices, byValue),
    primitiveColors: Object.entries(tokens.colors ?? {}),
    text: textNodes(config.semanticTokens?.text, (preset) =>
      PRESET_FIELDS.map((f) => presetCell(preset, f)),
    ),
    presetLineHeights: presetLineHeightKinds(config),
    baseFontSize: { value: baseFontSize, label: baseLabel },
  };
}

const round2 = (value: number) => Math.round(value * 100) / 100;

function presetLineHeightKinds(
  config: ThemeConfig,
): TokenModel['presetLineHeights'] {
  const paths: Record<'ratio' | 'absolute', string[]> = {
    ratio: [],
    absolute: [],
  };
  walkTextPresets(config.semanticTokens?.text, (path, preset) => {
    if (typeof preset.lineHeight === 'string') paths.ratio.push(path.join('.'));
    if (typeof preset.lineHeight === 'number') {
      paths.absolute.push(path.join('.'));
    }
  });
  // Same preference as `examplePreset`: a mid-sized `title.md` reads best.
  const pick = (list: string[]) =>
    list.find((p) => p === 'title.md') ?? list[0];
  return { ratio: pick(paths.ratio), absolute: pick(paths.absolute) };
}

/**
 * A preset `color` as a table cell: `#777777` (both schemes), or
 * `light: #111111, dark: #ffffff` — a scheme left out is simply not listed.
 */
export function colorCell(color: TextColor | undefined): string | undefined {
  if (color === undefined) return undefined;
  if (typeof color === 'string') return color;
  return (['light', 'dark'] as const)
    .filter((scheme) => color[scheme] !== undefined)
    .map((scheme) => `${scheme}: ${color[scheme]}`)
    .join(', ');
}

function textNodes(
  tree: TextTokenTree | undefined,
  cells: (preset: TextToken) => string[],
  prefix: string[] = [],
): TextNode[] {
  return Object.entries(tree ?? {})
    .filter(([, node]) => typeof node === 'object' && node !== null)
    .map(([name, node]): TextNode => {
      const path = [...prefix, name];
      return isTextPreset(node)
        ? {
            kind: 'preset',
            name,
            path: path.join('.'),
            cells: cells(node),
            color: colorCell(node.color),
          }
        : {
            kind: 'group',
            name,
            path: path.join('.'),
            children: textNodes(node as TextTokenTree, cells, path),
          };
    });
}

/**
 * Every group that directly holds presets, with those presets — one table
 * each. The root comes first with path `''` when presets sit at the top.
 */
export function presetGroups(
  nodes: TextNode[],
  path = '',
): { path: string; presets: Extract<TextNode, { kind: 'preset' }>[] }[] {
  const presets = nodes.filter(
    (n): n is Extract<TextNode, { kind: 'preset' }> => n.kind === 'preset',
  );
  return [
    ...(presets.length > 0 ? [{ path, presets }] : []),
    ...nodes.flatMap((n) =>
      n.kind === 'group' ? presetGroups(n.children, n.path) : [],
    ),
  ];
}

/** First preset in definition order, preferring `title.md` for examples. */
export function examplePreset(nodes: TextNode[]): string | undefined {
  const all = presetGroups(nodes).flatMap((g) => g.presets.map((p) => p.path));
  return all.find((p) => p === 'title.md') ?? all[0];
}

/** Line heights are ratios of `fontSize`; show them as `×1.375`. */
export function lineHeightRows(model: TokenModel): [string, string][] {
  return model.lineHeights.map(([k, v]) => [k, `×${v}`]);
}

/** One sentence explaining how a line-height token resolves. */
export function lineHeightNote(model: TokenModel): string {
  return `Ratios of \`fontSize\`: a token resolves to \`fontSize × ratio\`, using the style's own \`fontSize\` or else the default font size, ${model.baseFontSize.label}. A raw number is an absolute line height.`;
}

// ---------------------------------------------------------------------------
// Markdown tables shared by the JSDoc and the docs file
// ---------------------------------------------------------------------------

export function colorTable(rows: TokenModel['colors']): string[] {
  return table(
    ['token', 'light', 'dark'],
    ['left', 'left', 'left'],
    rows.map((c) => [code(c.token), c.light, c.dark]),
  );
}

/** More distinct shade names than this and a grid gets too wide to read. */
const MAX_PALETTE_SHADES = 12;

/**
 * `tokens.colors` for display. Keys shaped `<hue>.<shade>` become one grid
 * row per hue (`| red | #fef2f2 | … |`), which keeps a few hundred palette
 * colors readable in a hover; anything else (`white`) goes in a plain
 * token/value table first. Falls back to a single plain table when the keys
 * don't form a palette.
 */
export function primitiveColorTables(rows: [string, string][]): {
  lines: string[];
  /** A real `<hue>.<shade>` token to cite next to the grid. */
  example?: string;
} {
  const plain = (r: [string, string][]) =>
    table(
      ['token', 'value'],
      ['left', 'left'],
      r.map(([k, v]) => [code(k), v]),
    );

  const singles: [string, string][] = [];
  const hues = new Map<string, Map<string, string>>();
  for (const [key, value] of rows) {
    const parts = key.split('.');
    if (parts.length !== 2 || !parts[0] || !parts[1]) {
      singles.push([key, value]);
      continue;
    }
    const [hue, shade] = parts;
    const shades = hues.get(hue) ?? new Map<string, string>();
    shades.set(shade, value);
    hues.set(hue, shades);
  }

  const shades = [...new Set([...hues.values()].flatMap((m) => [...m.keys()]))];
  if (shades.every((s) => /^\d+$/.test(s))) {
    shades.sort((a, b) => Number(a) - Number(b));
  }
  if (hues.size === 0 || shades.length > MAX_PALETTE_SHADES) {
    return { lines: plain(rows) };
  }

  const grid = table(
    ['hue', ...shades],
    ['left', ...shades.map(() => 'left' as const)],
    [...hues].map(([hue, byShade]) => [
      code(hue),
      ...shades.map((s) => byShade.get(s) ?? '–'),
    ]),
  );
  const [firstHue, firstShades] = [...hues][0];
  const exampleShade = firstShades.has('500')
    ? '500'
    : [...firstShades.keys()][0];
  return {
    lines: singles.length > 0 ? [...plain(singles), '', ...grid] : grid,
    example: `${firstHue}.${exampleShade}`,
  };
}

/** How primitive colors behave, and how to name one from the grid. */
export function primitiveColorNote(example: string | undefined): string {
  const grid = example
    ? ` A grid cell is the token \`'<hue>.<shade>'\`, e.g. \`'${example}'\`.`
    : '';
  return `Fixed colors, the same in light and dark.${grid}`;
}

export function scaleTable(rows: [string, unknown][]): string[] {
  return table(
    ['token', 'value'],
    ['left', 'right'],
    rows.map(([k, v]) => [code(k), String(v)]),
  );
}

export function shadowTable(rows: TokenModel['shadows']): string[] {
  return table(
    ['token', 'offset (x, y)', 'radius', 'opacity', 'elevation', 'color'],
    ['left', 'right', 'right', 'right', 'right', 'left'],
    rows.map(([k, s]) => [
      code(k),
      `${s.shadowOffset?.width ?? 0}, ${s.shadowOffset?.height ?? 0}`,
      String(s.shadowRadius ?? '–'),
      String(s.shadowOpacity ?? '–'),
      String(s.elevation ?? '–'),
      String(s.shadowColor ?? '–'),
    ]),
  );
}

/** Presets as rows, named by their full path (`title.md`). */
export function presetTable(
  presets: Extract<TextNode, { kind: 'preset' }>[],
): string[] {
  // The `color` column only appears when a preset in this table has one.
  const withColor = presets.some((p) => p.color !== undefined);
  return table(
    ['preset', ...PRESET_FIELDS, ...(withColor ? ['color'] : [])],
    [
      'left',
      'right',
      'right',
      'right',
      'right',
      ...(withColor ? (['left'] as const) : []),
    ],
    presets.map((p) => [
      code(p.path),
      ...p.cells,
      ...(withColor ? [p.color ?? '–'] : []),
    ]),
  );
}
