import { memo, useCallback } from 'react';
import { Icon } from '@/components/ui/icon';
import { Menu } from '@/components/ui/menu';
import { useProjectDetailModal } from '@/features/project/components/project-detail-modal/use-project-detail-modal';

type Props = {
  projectId: string;
};

export const EditProjectDetails = memo(function EditProjectDetails(
  props: Props,
) {
  const { projectId } = props;
  const { onOpen, setProjectId } = useProjectDetailModal();

  const handleClick = useCallback(() => {
    setProjectId(projectId);
    onOpen();
  }, [setProjectId, projectId, onOpen]);

  return (
    <Menu.Item value="Edit Project details" onSelect={handleClick}>
      <Icon icon="pencil" color="fg.muted" />
      Edit Project details
    </Menu.Item>
  );
});
