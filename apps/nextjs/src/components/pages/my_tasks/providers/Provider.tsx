import { useCallback, useEffect, useState, useTransition } from 'react';
import { createProvider } from '@/shared/react/createProvider';

type Props = {
  loading: boolean;
  fetchTaskDetailQuery: (variables: { taskId: string }) => Promise<void>;
};

const useValue = (props: Props) => {
  const [queryLoading, setQueryLoading] = useState(props.loading);
  const [contentLoading, setContentLoading] = useState(false);

  useEffect(() => {
    setQueryLoading(props.loading);
  }, [props.loading]);

  const startContentLoading = useCallback(() => {
    setContentLoading(true);
  }, []);
  const endContentLoading = useCallback(() => {
    setContentLoading(false);
  }, []);

  const [tabContentLoading, startTabContentTransition] = useTransition();

  return {
    queryLoading,
    contentLoading,
    startContentLoading,
    endContentLoading,
    tabContentLoading,
    startTabContentTransition,
    fetchTaskDetailQuery: props.fetchTaskDetailQuery,
  };
};
export const { Provider, useContext: useMyTasksContext } = createProvider(
  useValue,
  '@/components/pages/MyTasks/Provider.tsx',
);
