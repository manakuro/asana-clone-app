import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { taskFeedIdsWithoutFirstState } from '@/store/entities/taskFeed';

export const useTaskFeedIdsWithoutFirstByTaskId = (taskId: string) => {
  const ids = useAtomValue(
    useMemo(() => taskFeedIdsWithoutFirstState(taskId), [taskId]),
  );

  const taskFeedIds = useMemo(() => {
    return ids;
  }, [ids]);

  return {
    taskFeedIdsWithoutFirst: taskFeedIds,
  };
};
