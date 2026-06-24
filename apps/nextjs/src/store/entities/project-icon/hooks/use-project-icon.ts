import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { projectIconState } from '../atom';

export const useProjectIcon = (projectIconId?: string) => {
  const projectIcon = useAtomValue(
    useMemo(() => projectIconState(projectIconId || ''), [projectIconId]),
  );

  return {
    projectIcon,
  };
};
