import { useEffect, useState } from 'react';
import { useWorkspacePageQuery as useQuery } from 'src/graphql/hooks';
import { useMountedRef } from 'src/hooks';
import { useWorkspaceResponse } from 'src/store/app/workspace';

export const useWorkspacePageQuery = () => {
  const queryResult = useQuery();
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
    refetch: queryResult.refetch,
    loading,
  };
};
