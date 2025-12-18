import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';
import type { InboxArchivePageQuery } from '@/graphql/types/app/inbox';
import type { ArchivedWorkspaceActivityResponse } from '@/graphql/types/archivedWorkspaceActivity';
import type { ArchivedWorkspaceActivityTaskResponse } from '@/graphql/types/archivedWorkspaceActivityTask';
import { getNodesFromEdges } from '@/shared/apollo/util';
import {
  type ArchivedTaskActivityResponse,
  useArchivedTaskActivitiesResponse,
} from '../archivedTaskActivities';
import {
  type ArchivedTaskActivityTaskResponse,
  useArchivedTaskActivityTasksResponse,
} from '../archivedTaskActivityTasks';
import { useArchivedWorkspaceActivitiesResponse } from '../archivedWorkspaceActivities';
import { useArchivedWorkspaceActivityTasksResponse } from '../archivedWorkspaceActivityTasks';
import { useArchivesResponse } from '../archives';
import type { ArchiveResponse } from '../type';

export const useArchiveResponse = () => {
  const { setArchives } = useArchivesResponse();
  const { setArchivedWorkspaceActivities } =
    useArchivedWorkspaceActivitiesResponse();

  const { setArchivedWorkspaceActivityTasks } =
    useArchivedWorkspaceActivityTasksResponse();

  const { setArchivedTaskActivities } = useArchivedTaskActivitiesResponse();

  const { setArchivedTaskActivityTasks } =
    useArchivedTaskActivityTasksResponse();

  const setArchive = useAtomCallback(
    useCallback(
      (_get, _set, data: ArchiveResponse) => {
        setArchives(data.archivedActivities);

        const archivedWorkspaceActivities = getNodesFromEdges<
          ArchivedWorkspaceActivityResponse,
          InboxArchivePageQuery['archivedWorkspaceActivities']
        >(data.archivedWorkspaceActivities);

        const archivedWorkspaceActivityTasks =
          archivedWorkspaceActivities.reduce((acc, w) => {
            acc.push(...w.archivedWorkspaceActivityTasks);
            return acc;
          }, [] as ArchivedWorkspaceActivityTaskResponse[]);

        setArchivedWorkspaceActivities(archivedWorkspaceActivities);
        setArchivedWorkspaceActivityTasks(archivedWorkspaceActivityTasks);

        const archivedTaskActivities = getNodesFromEdges<
          ArchivedTaskActivityResponse,
          InboxArchivePageQuery['archivedTaskActivities']
        >(data.archivedTaskActivities);

        const archivedTaskActivityTasks = archivedTaskActivities.reduce(
          (acc, w) => {
            acc.push(...w.archivedTaskActivityTasks);
            return acc;
          },
          [] as ArchivedTaskActivityTaskResponse[],
        );

        setArchivedTaskActivities(archivedTaskActivities);
        setArchivedTaskActivityTasks(archivedTaskActivityTasks);
      },
      [
        setArchives,
        setArchivedWorkspaceActivities,
        setArchivedWorkspaceActivityTasks,
        setArchivedTaskActivities,
        setArchivedTaskActivityTasks,
      ],
    ),
  );

  return {
    setArchive,
  };
};
