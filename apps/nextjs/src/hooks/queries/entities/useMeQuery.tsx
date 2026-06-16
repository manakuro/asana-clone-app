import { useQuery } from '@apollo/client/react';
import { useEffect } from 'react';
import { MeDocument } from '@/graphql/hooks';
import { initialMeState, useMeResponse } from '@/store/entities/me';

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
