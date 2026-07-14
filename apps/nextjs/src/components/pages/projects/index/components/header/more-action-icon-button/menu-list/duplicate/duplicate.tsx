import { memo } from 'react';
import { Icon } from '@/components/ui/icon';
import { Menu } from '@/components/ui/menu';

export const Duplicate = memo(function Duplicate() {
  return (
    <Menu.Item value="Duplicate" disabled>
      <Icon icon="copyAlt" color="fg.muted" />
      Duplicate
    </Menu.Item>
  );
});
