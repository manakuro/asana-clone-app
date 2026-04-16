import { memo, useCallback } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Menu } from '@/components/ui/Menu';
import { useToaster } from '@/hooks/useToaster';
import { useTask, useTaskCommand } from '@/store/entities/task';

type Props = {
  onMouseEnter: () => void;
  taskId: string;
};
export const DeleteTask = memo(function DeleteTask(props: Props) {
  // TODO: Fix `Can't perform a React state update on an unmounted component ...` error.
  const { onMouseEnter, taskId } = props;
  const { task } = useTask(props.taskId);
  const { deleteTask, undeleteTask } = useTaskCommand();
  const { toaster } = useToaster();

  const handleUndo = useCallback(async () => {
    await undeleteTask({ taskId });
  }, [taskId, undeleteTask]);

  const handleClick = useCallback(async () => {
    await deleteTask({ taskId });
    toaster.success({
      description: `${task.name} was deleted`,
      action: {
        label: 'Undo',
        onClick: handleUndo,
      },
      duration: 10000,
    });
  }, [deleteTask, taskId, toaster.success, task.name, handleUndo]);

  return (
    <Menu.Item
      onMouseEnter={onMouseEnter}
      color="alert"
      onClick={handleClick}
      value=""
    >
      <Icon icon="trash" color="alert" />
      Delete task
    </Menu.Item>
  );
});
