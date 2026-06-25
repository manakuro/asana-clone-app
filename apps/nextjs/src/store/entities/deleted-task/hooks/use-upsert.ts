import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { deletedTaskState } from '../atom';
import type { DeletedTask } from '../type';

export const useUpsert = () => {
  const upsert = useAtomCallback(
    useCallback((_get, set, input: DeletedTask) => {
      set(deletedTaskState(input.id), input);
    }, []),
  );

  return {
    upsert,
  };
};
