import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { teammateIdsByWorkspaceIdState } from '../atom';

export const useTeammateIdsByWorkspaceId = (projectId: string) => {
  const teammateIds = useAtomValue(
    useMemo(() => teammateIdsByWorkspaceIdState(projectId), [projectId]),
  );

  return {
    teammateIds,
  };
};
