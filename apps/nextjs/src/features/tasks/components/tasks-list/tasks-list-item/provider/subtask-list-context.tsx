import { useCallback, useState } from 'react';
import { createContext } from '@/shared/react/create-context';

type ContextProps = {
  isSubtaskExpanded: boolean;
  onToggleExpandSubtask: () => void;
};

const useValue = (): ContextProps => {
  const [isSubtaskExpanded, setIsSubtaskExpanded] = useState(false);

  const onToggleExpandSubtask = useCallback(() => {
    setIsSubtaskExpanded((s) => !s);
  }, []);

  return {
    isSubtaskExpanded,
    onToggleExpandSubtask,
  } as const;
};
export const { Context, useContext: useSubtaskListContext } = createContext(
  useValue,
  '@/components/features/tasks/tasks-list/tasks-list-item/provider/subtask-list-context.tsx',
);
