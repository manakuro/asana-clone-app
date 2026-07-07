import { useMyTasksTaskSectionByTaskId } from '@/components/pages/my-tasks/store/my-tasks/task-sections';
import { useProjectTaskSectionByTaskId } from '@/components/pages/projects/store/projects/task-sections';
import { useTasksContext } from '../components/tasks-provider';

type Result = {
  taskSection: {
    id: string;
    name: string;
    isNew?: boolean;
    assigned?: boolean;
  };
};

export const useTasksTaskSectionByTaskId = (taskId: string): Result => {
  const { isMyTasksPage } = useTasksContext();
  const myTasks = useMyTasksTaskSectionByTaskId(taskId);
  const projects = useProjectTaskSectionByTaskId(taskId);

  if (isMyTasksPage) {
    return {
      taskSection: myTasks.taskSection,
    };
  }

  return {
    taskSection: projects.taskSection,
  };
};
