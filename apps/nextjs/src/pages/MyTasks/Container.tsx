import type { GetLayout } from '@/@types/next';
import { PageLoader } from '@/components/ui/molecules';
import { LayoutDefault } from '@/components/ui/organisms/Layout';
import {
  useMyTasksDetailPageQuery,
  useMyTasksPageQuery,
} from '@/hooks/queries/app';
import { useTeammateTaskTabStatusQuery } from '@/hooks/queries/entities';
import { useMe } from '@/store/entities/me';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Component } from './Component';

function ContainerComponent() {
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
    <Component loading={loading} fetchTaskDetailQuery={fetchTaskDetailQuery} />
  );
}

export const Container = ContainerComponent as typeof ContainerComponent &
  GetLayout;

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

Container.getLayout = (page) => {
  return (
    <LayoutDefault>
      <BeforeMountComponent>{page}</BeforeMountComponent>
    </LayoutDefault>
  );
};
