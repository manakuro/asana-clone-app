import { useMyTasksTaskSectionByTaskId } from '@/store/app/myTasks/taskSections';
import { useProjectTaskSectionByTaskId } from '@/store/app/projects/taskSections';
import { useTasksContext } from '../TasksProvider';

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
