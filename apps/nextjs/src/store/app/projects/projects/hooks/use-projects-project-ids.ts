import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { projectsProjectIdsState } from '../atom';

export const useProjectsProjectIds = () => {
  const ids = useAtomValue(projectsProjectIdsState);
  const projectIds = useMemo(() => ids, [ids]);

  return {
    projectIds,
  };
};
