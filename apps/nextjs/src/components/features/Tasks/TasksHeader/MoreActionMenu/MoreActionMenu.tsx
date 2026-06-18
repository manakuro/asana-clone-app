import { memo } from 'react';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Menu } from '@/components/ui/menu';
import { MenuList } from './MenuList';

export const MoreActionMenu = memo(function MoreActionMenu() {
  return (
    <Menu.Root positioning={{ placement: 'bottom-start' }} lazyMount>
      <Menu.Trigger asChild>
        <IconButton aria-label="More actions" variant="ghost" size="sm">
          <Icon icon="dotsHorizontalRounded" color="fg.muted" />
        </IconButton>
      </Menu.Trigger>
      <MenuList />
    </Menu.Root>
  );
});
