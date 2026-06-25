import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { projectTaskSectionsByProjectIdState } from '../atom';

export const useProjectsTaskSectionsByProjectId = (projectId: string) => {
  const projectTaskSections = useAtomValue(
    useMemo(() => projectTaskSectionsByProjectIdState(projectId), [projectId]),
  );

  return {
    projectTaskSections,
  };
};
