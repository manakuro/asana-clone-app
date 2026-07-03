'use client';

import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { PageLoader } from '@/components/ui/page-loader';
import { useTeammateTaskTabStatusQuery } from '@/hooks/queries/use-teammate-task-tab-status-query';
import { useMe } from '@/store/entities/me';
import { useMyTasksDetailPageQuery } from './api/use-my-tasks-detail-page-query';
import { useMyTasksPageQuery } from './api/use-my-tasks-page-query';
import { Component } from './component';

export function Container() {
  const { loading } = useMyTasksPageQuery();
  const { refetch } = useMyTasksDetailPageQuery();
  const { me } = useMe();

  const fetchTaskDetailQuery = useCallback(
    async (variables: { taskId: string }) => {
      await refetch({ taskId: variables.taskId, teammateId: me.id });
    },
    [me.id, refetch],
  );

  return (
    <BeforeMountComponent>
      <Component
        loading={loading}
        fetchTaskDetailQuery={fetchTaskDetailQuery}
      />
    </BeforeMountComponent>
  );
}

function BeforeMountComponent(props: React.PropsWithChildren) {
  const { loading: queryLoading } = useTeammateTaskTabStatusQuery();
  const [loading, setLoading] = useState(queryLoading);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;

    if (!queryLoading) {
      setLoading(queryLoading);
      setLoaded(true);
    }
  }, [loaded, queryLoading]);

  if (loading) return <PageLoader />;

  return <>{props.children}</>;
}
