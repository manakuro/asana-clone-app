import { useMemo } from 'react';
import { useTasksTasksByTaskSectionId } from './useTasksTasksByTaskSectionId';

type Result = {
  incompleteTaskSize: number;
  completedTaskSize: number;
  taskSize: number;
};

export const useTasksCompletedTaskSizeByTaskSectionId = (
  taskSectionId: string,
): Result => {
  const { tasks } = useTasksTasksByTaskSectionId(taskSectionId);

  const incompleteTaskSize = useMemo(
    () => tasks.filter((t) => !t.completed).length,
    [tasks],
  );
  const completedTaskSize = useMemo(
    () => tasks.filter((t) => t.completed).length,
    [tasks],
  );

  return {
    incompleteTaskSize,
    completedTaskSize,
    taskSize: tasks.length,
  };
};
