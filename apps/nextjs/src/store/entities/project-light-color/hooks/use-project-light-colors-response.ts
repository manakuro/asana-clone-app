import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { projectLightColorState } from '../atom';
import type { ProjectLightColor } from '../type';

export const useProjectLightColorsResponse = () => {
  const setProjectLightColors = useAtomCallback(
    useCallback((_, set, data: ProjectLightColor[]) => {
      data.forEach((p) => {
        set(projectLightColorState(p.id), p);
      });
    }, []),
  );

  return {
    setProjectLightColors,
  };
};
