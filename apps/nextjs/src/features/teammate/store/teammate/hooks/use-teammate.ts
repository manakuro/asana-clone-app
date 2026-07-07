import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { teammateState } from '../atom';

export const useTeammate = (teammateId?: string) => {
  const teammate = useAtomValue(
    useMemo(() => teammateState(teammateId || ''), [teammateId]),
  );

  return {
    teammate,
  };
};
