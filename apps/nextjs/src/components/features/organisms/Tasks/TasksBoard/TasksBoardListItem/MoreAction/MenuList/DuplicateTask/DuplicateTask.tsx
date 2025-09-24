import { useDuplicateTaskModal } from '@/components/features/organisms/Modals';
import { MenuItem } from '@/components/ui/Menu';
import { Icon } from '@/components/ui/atoms/Icon';
import { memo, useCallback } from 'react';

type Props = {
  onMouseEnter: () => void;
  onCloseMenu: () => void;
  taskId: string;
};
export const DuplicateTask = memo(function DuplicateTask(props: Props) {
  const { onMouseEnter, onCloseMenu, taskId } = props;
  const { onOpen, setTaskId } = useDuplicateTaskModal();

  const handleClick = useCallback(() => {
    setTaskId(taskId);
    onOpen();
    onCloseMenu();
  }, [onCloseMenu, onOpen, setTaskId, taskId]);

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="copyAlt" color="text.muted" />}
      onClick={handleClick}
      isDisabled
    >
      Duplicate task
    </MenuItem>
  );
});
