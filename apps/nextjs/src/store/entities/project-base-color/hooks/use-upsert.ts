import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { projectBaseColorState } from '../atom';
import type { ProjectBaseColor } from '../type';

export const useUpsert = () => {
  const upsert = useAtomCallback(
    useCallback((_, set, projectBaseColor: ProjectBaseColor) => {
      set(projectBaseColorState(projectBaseColor.id), projectBaseColor);
    }, []),
  );

  return {
    upsert,
  };
};
