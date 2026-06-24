import { useTeammateTaskSections } from '@/store/entities/teammates-task-section';

export const useMyTasksTaskSections = () => {
  const { teammateTaskSections } = useTeammateTaskSections();

  return {
    taskSections: teammateTaskSections,
  };
};
