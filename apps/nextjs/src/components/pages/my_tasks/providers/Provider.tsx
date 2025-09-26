import { createProvider } from '@/shared/react/createProvider';
import { useCallback, useEffect, useState } from 'react';

type ContextProps = {
  queryLoading: boolean;
  tabContentLoading: boolean;
  contentLoading: boolean;
  startContentLoading: () => void;
  endContentLoading: () => void;
  startTabContentLoading: () => void;
  endTabContentLoading: () => void;
  fetchTaskDetailQuery: (variables: { taskId: string }) => Promise<void>;
};

type Props = {
  loading: boolean;
  fetchTaskDetailQuery: (variables: { taskId: string }) => Promise<void>;
};

const useValue = (props: Props): ContextProps => {
  const [queryLoading, setQueryLoading] = useState(props.loading);
  const [tabContentLoading, setTabContentLoading] = useState(props.loading);
  const [contentLoading, setContentLoading] = useState(false);

  useEffect(() => {
    setQueryLoading(props.loading);
    setTabContentLoading(props.loading);
  }, [props.loading]);

  const startContentLoading = useCallback(() => {
    setContentLoading(true);
  }, []);
  const endContentLoading = useCallback(() => {
    setContentLoading(false);
  }, []);

  const startTabContentLoading = useCallback(() => {
    setTabContentLoading(true);
  }, []);
  const endTabContentLoading = useCallback(() => {
    setTabContentLoading(false);
  }, []);

  return {
    queryLoading,
    tabContentLoading,
    contentLoading,
    startTabContentLoading,
    endTabContentLoading,
    startContentLoading,
    endContentLoading,
    fetchTaskDetailQuery: props.fetchTaskDetailQuery,
  } as const;
};
export const { Provider, useContext: useMyTasksContext } = createProvider(
  useValue,
  '@/components/pages/MyTasks/Provider.tsx',
);
