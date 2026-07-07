import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { taskIdsByArchivedTaskActivityIdState } from '../atom';

export const useArchivedTaskActivityTasksTaskIds = (
  archivedTaskActivityId: string,
) => {
  const taskIds = useAtomValue(
    useMemo(
      () => taskIdsByArchivedTaskActivityIdState(archivedTaskActivityId),
      [archivedTaskActivityId],
    ),
  );

  return {
    taskIds,
  };
};
