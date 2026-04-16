import { memo, useCallback } from 'react';
import { Menu } from '@/components/ui/Menu';

type Props = {
  projectId: string;
  projectTeammateId: string;
};

export const RemoveFromProject = memo(function RemoveFromProject(_: Props) {
  const handleRemoveFromProject = useCallback(() => {}, []);

  return (
    <Menu.Item
      value=""
      onClick={handleRemoveFromProject}
      color="alert"
      disabled
    >
      Remove from Project
    </Menu.Item>
  );
});
