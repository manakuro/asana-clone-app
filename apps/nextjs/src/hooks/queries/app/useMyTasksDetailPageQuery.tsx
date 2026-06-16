import { useLazyQuery } from '@apollo/client/react';
import { useCallback, useState } from 'react';
import { MyTasksDetailPageDocument } from '@/graphql/hooks';
import type { MyTasksDetailPageQueryVariables as Variables } from '@/graphql/types/app/myTasks';
import { useTeammateTaskResponse } from '@/store/entities/teammateTask';

export type UseMyTasksDetailPageQueryResult = {
  refetch: (variables: Variables) => Promise<void>;
  loading: boolean;
};

export const useMyTasksDetailPageQuery =
  (): UseMyTasksDetailPageQueryResult => {
    const [loading, setLoading] = useState(true);
    const { setTeammateTask } = useTeammateTaskResponse();

    const [refetchQuery] = useLazyQuery(MyTasksDetailPageDocument, {
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
        const result = await refetchQuery({
          variables: variables,
        });
        if (result.data?.teammateTask) {
          setTeammateTask([result.data.teammateTask]);
        }
        endLoading();
      },
      [refetchQuery, startLoading, endLoading, setTeammateTask],
    );

    return {
      refetch,
      loading,
    };
  };
