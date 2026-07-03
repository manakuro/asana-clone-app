import { memo, useCallback, useMemo } from 'react';
import { Icon } from '@/components/ui/icon';
import { Menu } from '@/components/ui/menu';
import { useTasksRouter } from '@/features/task/hooks';
import { useTaskDetailDrawer } from '@/features/task-detail/components/task-detail-drawer';

type Props = {
  taskId: string;
};
export const ViewDetails = memo(function ViewDetails(props: Props) {
  const { onClose } = useTaskDetailDrawer();
  const { navigateToTaskDetail, navigateToTaskBoard, isTaskDetailURLById } =
    useTasksRouter();
  const open = useMemo(
    () => isTaskDetailURLById(props.taskId),
    [isTaskDetailURLById, props.taskId],
  );

  const handleClick = useCallback(async () => {
    if (open) {
      navigateToTaskBoard();
      // Execute onClose after the pathname changes to detect URL params.
      setTimeout(() => {
        onClose();
      }, 100);
    } else {
      navigateToTaskDetail(props.taskId);
    }
  }, [open, navigateToTaskBoard, navigateToTaskDetail, onClose, props.taskId]);

  return (
    <Menu.Item onSelect={handleClick} value="details">
      <Icon icon="detail" color="fg.muted" />
      {open ? 'Close details' : 'View details'}
    </Menu.Item>
  );
});
