import { useLazyQuery } from '@apollo/client/react';
import { useCallback, useState } from 'react';
import { HomeTaskDetailPageDocument } from '@/graphql/hooks';
import type { HomeTaskDetailPageQueryVariables as Variables } from '@/graphql/types/app/home';
import { useTeammateTaskResponse } from '@/store/entities/teammateTask';

export type UseHomeTaskDetailPageQueryResult = {
  refetch: (variables: Variables) => Promise<void>;
  loading: boolean;
};

export const useHomeTaskDetailPageQuery =
  (): UseHomeTaskDetailPageQueryResult => {
    const [loading, setLoading] = useState(true);
    const { setTeammateTask } = useTeammateTaskResponse();

    const [refetchQuery] = useLazyQuery(HomeTaskDetailPageDocument, {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'no-cache',
    });

    const startLoading = useCallback(() => {
      setLoading(true);
    }, []);

    const endLoading = useCallback(() => {
      setLoading(false);
    }, []);

    const refetch = useCallback(
      async (variables: Variables) => {
        startLoading();
        try {
          const result = await refetchQuery({ variables });
          if (result.data?.teammateTask) {
            setTeammateTask([result.data.teammateTask]);
          }
        } catch (e) {
          if (e instanceof Error && e.name === 'AbortError') return;
          throw e;
        } finally {
          endLoading();
        }
      },
      [refetchQuery, startLoading, endLoading, setTeammateTask],
    );

    return {
      refetch,
      loading,
    };
  };
