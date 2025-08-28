import { useShareProjectModal } from '@/components/features/organisms/Modals';
import type React from 'react';
import { useCallback } from 'react';
import { MenuItem } from './MenuItem';

type Props = {
  projectId: string;
  onClose: () => void;
  onMouseEnter: () => void;
};

export function Share(props: Props) {
  const { projectId, onClose, onMouseEnter } = props;
  const { onOpen, setProjectId, setShareTab } = useShareProjectModal();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      onClose();

      setProjectId(projectId);
      setShareTab();
      onOpen();
    },
    [onClose, setProjectId, projectId, setShareTab, onOpen],
  );

  return (
    <MenuItem onMouseEnter={onMouseEnter} onClick={handleClick}>
      Share
    </MenuItem>
  );
}
