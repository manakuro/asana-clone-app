import { memo } from 'react';
import { Icon } from '@/components/ui/icon';
import type { IconButtonProps } from '@/components/ui/icon-button';
import type { TooltipProps } from '@/components/ui/tooltip';
import { useIncreaseListIndent } from '@/shared/prosemirror/hooks';
import { BaseButton } from '../base-button';

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
