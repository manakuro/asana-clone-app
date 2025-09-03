import { createProvider } from '@/shared/react/createProvider';
import { useCallback, useState } from 'react';

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
export const { Provider, useContext: useSubtaskListContext } = createProvider(
  useValue,
  '@/components/organisms/Tasks/TasksList/TasksListItem/Provider/SubtaskListProvider.tsx',
);
