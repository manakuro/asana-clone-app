import { useTeammateTaskSection } from '@/features/teammate/store/teammates-task-section';

export const useMyTasksTaskSection = (taskSectionId: string) => {
  const { teammateTaskSection, setTeammateTaskSectionName } =
    useTeammateTaskSection(taskSectionId);

  return {
    taskSection: teammateTaskSection,
    setSectionName: setTeammateTaskSectionName,
  };
};
