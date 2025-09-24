import { Icon, type IconButtonProps } from '@/components/ui/atoms';
import type { TooltipProps } from '@/components/ui/molecules';
import { useBulletList } from '@/shared/prosemirror/hooks';
import { memo } from 'react';
import { BaseButton } from '../BaseButton';

type Props = Omit<IconButtonProps, 'aria-label'> & {
  tooltip?: Omit<TooltipProps, 'children'>;
};

export const BulletList = memo(function BulletList(props: Props) {
  const { action, isActive } = useBulletList();
  return (
    <BaseButton
      aria-label="underline"
      icon={<Icon icon="listUl" color="text.muted" />}
      action={action}
      {...props}
      tooltip={{
        label: 'Bullet List\n(⌘+⇧+8)',
        'aria-label': 'Bullet List',
        ...props.tooltip,
      }}
      isActive={isActive}
    />
  );
});
