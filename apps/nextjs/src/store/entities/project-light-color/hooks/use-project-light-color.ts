import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { projectLightColorState } from '../atom';

export const useProjectLightColor = (projectLightColorId?: string) => {
  const projectLightColor = useAtomValue(
    useMemo(
      () => projectLightColorState(projectLightColorId || ''),
      [projectLightColorId],
    ),
  );

  return {
    projectLightColor,
  };
};
