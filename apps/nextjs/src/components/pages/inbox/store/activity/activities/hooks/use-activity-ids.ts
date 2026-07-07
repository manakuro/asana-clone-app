import { useAtomValue } from 'jotai';
import { activityIdsState } from '../atom';

export const useActivityIds = () => {
  const activityIds = useAtomValue(activityIdsState);

  return {
    activityIds,
  };
};
