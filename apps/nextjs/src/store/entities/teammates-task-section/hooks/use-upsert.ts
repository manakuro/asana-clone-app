import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { teammatesTaskSectionState } from '../atom';
import type { TeammateTaskSection } from '../type';

export const useUpsert = () => {
  const upsert = useAtomCallback(
    useCallback((_, set, input: TeammateTaskSection) => {
      set(teammatesTaskSectionState(input.id), input);
    }, []),
  );

  return {
    upsert,
  };
};
