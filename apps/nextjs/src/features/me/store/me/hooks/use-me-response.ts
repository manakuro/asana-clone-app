import { useCallback } from 'react';
import type { Me } from '../type';
import { useUpsert } from './use-upsert';

export const useMeResponse = () => {
  const { upsert } = useUpsert();

  const setMe = useCallback(
    (me: Me) => {
      upsert(me);
    },
    [upsert],
  );

  return {
    setMe,
  };
};
