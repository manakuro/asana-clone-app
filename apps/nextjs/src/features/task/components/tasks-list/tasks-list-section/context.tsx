import { useCallback, useMemo, useState } from 'react';
import type { FlexProps } from '@/components/ui/flex';
import { createContext } from '@/lib/react/create-context';

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
export const { Context, useContext: useTasksListSectionContext } =
  createContext(
    useValue,
    '@/components/features/tasks/tasks-list/tasks-list-section/context.tsx',
  );
export const TasksListSectionContext = Context;
