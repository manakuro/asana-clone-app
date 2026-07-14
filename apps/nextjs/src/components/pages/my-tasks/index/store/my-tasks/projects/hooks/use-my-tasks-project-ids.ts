import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { projectIdsState } from '../atom';

export const useMyTasksProjectIds = () => {
  const ids = useAtomValue(projectIdsState);
  const projectIds = useMemo(() => ids, [ids]);

  return {
    projectIds,
  };
};
