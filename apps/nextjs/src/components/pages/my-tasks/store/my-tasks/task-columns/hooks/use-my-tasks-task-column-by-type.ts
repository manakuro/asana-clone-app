import type { TaskColumnTypeValue } from '@/features/task/store/task-column';
import { useTeammateTaskColumnByType } from '@/features/teammate/store/teammate-task-column';

export const useMyTasksTaskColumnByType = (type: TaskColumnTypeValue) => {
  const { teammatesTaskColumn } = useTeammateTaskColumnByType(type);

  return {
    tasksTaskColumn: teammatesTaskColumn,
  };
};
