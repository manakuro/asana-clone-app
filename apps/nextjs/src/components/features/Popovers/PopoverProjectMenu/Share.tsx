import type React from 'react';
import { useCallback } from 'react';
import { useShareProjectModal } from '@/components/features/Modals';
import { Menu } from '@/components/ui/menu';

type Props = {
  projectId: string;
};

export function Share(props: Props) {
  const { projectId } = props;
  const { onOpen, setProjectId, setShareTab } = useShareProjectModal();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.preventDefault();

      setProjectId(projectId);
      setShareTab();
      onOpen();
    },
    [setProjectId, projectId, setShareTab, onOpen],
  );

  return (
    <Menu.Item value="Share" onClick={handleClick}>
      Share
    </Menu.Item>
  );
}
