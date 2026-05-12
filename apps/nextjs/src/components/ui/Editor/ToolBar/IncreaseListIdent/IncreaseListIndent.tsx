import { memo } from 'react';
import { Icon } from '@/components/ui/Icon';
import type { IconButtonProps } from '@/components/ui/IconButton';
import type { TooltipProps } from '@/components/ui/Tooltip';
import { useIncreaseListIndent } from '@/shared/prosemirror/hooks';
import { BaseButton } from '../BaseButton';

type Props = Omit<IconButtonProps, 'aria-label' | 'isActive'> & {
  tooltip?: Omit<TooltipProps, 'content'>;
};

export const IncreaseListIndent = memo(function IncreaseListIndent(
  props: Props,
) {
  const { action, isEnable } = useIncreaseListIndent();

  return (
    <BaseButton
      aria-label="Increase list indent"
      isEnable={isEnable}
      action={action}
      {...props}
      tooltip={{
        content: 'Increase list indent\n(⌘+[)',
        'aria-label': 'Increase list indent',
        ...props.tooltip,
      }}
    >
      <Icon icon="rightIndent" color="fg.muted" />
    </BaseButton>
  );
});
