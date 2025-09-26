import { Icon } from '@/components/ui/Icon';
import type { IconButtonProps } from '@/components/ui/IconButton';
import type { TooltipProps } from '@/components/ui/Tooltip';
import { useUnderline } from '@/shared/prosemirror/hooks';
import { memo } from 'react';
import { BaseButton } from '../BaseButton';

type Props = Omit<IconButtonProps, 'aria-label'> & {
  tooltip?: Omit<TooltipProps, 'children'>;
};

export const Underline = memo(function Underline(props: Props) {
  const { action, isActive } = useUnderline();
  return (
    <BaseButton
      aria-label="underline"
      icon={<Icon icon="underline" color="text.muted" />}
      action={action}
      {...props}
      tooltip={{
        label: 'Underline\n(⌘+u)',
        'aria-label': 'Underline',
        ...props.tooltip,
      }}
      isActive={isActive}
    />
  );
});
