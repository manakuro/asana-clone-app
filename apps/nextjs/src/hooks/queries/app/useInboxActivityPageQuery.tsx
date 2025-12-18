import { useCallback, useMemo, useState } from 'react';
import { useInboxActivityPageQuery as useQuery } from '@/graphql/hooks';
import { useMountedRef } from '@/hooks';
import { useActivityResponse } from '@/store/app/inbox/activity';
import { useWorkspace } from '@/store/entities/workspace';

export const useInboxActivityPageQuery = () => {
  const { workspace } = useWorkspace();
  const skip = useMemo(() => !workspace.id, [workspace.id]);
  const [loading, setLoading] = useState(true);
  const { setActivity } = useActivityResponse();
  const { mountedRef } = useMountedRef();

  const { refetch: refetchQuery } = useQuery({
    variables: {
      workspaceId: workspace.id,
    },
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (!mountedRef.current) return;

      setActivity(data);
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
    loading,
    refetch,
  };
};
