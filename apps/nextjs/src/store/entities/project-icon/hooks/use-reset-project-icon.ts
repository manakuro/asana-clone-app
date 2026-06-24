import { RESET, useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { projectIconState } from '../atom';

export const useResetProjectIcon = () => {
  const resetProjectIcon = useAtomCallback(
    useCallback((_, set, id: string) => {
      set(projectIconState(id), RESET);
    }, []),
  );

  const resetProjectIcons = useAtomCallback(
    useCallback((_, set, projectIcons: string[]) => {
      projectIcons.forEach((id) => {
        set(projectIconState(id), RESET);
      });
    }, []),
  );

  return {
    resetProjectIcon,
    resetProjectIcons,
  };
};
