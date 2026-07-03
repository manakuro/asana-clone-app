import { Picker } from 'emoji-mart';
import type { PickerProps } from 'emoji-mart/dist-es/utils/shared-props';
import type React from 'react';

export type { BaseEmoji, EmojiData, EmojiSkin } from 'emoji-mart';
export { emojiIndex as emojiData, frequently } from 'emoji-mart';

// TODO: Bump up to V5.
export const EmojiPicker =
  Picker as unknown as React.FCWithChildren<PickerProps>;
