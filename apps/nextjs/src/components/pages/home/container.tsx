'use client';

import { memo, useCallback } from 'react';
import { useMe } from '@/store/entities/me';
import { useHomePageQuery } from './api/queries/use-home-page-query';
import { useHomeTaskDetailPageQuery } from './api/queries/use-home-task-detail-page-query';
import { Component } from './component';

export const Container = memo(function Container() {
  const { loading } = useHomePageQuery();
  const { refetch } = useHomeTaskDetailPageQuery();
  const { me } = useMe();

  const fetchTaskDetailQuery = useCallback(
    async (variables: { taskId: string }) => {
      await refetch({ taskId: variables.taskId, teammateId: me.id });
    },
    [me.id, refetch],
  );

  return (
    <Component loading={loading} fetchTaskDetailQuery={fetchTaskDetailQuery} />
  );
});
