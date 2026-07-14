import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { archivedTaskActivityState } from '../atom';

export const useArchivedTaskActivity = (archivedMyTaskActivityId: string) => {
  const archivedTaskActivity = useAtomValue(
    useMemo(
      () => archivedTaskActivityState(archivedMyTaskActivityId),
      [archivedMyTaskActivityId],
    ),
  );

  return {
    archivedTaskActivity,
  };
};
