import { memo } from 'react';
import { Icon } from '@/components/ui/Icon';
import type { IconButtonProps } from '@/components/ui/IconButton';
import type { TooltipProps } from '@/components/ui/Tooltip';
import { useOrderedList } from '@/shared/prosemirror/hooks';
import { BaseButton } from '../BaseButton';

type Props = Omit<IconButtonProps, 'aria-label'> & {
  tooltip?: Omit<TooltipProps, 'content'>;
};

export const OrderedList = memo(function OrderedList(props: Props) {
  const { action, isActive } = useOrderedList();

  return (
    <BaseButton
      aria-label="ordered list"
      action={action}
      {...props}
      tooltip={{
        content: 'Ordered List\n(⌘+⇧+7)',
        'aria-label': 'Ordered List',
        ...props.tooltip,
      }}
      isActive={isActive}
    >
      <Icon icon="listOl" color="text.muted" />
    </BaseButton>
  );
});
