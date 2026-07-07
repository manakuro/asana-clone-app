import { useQuery } from '@apollo/client/react';
import { useEffect } from 'react';
import { initialMeState, useMeResponse } from '@/features/me/store/me';
import { MeDocument } from '@/graphql/documents';

export const useMeQuery = () => {
  const { setMe } = useMeResponse();
  const queryResult = useQuery(MeDocument, {
    fetchPolicy: 'cache-first',
  });

  useEffect(() => {
    if (!queryResult.data) return;

    setMe(queryResult.data.me || initialMeState());
  }, [queryResult.data, setMe]);

  return {
    refetch: queryResult.refetch,
    loading: queryResult.loading,
  };
};
