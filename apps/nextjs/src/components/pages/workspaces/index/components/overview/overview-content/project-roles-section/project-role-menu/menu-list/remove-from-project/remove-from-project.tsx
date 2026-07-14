import { memo, useCallback } from 'react';
import { Menu } from '@/components/ui/menu';

export const RemoveFromProject = memo(function RemoveFromProject() {
  const handleRemoveFromProject = useCallback(() => {}, []);

  return (
    <Menu.Item
      value="Remove from Project"
      onSelect={handleRemoveFromProject}
      color="alert"
    >
      Remove from Project
    </Menu.Item>
  );
});
