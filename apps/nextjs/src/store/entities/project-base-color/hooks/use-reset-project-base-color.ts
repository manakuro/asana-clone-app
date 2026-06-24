import { RESET, useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { projectBaseColorState } from '../atom';

export const useResetProjectBaseColor = () => {
  const resetProjectBaseColor = useAtomCallback(
    useCallback((_, set, id: string) => {
      set(projectBaseColorState(id), RESET);
    }, []),
  );

  const resetProjectBaseColors = useAtomCallback(
    useCallback((_, set, projectBaseColors: string[]) => {
      projectBaseColors.forEach((id) => {
        set(projectBaseColorState(id), RESET);
      });
    }, []),
  );

  return {
    resetProjectBaseColor,
    resetProjectBaseColors,
  };
};
