import { useTaskDetailProjectsInput } from '@/components/features/TaskDetail/hooks';
import { Icon } from '@/components/ui/Icon';
import { MenuItem } from '@/components/ui/Menu';
import { memo, useCallback } from 'react';

type Props = {
  onMouseEnter: () => void;
  onClose: () => void;
  taskId: string;
};

export const AddToAnotherProject = memo(function AddToAnotherProject(
  props: Props,
) {
  const { onMouseEnter, onClose } = props;
  const inputDisclosure = useTaskDetailProjectsInput();

  const handleClick = useCallback(async () => {
    onClose();
    inputDisclosure.onOpen();
  }, [inputDisclosure, onClose]);

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="bookAdd" color="text.muted" />}
      command="Tab+P"
      onClick={handleClick}
    >
      Add to another project
    </MenuItem>
  );
});
