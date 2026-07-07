import { useMyTasksTaskIds } from '@/components/pages/my-tasks/store/my-tasks/tasks';
import { useProjectsTaskIds } from '@/components/pages/projects/store/projects/tasks';
import { useTasksContext } from '../components/tasks-provider';

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
