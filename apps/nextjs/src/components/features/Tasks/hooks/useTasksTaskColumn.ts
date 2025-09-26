import { useMyTasksTaskColumn } from '@/store/app/myTasks/taskColumns';
import { useProjectsTaskColumns } from '@/store/app/projects/taskColumns';
import type { ProjectTaskColumn } from '@/store/entities/projectTaskColumn';
import type { TeammateTaskColumn } from '@/store/entities/teammateTaskColumn';
import { useTasksContext } from '../TasksProvider';

type TaskColumn = ProjectTaskColumn | TeammateTaskColumn;

type Result = {
  tasksTaskColumn: TaskColumn;
  setTasksTaskColumn: (val: Partial<TaskColumn>) => Promise<void>;
  setTaskColumnOrder: (startIndex: number, endIndex: number) => Promise<void>;
  canMoveLeft: (id: string) => boolean;
  canMoveRight: (id: string) => boolean;
};

export const useTasksTaskColumn = (tasksTaskColumnId: string): Result => {
  const { isMyTasksPage } = useTasksContext();
  const myTasks = useMyTasksTaskColumn(tasksTaskColumnId);
  const projects = useProjectsTaskColumns(tasksTaskColumnId);

  if (isMyTasksPage) {
    return {
      tasksTaskColumn: myTasks.tasksTaskColumn,
      setTaskColumnOrder: myTasks.setTaskColumnOrder,
      setTasksTaskColumn: myTasks.setTasksTaskColumn,
      canMoveLeft: myTasks.canMoveLeft,
      canMoveRight: myTasks.canMoveRight,
    };
  }

  return {
    tasksTaskColumn: projects.tasksTaskColumn,
    setTaskColumnOrder: projects.setTaskColumnOrder,
    setTasksTaskColumn: projects.setTasksTaskColumn,
    canMoveLeft: projects.canMoveLeft,
    canMoveRight: projects.canMoveRight,
  };
};
