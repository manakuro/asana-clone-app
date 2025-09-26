import { useMyTasksTaskIdsByTaskSectionId } from '@/store/app/myTasks/tasks';
import { useProjectsTaskIdsByTaskSectionId } from '@/store/app/projects/tasks';
import { useTasksContext } from '../TasksProvider';

type Result = {
  taskIds: string[];
};

export const useTasksTaskIdsByTaskSectionId = (
  taskSectionId: string,
): Result => {
  const { isMyTasksPage } = useTasksContext();
  const myTasks = useMyTasksTaskIdsByTaskSectionId(taskSectionId);
  const projects = useProjectsTaskIdsByTaskSectionId(taskSectionId);

  if (isMyTasksPage) {
    return {
      taskIds: myTasks.taskIds,
    };
  }

  return {
    taskIds: projects.taskIds,
  };
};
