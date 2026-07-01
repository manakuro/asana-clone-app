import { memo } from 'react';
import { Menu } from '@/components/ui/menu';
import { MyAvatar } from '@/features/teammates/components/my-avatar';
import { MenuList } from './menu-list';

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
