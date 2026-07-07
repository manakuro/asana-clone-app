import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { projectIconState } from '../atom';
import type { ProjectIcon } from '../type';

export const useUpsert = () => {
  const upsert = useAtomCallback(
    useCallback((_, set, projectIcon: ProjectIcon) => {
      set(projectIconState(projectIcon.id), projectIcon);
    }, []),
  );

  return {
    upsert,
  };
};
