import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { taskFeedIdsByTaskIdState } from '@/features/task/store/task-feed';

export const useTaskFeedIdsByTaskId = (taskId: string) => {
  const ids = useAtomValue(
    useMemo(() => taskFeedIdsByTaskIdState(taskId), [taskId]),
  );

  const taskFeedIds = useMemo(() => {
    return ids;
  }, [ids]);

  return {
    taskFeedIds,
  };
};
