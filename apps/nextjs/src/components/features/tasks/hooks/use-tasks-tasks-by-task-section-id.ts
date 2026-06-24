import { useMyTasksTasksByTaskSectionId } from '@/store/app/my-tasks/tasks';
import { useProjectsTasksByTaskSectionId } from '@/store/app/projects/tasks';
import type { Task } from '@/store/entities/task';
import { useTasksContext } from '../tasks-provider';

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
