import { useProjectTaskSection } from '@/store/entities/projectTaskSection';

export const useProjectsTaskSection = (taskSectionId: string) => {
  const { setProjectTaskSectionName, projectTaskSection } =
    useProjectTaskSection(taskSectionId);

  return {
    taskSection: projectTaskSection,
    setSectionName: setProjectTaskSectionName,
  };
};
