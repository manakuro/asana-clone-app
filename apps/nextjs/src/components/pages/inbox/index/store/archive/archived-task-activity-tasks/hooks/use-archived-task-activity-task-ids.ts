import { useAtomValue } from 'jotai';
import { archivedTaskActivityTaskIdsState } from '../atom';

export const useArchivedTaskActivityTaskIds = () => {
  const archivedTaskActivityTaskIds = useAtomValue(
    archivedTaskActivityTaskIdsState,
  );

  return {
    archivedTaskActivityTaskIds,
  };
};
