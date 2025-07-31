import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import {
  useUpdateTeammateTaskColumnMutation,
  useUpdateTeammateTaskColumnOrderMutation,
} from 'src/graphql/hooks';
import { teammateTaskColumnState, teammateTaskColumnsState } from '../atom';
import type { TeammateTaskColumn } from '../type';
import { useUpsert } from './useUpsert';

export const useTeammateTaskColumnCommand = () => {
  const { upsert } = useUpsert();
  const [updateTeammateTaskColumnMutation] =
    useUpdateTeammateTaskColumnMutation();
  const [updateTeammateTaskColumnOrderMutation] =
    useUpdateTeammateTaskColumnOrderMutation();

  const setTeammateTaskColumn = useAtomCallback(
    useCallback(
      async (
        get,
        _set,
        input: Partial<TeammateTaskColumn> & { id: string },
      ) => {
        const prev = get(teammateTaskColumnState(input.id));
        upsert({ ...prev, ...input });

        const restore = () => {
          upsert(prev);
        };

        try {
          const res = await updateTeammateTaskColumnMutation({
            variables: {
              input: {
                ...input,
                id: prev.id,
                requestId: '',
              },
            },
          });
          if (res.errors) {
            restore();
          }
        } catch (e) {
          restore();
          throw e;
        }
      },
      [updateTeammateTaskColumnMutation, upsert],
    ),
  );

  const setTeammateTaskColumnOrder = useAtomCallback(
    useCallback(
      async (get, _set, ids: string[]) => {
        const prev = get(teammateTaskColumnsState);
        const prevIds = prev.map((p) => p.id);

        if (JSON.stringify(prevIds) === JSON.stringify(ids)) return;

        ids.forEach((id, index) => {
          upsert({
            id,
            order: index,
          });
        });

        const restore = () => {
          prevIds.forEach((id, index) => {
            upsert({
              id,
              order: index,
            });
          });
        };

        try {
          const res = await updateTeammateTaskColumnOrderMutation({
            variables: {
              input: {
                ids,
              },
            },
          });
          if (res.errors) {
            restore();
          }
        } catch (e) {
          restore();
          throw e;
        }
      },
      [updateTeammateTaskColumnOrderMutation, upsert],
    ),
  );

  return {
    setTeammateTaskColumn,
    setTeammateTaskColumnOrder,
  };
};
