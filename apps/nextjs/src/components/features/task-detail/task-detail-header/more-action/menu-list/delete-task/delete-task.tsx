import { memo, useCallback } from 'react';
import { Menu } from '@/components/ui/menu';
import { useToaster } from '@/hooks/useToaster';
import { useTask, useTaskCommand } from '@/store/entities/task';

type Props = {
  taskId: string;
};
export const DeleteTask = memo(function DeleteTask(props: Props) {
  const { taskId } = props;
  const { task } = useTask(props.taskId);
  const { deleteTask, undeleteTask } = useTaskCommand();
  const { toaster } = useToaster();

  const handleUndo = useCallback(async () => {
    await undeleteTask({ taskId });
  }, [taskId, undeleteTask]);

  const handleSelect = useCallback(async () => {
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
    <Menu.Item color="alert" onSelect={handleSelect} value="Delete task">
      Delete task
      <Menu.ItemCommand>Tab+Del</Menu.ItemCommand>
    </Menu.Item>
  );
});
