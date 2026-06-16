import { Menu } from '@/components/ui/Menu';
import { Portal } from '@/components/ui/Portal';

export function MenuList() {
  return (
    <Portal>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item value="0" disabled>
            Archive all
          </Menu.Item>
          <Menu.Item value="1" disabled>
            Manage notifications
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  );
}
