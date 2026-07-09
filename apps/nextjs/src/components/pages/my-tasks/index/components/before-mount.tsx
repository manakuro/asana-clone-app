import { type PropsWithChildren, useEffect, useState } from 'react';
import { useTeammateTaskTabStatusQuery } from '@/components/pages/my-tasks/index/api/use-teammate-task-tab-status-query';
import { PageLoader } from '@/components/ui/page-loader';

export function BeforeMount(props: PropsWithChildren) {
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
