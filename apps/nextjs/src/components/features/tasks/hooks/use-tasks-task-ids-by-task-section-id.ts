import { useMyTasksTaskIdsByTaskSectionId } from '@/store/app/my-tasks/tasks';
import { useProjectsTaskIdsByTaskSectionId } from '@/store/app/projects/tasks';
import { useTasksContext } from '../components/tasks-provider';

type Result = {
  taskIds: string[];
};

export const useTasksTaskIdsByTaskSectionId = (
  taskSectionId: string,
): Result => {
  const { isMyTasksPage } = useTasksContext();
  const myTasks = useMyTasksTaskIdsByTaskSectionId(taskSectionId);
  const projects = useProjectsTaskIdsByTaskSectionId(taskSectionId);

  if (isMyTasksPage) {
    return {
      taskIds: myTasks.taskIds,
    };
  }

  return {
    taskIds: projects.taskIds,
  };
};
