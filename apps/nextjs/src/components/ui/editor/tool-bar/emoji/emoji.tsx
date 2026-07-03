import { memo } from 'react';
import { Icon } from '@/components/ui/icon';
import { PopoverEmoji } from '@/features/editor/components/popover-emoji/popover-emoji';
import { useEmoji } from '@/shared/prosemirror/hooks';
import { BaseButton } from '../base-button';

export function Emoji() {
  return (
    <PopoverEmoji>
      <Component />
    </PopoverEmoji>
  );
}

export const Component = memo(function Component() {
  const { action } = useEmoji();

  return (
    <PopoverEmoji>
      <BaseButton
        aria-label="emoji"
        action={action}
        tooltip={{
          content: 'Emoji',
          'aria-label': 'Emoji',
        }}
      >
        <Icon icon="emojiHappy" color="fg.muted" />
      </BaseButton>
    </PopoverEmoji>
  );
});
