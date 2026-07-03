import type { NodeSpec } from 'prosemirror-model';

type Attrs = {
  emoji: string;
};
export type EmojiAttrs = Attrs;

export const emoji: Override<
  NodeSpec,
  { attrs: Record<keyof Attrs, { default: string }> }
> = {
  group: 'inline',
  inline: true,
  atom: true,
  attrs: {
    emoji: { default: '' },
  },
  selectable: false,
  draggable: false,
  toDOM: (node: NodeSpec) => {
    const attrs = node.attrs as Attrs;

    return [
      'span',
      {
        'data-mention-emoji': attrs.emoji,
      },
    ];
  },

  parseDOM: [
    {
      tag: 'span[data-mention-emoji]',
      getAttrs: (element: HTMLSpanElement): Attrs => {
        const emoji = element.getAttribute('data-mention-emoji') ?? '';
        return {
          emoji,
        };
      },
    },
  ],
};
