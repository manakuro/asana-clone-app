import { RESET, useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { taskCollaboratorState } from '../atom';

export const useResetTaskCollaborator = () => {
  const resetTaskCollaborator = useAtomCallback(
    useCallback((_get, set, id: string) => {
      set(taskCollaboratorState(id), RESET);
    }, []),
  );

  const resetTaskCollaborators = useAtomCallback(
    useCallback((_get, set, taskTeammates: string[]) => {
      taskTeammates.forEach((id) => {
        set(taskCollaboratorState(id), RESET);
      });
    }, []),
  );

  return {
    resetTaskCollaborator,
    resetTaskCollaborators,
  };
};
