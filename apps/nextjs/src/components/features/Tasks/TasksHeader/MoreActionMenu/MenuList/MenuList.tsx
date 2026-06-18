import { memo } from 'react';
import { Menu } from '@/components/ui/menu';
import { Portal } from '@/components/ui/portal';

export const MenuList = memo(function MenuList() {
  return (
    <Portal>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item disabled value="Save layout as default">
            Save layout as default
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  );
});
