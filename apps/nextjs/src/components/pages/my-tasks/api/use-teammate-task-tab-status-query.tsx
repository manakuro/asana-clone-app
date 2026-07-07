import { useQuery } from '@apollo/client/react';
import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';
import { useTeammateTaskTabStatusResponse } from '@/features/teammate/store/teammate-task-tab-status';
import { TeammateTaskTabStatusDocument } from '@/graphql/documents';
import { useMountedRef } from '@/hooks/use-mounted-ref';

const loadingAtom = atom<boolean>(true);

export const useTeammateTaskTabStatusQuery = () => {
  const queryResult = useQuery(TeammateTaskTabStatusDocument);
  const { setTeammateTaskTabStatus } = useTeammateTaskTabStatusResponse();
  const [loading, setLoading] = useAtom(loadingAtom);
  const { mountedRef } = useMountedRef();

  useEffect(() => {
    setLoading(queryResult.loading);
  }, [queryResult.loading, setLoading]);

  useEffect(() => {
    if (!queryResult.data?.teammateTaskTabStatus) return;
    if (loading) return;
    if (!mountedRef.current) return;

    setTeammateTaskTabStatus(queryResult.data.teammateTaskTabStatus);
  }, [loading, mountedRef, queryResult.data, setTeammateTaskTabStatus]);

  return {
    refetch: queryResult.refetch,
    loading,
  };
};
