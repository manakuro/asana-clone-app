import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { taskListStatusState } from '../atom';
import type { TeammateTaskListStatus } from '../type';

export const useUpsert = () => {
  const upsert = useAtomCallback(
    useCallback((get, set, input: Partial<TeammateTaskListStatus>) => {
      const prev = get(taskListStatusState);
      set(taskListStatusState, {
        ...prev,
        ...input,
      });
    }, []),
  );

  return {
    upsert,
  };
};
