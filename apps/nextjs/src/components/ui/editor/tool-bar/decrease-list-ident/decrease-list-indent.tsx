import { memo } from 'react';
import { Icon } from '@/components/ui/icon';
import type { IconButtonProps } from '@/components/ui/icon-button';
import type { TooltipProps } from '@/components/ui/tooltip';
import { useDecreaseListIndent } from '@/shared/prosemirror/hooks';
import { BaseButton } from '../base-button';

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
