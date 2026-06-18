import { memo } from 'react';
import { Icon } from '@/components/ui/icon';
import { useAtMention } from '@/shared/prosemirror/hooks';
import { BaseButton } from '../base-button';

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
      <Icon icon="at" color="fg.muted" />
    </BaseButton>
  );
});
