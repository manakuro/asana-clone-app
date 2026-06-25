import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import type { TaskFeedResponse } from '../type';
import { useUpsert } from './use-upsert';

export const useTaskFeedResponse = () => {
  const { upsert } = useUpsert();

  const setTaskFeed = useAtomCallback(
    useCallback(
      (_get, _set, data: TaskFeedResponse[]) => {
        data.forEach((d) => {
          upsert(d);
        });
      },
      [upsert],
    ),
  );

  return {
    setTaskFeed,
  };
};
