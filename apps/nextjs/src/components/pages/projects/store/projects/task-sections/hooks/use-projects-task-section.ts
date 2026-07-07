import { useProjectTaskSection } from '@/store/entities/project-task-section';

export const useProjectsTaskSection = (taskSectionId: string) => {
  const { setProjectTaskSectionName, projectTaskSection } =
    useProjectTaskSection(taskSectionId);

  return {
    taskSection: projectTaskSection,
    setSectionName: setProjectTaskSectionName,
  };
};
