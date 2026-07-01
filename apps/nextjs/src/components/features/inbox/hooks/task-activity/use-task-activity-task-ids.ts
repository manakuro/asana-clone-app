import { useTaskActivityTasksTaskIds } from '@/store/app/inbox/activity/task-activity-tasks';
import { useArchivedTaskActivityTasksTaskIds } from '@/store/app/inbox/archive/archived-task-activity-tasks';
import { useInboxContext } from '../../components/inbox';

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
