import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { ownerProjectTeammateByProjectIdState } from '../atom';

export const useOwnerTeammateIdsByProjectId = (projectId: string) => {
  const projectTeammate = useAtomValue(
    useMemo(() => ownerProjectTeammateByProjectIdState(projectId), [projectId]),
  );

  return {
    projectTeammate,
  };
};
