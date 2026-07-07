import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { projectTeammateState } from '../atom';
import type { ProjectTeammate } from '../type';

export const useUpsert = () => {
  const upsert = useAtomCallback(
    useCallback((_, set, projectTeammate: ProjectTeammate) => {
      set(projectTeammateState(projectTeammate.id), projectTeammate);
    }, []),
  );

  return {
    upsert,
  };
};
