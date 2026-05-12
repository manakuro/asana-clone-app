import type React from 'react';
import { memo, useCallback } from 'react';
import { useProjectDetailModal } from '@/components/features/Modals';
import { Icon } from '@/components/ui/Icon';
import { Menu } from '@/components/ui/Menu';

type Props = {
  onClose: () => void;
  onMouseEnter: () => void;
  projectId: string;
};

export const EditProjectDetails = memo(function EditProjectDetails(
  props: Props,
) {
  const { onMouseEnter, projectId, onClose } = props;
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
      <Icon icon="pencil" color="fg.muted" />
      Edit Project details
    </Menu.Item>
  );
});
