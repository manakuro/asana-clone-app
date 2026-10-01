/**
 * Small string helpers for emitting TypeScript source and Markdown tables
 * inside JSDoc. Kept free of theme knowledge so `generate.ts` reads as the
 * layout of the generated file only.
 */

const IDENTIFIER = /^[A-Za-z_$][\w$]*$/;

/** `'0'`, `'0.5'`, `'12'` — keys JS/TS treat as numbers. */
export function isNumericKey(key: string): boolean {
  return /^\d+(\.\d+)?$/.test(key) && String(Number(key)) === key;
}

/** A string literal type, single-quoted. */
export function quote(value: string): string {
  return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

/**
 * A token name as a literal type. Numeric keys become number literals so
 * `padding: 4` type-checks (matches how `keyof { 4: 16 }` is typed).
 */
export function keyLiteral(key: string): string {
  return isNumericKey(key) ? key : quote(key);
}

/** A property name in a type literal / interface. */
export function member(key: string): string {
  return IDENTIFIER.test(key) || isNumericKey(key) ? key : quote(key);
}

/** A union type; one member per line once it gets long. */
export function union(keys: string[], indent = ''): string {
  if (keys.length === 0) return 'never';
  const literals = keys.map(keyLiteral);
  if (literals.length <= 4) return literals.join(' | ');
  return literals.map((l) => `\n${indent}  | ${l}`).join('');
}

/** A JSDoc block; empty strings become blank ` *` lines. */
export function jsdoc(lines: string[], indent: string): string {
  const body = lines.map((l) => (l ? `${indent} * ${l}` : `${indent} *`));
  return [`${indent}/**`, ...body, `${indent} */`].join('\n');
}

export type Align = 'left' | 'right';

/** A GitHub-flavoured Markdown table (VS Code renders these in hovers). */
export function table(
  header: string[],
  align: Align[],
  rows: (string | number)[][],
): string[] {
  const cell = (v: string | number) => String(v).replace(/\|/g, '\\|');
  const rule = align.map((a) => (a === 'left' ? ':--' : '--:')).join('|');
  return [
    `| ${header.join(' | ')} |`,
    `|${rule}|`,
    ...rows.map((r) => `| ${r.map(cell).join(' | ')} |`),
  ];
}

/** Inline code in Markdown. */
export function code(value: string | number): string {
  return `\`${value}\``;
}

/** A type expression emitted verbatim by `typeLiteral` (e.g. a union). */
export class TypeExpr {
  constructor(readonly text: string) {}
}

/**
 * The exact type of a plain JSON-like value, e.g. `{ md: 16; lg: 18 }`,
 * so `useThemed().tokens` keeps literal types without inference.
 */
export function typeLiteral(value: unknown, indent: string): string {
  if (value instanceof TypeExpr) return value.text;
  if (typeof value === 'string') return quote(value);
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  if (value === null) return 'null';
  if (Array.isArray(value)) {
    return `readonly [${value.map((v) => typeLiteral(v, indent)).join(', ')}]`;
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return '{}';
    const inner = `${indent}  `;
    const body = entries
      .map(([k, v]) => `${inner}${member(k)}: ${typeLiteral(v, inner)};`)
      .join('\n');
    return `{\n${body}\n${indent}}`;
  }
  return 'unknown';
}

/**
 * Definition order, except scales with integer-like keys: JS moves those to
 * the front of an object, so the authored order is already lost — sort by
 * value instead so the table still reads as a scale.
 */
export function orderedEntries<V>(
  table: Record<string, V> | undefined,
  rank: (value: V) => number,
): [string, V][] {
  const entries = Object.entries(table ?? {});
  return entries.some(([k]) => /^\d+$/.test(k))
    ? entries.sort((a, b) => rank(a[1]) - rank(b[1]))
    : entries;
}
