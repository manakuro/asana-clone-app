import { RESET, useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { projectTaskSectionState } from '../atom';

export const useResetProjectTaskSection = () => {
  const resetProjectTaskSection = useAtomCallback(
    useCallback((_, set, id: string) => {
      set(projectTaskSectionState(id), RESET);
    }, []),
  );

  const resetProjectTaskSections = useAtomCallback(
    useCallback((_, set, ids: string[]) => {
      ids.forEach((id) => {
        set(projectTaskSectionState(id), RESET);
      });
    }, []),
  );

  return {
    resetProjectTaskSection,
    resetProjectTaskSections,
  };
};
