import { useActivityIdsSortByUpdatedAt } from '@/components/pages/inbox/store/activity/activities';
import { useArchiveIdsSortByUpdatedAt } from '@/components/pages/inbox/store/archive/archives';
import { useInboxContext } from '../components/inbox';

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
