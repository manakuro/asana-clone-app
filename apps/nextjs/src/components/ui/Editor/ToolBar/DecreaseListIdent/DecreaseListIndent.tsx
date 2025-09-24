import { Icon, type IconButtonProps } from '@/components/ui/atoms';
import type { TooltipProps } from '@/components/ui/molecules';
import { useDecreaseListIndent } from '@/shared/prosemirror/hooks';
import { memo } from 'react';
import { BaseButton } from '../BaseButton';

type Props = Omit<IconButtonProps, 'aria-label' | 'isActive'> & {
  tooltip?: Omit<TooltipProps, 'children'>;
};

export const DecreaseListIndent = memo(function DecreaseListIndent(
  props: Props,
) {
  const { action, isEnable } = useDecreaseListIndent();

  return (
    <BaseButton
      aria-label="Decrease list indent"
      icon={<Icon icon="leftIndent" color="text.muted" />}
      isEnable={isEnable}
      action={action}
      {...props}
      tooltip={{
        label: 'Decrease list indent\n(⌘+])',
        'aria-label': 'Decrease list indent',
        ...props.tooltip,
      }}
    />
  );
});
