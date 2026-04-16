import { memo } from 'react';
import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { Menu } from '@/components/ui/Menu';
import { MenuList } from './MenuList';

export const MoreActionMenu = memo(function MoreActionMenu() {
  return (
    <Menu.Root positioning={{ placement: 'bottom-start' }} lazyMount>
      <Menu.Trigger asChild>
        <IconButton aria-label="More actions" variant="ghost" size="sm">
          <Icon icon="dotsHorizontalRounded" color="text.muted" />
        </IconButton>
      </Menu.Trigger>
      <MenuList />
    </Menu.Root>
  );
});
