import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { taskIdsByProjectIdState } from '../atom';

export const useMyTasksTaskIdsByProjectId = (projectId: string) => {
  const ids = useAtomValue(
    useMemo(() => taskIdsByProjectIdState(projectId), [projectId]),
  );
  const taskIds = useMemo(() => ids, [ids]);

  return {
    taskIds,
  };
};
