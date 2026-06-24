import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { projectTaskState } from '../atom';
import type { ProjectTask } from '../type';

export const useUpsert = () => {
  const upsert = useAtomCallback(
    useCallback((_, set, input: ProjectTask) => {
      set(projectTaskState(input.id), input);
    }, []),
  );

  return {
    upsert,
  };
};
