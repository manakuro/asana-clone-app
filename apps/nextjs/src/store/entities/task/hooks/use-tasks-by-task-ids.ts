import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { tasksByTaskIdsState } from '../atom';

export const useTasksByTaskIds = (taskIds: string[]) => {
  const tasks = useAtomValue(
    useMemo(() => tasksByTaskIdsState(taskIds), [taskIds]),
  );

  return {
    tasks,
  };
};
