import { Icon } from '@/components/ui/atoms';
import { useAtMention } from '@/shared/prosemirror/hooks';
import { memo } from 'react';
import { BaseButton } from '../BaseButton';

export const AtMention = memo(function AtMention() {
  const { action } = useAtMention();

  return (
    <BaseButton
      aria-label="At mention"
      icon={<Icon icon="at" color="text.muted" />}
      action={action}
      tooltip={{
        label: 'At-Mention',
        'aria-label': 'At-Mention',
      }}
    />
  );
});
