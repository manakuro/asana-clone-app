import type { NodeSpec } from 'prosemirror-model';

type Attrs = {
  mentionId: string;
  mentionType: string;
};
export type MentionAttrs = Attrs;

export const mention: Override<
  NodeSpec,
  { attrs: Record<keyof Attrs, { default: string }> }
> = {
  group: 'inline',
  inline: true,
  atom: true,
  attrs: {
    mentionId: { default: '' },
    mentionType: { default: '' },
  },
  selectable: false,
  draggable: false,
  toDOM: (node: NodeSpec) => {
    const attrs = node.attrs as Attrs;

    return [
      'span',
      {
        'data-mention-mentionId': attrs.mentionId,
        'data-mention-mentionType': attrs.mentionType,
      },
    ];
  },

  parseDOM: [
    {
      tag: 'span[data-mention-mentionId]',
      getAttrs: (element: HTMLSpanElement): Attrs => {
        const mentionId = element.getAttribute('data-mention-mentionId') ?? '';
        const mentionType =
          element.getAttribute('data-mention-mentionType') ?? '';
        return {
          mentionId,
          mentionType,
        };
      },
    },
  ],
};
