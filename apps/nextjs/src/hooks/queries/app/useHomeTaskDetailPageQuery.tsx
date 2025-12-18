import { useCallback, useState } from 'react';
import { useHomeTaskDetailPageLazyQuery as useQuery } from '@/graphql/hooks';
import type { HomeTaskDetailPageQueryVariables as Variables } from '@/graphql/types/app/home';
import { useMountedRef } from '@/hooks';
import { useTeammateTaskResponse } from '@/store/entities/teammateTask';

export type UseHomeTaskDetailPageQueryResult = {
  refetch: (variables: Variables) => Promise<void>;
  loading: boolean;
};

export const useHomeTaskDetailPageQuery =
  (): UseHomeTaskDetailPageQueryResult => {
    const [loading, setLoading] = useState(true);
    const { setTeammateTask } = useTeammateTaskResponse();
    const { mountedRef } = useMountedRef();

    const [refetchQuery] = useQuery({
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'no-cache',
      onCompleted: (data) => {
        if (!mountedRef.current) return;

        if (data.teammateTask) setTeammateTask([data.teammateTask]);
        endLoading();
      },
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
        setTimeout(async () => {
          await refetchQuery({
            variables: variables,
          });
        });
      },
      [refetchQuery, startLoading],
    );

    return {
      refetch,
      loading,
    };
  };
