import { useQuery } from '@apollo/client/react';
import { useEffect, useState } from 'react';
import { WorkspacePageDocument } from '@/graphql/hooks';
import { useMountedRef } from '@/hooks';
import { useWorkspaceResponse } from '@/store/app/workspace';

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
