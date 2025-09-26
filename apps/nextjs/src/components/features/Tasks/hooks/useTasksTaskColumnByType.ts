import { useMyTasksTaskColumnByType } from '@/store/app/myTasks/taskColumns';
import { useProjectsTaskColumnByType } from '@/store/app/projects/taskColumns';
import type { ProjectTaskColumn } from '@/store/entities/projectTaskColumn';
import type { TaskColumnTypeValue } from '@/store/entities/taskColumn';
import type { TeammateTaskColumn } from '@/store/entities/teammateTaskColumn';
import { useTasksContext } from '../TasksProvider';

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
