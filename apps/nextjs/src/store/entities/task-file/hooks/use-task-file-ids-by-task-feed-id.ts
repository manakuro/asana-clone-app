import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { taskFileIdsByFeedIdState } from '../atom';

export const useTaskFileIdsByTaskFeedId = (taskFeedId: string) => {
  const taskFileIds = useAtomValue(
    useMemo(() => taskFileIdsByFeedIdState(taskFeedId), [taskFeedId]),
  );

  return {
    taskFileIds,
  };
};
