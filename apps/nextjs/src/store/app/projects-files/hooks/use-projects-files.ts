import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { useProjectsProjectId } from '@/store/app/projects/project';
import { taskFileIdsState } from '../atom';

export const useProjectsFiles = () => {
  const { projectId } = useProjectsProjectId();
  const ids = useAtomValue(
    useMemo(() => taskFileIdsState(projectId), [projectId]),
  );
  const taskFileIds = useMemo(() => ids, [ids]);

  return {
    taskFileIds,
  };
};
