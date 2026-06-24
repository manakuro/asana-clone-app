import { memo } from 'react';
import { Menu } from '@/components/ui/menu';

export const Archive = memo(function Archive() {
  return (
    <Menu.Item value="Archive" disabled>
      Archive
    </Menu.Item>
  );
});
