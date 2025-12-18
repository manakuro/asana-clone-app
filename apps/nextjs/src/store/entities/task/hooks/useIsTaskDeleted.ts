import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { deletedTasksByTaskIdState } from '@/store/entities/deletedTask';

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
