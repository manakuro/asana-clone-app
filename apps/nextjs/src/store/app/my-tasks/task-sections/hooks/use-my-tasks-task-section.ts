import { useTeammateTaskSection } from '@/store/entities/teammatesTaskSection';

export const useMyTasksTaskSection = (taskSectionId: string) => {
  const { teammateTaskSection, setTeammateTaskSectionName } =
    useTeammateTaskSection(taskSectionId);

  return {
    taskSection: teammateTaskSection,
    setSectionName: setTeammateTaskSectionName,
  };
};
