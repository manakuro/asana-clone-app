import { useProjectsProjectId } from '@/components/pages/projects/index/store/projects/project';
import { useProjectsTaskSectionsByProjectId } from '@/features/project/store/project-task-section';

export const useProjectsTaskSections = () => {
  const { projectId } = useProjectsProjectId();
  const { projectTaskSections } = useProjectsTaskSectionsByProjectId(projectId);

  return {
    taskSections: projectTaskSections,
  };
};
