import {
  isEmojiOpen,
  onEmojiClose,
} from '@/components/features/Menus/EditorEmojiMenu';
import {
  isMentionOpen,
  onMentionClose,
} from '@/components/features/Menus/EditorMentionMenu';

export const Escape = () => {
  if (isEmojiOpen) onEmojiClose();
  if (isMentionOpen) onMentionClose();
  return true;
};
