import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import { inboxStatusState } from '../atom';
import type { InboxListStatus } from '../type';

export const useInboxListStatusResponse = () => {
  const setInboxListStatus = useAtomCallback(
    useCallback((_get, set, data: InboxListStatus) => {
      set(inboxStatusState, data);
    }, []),
  );

  return {
    setInboxListStatus,
  };
};
