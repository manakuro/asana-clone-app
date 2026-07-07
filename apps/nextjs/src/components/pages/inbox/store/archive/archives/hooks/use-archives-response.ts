import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { archiveState } from '../atom';
import type { ArchiveActivity, ArchivedActivityResponse } from '../type';

export const useArchivesResponse = () => {
  const setArchives = useAtomCallback(
    useCallback((_get, set, data: ArchivedActivityResponse[]) => {
      data.forEach((a) => {
        set(archiveState(a.id), a as ArchiveActivity);
      });
    }, []),
  );

  return {
    setArchives,
  };
};
