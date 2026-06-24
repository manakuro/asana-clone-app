import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { teammateTaskColumnState as state } from '../atom';

export const useTeammateTaskColumn = (teammateTaskColumnId: string) => {
  const teammatesTaskColumn = useAtomValue(
    useMemo(() => state(teammateTaskColumnId), [teammateTaskColumnId]),
  );

  return {
    teammatesTaskColumn,
  };
};
