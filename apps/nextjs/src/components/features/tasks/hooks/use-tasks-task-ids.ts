import { useMyTasksTaskIds } from '@/store/app/my-tasks/tasks';
import { useProjectsTaskIds } from '@/store/app/projects/tasks';
import { useTasksContext } from '../tasks-provider';

type Result = {
  taskIds: string[];
};

export const useTasksTaskIds = (): Result => {
  const { isMyTasksPage } = useTasksContext();

  const myTasks = useMyTasksTaskIds();
  const projects = useProjectsTaskIds();

  if (isMyTasksPage) {
    return {
      taskIds: myTasks.taskIds,
    };
  }

  return {
    taskIds: projects.taskIds,
  };
};
