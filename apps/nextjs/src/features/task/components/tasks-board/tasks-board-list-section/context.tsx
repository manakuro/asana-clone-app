import { useCallback, useState } from 'react';
import { createContext } from '@/lib/react/create-context';

type ContextProps = {
  focused: boolean;
  onFocusInput: () => void;
  onUnfocusInput: () => void;
  taskSectionId: string;
};

type Props = {
  taskSectionId: string;
};

const useValue = (props: Props): ContextProps => {
  const [focused, setFocused] = useState(false);

  const onFocusInput = useCallback(() => {
    setFocused(true);
  }, []);

  const onUnfocusInput = useCallback(() => {
    setFocused(false);
  }, []);

  return {
    focused,
    onFocusInput,
    onUnfocusInput,
    taskSectionId: props.taskSectionId,
  } as const;
};
export const { Context, useContext: useTasksBoardListSectionContext } =
  createContext(
    useValue,
    '@/components/features/tasks/tasks-board/tasks-board-list-section/context.tsx',
  );
