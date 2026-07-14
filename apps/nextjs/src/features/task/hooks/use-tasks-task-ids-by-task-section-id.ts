import { useMyTasksTaskIdsByTaskSectionId } from '@/components/pages/my-tasks/index/store/my-tasks/tasks';
import { useProjectsTaskIdsByTaskSectionId } from '@/components/pages/projects/index/store/projects/tasks';
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
