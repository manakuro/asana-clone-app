import { memo } from 'react';
import { Menu } from '@/components/ui/Menu';
import { Portal } from '@/components/ui/Portal';

export const MenuList = memo(function MenuList() {
  return (
    <Portal>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item disabled value="">
            Save layout as default
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  );
});
