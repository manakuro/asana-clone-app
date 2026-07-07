import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { projectTaskSectionState } from '../atom';
import type { ProjectTaskSection } from '../type';

export const useUpsert = () => {
  const upsert = useAtomCallback(
    useCallback((_, set, input: ProjectTaskSection) => {
      set(projectTaskSectionState(input.id), input);
    }, []),
  );

  return {
    upsert,
  };
};
