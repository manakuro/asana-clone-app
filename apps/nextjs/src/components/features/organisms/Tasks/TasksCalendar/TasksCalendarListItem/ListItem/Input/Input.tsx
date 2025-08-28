import type { FlexProps } from '@/components/ui/atoms';
import { useTask, useTaskCommand } from '@/store/entities/task';
import { memo, useCallback } from 'react';
import { TasksNameField } from './TasksNameField';

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
