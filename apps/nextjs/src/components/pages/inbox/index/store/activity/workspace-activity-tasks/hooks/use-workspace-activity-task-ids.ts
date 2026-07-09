import { useAtomValue } from 'jotai';
import { workspaceActivityTaskIdsState } from '../atom';

export const useWorkspaceActivityTaskIds = () => {
  const workspaceActivityTaskIds = useAtomValue(workspaceActivityTaskIdsState);

  return {
    workspaceActivityTaskIds,
  };
};
