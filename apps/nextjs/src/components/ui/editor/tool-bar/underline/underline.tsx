import { memo } from 'react';
import { Icon } from '@/components/ui/icon';
import type { IconButtonProps } from '@/components/ui/icon-button';
import type { TooltipProps } from '@/components/ui/tooltip';
import { useUnderline } from '@/shared/prosemirror/hooks';
import { BaseButton } from '../base-button';

type Props = Omit<IconButtonProps, 'aria-label'> & {
  tooltip?: Omit<TooltipProps, 'content'>;
};

export const Underline = memo(function Underline(props: Props) {
  const { action, isActive } = useUnderline();
  return (
    <BaseButton
      aria-label="underline"
      action={action}
      {...props}
      tooltip={{
        content: 'Underline\n(⌘+u)',
        'aria-label': 'Underline',
        ...props.tooltip,
      }}
      isActive={isActive}
    >
      <Icon icon="underline" color="fg.muted" />
    </BaseButton>
  );
});
