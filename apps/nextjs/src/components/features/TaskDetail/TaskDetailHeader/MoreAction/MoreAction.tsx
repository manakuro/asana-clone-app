import { memo } from 'react';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Menu } from '@/components/ui/menu';
import { Tooltip } from '@/components/ui/tooltip';
import { MenuList } from './MenuList';

type Props = {
  taskId: string;
};

export const MoreAction = memo(function MoreAction(props: Props) {
  return (
    <Menu.Root
      positioning={{ placement: 'bottom-end' }}
      closeOnSelect={false}
      lazyMount
    >
      <Tooltip
        showArrow
        content="More actions"
        aria-label="More actions button"
        size="sm"
        withIcon
      >
        <Menu.Trigger asChild>
          <IconButton aria-label="More actions" variant="ghost" size="sm">
            <Icon icon="dotsHorizontalRounded" color="fg.muted" />
          </IconButton>
        </Menu.Trigger>
      </Tooltip>
      <MenuList taskId={props.taskId} />
    </Menu.Root>
  );
});
