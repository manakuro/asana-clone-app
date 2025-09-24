import { Icon, type IconButtonProps } from '@/components/ui/atoms';
import type { TooltipProps } from '@/components/ui/molecules';
import { useLink } from '@/shared/prosemirror/hooks';
import { memo } from 'react';
import { BaseButton } from '../BaseButton';

type Props = Omit<IconButtonProps, 'aria-label'> & {
  tooltip?: Omit<TooltipProps, 'children'>;
};

export const Link = memo(function Link(props: Props) {
  const { action, isActive, isEnable } = useLink();

  return (
    <BaseButton
      aria-label="link"
      icon={<Icon icon="link" color="text.muted" />}
      isEnable={isEnable}
      action={action}
      {...props}
      tooltip={{
        label: 'Link\n(⌘+b)',
        'aria-label': 'Link',
        ...props.tooltip,
      }}
      isActive={isActive}
    />
  );
});
