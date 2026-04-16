import type React from 'react';
import { useCallback } from 'react';
import { useProjectDetailModal } from '@/components/features/Modals';
import { Menu } from '@/components/ui/Menu';

type Props = {
  projectId: string;
  onClose: () => void;
  onMouseEnter: () => void;
};

export function EditProjectDetails(props: Props) {
  const { projectId, onClose, onMouseEnter } = props;
  const { onOpen, setProjectId } = useProjectDetailModal();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.preventDefault();
      onClose();

      setProjectId(projectId);
      onOpen();
    },
    [onClose, setProjectId, projectId, onOpen],
  );

  return (
    <Menu.Item value="" onMouseEnter={onMouseEnter} onClick={handleClick}>
      Edit project details
    </Menu.Item>
  );
}
