'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import {
  useInboxListItem,
  useTaskActivityTaskIds,
  useWorkspaceActivityTaskIds,
} from '@/features/inbox/hooks';
import { useActivityType } from '@/features/inbox/store/activity-type';
import { isInboxDetailURL } from '@/router';
import { useRouterInbox } from '@/router/inbox';

type Props = {
  listItemId?: string;
};

export const useInboxList = (props: Props) => {
  const listItemId = useMemo(() => props.listItemId, [props.listItemId]);
  const { listItem } = useInboxListItem(listItemId || '');
  const { isWorkspaceType, isTaskType } = useActivityType();
  const workspaceListTaskIdsResult = useWorkspaceActivityTaskIds(listItem.id);
  const myTaskListTaskIdsResult = useTaskActivityTaskIds(listItem.id);
  const pathname = usePathname();
  const { navigateToInboxDetail } = useRouterInbox();

  useEffect(() => {
    if (isInboxDetailURL(pathname)) return;
    if (!listItemId) return;

    if (isWorkspaceType(listItem.type)) {
      navigateToInboxDetail(workspaceListTaskIdsResult.taskIds[0]);
    }
    if (isTaskType(listItem.type)) {
      navigateToInboxDetail(myTaskListTaskIdsResult.taskIds[0]);
    }
  }, [
    listItemId,
    listItem.type,
    isTaskType,
    isWorkspaceType,
    myTaskListTaskIdsResult.taskIds,
    workspaceListTaskIdsResult.taskIds,
    pathname,
    navigateToInboxDetail,
  ]);
};
