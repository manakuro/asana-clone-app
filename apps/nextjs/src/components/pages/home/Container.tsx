'use client';

import { memo, useCallback } from 'react';
import {
  useHomePageQuery,
  useHomeTaskDetailPageQuery,
} from '@/hooks/queries/app';
import { useMe } from '@/store/entities/me';
import { Component } from './Component';

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
