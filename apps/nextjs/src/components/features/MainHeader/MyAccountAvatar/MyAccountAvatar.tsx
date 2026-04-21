import { memo } from 'react';
import { MyAvatar } from '@/components/features/MyAvatar';
import { Menu } from '@/components/ui/Menu';
import { MenuList } from './MenuList';

export const MyAccountAvatar = memo(function MyAccountAvatar() {
  return (
    <Menu.Root lazyMount positioning={{ placement: 'bottom-end' }}>
      <Menu.Trigger>
        <MyAvatar size="sm" showProfile={false} />
      </Menu.Trigger>
      <MenuList />
    </Menu.Root>
  );
});
