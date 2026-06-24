import { useProjectsProjectId } from '@/store/app/projects/project';
import { useProjectsTaskSectionsByProjectId } from '@/store/entities/project-task-section';

export const useProjectsTaskSections = () => {
  const { projectId } = useProjectsProjectId();
  const { projectTaskSections } = useProjectsTaskSectionsByProjectId(projectId);

  return {
    taskSections: projectTaskSections,
  };
};
