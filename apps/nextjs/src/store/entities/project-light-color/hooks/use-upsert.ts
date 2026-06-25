import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { projectLightColorState } from '../atom';
import type { ProjectLightColor } from '../type';

export const useUpsert = () => {
  const upsert = useAtomCallback(
    useCallback((_, set, projectLightColor: ProjectLightColor) => {
      set(projectLightColorState(projectLightColor.id), projectLightColor);
    }, []),
  );

  return {
    upsert,
  };
};
