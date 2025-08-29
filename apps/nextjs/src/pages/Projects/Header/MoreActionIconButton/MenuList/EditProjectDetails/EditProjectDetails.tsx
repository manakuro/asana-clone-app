import { useProjectDetailModal } from '@/components/features/organisms/Modals';
import { Icon } from '@/components/ui/atoms';
import { MenuItem } from '@/components/ui/organisms/Menu';
import type React from 'react';
import { memo, useCallback } from 'react';

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
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="pencil" color="text.muted" />}
      onClick={handleClick}
    >
      Edit Project details
    </MenuItem>
  );
});
