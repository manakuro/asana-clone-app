import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { activityIdsSortByUpdatedAtState } from '../atom';

export const useActivityIdsSortByUpdatedAt = () => {
  const ids = useAtomValue(activityIdsSortByUpdatedAtState);
  const activityIds = useMemo(() => ids, [ids]);

  return {
    activityIds,
  };
};
