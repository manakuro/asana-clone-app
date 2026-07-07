import { useAtomValue } from 'jotai';
import { archivedWorkspaceActivityIdsState } from '../atom';

export const useArchivedWorkspaceActivityIds = () => {
  const archivedWorkspaceActivityIds = useAtomValue(
    archivedWorkspaceActivityIdsState,
  );

  return {
    archivedWorkspaceActivityIds,
  };
};
