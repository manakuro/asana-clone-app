import { memo, useCallback, useMemo } from 'react';
import { useTaskDetailDrawer } from '@/components/features/TaskDetails';
import { useTasksRouter } from '@/components/features/Tasks/hooks';
import { Icon } from '@/components/ui/Icon';
import { Menu } from '@/components/ui/Menu';

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
  const open = useMemo(
    () => isTaskDetailURLById(props.taskId),
    [isTaskDetailURLById, props.taskId],
  );

  const handleClick = useCallback(async () => {
    if (open) {
      await navigateToTaskBoard();
      await onClose();
    } else {
      await navigateToTaskDetail(props.taskId);
    }
    onCloseMenu();
  }, [
    open,
    navigateToTaskBoard,
    navigateToTaskDetail,
    onClose,
    onCloseMenu,
    props.taskId,
  ]);

  return (
    <Menu.Item onMouseEnter={onMouseEnter} onClick={handleClick} value="">
      <Icon icon="detail" color="text.muted" />
      {open ? 'Close details' : 'View details'}
    </Menu.Item>
  );
});
