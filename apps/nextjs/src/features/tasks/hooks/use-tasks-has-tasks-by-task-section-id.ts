import { useTasksTasksByTaskSectionId } from './use-tasks-tasks-by-task-section-id';

type Result = {
  hasTasks: boolean;
};

export const useHasTasksByTaskSectionId = (taskSectionId: string): Result => {
  const { tasks } = useTasksTasksByTaskSectionId(taskSectionId);

  return {
    hasTasks: !!tasks.length,
  };
};
