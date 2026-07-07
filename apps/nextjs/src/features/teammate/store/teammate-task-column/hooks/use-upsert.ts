import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { teammateTaskColumnState } from '../atom';
import type { TeammateTaskColumn } from '../type';

export const useUpsert = () => {
  const upsert = useAtomCallback(
    useCallback(
      (get, set, taskColumn: Partial<TeammateTaskColumn> & { id: string }) => {
        const prev = get(teammateTaskColumnState(taskColumn.id));
        set(teammateTaskColumnState(taskColumn.id), {
          ...prev,
          ...taskColumn,
        });
      },
      [],
    ),
  );
  return {
    upsert,
  };
};
