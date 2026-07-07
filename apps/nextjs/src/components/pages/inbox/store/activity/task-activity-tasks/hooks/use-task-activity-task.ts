import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { taskActivityTaskState } from '../atom';

export const useTaskActivityTask = (taskActivityTaskId: string) => {
  const taskActivityTask = useAtomValue(
    useMemo(
      () => taskActivityTaskState(taskActivityTaskId),
      [taskActivityTaskId],
    ),
  );

  return {
    taskActivityTask,
  };
};
