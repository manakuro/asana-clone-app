import { memo } from 'react';
import { IconButton } from '@/components/ui/IconButton';
import { Icon } from '@/components/ui/icon';
import { Menu } from '@/components/ui/Menu';
import { MenuList } from './MenuList';

export const MoreAction = memo(function MoreAction() {
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
