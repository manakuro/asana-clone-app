import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { taskIdsByProjectIdState } from '../atom';

export const useProjectsTaskIdsByProjectId = (projectId: string) => {
  const ids = useAtomValue(taskIdsByProjectIdState(projectId));
  const taskIds = useMemo(() => ids, [ids]);

  return {
    taskIds,
  };
};
