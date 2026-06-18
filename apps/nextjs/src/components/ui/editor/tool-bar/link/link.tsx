import { memo } from 'react';
import { Icon } from '@/components/ui/icon';
import type { IconButtonProps } from '@/components/ui/icon-button';
import type { TooltipProps } from '@/components/ui/tooltip';
import { useLink } from '@/shared/prosemirror/hooks';
import { BaseButton } from '../base-button';

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
      <Icon icon="link" color="fg.muted" />
    </BaseButton>
  );
});
