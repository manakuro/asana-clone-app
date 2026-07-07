import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { createdByIdsByTaskIdsState } from '../atom';

export const useCreatedByIdsByTaskIds = (taskIds: string[]) => {
  const createdByIds = useAtomValue(
    useMemo(() => createdByIdsByTaskIdsState(taskIds), [taskIds]),
  );

  return {
    createdByIds,
  };
};
