import { useMyTasksFiles } from '@/components/pages/my-tasks/index/store/my-tasks-files';
import { useProjectsFiles } from '@/components/pages/projects/store/projects-files';
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
