import { useProjectsProjectId } from '@/store/app/projects/project';
import { projectTaskSectionByTaskIdAndProjectIdState } from '@/store/entities/projectTaskSection';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';

export const useProjectTaskSectionByTaskId = (taskId: string) => {
  const { projectId } = useProjectsProjectId();
  const taskSection = useAtomValue(
    useMemo(
      () => projectTaskSectionByTaskIdAndProjectIdState({ taskId, projectId }),
      [taskId, projectId],
    ),
  );

  return {
    taskSection,
  };
};
