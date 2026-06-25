import type { InboxListFilterStatuses } from './types';

export type InboxListStatus = {
  id: string;
  teammateId: string;
  filterStatus: InboxListFilterStatuses;
  createdAt: string;
  updatedAt: string;
};
