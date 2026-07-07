import { useTeammateTaskSections } from '@/features/teammate/store/teammates-task-section';

export const useMyTasksTaskSections = () => {
  const { teammateTaskSections } = useTeammateTaskSections();

  return {
    taskSections: teammateTaskSections,
  };
};
