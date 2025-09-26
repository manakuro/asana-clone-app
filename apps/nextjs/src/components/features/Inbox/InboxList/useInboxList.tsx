'use client';

import {
  useInboxListItem,
  useTaskActivityTaskIds,
  useWorkspaceActivityTaskIds,
} from '@/components/features/Inbox/hooks';
import { useTaskDetail } from '@/components/features/TaskDetail';
import { isInboxDetailURL } from '@/router';
import { useActivityType } from '@/store/entities/activityType';
import { useParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';

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
  const params = useParams();

  useEffect(() => {
    if (isInboxDetailURL(params)) return;
    if (!listItemId) return;

    if (isWorkspaceType(listItem.type)) {
      setId(workspaceListTaskIdsResult.taskIds[0]);
    }
    if (isTaskType(listItem.type)) {
      setId(myTaskListTaskIdsResult.taskIds[0]);
    }
  }, [
    params,
    listItemId,
    listItem.type,
    isTaskType,
    isWorkspaceType,
    setId,
    myTaskListTaskIdsResult.taskIds,
    workspaceListTaskIdsResult.taskIds,
  ]);
};
