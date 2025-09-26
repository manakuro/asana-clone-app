import { useMyTasksTaskColumnIds } from '@/store/app/myTasks/taskColumns';
import { useProjectsTaskColumnIds } from '@/store/app/projects/taskColumns';
import { useTasksContext } from '../TasksProvider';

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
