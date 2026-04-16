import { memo } from 'react';
import { Menu } from '@/components/ui/Menu';

type Props = {
  onClose: () => void;
  onMouseEnter: () => void;
  projectId: string;
};

export const DeleteProject = memo(function DeleteProject(props: Props) {
  const { onMouseEnter } = props;

  return (
    <Menu.Item value="" onMouseEnter={onMouseEnter} color="alert" disabled>
      Delete project
    </Menu.Item>
  );
});
