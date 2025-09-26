import { useActivityIdsSortByUpdatedAt } from '@/store/app/inbox/activity/activities';
import { useArchiveIdsSortByUpdatedAt } from '@/store/app/inbox/archive/archives';
import { useInboxContext } from '../Inbox';

type Result = {
  listItemIds: {
    today: string[];
    yesterday: string[];
    pastSevenDays: string[];
    earlier: string[];
  };
};
export type UseInboxListItemIdsKeys = keyof Result['listItemIds'];

export const useInboxListItemIds = (): Result => {
  const { isActivity } = useInboxContext();
  const useActivityIdsSortByUpdatedAtResult = useActivityIdsSortByUpdatedAt();
  const useArchiveIdsSortByUpdatedAtResult = useArchiveIdsSortByUpdatedAt();

  if (isActivity) {
    return {
      listItemIds: useActivityIdsSortByUpdatedAtResult.activityIds,
    };
  }

  return {
    listItemIds: useArchiveIdsSortByUpdatedAtResult.archiveIds,
  };
};
