import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { meState } from '../atom';
import type { Me } from '../type';

export const useUpsert = () => {
  const upsert = useAtomCallback(
    useCallback((get, set, input: Me) => {
      const prev = get(meState);
      set(meState, {
        ...prev,
        ...input,
      });
    }, []),
  );

  return {
    upsert,
  };
};
