import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { tabStatusState } from '../atom';
import type { TeammateTaskTabStatus } from '../type';

export const useUpsert = () => {
  const upsert = useAtomCallback(
    useCallback((_get, set, input: Partial<TeammateTaskTabStatus>) => {
      set(tabStatusState, (prev) => ({
        ...prev,
        ...input,
      }));
    }, []),
  );

  return {
    upsert,
  };
};
