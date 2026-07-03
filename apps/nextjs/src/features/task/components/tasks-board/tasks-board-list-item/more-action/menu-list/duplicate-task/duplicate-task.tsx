import { memo } from 'react';
import { Icon } from '@/components/ui/icon';
import { Menu } from '@/components/ui/menu';

export const DuplicateTask = memo(function DuplicateTask() {
  return (
    <Menu.Item disabled value="Duplicate task">
      <Icon icon="copyAlt" color="fg.muted" />
      Duplicate task
    </Menu.Item>
  );
});
