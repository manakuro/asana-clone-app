import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { projectBaseColorState } from '../atom';

export const useProjectBaseColor = (projectBaseColorId?: string) => {
  const projectBaseColor = useAtomValue(
    useMemo(
      () => projectBaseColorState(projectBaseColorId || ''),
      [projectBaseColorId],
    ),
  );

  return {
    projectBaseColor,
  };
};
