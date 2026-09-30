import {
  TEXT_TOKEN_FIELDS,
  type TextTokenTree,
  type ThemeConfig,
  walkTextPresets,
} from '@react-native-rethemed/core/config';

/** Values RN's `TextStyle['fontWeight']` accepts as strings. */
const RN_FONT_WEIGHTS = new Set([
  'normal',
  'bold',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  'ultralight',
  'thin',
  'light',
  'medium',
  'regular',
  'semibold',
  'condensedBold',
  'condensed',
  'heavy',
  'black',
]);

const TEXT_REF_SCALES = {
  fontSize: 'fontSizes',
  lineHeight: 'lineHeights',
  letterSpacing: 'letterSpacings',
  fontWeight: 'fontWeights',
} as const;

/**
 * Top-level preset/group names that would collide with the properties every
 * function already has, since `themed.text` itself is callable.
 */
const RESERVED_TEXT_NAMES = new Set([
  'apply',
  'arguments',
  'bind',
  'call',
  'caller',
  'constructor',
  'length',
  'name',
  'prototype',
  'toString',
]);

const isPrimitive = (value: unknown) =>
  typeof value === 'string' || typeof value === 'number';

/**
 * Structural checks for the `semanticTokens.text` tree: every node is an
 * object that is either a preset (all primitive values, known fields only)
 * or a group (all objects) — never both, never empty.
 */
function checkTextTree(
  tree: TextTokenTree,
  path: string[],
  problems: string[],
): void {
  for (const [key, node] of Object.entries(tree)) {
    const at = `semanticTokens.text.${[...path, key].join('.')}`;

    if (path.length === 0 && RESERVED_TEXT_NAMES.has(key)) {
      problems.push(
        `${at}: '${key}' is reserved (it collides with a function property of themed.text)`,
      );
      continue;
    }
    if (typeof node !== 'object' || node === null || Array.isArray(node)) {
      problems.push(`${at}: must be a preset or a group object`);
      continue;
    }

    const entries = Object.entries(node);
    if (entries.length === 0) {
      problems.push(`${at}: is empty`);
      continue;
    }

    const fields = entries.filter(([, v]) => isPrimitive(v)).map(([k]) => k);
    if (fields.length === entries.length) {
      for (const field of fields) {
        if (!(TEXT_TOKEN_FIELDS as readonly string[]).includes(field)) {
          problems.push(
            `${at}.${field}: unknown preset field (expected ${TEXT_TOKEN_FIELDS.join(', ')})`,
          );
        }
      }
    } else if (fields.length === 0) {
      checkTextTree(node as TextTokenTree, [...path, key], problems);
    } else {
      const groups = entries.filter(([, v]) => !isPrimitive(v)).map(([k]) => k);
      problems.push(
        `${at}: mixes preset fields (${fields.join(', ')}) with groups (${groups.join(', ')})`,
      );
    }
  }
}

/**
 * Checks what the type system can no longer check once token types are
 * generated rather than inferred: every `semanticTokens.text` reference must
 * name a key of the matching `tokens` scale, and every semantic color must
 * define both schemes. Returns human-readable problems (empty when valid).
 */
export function validateTheme(config: ThemeConfig): string[] {
  const problems: string[] = [];
  const tokens = config.tokens ?? {};

  checkTextTree(config.semanticTokens?.text ?? {}, [], problems);

  walkTextPresets(config.semanticTokens?.text, (path, preset) => {
    for (const [field, scaleName] of Object.entries(TEXT_REF_SCALES)) {
      const value = preset[field as keyof typeof preset];
      if (typeof value !== 'string') continue;

      const scale = tokens[scaleName];
      if (scale && Object.hasOwn(scale, value)) continue;
      if (field === 'fontWeight' && RN_FONT_WEIGHTS.has(value)) continue;

      problems.push(
        `semanticTokens.text.${path.join('.')}.${field}: '${value}' is not a key of tokens.${scaleName}` +
          (scale ? '' : ` (tokens.${scaleName} is not defined)`),
      );
    }
  });

  const baseFontSize = config.defaults?.fontSize;
  if (
    typeof baseFontSize === 'string' &&
    !(tokens.fontSizes && Object.hasOwn(tokens.fontSizes, baseFontSize))
  ) {
    problems.push(
      `defaults.fontSize: '${baseFontSize}' is not a key of tokens.fontSizes`,
    );
  }

  for (const [group, colors] of Object.entries(
    config.semanticTokens?.colors ?? {},
  )) {
    for (const [name, value] of Object.entries(colors)) {
      if (typeof value?.light !== 'string' || typeof value?.dark !== 'string') {
        problems.push(
          `semanticTokens.colors.${group}.${name}: must define both 'light' and 'dark' strings`,
        );
      }
    }
  }

  return problems;
}
