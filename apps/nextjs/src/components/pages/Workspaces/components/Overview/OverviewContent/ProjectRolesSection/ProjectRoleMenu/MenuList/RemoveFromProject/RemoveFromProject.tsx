import { MenuItem } from '@/components/ui/Menu';
import { memo, useCallback } from 'react';

export const RemoveFromProject = memo(function RemoveFromProject() {
  const handleRemoveFromProject = useCallback(() => {}, []);

  return (
    <MenuItem onClick={handleRemoveFromProject} color="alert">
      Remove from Project
    </MenuItem>
  );
});
