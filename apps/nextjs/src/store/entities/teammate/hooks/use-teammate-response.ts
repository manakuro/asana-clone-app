import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { teammateState } from '../atom';
import type { Teammate } from '../type';

export const useTeammateResponse = () => {
  const setTeammates = useAtomCallback(
    useCallback((get, set, teammates: Teammate[]) => {
      teammates.forEach((t) => {
        const prev = get(teammateState(t.id));
        set(teammateState(t.id), {
          ...prev,
          ...t,
        });
      });
    }, []),
  );

  return {
    setTeammates,
  };
};
