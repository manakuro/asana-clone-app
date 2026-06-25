import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { teammateIdsByTaskIdState } from '../atom';

export const useTeammateIdsByTaskId = (taskId: string) => {
  const teammateIds = useAtomValue(
    useMemo(() => teammateIdsByTaskIdState(taskId), [taskId]),
  );

  return {
    teammateIds,
  };
};
