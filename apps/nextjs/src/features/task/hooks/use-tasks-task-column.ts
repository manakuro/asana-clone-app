import { useMyTasksTaskColumn } from '@/components/pages/my-tasks/index/store/my-tasks/task-columns';
import { useProjectsTaskColumns } from '@/components/pages/projects/index/store/projects/task-columns';
import type { ProjectTaskColumn } from '@/features/project/store/project-task-column';
import type { TeammateTaskColumn } from '@/features/teammate/store/teammate-task-column';
import { useTasksContext } from '../components/tasks-provider';

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
