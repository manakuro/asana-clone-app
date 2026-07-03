import { useMyTasksTaskColumnIds } from '@/store/app/my-tasks/task-columns';
import { useProjectsTaskColumnIds } from '@/store/app/projects/task-columns';
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
