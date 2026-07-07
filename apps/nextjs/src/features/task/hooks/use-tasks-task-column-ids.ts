import { useMyTasksTaskColumnIds } from '@/components/pages/my-tasks/store/my-tasks/task-columns';
import { useProjectsTaskColumnIds } from '@/components/pages/projects/store/projects/task-columns';
import { useTasksContext } from '../components/tasks-provider';

type Result = {
  tasksTaskColumnIds: string[];
};

export const useTasksTaskColumnIds = (): Result => {
  const { isMyTasksPage } = useTasksContext();
  const useMyTasksTaskColumnIdsResult = useMyTasksTaskColumnIds();
  const useProjectsTaskColumnIdsResult = useProjectsTaskColumnIds();

  if (isMyTasksPage) {
    return {
      tasksTaskColumnIds: useMyTasksTaskColumnIdsResult.tasksTaskColumnIds,
    };
  }

  return {
    tasksTaskColumnIds: useProjectsTaskColumnIdsResult.tasksTaskColumnIds,
  };
};
