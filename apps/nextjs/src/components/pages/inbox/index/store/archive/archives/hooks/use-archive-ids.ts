import { useAtomValue } from 'jotai';
import { archiveIdsState } from '../atom';

export const useArchiveIds = () => {
  const archiveIds = useAtomValue(archiveIdsState);

  return {
    archiveIds,
  };
};
