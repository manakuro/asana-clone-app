'use client';

import { memo } from 'react';
import { useInboxTaskDetail } from '@/features/inbox/hooks';
import { TaskDetailSide } from '@/features/task-detail/components/task-detail-side';
import { isInboxDetailURL } from '@/router';

type Props = {
  taskId: string;
};

export const Task = memo(function Task({ taskId }: Props) {
  useInboxTaskDetail({
    isTaskDetailURL: isInboxDetailURL,
    taskId,
  });

  return <TaskDetailSide />;
});
