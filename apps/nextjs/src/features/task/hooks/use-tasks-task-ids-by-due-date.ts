import { useMyTasksTaskIdsByDueDate } from '@/components/pages/my-tasks/index/store/my-tasks/tasks';
import { useProjectsTaskIdsByDueDate } from '@/components/pages/projects/store/projects/tasks';
import { useTasksContext } from '../components/tasks-provider';

type Result = {
  taskIds: string[];
};

export const useTasksTaskIdsByDueDate = (dueDate: string): Result => {
  const { isMyTasksPage } = useTasksContext();
  const myTasks = useMyTasksTaskIdsByDueDate(dueDate);
  const projects = useProjectsTaskIdsByDueDate(dueDate);

  if (isMyTasksPage) {
    return {
      taskIds: myTasks.taskIds,
    };
  }

  return {
    taskIds: projects.taskIds,
  };
};
