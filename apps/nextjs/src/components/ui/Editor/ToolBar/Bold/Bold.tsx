import { Icon } from '@/components/ui/atoms/Icon';
import type { IconButtonProps } from '@/components/ui/atoms/IconButton';
import type { TooltipProps } from '@/components/ui/molecules/Tooltip';
import { useBold } from '@/shared/prosemirror/hooks';
import { memo } from 'react';
import { BaseButton } from '../BaseButton';

type Props = Omit<IconButtonProps, 'aria-label'> & {
  tooltip?: Omit<TooltipProps, 'children'>;
};

export const Bold = memo(function Bold(props: Props) {
  const { action, isActive } = useBold();

  return (
    <BaseButton
      aria-label="bold"
      icon={<Icon icon="bold" color="text.muted" />}
      action={action}
      {...props}
      tooltip={{
        label: 'Bold\n(⌘+b)',
        'aria-label': 'Bold',
        ...props.tooltip,
      }}
      isActive={isActive}
    />
  );
});
