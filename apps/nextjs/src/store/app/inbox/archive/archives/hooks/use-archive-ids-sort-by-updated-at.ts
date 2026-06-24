import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { archiveIdsSortByUpdatedAtState } from '../atom';

export const useArchiveIdsSortByUpdatedAt = () => {
  const ids = useAtomValue(archiveIdsSortByUpdatedAtState);
  const archiveIds = useMemo(() => ids, [ids]);

  return {
    archiveIds,
  };
};
