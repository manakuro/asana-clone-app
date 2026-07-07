import type { TaskColumnTypeValue } from '@/store/entities/task-column';
import { useTeammateTaskColumnByType } from '@/store/entities/teammate-task-column';

export const useMyTasksTaskColumnByType = (type: TaskColumnTypeValue) => {
  const { teammatesTaskColumn } = useTeammateTaskColumnByType(type);

  return {
    tasksTaskColumn: teammatesTaskColumn,
  };
};
