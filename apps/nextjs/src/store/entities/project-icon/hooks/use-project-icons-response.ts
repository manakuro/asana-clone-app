import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { projectIconState } from '../atom';
import type { ProjectIcon } from '../type';

export const useProjectIconsResponse = () => {
  const setProjectIcons = useAtomCallback(
    useCallback((_, set, data: ProjectIcon[]) => {
      data.forEach((p) => {
        set(projectIconState(p.id), p);
      });
    }, []),
  );

  return {
    setProjectIcons,
  };
};
