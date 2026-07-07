import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { inboxStatusState } from '../atom';
import type { InboxListStatus } from '../type';

export const useInboxListStatusCommand = () => {
  const upsert = useAtomCallback(
    useCallback((_get, set, input: Partial<InboxListStatus>) => {
      set(inboxStatusState, (prev) => ({
        ...prev,
        ...input,
      }));
    }, []),
  );

  return {
    upsert,
  };
};
