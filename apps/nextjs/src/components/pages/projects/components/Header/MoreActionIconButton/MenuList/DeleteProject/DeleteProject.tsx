import { memo } from 'react';
import { Menu } from '@/components/ui/Menu';

export const DeleteProject = memo(function DeleteProject() {
  return (
    <Menu.Item value="Delete project" color="fg.error" disabled>
      Delete project
    </Menu.Item>
  );
});
