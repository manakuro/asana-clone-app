import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { tasksByTeammateTaskSectionIdState } from '@/features/teammate/store/teammate-task';

export const useMyTasksTasksByTaskSectionId = (
  teammateTaskSectionId: string,
) => {
  const tasks = useAtomValue(
    useMemo(
      () => tasksByTeammateTaskSectionIdState(teammateTaskSectionId),
      [teammateTaskSectionId],
    ),
  );

  return {
    tasks,
  };
};
