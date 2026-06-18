import { memo } from 'react';
import type { IconButtonProps } from '@/components/ui/IconButton';
import { Icon } from '@/components/ui/icon';
import type { TooltipProps } from '@/components/ui/Tooltip';
import { useDecreaseListIndent } from '@/shared/prosemirror/hooks';
import { BaseButton } from '../BaseButton';

type Props = Omit<IconButtonProps, 'aria-label' | 'isActive'> & {
  tooltip?: Omit<TooltipProps, 'content'>;
};

export const DecreaseListIndent = memo(function DecreaseListIndent(
  props: Props,
) {
  const { action, isEnable } = useDecreaseListIndent();

  return (
    <BaseButton
      aria-label="Decrease list indent"
      isEnable={isEnable}
      action={action}
      {...props}
      tooltip={{
        content: 'Decrease list indent\n(⌘+])',
        'aria-label': 'Decrease list indent',
        ...props.tooltip,
      }}
    >
      <Icon icon="leftIndent" color="fg.muted" />
    </BaseButton>
  );
});
