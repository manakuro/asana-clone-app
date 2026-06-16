import { useMutation } from '@apollo/client/react';
import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { UpdateTeammateTaskTabStatusDocument } from '@/graphql/hooks';
import { tabStatusState } from '../atom';
import {
  type TeammateTaskTabStatus,
  TeammateTaskTabStatusCode,
  type TeammateTaskTabStatusCodeKey,
} from '../type';
import { useUpsert } from './useUpsert';

export const useTeammateTaskTabStatusCommand = () => {
  const [updateTeammateTaskTabStatusMutation] = useMutation(
    UpdateTeammateTaskTabStatusDocument,
  );
  const { upsert } = useUpsert();

  const setTabStatus = useAtomCallback(
    useCallback(
      async (get, _set, key: TeammateTaskTabStatusCodeKey) => {
        const prev = get(tabStatusState);
        const input: Partial<TeammateTaskTabStatus> = {
          statusCode: TeammateTaskTabStatusCode[key],
        };
        if (!prev.id) return;
        if (prev.statusCode === input.statusCode) return;

        upsert(input);

        const restore = () => {
          upsert(prev);
        };

        try {
          const res = await updateTeammateTaskTabStatusMutation({
            variables: {
              input: {
                id: prev.id,
                requestId: '',
                ...input,
              },
            },
          });
          if (res.error) {
            restore();
          }
        } catch (e) {
          restore();
          throw e;
        }
      },
      [updateTeammateTaskTabStatusMutation, upsert],
    ),
  );

  return {
    setTabStatus,
  };
};
