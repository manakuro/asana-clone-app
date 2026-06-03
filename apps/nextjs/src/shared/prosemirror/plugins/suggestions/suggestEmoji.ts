import type { Suggester } from 'prosemirror-suggest';
import {
  getEmoji,
  isEmojiOpen,
  onEmojiClose as onClose,
  onEmojiOpen as onOpen,
  setEmojiQuery as setQuery,
} from '@/components/features/Menus/EditorEmojiMenu';

let updating = false;

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

    if (updating) return;

    updating = true;
    setQuery(params.query.full);
    await onOpen();

    if (!getEmoji()) {
      updating = false;
    }

    const emoji = `${getEmoji()?.native} `;
    console.log(emoji, getEmoji());
    const state = params.view.state;
    const { from, to } = params.range;
    const { tr } = state;
    params.view.dispatch(tr.insertText(emoji, from, to));

    onClose();

    updating = false;
  },
};
