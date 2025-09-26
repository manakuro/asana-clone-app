import { useMountedRef } from '@/hooks';
import { ROUTE_MY_TASKS, useRouter } from '@/router';
import { createProvider } from '@/shared/react/createProvider';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type ContextProps = {
  selected: boolean;
};

type Props = {
  taskId: string;
};

const useValue = (props: Props): ContextProps => {
  const [selected, setSelected] = useState<boolean>(false);
  const { router } = useRouter();
  const { mountedRef } = useMountedRef();
  const params = useParams();

  useEffect(() => {
    if (!mountedRef.current) return;

    if (params?.[ROUTE_MY_TASKS.query]?.[0] === props.taskId) {
      setSelected(true);
      return;
    }
    setSelected(false);
  }, [mountedRef, props.taskId, params]);

  return {
    selected,
  };
};
export const { Provider, useContext: useTasksListItemRowContext } =
  createProvider(
    useValue,
    '@/components/organisms/Tasks/TasksList/TasksListItem/Provider/TasksListRowProvider.tsx',
  );
