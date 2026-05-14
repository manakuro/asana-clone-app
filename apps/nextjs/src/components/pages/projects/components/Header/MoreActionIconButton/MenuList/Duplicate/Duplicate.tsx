import { memo } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Menu } from '@/components/ui/Menu';

export const Duplicate = memo(function Duplicate() {
  return (
    <Menu.Item value="Duplicate" disabled>
      <Icon icon="copyAlt" color="fg.muted" />
      Duplicate
    </Menu.Item>
  );
});
