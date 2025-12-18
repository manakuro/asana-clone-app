import { RESET, useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { projectLightColorState } from '../atom';

export const useResetProjectLightColor = () => {
  const resetProjectLightColor = useAtomCallback(
    useCallback((_, set, id: string) => {
      set(projectLightColorState(id), RESET);
    }, []),
  );

  const resetProjectLightColors = useAtomCallback(
    useCallback((_, set, projectLightColors: string[]) => {
      projectLightColors.forEach((id) => {
        set(projectLightColorState(id), RESET);
      });
    }, []),
  );

  return {
    resetProjectLightColor,
    resetProjectLightColors,
  };
};
