import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMountedRef } from '@/hooks/use-mounted-ref';
import { ROUTE_MY_TASKS } from '@/router';
import { createContext } from '@/shared/react/create-context';

type ContextProps = {
  selected: boolean;
};

type Props = {
  taskId: string;
};

const useValue = (props: Props): ContextProps => {
  const [selected, setSelected] = useState<boolean>(false);
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
export const { Context, useContext: useTasksListItemRowContext } =
  createContext(
    useValue,
    '@/components/features/tasks/tasks-list/tasks-list-item/provider/tasks-list-row-context.tsx',
  );
