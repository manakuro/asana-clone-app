import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { projectTeammateState } from '../atom';
import type { ProjectTeammateResponse } from '../type';

export const useProjectTeammateResponse = () => {
  const setProjectsTeammates = useAtomCallback(
    useCallback((get, set, data: ProjectTeammateResponse[]) => {
      data.forEach((d) => {
        const prev = get(projectTeammateState(d.id));
        set(projectTeammateState(d.id), { ...prev, ...d });
      });
    }, []),
  );

  return {
    setProjectsTeammates,
  };
};
