import { useTeammateTaskSection } from '@/store/entities/teammates-task-section';

export const useMyTasksTaskSection = (taskSectionId: string) => {
  const { teammateTaskSection, setTeammateTaskSectionName } =
    useTeammateTaskSection(taskSectionId);

  return {
    taskSection: teammateTaskSection,
    setSectionName: setTeammateTaskSectionName,
  };
};
