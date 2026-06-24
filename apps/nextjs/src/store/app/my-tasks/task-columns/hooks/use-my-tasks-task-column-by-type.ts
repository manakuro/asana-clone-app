import type { TaskColumnTypeValue } from '@/store/entities/taskColumn';
import { useTeammateTaskColumnByType } from '@/store/entities/teammateTaskColumn';

export const useMyTasksTaskColumnByType = (type: TaskColumnTypeValue) => {
  const { teammatesTaskColumn } = useTeammateTaskColumnByType(type);

  return {
    tasksTaskColumn: teammatesTaskColumn,
  };
};
