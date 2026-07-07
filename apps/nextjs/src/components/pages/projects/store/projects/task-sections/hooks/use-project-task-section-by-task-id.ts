import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { useProjectsProjectId } from '@/components/pages/projects/store/projects/project';
import { projectTaskSectionByTaskIdAndProjectIdState } from '@/features/project/store/project-task-section';

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
