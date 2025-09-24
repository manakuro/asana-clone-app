import { MenuItem } from '@/components/ui/Menu';
import { memo } from 'react';

type Props = {
  onClose: () => void;
  onMouseEnter: () => void;
  projectId: string;
};

export const DeleteProject = memo(function DeleteProject(props: Props) {
  const { onMouseEnter } = props;

  return (
    <MenuItem onMouseEnter={onMouseEnter} color="alert" isDisabled>
      Delete project
    </MenuItem>
  );
});
