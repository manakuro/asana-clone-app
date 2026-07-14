import { useQuery } from '@apollo/client/react';
import { useEffect, useState } from 'react';
import { useWorkspaceResponse } from '@/components/pages/workspaces/index/store/workspaces';
import { WorkspacePageDocument } from '@/graphql/documents';
import { useMountedRef } from '@/hooks/use-mounted-ref';

export const useWorkspacePageQuery = () => {
  const queryResult = useQuery(WorkspacePageDocument, {
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
  });
  const [loading, setLoading] = useState(queryResult.loading);
  const { setWorkspace } = useWorkspaceResponse();
  const { mountedRef } = useMountedRef();

  useEffect(() => {
    setLoading(queryResult.loading);
  }, [queryResult.loading]);

  useEffect(() => {
    if (!queryResult.data?.workspace) return;
    if (loading) return;
    if (!mountedRef.current) return;

    setWorkspace(queryResult.data);
    setLoading(false);
  }, [loading, mountedRef, queryResult.data, setWorkspace]);

  return {
    loading,
  };
};
