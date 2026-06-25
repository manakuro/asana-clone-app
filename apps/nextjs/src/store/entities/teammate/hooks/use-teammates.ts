import { useAtomValue } from 'jotai';
import { useCallback } from 'react';
import { teammateIdsState, teammatesState } from '../atom';

export const useTeammates = () => {
  const teammateIds = useAtomValue(teammateIdsState);
  const teammates = useAtomValue(teammatesState);

  const getTeammatesById = useCallback(
    (teammateIds: string[]) => {
      return teammates.filter((t) => teammateIds.includes(t.id));
    },
    [teammates],
  );

  return {
    teammateIds,
    teammates,
    getTeammatesById,
  };
};
