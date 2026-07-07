import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { tasksByProjectTaskSectionIdAndProjectIdState } from '@/features/project/store/project-task';
import { useProjectsProjectId } from '../../project';

export const useProjectsTasksByTaskSectionId = (taskSectionId: string) => {
  const { projectId } = useProjectsProjectId();
  const tasks = useAtomValue(
    useMemo(
      () =>
        tasksByProjectTaskSectionIdAndProjectIdState({
          projectTaskSectionId: taskSectionId,
          projectId,
        }),
      [taskSectionId, projectId],
    ),
  );

  return {
    tasks,
  };
};
