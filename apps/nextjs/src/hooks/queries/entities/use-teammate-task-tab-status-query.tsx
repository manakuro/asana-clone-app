import { useQuery } from '@apollo/client/react';
import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';
import { TeammateTaskTabStatusDocument } from '@/graphql/hooks';
import { useMountedRef } from '@/hooks';
import { useTeammateTaskTabStatusResponse } from '@/store/entities/teammateTaskTabStatus';

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
