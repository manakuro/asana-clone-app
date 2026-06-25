import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useCallback, useMemo } from 'react';
import { projectState } from '../atom';
import type { Project } from '../type';

export const useProject = (projectId: string) => {
  const project = useAtomValue(
    useMemo(() => projectState(projectId), [projectId]),
  );

  const setProject = useAtomCallback(
    useCallback(
      (get, set, input: Partial<Project>) => {
        const prev = get(projectState(project.id));
        const updated = {
          ...prev,
          ...input,
        };
        set(projectState(project.id), updated);
      },
      [project.id],
    ),
  );

  return {
    project,
    setProject,
  };
};
