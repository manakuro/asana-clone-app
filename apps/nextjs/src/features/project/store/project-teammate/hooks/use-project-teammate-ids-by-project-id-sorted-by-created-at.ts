import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { projectTeammateIdsByProjectIdSortedByCreatedAtState } from '../atom';

export const useProjectTeammateIdsByProjectIdSortedByCreatedAt = (
  projectId: string,
) => {
  const projectTeammateIds = useAtomValue(
    useMemo(
      () => projectTeammateIdsByProjectIdSortedByCreatedAtState(projectId),
      [projectId],
    ),
  );

  return {
    projectTeammateIds,
  };
};
