'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import {
  useInboxListItem,
  useTaskActivityTaskIds,
  useWorkspaceActivityTaskIds,
} from '@/features/inbox/hooks';
import { useActivityType } from '@/features/inbox/store/activity-type';
import { useTaskDetail } from '@/features/task-detail';
import { isInboxDetailURL } from '@/router';

type Props = {
  listItemId?: string;
};

export const useInboxList = (props: Props) => {
  const listItemId = useMemo(() => props.listItemId, [props.listItemId]);
  const { setId } = useTaskDetail();
  const { listItem } = useInboxListItem(listItemId || '');
  const { isWorkspaceType, isTaskType } = useActivityType();
  const workspaceListTaskIdsResult = useWorkspaceActivityTaskIds(listItem.id);
  const myTaskListTaskIdsResult = useTaskActivityTaskIds(listItem.id);
  const pathname = usePathname();

  useEffect(() => {
    if (isInboxDetailURL(pathname)) return;
    if (!listItemId) return;

    if (isWorkspaceType(listItem.type)) {
      setId(workspaceListTaskIdsResult.taskIds[0]);
    }
    if (isTaskType(listItem.type)) {
      setId(myTaskListTaskIdsResult.taskIds[0]);
    }
  }, [
    listItemId,
    listItem.type,
    isTaskType,
    isWorkspaceType,
    setId,
    myTaskListTaskIdsResult.taskIds,
    workspaceListTaskIdsResult.taskIds,
    pathname,
  ]);
};
