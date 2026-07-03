import { useMyTasksFiles } from '@/store/app/my-tasks-files';
import { useProjectsFiles } from '@/store/app/projects-files';
import { useTasksContext } from '../components/tasks-provider';

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
