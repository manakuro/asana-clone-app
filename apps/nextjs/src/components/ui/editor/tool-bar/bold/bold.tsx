import { memo } from 'react';
import { Icon } from '@/components/ui/icon';
import type { IconButtonProps } from '@/components/ui/icon-button';
import type { TooltipProps } from '@/components/ui/tooltip';
import { useBold } from '@/shared/prosemirror/hooks';
import { BaseButton } from '../base-button';

type Props = Omit<IconButtonProps, 'aria-label'> & {
  tooltip?: Omit<TooltipProps, 'content'>;
};

export const Bold = memo(function Bold(props: Props) {
  const { action, isActive } = useBold();

  return (
    <BaseButton
      aria-label="bold"
      action={action}
      {...props}
      tooltip={{
        content: 'Bold\n(⌘+b)',
        'aria-label': 'Bold',
        ...props.tooltip,
      }}
      isActive={isActive}
    >
      <Icon icon="bold" color="fg.muted" />
    </BaseButton>
  );
});
