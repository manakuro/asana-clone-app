import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { projectTaskIdsByTaskIdState } from '../atom';

export const useProjectTaskIdsByTaskId = (taskId: string) => {
  const projectTaskIds = useAtomValue(
    useMemo(() => projectTaskIdsByTaskIdState(taskId), [taskId]),
  );

  return {
    projectTaskIds,
  };
};
