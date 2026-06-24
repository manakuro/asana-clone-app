import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { taskIdsByTaskParentIdState } from '../atom';

export const useSubtaskIds = (taskId: string) => {
  const taskIds = useAtomValue(
    useMemo(() => taskIdsByTaskParentIdState(taskId), [taskId]),
  );

  return {
    taskIds,
  };
};
