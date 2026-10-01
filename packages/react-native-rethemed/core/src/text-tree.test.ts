import { describe, expect, it } from 'vitest';
import { isTextPreset, resolveTextColor, resolveTextTree } from './text-tree';

describe('isTextPreset', () => {
  it('treats a node with a preset field as a preset, even with a color object', () => {
    expect(isTextPreset({ fontSize: 14, color: { light: '#111' } })).toBe(true);
    expect(isTextPreset({ color: { light: '#111', dark: '#fff' } })).toBe(true);
  });

  it('treats a node of objects without preset fields as a group', () => {
    expect(isTextPreset({ md: { fontSize: 16 }, sm: { fontSize: 14 } })).toBe(
      false,
    );
  });
});

describe('resolveTextColor', () => {
  it('uses a string for both schemes and picks per scheme from an object', () => {
    expect(resolveTextColor('#777', 'dark')).toBe('#777');
    expect(resolveTextColor({ light: '#111', dark: '#fff' }, 'dark')).toBe(
      '#fff',
    );
    expect(resolveTextColor({ dark: '#fff' }, 'light')).toBeUndefined();
  });
});

describe('resolveTextTree', () => {
  const tree = {
    caption: { fontSize: 12, color: { light: '#111', dark: '#fff' } },
    title: {
      md: { fontSize: 16 },
      muted: { fontSize: 16, color: { dark: '#aaa' } },
    },
  };

  it('resolves preset colors at any depth for one scheme', () => {
    expect(resolveTextTree(tree, 'dark')).toEqual({
      caption: { fontSize: 12, color: '#fff' },
      title: { md: { fontSize: 16 }, muted: { fontSize: 16, color: '#aaa' } },
    });
  });

  it('drops the color key where the preset does not cover the scheme', () => {
    expect(resolveTextTree(tree, 'light').title).toEqual({
      md: { fontSize: 16 },
      muted: { fontSize: 16 },
    });
  });

  it('keeps presets without a color as the same object', () => {
    const title = resolveTextTree(tree, 'light').title as Record<
      string,
      unknown
    >;
    expect(title.md).toBe(tree.title.md);
  });
});
