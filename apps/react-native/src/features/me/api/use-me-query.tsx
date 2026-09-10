import { useQuery } from '@apollo/client/react';
import { MeDocument } from '@/graphql/documents';

export const useMeQuery = () => {
  const queryResult = useQuery(MeDocument, {
    fetchPolicy: 'cache-first',
  });
  const me = queryResult.data?.me;

  return {
    me,
    refetch: queryResult.refetch,
    loading: queryResult.loading,
  };
};
