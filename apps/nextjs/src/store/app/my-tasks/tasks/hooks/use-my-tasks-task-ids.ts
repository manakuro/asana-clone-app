import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { taskIdsState } from '../atom';

export const useMyTasksTaskIds = () => {
  const ids = useAtomValue(taskIdsState);
  const taskIds = useMemo(() => ids, [ids]);

  return {
    taskIds,
  };
};
