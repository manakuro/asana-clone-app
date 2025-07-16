import { useCallback, useState } from 'react';
import { createProvider } from 'src/shared/react/createProvider';

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
useValue.__PROVIDER__ =
  'src/components/organisms/Tasks/TasksList/TasksListItem/Provider/SubtaskListProvider.tsx';
export const { Provider, useContext: useSubtaskListContext } =
  createProvider(useValue);
