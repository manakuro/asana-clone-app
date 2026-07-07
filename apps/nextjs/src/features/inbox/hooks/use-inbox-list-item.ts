import {
  type Activity,
  useActivity,
} from '@/components/pages/inbox/store/activity/activities';
import {
  type ArchiveActivity,
  useArchive,
} from '@/components/pages/inbox/store/archive/archives';
import { useInboxContext } from '../components/inbox';

type Result = {
  listItem: Activity | ArchiveActivity;
};

export const useInboxListItem = (listItemId: string): Result => {
  const { isActivity } = useInboxContext();
  const useActivityResult = useActivity(listItemId);
  const useArchiveResult = useArchive(listItemId);

  if (isActivity) {
    return {
      listItem: useActivityResult.activity,
    };
  }

  return {
    listItem: useArchiveResult.archive,
  };
};
