import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { teammateTaskSectionByTaskIdState } from '@/features/teammate/store/teammates-task-section';

export const useMyTasksTaskSectionByTaskId = (taskId: string) => {
  const taskSection = useAtomValue(
    useMemo(() => teammateTaskSectionByTaskIdState(taskId), [taskId]),
  );

  return {
    taskSection,
  };
};
