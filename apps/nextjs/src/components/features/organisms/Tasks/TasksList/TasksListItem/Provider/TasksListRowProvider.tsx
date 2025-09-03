import { useMountedRef } from '@/hooks';
import { ROUTE_MY_TASKS, useRouter } from '@/router';
import { createProvider } from '@/shared/react/createProvider';
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

  useEffect(() => {
    if (!mountedRef.current) return;

    if (router.query[ROUTE_MY_TASKS.query]?.[0] === props.taskId) {
      setSelected(true);
      return;
    }
    setSelected(false);
  }, [mountedRef, props.taskId, router]);

  return {
    selected,
  };
};
export const { Provider, useContext: useTasksListItemRowContext } =
  createProvider(
    useValue,
    '@/components/organisms/Tasks/TasksList/TasksListItem/Provider/TasksListRowProvider.tsx',
  );
