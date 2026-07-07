import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { deletedTasksByTaskIdState } from '@/features/task/store/deleted-task';

export const useIsTaskDeleted = (taskId: string) => {
  const deletedTasks = useAtomValue(
    useMemo(() => deletedTasksByTaskIdState(taskId), [taskId]),
  );
  const isTaskDeleted = useMemo(
    () => !!deletedTasks.length,
    [deletedTasks.length],
  );

  return {
    isTaskDeleted,
  };
};
