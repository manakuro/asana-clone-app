import { memo } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Menu } from '@/components/ui/Menu';

export const DuplicateTask = memo(function DuplicateTask() {
  return (
    <Menu.Item disabled value="Duplicate task">
      <Icon icon="copyAlt" color="fg.muted" />
      Duplicate task
    </Menu.Item>
  );
});
