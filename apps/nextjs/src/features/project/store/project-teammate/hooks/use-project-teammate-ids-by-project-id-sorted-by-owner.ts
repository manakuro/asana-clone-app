import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { projectTeammateIdsByProjectIdSortedByOwnerState } from '../atom';

export const useProjectTeammateIdsByProjectIdSortedByOwner = (
  projectId: string,
) => {
  const projectTeammateIds = useAtomValue(
    useMemo(
      () => projectTeammateIdsByProjectIdSortedByOwnerState(projectId),
      [projectId],
    ),
  );

  return {
    projectTeammateIds,
  };
};
