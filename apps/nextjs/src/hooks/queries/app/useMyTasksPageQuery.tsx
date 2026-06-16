import { useQuery } from '@apollo/client/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MyTasksPageDocument } from '@/graphql/hooks';
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

  const { data, refetch: refetchQuery } = useQuery(MyTasksPageDocument, {
    variables: {
      teammateId: me.id,
      workspaceId: workspace.id,
    },
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    skip,
  });

  const startLoading = useCallback(() => {
    setLoading(true);
  }, []);

  const endLoading = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!mountedRef.current) return;
    if (!data) return;

    setMyTasks(data);
    endLoading();
  }, [data, endLoading, mountedRef.current, setMyTasks]);

  const refetch = useCallback(async () => {
    startLoading();
    await refetchQuery();
  }, [refetchQuery, startLoading]);

  return {
    refetch,
    loading,
  };
};
