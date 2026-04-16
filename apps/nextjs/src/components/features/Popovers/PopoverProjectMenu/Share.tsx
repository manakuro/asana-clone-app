import type React from 'react';
import { useCallback } from 'react';
import { useShareProjectModal } from '@/components/features/Modals';
import { Menu } from '@/components/ui/Menu';

type Props = {
  projectId: string;
  onClose: () => void;
  onMouseEnter: () => void;
};

export function Share(props: Props) {
  const { projectId, onClose, onMouseEnter } = props;
  const { onOpen, setProjectId, setShareTab } = useShareProjectModal();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
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
    <Menu.Item value="" onMouseEnter={onMouseEnter} onClick={handleClick}>
      Share
    </Menu.Item>
  );
}
