import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { archivedWorkspaceActivityState } from '../atom';

export const useArchivedWorkspaceActivity = (
  archivedWorkspaceActivityId: string,
) => {
  const archivedWorkspaceActivity = useAtomValue(
    useMemo(
      () => archivedWorkspaceActivityState(archivedWorkspaceActivityId),
      [archivedWorkspaceActivityId],
    ),
  );

  return {
    archivedWorkspaceActivity,
  };
};
