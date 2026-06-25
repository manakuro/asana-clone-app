import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { archiveState } from '../atom';

export const useArchive = (archiveId: string) => {
  const archive = useAtomValue(
    useMemo(() => archiveState(archiveId), [archiveId]),
  );

  return {
    archive,
  };
};
