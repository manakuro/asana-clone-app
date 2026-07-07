import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { teammateIdsByProjectIdState } from '../atom';

export const useTeammateIdsByProjectId = (projectId: string) => {
  const teammateIds = useAtomValue(
    useMemo(() => teammateIdsByProjectIdState(projectId), [projectId]),
  );

  return {
    teammateIds,
  };
};
