import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { projectTeammateIdsByProjectIdState } from '../atom';

export const useProjectTeammateIdsByProjectId = (projectId: string) => {
  const projectTeammateIds = useAtomValue(
    useMemo(() => projectTeammateIdsByProjectIdState(projectId), [projectId]),
  );

  return {
    projectTeammateIds,
  };
};
