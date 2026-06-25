import { useMemo } from 'react';
import { useTasksListContentSticky } from '@/components/features/tasks';
import type { SystemStyleObject } from '@/shared/chakra';
import { createProvider } from '@/shared/react/create-provider';

type ContextProps = {
  stickyStyle: StickyStyle;
};
type StickyStyle = SystemStyleObject;

const useValue = (): ContextProps => {
  const { isStickyVertical } = useTasksListContentSticky();
  const stickyStyle = useMemo((): StickyStyle => {
    if (isStickyVertical)
      return {
        position: 'sticky',
        left: 0,
        zIndex: 100,
        bg: 'white',
      };

    return {};
  }, [isStickyVertical]);
  return {
    stickyStyle,
  } as const;
};
export const { Provider, useContext: useTasksListContext } = createProvider(
  useValue,
  '@/components/organisms/Tasks/TasksList/Provider.tsx',
);
