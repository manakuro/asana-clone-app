import { RESET, useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { tabStatusState } from '../atom';

export const useResetTeammateTaskTabStatus = () => {
  const resetTeammateTaskTabStatus = useAtomCallback(
    useCallback((_get, set) => {
      set(tabStatusState, RESET);
    }, []),
  );

  return {
    resetTeammateTaskTabStatus,
  };
};
