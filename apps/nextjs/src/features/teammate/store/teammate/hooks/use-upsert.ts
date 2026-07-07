import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { teammateState } from '../atom';
import type { Teammate } from '../type';

export const useUpsert = () => {
  const upsert = useAtomCallback(
    useCallback((get, set, input: Teammate) => {
      const prev = get(teammateState(input.id));
      set(teammateState(input.id), {
        ...prev,
        ...input,
      });
    }, []),
  );

  return {
    upsert,
  };
};
