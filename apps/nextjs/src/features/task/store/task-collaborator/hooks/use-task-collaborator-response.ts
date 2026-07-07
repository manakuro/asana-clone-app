import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { taskCollaboratorState } from '../atom';
import type { TaskCollaboratorResponse } from '../type';

export const useTaskCollaboratorResponse = () => {
  const setTaskCollaborators = useAtomCallback(
    useCallback((get, set, data: TaskCollaboratorResponse[]) => {
      data.forEach((d) => {
        const prev = get(taskCollaboratorState(d.id));
        set(taskCollaboratorState(d.id), {
          ...prev,
          ...d,
        });
      });
    }, []),
  );

  return {
    setTaskCollaborators,
  };
};
