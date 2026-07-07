import { memo, useCallback } from 'react';
import type { FlexProps } from '@/components/ui/flex';
import { useTask, useTaskCommand } from '@/features/task/store/task';
import { TasksNameField } from './tasks-name-field';

type Props = FlexProps & {
  taskId: string;
};

export const Input = memo(function Input(props: Props) {
  const { task, setTaskName } = useTask(props.taskId);
  const { deleteTask } = useTaskCommand();

  const handleDeleteTask = useCallback(async () => {
    await deleteTask({ taskId: props.taskId });
  }, [deleteTask, props.taskId]);

  const handleChangeName = useCallback(
    async (val: string) => {
      await setTaskName(val);
    },
    [setTaskName],
  );

  return (
    <TasksNameField
      value={task.name}
      isNew={task.isNew}
      onChange={handleChangeName}
      deleteTask={handleDeleteTask}
      focusedBorder
      flex={1}
    />
  );
});
