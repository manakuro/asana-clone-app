import { useTaskDetailDrawer } from '@/components/features/organisms/TaskDetails';
import { useTasksRouter } from '@/components/features/organisms/Tasks/hooks';
import { Icon } from '@/components/ui/atoms';
import { MenuItem } from '@/components/ui/organisms/Menu';
import { memo, useCallback, useMemo } from 'react';

type Props = {
  onMouseEnter: () => void;
  onCloseMenu: () => void;
  taskId: string;
};
export const ViewDetails = memo(function ViewDetails(props: Props) {
  const { onMouseEnter, onCloseMenu } = props;
  const { onClose } = useTaskDetailDrawer();
  const { navigateToTaskDetail, navigateToTaskBoard, isTaskDetailURLById } =
    useTasksRouter();
  const isOpen = useMemo(
    () => isTaskDetailURLById(props.taskId),
    [isTaskDetailURLById, props.taskId],
  );

  const handleClick = useCallback(async () => {
    if (isOpen) {
      await navigateToTaskBoard();
      await onClose();
    } else {
      await navigateToTaskDetail(props.taskId);
    }
    onCloseMenu();
  }, [
    isOpen,
    navigateToTaskBoard,
    navigateToTaskDetail,
    onClose,
    onCloseMenu,
    props.taskId,
  ]);

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="detail" color="text.muted" />}
      onClick={handleClick}
    >
      {isOpen ? 'Close details' : 'View details'}
    </MenuItem>
  );
});
