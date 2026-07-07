import { useAtomValue } from 'jotai';
import { useCallback } from 'react';
import { type FilterStatuses, filterStatues, inboxStatusState } from '../atom';
import type { InboxListFilterStatuses } from '../types';
import { useInboxListStatusCommand } from './use-inbox-list-status-command';

const isSortStatusKey = (val: any): val is FilterStatuses =>
  typeof val === 'string';

export const useInboxListStatus = () => {
  const { filterStatus } = useAtomValue(inboxStatusState);
  const { upsert } = useInboxListStatusCommand();

  const isFiltered = useCallback(
    (status: FilterStatuses) => filterStatus === filterStatues[status],
    [filterStatus],
  );

  const onFilter = useCallback(
    (status: InboxListFilterStatuses | FilterStatuses) => {
      const val = isSortStatusKey(status) ? filterStatues[status] : status;
      upsert({ filterStatus: val });
    },
    [upsert],
  );

  return {
    filterStatus,
    isFiltered,
    onFilter,
  };
};
