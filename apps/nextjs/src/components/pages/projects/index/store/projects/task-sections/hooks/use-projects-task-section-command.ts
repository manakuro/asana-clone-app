import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { useProjectTaskSectionCommand as useCommand } from '@/features/project/store/project-task-section';
import { useProjectsProjectId } from '../../project';

export const useProjectsTaskSectionCommand = () => {
  const {
    addProjectsTaskSection,
    deleteTaskSectionAndKeepTasks,
    deleteTaskSectionAndDeleteTasks,
    deleteProjectTaskSection,
    undeleteTaskSectionAndKeepTasks,
    undeleteTaskSectionAndDeleteTasks,
  } = useCommand();
  const { projectId } = useProjectsProjectId();

  const addTaskSection = useAtomCallback(
    useCallback(
      (_get, _set) => {
        return addProjectsTaskSection({ projectId });
      },
      [addProjectsTaskSection, projectId],
    ),
  );

  return {
    addTaskSection,
    deleteTaskSectionAndKeepTasks,
    deleteTaskSectionAndDeleteTasks,
    deleteProjectTaskSection,
    undeleteTaskSectionAndKeepTasks,
    undeleteTaskSectionAndDeleteTasks,
  };
};
