import { memo } from 'react';
import { PopoverEmoji } from '@/components/features/Popovers';
import { Icon } from '@/components/ui/Icon';
import { useEmoji } from '@/shared/prosemirror/hooks';
import { BaseButton } from '../BaseButton';

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
