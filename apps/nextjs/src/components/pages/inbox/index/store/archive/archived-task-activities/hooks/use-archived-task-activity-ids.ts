import { useAtomValue } from 'jotai';
import { archivedTaskActivityIdsState } from '../atom';

export const useArchivedTaskActivityIds = () => {
  const archivedTaskActivityIds = useAtomValue(archivedTaskActivityIdsState);

  return {
    archivedTaskActivityIds,
  };
};
