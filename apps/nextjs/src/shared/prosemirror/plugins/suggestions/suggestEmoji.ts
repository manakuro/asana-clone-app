import type { Suggester } from 'prosemirror-suggest';
import {
  getEmoji,
  isEmojiOpen,
  onEmojiClose as onClose,
  onEmojiOpen as onOpen,
  setEmojiQuery as setQuery,
} from '@/components/features/Menus/EditorEmojiMenu';

export const suggestEmoji: Suggester = {
  disableDecorations: true,
  char: ':',
  name: 'emoji-suggestion',
  onChange: async (params) => {
    // Close the modal when the suggestion character(`:`) is deleted.
    if (params.exitReason && isEmojiOpen) {
      onClose();
      return;
    }

    setQuery(params.query.full);

    await onOpen({
      onOpened: () => {
        setTimeout(() => {
          params.view.dom.focus();
        });
      },
    });

    if (!getEmoji()) {
      return;
    }

    const emoji = `${getEmoji()?.native} `;
    console.log(emoji, getEmoji());
    const state = params.view.state;
    const { from, to } = params.range;
    const { tr } = state;
    params.view.dispatch(tr.insertText(emoji, from, to));

    onClose();
  },
};
