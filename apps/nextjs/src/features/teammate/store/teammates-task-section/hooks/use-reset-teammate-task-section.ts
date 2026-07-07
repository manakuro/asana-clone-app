import { RESET, useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { teammatesTaskSectionState } from '../atom';
import type { TeammateTaskSection } from '../type';

export const useResetTeammateTaskSection = () => {
  const resetTeammateTaskSection = useAtomCallback(
    useCallback((_, set, id: string) => {
      set(teammatesTaskSectionState(id), RESET);
    }, []),
  );

  const resetTeammateTaskSections = useAtomCallback(
    useCallback((_, set, teammateTaskSections: TeammateTaskSection[]) => {
      teammateTaskSections.forEach((t) => {
        set(teammatesTaskSectionState(t.id), RESET);
      });
    }, []),
  );

  return {
    resetTeammateTaskSection,
    resetTeammateTaskSections,
  };
};
