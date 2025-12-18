import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { useProjectsProjectId } from '@/store/app/projects/project';
import { projectsTaskSectionIdsState } from '../atom';

export const useProjectsTaskSectionIds = () => {
  const { projectId } = useProjectsProjectId();
  const taskSectionIds = useAtomValue(
    useMemo(() => projectsTaskSectionIdsState(projectId), [projectId]),
  );

  return {
    taskSectionIds,
  };
};
