import { useTaskActivityTasksTaskIds } from '@/store/app/inbox/activity/taskActivityTasks';
import { useArchivedTaskActivityTasksTaskIds } from '@/store/app/inbox/archive/archivedTaskActivityTasks';
import { useInboxContext } from '../../Inbox';

type Result = {
  taskIds: string[];
};

export const useTaskActivityTaskIds = (listItemId: string): Result => {
  const { isActivity } = useInboxContext();
  const activity = useTaskActivityTasksTaskIds(listItemId);
  const archived = useArchivedTaskActivityTasksTaskIds(listItemId);

  if (isActivity) {
    return {
      taskIds: activity.taskIds,
    };
  }

  return {
    taskIds: archived.taskIds,
  };
};
