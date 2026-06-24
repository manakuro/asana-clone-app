import { useMyTasksTaskColumnsCustomizable } from '@/store/app/my-tasks/task-columns';
import { useProjectsTaskColumnsCustomizable } from '@/store/app/projects/task-columns';
import { useTasksContext } from '../tasks-provider';

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
