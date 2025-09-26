import {
  getMentionId,
  getMentionType,
  onMentionArrowDown as onArrowDown,
  onMentionArrowUp as onArrowUp,
  onMentionClose as onClose,
  onMentionEnter as onEnter,
  onMentionOpen as onOpen,
  setMentionQuery as setQuery,
} from '@/components/features/Menus/EditorMentionMenu';
import type { MentionAttrs } from '@/shared/prosemirror/schema';
import type { Suggester } from 'prosemirror-suggest';

export const MENTION_CHAR = '@';
export const suggestMention: Suggester = {
  noDecorations: true,
  char: MENTION_CHAR,
  name: 'mention-suggestion',
  keyBindings: {
    ArrowDown: (params) => {
      params.event.preventDefault();

      onArrowDown();
    },
    ArrowUp: (params) => {
      params.event.preventDefault();

      onArrowUp();
    },
    Enter: () => {
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
      if (!getMentionId()) return;

      const state = params.view.state;
      const node = state.schema.nodes.mention.create({
        mentionId: String(getMentionId()),
        mentionType: String(getMentionType()),
      } as MentionAttrs);
      const { from, end: to } = params.match.range;
      const tr = state.tr.replaceWith(from, to, node);
      params.view.dispatch(tr);
    };
  },
  onExit: () => {
    onClose();
  },
};
