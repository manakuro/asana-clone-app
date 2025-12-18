import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import type { InboxActivityPageQuery } from '@/graphql/types/app/inbox';
import { getNodesFromEdges } from '@/shared/apollo/util';
import { useActivitiesResponse } from '../activities';
import { useInboxListStatusResponse } from '../inboxListStatus';
import {
  type TaskActivityResponse,
  useTaskActivitiesResponse,
} from '../taskActivities';
import {
  type TaskActivityTaskResponse,
  useTaskActivityTasksResponse,
} from '../taskActivityTasks';
import type { ActivityResponse } from '../type';
import {
  useWorkspaceActivitiesResponse,
  type WorkspaceActivityResponse,
} from '../workspaceActivities';
import {
  useWorkspaceActivityTasksResponse,
  type WorkspaceActivityTaskResponse,
} from '../workspaceActivityTasks';

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
