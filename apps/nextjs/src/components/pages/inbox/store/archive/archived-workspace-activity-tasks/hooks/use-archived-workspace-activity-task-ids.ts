import { useAtomValue } from 'jotai';
import { archivedWorkspaceActivityTaskIdsState } from '../atom';

export const useArchivedWorkspaceActivityTaskIds = () => {
  const archivedWorkspaceActivityTaskIds = useAtomValue(
    archivedWorkspaceActivityTaskIdsState,
  );

  return {
    archivedWorkspaceActivityTaskIds,
  };
};
