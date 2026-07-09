import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { taskIdsByTaskActivityIdState } from '../atom';

export const useTaskActivityTasksTaskIds = (taskActivityId: string) => {
  const taskIds = useAtomValue(
    useMemo(
      () => taskIdsByTaskActivityIdState(taskActivityId),
      [taskActivityId],
    ),
  );

  return {
    taskIds,
  };
};
