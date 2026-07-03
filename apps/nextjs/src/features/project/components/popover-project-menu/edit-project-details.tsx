import type React from 'react';
import { useCallback } from 'react';
import { Menu } from '@/components/ui/menu';
import { useProjectDetailModal } from '@/features/project/components/project-detail-modal/use-project-detail-modal';

type Props = {
  projectId: string;
};

export function EditProjectDetails(props: Props) {
  const { projectId } = props;
  const { onOpen, setProjectId } = useProjectDetailModal();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.preventDefault();

      setProjectId(projectId);
      onOpen();
    },
    [setProjectId, projectId, onOpen],
  );

  return (
    <Menu.Item value="Edit project details" onClick={handleClick}>
      Edit project details
    </Menu.Item>
  );
}
