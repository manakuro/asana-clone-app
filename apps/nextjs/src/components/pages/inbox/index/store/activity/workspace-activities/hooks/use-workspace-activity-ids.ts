import { useAtomValue } from 'jotai';
import { workspaceActivityIdsState } from '../atom';

export const useWorkspaceActivityIds = () => {
  const workspaceActivityIds = useAtomValue(workspaceActivityIdsState);

  return {
    workspaceActivityIds,
  };
};
