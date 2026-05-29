import { useQuery } from '@apollo/client/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { InboxArchivePageDocument } from '@/graphql/hooks';
import { useMountedRef } from '@/hooks';
import { useArchiveResponse } from '@/store/app/inbox/archive';
import { useWorkspace } from '@/store/entities/workspace';

export const useInboxArchivePageQuery = () => {
  const { workspace } = useWorkspace();
  const skip = useMemo(() => !workspace.id, [workspace.id]);
  const [loading, setLoading] = useState(true);
  const { setArchive } = useArchiveResponse();
  const { mountedRef } = useMountedRef();

  const { data, refetch: refetchQuery } = useQuery(InboxArchivePageDocument, {
    variables: {
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

    setArchive(data);
    endLoading();
  }, [data, setArchive, endLoading, mountedRef]);

  const refetch = useCallback(async () => {
    startLoading();
    await refetchQuery();
  }, [refetchQuery, startLoading]);

  return {
    loading,
    refetch,
  };
};
