import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { taskIdsWithNoProjectState } from '../atom';

export const useMyTasksTaskIdsWithNoProject = () => {
  const ids = useAtomValue(taskIdsWithNoProjectState);
  const taskIds = useMemo(() => ids, [ids]);

  return {
    taskIds,
  };
};
