import { useCallback, useMemo, useState } from 'react';
import { useMyTasksPageQuery as useQuery } from '@/graphql/hooks';
import { useMountedRef } from '@/hooks';
import { useMyTasksResponse } from '@/store/app/myTasks';
import { useMe } from '@/store/entities/me';
import { useWorkspace } from '@/store/entities/workspace';

export const useMyTasksPageQuery = () => {
  const { me } = useMe();
  const { workspace } = useWorkspace();
  const skip = useMemo(() => !me.id || !workspace.id, [me.id, workspace.id]);
  const [loading, setLoading] = useState(true);
  const { setMyTasks } = useMyTasksResponse();
  const { mountedRef } = useMountedRef();

  const { refetch: refetchQuery } = useQuery({
    variables: {
      teammateId: me.id,
      workspaceId: workspace.id,
    },
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (!mountedRef.current) return;

      setMyTasks(data);
      endLoading();
    },
    skip,
  });

  const startLoading = useCallback(() => {
    setLoading(true);
  }, []);

  const endLoading = useCallback(() => {
    setLoading(false);
  }, []);

  const refetch = useCallback(async () => {
    startLoading();
    setTimeout(async () => {
      await refetchQuery();
    });
  }, [refetchQuery, startLoading]);

  return {
    refetch,
    loading,
  };
};
