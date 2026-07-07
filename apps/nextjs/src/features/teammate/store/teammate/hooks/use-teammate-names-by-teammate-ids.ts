import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { namesByTeammateIdState } from '../atom';

export const useTeammateNamesByTeammateIds = (teammateIds: string[]) => {
  const teammateNames = useAtomValue(
    useMemo(() => namesByTeammateIdState(teammateIds), [teammateIds]),
  );

  return {
    teammateNames,
  };
};
