import { useMyTasksFiles } from '@/store/app/myTasksFiles';
import { useProjectsFiles } from '@/store/app/projectsFiles';
import { useTasksContext } from '../TasksProvider';

type Result = {
  taskFileIds: string[];
};

export const useTasksTaskFiles = (): Result => {
  const { isMyTasksPage } = useTasksContext();
  const myTasks = useMyTasksFiles();
  const projects = useProjectsFiles();

  if (isMyTasksPage) {
    return {
      taskFileIds: myTasks.taskFileIds,
    };
  }

  return {
    taskFileIds: projects.taskFileIds,
  };
};
