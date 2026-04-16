import { memo } from 'react';
import { Icon } from '@/components/ui/Icon';
import type { IconButtonProps } from '@/components/ui/IconButton';
import type { TooltipProps } from '@/components/ui/Tooltip';
import { useLink } from '@/shared/prosemirror/hooks';
import { BaseButton } from '../BaseButton';

type Props = Omit<IconButtonProps, 'aria-label'> & {
  tooltip?: Omit<TooltipProps, 'content'>;
};

export const Link = memo(function Link(props: Props) {
  const { action, isActive, isEnable } = useLink();

  return (
    <BaseButton
      aria-label="link"
      isEnable={isEnable}
      action={action}
      {...props}
      tooltip={{
        content: 'Link\n(⌘+b)',
        'aria-label': 'Link',
        ...props.tooltip,
      }}
      isActive={isActive}
    >
      <Icon icon="link" color="text.muted" />
    </BaseButton>
  );
});
