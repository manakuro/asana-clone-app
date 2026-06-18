import { memo, useCallback } from 'react';
import { useProjectDetailModal } from '@/components/features/Modals';
import { Icon } from '@/components/ui/icon';
import { Menu } from '@/components/ui/menu';

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
