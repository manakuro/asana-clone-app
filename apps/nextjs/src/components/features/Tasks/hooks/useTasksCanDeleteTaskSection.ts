import { useTasksContext } from '@/components/features/Tasks';
import { useTasksTaskSection } from './useTasksTaskSection';
import { useTasksTaskSectionIds } from './useTasksTaskSectionIds';

type Result = {
  canDeleteTaskSection: boolean;
  message: string;
};

export const useTasksCanDeleteTaskSection = (taskSectionId: string): Result => {
  const { isMyTasksPage } = useTasksContext();
  const { taskSection } = useTasksTaskSection(taskSectionId);
  const { taskSectionIds } = useTasksTaskSectionIds();

  if (isMyTasksPage) {
    return {
      canDeleteTaskSection: !taskSection.assigned,
      message:
        "This section can't be deleted because new tasks assigned to you appear here.",
    };
  }

  return {
    canDeleteTaskSection: taskSectionIds.length > 1,
    message: "This section can't be deleted because new tasks appear here.",
  };
};
