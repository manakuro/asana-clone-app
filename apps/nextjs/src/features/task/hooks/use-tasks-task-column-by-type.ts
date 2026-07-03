import { useMyTasksTaskColumnByType } from '@/store/app/my-tasks/task-columns';
import { useProjectsTaskColumnByType } from '@/store/app/projects/task-columns';
import type { ProjectTaskColumn } from '@/store/entities/project-task-column';
import type { TaskColumnTypeValue } from '@/store/entities/task-column';
import type { TeammateTaskColumn } from '@/store/entities/teammate-task-column';
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
