import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { projectState } from '../atom';
import type { Project } from '../type';

export const useUpsert = () => {
  const upsert = useAtomCallback(
    useCallback((get, set, project: Project) => {
      const prev = get(projectState(project.id));
      set(projectState(project.id), {
        ...prev,
        ...project,
        description: {
          ...prev.description,
          ...project.description,
        },
      });
    }, []),
  );

  return {
    upsert,
  };
};
