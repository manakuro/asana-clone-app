import { useTasksTasksByTaskSectionId } from './useTasksTasksByTaskSectionId';

type Result = {
  hasTasks: boolean;
};

export const useHasTasksByTaskSectionId = (taskSectionId: string): Result => {
  const { tasks } = useTasksTasksByTaskSectionId(taskSectionId);

  return {
    hasTasks: !!tasks.length,
  };
};
