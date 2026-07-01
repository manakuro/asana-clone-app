import { useMyTasksTaskSectionIds } from '@/store/app/my-tasks/task-sections';
import { useProjectsTaskSectionIds } from '@/store/app/projects/task-sections';
import { useTasksContext } from '../components/tasks-provider';

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
