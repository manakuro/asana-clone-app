import { memo, useCallback } from 'react';
import { Menu } from '@/components/ui/Menu';

export const RemoveFromProject = memo(function RemoveFromProject() {
  const handleRemoveFromProject = useCallback(() => {}, []);

  return (
    <Menu.Item value="" onClick={handleRemoveFromProject} color="alert">
      Remove from Project
    </Menu.Item>
  );
});
