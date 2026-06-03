import type { Node } from 'prosemirror-model';
import type { Suggester } from 'prosemirror-suggest';
import {
  getMentionId,
  getMentionType,
  isMentionOpen,
  onMentionClose as onClose,
  onMentionOpen as onOpen,
  setMentionQuery as setQuery,
} from '@/components/features/Menus/EditorMentionMenu';
import type { MentionAttrs } from '@/shared/prosemirror/schema';

let updating = false;

export const MENTION_CHAR = '@';
export const suggestMention: Suggester = {
  disableDecorations: true,
  char: MENTION_CHAR,
  name: 'mention-suggestion',
  onChange: async (params) => {
    // Close the modal when the suggestion character(`@`) is deleted.
    if (params.exitReason && isMentionOpen) {
      onClose();
      return;
    }

    if (updating) return;

    updating = true;

    setQuery(params.query.full);
    await onOpen();

    if (!getMentionId()) {
      updating = false;
    }

    const state = params.view.state;
    const node = state.schema.nodes.mention?.create({
      mentionId: String(getMentionId()),
      mentionType: String(getMentionType()),
    } as MentionAttrs);
    const { from, to } = params.range;
    const tr = state.tr.replaceWith(from, to, node as Node);
    params.view.dispatch(tr);

    onClose();
    updating = false;
  },
};
