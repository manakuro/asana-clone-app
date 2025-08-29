import { MenuItem } from '@/components/ui/organisms/Menu';
import { memo, useCallback } from 'react';

type Props = {
  projectId: string;
  projectTeammateId: string;
};

export const RemoveFromProject = memo(function RemoveFromProject(_: Props) {
  const handleRemoveFromProject = useCallback(() => {}, []);

  return (
    <MenuItem onClick={handleRemoveFromProject} color="alert" isDisabled>
      Remove from Project
    </MenuItem>
  );
});
