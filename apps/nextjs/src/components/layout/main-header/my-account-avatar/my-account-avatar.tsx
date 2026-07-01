import { memo } from 'react';
import { MyAvatar } from '@/components/features/teammates/components/my-avatar';
import { Menu } from '@/components/ui/menu';
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
