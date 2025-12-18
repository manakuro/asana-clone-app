import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { teammateTaskSectionByTaskIdState } from '@/store/entities/teammatesTaskSection';

export const useMyTasksTaskSectionByTaskId = (taskId: string) => {
  const taskSection = useAtomValue(
    useMemo(() => teammateTaskSectionByTaskIdState(taskId), [taskId]),
  );

  return {
    taskSection,
  };
};
