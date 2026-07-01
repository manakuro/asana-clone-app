import { useTasksContext } from '@/features/tasks/components/tasks-provider/tasks-context';
import { useTasksTaskSection } from './use-tasks-task-section';
import { useTasksTaskSectionIds } from './use-tasks-task-section-ids';

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
