import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { useProjectsProjectId } from '@/store/app/projects/project';
import { projectsTaskColumnIdsState } from '../atom';

export const useProjectsTaskColumnIds = () => {
  const { projectId } = useProjectsProjectId();
  const ids = useAtomValue(
    useMemo(() => projectsTaskColumnIdsState(projectId), [projectId]),
  );

  return {
    tasksTaskColumnIds: ids,
  };
};
