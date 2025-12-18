import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { taskFeedIdsByTaskIdState } from '@/store/entities/taskFeed';

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
