import { useWorkspaceActivityTasksTaskIds } from '@/store/app/inbox/activity/workspaceActivityTasks';
import { useArchivedWorkspaceActivityTasksTaskIds } from '@/store/app/inbox/archive/archivedWorkspaceActivityTasks';
import { useInboxContext } from '../../Inbox';

type Result = {
  taskIds: string[];
};

export const useWorkspaceActivityTaskIds = (listItemId: string): Result => {
  const { isActivity } = useInboxContext();
  const activity = useWorkspaceActivityTasksTaskIds(listItemId);
  const archive = useArchivedWorkspaceActivityTasksTaskIds(listItemId);

  if (isActivity) {
    return {
      taskIds: activity.taskIds,
    };
  }

  return {
    taskIds: archive.taskIds,
  };
};
