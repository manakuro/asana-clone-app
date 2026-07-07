import { useMyTasksTasksByTaskSectionId } from '@/components/pages/my-tasks/store/my-tasks/tasks';
import { useProjectsTasksByTaskSectionId } from '@/components/pages/projects/store/projects/tasks';
import type { Task } from '@/store/entities/task';
import { useTasksContext } from '../components/tasks-provider';

type Result = {
  tasks: Task[];
};

export const useTasksTasksByTaskSectionId = (taskSectionId: string): Result => {
  const { isMyTasksPage } = useTasksContext();
  const myTasks = useMyTasksTasksByTaskSectionId(taskSectionId);
  const projects = useProjectsTasksByTaskSectionId(taskSectionId);

  if (isMyTasksPage) {
    return {
      tasks: myTasks.tasks,
    };
  }

  return {
    tasks: projects.tasks,
  };
};
