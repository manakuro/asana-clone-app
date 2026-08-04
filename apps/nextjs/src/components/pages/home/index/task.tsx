'use client';

import { memo, useCallback } from 'react';
import { useMe } from '@/features/me/store/me';
import { TaskDetailModal } from '@/features/task-detail/components/task-detail-modal';
import { isHomeDetailURL, useRouterHome } from '@/router/home';
import { useHomeTaskDetailPageQuery } from './api/use-home-task-detail-page-query';
import { useHomeTaskDetail } from './hooks';

type Props = {
  taskId: string;
};

export const Task = memo(function Container({ taskId }: Props) {
  const { refetch } = useHomeTaskDetailPageQuery();
  const { me } = useMe();

  const fetchTaskDetailQuery = useCallback(
    async (variables: { taskId: string }) => {
      await refetch({ taskId: variables.taskId, teammateId: me.id });
    },
    [me.id, refetch],
  );

  const { navigateToHome } = useRouterHome();

  useHomeTaskDetail({
    isTaskDetailURL: isHomeDetailURL,
    fetchQuery: fetchTaskDetailQuery,
    taskId,
  });

  return <TaskDetailModal backToPage={navigateToHome} />;
});
