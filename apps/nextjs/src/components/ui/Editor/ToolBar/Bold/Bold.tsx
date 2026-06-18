import { memo } from 'react';
import type { IconButtonProps } from '@/components/ui/IconButton';
import { Icon } from '@/components/ui/icon';
import type { TooltipProps } from '@/components/ui/Tooltip';
import { useBold } from '@/shared/prosemirror/hooks';
import { BaseButton } from '../BaseButton';

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
