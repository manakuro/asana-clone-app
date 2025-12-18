import { memo, useCallback } from 'react';
import { MenuItem } from '@/components/ui/Menu';

export const RemoveFromProject = memo(function RemoveFromProject() {
  const handleRemoveFromProject = useCallback(() => {}, []);

  return (
    <MenuItem onClick={handleRemoveFromProject} color="alert">
      Remove from Project
    </MenuItem>
  );
});
