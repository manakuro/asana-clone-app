import { useMyTasksTaskSectionIds } from '@/components/pages/my-tasks/index/store/my-tasks/task-sections';
import { useProjectsTaskSectionIds } from '@/components/pages/projects/store/projects/task-sections';
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
