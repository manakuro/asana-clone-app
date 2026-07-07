import { useMyTasksTaskColumnByType } from '@/components/pages/my-tasks/store/my-tasks/task-columns';
import { useProjectsTaskColumnByType } from '@/components/pages/projects/store/projects/task-columns';
import type { ProjectTaskColumn } from '@/features/project/store/project-task-column';
import type { TaskColumnTypeValue } from '@/features/task/store/task-column';
import type { TeammateTaskColumn } from '@/features/teammate/store/teammate-task-column';
import { useTasksContext } from '../components/tasks-provider';

type TaskColumn = TeammateTaskColumn | ProjectTaskColumn;

type Result = {
  tasksTaskColumn: TaskColumn;
};

export const useTasksTaskColumnByType = (type: TaskColumnTypeValue): Result => {
  const { isMyTasksPage } = useTasksContext();
  const myTasks = useMyTasksTaskColumnByType(type);
  const projects = useProjectsTaskColumnByType(type);

  if (isMyTasksPage) {
    return {
      tasksTaskColumn: myTasks.tasksTaskColumn,
    };
  }

  return {
    tasksTaskColumn: projects.tasksTaskColumn,
  };
};
