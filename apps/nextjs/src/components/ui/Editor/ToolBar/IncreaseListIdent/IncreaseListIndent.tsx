import { Icon, type IconButtonProps } from '@/components/ui/atoms';
import type { TooltipProps } from '@/components/ui/molecules';
import { useIncreaseListIndent } from '@/shared/prosemirror/hooks';
import { memo } from 'react';
import { BaseButton } from '../BaseButton';

type Props = Omit<IconButtonProps, 'aria-label' | 'isActive'> & {
  tooltip?: Omit<TooltipProps, 'children'>;
};

export const IncreaseListIndent = memo(function IncreaseListIndent(
  props: Props,
) {
  const { action, isEnable } = useIncreaseListIndent();

  return (
    <BaseButton
      aria-label="Increase list indent"
      icon={<Icon icon="rightIndent" color="text.muted" />}
      isEnable={isEnable}
      action={action}
      {...props}
      tooltip={{
        label: 'Increase list indent\n(⌘+[)',
        'aria-label': 'Increase list indent',
        ...props.tooltip,
      }}
    />
  );
});
