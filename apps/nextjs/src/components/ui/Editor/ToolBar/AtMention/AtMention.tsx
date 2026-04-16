import { memo } from 'react';
import { Icon } from '@/components/ui/Icon';
import { useAtMention } from '@/shared/prosemirror/hooks';
import { BaseButton } from '../BaseButton';

export const AtMention = memo(function AtMention() {
  const { action } = useAtMention();

  return (
    <BaseButton
      aria-label="At mention"
      action={action}
      tooltip={{
        content: 'At-Mention',
        'aria-label': 'At-Mention',
      }}
    >
      <Icon icon="at" color="text.muted" />
    </BaseButton>
  );
});
