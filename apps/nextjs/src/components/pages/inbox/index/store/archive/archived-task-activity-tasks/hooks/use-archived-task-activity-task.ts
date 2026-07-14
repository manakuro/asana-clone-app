import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { archivedTaskActivityTaskState } from '../atom';

export const useArchivedTaskActivityTask = (
  archivedTaskActivityTaskId: string,
) => {
  const archivedTaskActivityTask = useAtomValue(
    useMemo(
      () => archivedTaskActivityTaskState(archivedTaskActivityTaskId),
      [archivedTaskActivityTaskId],
    ),
  );

  return {
    archivedTaskActivityTask,
  };
};
