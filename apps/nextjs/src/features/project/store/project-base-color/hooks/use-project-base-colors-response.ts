import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { projectBaseColorState } from '../atom';
import type { ProjectBaseColor } from '../type';

export const useProjectBaseColorsResponse = () => {
  const setProjectBaseColors = useAtomCallback(
    useCallback((_, set, projectBaseColors: ProjectBaseColor[]) => {
      projectBaseColors.forEach((p) => {
        set(projectBaseColorState(p.id), p);
      });
    }, []),
  );

  return {
    setProjectBaseColors,
  };
};
