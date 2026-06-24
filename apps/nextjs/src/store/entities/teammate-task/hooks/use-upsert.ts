import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { teammateTaskState } from '../atom';
import type { TeammateTask } from '../type';

export const useUpsert = () => {
  const upsert = useAtomCallback(
    useCallback((_, set, input: TeammateTask) => {
      set(teammateTaskState(input.id), input);
    }, []),
  );

  return {
    upsert,
  };
};
