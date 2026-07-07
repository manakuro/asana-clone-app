import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { taskCollaboratorState } from '../atom';
import type { TaskCollaborator } from '../type';

export const useUpsert = () => {
  const upsert = useAtomCallback(
    useCallback((get, set, input: TaskCollaborator) => {
      const prev = get(taskCollaboratorState(input.id));
      set(taskCollaboratorState(input.id), {
        ...prev,
        ...input,
      });
    }, []),
  );

  return {
    upsert,
  };
};
