import {
  isEmojiOpen,
  onEmojiArrowDown,
  onEmojiArrowUp,
  onEmojiClose,
  onEmojiEnter,
} from '@/components/features/Menus/EditorEmojiMenu';
import {
  isMentionOpen,
  onMentionArrowDown,
  onMentionArrowUp,
  onMentionClose,
  onMentionEnter,
} from '@/components/features/Menus/EditorMentionMenu';

export const Escape = () => {
  if (isEmojiOpen) onEmojiClose();
  if (isMentionOpen) onMentionClose();
  return true;
};

export const ArrowUp = (): boolean => {
  if (isEmojiOpen) {
    onEmojiArrowUp();
    return true;
  }
  if (isMentionOpen) {
    onMentionArrowUp();
    return true;
  }

  return false;
};

export const ArrowDown = (): boolean => {
  if (isEmojiOpen) {
    onEmojiArrowDown();
    return true;
  }
  if (isMentionOpen) {
    onMentionArrowDown();
    return true;
  }

  return false;
};

export const Enter = (): boolean => {
  if (isEmojiOpen) {
    onEmojiEnter();
    return true;
  }
  if (isMentionOpen) {
    onMentionEnter();
    return true;
  }

  return false;
};
