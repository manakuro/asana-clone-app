import { memo } from 'react';
import { Icon } from '@/components/ui/icon';
import { Menu } from '@/components/ui/menu';

export const SaveLayoutAsDefault = memo(function SaveLayoutAsDefault() {
  return (
    <Menu.Item value="Save layout as default" disabled>
      <Icon icon="save" color="fg.muted" />
      Save layout as default
    </Menu.Item>
  );
});
