import { memo, useCallback } from 'react';
import { Menu } from '@/components/ui/Menu';
import { useToaster } from '@/hooks/useToaster';
import { useTask, useTaskCommand } from '@/store/entities/task';

type Props = {
  onMouseEnter: () => void;
  onClose: () => void;
  taskId: string;
};
export const DeleteTask = memo(function DeleteTask(props: Props) {
  // TODO: Fix `Can't perform a React state update on an unmounted component ...` error.
  const { onMouseEnter, taskId, onClose } = props;
  const { task } = useTask(props.taskId);
  const { deleteTask, undeleteTask } = useTaskCommand();
  const { toaster } = useToaster();

  const handleUndo = useCallback(async () => {
    await undeleteTask({ taskId });
  }, [taskId, undeleteTask]);

  const handleClick = useCallback(async () => {
    onClose();
    await deleteTask({ taskId });
    toaster.success({
      description: `${task.name} was deleted`,
      action: {
        label: 'Undo',
        onClick: handleUndo,
      },
      duration: 10000,
    });
  }, [onClose, deleteTask, taskId, toaster.success, task.name, handleUndo]);

  return (
    <Menu.Item
      onMouseEnter={onMouseEnter}
      color="alert"
      onClick={handleClick}
      value=""
    >
      Delete task
      <Menu.ItemCommand>Tab+Del</Menu.ItemCommand>
    </Menu.Item>
  );
});
