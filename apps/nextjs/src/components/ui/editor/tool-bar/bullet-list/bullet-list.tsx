import { memo } from 'react';
import { Icon } from '@/components/ui/icon';
import type { IconButtonProps } from '@/components/ui/icon-button';
import type { TooltipProps } from '@/components/ui/tooltip';
import { useBulletList } from '@/shared/prosemirror/hooks';
import { BaseButton } from '../base-button';

type Props = Omit<IconButtonProps, 'aria-label'> & {
  tooltip?: Omit<TooltipProps, 'content'>;
};

export const BulletList = memo(function BulletList(props: Props) {
  const { action, isActive } = useBulletList();
  return (
    <BaseButton
      aria-label="underline"
      action={action}
      {...props}
      tooltip={{
        content: 'Bullet List\n(⌘+⇧+8)',
        'aria-label': 'Bullet List',
        ...props.tooltip,
      }}
      isActive={isActive}
    >
      <Icon icon="listUl" color="fg.muted" />
    </BaseButton>
  );
});
