import { useAtomValue } from 'jotai';
import { teammateTaskColumnIdsState } from '../atom';

export const useTeammateTaskColumnIds = () => {
  const ids = useAtomValue(teammateTaskColumnIdsState);

  return {
    teammatesTaskColumnIds: ids,
  };
};
