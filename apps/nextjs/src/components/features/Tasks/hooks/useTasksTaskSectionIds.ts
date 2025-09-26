import { useMyTasksTaskSectionIds } from '@/store/app/myTasks/taskSections';
import { useProjectsTaskSectionIds } from '@/store/app/projects/taskSections';
import { useTasksContext } from '../TasksProvider';

type Result = {
  taskSectionIds: string[];
};

export const useTasksTaskSectionIds = (): Result => {
  const { isMyTasksPage } = useTasksContext();
  const myTasks = useMyTasksTaskSectionIds();
  const projects = useProjectsTaskSectionIds();

  if (isMyTasksPage) {
    return {
      taskSectionIds: myTasks.taskSectionIds,
    };
  }

  return {
    taskSectionIds: projects.taskSectionIds,
  };
};
