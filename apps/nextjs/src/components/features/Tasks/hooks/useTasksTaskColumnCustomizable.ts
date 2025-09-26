import { useMyTasksTaskColumnsCustomizable } from '@/store/app/myTasks/taskColumns';
import { useProjectsTaskColumnsCustomizable } from '@/store/app/projects/taskColumns';
import { useTasksContext } from '../TasksProvider';

type Result = {
  tasksTaskColumnIds: string[];
  setTaskColumnOrder: (updatedIds: string[]) => void;
};

export const useTasksTaskColumnCustomizable = (): Result => {
  const { isMyTasksPage } = useTasksContext();
  const useMyTasksTaskColumnsCustomizableResult =
    useMyTasksTaskColumnsCustomizable();
  const useProjectsTaskColumnsCustomizableResult =
    useProjectsTaskColumnsCustomizable();

  if (isMyTasksPage) {
    return {
      tasksTaskColumnIds:
        useMyTasksTaskColumnsCustomizableResult.tasksTaskColumnIds,
      setTaskColumnOrder:
        useMyTasksTaskColumnsCustomizableResult.setTaskColumnOrder,
    };
  }

  return {
    tasksTaskColumnIds:
      useProjectsTaskColumnsCustomizableResult.tasksTaskColumnIds,
    setTaskColumnOrder:
      useProjectsTaskColumnsCustomizableResult.setTaskColumnOrder,
  };
};
