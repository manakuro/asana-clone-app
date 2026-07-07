import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import type { InboxActivityPageQuery } from '@/graphql/types/app/inbox';
import { getNodesFromEdges } from '@/lib/apollo/util';
import { useActivitiesResponse } from '../activities';
import { useInboxListStatusResponse } from '../inbox-list-status';
import {
  type TaskActivityResponse,
  useTaskActivitiesResponse,
} from '../task-activities';
import {
  type TaskActivityTaskResponse,
  useTaskActivityTasksResponse,
} from '../task-activity-tasks';
import type { ActivityResponse } from '../type';
import {
  useWorkspaceActivitiesResponse,
  type WorkspaceActivityResponse,
} from '../workspace-activities';
import {
  useWorkspaceActivityTasksResponse,
  type WorkspaceActivityTaskResponse,
} from '../workspace-activity-tasks';

export const useActivityResponse = () => {
  const { setActivities } = useActivitiesResponse();
  const { setWorkspaceActivities } = useWorkspaceActivitiesResponse();
  const { setWorkspaceActivityTasks } = useWorkspaceActivityTasksResponse();
  const { setTaskActivities } = useTaskActivitiesResponse();
  const { setTaskActivityTasks } = useTaskActivityTasksResponse();
  const { setInboxListStatus } = useInboxListStatusResponse();

  const setActivity = useAtomCallback(
    useCallback(
      (_get, _set, data: ActivityResponse) => {
        setActivities(data.activities);

        const workspaceActivities = getNodesFromEdges<
          WorkspaceActivityResponse,
          InboxActivityPageQuery['workspaceActivities']
        >(data.workspaceActivities);

        const workspaceActivityTasks = workspaceActivities.reduce((acc, w) => {
          acc.push(...w.workspaceActivityTasks);
          return acc;
        }, [] as WorkspaceActivityTaskResponse[]);
        setWorkspaceActivities(workspaceActivities);
        setWorkspaceActivityTasks(workspaceActivityTasks);

        const taskActivities = getNodesFromEdges<
          TaskActivityResponse,
          InboxActivityPageQuery['taskActivities']
        >(data.taskActivities);

        const taskActivityTasks = taskActivities.reduce((acc, w) => {
          acc.push(...w.taskActivityTasks);
          return acc;
        }, [] as TaskActivityTaskResponse[]);

        setTaskActivities(taskActivities);
        setTaskActivityTasks(taskActivityTasks);

        setInboxListStatus({
          id: '1',
          teammateId: '1',
          filterStatus: 1,
          createdAt: '',
          updatedAt: '',
        });
      },
      [
        setActivities,
        setTaskActivities,
        setTaskActivityTasks,
        setWorkspaceActivities,
        setWorkspaceActivityTasks,
        setInboxListStatus,
      ],
    ),
  );

  return {
    setActivity,
  };
};
