import { useWorkspaceActivityTasksTaskIds } from '@/store/app/inbox/activity/workspace-activity-tasks';
import { useArchivedWorkspaceActivityTasksTaskIds } from '@/store/app/inbox/archive/archived-workspace-activity-tasks';
import { useInboxContext } from '../../components/inbox';

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
