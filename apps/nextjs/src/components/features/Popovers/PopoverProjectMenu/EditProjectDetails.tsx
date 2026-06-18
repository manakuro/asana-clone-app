import type React from 'react';
import { useCallback } from 'react';
import { useProjectDetailModal } from '@/components/features/Modals';
import { Menu } from '@/components/ui/menu';

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
