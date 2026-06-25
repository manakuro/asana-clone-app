import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { taskTagIdsByTaskIdState } from '../atom';

export const useTaskTagIdsByTaskId = (taskId: string) => {
  const taskTagIds = useAtomValue(
    useMemo(() => taskTagIdsByTaskIdState(taskId), [taskId]),
  );
  return {
    taskTagIds,
  };
};
