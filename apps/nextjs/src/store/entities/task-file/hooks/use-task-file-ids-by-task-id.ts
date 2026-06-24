import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { taskFileIdsByTaskIdState } from '../atom';

export const useTaskFileIdsByTaskId = (taskId: string) => {
  const taskFileIds = useAtomValue(
    useMemo(() => taskFileIdsByTaskIdState(taskId), [taskId]),
  );

  return {
    taskFileIds,
  };
};
