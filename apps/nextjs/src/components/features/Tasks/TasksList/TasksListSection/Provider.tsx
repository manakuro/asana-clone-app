import { useCallback, useMemo, useState } from 'react';
import type { FlexProps } from '@/components/ui/flex';
import { createProvider } from '@/shared/react/createProvider';

type Props = {
  taskSectionId: string;
  indented?: boolean;
};

const useValue = (props: Props) => {
  const [focused, setFocused] = useState(false);

  const onFocusInput = useCallback(() => {
    setFocused(true);
  }, []);

  const onUnfocusInput = useCallback(() => {
    setFocused(false);
  }, []);

  const indentedStyle = useMemo<FlexProps>(
    () => (props.indented ? { pl: 8 } : {}),
    [props.indented],
  );

  return {
    focused,
    onFocusInput,
    onUnfocusInput,
    taskSectionId: props.taskSectionId,
    indented: props.indented,
    indentedStyle,
  } as const;
};
export const { Provider, useContext: useTasksListSectionContext } =
  createProvider(
    useValue,
    '@/components/organisms/Tasks/TasksList/TasksListSection/Provider.tsx',
  );
export const TasksListSectionProvider = Provider;
