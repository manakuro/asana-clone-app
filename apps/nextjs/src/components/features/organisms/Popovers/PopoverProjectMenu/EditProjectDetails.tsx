import type React from 'react';
import { useCallback } from 'react';
import { useProjectDetailModal } from 'src/components/features/organisms/Modals';
import { MenuItem } from './MenuItem';

type Props = {
  projectId: string;
  onClose: () => void;
  onMouseEnter: () => void;
};

export const EditProjectDetails: React.FC<Props> = (props) => {
  const { projectId, onClose, onMouseEnter } = props;
  const { onOpen, setProjectId } = useProjectDetailModal();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      onClose();

      setProjectId(projectId);
      onOpen();
    },
    [onClose, setProjectId, projectId, onOpen],
  );

  return (
    <MenuItem onMouseEnter={onMouseEnter} onClick={handleClick}>
      Edit project details
    </MenuItem>
  );
};
