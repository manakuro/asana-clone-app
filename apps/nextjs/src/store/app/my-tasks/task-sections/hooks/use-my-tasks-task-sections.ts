import { useTeammateTaskSections } from '@/store/entities/teammatesTaskSection';

export const useMyTasksTaskSections = () => {
  const { teammateTaskSections } = useTeammateTaskSections();

  return {
    taskSections: teammateTaskSections,
  };
};
