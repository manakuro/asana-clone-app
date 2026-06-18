import { memo } from 'react';
import { Icon } from '@/components/ui/icon';
import type { IconButtonProps } from '@/components/ui/icon-button';
import type { TooltipProps } from '@/components/ui/tooltip';
import { useStrikethrough } from '@/shared/prosemirror/hooks';
import { BaseButton } from '../base-button';

type Props = Omit<IconButtonProps, 'aria-label'> & {
  tooltip?: Omit<TooltipProps, 'content'>;
};

export const Strikethrough = memo(function Strikethrough(props: Props) {
  const { action, isActive } = useStrikethrough();
  return (
    <BaseButton
      aria-label="strikethrough"
      action={action}
      {...props}
      tooltip={{
        content: 'Strikethrough\n(⌘+⇧+S)',
        'aria-label': 'Strikethrough',
        ...props.tooltip,
      }}
      isActive={isActive}
    >
      <Icon icon="strikethrough" color="fg.muted" />
    </BaseButton>
  );
});
