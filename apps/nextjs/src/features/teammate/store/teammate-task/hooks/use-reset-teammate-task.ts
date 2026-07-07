import { RESET, useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { teammateTaskState } from '../atom';

export const useResetTeammateTask = () => {
  const resetTeammateTask = useAtomCallback(
    useCallback((_, set, id: string) => {
      set(teammateTaskState(id), RESET);
    }, []),
  );

  const resetTeammateTasks = useAtomCallback(
    useCallback((_, set, teammateTasks: string[]) => {
      teammateTasks.forEach((id) => {
        set(teammateTaskState(id), RESET);
      });
    }, []),
  );

  return {
    resetTeammateTask,
    resetTeammateTasks,
  };
};
