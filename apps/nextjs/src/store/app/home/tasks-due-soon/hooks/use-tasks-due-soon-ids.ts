import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { taskIdsState } from '../atom';

export const useTasksDueSoonIds = () => {
  const ids = useAtomValue(taskIdsState);
  const taskIds = useMemo(() => ids, [ids]);

  return {
    taskIds,
  };
};
