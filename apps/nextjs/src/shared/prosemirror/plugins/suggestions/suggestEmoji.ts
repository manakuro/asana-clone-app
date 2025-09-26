import {
  getEmoji,
  onEmojiArrowDown as onArrowDown,
  onEmojiArrowUp as onArrowUp,
  onEmojiClose as onClose,
  onEmojiEnter as onEnter,
  onEmojiOpen as onOpen,
  setEmojiQuery as setQuery,
} from '@/components/features/Menus/EditorEmojiMenu';
import type { Suggester } from 'prosemirror-suggest';

export const suggestEmoji: Suggester = {
  noDecorations: true,
  char: ':',
  name: 'emoji-suggestion',
  keyBindings: {
    ArrowDown: (params) => {
      params.event.preventDefault();

      onArrowDown();
    },
    ArrowUp: (params) => {
      params.event.preventDefault();

      onArrowUp();
    },
    Enter: (params) => {
      params.event.preventDefault();
      onEnter();
      return true;
    },
  },
  onChange: async (params) => {
    setQuery(params.queryText.full);
    await onOpen();
    params.command();
  },

  createCommand: (params) => {
    return () => {
      if (!getEmoji()) return;

      const emoji = `${getEmoji()?.native}  `;
      const state = params.view.state;
      const { from, end: to } = params.match.range;
      const { tr } = state;
      params.view.dispatch(tr.insertText(emoji, from, to));
    };
  },
  onExit: () => {
    onClose();
  },
};
