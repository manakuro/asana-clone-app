import type { MarkSpec } from 'prosemirror-model';

interface Attrs {
  href: string;
  title: string | null;
}

export const link: MarkSpec = {
  attrs: {
    href: {},
    title: { default: null },
  },
  group: 'inline',
  inline: true,
  inclusive: false,
  parseDOM: [
    {
      tag: 'a[href]',
      // @ts-expect-error
      getAttrs: (element: HTMLAnchorElement): Attrs => {
        return {
          href: element.getAttribute('href') as string,
          title: element.getAttribute('title'),
        };
      },
    },
  ],
  toDOM(node) {
    const { href, title } = node.attrs as Attrs;

    return ['a', { href, title }, 0];
  },
};
