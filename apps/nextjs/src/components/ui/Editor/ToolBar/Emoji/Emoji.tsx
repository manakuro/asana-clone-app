import { PopoverEmoji } from '@/components/features/organisms/Popovers';
import { Icon } from '@/components/ui/atoms';
import { useEmoji } from '@/shared/prosemirror/hooks';
import { memo } from 'react';
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
        icon={<Icon icon="emojiHappy" color="text.muted" />}
        action={action}
        tooltip={{
          label: 'Emoji',
          'aria-label': 'Emoji',
        }}
      />
    </PopoverEmoji>
  );
});
